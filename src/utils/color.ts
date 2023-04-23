export const getColorDistance = (color1: string, color2: string) => {
  const rDiff =
    parseInt(color1.substring(1, 3), 16) - parseInt(color2.substring(1, 3), 16);
  const gDiff =
    parseInt(color1.substring(3, 5), 16) - parseInt(color2.substring(3, 5), 16);
  const bDiff =
    parseInt(color1.substring(5, 7), 16) - parseInt(color2.substring(5, 7), 16);
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
};

export const getColor = (primary: string, distance: number) =>
  '#' +
  Math.round(parseInt(primary.substring(1), 16) + distance)
    .toString(16)
    .padStart(6, '0');

export const isValidHexColor = (color: string) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

export const invertHex = (hex: string) => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const invertedR = (255 - r).toString(16);
  const invertedG = (255 - g).toString(16);
  const invertedB = (255 - b).toString(16);

  const pad = (str: string) => {
    return str.length === 1 ? '0' + str : str;
  };

  const invertedHex = `#${pad(invertedR)}${pad(invertedG)}${pad(invertedB)}`;

  return invertedHex;
};
