module.exports = {
  root: true,
  extends: '@react-native',
  // reference/ is the design prototype, not app source: a browser-targeted
  // single-page build with a service worker. Linting it reports globals
  // that are correct there and meaningless here.
  ignorePatterns: ['reference/'],
};
