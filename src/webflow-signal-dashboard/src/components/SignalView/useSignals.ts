"use server";

import { createClient } from "@supabase/supabase-js";
import React from "react";

export interface SignalItem {
    id: string;
    symbol: string;
    market: string;
    status: string;
    side: string;
    timeframe: string;
    trading_style: string;
    entry: number;
    sl: number;
    tp: number;
    created_at: string;
}

interface DatabaseSchema {
    signals: SignalItem;
}

/**
 * 
 * {
 * "id":"cf2275b1-a05b-432d-9cda-01afea65ad77",
 * "symbol":"RENDERUSD",
 * "market":"Crypto",
 * "side":"sell",
 * "entry":2.455,
 * "tp":2.285,
 * "sl":2.54,
 * "timeframe":"M5",
 * "status":"active",
 * "source":"tradingview",
 * "created_at":"2026-01-06T16:55:02.477301+00:00",
 * "tp_hit":false,
 * "sl_hit":false,
 * "trade_id":"RENDERUSD_5_1767718200000",
 * "trading_style":"Scalping",
 * "chart_open_url":"https://yimtbubgylcvhkpejaxq.supabase.co/storage/v1/object/public/signals-charts/open/RENDERUSD_5_1767718200000.png",
 * "chart_close_url":null,
 * "chart_status":"pending",
 * "tv_symbol":"COINBASE:RENDERUSD",
 * "closed_at":null
 * }
 */

function isSignalItem(value: unknown): value is SignalItem {
    return !!value && typeof value === "object" &&
        "id" in value && typeof value.id === "string" &&
        "symbol" in value && typeof value.symbol === "string" &&
        "market" in value && typeof value.market === "string" &&
        "side" in value && typeof value.side === "string" &&
        "timeframe" in value && typeof value.timeframe === "string" &&
        "trading_style" in value && typeof value.trading_style === "string" &&
        "entry" in value && typeof value.entry === "number" &&
        "sl" in value && typeof value.sl === "number" &&
        "tp" in value && typeof value.tp === "number" &&
        "created_at" in value && typeof value.created_at === "string";
};

export function useSignals() {
    const [isPending, togglePending] = React.useState<boolean>(true);
    const [signals, setSignals] = React.useState<SignalItem[]>([]);
    const [error, setError] = React.useState<Error | null>(null);

    const supabase = React.useMemo(
        () => {
            return createClient<DatabaseSchema>(
                "https://yimtbubgylcvhkpejaxq.supabase.co",
                "sb_publishable_6Szl51Y8yckEsC1Vrgopiw_dIiGg8f1"
            );
        },
        []
    );

    React.useEffect(
        () => {
            const loadSignals = async () => {
                const { data, error } = await supabase
                    .from("signals")
                    .select("*")
                    .order("created_at", { ascending: false })
                // .limit(8);

                if (!!error) {
                    throw error;
                }

                const result: SignalItem[] = [];

                data?.forEach(x => {
                    if (isSignalItem(x)) {
                        result.push(x);
                    }
                    else {
                        throw new Error("Invalid data format", { cause: JSON.stringify(x) });
                    }
                });

                return result;
            };

            togglePending(true);
            setSignals([]);
            setError(null);

            loadSignals()
                .then(x => {
                    setSignals(x);
                })
                .catch(x => {
                    setError(x);
                })
                .finally(() => {
                    togglePending(false);
                });

            const channelInsert = supabase
                .channel("signals")
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "signals" },
                    payload => {
                        alert(JSON.stringify(payload));
                    }
                )
                .subscribe();

            const channelUpdate = supabase
                .channel("signals")
                .on(
                    "postgres_changes",
                    { event: "UPDATE", schema: "public", table: "signals" },
                    payload => {
                        alert(JSON.stringify(payload));
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channelInsert);
                supabase.removeChannel(channelUpdate);
            };
        },
        [supabase]
    );

    return {
        isPending,
        signals,
        error,
    };
}