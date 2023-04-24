import { ColorBox, Container, ContentContainer, Header } from 'components';
import { Flex, IconButton, Input, Popover, Title } from 'components/common';
import { useEffect, useState } from 'react';
import { ColorOption, ColorPairType } from 'types/common';
import { getColor, getColorDistance, isValidHexColor } from 'utils/color';
import { ColorResult, SketchPicker } from 'react-color';
import { useTransition, animated } from '@react-spring/web';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CgCheckO, CgRename } from 'react-icons/cg';
import { VscJson } from 'react-icons/vsc';
import ReactJson from 'react-json-view';

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
    if (isNamingMode) {
      setColorPairs((prev) => {
        const newColorPairs = [...prev];
        newColorPairs.forEach((colorPair) => {
          colorPair.primary.name = primaryStandard.name;
          colorPair.custom.name = customStandard.name;
        });
        return newColorPairs;
      });
    }
    if (!isNamingMode) {
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
    }
  }, [primaryStandard, customStandard]);

  const handleAddButtonClick = () => {
    if (colorPairs.length >= 6) return;
    setColorPairs((prev) => [
      ...prev,
      {
        primary: {
          name: `${primaryStandard.name}${colorPairs.length}`,
          color: primaryStandard.color,
        },
        custom: { name: `${customStandard.name}${colorPairs.length}`, color: customStandard.color },
      },
    ]);
  };

  const handleChangeColorPicker = ({ color, index }: { color: ColorResult; index: number }) => {
    setColorPairs((prev) => {
      const newColorPairs = [...prev];
      newColorPairs[index].primary.color = color.hex;
      newColorPairs[index].custom.color = getColor(
        customStandard.color,
        getColorDistance(primaryStandard.color, color.hex),
      );
      return newColorPairs;
    });
  };

  const handleChangeColorInput = ({
    event,
    index,
  }: {
    event: React.FormEvent<HTMLInputElement>;
    index: number;
  }) => {
    const newColor = (event.target as HTMLInputElement).value;
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

  const handleChangeNameInput = ({
    event,
    index,
    type,
  }: {
    event: React.FormEvent<HTMLInputElement>;
    index: number;
    type: 'primary' | 'custom';
  }) => {
    const newName = (event.target as HTMLInputElement).value;
    setColorPairs((prev) => {
      const newColorPairs = [...prev];
      newColorPairs[index][type].name = newName;
      return newColorPairs;
    });
  };

  const handleChangePrimaryColor = (event: React.FormEvent<HTMLInputElement>) => {
    if (isNamingMode && event) {
      setPrimaryStandard((prev) => ({
        ...prev,
        name: (event.target as HTMLInputElement).value,
      }));
    }

    if (!isNamingMode) {
      const newColor = (event?.target as HTMLInputElement).value;
      setPrimaryStandard((prev) => ({ ...prev, color: newColor }));
    }
  };
  const handleChangeCustomColor = (event: React.FormEvent<HTMLInputElement>) => {
    if (isNamingMode && event) {
      setCustomStandard((prev) => ({
        ...prev,
        name: (event.target as HTMLInputElement).value,
      }));
    }

    if (!isNamingMode) {
      const newColor = (event?.target as HTMLInputElement).value;
      setCustomStandard((prev) => ({ ...prev, color: newColor }));
    }
  };

  const handleChangePrimaryColorPicker = (color: ColorResult) => {
    setPrimaryStandard((prev) => ({ ...prev, color: color.hex }));
  };
  const handleChangeCustomColorPicker = (color: ColorResult) => {
    setCustomStandard((prev) => ({ ...prev, color: color.hex }));
  };

  const handleRenameButtonClick = () => {
    setIsNamingMode((prev) => !prev);
  };

  const handleDoneRenameButtonClick = () => {
    setIsNamingMode(false);
  };

  const transition = useTransition(colorPairs, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
    delay: 100,
  });

  const themeJson = {
    [customStandard.name]: {
      [customStandard.name]: customStandard.color,
      ...colorPairs.reduce((acc, colorPair) => {
        (acc as Record<string, any>)[colorPair.custom.name] = colorPair.custom.color;
        return acc;
      }, {}),
    },
    [primaryStandard.name]: {
      [primaryStandard.name]: primaryStandard.color,
      ...colorPairs.reduce((acc, colorPair) => {
        (acc as Record<string, any>)[colorPair.primary.name] = colorPair.primary.color;
        return acc;
      }, {}),
    },
  };

  return (
    <Flex direction="COLUMN">
      <Header />
      <Container>
        <Title tag="h1">Theme Calculator</Title>
        <Flex direction="COLUMN" gap={{ row: 6 }}>
          <Title tag="h3">{isNamingMode ? `Set Theme Color Name` : `Standard Color`}</Title>
          <Flex gap={{ column: 16 }} boxFill>
            <Flex direction="COLUMN" gap={{ row: 6 }}>
              <Popover
                content={
                  <SketchPicker
                    color={primaryStandard.color}
                    onChange={handleChangePrimaryColorPicker}
                  />
                }
              >
                <ColorBox
                  height="60px"
                  width="150px"
                  isNamingMode={isNamingMode}
                  name={primaryStandard.name}
                  color={primaryStandard.color}
                />
              </Popover>
              <Input
                onChange={handleChangePrimaryColor}
                value={isNamingMode ? primaryStandard.name : primaryStandard.color}
              />
            </Flex>
            <Flex direction="COLUMN" gap={{ row: 6 }}>
              <Popover
                content={
                  <SketchPicker
                    color={customStandard.color}
                    onChange={handleChangeCustomColorPicker}
                  />
                }
              >
                <ColorBox
                  height="60px"
                  width="150px"
                  isNamingMode={isNamingMode}
                  name={customStandard.name}
                  color={customStandard.color}
                />
              </Popover>
              <Input
                onChange={handleChangeCustomColor}
                value={isNamingMode ? customStandard.name : customStandard.color}
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
                      onChange={(color) => handleChangeColorPicker({ index, color })}
                    />
                  }
                >
                  <animated.div style={style}>
                    <ColorBox
                      key={`${colorPair.primary.color}_${index}`}
                      color={colorPair.primary.color}
                      name={colorPair.primary.name}
                      isNamingMode={isNamingMode}
                      width="150px"
                    />
                  </animated.div>
                </Popover>
                <Input
                  onChange={(event) => {
                    isNamingMode
                      ? handleChangeNameInput({ event, index, type: 'primary' })
                      : handleChangeColorInput({ event, index });
                  }}
                  value={isNamingMode ? colorPair.primary.name : colorPair.primary.color}
                />
              </Flex>
              <Flex direction="COLUMN" gap={{ row: 6 }} boxFill>
                <animated.div style={{ width: '100%', ...style }}>
                  <ColorBox
                    key={`${colorPair.custom.color}_${index}`}
                    color={colorPair.custom.color}
                    name={colorPair.custom.name}
                    isNamingMode={isNamingMode}
                    width="150px"
                  />
                </animated.div>
                {isNamingMode ? (
                  <Input
                    onChange={(event) => handleChangeNameInput({ event, index, type: 'custom' })}
                    value={colorPair.custom.name}
                  />
                ) : (
                  <Title tag="h6">
                    {isValidHexColor(colorPair.custom.color) ? colorPair.custom.color : '#WRONG'}
                  </Title>
                )}
              </Flex>
            </Flex>
          ))}
        </ContentContainer>
        <Flex gap={{ column: 20 }}>
          <IconButton onClick={handleAddButtonClick}>
            <AiOutlinePlusCircle size="40px" fill="#c7c7c7" />
          </IconButton>
          {isNamingMode ? (
            <IconButton>
              <CgCheckO size="40px" fill="#c7c7c7" onClick={handleDoneRenameButtonClick} />
            </IconButton>
          ) : (
            <IconButton onClick={handleRenameButtonClick}>
              <CgRename size="40px" fill="#c7c7c7" />
            </IconButton>
          )}
          <Popover
            content={
              <ReactJson
                src={themeJson}
                theme="summerfruit:inverted"
                style={{ padding: '1rem', borderRadius: '4px', width: '300px' }}
                iconStyle="square"
                displayDataTypes={false}
              />
            }
          >
            <IconButton>
              <VscJson size="40px" fill="#c7c7c7" />
            </IconButton>
          </Popover>
        </Flex>
      </Container>
    </Flex>
  );
}

export default App;
