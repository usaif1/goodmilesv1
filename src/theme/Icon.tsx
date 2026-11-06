import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ICONS, type IconElement, type IconName } from './icon-data';
import { useTheme } from './ThemeProvider';

export type IconProps = {
  name: IconName;
  /** Width and height; the prototype's `ic(name, size)`. Defaults to 22. */
  size?: number;
  /** Defaults to the active palette's ink. */
  color?: string;
  /** The prototype's third `ic()` argument. Defaults to 1.8. */
  strokeWidth?: number;
};

function renderElement([tag, props]: IconElement, key: number) {
  switch (tag) {
    case 'Path':
      return <Path key={key} {...props} />;
    case 'Rect':
      return <Rect key={key} {...props} />;
    case 'Circle':
      return <Circle key={key} {...props} />;
    default:
      return null;
  }
}

/**
 * Mirrors the prototype's `ic(name, size, weight)` helper: a 24x24
 * stroked glyph that takes its colour from the caller.
 */
export function Icon({ name, size = 22, color, strokeWidth = 1.8 }: IconProps) {
  const { c } = useTheme();
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? c.ink}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name].map(renderElement)}
    </Svg>
  );
}
