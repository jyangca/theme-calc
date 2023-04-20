import styled from 'styled-components';

type BoxProps = {
  color: string;
  isStandard: boolean;
};
export const Box = styled.div<BoxProps>`
  width: 100px;
  height: 100px;
  background-color: ${({ color }) => color || 'white'};
  border: ${({ isStandard }) => (isStandard ? '2px solid white' : 'none')};
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
`;
