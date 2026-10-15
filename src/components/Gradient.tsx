import { useId } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

type Direction = 'diagonal' | 'horizontal' | 'vertical';

const VECTORS: Record<Direction, { x2: string; y2: string }> = {
  diagonal: { x2: '1', y2: '1' },
  horizontal: { x2: '1', y2: '0' },
  vertical: { x2: '0', y2: '1' },
};

type Props = {
  colors: readonly [string, string];
  direction?: Direction;
  style?: ViewStyle;
};

/**
 * Fills its parent with a two-stop linear gradient.
 *
 * react-native-svg rather than a dedicated gradient library: svg is
 * already a dependency for icons, so this costs no extra native module.
 *
 * The gradient id is per-instance. SVG ids resolve within a document,
 * so a shared literal id would make every gradient on screen pick up
 * whichever definition mounted last. useId's value contains colons,
 * which are not valid in a url(#...) reference, so they are stripped.
 */
export function Gradient({ colors, direction = 'diagonal', style }: Props) {
  const id = `grad${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const { x2, y2 } = VECTORS[direction];

  return (
    <Svg style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
          <Stop offset="0" stopColor={colors[0]} />
          <Stop offset="1" stopColor={colors[1]} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}
