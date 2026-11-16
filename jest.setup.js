/**
 * Native modules the app pulls in at import time. Reanimated 4 reaches
 * for its worklets TurboModule as soon as it loads, and @gorhom/bottom-sheet
 * builds on it, so both need standing in for before any test renders App.
 */
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('@gorhom/bottom-sheet', () =>
  require('@gorhom/bottom-sheet/mock'),
);

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
  getString: jest.fn(() => Promise.resolve('')),
}));
