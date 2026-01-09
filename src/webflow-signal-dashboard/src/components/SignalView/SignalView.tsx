import { SignalViewContainer } from "./SignalView.styled";
import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
import { useSignals } from "./useSignals";
import React from "react";
import SignalCard from "./SignalCard/SignalCard";

export const SignalView = () => {

    const { isPending, signals, error } = useSignals();

    React.useEffect(
        () => {
            console.warn(signals);
        },
        [signals]
    );

    React.useEffect(
        () => {
            !!error && console.error(error);
        },
        [error]
    );

    return (
        <StyledComponentsShadowDomProvider>
            {isPending ? (
                <div>Loading...</div>
            ) : (
                !error ? (
                    <SignalViewContainer>
                        {signals.map(signal => (
                            <SignalCard key={signal.id} {...signal} />
                        ))}
                    </SignalViewContainer>
                ) : (
                    <div>Error</div>
                )
            )}
        </StyledComponentsShadowDomProvider>
    );
};