import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { layout, useTheme } from '@/theme';

export type ScreenProps = {
  children: ReactNode;
  /** Sticky header, rendered above the scroll area. */
  header?: ReactNode;
  /** Sticky footer, rendered below it. */
  footer?: ReactNode;
  /** Set false for screens that manage their own padding, e.g. Home. */
  padded?: boolean;
  scroll?: boolean;
  contentStyle?: ViewStyle;
};

/**
 * The frame every screen sits in: a fixed header, a scrolling body on
 * the grey page, and a fixed footer. The body padding is the
 * prototype's `.pad` - 16 around, 32 at the bottom, 12 between blocks.
 */
export function Screen({
  children,
  header,
  footer,
  padded = true,
  scroll = true,
  contentStyle,
}: ScreenProps) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  const body = padded ? (
    <View style={[styles.pad, contentStyle]}>{children}</View>
  ) : (
    children
  );

  return (
    <View style={[styles.fill, { backgroundColor: c.page, paddingTop: insets.top }]}>
      {header}
      {scroll ? (
        <ScrollView
          style={styles.fill}
          contentContainerStyle={styles.grow}
          keyboardShouldPersistTaps="handled"
        >
          {body}
        </ScrollView>
      ) : (
        <View style={styles.fill}>{body}</View>
      )}
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  grow: { flexGrow: 1 },
  pad: {
    padding: layout.screenPadding,
    paddingBottom: layout.padBottom,
    gap: layout.padGap,
  },
});
