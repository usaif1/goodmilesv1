import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { color, layout, radius, space, type } from '@/theme';

type Tone = 'brand' | 'accent';
type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'lg' | 'sm';

type Props = {
  label: string;
  onPress?: () => void;
  tone?: Tone;
  variant?: Variant;
  size?: Size;
  /** Full-width CTA, as in every sticky footer. */
  block?: boolean;
  disabled?: boolean;
  /** Leading glyph, e.g. the handset on C11's Call button. */
  icon?: ReactNode;
  style?: ViewStyle;
};

/**
 * The accent fill is the solid #5925DC measured on C15's CTA, not the
 * lighter #7252EB that starts the membership gradient.
 */
const TONES: Record<Tone, string> = {
  brand: color.brand,
  accent: color.accentSolid,
};

/**
 * Every button in the mockups is one of three fills at one of two
 * sizes, so they share a component rather than each getting their own:
 *
 *   solid   full-width CTAs (C01, C08, C09, C15) and ADD (C06)
 *   outline ADDED (C06) - white fill, brand border and text
 *   ghost   Change (C05, C09), Call (C11) - brandTint fill
 */
export function Button({
  label,
  onPress,
  tone = 'brand',
  variant = 'solid',
  size = 'lg',
  block = false,
  disabled = false,
  icon,
  style,
}: Props) {
  const accent = TONES[tone];
  const solid = variant === 'solid';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        s.base,
        size === 'lg' ? s.lg : s.sm,
        block && s.block,
        solid && { backgroundColor: accent },
        variant === 'outline' && [s.outline, { borderColor: accent }],
        variant === 'ghost' && s.ghost,
        pressed && s.pressed,
        disabled && s.disabled,
        style,
      ]}>
      <View style={s.inner}>
        {icon}
        <Text
          style={[
            size === 'lg' ? s.labelLg : s.labelSm,
            { color: solid ? color.textOnBrand : accent },
          ]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  inner: { flexDirection: 'row', alignItems: 'center', gap: space.xs + 2 },
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  lg: { height: layout.ctaHeight, paddingHorizontal: space.xxl },
  /** C06's ADD measures 30pt tall. */
  sm: { height: 30, paddingHorizontal: space.lg },
  block: { alignSelf: 'stretch' },
  outline: { backgroundColor: color.surface, borderWidth: layout.hairline },
  ghost: { backgroundColor: color.brandTint },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.4 },
  labelLg: type.button,
  labelSm: type.buttonSmall,
});
