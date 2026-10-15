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
  style?: ViewStyle;
};

const TONES: Record<Tone, string> = {
  brand: color.brand,
  accent: color.accent,
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
      <View>
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
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  lg: { height: layout.ctaHeight, paddingHorizontal: space.xxl },
  sm: { paddingVertical: space.sm + 2, paddingHorizontal: space.lg },
  block: { alignSelf: 'stretch' },
  outline: { backgroundColor: color.surface, borderWidth: layout.hairline },
  ghost: { backgroundColor: color.brandTint },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.4 },
  labelLg: type.button,
  labelSm: type.buttonSmall,
});
