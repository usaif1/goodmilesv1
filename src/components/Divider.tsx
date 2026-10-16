import { StyleSheet, View } from 'react-native';
import { color, layout, space } from '@/theme';

type Props = { dashed?: boolean };

/** 4pt on, 4pt off - the 50% duty cycle measured on C08's bill rule. */
const DASH = 4;
/** Enough segments to overrun any card; the row clips the remainder. */
const SEGMENTS = 60;

const dashes = Array.from({ length: SEGMENTS }, (_, i) => i);

/**
 * The rule above the total on C08's bill summary and C10's booking
 * details. Both are dashed: scanning C08 at the divider row found
 * #D0D5DD covering 312 of 620px, a 50% duty cycle.
 *
 * The dashes are drawn as individual segments rather than with
 * borderStyle: 'dashed'. That property is not dependable here - the
 * identical component rendered dashed inside a plain Card and solid
 * inside a bordered one, 212/331 coverage against 316/331. Drawing the
 * segments makes the result the same in every context and on both
 * platforms.
 */
export function Divider({ dashed }: Props) {
  if (!dashed) {
    return <View style={[s.rule, s.solid]} />;
  }

  return (
    <View style={[s.rule, s.dashRow]}>
      {dashes.map(i => (
        <View key={i} style={s.dash} />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  rule: { marginVertical: space.md },
  solid: {
    height: layout.hairline,
    backgroundColor: color.divider,
  },
  dashRow: {
    flexDirection: 'row',
    height: layout.hairline,
    overflow: 'hidden',
  },
  dash: {
    width: DASH,
    height: layout.hairline,
    marginRight: DASH,
    backgroundColor: color.border,
  },
});
