import { IconWrapper } from './IconButton.style';

type AddButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};
const IconButton = ({ onClick, children }: AddButtonProps) => {
  return (
    <IconWrapper onClick={onClick} justify="CENTER">
      {children}
    </IconWrapper>
  );
};

export default IconButton;
