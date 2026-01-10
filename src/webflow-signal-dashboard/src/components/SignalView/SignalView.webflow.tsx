import { declareComponent } from "@webflow/react";
import { SignalView } from "./SignalView";
import { props } from "@webflow/data-types";
import { SignalMarket } from "./useSignals";

export default declareComponent(SignalView, {
    name: "SignalView",
    description: "Trading signals cards with Supabase realtime updates",
    group: "Signals",
    props: {
        market: props.Variant({
            name: 'Market',
            options: ["All", ...Object.values(SignalMarket)],
        }),
    },
});