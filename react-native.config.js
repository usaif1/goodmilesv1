/**
 * Fonts are bundled as static faces rather than a variable font.
 * Android resolves numeric weights unreliably, and weight 600 is the
 * design system's workhorse - naming each face explicitly keeps iOS
 * and Android identical.
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
