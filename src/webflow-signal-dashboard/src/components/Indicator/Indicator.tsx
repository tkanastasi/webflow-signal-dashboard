import React from "react";
import { useIndicator } from "../../services/useIndicator";

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
            <div>
                <div>{value !== null ? `${value.toFixed(1)}%` : "N/A"}</div>
                <div>+3.4R Generated This Month</div>
            </div>
        );
    }
    else if (type === IndicatorType.ProfitFactor) {
        return (
            <div>
                <div>{value !== null ? value.toFixed(1) : "N/A"}</div>
                <div>For every $1 loss, we make $2.1</div>
            </div>
        );
    }
    else if (type === IndicatorType.WinRate) {
        return (
            <div>
                <div>{value !== null ? `${value.toFixed(1)}%` : "N/A"}</div>
                <div>(1,735 wins, 1,112 losses out of 2,847 total trades)</div>
            </div>
        );
    }
    else {
        throw new Error(`Not implemented for '${type}'`);
    }
};

export default Indicator;



