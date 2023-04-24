import { Flex } from 'components/common';
import styled from 'styled-components';

type IconWrapperProps = {
  size?: number;
};
export const IconWrapper = styled(Flex)<IconWrapperProps>`
  width: ${({ size }) => (size ? `${size}px` : '50px')};
  height: ${({ size }) => (size ? `${size}px` : '50px')};
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background-color: #474747;
    border-radius: 8px;
    cursor: pointer;
  }
`;
