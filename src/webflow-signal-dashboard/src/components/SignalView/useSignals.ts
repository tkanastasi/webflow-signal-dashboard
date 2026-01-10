import { createClient } from "@supabase/supabase-js";
import React from "react";

export interface SignalItem {
    id: string;
    symbol: string;
    market: SignalMarket;
    status: SignalType;
    side: string;
    timeframe: string;
    trading_style: string;
    entry: number;
    sl: number;
    tp: number;
    created_at: string;
}

export enum SignalType {
    Active = "active",
    Closed = "closed",
    Pending = "pending",
}

export enum SignalMarket {
    Metals = "Metals",
    Indices = "Indices",
    Forex = "Forex",
    Crypto = "Crypto",
}

interface DatabaseSchema {
    public: {
        Tables: {
            signals: {
                Row: SignalItem
                Insert: Omit<SignalItem, "id" | "created_at">
                Update: Partial<Omit<SignalItem, "id">>
            }
        }
        Views: {}
        Functions: {}
        Enums: {
            signal_status: SignalType,
            signal_market: SignalMarket,
        }
    }
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

export function useSignals(filter: { market: SignalMarket | null, limit: number | null }) {

    const { market, limit } = filter;

    const [isPending, togglePending] = React.useState<boolean>(true);
    const [signals, setSignals] = React.useState<SignalItem[]>([]);
    const [error, setError] = React.useState<Error | null>(null);

    const [lastUpdate, setLastUpdate] = React.useState<number | null>(null);

    const supabase = React.useMemo(
        () => {
            return createClient<DatabaseSchema>(
                "https://yimtbubgylcvhkpejaxq.supabase.co",
                "sb_publishable_6Szl51Y8yckEsC1Vrgopiw_dIiGg8f1"
            );
        },
        []
    );

    const loadSignals = React.useCallback(
        async () => {
            let query = supabase
                .from("signals")
                .select("*")
                .order("created_at", { ascending: false });

            if (market !== null) {
                query = query.ilike("market", market);
            }

            if (limit !== null) {
                query = query.limit(limit);
            }

            const { data, error } = await query;

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
        },
        [limit, market, supabase]
    );

    React.useEffect(
        () => {
            togglePending(true);
            setSignals([]);
            setError(null);

            loadSignals()
                .then(x => {
                    setSignals(x);
                    setLastUpdate(Date.now());
                })
                .catch(x => {
                    setError(x);
                })
                .finally(() => {
                    togglePending(false);
                });
        },
        [loadSignals]
    );

    React.useEffect(
        () => {
            const channel = supabase
                .channel("signals:realtime")
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "signals" },
                    payload => {
                        console.log("REALTIME EVENT:", payload);

                        const next = payload.new;

                        if (!!next && isSignalItem(next)) {
                            setSignals(prev => upsertSignal(prev, next));
                            setLastUpdate(Date.now());
                        }
                    }
                )
                .on(
                    "postgres_changes",
                    { event: "UPDATE", schema: "public", table: "signals" },
                    payload => {
                        console.log("REALTIME EVENT:", payload);

                        const next = payload.new;

                        if (!!next && isSignalItem(next)) {
                            setSignals(prev => upsertSignal(prev, next));
                            setLastUpdate(Date.now());
                        }
                    }
                )
                .on(
                    "postgres_changes",
                    { event: "DELETE", schema: "public", table: "signals" },
                    payload => {
                        console.log("REALTIME EVENT:", payload);

                        const old = payload.old;

                        if (!!old && typeof old.id === "string") {
                            setSignals(prev => removeSignal(prev, old.id));
                            setLastUpdate(Date.now());
                        }
                    }
                )
                .subscribe((status, error) => {
                    console.warn("Connection status:", status, error);
                });

            return () => {
                supabase.removeChannel(channel);
            };
        },
        [supabase]
    );

    React.useEffect(
        () => {
            const intervalId = window.setInterval(
                () => {
                    const now = Date.now();

                    if (lastUpdate !== null && lastUpdate + 60000 < now) {
                        loadSignals()
                            .then(x => {
                                setSignals(x);
                                setLastUpdate(Date.now());
                            })
                            .catch(x => {
                                setError(x);
                            });
                    }
                },
                10000
            );

            return () => {
                window.clearInterval(intervalId);
            };
        },
        [lastUpdate, loadSignals]
    );

    return {
        isPending,
        signals,
        error,
    };
}

function upsertSignal(
    prev: SignalItem[],
    next: SignalItem
): SignalItem[] {
    const index = prev.findIndex(x => x.id === next.id);

    if (index === -1) {
        return [next, ...prev];
    }

    const copy = [...prev];
    copy[index] = next;
    return copy;
}

function removeSignal(
    prev: SignalItem[],
    id: string
): SignalItem[] {
    return prev.filter(x => x.id !== id);
}
