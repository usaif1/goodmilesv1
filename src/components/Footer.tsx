import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { shadow, useTheme } from '@/theme';

import { Text } from './Text';

export type FooterProps = {
  children: ReactNode;
  /**
   * The checkout-style variant (`.ft2`): a total on the left and the
   * action filling the rest of the row.
   */
  total?: { label: string; value: string };
};

/**
 * `.foot` - the sticky action bar. Round 2 drops its top border in
 * favour of an upward shadow, so it lifts off the content instead of
 * ruling it off.
 */
export function Footer({ children, total }: FooterProps) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.base,
        shadow.footer,
        { backgroundColor: c.card, paddingBottom: 10 + insets.bottom },
        total ? styles.row : styles.stack,
      ]}
    >
      {total ? (
        <View style={styles.total}>
          <Text variant="meta">{total.label}</Text>
          <Text variant="headerTitle">{total.value}</Text>
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexShrink: 0, paddingTop: 10, paddingHorizontal: 16 },
  stack: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  total: { flexShrink: 0 },
});
