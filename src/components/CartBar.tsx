import { StyleSheet, Text, View } from 'react-native';
import { space, type } from '@/theme';
import { Button } from './Button';
import { RUPEE } from './PriceRow';

type Props = {
  count: number;
  total: string;
  onPress?: () => void;
  label?: string;
};

/**
 * The sticky cart summary on C06: item count over the running total on
 * the left, the action on the right. Sits inside a StickyFooter.
 */
export function CartBar({ count, total, onPress, label = 'View Cart' }: Props) {
  return (
    <View style={s.bar}>
      <View>
        <Text style={s.count}>
          {count} {count === 1 ? 'item' : 'items'}
        </Text>
        <Text style={s.total}>
          {RUPEE}
          {total}
        </Text>
      </View>
      <Button label={label} onPress={onPress} style={s.cta} />
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.lg,
  },
  count: type.meta,
  total: { ...type.price, fontSize: 18 },
  cta: { flex: 1, maxWidth: 200 },
});
