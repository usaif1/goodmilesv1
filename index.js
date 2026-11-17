/**
 * @format
 */

// react-native-gesture-handler must be the first import in the entry file.
import 'react-native-gesture-handler';

import { AppRegistry, LogBox } from 'react-native';
import App from './App';

/**
 * @gorhom/bottom-sheet 5.2.x passes dependency arrays to Reanimated
 * hooks, which Reanimated 4 ignores on native and warns about - dozens
 * of lines per sheet interaction, from inside the library. Harmless,
 * but it buries warnings that matter. Remove once the two agree.
 */
if (__DEV__) {
  LogBox.ignoreLogs([
    '[Reanimated] Dependencies should only be used on the web',
  ]);
}
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
