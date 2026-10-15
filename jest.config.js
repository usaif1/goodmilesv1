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
].join('|');

module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    `node_modules/(?!((jest-)?react-native|@react-native(-community)?|${esmPackages})/)`,
  ],
  moduleNameMapper: {
    /**
     * lucide resolves to a .mjs entry, and the preset's transform only
     * matches .js/.ts/.tsx - so the allowlist above cannot reach it.
     * Point jest at the CJS build instead. Metro is unaffected and
     * still uses the ESM entry in the app.
     *
     * Icons are imported one per path rather than from the barrel:
     * Metro does not tree-shake, so a barrel import pulls all ~1500
     * icons and roughly doubles the bundle. Both forms are mapped.
     */
    '^lucide-react-native/icons/(.*)$':
      '<rootDir>/node_modules/lucide-react-native/dist/cjs/icons/$1.js',
    '^lucide-react-native$':
      '<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
  },
};
