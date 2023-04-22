import { ColorBox, Container, ContentContainer } from 'components';
import { Flex, Input, Popover, Title } from 'components/common';
import { AddButton, RenameButton } from 'components/button';
import { useEffect, useState } from 'react';
import { ColorPairType } from 'types/common';
import { getColor, getColorDistance, isValidHexColor } from 'utils/color';
import { SketchPicker } from 'react-color';
import { useTransition, animated } from '@react-spring/web';

function App() {
  const [primaryColor, setPrimaryColor] = useState<string>('#1e0e6c');
  const [targetColor, setTargetColor] = useState<string>('#625a12');
  const [colorPairs, setColorPairs] = useState<Array<ColorPairType>>([
    { primary: primaryColor, target: targetColor },
  ]);
  const [isNamingMode, setIsNamingMode] = useState<boolean>(false);
  const [standardName, setStandardName] = useState<ColorPairType>({
    primary: '',
    target: '',
  });
  const [colorPairsName, setColorPairsName] = useState<Array<ColorPairType>>(
    [],
  );

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
    if (colorPairs.length >= 6) return;
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

  const handleRenameButtonClick = () => {
    setIsNamingMode(true);
  };

  const transition = useTransition(colorPairs, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
  });

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
                <ColorBox height="60px" width="150px" color={primaryColor} />
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
                <ColorBox height="60px" width="150px" color={targetColor} />
              </Popover>
              <Input
                onChange={(event) => handleChangeTargetColor({ event })}
                value={targetColor}
              />
            </Flex>
          </Flex>
        </Flex>
        <ContentContainer>
          {transition((style, colorPair, _, index) => (
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
                  <animated.div style={style}>
                    <ColorBox color={colorPair.primary} width="150px" />
                  </animated.div>
                </Popover>
                <Input
                  onChange={(event) => handleChangeColorInput({ event, index })}
                  value={colorPair.primary}
                />
              </Flex>
              <Flex direction="COLUMN" boxFill>
                <animated.div style={{ width: '100%', ...style }}>
                  <ColorBox color={colorPair.target} width="150px" />
                </animated.div>
                <Title tag="h6">
                  {isValidHexColor(colorPair.target)
                    ? colorPair.target
                    : '#WRONG'}
                </Title>
              </Flex>
            </Flex>
          ))}
        </ContentContainer>
        <Flex gap={{ column: 20 }}>
          <AddButton onClick={handleAddButtonClick} />
          <RenameButton onClick={handleRenameButtonClick} />
        </Flex>
      </Container>
    </Flex>
  );
}

export default App;
