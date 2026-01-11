import React from "react";
import {
    SignalCardAction,
    SignalCardAsset,
    SignalCardAssetIcon,
    SignalCardAssetInfo,
    SignalCardDivider,
    SignalCardFooter,
    SignalCardLevels,
    SignalCardLevelsGrid,
    SignalCardLevelsItem,
    SignalCardLevelsLabel,
    SignalCardTop
} from "../SignalCard/SignalCard.styled";
import { SignalViewContainer } from "../SignalView/SignalView.styled";
import { SignalCardContainerSkeleton, SignalCardTextSkeleton } from "./SignalViewSkeleton.styled";

const SignalViewSkeleton: React.FC = () => {
    return (
        <SignalViewContainer>
            {[...new Array(8)].map((_, i) => (
                <SignalCardContainerSkeleton key={i}>
                    <SignalCardTop>
                        <SignalCardAsset>
                            <SignalCardAssetIcon />

                            <SignalCardAssetInfo>
                                <SignalCardTextSkeleton>
                                    XXXX/XXXX
                                </SignalCardTextSkeleton>
                                <SignalCardTextSkeleton>
                                    XXXX
                                </SignalCardTextSkeleton>
                            </SignalCardAssetInfo>
                        </SignalCardAsset>
                    </SignalCardTop>

                    <SignalCardDivider />

                    <SignalCardAction>
                        <SignalCardTextSkeleton>
                            XXXX
                        </SignalCardTextSkeleton>
                        <SignalCardTextSkeleton>
                            XXX XXXXXXXX
                        </SignalCardTextSkeleton>
                    </SignalCardAction>

                    <SignalCardLevels>
                        <SignalCardLevelsGrid>
                            <SignalCardLevelsItem>
                                <SignalCardLevelsLabel>Entry</SignalCardLevelsLabel>
                                <SignalCardTextSkeleton>
                                    00,000.00
                                </SignalCardTextSkeleton>
                            </SignalCardLevelsItem>

                            <SignalCardLevelsItem>
                                <SignalCardLevelsLabel>SL</SignalCardLevelsLabel>
                                <SignalCardTextSkeleton>
                                    00,000.00
                                </SignalCardTextSkeleton>
                            </SignalCardLevelsItem>

                            <SignalCardLevelsItem>
                                <SignalCardLevelsLabel>TP</SignalCardLevelsLabel>
                                <SignalCardTextSkeleton>
                                    00,000.00
                                </SignalCardTextSkeleton>
                            </SignalCardLevelsItem>
                        </SignalCardLevelsGrid>
                    </SignalCardLevels>

                    <SignalCardDivider />

                    <SignalCardFooter>
                        <SignalCardTextSkeleton>
                            00xx ago
                        </SignalCardTextSkeleton>

                        <SignalCardTextSkeleton>
                            View Signal
                        </SignalCardTextSkeleton>
                    </SignalCardFooter>
                </SignalCardContainerSkeleton>
            ))}
        </SignalViewContainer>
    );
};

export default SignalViewSkeleton;