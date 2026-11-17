import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { typeScale, useTheme, type TypeRole } from '@/theme';

export type TextProps = RNTextProps & {
  /**
   * A role from the type scale. Defaults to `body`.
   *
   * Named `variant` rather than `role` on purpose: RNTextProps already
   * has `role` for the ARIA role, and intersecting the two silently
   * narrows this to the values they happen to share.
   */
  variant?: TypeRole;
  /**
   * A palette key, so colour follows the theme. Defaults to `ink`,
   * except for roles that are muted by definition.
   */
  tone?: 'ink' | 'ink2' | 'muted' | 'onDark' | 'orange' | 'ok' | 'red';
};

/** Roles the prototype always renders in the muted grey. */
const MUTED_BY_DEFAULT = new Set<TypeRole>([
  'label',
  'meta',
  'headerSub',
  'headerSubRoot',
]);

/**
 * Every piece of text in the app goes through here. Screens pick a role
 * and a tone rather than a size and a hex, which is what keeps the type
 * scale honest and dark mode working.
 */
export function Text({ variant = 'body', tone, style, ...rest }: TextProps) {
  const { c } = useTheme();
  const palette = {
    ink: c.ink,
    ink2: c.ink2,
    muted: c.muted,
    onDark: '#ffffff',
    orange: c.orangeInk,
    ok: c.ok,
    red: c.red,
  };
  const resolved = tone ?? (MUTED_BY_DEFAULT.has(variant) ? 'muted' : 'ink');
  return (
    <RNText
      style={[typeScale[variant], { color: palette[resolved] }, style]}
      {...rest}
    />
  );
}
