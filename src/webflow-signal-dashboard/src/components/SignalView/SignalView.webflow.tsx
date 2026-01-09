import { declareComponent } from "@webflow/react";
import { SignalView } from "./SignalView";

export default declareComponent(SignalView, {
    name: "SignalView",
    description: "Trading signals cards with Supabase realtime updates",
    group: "Signals",
});