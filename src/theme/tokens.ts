/**
 * Design tokens from the reference prototype (reference/index.html).
 *
 * The prototype's stylesheet layers three design passes - the original,
 * "Production finish", and "Production finish, round 2" - so a token's
 * first definition is usually not its final one. These are the computed
 * final values after the full cascade. Read the last `:root` that sets a
 * name, not the first.
 *
 * In light, `ok` resolves to ink: round 2 sets `--ok: var(--ink)`,
 * dropping the success green. Dark keeps its green, because
 * `:root[data-theme="dark"]` outranks a bare `:root`.
 *
 * The prototype ships dark mode as a real feature: a switch on Account,
 * defaulting to light. So every colour is a light/dark pair, and screens
 * must read them through `useTheme()` rather than importing `light`
 * directly. Hardcoding a hex anywhere is what makes dark mode expensive
 * later.
 */

/** Every colour the design system defines. */
export type Palette = {
  // Brand
  navy: string;
  navy2: string;
  orange: string;
  /** Label colour on an orange fill - navy, since white on orange is only 3.4:1. */
  onOrange: string;
  orangeInk: string;
  orangeTint: string;
  orangeDeep: string;
  orangeDeep2: string;
  orangeLine: string;

  // Surfaces
  /** The page behind the app frame. */
  stage: string;
  /** The screen background. */
  page: string;
  /** Cards, sheets, headers. */
  card: string;
  /** Tinted surface for pills and inset blocks. */
  bay: string;

  // Text
  ink: string;
  ink2: string;
  muted: string;

  // Lines
  line: string;
  line2: string;
  /** Borders on interactive controls. */
  ctlLine: string;
  dash: string;

  // State
  ok: string;
  okTint: string;
  red: string;
  redTint: string;
  redLine: string;
  redSolid: string;
  /** WhatsApp green, for the WhatsApp actions only. */
  wa: string;

  // Controls
  /** Fill for selected controls and primary buttons. */
  sel: string;
  toggleOff: string;
  disBg: string;
  disFg: string;
  disChip: string;

  // Misc
  /** Background for the numeric odometer cells. */
  odoBg: string;
  skelA: string;
  skelB: string;
  demoBg: string;
  /** Translucent tab bar fill, sits over a blur. */
  tabsBg: string;
};

export const light: Palette = {
  navy: '#16213a',
  navy2: '#24324f',
  orange: '#e2662b',
  onOrange: '#16213a',
  orangeInk: '#b4491a',
  orangeTint: '#fbe9df',
  orangeDeep: '#a8441a',
  orangeDeep2: '#7a3d1c',
  orangeLine: '#f3cdb8',

  stage: '#d9dde3',
  page: '#f2f3f5',
  card: '#ffffff',
  bay: '#eef0f3',

  ink: '#16213a',
  ink2: '#4b5468',
  muted: '#6b7386',

  line: '#e4e7eb',
  line2: '#dfe3e8',
  ctlLine: '#b5bdc7',
  dash: '#b4bcc6',

  ok: '#16213a',
  okTint: '#eef0f3',
  red: '#b83a2e',
  redTint: '#f8e5e2',
  redLine: '#efc9c3',
  redSolid: '#b83a2e',
  wa: '#17803f',

  sel: '#16213a',
  toggleOff: '#c5ccd5',
  disBg: '#b8bfc9',
  disFg: '#ffffff',
  disChip: '#a9b0ba',

  odoBg: '#16213a',
  skelA: '#e7eaee',
  skelB: '#f2f4f6',
  demoBg: 'rgba(255,255,255,0.55)',
  tabsBg: 'rgba(255,255,255,0.92)',
};

/**
 * The prototype's dark block overrides a subset; anything it leaves
 * alone keeps its light value. Spreading `light` first reproduces that
 * exactly - orange, navy2, wa, onOrange and redSolid are deliberately
 * not re-stated below.
 */
export const dark: Palette = {
  ...light,

  stage: '#060a13',
  page: '#0c1322',
  card: '#151f33',
  bay: '#202c45',

  ink: '#e8ecf4',
  ink2: '#b3bed2',
  muted: '#95a2b9',

  line: '#263450',
  line2: '#34415f',
  ctlLine: '#4a5878',
  dash: '#3d4a68',

  navy: '#1a2745',
  orangeInk: '#f08a5c',
  orangeTint: '#3a2216',
  orangeDeep: '#f4a57f',
  orangeDeep2: '#f6c3a6',
  orangeLine: '#5b3a27',

  ok: '#4cc38a',
  okTint: '#12301f',
  red: '#f0877a',
  redTint: '#3a1c19',
  redLine: '#5a2a25',

  sel: '#3b4f7c',
  toggleOff: '#3d4a68',
  disBg: '#26324d',
  disFg: '#7c89a3',
  disChip: '#5d6a86',

  odoBg: '#0e1729',
  skelA: '#1a2538',
  skelB: '#243250',
  demoBg: 'rgba(255,255,255,0.04)',
  tabsBg: 'rgba(21,31,51,0.92)',
};

export const palettes = { light, dark } as const;
export type ThemeName = keyof typeof palettes;

/** 12px carries most of the UI; 999 is the pill. */
export const radius = {
  xs: 6,
  sm: 8,
  md: 10,
  /** The default for cards, buttons, fields and photos. */
  lg: 12,
  xl: 20,
  /** The floating tab bar. */
  tabs: 22,
  pill: 999,
} as const;

export const space = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
  xxxl: 24,
} as const;

export const layout = {
  screenPadding: 16,
  cardPadding: 16,
  cardGap: 10,
  /** Primary buttons. */
  buttonHeight: 48,
  buttonHeightSm: 40,
  /** Fields stay taller than buttons. */
  fieldHeight: 52,
  /** Round icon buttons, and the minimum tap target. */
  iconButton: 44,
  hairline: 1,
  /** Chips carry a heavier border than hairlines; fields use 1px of ink. */
  chipBorder: 1.5,
  /** Sheets are the one place with a larger radius. */
  sheetRadius: 28,
  /** Standard screen body: `.pad`. */
  padGap: 12,
  padBottom: 32,
} as const;

/**
 * Cards sit flat on the grey page with a shadow and no border. Where the
 * surface behind them is already white - inside a sheet, or a home
 * section - round 2 swaps that for a hairline border and no shadow.
 */
export const shadow = {
  card: {
    shadowColor: '#101828',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  footer: {
    shadowColor: '#101828',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -6 },
    elevation: 8,
  },
} as const;

/** Matches the prototype's --ease-out and --ease-drawer. */
export const easing = {
  out: [0.23, 1, 0.32, 1],
  drawer: [0.32, 0.72, 0, 1],
} as const;
