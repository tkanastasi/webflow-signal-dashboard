import React from "react";
import type { SignalItem } from "../useSignals";
import {
    SignalCardContainer,
    SignalCardTop,
    SignalCardAsset,
    SignalCardAssetIcon,
    SignalCardAssetIconSymbol,
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
import { formatTimeAgo, formatPrice } from "../utils";

const SignalCard: React.FC<SignalItem> = (signal) => {
    return (
        <SignalCardContainer>
            <SignalCardTop>
                <SignalCardAsset>
                    <SignalCardAssetIcon>
                        <SignalCardAssetIconSymbol>₿</SignalCardAssetIconSymbol>
                    </SignalCardAssetIcon>

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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                            <polyline points="16 7 22 7 22 13" />
                        </svg>
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
