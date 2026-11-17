import { Image, Pressable, StyleSheet, View } from 'react-native';

import { categoryImage } from '@/assets';
import type { Service } from '@/data';
import { inr, priceFor, type Car } from '@/domain';
import { Icon, radius, useTheme } from '@/theme';

import { AddButton } from './AddButton';
import { Text } from './Text';

export type MiniCardProps = {
  service: Service;
  car: Car | null;
  added: boolean;
  onAdd: () => void;
  onPress: () => void;
};

/** `.mc` - the card the horizontal rails are made of. */
export function MiniCard({ service, car, added, onAdd, onPress }: MiniCardProps) {
  const { c } = useTheme();
  const price = priceFor(service, car);
  const art = categoryImage(service.cat);

  return (
    <View style={styles.base}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.art, { backgroundColor: c.bay }]}
      >
        {art ? (
          <Image source={art} style={styles.artImage} resizeMode="contain" />
        ) : (
          <Icon name="wrench" size={26} color={c.muted} />
        )}
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onPress}>
        <Text variant="smallStrong" numberOfLines={2} style={styles.name}>
          {service.name}
        </Text>
      </Pressable>
      <View style={styles.foot}>
        <Text variant="smallStrong" numberOfLines={1} style={styles.grow}>
          {price === null ? service.hrs : price === 0 ? 'Free' : inr(price)}
        </Text>
        <AddButton added={added} onPress={onAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  base: { width: 150, gap: 5 },
  art: {
    width: 150,
    height: 112,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  artImage: { width: '62%', height: '62%' },
  name: { minHeight: 35 },
  foot: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
