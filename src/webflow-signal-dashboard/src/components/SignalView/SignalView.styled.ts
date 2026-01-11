import styled from "styled-components";

export const SignalViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SignalViewContainer = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  gap: .75rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0px, 1fr));

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  
  @media (min-width: 1500px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  
  @media (min-width: 1800px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const SignalViewHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
`;

export const SignalViewHeaderIcon = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignalViewHeaderText = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

export const SignalViewHeaderMeta = styled.div`
  color: #999999;
  font-size: .75rem;
  line-height: 1rem;
  font-size: .75rem;
  line-height: 1rem;
  padding-left: .5rem;
  padding-right: .5rem;
`;

export const SignalViewError = styled.div`
  color: #dc2828;
`;