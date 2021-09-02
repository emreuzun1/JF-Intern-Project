// jest.config.js
// Sync object

module.exports = {
  preset: 'react-native',
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@?react-native' +
      '|@react-navigation-tabs' +
      '|@react-native-splash-screen' +
      '|@react-native-screens' +
      '|@react-native-reanimated' +
      '|react-native-toast-message' +
      ')/)',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': ['babel-jest', {configFile: './babel.config.js'}],
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  testPathIgnorePatterns: ['/node_modules/'],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './src/jest-setup.js',
  ],
  cacheDirectory: '.jest/cache',
};
