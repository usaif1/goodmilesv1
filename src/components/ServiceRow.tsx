import { Pressable, StyleSheet, View } from 'react-native';

import { inr, mrp, priceFor, type Car } from '@/domain';
import { RATINGS, type Service } from '@/data';
import { Icon, layout, radius, shadow, typeScale, useTheme } from '@/theme';

import { AddButton } from './AddButton';
import { Text } from './Text';

export type ServiceRowProps = {
  service: Service;
  car: Car | null;
  added: boolean;
  onAdd: () => void;
  onPress: () => void;
};

/**
 * `.sv` - the row the category pages are built from: artwork on the
 * left, then the name, its rating, what it covers, and the price beside
 * the ADD button.
 */
export function ServiceRow({
  service,
  car,
  added,
  onAdd,
  onPress,
}: ServiceRowProps) {
  const { c } = useTheme();
  const p = priceFor(service, car);
  const rating = RATINGS[service.id];
  const covers = service.inc
    .slice(0, 2)
    .map(([line]) => line)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.base, shadow.card, { backgroundColor: c.card }]}
    >
      <View style={[styles.art, { backgroundColor: c.bay }]}>
        <Icon name="wrench" size={28} color={c.muted} />
      </View>

      <View style={styles.body}>
        <Text variant="h3" numberOfLines={2}>
          {service.name}
        </Text>
        {rating ? (
          <View style={styles.rating}>
            <Icon name="star" size={13} strokeWidth={2.4} color={c.ink} />
            <Text variant="small" tone="muted">
              {rating[0]} ({rating[1].toLocaleString('en-IN')})
            </Text>
          </View>
        ) : null}
        <Text variant="small" tone="muted" numberOfLines={1}>
          {service.hrs}
          {service.every ? ` · ${service.every}` : ''}
        </Text>
        <Text variant="small" numberOfLines={1} style={{ color: c.ink2 }}>
          {covers}
        </Text>

        <View style={styles.foot}>
          {p === null ? (
            <Text variant="small" tone="muted">
              Add your car for the price
            </Text>
          ) : (
            <Text variant="small" tone="muted">
              <Text style={styles.price}>{p === 0 ? 'Free' : inr(p)}</Text>
              {p > 0 ? `  ${inr(mrp(p))}` : ''}
            </Text>
          )}
          <AddButton added={added} onPress={onAdd} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', gap: 12, padding: 12, borderRadius: radius.lg },
  art: {
    width: 88,
    height: 112,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, minWidth: 0, gap: 3 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  foot: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  price: { ...typeScale.h3, fontSize: 16 },
});

export const SERVICE_ROW_GAP = layout.cardGap;
