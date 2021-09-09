export const Colors = {
  darkBlue: '#2C374A',
  black: '#1D2730',
  purple: '#512D6D',
  lightPurple: '#BFA2DB',
  teal: '#368B85',
  lightRed: '#F8485E',
  lightGrey: '#EEEEEE',
  lightBlue: '#00C1D4',
  lighterBlue: '#64C9CF',
  lightYellow: '#FDE49C',
  beige: '#FFB740',
  jotformOrange: '#FF6100',
  jotformGrey: '#434343',
  darkerGrey: '#333333',
  grey: '#95A3B1',
  green: '#0FBC5F',
  blue: '#0099FF',
  orange: '#FF6100',
  yellow: '#FFB629',
};

const newThemeColors = {
  blue: '#0099FF',
  orange: '#FF6100',
  yellow: '#FFB629',
  green: '#0FBC5F',
};

export const getColor = (index: number) => {
  return Object.values(newThemeColors)[
    index % Object.values(newThemeColors).length
  ];
};
