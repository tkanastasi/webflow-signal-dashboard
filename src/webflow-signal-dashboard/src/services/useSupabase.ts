import { createClient } from "@supabase/supabase-js";
import React from "react";

export function useSupabase() {
    const supabase = React.useMemo(
        () => {
            return createClient<DatabaseSchema>(
                "https://yimtbubgylcvhkpejaxq.supabase.co",
                "sb_publishable_6Szl51Y8yckEsC1Vrgopiw_dIiGg8f1"
            );
        },
        []
    );

    return supabase;
}

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
    closed_at: string | null;
    tp_hit: boolean;
    sl_hit: boolean;
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

export function isSignalItem(value: unknown): value is SignalItem {
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
        "created_at" in value && typeof value.created_at === "string" &&
        "closed_at" in value && (value.closed_at === null || typeof value.closed_at === "string") &&
        "tp_hit" in value && typeof value.tp_hit === "boolean" &&
        "sl_hit" in value && typeof value.sl_hit === "boolean";
};