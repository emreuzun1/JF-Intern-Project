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

const ThemeColors2 = {
  blue: {main: '#5089C6', sub: '#001E6C'},
  blue_orange: {main: '#035397', sub: '#FFAA4C'},
  black_red: {main: '#BD4B4B', sub: '#000000'},
  purple_grey: {main: '#EFB7B7', sub: '#EEEEEE'},
  brown_beige: {main: '#C68B59', sub: '#865439'},
  coffee_blue: {main: '#FCDEC0', sub: '#8FC1D4'},
  grey_blue: {main: '#C9CCD5', sub: '#93B5C6'},
  blue_black: {main: '#52616B', sub: '#1E2022'},
};

export const getRandomColor = () => {
  const colors = Object.keys(ThemeColors2);
  // @ts-ignore: Unreachable code error
  return ThemeColors2[colors[Math.floor(Math.random() * colors.length)]];
};
