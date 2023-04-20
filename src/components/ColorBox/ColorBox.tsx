import { Box } from './ColorBox.style';

type ColorBoxProps = {
  color: string;
  isStandard: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ColorBox = ({ color, isStandard, ...props }: ColorBoxProps) => {
  return <Box color={color} isStandard={isStandard} {...props} />;
};

export default ColorBox;
