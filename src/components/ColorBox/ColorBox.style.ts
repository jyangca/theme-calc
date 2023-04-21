import { Flex } from 'components/common';
import styled from 'styled-components';

type BoxProps = {
  color: string;
  width?: string;
  height?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Box = styled(Flex)<BoxProps>`
  width: ${({ width }) => width || '100px'};
  height: ${({ height }) => height || '100px'};
  background-color: ${({ color }) => color};
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`;
