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
  list: { gap: space.md },
  listDense: { gap: space.xs + 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  text: { ...type.body, flexShrink: 1 },
  textDense: { ...type.meta, flexShrink: 1 },
});
