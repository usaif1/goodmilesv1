import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { layout, useTheme } from '@/theme';

import { IconButton } from './IconButton';
import { Text } from './Text';

export type ScreenHeaderProps = {
  title?: string;
  subtitle?: string;
  /**
   * A tab root rather than a pushed screen: no back button, a larger
   * title and more left padding. The prototype's `.top.root`.
   */
  root?: boolean;
  onBack?: () => void;
  /** Trailing slot, usually the help button. */
  right?: ReactNode;
};

/**
 * `.top` - a white bar with a hairline under it. The title clamps to
 * one line on a pushed screen; a root's title is larger and bolder.
 */
export function ScreenHeader({
  title,
  subtitle,
  root,
  onBack,
  right,
}: ScreenHeaderProps) {
  const { c } = useTheme();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: c.card,
          borderBottomColor: c.line,
        },
        root ? styles.padRoot : styles.padPushed,
      ]}
    >
      {!root && onBack ? (
        <IconButton name="back" plain onPress={onBack} accessibilityLabel="Back" />
      ) : null}
      <View style={styles.titles}>
        {title ? (
          <Text
            variant={root ? 'headerTitleRoot' : 'headerTitle'}
            numberOfLines={root ? 2 : 1}
          >
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text variant={root ? 'headerSubRoot' : 'headerSub'} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 4,
    paddingRight: 12,
    paddingBottom: 6,
    borderBottomWidth: layout.hairline,
  },
  padRoot: { paddingLeft: 16 },
  padPushed: { paddingLeft: 6 },
  titles: { flex: 1, minWidth: 0, minHeight: 44, justifyContent: 'center' },
});
