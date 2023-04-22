import { Flex, Popover } from 'components/common';
import { ContentsWrapper } from './ContentContainer.style';
import { PaletteButton } from 'components/button';
import { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

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
          <PaletteButton />
        </Popover>
        <Flex boxFill gap={{ column: 16 }}>
          {children}
        </Flex>
      </Flex>
    </ContentsWrapper>
  );
};

export default ContentContainer;
