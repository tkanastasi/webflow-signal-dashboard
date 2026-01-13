import React from "react";
import { IndicatorType } from "../components/Indicator/Indicator";
import { useSupabase } from "./useSupabase";

export abstract class BaseIndicatorResult { }

export class MonthlyGrowthIndicatorResult extends BaseIndicatorResult {
    constructor(
        public readonly growth: number,
        public readonly totalR: number,
    ) {
        super();
    }
}

export class ProfitFactorIndicatorResult extends BaseIndicatorResult {
    constructor(
        public readonly profitFactor: number,
    ) {
        super();
    }
}

export class WinRateIndicatorResult extends BaseIndicatorResult {
    constructor(
        public readonly winRate: number,
        public readonly wins: number,
        public readonly losses: number,
        public readonly total: number,
    ) {
        super();
    }
}


export function useIndicator(type: IndicatorType) {

    const [isPending, togglePending] = React.useState<boolean>(true);
    const [value, setValue] = React.useState<BaseIndicatorResult | null>(null);
    const [error, setError] = React.useState<Error | null>(null);

    const [lastUpdate, setLastUpdate] = React.useState<number | null>(null);

    const supabase = useSupabase();

    const calcValue = React.useCallback(
        async (): Promise<BaseIndicatorResult | null> => {
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
date_trunc('month', closed_at) as month,
sum(case when tp_hit then 1.0 else 0 end)
-
sum(case when sl_hit then 0.5 else 0 end)
as monthly_return_pct
from signals
where status = 'closed'
group by month
order by month;

-----------------------------------

SELECT
SUM(
CASE
WHEN tp_hit = true THEN 2
WHEN sl_hit = true THEN -1
ELSE 0
END
) AS total_r_last_30_days
FROM signals
WHERE status = 'closed'
AND closed_at >= now() - interval '30 days';
 */
async function fetchMonthlyGrowth(supabase: ReturnType<typeof useSupabase>): Promise<MonthlyGrowthIndicatorResult | null> {
    const { data, error } = await supabase
        .from("signals")
        .select<"tp_hit, sl_hit, closed_at", { tp_hit: boolean, sl_hit: boolean, closed_at: string | null }>()
        .eq("status", "closed")
        .not("closed_at", "is", null);

    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return null;
    }

    const now = Date.now();
    const currentMonth = new Date(now).getMonth();
    const currentYear = new Date(now).getFullYear();
    const last30DaysMs = 30 * 24 * 60 * 60 * 1000;

    let growth = 0;
    let totalR = 0;

    for (const s of data) {
        const d = new Date(s.closed_at!);

        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
            if (s.tp_hit) growth += 1;
            if (s.sl_hit) growth -= 0.5;
        }

        const closedAt = new Date(s.closed_at!).getTime();

        if (now - closedAt <= last30DaysMs) {
            if (s.tp_hit) totalR += 2;
            if (s.sl_hit) totalR -= 1;
        }
    }

    return new MonthlyGrowthIndicatorResult(growth, totalR);
}

/**
select
sum(case when tp_hit then 2 else 0 end)::float
/
nullif(sum(case when sl_hit then 1 else 0 end), 0) as profit_factor
from signals
where status = 'closed';
 */
async function fetchProfitFactor(supabase: ReturnType<typeof useSupabase>): Promise<ProfitFactorIndicatorResult | null> {
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

    const profitFactor = loss === 0 ? 0 : profit / loss;

    return new ProfitFactorIndicatorResult(profitFactor);
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

----------------------------------------------------

SELECT
COUNT(*) FILTER (WHERE tp_hit = true) AS wins,
COUNT(*) FILTER (WHERE sl_hit = true) AS losses,
COUNT(*) AS total_trades
FROM signals
WHERE status = 'closed';
 */
async function fetchWinRate(supabase: ReturnType<typeof useSupabase>): Promise<WinRateIndicatorResult | null> {
    const { data, error } = await supabase
        .from("signals")
        .select<"tp_hit, sl_hit", {
            tp_hit: boolean;
            sl_hit: boolean;
        }>()
        .eq("status", "closed");

    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return null;
    }

    const total = data.length;
    const wins = data.filter(x => x.tp_hit).length;
    const losses = data.filter(x => x.sl_hit).length;

    const winRate = Math.round((wins / total) * 100 * 100) / 100;

    return new WinRateIndicatorResult(
        winRate,
        wins,
        losses,
        total,
    );
}
