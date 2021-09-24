import styled from "styled-components";

const StyledSpinner = styled.div`
  width: 8rem;
  height: 8rem;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
`;

const Cube = styled.div`
  background-color: black;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;

  @-webkit-keyframes sk-cubemove {
    25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
    50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
    75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
    100% { -webkit-transform: rotate(-360deg) }
  }

  @keyframes sk-cubemove {
    25% {
      transform: translateX(42px) rotate(-90deg) scale(0.5);
      -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
    } 50% {
        transform: translateX(42px) translateY(42px) rotate(-179deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
      } 50.1% {
          transform: translateX(42px) translateY(42px) rotate(-180deg);
          -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
        } 75% {
            transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
          } 100% {
              transform: rotate(-360deg);
              -webkit-transform: rotate(-360deg);
            }
`;

const Cube2 = styled(Cube)`
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
`;

export const SpinnerCube = () => {
  return (
    <>
      <StyledSpinner>
        <Cube></Cube>
        <Cube2></Cube2>
      </StyledSpinner>
    </>
  );
};
