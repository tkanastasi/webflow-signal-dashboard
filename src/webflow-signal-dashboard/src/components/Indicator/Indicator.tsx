import React from "react";
import { useKpi } from "../../services/useKpi";
import { useSignals } from "../../services/useSignals";

export enum IndicatorType {
    ProfitFactor = "ProfitFactor",
    WinRate = "WinRate",
    MonthlyGrowth = "MonthlyGrowth",
}

interface IndicatorProps {
    type: IndicatorType;
}

const Indicator: React.FC<IndicatorProps> = (props) => {

    const { type } = props;

    const { signals } = useSignals({ market: null, limit: null });
    const kpi = useKpi(signals);

    if (!kpi) {
        return (
            <span>
                Loading...
            </span>
        );
    }

    if (type === IndicatorType.MonthlyGrowth) {
        return (
            <div>
                <div>{kpi.monthlyGrowth !== null ? `${kpi.monthlyGrowth.toFixed(1)}%` : "N/A"}</div>
                <div>+3.4R Generated This Month</div>
            </div>
        );
    }
    else if (type === IndicatorType.ProfitFactor) {
        return (
            <div>
                <div>{kpi.profitFactor !== null ? kpi.profitFactor.toFixed(1) : "N/A"}</div>
                <div>For every $1 loss, we make $2.1</div>
            </div>
        );
    }
    else if (type === IndicatorType.WinRate) {
        return (
            <div>
                <div>{kpi.winRate !== null ? `${kpi.winRate.toFixed(1)}%` : "N/A"}</div>
                <div>(1,735 wins, 1,112 losses out of 2,847 total trades)</div>
            </div>
        );
    }
    else {
        throw new Error(`Not implemented for '${type}'`);
    }
};

export default Indicator;
