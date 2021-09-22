import styled from "styled-components";

interface IProps {
  margin?: string;
}

const StyledLine = styled.div<IProps>`
  width: 90%;
  height: 0.2rem;
  margin: ${(props: IProps) => (props.margin ? `${props.margin} 0` : "1rem 0")};
  border-bottom: 1px solid #c5c5c5;
`;

export const Line = (props: IProps) => {
  return <StyledLine margin={props.margin} />;
};
