import { ColorBox, Container, ContentContainer } from 'components';
import { Flex, Input, Popover, Title } from 'components/common';
import { AddButton, RenameButton } from 'components/button';
import { useEffect, useState } from 'react';
import { ColorOption, ColorPairType } from 'types/common';
import { getColor, getColorDistance, isValidHexColor } from 'utils/color';
import { SketchPicker } from 'react-color';
import { useTransition, animated } from '@react-spring/web';

function App() {
  const [primaryStandard, setPrimaryStandard] = useState<ColorOption>({
    color: '#1e0e6c',
    name: 'primary',
  });
  const [customStandard, setCustomStandard] = useState<ColorOption>({
    color: '#625a12',
    name: 'custom',
  });
  const [colorPairs, setColorPairs] = useState<Array<ColorPairType>>([
    {
      primary: { ...primaryStandard },
      custom: { ...customStandard },
    },
  ]);
  const [isNamingMode, setIsNamingMode] = useState<boolean>(false);

  useEffect(() => {
    setColorPairs((prev) => {
      const newColorPairs = [...prev];
      newColorPairs.forEach((colorPair) => {
        colorPair.custom.color = getColor(
          customStandard.color,
          getColorDistance(primaryStandard.color, colorPair.primary.color),
        );
      });
      return newColorPairs;
    });
  }, [primaryStandard, customStandard]);

  const handleAddButtonClick = () => {
    if (colorPairs.length >= 6) return;
    setColorPairs((prev) => [
      ...prev,
      { primary: { ...primaryStandard }, custom: { ...customStandard } },
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
      newColorPairs[index].primary.color = newColor;
      newColorPairs[index].custom.color = getColor(
        customStandard.color,
        getColorDistance(primaryStandard.color, newColor),
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
    setPrimaryStandard((prev) => ({ ...prev, color: newColor }));
  };

  const handleChangeTargetColor = ({
    event,
    color,
  }: {
    event?: React.FormEvent<HTMLInputElement>;
    color?: string;
  }) => {
    const newColor = color || (event?.target as HTMLInputElement).value;
    setCustomStandard((prev) => ({ ...prev, color: newColor }));
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
                    color={primaryStandard.color}
                    onChange={(color) =>
                      handleChangePrimaryColor({ color: color.hex })
                    }
                  />
                }
              >
                <ColorBox
                  height="60px"
                  width="150px"
                  isNamingMode={isNamingMode}
                  color={primaryStandard.color}
                />
              </Popover>
              <Input
                onChange={(event) => handleChangePrimaryColor({ event })}
                value={primaryStandard.color}
              />
            </Flex>
            <Flex direction="COLUMN" gap={{ row: 6 }}>
              <Popover
                content={
                  <SketchPicker
                    color={customStandard.color}
                    onChange={(color) =>
                      handleChangeTargetColor({ color: color.hex })
                    }
                  />
                }
              >
                <ColorBox
                  height="60px"
                  width="150px"
                  isNamingMode={isNamingMode}
                  color={customStandard.color}
                />
              </Popover>
              <Input
                onChange={(event) => handleChangeTargetColor({ event })}
                value={customStandard.color}
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
                      color={colorPair.primary.color}
                      onChange={(color) =>
                        handleChangeColorInput({ index, color: color.hex })
                      }
                    />
                  }
                >
                  <animated.div style={style}>
                    <ColorBox
                      key={`${colorPair.primary.color}_${index}`}
                      color={colorPair.primary.color}
                      isNamingMode={isNamingMode}
                      width="150px"
                    />
                  </animated.div>
                </Popover>
                <Input
                  onChange={(event) => handleChangeColorInput({ event, index })}
                  value={colorPair.primary.color}
                />
              </Flex>
              <Flex direction="COLUMN" boxFill>
                <animated.div style={{ width: '100%', ...style }}>
                  <ColorBox
                    key={`${colorPair.custom.color}_${index}`}
                    color={colorPair.custom.color}
                    isNamingMode={isNamingMode}
                    width="150px"
                  />
                </animated.div>
                <Title tag="h6">
                  {isValidHexColor(colorPair.custom.color)
                    ? colorPair.custom.color
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
