import React from "react";
import { IndicatorType } from "../components/Indicator/Indicator";
import { useSupabase } from "./useSupabase";

export function useIndicator(type: IndicatorType) {

    const [isPending, togglePending] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<number | null>(null);
    const [error, setError] = React.useState<Error | null>(null);

    const [lastUpdate, setLastUpdate] = React.useState<number | null>(null);

    const supabase = useSupabase();

    const calcValue = React.useCallback(
        async (): Promise<number | null> => {
            switch (type) {
                case IndicatorType.MonthlyGrowth:
                    return await fetchMonthlyGrowth(supabase);

                case IndicatorType.ProfitFactor:
                    return await fetchProfitFactor(supabase);

                case IndicatorType.WinRate:
                    return await fetchWinRate(supabase);

                default:
                    throw new Error(`Unknown indicator type: ${type}`);
            }
        },
        [type, supabase]
    );

    React.useEffect(
        () => {
            togglePending(true);
            setValue(0);
            setError(null);

            calcValue()
                .then(x => {
                    setValue(x);
                    setLastUpdate(Date.now());
                })
                .catch(x => {
                    setError(x);
                })
                .finally(() => {
                    togglePending(false);
                });
        },
        [calcValue]
    );

    React.useEffect(
        () => {
            function handleEvent() {
                calcValue()
                    .then(x => {
                        setValue(x);
                        setLastUpdate(Date.now());
                    })
                    .catch(x => {
                        setError(x);
                    });
            }

            const channel = supabase
                .channel("signals:realtime")
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "signals" },
                    handleEvent
                )
                .on(
                    "postgres_changes",
                    { event: "UPDATE", schema: "public", table: "signals" },
                    handleEvent
                )
                .on(
                    "postgres_changes",
                    { event: "DELETE", schema: "public", table: "signals" },
                    handleEvent
                )
                .subscribe((status, error) => {
                    console.warn("Connection status:", status, error);
                });

            return () => {
                supabase.removeChannel(channel);
            };
        },
        [calcValue, supabase]
    );

    React.useEffect(
        () => {
            const intervalId = window.setInterval(
                () => {
                    const now = Date.now();

                    if (lastUpdate !== null && lastUpdate + 60000 < now) {
                        calcValue()
                            .then(x => {
                                setValue(x);
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
        [lastUpdate, calcValue]
    );

    return {
        isPending,
        value,
        error,
    };
}

/**
select
sum(case when tp_hit then 2 else 0 end)::float
/
nullif(sum(case when sl_hit then 1 else 0 end), 0) as profit_factor
from signals
where status = 'closed';
 */
async function fetchProfitFactor(supabase: ReturnType<typeof useSupabase>) {
    const { data, error } = await supabase
        .from("signals")
        .select<"tp_hit, sl_hit", { tp_hit: boolean, sl_hit: boolean }>()
        .eq("status", "closed");

    if (error) {
        throw error;
    }

    if (!data) {
        return null;
    }

    let profit = 0;
    let loss = 0;

    for (const s of data) {
        if (s.tp_hit) profit += 2;
        if (s.sl_hit) loss += 1;
    }

    return loss === 0 ? 0 : profit / loss;
}

/**
select
date_trunc('month', closed_at) as month,
sum(case when tp_hit then 1.0 else 0 end)
-
sum(case when sl_hit then 0.5 else 0 end)
as monthly_return_pct
from signals
where status = 'closed'
group by month
order by month;
 */
async function fetchMonthlyGrowth(supabase: ReturnType<typeof useSupabase>) {
    const { data, error } = await supabase
        .from("signals")
        .select<"tp_hit, sl_hit, closed_at", { tp_hit: boolean, sl_hit: boolean, closed_at: string | null }>("tp_hit, sl_hit, closed_at")
        .eq("status", "closed")
        .not("closed_at", "is", null);

    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return null;
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let growth = 0;

    for (const s of data) {
        const d = new Date(s.closed_at!);

        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
            if (s.tp_hit) growth += 1;
            if (s.sl_hit) growth -= 0.5;
        }
    }

    return growth * 100;
}

/**
SELECT
COUNT(*) AS total_trades,
COUNT(*) FILTER (WHERE tp_hit = true) AS wins,
ROUND(
COUNT(*) FILTER (WHERE tp_hit = true)::numeric
/ NULLIF(COUNT(*), 0) * 100,
2
) AS win_rate_pct
FROM signals
WHERE status = 'closed';
 */
async function fetchWinRate(supabase: ReturnType<typeof useSupabase>) {
    const { data, error } = await supabase
        .from("signals")
        .select<"tp_hit", { tp_hit: boolean }>()
        .eq("status", "closed");

    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return null;
    }

    const total = data.length;
    const wins = data.filter(x => x.tp_hit).length;

    return Math.round((wins / total) * 100 * 100) / 100;
}


