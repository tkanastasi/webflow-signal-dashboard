import styled from "styled-components";

export const SignalCardContainer = styled.div`
  background-color: #ffffff05;
  border: 1px solid #181818;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

/* signal-card_top */

export const SignalCardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

/* signal-card_asset */

export const SignalCardAsset = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const SignalCardAssetIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #f59e0b26;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignalCardAssetIconSymbol = styled.span`
  color: #f59e0b;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

export const SignalCardAssetInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SignalCardAssetSymbol = styled.span`
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const SignalCardAssetCategory = styled.span`
  color: #999;
  font-size: 0.75rem;
  line-height: 1rem;
`;

/* signal-card_status */

export const SignalCardStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  background-color: #85efac1a;
  border-radius: 10px;
`;

export const PulsingDot = styled.span`
  position: relative;
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;

    width: 0.5rem;
    height: 0.5rem;

    background-color: #28af60;
    border-radius: 50%;

    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;

    width: 0.75rem;
    height: 0.75rem;

    border: 2px solid #28af60;
    border-radius: 50%;

    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;

    animation: pulsate 1.6s ease-out infinite;
    z-index: 1;
  }

  @keyframes pulsate {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    40% {
      opacity: 0.4;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 0;
    }
  }
`;

export const SignalCardStatusText = styled.span`
  color: #85efac;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  text-transform: capitalize;
`;

/* signal-card_divider */

export const SignalCardDivider = styled.div`
  height: 0.05em;
  background-color: #262626;
  margin-bottom: 0.75rem;
`;

/* signal-card_action */

export const SignalCardAction = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const SignalCardActionMain = styled.div<{ $side?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;

  background-color: ${({ $side }) =>
    $side === "buy"
      ? "rgba(40, 175, 96, 0.1)"
      : "rgba(220, 40, 40, 0.1)"};
`;

export const SignalCardActionType = styled.span<{ $side?: string }>`
  color: ${({ $side }) =>
    $side === "buy" ? "#28af60" : "#dc2828"};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const SignalCardActionIcon = styled.span<{ $side?: string }>`
  width: 0.75rem;
  height: 0.75rem;

  color: ${({ $side }) =>
    $side?.toLowerCase() === "buy" ? "#28af60" : "#dc2828"};

  transform: ${({ $side }) =>
    $side?.toLowerCase() === "buy" ? "scaleY(1)" : "scaleY(-1)"};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.2s ease;
`;

export const SignalCardActionMeta = styled.div<{ $tiny?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: #1f1f1f;
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;

  margin-left: ${({ $tiny }) => ($tiny ? "0.25rem" : "0.5rem")};
`;

export const SignalCardActionMetaText = styled.span`
  color: #999;
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
`;

/* signal-card_levels */

export const SignalCardLevels = styled.div`
  margin-bottom: 0.75rem;
`;

export const SignalCardLevelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.375rem 1rem;
  font-size: 12px;
  line-height: 14px;
`;

export const SignalCardLevelsItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SignalCardLevelsLabel = styled.span`
  color: #999;
  line-height: 18px;
`;

export const SignalCardLevelsValue = styled.span`
  color: #fff;
  font-family: "JetBrains Mono", monospace;
  font-weight: 400;
  line-height: 18px;
`;

/* signal-card_footer */

export const SignalCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SignalCardTime = styled.span`
  color: #999c;
  font-size: 10px;
  line-height: 15px;
`;

export const SignalCardCTA = styled.button`
  color: #000;
  background-color: #85efac;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  border: none;
  cursor: pointer;
`;