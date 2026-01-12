import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
import React from "react";
import { useIndicator } from "../../services/useIndicator";
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

    return (
        <StyledComponentsShadowDomProvider>
            {isPending ? (
                <IndicatorContainer>
                    <SkeletonText length={8} height="2rem" />
                    <SkeletonText length={16} height="13px" />
                </IndicatorContainer>
            ) : error ? (
                <span>[ERROR]</span>
            ) : type === IndicatorType.MonthlyGrowth ? (
                <IndicatorContainer>
                    <IndicatorMain>
                        <PulsingDot />
                        <IndicatorValue $positive={value !== null && value >= 0}>
                            {value !== null
                                ? `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
                                : "N/A"}
                        </IndicatorValue>
                        <SparklineWrapper>
                            <SparklineIcon />
                        </SparklineWrapper>
                    </IndicatorMain>

                    <IndicatorSubtext>
                        +3.4R Generated This Month
                    </IndicatorSubtext>
                </IndicatorContainer>
            ) : type === IndicatorType.ProfitFactor ? (
                <IndicatorContainer>
                    <IndicatorMain>
                        <IndicatorValue>
                            {value !== null ? value.toFixed(1) : "N/A"}
                        </IndicatorValue>
                    </IndicatorMain>

                    <IndicatorSubtext>
                        For every $1 loss, we make ${value !== null ? value.toFixed(1) : "N/A"}
                    </IndicatorSubtext>
                </IndicatorContainer>
            ) : type === IndicatorType.WinRate ? (
                <IndicatorContainer>
                    <IndicatorMain>
                        <IndicatorValue>
                            {value !== null ? `${value.toFixed(1)}%` : "N/A"}
                        </IndicatorValue>
                    </IndicatorMain>

                    <IndicatorSubtext>
                        (1,735 wins, 1,112 losses out of 2,847 total trades)
                    </IndicatorSubtext>
                </IndicatorContainer>
            ) : null}
        </StyledComponentsShadowDomProvider>
    );
};

export default Indicator;
