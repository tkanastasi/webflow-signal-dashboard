import { SignalViewContainer } from "./SignalView.styled";
import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
import { SignalItemType, useSignals } from "./useSignals";
import React from "react";
import SignalCard from "../SignalCard/SignalCard";
import SignalViewSkeleton from "../SignalViewSkeleton/SignalViewSkeleton";

export const SignalView = () => {

    const { isPending, signals, error } = useSignals();

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
        () => signals.filter(x => x.status === SignalItemType.Active),
        [signals]
    );

    const closedSignals = React.useMemo(
        () => signals.filter(x => x.status === SignalItemType.Closed),
        [signals]
    );

    return (
        <StyledComponentsShadowDomProvider>
            {isPending ? (
                <SignalViewSkeleton />
            ) : (
                !error ? (
                    <div>
                        <div style={{ color: "#fff" }}>
                            Live Action ({activeSignals.length} {activeSignals.length === 1 ? "signal" : "signals"})
                        </div>
                        <SignalViewContainer>
                            {activeSignals.map(signal => (
                                <SignalCard key={signal.id} {...signal} />
                            ))}
                        </SignalViewContainer>
                        <div style={{ color: "#fff" }}>
                            Verified Track Record ({closedSignals.length} {closedSignals.length === 1 ? "signal" : "signals"})
                        </div>
                        <SignalViewContainer>
                            {closedSignals.map(signal => (
                                <SignalCard key={signal.id} {...signal} />
                            ))}
                        </SignalViewContainer>
                    </div>
                ) : (
                    <div>Error</div>
                )
            )}
        </StyledComponentsShadowDomProvider>
    );
};