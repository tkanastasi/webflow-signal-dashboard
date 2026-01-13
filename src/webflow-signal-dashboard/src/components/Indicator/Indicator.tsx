import React from "react";
import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
import { MonthlyGrowthIndicatorResult, ProfitFactorIndicatorResult, useIndicator, WinRateIndicatorResult } from "../../services/useIndicator";
import {
    IndicatorContainer,
    IndicatorMain,
    IndicatorValue,
    IndicatorSubtext,
    SparklineWrapper
} from "./Indicator.styled";
import { PulsingDot } from "../SignalCard/SignalCard.styled";
import { SparklineIcon } from "../../assets/svg";
import { SkeletonText } from "../SignalViewSkeleton/SignalViewSkeleton";

export enum IndicatorType {
    MonthlyGrowth = "MonthlyGrowth",
    ProfitFactor = "ProfitFactor",
    WinRate = "WinRate",
}

interface IndicatorProps {
    type: IndicatorType;
}

const Indicator: React.FC<IndicatorProps> = ({ type }) => {

    const { isPending, value, error } = useIndicator(type);

    const renderIndicatorContent = () => {
        if (isPending) {
            return (
                <IndicatorContainer>
                    <SkeletonText length={8} height="2rem" />
                    <SkeletonText length={16} height="13px" />
                </IndicatorContainer>
            );
        }

        if (error) {
            return <span>[ERROR]</span>;
        }

        if (value instanceof MonthlyGrowthIndicatorResult) {
            return (
                <IndicatorContainer>
                    <IndicatorMain>
                        <PulsingDot />
                        <IndicatorValue $positive={value !== null && value.growth >= 0}>
                            {value.growth !== null
                                ? `${value.growth >= 0 ? "+" : ""}${(value.growth / 10).toFixed(1)}%`
                                : "N/A"}
                        </IndicatorValue>
                        <SparklineWrapper>
                            <SparklineIcon />
                        </SparklineWrapper>
                    </IndicatorMain>

                    <IndicatorSubtext>
                        {value.totalR !== null
                            ? `${value.totalR >= 0 ? "+" : ""}${(value.totalR / 100).toFixed(1)}R`
                            : "N/A"} Generated This Month
                    </IndicatorSubtext>
                </IndicatorContainer>
            );
        }
        else if (value instanceof ProfitFactorIndicatorResult) {
            return (
                <IndicatorContainer>
                    <IndicatorMain>
                        <IndicatorValue>
                            {value.profitFactor !== null ? value.profitFactor.toFixed(1) : "N/A"}
                        </IndicatorValue>
                    </IndicatorMain>

                    <IndicatorSubtext>
                        For every $1 loss, we make ${value.profitFactor !== null ? value.profitFactor.toFixed(1) : "N/A"}
                    </IndicatorSubtext>
                </IndicatorContainer>
            );
        }
        else if (value instanceof WinRateIndicatorResult) {
            return (
                <IndicatorContainer>
                    <IndicatorMain>
                        <IndicatorValue>
                            {value.winRate !== null ? `${value.winRate.toFixed(1)}%` : "N/A"}
                        </IndicatorValue>
                    </IndicatorMain>

                    <IndicatorSubtext>
                        (
                        {value.wins !== null ? value.wins : "N/A"}{" "}wins,{" "}
                        {value.losses !== null ? value.losses : "N/A"}{" "}losses out of{" "}
                        {value.total !== null ? value.total : "N/A"}{" "}total trades
                        )
                    </IndicatorSubtext>
                </IndicatorContainer>
            );
        }
        else {
            throw new Error(`Not implemented for '${type}'`);
        }
    };

    return (
        <StyledComponentsShadowDomProvider>
            {renderIndicatorContent()}
        </StyledComponentsShadowDomProvider>
    );
};

export default Indicator;
