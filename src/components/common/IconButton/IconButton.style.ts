import { Flex } from 'components/common';
import styled from 'styled-components';

export const IconWrapper = styled(Flex)`
  width: 50px;
  height: 50px;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background-color: #474747;
    border-radius: 8px;
    cursor: pointer;
  }
`;
