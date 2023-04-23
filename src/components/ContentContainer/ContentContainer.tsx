import { Flex, IconButton, Popover } from 'components/common';
import { ContentsWrapper } from './ContentContainer.style';
import { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { BsFillPaletteFill } from 'react-icons/bs';

type ContentContainerProps = {
  children: React.ReactNode;
};
const ContentContainer = ({ children }: ContentContainerProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#333333');

  const handleChangeColor = (color: ColorResult) =>
    setBackgroundColor(color.hex);

  return (
    <ContentsWrapper align="START" backgroundColor={backgroundColor}>
      <Flex direction="COLUMN" align="START" gap={{ row: 10 }}>
        <Popover
          content={
            <SketchPicker
              color={backgroundColor}
              onChange={handleChangeColor}
            />
          }
        >
          <IconButton>
            <BsFillPaletteFill size="20px" fill="#c7c7c7" />
          </IconButton>
        </Popover>
        <Flex boxFill gap={{ column: 16 }}>
          {children}
        </Flex>
      </Flex>
    </ContentsWrapper>
  );
};

export default ContentContainer;
