import { Image, Pressable, StyleSheet, View } from 'react-native';

import { serviceImage } from '@/assets';

import { Button, Card, Footer, Screen, ScreenHeader, Text } from '@/components';
import { ODOMETER } from '@/data';
import { serviceClock } from '@/domain';
import { useApp } from '@/store';
import { Icon, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

export function DeliveryScreen({ navigation }: RootScreenProps<'Delivery'>) {
  const { c } = useTheme();
  const order = useApp(s => s.order);
  const approvedSel = useApp(s => s.approvedSel);
  const clock = serviceClock(order?.slot.win);

  const id = order?.id ?? 'GM-24817';
  const selection = approvedSel ?? { m1: true, m2: true };
  // Only the parts actually replaced come back in the box.
  const parts = [
    ...(selection.m2 ? ['Front brake pads'] : []),
    'Oil filter',
    'Air filter',
  ];

  return (
    <Screen
      header={
        <ScreenHeader
          title="Your car is back"
          subtitle={`Delivered ${clock.delivered}`}
          onBack={navigation.goBack}
        />
      }
      footer={
        <Footer>
          <Button label="See your bill" onPress={() => navigation.navigate('Bill')} />
        </Footer>
      }
    >
      <Card>
        <View style={[styles.box, { backgroundColor: c.bay }]}>
          {serviceImage('oldparts-box') ? (
            <Image
              source={serviceImage('oldparts-box')}
              style={styles.fill}
              resizeMode="cover"
            />
          ) : (
            <Icon name="box" size={32} color={c.muted} />
          )}
        </View>
        <View style={styles.head}>
          <Text variant="h3" style={styles.grow}>
            Your old parts
          </Text>
          <Text variant="small" tone="muted">
            {parts.length} in the box
          </Text>
        </View>
        {parts.map((p, i) => (
          <View key={p} style={[styles.tag, { borderColor: c.line }]}>
            <Text variant="small" tone="muted">
              {id}-0{i + 1}
            </Text>
            <Text variant="smallStrong">{p}</Text>
          </View>
        ))}
        <Text variant="small" tone="muted">
          The same numbers are on your bill.
        </Text>
      </Card>

      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('CarPhotos')}
      >
      <Card>
        <View style={styles.head}>
          <Text variant="h3" style={styles.grow}>
            No new marks
          </Text>
          <Text variant="small" tone="muted">
            8 of 8 angles ›
          </Text>
        </View>
        <View style={styles.compare}>
          {[
            ['Pickup', clock.pickup],
            ['Delivery', clock.delivered],
          ].map(([label, time]) => (
            <View key={label} style={[styles.shot, { backgroundColor: c.bay }]}>
              {serviceImage('angle-front-left') ? (
                <Image
                  source={serviceImage('angle-front-left')}
                  style={styles.fill}
                  resizeMode="cover"
                />
              ) : (
                <Icon name="camera" size={20} color={c.muted} />
              )}
              <View style={[styles.stamp, { backgroundColor: c.card }]}>
                <Text variant="meta" tone="ink" numberOfLines={1}>
                  {label} {time}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <Text variant="small" tone="muted">
            Odometer
          </Text>
          <Text variant="smallStrong">{ODOMETER.delivery}</Text>
        </View>
        <Text variant="small" tone="muted">
          +18 km for pickup, road test and drop
        </Text>
      </Card>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  fill: { width: '100%', height: '100%' },
  box: {
    height: 180,
    borderRadius: radius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  compare: { flexDirection: 'row', gap: 8 },
  shot: {
    flex: 1,
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
