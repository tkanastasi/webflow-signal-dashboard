import React from "react";
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
    SignalCardCTAContainer,
    SignalCardCTA,
    SignalCardCTAHistory,
} from "./SignalCard.styled";
import { formatTimeAgo, formatPrice } from "../../services/utils";
import { TrendIcon } from "../../assets/svg";
import type { SignalItem } from "../../services/useSupabase";

const SignalCard: React.FC<SignalItem> = (props) => {
    return (
        <SignalCardContainer>
            <SignalCardTop>
                <SignalCardAsset>
                    <SignalCardAssetIcon $market={props.market}>₿</SignalCardAssetIcon>

                    <SignalCardAssetInfo>
                        <SignalCardAssetSymbol>
                            {props.symbol}
                        </SignalCardAssetSymbol>
                        <SignalCardAssetCategory>
                            {props.market}
                        </SignalCardAssetCategory>
                    </SignalCardAssetInfo>
                </SignalCardAsset>

                {props.status !== "closed" && (
                    <SignalCardStatus>
                        <PulsingDot />
                        <SignalCardStatusText>
                            {props.status}
                        </SignalCardStatusText>
                    </SignalCardStatus>
                )}
            </SignalCardTop>

            <SignalCardDivider />

            <SignalCardAction>
                <SignalCardActionMain $side={props.side}>
                    <SignalCardActionType $side={props.side}>
                        {props.side}
                    </SignalCardActionType>
                    <SignalCardActionIcon $side={props.side}>
                        <TrendIcon />
                    </SignalCardActionIcon>
                </SignalCardActionMain>

                <SignalCardActionMeta>
                    <SignalCardActionMetaText>
                        {props.timeframe}
                    </SignalCardActionMetaText>
                </SignalCardActionMeta>

                <SignalCardActionMeta $tiny>
                    <SignalCardActionMetaText>
                        {props.trading_style}
                    </SignalCardActionMetaText>
                </SignalCardActionMeta>

            </SignalCardAction>

            <SignalCardLevels>
                <SignalCardLevelsGrid>
                    <SignalCardLevelsItem>
                        <SignalCardLevelsLabel>Entry</SignalCardLevelsLabel>
                        <SignalCardLevelsValue>
                            {formatPrice(props.entry)}
                        </SignalCardLevelsValue>
                    </SignalCardLevelsItem>

                    <SignalCardLevelsItem>
                        <SignalCardLevelsLabel>SL</SignalCardLevelsLabel>
                        <SignalCardLevelsValue>
                            {formatPrice(props.sl)}
                        </SignalCardLevelsValue>
                    </SignalCardLevelsItem>

                    <SignalCardLevelsItem>
                        <SignalCardLevelsLabel>TP</SignalCardLevelsLabel>
                        <SignalCardLevelsValue>
                            {formatPrice(props.tp)}
                        </SignalCardLevelsValue>
                    </SignalCardLevelsItem>
                </SignalCardLevelsGrid>
            </SignalCardLevels>

            <SignalCardDivider />

            <SignalCardFooter>
                <SignalCardTime title={props.created_at}>
                    {formatTimeAgo(props.created_at)}
                </SignalCardTime>

                <SignalCardCTAContainer>
                    <SignalCardCTA
                        disabled={!props.chart_open_url}
                        onClick={() => {
                            if (props.chart_open_url) {
                                window.open(props.chart_open_url, "_blank");
                            }
                        }}
                    >
                        View Signal
                    </SignalCardCTA>

                    {props.status === "closed" && (
                        <SignalCardCTAHistory>View Execution</SignalCardCTAHistory>
                    )}
                </SignalCardCTAContainer>
            </SignalCardFooter>
        </SignalCardContainer>
    );
};

export default SignalCard;
