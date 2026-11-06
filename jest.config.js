/**
 * React Navigation and the native UI libraries ship ESM that the RN
 * preset would otherwise leave untransformed, so they are added to the
 * preset's transform allowlist.
 */
const esmPackages = [
  '@react-navigation',
  'react-native-screens',
  'react-native-safe-area-context',
  'react-native-svg',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-worklets',
  '@gorhom',
].join('|');

module.exports = {
  preset: '@react-native/jest-preset',
  // Gesture Handler reaches for its TurboModule at import time, which
  // does not exist under Jest; its own setup file registers the mock.
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setup.js',
  ],
  transformIgnorePatterns: [
    `node_modules/(?!((jest-)?react-native|@react-native(-community)?|${esmPackages})/)`,
  ],
};
