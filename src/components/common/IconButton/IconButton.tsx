import { IconWrapper } from './IconButton.style';

type AddButtonProps = {
  onClick?: () => void;
  size?: number;
  children: React.ReactNode;
};
const IconButton = ({ onClick, size, children }: AddButtonProps) => {
  return (
    <IconWrapper onClick={onClick} justify="CENTER" size={size}>
      {children}
    </IconWrapper>
  );
};

export default IconButton;
