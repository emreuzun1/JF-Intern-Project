export const Colors = {
  purple: '#512D6D',
  lightPurple: '#BFA2DB',
  teal: '#368B85',
  lightRed: '#F8485E',
  lightGrey: '#EEEEEE',
  lightBlue: '#00C1D4',
  lighterBlue: '#64C9CF',
  lightYellow: '#FDE49C',
  beige: '#FFB740',
  orange: '#DF711B',
  jotformOrange: '#fa8900',
  jotformGrey: '#434343',
  darkerGrey: '#333333',
  grey: '#9c9c9c',
};

const ThemeColors = [
  {main: '#BD4B4B', sub: '#000000'},
  {main: '#FFBBD6', sub: '#1D1F1F'},
  {main: '#F9C4BA', sub: '#FEF4EA'},
  {main: '#EA9885', sub: '#9786B5'},
  {main: '#AE0A13', sub: '#E9C1C1'},
  {main: '#FCDEC0', sub: '#8FC1D4'},
  {main: '#C9CCD5', sub: '#93B5C6'},
  {main: '#52616B', sub: '#1E2022'},
];

export const getColor = (index: number) => {
  return ThemeColors[index % ThemeColors.length];
};
