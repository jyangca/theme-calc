import { InputItem } from './Input.style';

type InputProps = {
  value?: string;
} & React.HTMLAttributes<HTMLInputElement>;

const Input = ({ value, ...props }: InputProps) => {
  return <InputItem value={value} {...props}></InputItem>;
};

export default Input;
