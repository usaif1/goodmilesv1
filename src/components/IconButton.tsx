import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import { Icon, layout, useTheme, type IconName } from '@/theme';

export type IconButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  name: IconName;
  size?: number;
  /** `.ib.plain` - no fill or border; what headers use. */
  plain?: boolean;
  /** The orange notification dot on the bell. */
  dot?: boolean;
  color?: string;
};

/** `.ib` - the 44pt round tap target. Also the minimum touch size. */
export function IconButton({
  name,
  size = 20,
  plain,
  dot,
  color,
  ...rest
}: IconButtonProps) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        !plain && {
          backgroundColor: c.card,
          borderWidth: layout.hairline,
          borderColor: c.line,
        },
        pressed && styles.pressed,
      ]}
      {...rest}
    >
      <Icon name={name} size={size} color={color ?? c.ink} />
      {dot ? (
        <View
          style={[styles.dot, { backgroundColor: c.orange, borderColor: c.card }]}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: layout.iconButton,
    height: layout.iconButton,
    flexShrink: 0,
    borderRadius: layout.iconButton / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { transform: [{ scale: 0.97 }] },
  dot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
  },
});
