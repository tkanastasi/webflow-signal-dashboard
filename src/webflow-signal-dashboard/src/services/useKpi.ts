import { useMemo } from "react";
import { SignalType, type SignalItem } from "./useSupabase";

export function useKpi(signals: SignalItem[]) {
    return useMemo(() => {
        const closed = signals.filter(
            s => s.status === SignalType.Closed
        );

        if (!closed.length) {
            return {
                profitFactor: null,
                winRate: null,
                monthlyGrowth: null,
            };
        }

        const wins = closed.filter(s => s.tp_hit).length;
        const losses = closed.filter(s => s.sl_hit).length;

        const profitFactor =
            losses === 0 ? null : (wins * 2) / losses;

        const winRate = (wins / closed.length) * 100;

        const now = new Date();
        const monthlyGrowth = closed.reduce((acc, s) => {
            if (!s.closed_at) return acc;
            const d = new Date(s.closed_at);

            if (
                d.getMonth() !== now.getMonth() ||
                d.getFullYear() !== now.getFullYear()
            ) {
                return acc;
            }

            if (s.tp_hit) return acc + 1;
            if (s.sl_hit) return acc - 0.5;
            return acc;
        }, 0);

        return {
            profitFactor,
            winRate,
            monthlyGrowth,
        };
    }, [signals]);
}