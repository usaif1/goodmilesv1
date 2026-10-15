import { Platform, type ViewStyle } from 'react-native';

/**
 * Colour values are sampled directly from the mockups in app_screens/
 * rather than estimated. The ramp is Untitled UI's greys plus Tailwind
 * teal-700 as the brand colour; where a value was needed that the
 * mockups do not show, it is taken from the same Untitled UI ramp so
 * the set stays internally consistent.
 */
export const color = {
  // Brand
  brand: '#0F766E', // headers, CTAs, active states
  brandDark: '#0B5C55', // status bar
  brandTint: '#E6F4F2', // ghost buttons, "All 11 services" tile

  // Membership accent
  accent: '#7252EB',
  accentDark: '#43219E',

  // Surfaces
  bg: '#F4F6FA',
  surface: '#FFFFFF',

  // Text
  text: '#1D2433', // verified identical across five screens
  textMuted: '#667085', // grey-500
  textDisabled: '#98A2B3', // grey-400, strikethrough compare-at prices
  textOnBrand: '#FFFFFF',

  /** Unselected chips and subtle fills (grey-100). */
  fillMuted: '#F2F4F7',
  /** Text on an unselected chip (grey-700). */
  textStrong: '#344054',

  // Lines. Cards carry a shadow and no border; these are for inputs,
  // the tab bar edge and the dashed rule in the cart bill summary.
  border: '#D0D5DD', // grey-300
  divider: '#EAECF0', // grey-200

  // State
  success: '#079455',
  successText: '#067647',
  successBg: '#ECFDF3',
  successIcon: '#57D38C',
  warning: '#F79009',
  warningText: '#B54708',
  warningBg: '#FFF4E5',
  error: '#B42318',
  errorBg: '#FEF3F2',
  gold: '#FDB022', // rating stars
  pending: '#D0D5DD', // unreached timeline nodes
} as const;

/** Gradient stops, sampled corner to corner. */
export const gradient = {
  hero: ['#96F3E1', '#10776F'], // C07 service-detail header
  promo: ['#0F746C', '#13504C'], // C05 first-service banner
  accent: ['#7252EB', '#43219E'], // C15 header, C08 membership card
} as const;

/** 4pt scale. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const layout = {
  screenPadding: 16,
  cardPadding: 16,
  cardGap: 12,
  ctaHeight: 52,
  headerPaddingBottom: 20,
  hairline: 1,
} as const;

/**
 * Cards and the sticky footer are lifted by shadow, not outlined. The
 * mockups show a soft falloff (#F4F6FA -> #F0F2F6 -> #FFFFFF) over
 * roughly 4pt.
 */
export const shadow: Record<'card' | 'footer', ViewStyle> = {
  card: Platform.select({
    ios: {
      shadowColor: '#101828',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    default: { elevation: 2 },
  }) as ViewStyle,
  footer: Platform.select({
    ios: {
      shadowColor: '#101828',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: -2 },
    },
    default: { elevation: 8 },
  }) as ViewStyle,
};
