import React from "react";
import type { SignalItem } from "../../services/useSignals";
import {
    SignalCardContainer,
    SignalCardTop,
    SignalCardAsset,
    SignalCardAssetIcon,
    SignalCardAssetInfo,
    SignalCardAssetSymbol,
    SignalCardAssetCategory,
    SignalCardStatus,
    PulsingDot,
    SignalCardStatusText,
    SignalCardDivider,
    SignalCardAction,
    SignalCardActionMain,
    SignalCardActionType,
    SignalCardActionIcon,
    SignalCardActionMeta,
    SignalCardActionMetaText,
    SignalCardLevels,
    SignalCardLevelsGrid,
    SignalCardLevelsItem,
    SignalCardLevelsLabel,
    SignalCardLevelsValue,
    SignalCardFooter,
    SignalCardTime,
    SignalCardCTA,
} from "./SignalCard.styled";
import { formatTimeAgo, formatPrice } from "../../services/utils";
import { TrendIcon } from "../../assets/svg";

const SignalCard: React.FC<SignalItem> = (signal) => {
    return (
        <SignalCardContainer>
            <SignalCardTop>
                <SignalCardAsset>
                    <SignalCardAssetIcon $market={signal.market}>₿</SignalCardAssetIcon>

                    <SignalCardAssetInfo>
                        <SignalCardAssetSymbol>
                            {signal.symbol}
                        </SignalCardAssetSymbol>
                        <SignalCardAssetCategory>
                            {signal.market}
                        </SignalCardAssetCategory>
                    </SignalCardAssetInfo>
                </SignalCardAsset>

                {signal.status !== "closed" && (
                    <SignalCardStatus>
                        <PulsingDot />
                        <SignalCardStatusText>
                            {signal.status}
                        </SignalCardStatusText>
                    </SignalCardStatus>
                )}
            </SignalCardTop>

            <SignalCardDivider />

            <SignalCardAction>
                <SignalCardActionMain $side={signal.side}>
                    <SignalCardActionType $side={signal.side}>
                        {signal.side}
                    </SignalCardActionType>
                    <SignalCardActionIcon $side={signal.side}>
                        <TrendIcon />
                    </SignalCardActionIcon>
                </SignalCardActionMain>

                <SignalCardActionMeta>
                    <SignalCardActionMetaText>
                        {signal.timeframe}
                    </SignalCardActionMetaText>
                </SignalCardActionMeta>

                <SignalCardActionMeta $tiny>
                    <SignalCardActionMetaText>
                        {signal.trading_style}
                    </SignalCardActionMetaText>
                </SignalCardActionMeta>

            </SignalCardAction>

            <SignalCardLevels>
                <SignalCardLevelsGrid>
                    <SignalCardLevelsItem>
                        <SignalCardLevelsLabel>Entry</SignalCardLevelsLabel>
                        <SignalCardLevelsValue>
                            {formatPrice(signal.entry)}
                        </SignalCardLevelsValue>
                    </SignalCardLevelsItem>

                    <SignalCardLevelsItem>
                        <SignalCardLevelsLabel>SL</SignalCardLevelsLabel>
                        <SignalCardLevelsValue>
                            {formatPrice(signal.sl)}
                        </SignalCardLevelsValue>
                    </SignalCardLevelsItem>

                    <SignalCardLevelsItem>
                        <SignalCardLevelsLabel>TP</SignalCardLevelsLabel>
                        <SignalCardLevelsValue>
                            {formatPrice(signal.tp)}
                        </SignalCardLevelsValue>
                    </SignalCardLevelsItem>
                </SignalCardLevelsGrid>
            </SignalCardLevels>

            <SignalCardDivider />

            <SignalCardFooter>
                <SignalCardTime title={signal.created_at}>
                    {formatTimeAgo(signal.created_at)}
                </SignalCardTime>

                <SignalCardCTA>
                    View Signal
                </SignalCardCTA>
            </SignalCardFooter>
        </SignalCardContainer>
    );
};

export default SignalCard;
