import styled from "styled-components";
import { SignalCardContainer } from "../SignalCard/SignalCard.styled";

export const SignalCardContainerSkeleton = styled(SignalCardContainer)`
  animation: pulsate 2s ease-in-out infinite;

  @keyframes pulsate {
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

export const SignalCardTextSkeleton = styled.div`
  position: relative;
  color: transparent;
  user-select: none;
  -webkit-user-select: none;

  &:after {
    content: "";
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 0%;
    right: 20%;
    border-radius: 0.25rem;
    background-color: #ffffff10;
  }
`