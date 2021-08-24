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
  {main: '#5089C6', sub: '#001E6C'},
  {main: '#035397', sub: '#FFAA4C'},
  {main: '#C68B59', sub: '#865439'},
  {main: '#EFB7B7', sub: '#EEEEEE'},
  {main: '#FCDEC0', sub: '#8FC1D4'},
  {main: '#C9CCD5', sub: '#93B5C6'},
  {main: '#52616B', sub: '#1E2022'},
];

export const getColor = (index: number) => {
  return ThemeColors[index % ThemeColors.length];
};
