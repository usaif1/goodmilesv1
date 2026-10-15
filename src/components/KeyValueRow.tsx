import { StyleSheet, Text, View } from 'react-native';
import { space, type } from '@/theme';

type Props = {
  label: string;
  value: string;
  /** Emphasise the row, as the cart's "To pay" line does. */
  strong?: boolean;
  /** Tint the value, e.g. green for a discount or FREE. */
  valueColor?: string;
};

/**
 * Label left, value right. Used by the C08 bill summary, the C10
 * booking details and the C15 price table.
 */
export function KeyValueRow({ label, value, strong, valueColor }: Props) {
  return (
    <View style={s.row}>
      <Text style={strong ? s.labelStrong : s.label}>{label}</Text>
      <Text
        style={[
          strong ? s.valueStrong : s.value,
          valueColor ? { color: valueColor } : null,
        ]}>
        {value}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
  label: type.body,
  labelStrong: { ...type.body, fontWeight: '700' },
  value: { ...type.body, fontWeight: '700', textAlign: 'right', flexShrink: 1 },
  valueStrong: { ...type.price, textAlign: 'right', flexShrink: 1 },
});
