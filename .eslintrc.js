module.exports = {
  root: true,
  extends: '@react-native',
  // reference/ is the design prototype, not app source: a browser-targeted
  // single-page build with a service worker. Linting it reports globals
  // that are correct there and meaningless here.
  ignorePatterns: ['reference/'],
  overrides: [
    {
      // Jest config and setup run in Node with Jest's globals, not in
      // the React Native runtime the base config assumes.
      files: ['jest.setup.js', 'jest.config.js', '__tests__/**'],
      env: { node: true, jest: true },
    },
  ],
};
