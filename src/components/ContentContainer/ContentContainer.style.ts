import { Flex } from 'components/common';
import styled from 'styled-components';

type ContentsWrapperProps = {
  backgroundColor: string;
};
export const ContentsWrapper = styled(Flex)<ContentsWrapperProps>`
  height: 350px;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
