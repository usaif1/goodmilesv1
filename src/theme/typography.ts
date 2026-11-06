import type { TextStyle } from 'react-native';

/**
 * Plus Jakarta Sans, bundled as four static faces.
 *
 * Each role names its face directly instead of pairing a family with
 * `fontWeight`. Android resolves numeric weights against the faces a
 * family actually ships and silently falls back to regular when one is
 * missing - and weight 600 is this design system's workhorse (128 of
 * the prototype's 154 weight declarations). Naming the face removes the
 * guesswork: the PostScript names in the TTFs match their filenames, so
 * the same string resolves on iOS and Android alike.
 *
 * Do not add `fontWeight` to these. It is redundant at best and, on
 * Android, actively harmful.
 */
export const face = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semibold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
} as const;

/**
 * Sizes, line heights and tracking come from the prototype's CSS.
 * Its `em` tracking is converted to points here (RN takes absolute
 * values): -0.025em at 28px is -0.7, and so on.
 *
 * None of these carry a colour. Colour comes from the active palette at
 * the call site, because every one of them has to work in both themes.
 */
export const type = {
  /** Page titles. `.h1` */
  h1: {
    fontFamily: face.semibold,
    fontSize: 28,
    lineHeight: 30,
    letterSpacing: -0.7,
  },
  /** Section titles. `.h2` */
  h2: {
    fontFamily: face.semibold,
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: -0.36,
  },
  /** Card titles. `.h3` */
  h3: { fontFamily: face.semibold, fontSize: 17, lineHeight: 22 },

  /** The header bar's title. `.top .t b` - clamps to two lines. */
  headerTitle: {
    fontFamily: face.semibold,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  /** The line under it. `.top .t span` - muted, single line, ellipsised. */
  headerSub: { fontFamily: face.regular, fontSize: 13 },

  /** Default body copy. `body { 400 15px/1.45 }` */
  body: { fontFamily: face.regular, fontSize: 15, lineHeight: 22 },
  /** Emphasis inside body copy. The prototype's `b` is 600, not bold. */
  bodyStrong: { fontFamily: face.semibold, fontSize: 15, lineHeight: 22 },

  /** `.small` */
  small: { fontFamily: face.regular, fontSize: 13, lineHeight: 19 },
  smallStrong: { fontFamily: face.semibold, fontSize: 13, lineHeight: 19 },
  /** `.label` - pair with palette.muted. */
  label: { fontFamily: face.regular, fontSize: 13 },
  /** Timestamps, captions, counts. */
  meta: { fontFamily: face.regular, fontSize: 12, lineHeight: 17 },

  /** `.btn` */
  button: { fontFamily: face.semibold, fontSize: 16 },
  /** `.btn.sm` */
  buttonSmall: { fontFamily: face.semibold, fontSize: 14 },
  /** `.chip` */
  chip: { fontFamily: face.semibold, fontSize: 14 },
  /** `.pill` */
  pill: { fontFamily: face.semibold, fontSize: 12 },

  /** `.field input` - 16 keeps iOS from zooming the field on focus. */
  input: { fontFamily: face.regular, fontSize: 16 },
} as const satisfies Record<string, TextStyle>;

export type TypeRole = keyof typeof type;
