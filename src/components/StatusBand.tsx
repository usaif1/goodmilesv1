import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color } from '@/theme';

/**
 * The #0B5C55 band behind the status bar, identical on all ten
 * mockups. ScreenHeader draws it, and C01 uses it on its own because
 * that screen has no header below it.
 *
 * It takes the real top inset rather than the mockups' fixed 28pt,
 * which only holds for the device they were rendered at. Since RN 0.87
 * removed StatusBar's Android backgroundColor prop, this is also what
 * colours the status bar area there.
 */
export function StatusBand() {
  const insets = useSafeAreaInsets();
  return <View style={[s.band, { height: insets.top }]} />;
}

const s = StyleSheet.create({
  band: { backgroundColor: color.brandDark },
});
