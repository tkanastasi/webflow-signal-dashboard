import React from "react";
// import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
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

        switch (type) {
            case IndicatorType.MonthlyGrowth:
                return (
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
                );

            case IndicatorType.ProfitFactor:
                return (
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
                );

            case IndicatorType.WinRate:
                return (
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
                );

            default:
                throw new Error(`Not implemented for '${type}'`);
        }
    };
    /* test */
    return renderIndicatorContent();
};

export default Indicator;
