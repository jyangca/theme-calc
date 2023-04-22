import { BsFillPaletteFill } from 'react-icons/bs';
import { IconWrapper } from '../button.style';

type AddButtonProps = {
  onClick?: () => void;
};
const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <IconWrapper onClick={onClick} justify="CENTER">
      <BsFillPaletteFill size="20px" fill="#c7c7c7" />
    </IconWrapper>
  );
};

export default AddButton;
