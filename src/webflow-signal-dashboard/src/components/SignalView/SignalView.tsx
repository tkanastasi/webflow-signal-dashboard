import { SignalViewContainer } from "./SignalView.styled";
import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
import { SignalMarket, SignalType, useSignals } from "./useSignals";
import React from "react";
import SignalCard from "../SignalCard/SignalCard";
import SignalViewSkeleton from "../SignalViewSkeleton/SignalViewSkeleton";

interface SignalViewProps {
    market: SignalMarket | "All";
}

export const SignalView: React.FC<SignalViewProps> = (props) => {

    const { market } = props;

    const { isPending, signals, error } = useSignals({
        market: market === "All" ? null : market,
        limit: 100,
    });

    React.useEffect(
        () => {
            signals.length > 0 && console.warn(signals);
        },
        [signals]
    );

    React.useEffect(
        () => {
            !!error && console.error(error);
        },
        [error]
    );

    const activeSignals = React.useMemo(
        () => signals.filter(x => x.status === SignalType.Active),
        [signals]
    );

    const closedSignals = React.useMemo(
        () => signals.filter(x => x.status === SignalType.Closed),
        [signals]
    );

    return (
        <StyledComponentsShadowDomProvider>
            {isPending ? (
                <div>
                    <div style={{ color: "#fff" }}>
                        Live Action
                    </div>
                    <SignalViewSkeleton />

                    <div style={{ color: "#fff" }}>
                        Verified Track Record
                    </div>
                    <SignalViewSkeleton />
                </div>
            ) : (
                !error ? (
                    <div>
                        <div style={{ color: "#fff" }}>
                            Live Action ({activeSignals.length} {activeSignals.length === 1 ? "signal" : "signals"})
                        </div>
                        <SignalViewContainer>
                            {activeSignals.length > 0 && activeSignals.map(signal => (
                                <SignalCard key={signal.id} {...signal} />
                            ))}
                            {activeSignals.length === 0 && (
                                <div style={{ color: "#fff" }}>No signals yet</div>
                            )}
                        </SignalViewContainer>

                        <div style={{ color: "#fff" }}>
                            Verified Track Record ({closedSignals.length} {closedSignals.length === 1 ? "signal" : "signals"})
                        </div>
                        <SignalViewContainer>
                            {closedSignals.length > 0 && closedSignals.map(signal => (
                                <SignalCard key={signal.id} {...signal} />
                            ))}
                            {closedSignals.length === 0 && (
                                <div style={{ color: "#fff" }}>No signals yet</div>
                            )}
                        </SignalViewContainer>
                    </div>
                ) : (
                    <div>Something went wrong</div>
                )
            )}
        </StyledComponentsShadowDomProvider>
    );
};