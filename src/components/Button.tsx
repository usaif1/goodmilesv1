import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';

import { Icon, layout, radius, useTheme, type IconName } from '@/theme';

import { Text } from './Text';

export type ButtonVariant = 'primary' | 'orange' | 'ghost' | 'danger';

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  label: string;
  variant?: ButtonVariant;
  /** `.btn.sm`: 40 high, 10 radius, sits inline rather than full width. */
  size?: 'md' | 'sm';
  icon?: IconName;
  /** Full width is the default, matching `.btn { width: 100% }`. */
  block?: boolean;
  /**
   * Marks a ghost button as the destructive choice - red label on the
   * quiet variant, rather than the filled `danger`, so it stays the
   * secondary action next to whatever keeps things as they are.
   */
  destructive?: boolean;
  style?: ViewStyle;
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  block,
  destructive,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const { c } = useTheme();
  const sm = size === 'sm';
  const full = block ?? !sm;

  const fills: Record<ButtonVariant, { bg: string; fg: string }> = {
    primary: { bg: c.sel, fg: '#ffffff' },
    // One orange action per screen. The label is navy, not white:
    // white on orange is only 3.4:1 and fails AA.
    orange: { bg: c.orange, fg: c.onOrange },
    ghost: { bg: c.card, fg: c.ink },
    danger: { bg: c.redSolid, fg: '#ffffff' },
  };
  const { bg, fg } = fills[variant];
  const bgFinal = disabled ? c.disBg : bg;
  const fgFinal = disabled ? c.disFg : destructive ? c.red : fg;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: sm ? layout.buttonHeightSm : layout.buttonHeight,
          borderRadius: sm ? radius.md : radius.lg,
          paddingHorizontal: sm ? 16 : 20,
          backgroundColor: bgFinal,
          alignSelf: full ? 'stretch' : 'flex-start',
        },
        variant === 'ghost' && {
          borderWidth: layout.hairline,
          borderColor: c.ctlLine,
        },
        // `.btn:active { transform: scale(.97) }`
        pressed && !disabled && styles.pressed,
        style,
      ]}
      {...rest}
    >
      {icon ? (
        <View style={styles.icon}>
          <Icon name={icon} size={sm ? 16 : 20} color={fgFinal} />
        </View>
      ) : null}
      <Text
        variant={sm ? 'buttonSmall' : 'button'}
        style={{ color: fgFinal }}
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
    justifyContent: 'center',
    gap: 8,
  },
  pressed: { transform: [{ scale: 0.97 }] },
  icon: { flexShrink: 0 },
});
