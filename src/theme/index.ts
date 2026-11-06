export {
  light,
  dark,
  palettes,
  radius,
  space,
  layout,
  easing,
  shadow,
  type Palette,
  type ThemeName,
} from './tokens';
/**
 * The scale is `typeScale`, not `type`: a value named `type` is
 * ambiguous with TypeScript's type-only import syntax and silently
 * breaks inference at the call site.
 */
export { typeScale, face, type TypeRole } from './typography';
export { ThemeProvider, useTheme } from './ThemeProvider';
export { Icon, type IconProps } from './Icon';
export { ICONS, type IconName } from './icon-data';
