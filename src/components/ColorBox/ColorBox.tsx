import { invertHex, isValidHexColor } from 'utils/color';
import { Box } from './ColorBox.style';
import { BiWindowClose } from 'react-icons/bi';
import { Flex, Title } from 'components/common';

type ColorBoxProps = {
  color: string;
  height?: string;
  width?: string;
  isNamingMode: boolean;
  name: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ColorBox = ({
  color,
  height,
  width,
  isNamingMode,
  name,
  ...props
}: ColorBoxProps) => {
  if (!isValidHexColor(color)) {
    return (
      <Box color="#fafafa" height={height} width={width} justify="CENTER">
        <Flex direction="COLUMN">
          <BiWindowClose fill="#898989" size="30px" />
          <Title tag="h6" color="#898989">
            Wrong HEX format
          </Title>
        </Flex>
      </Box>
    );
  }
  return (
    <Box
      color={color}
      height={height}
      width={width}
      justify="CENTER"
      {...props}
    >
      <Title tag="h6" color={invertHex(color)}>
        {isNamingMode ? color : name}
      </Title>
    </Box>
  );
};

export default ColorBox;
