import Check from 'lucide-react-native/icons/check';
import { StyleSheet, Text, View } from 'react-native';
import { color, space, type } from '@/theme';

type Props = {
  items: readonly string[];
  /** Tighter rows and muted text, as inside the C06 service cards. */
  dense?: boolean;
};

/**
 * The ticked inclusion list on C06, C07 and C15. The mockups draw a
 * plain check glyph; this uses the lucide icon so it tints with the
 * brand colour and keeps the same metrics on both platforms.
 */
export function CheckList({ items, dense }: Props) {
  return (
    <View style={dense ? s.listDense : s.list}>
      {items.map(item => (
        <View key={item} style={s.row}>
          <Check
            size={dense ? 14 : 18}
            color={color.brand}
            strokeWidth={dense ? 2.5 : 2}
          />
          <Text style={dense ? s.textDense : s.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  /** C07's included list sits on a ~27pt pitch. */
  list: { gap: space.sm },
  /** C06's ticked rows sit on a 15pt pitch, so no extra gap. */
  listDense: { gap: 0 },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  text: { ...type.body, flexShrink: 1 },
  textDense: { ...type.meta, lineHeight: 15, flexShrink: 1 },
});
