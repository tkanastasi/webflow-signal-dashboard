import styled from "styled-components";
import { SignalCardContainer } from "../SignalCard/SignalCard.styled";

export const SignalCardContainerSkeleton = styled(SignalCardContainer)`
  animation: loading-pulse 2s ease-in-out infinite;

  @keyframes loading-pulse {
    0% {
      opacity: 0.75;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.75;
    }
  }
`;

export const SignalCardTextSkeleton = styled.div<{ $length: number }>`
  position: relative;
  display: inline-block;
  width: ${({ $length }) => $length}ch;
  height: 1.25em;
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    inset: 10% 0;
    border-radius: 0.25rem;
    background-color: #ffffff10;
  }
`;
