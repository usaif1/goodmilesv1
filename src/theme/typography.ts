import type { TextStyle } from 'react-native';

/**
 * Plus Jakarta Sans, bundled as four static faces.
 *
 * Each role names its face directly instead of pairing a family with
 * `fontWeight`. Android resolves numeric weights against the faces a
 * family actually ships and silently falls back to regular when one is
 * missing. Naming the face removes the guesswork: the PostScript names
 * in the TTFs match their filenames, so the same string resolves on iOS
 * and Android alike. Verified on device - all four render distinctly.
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
 * Sizes are the prototype's *final* cascaded values. Its stylesheet
 * layers three design passes, and the "Production finish" rounds pulled
 * the whole scale down - h1 from 28 to 24, body from 15 to 14 - and
 * moved the headings from 600 to 700. Check the last rule that sets a
 * property, not the first.
 *
 * Round 2 settled on one scale: 12 13 14 15 16 17 20 24 28 34.
 * `em` tracking is converted to points, which is what RN takes.
 *
 * None of these carry a colour, because every one has to work in both
 * themes. Colour comes from the active palette at the call site.
 */
export const type = {
  /** Page titles. `.h1` - 24/700, tracking -.012em. */
  h1: {
    fontFamily: face.bold,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.29,
  },
  /** Section titles. `.h2` - 20/700, tracking -.006em. */
  h2: {
    fontFamily: face.bold,
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: -0.12,
  },
  /** Card titles. `.h3` */
  h3: { fontFamily: face.semibold, fontSize: 16, lineHeight: 21 },

  /**
   * A pushed screen's header title. `.top .t b` - clamps to one line.
   * Tab roots use `headerTitleRoot` instead, which is larger.
   */
  headerTitle: {
    fontFamily: face.semibold,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: 0,
  },
  /** A tab root's header title. `.top.root .t b` */
  headerTitleRoot: {
    fontFamily: face.bold,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.12,
  },
  /** The line under a pushed header. `.top .t span` */
  headerSub: { fontFamily: face.regular, fontSize: 12 },
  /** The line under a root header. `.top.root .t span` */
  headerSubRoot: { fontFamily: face.regular, fontSize: 13 },

  /** Default body copy. `body` is 14px at the original 1.45 leading. */
  body: { fontFamily: face.regular, fontSize: 14, lineHeight: 20 },
  /** Emphasis inside body copy. The prototype's `b` is 600, not bold. */
  bodyStrong: { fontFamily: face.semibold, fontSize: 14, lineHeight: 20 },

  /** `.small` */
  small: { fontFamily: face.regular, fontSize: 13, lineHeight: 19 },
  smallStrong: { fontFamily: face.semibold, fontSize: 13, lineHeight: 19 },
  /** `.label` - pair with palette.muted. */
  label: { fontFamily: face.regular, fontSize: 12, letterSpacing: 0.24 },
  /** Timestamps, captions, counts. */
  meta: { fontFamily: face.regular, fontSize: 12, lineHeight: 17 },

  /** `.btn` */
  button: { fontFamily: face.semibold, fontSize: 15 },
  /** `.btn.sm` */
  buttonSmall: { fontFamily: face.semibold, fontSize: 14 },
  /** `.chip` - medium until selected. */
  chip: { fontFamily: face.medium, fontSize: 14 },
  /** `.chip.on` */
  chipOn: { fontFamily: face.semibold, fontSize: 14 },
  /** `.pill` */
  pill: { fontFamily: face.semibold, fontSize: 12 },
  /** `.tab` - medium until active. */
  tab: { fontFamily: face.medium, fontSize: 12 },
  /** `.tab.on` */
  tabOn: { fontFamily: face.semibold, fontSize: 12 },

  /** `.field input` - 16 keeps iOS from zooming the field on focus. */
  input: { fontFamily: face.regular, fontSize: 16 },
} as const satisfies Record<string, TextStyle>;

export type TypeRole = keyof typeof type;
