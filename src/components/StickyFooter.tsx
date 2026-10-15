import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, layout, shadow, space } from '@/theme';

type Props = { children: ReactNode };

/**
 * The pinned action bar at the bottom of C01, C06, C07, C08, C09, C10,
 * C14 and C15. White, lifted by an upward shadow, and padded clear of
 * the home indicator.
 */
export function StickyFooter({ children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[s.footer, { paddingBottom: Math.max(insets.bottom, space.lg) }]}>
      {children}
    </View>
  );
}

const s = StyleSheet.create({
  footer: {
    backgroundColor: color.surface,
    paddingHorizontal: layout.screenPadding,
    paddingTop: layout.screenPadding,
    gap: space.sm,
    ...shadow.footer,
  },
});
