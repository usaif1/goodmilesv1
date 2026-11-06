import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { layout, radius, useTheme } from '@/theme';

import { Text } from './Text';

export type ChipProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  selected?: boolean;
};

/** `.chip` - medium weight until selected, then semibold on navy. */
export function Chip({ label, selected, disabled, ...rest }: ChipProps) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? c.sel : c.card,
          borderColor: selected ? c.sel : c.line,
        },
        pressed && !disabled && styles.pressed,
      ]}
      {...rest}
    >
      <Text
        variant={selected ? 'chipOn' : 'chip'}
        style={[
          { color: selected ? '#ffffff' : c.ink2 },
          // `.chip[disabled]` strikes the label through rather than
          // just dimming it.
          disabled && [styles.struck, { color: c.disChip }],
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    borderWidth: layout.chipBorder,
  },
  pressed: { transform: [{ scale: 0.97 }] },
  struck: { textDecorationLine: 'line-through' },
});
