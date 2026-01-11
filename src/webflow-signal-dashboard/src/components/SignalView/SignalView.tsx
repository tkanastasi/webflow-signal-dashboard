import {
    SignalViewWrapper,
    SignalViewHeaderWrapper,
    SignalViewHeaderIcon,
    SignalViewHeaderTextH1,
    SignalViewHeaderTextH2,
    SignalViewHeaderTextH3,
    SignalViewHeaderMeta,
    SignalViewError,
    SignalViewContainer
} from "./SignalView.styled";
import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
import { SignalMarket, SignalType, useSignals } from "./useSignals";
import React from "react";
import SignalCard from "../SignalCard/SignalCard";
import SignalViewSkeleton from "../SignalViewSkeleton/SignalViewSkeleton";
import { ActivityPulseIcon, TrackRecordIcon } from "../../assets/svg";

interface SignalViewProps {
    market: SignalMarket | "All";
}

export const SignalView: React.FC<SignalViewProps> = (props) => {

    const { market } = props;

    const { isPending, signals, error } = useSignals({
        market: market === "All" ? null : market,
        limit: 1000,
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
                    <div style={{ height: "5.5rem" }} />
                    <SignalViewSkeleton />
                </div>
            ) : !error ? (
                <SignalViewWrapper>
                    <SignalViewHeaderWrapper>
                        <SignalViewHeaderTextH1>Command Center</SignalViewHeaderTextH1>
                        <SignalViewHeaderMeta>
                            {activeSignals.length + closedSignals.length}{" "}
                            {activeSignals.length + closedSignals.length === 1 ? "signal" : "signals"}
                        </SignalViewHeaderMeta>
                    </SignalViewHeaderWrapper>

                    <SignalViewHeaderWrapper>
                        <SignalViewHeaderIcon>
                            <ActivityPulseIcon />
                        </SignalViewHeaderIcon>

                        <SignalViewHeaderTextH2>Live Action</SignalViewHeaderTextH2>

                        <SignalViewHeaderMeta>{activeSignals.length}{" "} active</SignalViewHeaderMeta>
                    </SignalViewHeaderWrapper>

                    <SignalViewContainer>
                        {activeSignals.length > 0 ? (
                            activeSignals.map((signal) => (
                                <SignalCard key={signal.id} {...signal} />
                            ))
                        ) : (
                            <SignalViewHeaderTextH3>No signals yet</SignalViewHeaderTextH3>
                        )}
                    </SignalViewContainer>

                    <SignalViewHeaderWrapper>
                        <SignalViewHeaderIcon>
                            <TrackRecordIcon />
                        </SignalViewHeaderIcon>

                        <SignalViewHeaderTextH2>Verified Track Record</SignalViewHeaderTextH2>

                        <SignalViewHeaderMeta>{closedSignals.length}{" "} closed</SignalViewHeaderMeta>
                    </SignalViewHeaderWrapper>

                    <SignalViewContainer>
                        {closedSignals.length > 0 ? (
                            closedSignals.map((signal) => (
                                <SignalCard key={signal.id} {...signal} />
                            ))
                        ) : (
                            <SignalViewHeaderTextH3>No signals yet</SignalViewHeaderTextH3>
                        )}
                    </SignalViewContainer>
                </SignalViewWrapper>
            ) : (
                <SignalViewError>Something went wrong</SignalViewError>
            )}
        </StyledComponentsShadowDomProvider>
    );
};