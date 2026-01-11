import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import Indicator, { IndicatorType } from "./Indicator";

export default declareComponent(Indicator, {
    name: "Indicator",
    description: "Displays a KPI value calculated from signals",
    group: "KPI",

    props: {
        type: props.Variant({
            name: "Type",
            options: Object.values(IndicatorType),
        }),
    },
});
