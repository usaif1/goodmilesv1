import { Pressable, StyleSheet, View } from 'react-native';

import { categoryFrom, inr, type Car } from '@/domain';
import type { Category } from '@/data';
import { Icon, face, layout, radius, useTheme } from '@/theme';

import { Text } from './Text';

export type CategoryTileProps = {
  category: Category;
  car?: Car | null;
  /** Shows the "From ₹x" line under the name. */
  withPrice?: boolean;
  onPress: () => void;
};

/** `.ucat` - a square tile with the category icon and its name. */
export function CategoryTile({
  category,
  car = null,
  withPrice,
  onPress,
}: CategoryTileProps) {
  const { c } = useTheme();
  const from = withPrice ? categoryFrom(category.id, car) : null;
  // Inspections are free, so they never show a "from" price.
  const priceLine =
    category.id === 'inspection'
      ? 'Free'
      : from !== null
        ? `From ${inr(from)}`
        : null;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
    >
      <View style={[styles.art, { backgroundColor: c.card, borderColor: c.line }]}>
        <Icon name={category.icon} size={26} color={c.ink} />
      </View>
      <Text variant="meta" tone="ink" style={styles.name} numberOfLines={2}>
        {category.name}
      </Text>
      {withPrice && priceLine ? (
        <Text variant="meta" tone="muted" style={styles.from}>
          {priceLine}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', gap: 7 },
  pressed: { transform: [{ scale: 0.95 }] },
  art: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { textAlign: 'center', fontFamily: face.bold },
  from: { marginTop: -4, textAlign: 'center' },
});
