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
