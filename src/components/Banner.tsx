import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, gradient, layout, radius, space, type } from '@/theme';
import { Gradient } from './Gradient';

type Tone = 'promo' | 'accent';

type Props = {
  title: string;
  subtitle?: string;
  tone?: Tone;
  onPress?: () => void;
  /** Trailing element, e.g. the "Rs 1,199" chip on the C08 card. */
  right?: ReactNode;
};

const STOPS = {
  promo: gradient.promo, // C05 first-service banner
  accent: gradient.accent, // C05 and C08 membership
} as const;

/**
 * The gradient call-out used for the C05 promo strip and the Reserve
 * Member upsell on C05 and C08.
 */
export function Banner({
  title,
  subtitle,
  tone = 'promo',
  onPress,
  right,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [s.banner, pressed && s.pressed]}>
      <Gradient colors={STOPS[tone]} direction="horizontal" />
      <View style={s.body}>
        <Text style={s.title}>{title}</Text>
        {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </Pressable>
  );
}

const s = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    borderRadius: radius.lg,
    /** C05's banners measure 62-69pt tall; 16pt all round overshot. */
    paddingVertical: space.md + 2,
    paddingHorizontal: layout.cardPadding,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.9 },
  body: { flex: 1, gap: space.xs },
  title: { ...type.h1, color: color.textOnBrand },
  subtitle: { ...type.meta, color: color.textOnBrand, opacity: 0.9 },
});
