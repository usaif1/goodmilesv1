/**
 * GoodMiles - doorstep car service.
 *
 * The UI is being rebuilt from the reference prototype. This is the
 * provider stack only; the navigator lands with the app shell.
 *
 * @format
 */

import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@/theme';

/** Placeholder until the navigator exists - proves the theme resolves. */
function Shell() {
  const { c } = useTheme();
  return <View style={[styles.fill, { backgroundColor: c.page }]} />;
}

export default function App() {
  return (
    // GestureHandlerRootView must wrap everything for @gorhom/bottom-sheet.
    <GestureHandlerRootView style={styles.fill}>
      <SafeAreaProvider>
        <ThemeProvider>
          <Shell />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
