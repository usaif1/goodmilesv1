import type { TextStyle } from 'react-native';
import { color } from './tokens';

/**
 * System default: SF Pro on iOS, Roboto on Android.
 *
 * This is the single place the typeface is decided. To adopt a bundled
 * face later (Mulish was the closest match to the mockups), set a value
 * here and every role below inherits it - no screen needs to change.
 * That only holds while screens use these roles instead of writing raw
 * fontSize / fontWeight, so please keep doing that.
 */
export const fontFamily: TextStyle['fontFamily'] = undefined;

/**
 * Weights are restricted to 400 / 700 / 800 on purpose. Android resolves
 * numeric weights against the faces Roboto actually ships, and 500/600
 * can silently fall back to regular on some devices. Sticking to weights
 * with real faces keeps iOS and Android in step.
 */

/**
 * Sizes are calibrated from the mockups by measuring the cap height of
 * isolated capitals and dividing by 0.715, not estimated by eye.
 * Mockups are 780x1688, i.e. iPhone 14 at @2x, so 390pt logical width.
 */
export const type = {
  /** C01/C05 "XYZ" wordmark. */
  display: {
    fontFamily,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: color.brand,
  },
  /** C07 gradient hero title. */
  hero: {
    fontFamily,
    fontSize: 22,
    fontWeight: '700',
    color: color.textOnBrand,
  },
  /** Screen header titles: C02, C06, C08, C09, C11, C14, C15, C16. */
  h1: { fontFamily, fontSize: 18, fontWeight: '700', color: color.text },
  /** Section titles and card titles. */
  h2: { fontFamily, fontSize: 14, fontWeight: '700', color: color.text },

  body: { fontFamily, fontSize: 14, fontWeight: '400', color: color.text },
  bodyMuted: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    color: color.textMuted,
  },
  /** Meta lines: "Takes 4 Hours - 1 Month / 1,000 kms warranty". */
  meta: { fontFamily, fontSize: 12, fontWeight: '400', color: color.textMuted },

  price: { fontFamily, fontSize: 16, fontWeight: '700', color: color.text },
  /** Compare-at price beside it. */
  priceStrike: {
    fontFamily,
    fontSize: 13,
    fontWeight: '400',
    color: color.textDisabled,
    textDecorationLine: 'line-through',
  },

  /** Full-width CTA label. */
  button: {
    fontFamily,
    fontSize: 15,
    fontWeight: '700',
    color: color.textOnBrand,
  },
  /** Inline ADD / ADDED / Change / Review buttons. */
  buttonSmall: { fontFamily, fontSize: 13, fontWeight: '700' },

  /** Tab bar labels; the component sets the colour per active state. */
  tab: { fontFamily, fontSize: 11, fontWeight: '700' },
  /** ESTIMATE SENT / COMPLETED / CANCELLED / OPEN. */
  badge: {
    fontFamily,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
} as const satisfies Record<string, TextStyle>;
