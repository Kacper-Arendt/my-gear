import styled from "styled-components";
import { SpinnerCube } from "./SpinnerCube";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s;
`;

export const Spinner = () => {
  return (
    <Wrapper>
      <SpinnerCube />
    </Wrapper>
  );
};
