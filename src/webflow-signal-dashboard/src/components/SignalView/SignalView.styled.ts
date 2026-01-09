import styled from "styled-components";

export const SignalViewContainer = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  gap: .75rem;
  min-height: 100svh;
  display: grid;
  grid-template-columns: repeat(1, minmax(0px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }

  @media (min-width: 896px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }

  @media (min-width: 1152px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
  }

  @media (min-width: 1380px) {
    grid-template-columns: repeat(5, minmax(0px, 1fr));
  }
`;


