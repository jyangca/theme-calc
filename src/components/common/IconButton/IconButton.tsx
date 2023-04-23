import { animated, useSpring } from '@react-spring/web';
import { IconWrapper } from './IconButton.style';

type AddButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};
const IconButton = ({ onClick, children }: AddButtonProps) => {
  const iconButtonSpringProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
    delay: 100,
  });

  return (
    <animated.div style={iconButtonSpringProps}>
      <IconWrapper onClick={onClick} justify="CENTER">
        {children}
      </IconWrapper>
    </animated.div>
  );
};

export default IconButton;
