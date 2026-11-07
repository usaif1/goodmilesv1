import { StyleSheet, View } from 'react-native';

import { inr, mrp, priceFor, type Car } from '@/domain';
import type { Service } from '@/data';
import { typeScale, useTheme } from '@/theme';

import { Text } from './Text';

export type PriceTagProps = {
  service: Service;
  car: Car | null;
  /** Shown when there is no car yet; tapping it starts car selection. */
  onPickCar?: () => void;
};

/**
 * `priceTag()` - the price, its struck-through compare-at and the
 * saving. With no car it prompts for one instead, because there is no
 * number to show until we know what the customer drives.
 */
export function PriceTag({ service, car, onPickCar }: PriceTagProps) {
  const { c } = useTheme();
  const p = priceFor(service, car);

  if (p === null) {
    return (
      <Text variant="small" style={styles.link} onPress={onPickCar}>
        Choose your car to see the price &rsaquo;
      </Text>
    );
  }
  if (p === 0) return <Text style={styles.price}>Free</Text>;

  const was = mrp(p);
  const off = Math.round((1 - p / was) * 100);

  return (
    <View style={styles.row}>
      <Text style={styles.price}>{inr(p)}</Text>
      <Text variant="small" tone="muted" style={styles.was}>
        {inr(was)}
      </Text>
      <Text variant="smallStrong" style={{ color: c.ok }}>
        {off}% off
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  price: { ...typeScale.h2, fontSize: 20, letterSpacing: -0.2 },
  was: { textDecorationLine: 'line-through' },
  link: { textDecorationLine: 'underline' },
});
