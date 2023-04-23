import { animated } from '@react-spring/web';
import styled from 'styled-components';

export const ContentBox = styled(animated.div)`
  position: absolute;
`;

type ChildrenWrapperProps = {
  disabled?: boolean;
};
export const ChildrenWrapper = styled.div<ChildrenWrapperProps>`
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`;
