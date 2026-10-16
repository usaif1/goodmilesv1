import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color, gradient, layout, space, type } from '@/theme';
import { Gradient } from './Gradient';
import { StatusBand } from './StatusBand';

type Variant = 'solid' | 'hero' | 'accent';

type Props = {
  title: string;
  /** Leading glyph, e.g. the star on C15. */
  icon?: ReactNode;
  subtitle?: string;
  variant?: Variant;
  /** Rendered at the trailing edge, e.g. the city selector on C05. */
  right?: ReactNode;
  /** Content below the title, e.g. the car bar on C05. */
  children?: ReactNode;
};

const STOPS: Record<Variant, readonly [string, string] | null> = {
  solid: null,
  hero: gradient.hero, // C07
  accent: gradient.accent, // C15
};

/**
 * The header every screen draws for itself - there is no native header
 * anywhere in this app.
 *
 * All ten mockups show the same #0B5C55 band behind the status bar,
 * one shade darker than the header below it, so it is drawn here for
 * every variant. It uses the real top inset rather than the mockups'
 * fixed 28pt, which is only correct for the device they were rendered
 * at. RN 0.87 removed StatusBar's Android backgroundColor prop, so
 * this band is also what colours the status bar area on Android.
 */
export function ScreenHeader({
  title,
  icon,
  subtitle,
  variant = 'solid',
  right,
  children,
}: Props) {
  const stops = STOPS[variant];
  const tall = variant === 'hero';

  return (
    <View>
      <StatusBand />
      <View style={[s.header, !stops && s.solid, tall && s.tall]}>
        {stops && <Gradient colors={stops} />}
        <View style={s.titleRow}>
          <View style={s.titleCol}>
            <View style={s.titleLine}>
              {icon}
              <Text style={[s.title, tall && s.titleHero]}>{title}</Text>
            </View>
            {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
          </View>
          {right}
        </View>
        {children}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: space.md,
    paddingBottom: layout.headerPaddingBottom,
    overflow: 'hidden',
  },
  solid: { backgroundColor: color.brand },
  /**
   * C07's hero is 170pt below the status band. Title, subtitle and the
   * bottom padding account for about 64 of that, leaving 106 above.
   */
  tall: { paddingTop: 106 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
  titleCol: { flex: 1 },
  titleLine: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  title: { ...type.h1, color: color.textOnBrand },
  titleHero: type.hero,
  subtitle: { ...type.meta, color: color.brandTint, marginTop: 2 },
});
