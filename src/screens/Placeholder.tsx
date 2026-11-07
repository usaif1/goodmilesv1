import { StyleSheet, View } from 'react-native';

import { Text } from '@/components';
import { useTheme } from '@/theme';

/**
 * Stands in for a tab that has not been built yet, so the shell can be
 * navigated end to end while the screens land group by group.
 */
export function makePlaceholder(title: string, note: string) {
  return function Placeholder() {
    const { c } = useTheme();
    return (
      <View style={[styles.base, { backgroundColor: c.page }]}>
        <Text variant="h2">{title}</Text>
        <Text variant="body" tone="muted" style={styles.note}>
          {note}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  base: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  note: { textAlign: 'center' },
});
