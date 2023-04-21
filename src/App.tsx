import { AddButton, ColorBox, Container, ContentContainer } from 'components';
import { Flex, Input, Title } from 'components/common';
import { useEffect, useState } from 'react';
import { ColorPairType } from 'types/common';
import { getColor, getColorDistance, isValidHexColor } from 'utils/color';

function App() {
  const [primaryColor, setPrimaryColor] = useState<string>('#2e8555');
  const [targetColor, setTargetColor] = useState<string>('#963aa6');
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

  const handleChangeColorInput = (
    event: React.FormEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target as HTMLInputElement;
    setColorPairs((prev) => {
      const newColorPairs = [...prev];
      newColorPairs[index].primary = value;
      newColorPairs[index].target = getColor(
        targetColor,
        getColorDistance(primaryColor, value),
      );
      return newColorPairs;
    });
  };

  const handleChangePrimaryColor = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setPrimaryColor(value);
  };

  const handleChangeTargetColor = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setTargetColor(value);
  };

  return (
    <Flex boxFill>
      <Container>
        <Title tag="h1">Theme Calculator</Title>
        <Flex direction="COLUMN" gap={{ row: 6 }}>
          <Title tag="h3">Standard Color</Title>
          <Flex gap={{ column: 16 }} boxFill>
            <Flex direction="COLUMN" gap={{ row: 6 }}>
              <ColorBox height="60px" width="100%" color={primaryColor} />
              <Input onChange={handleChangePrimaryColor} value={primaryColor} />
            </Flex>
            <Flex direction="COLUMN" gap={{ row: 6 }}>
              <ColorBox height="60px" width="100%" color={targetColor} />
              <Input onChange={handleChangeTargetColor} value={targetColor} />
            </Flex>
          </Flex>
        </Flex>
        <ContentContainer>
          {colorPairs.map((colorPair, index) => (
            <Flex direction="COLUMN" gap={{ row: 8 }}>
              <Flex direction="COLUMN" gap={{ row: 6 }}>
                <ColorBox color={colorPair.primary} width="100%" />
                <Input
                  onChange={(event) => handleChangeColorInput(event, index)}
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
