import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IconWrapper } from './AddButton.style';

type AddButtonProps = {
  onClick?: () => void;
};
const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <IconWrapper onClick={onClick} justify="CENTER">
      <AiOutlinePlusCircle size="40px" fill="#c7c7c7" />
    </IconWrapper>
  );
};

export default AddButton;
