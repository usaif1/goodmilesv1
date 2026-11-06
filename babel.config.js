module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
        extensions: [
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.js',
          '.android.js',
          '.js',
          '.json',
        ],
      },
    ],
    /**
     * Reanimated 4 moved its Babel plugin into react-native-worklets.
     * It rewrites worklet functions, so it has to stay last in the list.
     */
    'react-native-worklets/plugin',
  ],
};
