import { StyleSheet, Text, View } from 'react-native';
import { space, type } from '@/theme';

export const RUPEE = '₹';

type Props = {
  /** Already formatted, e.g. "2,599". The symbol is prepended here. */
  price: string;
  /** Struck-through compare-at price, when the service is discounted. */
  was?: string;
  compact?: boolean;
};

/**
 * Price with its optional compare-at, as on C06, C07 and C15. The
 * struck-through value is grey-400 so it recedes behind the live one.
 */
export function PriceRow({ price, was, compact }: Props) {
  return (
    <View style={s.row}>
      <Text style={[s.price, compact && s.priceCompact]}>
        {RUPEE}
        {price}
      </Text>
      {was ? (
        <Text style={s.was}>
          {RUPEE}
          {was}
        </Text>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline', gap: space.sm },
  price: type.price,
  priceCompact: { fontSize: 14 },
  was: type.priceStrike,
});
