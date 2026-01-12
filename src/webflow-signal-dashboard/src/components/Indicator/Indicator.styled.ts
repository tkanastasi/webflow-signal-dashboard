import styled from "styled-components";

export const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .25rem;
`;

export const IndicatorMain = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
`;

export const IndicatorValue = styled.div<{ $positive?: boolean }>`
  font-family: "JetBrains Mono", monospace;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;

  color: ${({ $positive }) =>
        $positive === false ? "#e14c4c" : "#28af60"};

  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

export const IndicatorSubtext = styled.div`
  font-size: 10px;
  color: #8b8b8b;
`;

export const SparklineWrapper = styled.div`
  width: 80px;
  height: 24px;
  vertical-align: middle;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;