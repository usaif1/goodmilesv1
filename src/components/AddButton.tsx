import { Pressable, StyleSheet } from 'react-native';

import { Icon, layout, radius, useTheme } from '@/theme';

import { Text } from './Text';

export type AddButtonProps = {
  added: boolean;
  onPress: () => void;
  label?: string;
};

/** `.uadd` - the inline ADD that flips to ADDED once in the cart. */
export function AddButton({ added, onPress, label = 'ADD' }: AddButtonProps) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: added }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { borderColor: added ? c.ok : c.sel, backgroundColor: c.card },
        pressed && styles.pressed,
      ]}
    >
      {added ? <Icon name="check" size={15} strokeWidth={2.6} color={c.ok} /> : null}
      <Text variant="buttonSmall" style={{ color: added ? c.ok : c.sel }}>
        {added ? 'ADDED' : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 80,
    height: 36,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: layout.chipBorder,
  },
  pressed: { transform: [{ scale: 0.97 }] },
});
