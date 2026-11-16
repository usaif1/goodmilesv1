import { Image, StyleSheet, View } from 'react-native';

import { serviceImage } from '@/assets';

import { Button, Card, Screen, ScreenHeader, Text } from '@/components';
import { ODOMETER, PICKUP_ANGLES } from '@/data';
import { serviceClock } from '@/domain';
import { useApp } from '@/store';
import { Icon, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

export function CarPhotosScreen({ navigation }: RootScreenProps<'CarPhotos'>) {
  const { c } = useTheme();
  const order = useApp(s => s.order);
  const clock = serviceClock(order?.slot.win);

  return (
    <Screen
      header={
        <ScreenHeader
          title="Your car at pickup"
          subtitle={`Taken by Rahul · ${clock.pickup}`}
          onBack={navigation.goBack}
        />
      }
    >
      <View style={styles.promise}>
        <Icon name="shield" size={14} color={c.ink} />
        <Text variant="small" style={[styles.grow, { color: c.ink2 }]}>
          This is your car&rsquo;s condition at pickup. If a new mark appears at
          delivery, we fix it free.
        </Text>
      </View>

      <View style={styles.grid}>
        {PICKUP_ANGLES.map((angle, i) => {
          const photo = serviceImage(angle.image);
          return (
            <View key={angle.label} style={[styles.photo, { backgroundColor: c.bay }]}>
              {photo ? (
                <Image source={photo} style={styles.fill} resizeMode="cover" />
              ) : (
                <Icon name="camera" size={22} color={c.muted} />
              )}
              <View style={[styles.stamp, { backgroundColor: c.card }]}>
                <Text variant="meta" tone="ink" numberOfLines={1}>
                  {angle.label} · {clock.photo(i)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <Card>
        <Row label="Odometer" value={ODOMETER.pickup} />
        <Row label="Fuel" value="About half" />
        <Row label="Items in the car" value="Spare wheel, jack" />
      </Card>

      <Button label="Something looks wrong? Tell us" variant="ghost" />
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text variant="body" tone="muted">
        {label}
      </Text>
      <Text variant="bodyStrong">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  promise: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  fill: { width: '100%', height: '100%' },
  photo: {
    width: '48.5%',
    aspectRatio: 4 / 3,
    borderRadius: radius.sm,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stamp: {
    position: 'absolute',
    left: 6,
    bottom: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
});
