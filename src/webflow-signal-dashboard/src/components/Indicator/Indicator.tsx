import React from "react";
import { useIndicator } from "../../services/useIndicator";
import {
    IndicatorContainer,
    IndicatorMain,
    IndicatorValue,
    IndicatorSubtext,
    SparklineWrapper,
} from "./Indicator.styled";
import { PulsingDot } from "../SignalCard/SignalCard.styled";
import { SparklineIcon } from "../../assets/svg";
import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";

export enum IndicatorType {
    MonthlyGrowth = "MonthlyGrowth",
    ProfitFactor = "ProfitFactor",
    WinRate = "WinRate",
}

interface IndicatorProps {
    type: IndicatorType;
}

const Indicator: React.FC<IndicatorProps> = (props) => {

    const { type } = props;

    const { isPending, value, error } = useIndicator(type);

    if (isPending) {
        return (
            <span>
                Loading...
            </span>
        );
    }

    if (!!error) {
        return (
            <span>
                [ERROR]
            </span>
        );
    }

    if (type === IndicatorType.MonthlyGrowth) {
        return (
            <StyledComponentsShadowDomProvider>
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
            </StyledComponentsShadowDomProvider>
        );
    }
    else if (type === IndicatorType.ProfitFactor) {
        return (
            <StyledComponentsShadowDomProvider>
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
            </StyledComponentsShadowDomProvider>
        );
    }
    else if (type === IndicatorType.WinRate) {
        return (
            <StyledComponentsShadowDomProvider>
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
            </StyledComponentsShadowDomProvider>
        );
    }
    else {
        throw new Error(`Not implemented for '${type}'`);
    }
};

export default Indicator;