import { AddButton, ColorBox, Container, ContentContainer } from 'components';
import { Flex, Input, Popover, Title } from 'components/common';
import { useEffect, useState } from 'react';
import { ColorPairType } from 'types/common';
import { getColor, getColorDistance, isValidHexColor } from 'utils/color';
import { SketchPicker } from 'react-color';

function App() {
  const [primaryColor, setPrimaryColor] = useState<string>('#1e0e6c');
  const [targetColor, setTargetColor] = useState<string>('#625a12');
  const [colorPairs, setColorPairs] = useState<Array<ColorPairType>>([
    { primary: primaryColor, target: targetColor },
  ]);

  useEffect(() => {
    setColorPairs((prev) => {
      const newColorPairs = [...prev];
      newColorPairs.forEach((colorPair) => {
        colorPair.target = getColor(
          targetColor,
          getColorDistance(primaryColor, colorPair.primary),
        );
      });
      return newColorPairs;
    });
  }, [targetColor, primaryColor]);

  const handleAddButtonClick = () => {
    setColorPairs((prev) => [
      ...prev,
      { primary: primaryColor, target: targetColor },
    ]);
  };

  const handleChangeColorInput = ({
    event,
    index,
    color,
  }: {
    event?: React.FormEvent<HTMLInputElement>;
    index: number;
    color?: string;
  }) => {
    const newColor = color || (event?.target as HTMLInputElement).value;
    setColorPairs((prev) => {
      const newColorPairs = [...prev];
      newColorPairs[index].primary = newColor;
      newColorPairs[index].target = getColor(
        targetColor,
        getColorDistance(primaryColor, newColor),
      );
      return newColorPairs;
    });
  };

  const handleChangePrimaryColor = ({
    event,
    color,
  }: {
    event?: React.FormEvent<HTMLInputElement>;
    color?: string;
  }) => {
    const newColor = color || (event?.target as HTMLInputElement).value;
    setPrimaryColor(newColor);
  };

  const handleChangeTargetColor = ({
    event,
    color,
  }: {
    event?: React.FormEvent<HTMLInputElement>;
    color?: string;
  }) => {
    const newColor = color || (event?.target as HTMLInputElement).value;
    setTargetColor(newColor);
  };

  return (
    <Flex boxFill>
      <Container>
        <Title tag="h1">Theme Calculator</Title>
        <Flex direction="COLUMN" gap={{ row: 6 }}>
          <Title tag="h3">Standard Color</Title>
          <Flex gap={{ column: 16 }} boxFill>
            <Flex direction="COLUMN" gap={{ row: 6 }}>
              <Popover
                content={
                  <SketchPicker
                    color={primaryColor}
                    onChange={(color) =>
                      handleChangePrimaryColor({ color: color.hex })
                    }
                  />
                }
              >
                <ColorBox height="60px" width="100%" color={primaryColor} />
              </Popover>
              <Input
                onChange={(event) => handleChangePrimaryColor({ event })}
                value={primaryColor}
              />
            </Flex>
            <Flex direction="COLUMN" gap={{ row: 6 }}>
              <Popover
                content={
                  <SketchPicker
                    color={targetColor}
                    onChange={(color) =>
                      handleChangeTargetColor({ color: color.hex })
                    }
                  />
                }
              >
                <ColorBox height="60px" width="100%" color={targetColor} />
              </Popover>
              <Input
                onChange={(event) => handleChangeTargetColor({ event })}
                value={targetColor}
              />
            </Flex>
          </Flex>
        </Flex>
        <ContentContainer>
          {colorPairs.map((colorPair, index) => (
            <Flex direction="COLUMN" gap={{ row: 8 }}>
              <Flex direction="COLUMN" gap={{ row: 6 }}>
                <Popover
                  content={
                    <SketchPicker
                      color={colorPair.primary}
                      onChange={(color) =>
                        handleChangeColorInput({ index, color: color.hex })
                      }
                    />
                  }
                >
                  <ColorBox color={colorPair.primary} width="100%" />
                </Popover>
                <Input
                  onChange={(event) => handleChangeColorInput({ event, index })}
                  value={colorPair.primary}
                />
              </Flex>
              <Flex direction="COLUMN" boxFill>
                <ColorBox color={colorPair.target} width="100%" />
                <Title tag="h6">
                  {isValidHexColor(colorPair.target)
                    ? colorPair.target
                    : '#WRONG'}
                </Title>
              </Flex>
            </Flex>
          ))}
        </ContentContainer>
        <AddButton onClick={handleAddButtonClick} />
      </Container>
    </Flex>
  );
}

export default App;
