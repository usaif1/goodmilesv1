import { StyleSheet, View } from 'react-native';

import {
  Card,
  IconButton,
  Screen,
  ScreenHeader,
  Text,
  useToast,
} from '@/components';
import { call } from '@/lib';
import { pickupDays, serviceClock, windowText } from '@/domain';
import { useApp } from '@/store';
import { Icon, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

/** From stage 6 the driver is bringing the car back, not collecting it. */
const RETURNING_FROM = 6;

export function PickupScreen({ navigation }: RootScreenProps<'Pickup'>) {
  const { c } = useTheme();
  const { toast } = useToast();
  const order = useApp(s => s.order);
  const stage = useApp(s => s.stage);
  const car = useApp(s => s.car);

  const back = stage >= RETURNING_FROM;
  const day = pickupDays()[order?.slot.day ?? 0];
  const clock = serviceClock(order?.slot.win);

  return (
    <Screen
      header={
        <ScreenHeader
          title={back ? 'On the way back' : 'Driver arriving'}
          subtitle={order ? `${car?.model ?? 'Your car'} · ${order.id}` : 'Example'}
          onBack={navigation.goBack}
        />
      }
    >
      <Card>
        <Text variant="small" tone="muted">
          {back ? 'Bringing your car back' : 'Arriving at your door'}
        </Text>
        <Text variant="h1">In 12 min</Text>
        <Text variant="small" style={{ color: c.ink2 }}>
          {back
            ? 'Washed, checked and with your old parts'
            : `${day.top}, ${day.date} · ${windowText(order?.slot.win ?? '')}`}
        </Text>
      </Card>

      <Card>
        <View style={styles.driver}>
          <View style={[styles.avatar, { backgroundColor: c.bay }]}>
            <Text variant="bodyStrong">RK</Text>
          </View>
          <View style={styles.grow}>
            <Text variant="bodyStrong">Rahul Kumar</Text>
            <Text variant="small" tone="muted">
              GoodMiles driver
            </Text>
          </View>
          <IconButton
            name="phone"
            size={18}
            accessibilityLabel="Call Rahul"
            onPress={async () => {
              if (!(await call())) toast("Calling Rahul\u2026");
            }}
          />
        </View>
      </Card>

      <Card>
        <Text variant="label">{back ? 'Delivery code' : 'Handover code'}</Text>
        <Text variant="h1" style={styles.code}>
          {back ? '8135' : '4721'}
        </Text>
        <Text variant="small" tone="muted">
          {back
            ? 'Share it with Rahul only after you have your keys and your car looks right.'
            : 'Share it with Rahul only when you hand over the keys.'}
        </Text>
      </Card>

      {!back ? (
        <Card>
          <Text variant="h3">Keep ready</Text>
          {['Car keys', 'Valuables out of the car'].map(t => (
            <View key={t} style={styles.ready}>
              <Icon name="check" size={16} strokeWidth={2.4} color={c.ink} />
              <Text variant="small">{t}</Text>
            </View>
          ))}
        </Card>
      ) : (
        <Text variant="small" tone="muted">
          Expected back around {clock.delivered}.
        </Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  driver: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  code: { letterSpacing: 4 },
  ready: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
