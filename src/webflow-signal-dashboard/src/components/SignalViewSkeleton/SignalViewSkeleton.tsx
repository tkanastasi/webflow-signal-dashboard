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

type SkeletonTextProps = {
    length: number;
};

export const SkeletonText: React.FC<SkeletonTextProps> = ({ length }) => {
    return <SignalCardTextSkeleton $length={length} aria-hidden />;
};

const SignalViewSkeleton: React.FC = () => {
    return (
        <SignalViewContainer>
            {[...new Array(8)].map((_, i) => (
                <SignalCardContainerSkeleton key={i}>
                    <SignalCardTop>
                        <SignalCardAsset>
                            <SignalCardAssetIcon />

                            <SignalCardAssetInfo>
                                <SkeletonText length={8} />
                                <SkeletonText length={4} />
                            </SignalCardAssetInfo>
                        </SignalCardAsset>
                    </SignalCardTop>

                    <SignalCardDivider />

                    <SignalCardAction>
                        <SkeletonText length={16} />
                    </SignalCardAction>

                    <SignalCardLevels>
                        <SignalCardLevelsGrid>
                            <SignalCardLevelsItem>
                                <SignalCardLevelsLabel>Entry</SignalCardLevelsLabel>
                                <SkeletonText length={8} />
                            </SignalCardLevelsItem>

                            <SignalCardLevelsItem>
                                <SignalCardLevelsLabel>SL</SignalCardLevelsLabel>
                                <SkeletonText length={8} />
                            </SignalCardLevelsItem>

                            <SignalCardLevelsItem>
                                <SignalCardLevelsLabel>TP</SignalCardLevelsLabel>
                                <SkeletonText length={8} />
                            </SignalCardLevelsItem>
                        </SignalCardLevelsGrid>
                    </SignalCardLevels>

                    <SignalCardDivider />

                    <SignalCardFooter>
                        <SkeletonText length={4} />
                        <SkeletonText length={8} />
                    </SignalCardFooter>
                </SignalCardContainerSkeleton>
            ))}
        </SignalViewContainer>
    );
};

export default SignalViewSkeleton;