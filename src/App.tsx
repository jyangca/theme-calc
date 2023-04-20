import { Container, Title } from 'components';
import ColorBox from 'components/ColorBox/ColorBox';
import { Flex } from 'components/common';
import { useState } from 'react';
import { ColorPairType } from 'types/common';
import { getColor, getColorDistance } from 'utils/color';

function App() {
  const [colorPairs, setColorPairs] = useState<
    Array<ColorPairType & { isStandard: boolean }>
  >([{ input: '#2e8555', generated: '#eb4034', isStandard: true }]);

  const handleAddButtonClick = () => {
    setColorPairs((prev) => [
      ...prev,
      { input: '', generated: '', isStandard: false },
    ]);
  };

  const handleChangeColorInput = (
    target: 'input' | 'generated',
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setColorPairs((prev) => {
      const newColorPairs = [...prev];
      newColorPairs[index][target] = value;
      return newColorPairs;
    });
  };

  const handleOnClickColorBox = (index: number) => {
    console.log(index);
    setColorPairs((prev) => {
      const newColorPairs = [...prev];
      newColorPairs.forEach((colorPair, i) => {
        colorPair.isStandard = i === index;
      });
      return newColorPairs;
    });
  };

  const primaryDistance = getColorDistance(
    colorPairs.filter((pair) => pair.isStandard)[0].input,
    colorPairs.filter((pair) => pair.isStandard)[0].generated,
  );

  return (
    <Container>
      <Title>Theme Calculator</Title>
      <Flex direction="ROW" gap={{ column: 16 }}>
        {colorPairs.map((colorPair, index) => (
          <Flex direction="COLUMN" gap={{ row: 8 }}>
            <ColorBox
              onClick={() => handleOnClickColorBox(index)}
              color={colorPair.input}
              isStandard={colorPair.isStandard}
            />
            <input
              onChange={(e) => handleChangeColorInput('input', index, e)}
              value={colorPair.input}
            />
            <ColorBox
              onClick={() => handleOnClickColorBox(index)}
              color={
                colorPair.isStandard
                  ? colorPair.generated
                  : getColor(
                      colorPairs.filter((pair) => pair.isStandard)[0].generated,
                      getColorDistance(
                        colorPairs.filter((pair) => pair.isStandard)[0].input,
                        colorPair.input,
                      ),
                    )
              }
              isStandard={colorPair.isStandard}
            />
          </Flex>
        ))}
      </Flex>
      <button onClick={handleAddButtonClick}>색상 추가</button>
    </Container>
  );
}

export default App;
