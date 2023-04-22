import { CgRename } from 'react-icons/cg';
import { IconWrapper } from '../button.style';

type AddButtonProps = {
  onClick?: () => void;
};
const RenameButton = ({ onClick }: AddButtonProps) => {
  return (
    <IconWrapper onClick={onClick} justify="CENTER">
      <CgRename size="40px" fill="#c7c7c7" />
    </IconWrapper>
  );
};

export default RenameButton;
