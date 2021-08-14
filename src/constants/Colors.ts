export const Colors = {
  purple: '#512D6D',
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

export const getRandomColorIndex = () => {
  const colors = Object.keys(Colors);
  return colors[Math.floor(Math.random() * colors.length)];
};
