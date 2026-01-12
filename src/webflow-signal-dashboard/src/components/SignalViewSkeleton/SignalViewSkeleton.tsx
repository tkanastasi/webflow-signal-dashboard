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

export type SkeletonTextProps = {
    length: number;
    height: string;
};

export const SkeletonText = ({ length, height }: SkeletonTextProps) => (
    <SignalCardTextSkeleton $length={length} $height={height} />
);

const SignalViewSkeleton: React.FC = () => {
    return (
        <SignalViewContainer>
            {[...new Array(8)].map((_, i) => (
                <SignalCardContainerSkeleton key={i}>
                    <SignalCardTop>
                        <SignalCardAsset>
                            <SignalCardAssetIcon />

                            <SignalCardAssetInfo>
                                <SkeletonText length={8} height="1.5rem" />
                                <SkeletonText length={4} height="1rem" />
                            </SignalCardAssetInfo>
                        </SignalCardAsset>
                    </SignalCardTop>

                    <SignalCardDivider />

                    <SignalCardAction>
                        <SkeletonText length={16} height="1rem" />
                    </SignalCardAction>

                    <SignalCardLevels>
                        <SignalCardLevelsGrid>
                            {[0, 1, 2].map((idx) => (
                                <SignalCardLevelsItem key={idx}>
                                    <SignalCardLevelsLabel>
                                        <SkeletonText length={2} height="18px" />
                                    </SignalCardLevelsLabel>
                                    <SkeletonText length={8} height="18px" />
                                </SignalCardLevelsItem>
                            ))}
                        </SignalCardLevelsGrid>
                    </SignalCardLevels>

                    <SignalCardDivider />

                    <SignalCardFooter>
                        <SkeletonText length={4} height="15px" />
                        <SkeletonText length={8} height="23px" />
                    </SignalCardFooter>
                </SignalCardContainerSkeleton>
            ))}
        </SignalViewContainer>
    );
};

export default SignalViewSkeleton;