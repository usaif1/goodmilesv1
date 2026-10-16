import { StyleSheet, View } from 'react-native';
import { color, layout, space } from '@/theme';

type Props = { dashed?: boolean };

/**
 * The rule above the total on C08's bill summary and C10's booking
 * details. Both are dashed: scanning C08 at the divider row found
 * #D0D5DD covering 312 of 620px, a 50% duty cycle.
 *
 * Dashes are drawn with a dashed border on a zero-height box rather
 * than with borderStyle on the container, because a dashed border
 * only renders on all four sides in RN and would box the content in.
 */
export function Divider({ dashed }: Props) {
  return <View style={[s.rule, dashed ? s.dashed : s.solid]} />;
}

const s = StyleSheet.create({
  rule: { marginVertical: space.md },
  solid: {
    height: layout.hairline,
    backgroundColor: color.divider,
  },
  dashed: {
    height: 0,
    borderTopWidth: layout.hairline,
    borderStyle: 'dashed',
    borderColor: color.border,
  },
});
