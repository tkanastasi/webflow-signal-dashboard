import React from "react";
import { isSignalItem, SignalMarket, useSupabase, type SignalItem } from "./useSupabase";

export function useSignals(filter: { market: SignalMarket | null, limit: number | null }) {

    const { market, limit } = filter;

    const [isPending, togglePending] = React.useState<boolean>(true);
    const [signals, setSignals] = React.useState<SignalItem[]>([]);
    const [error, setError] = React.useState<Error | null>(null);

    const [lastUpdate, setLastUpdate] = React.useState<number | null>(null);

    const supabase = useSupabase();

    const loadSignals = React.useCallback(
        async () => {
            let query = supabase
                .from("signals")
                .select<"*", SignalItem>()
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
