import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Divider,
  Footer,
  Screen,
  ScreenHeader,
  Text,
} from '@/components';
import { ESTIMATE_ITEMS, serviceById } from '@/data';
import { inr, priceFor, serviceClock } from '@/domain';
import { useApp } from '@/store';
import { Icon, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const METHODS = ['UPI', 'Card', 'Net banking'] as const;
/** Stage 8 onwards the bill is settled. */
const PAID_FROM = 8;

export function BillScreen({ navigation }: RootScreenProps<'Bill'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const order = useApp(s => s.order);
  const stage = useApp(s => s.stage);
  const approvedSel = useApp(s => s.approvedSel);
  const advanceStage = useApp(s => s.advanceStage);

  const [method, setMethod] = useState(0);
  const paid = stage >= PAID_FROM;
  const clock = serviceClock(order?.slot.win);

  const selection = approvedSel ?? { m1: true, m2: true };
  const jobs = ESTIMATE_ITEMS.filter(x => selection[x.id]);
  const priceOf = (item: (typeof ESTIMATE_ITEMS)[number]) => {
    const service = serviceById(item.serviceId);
    return priceFor(service!, car) ?? item.fallback;
  };
  const amount = jobs.reduce((a, x) => a + priceOf(x), 0);
  const coinsOff = order?.coupon ?? 0;
  const due = amount - coinsOff;

  const pay = () => {
    advanceStage();
    navigation.navigate('Rate');
  };

  return (
    <Screen
      header={
        <ScreenHeader
          title="Your bill"
          subtitle={order ? `${car ? car.model + ' · ' : ''}${order.id}` : 'Example'}
          onBack={navigation.goBack}
        />
      }
      footer={
        paid ? (
          <Footer>
            <Button label="Rate your service" onPress={() => navigation.navigate('Rate')} />
          </Footer>
        ) : (
          <Footer total={{ label: 'To pay', value: inr(due) }}>
            <Button
              label={`Pay with ${METHODS[method].toLowerCase()}`}
              style={styles.grow}
              onPress={pay}
            />
          </Footer>
        )
      }
    >
      <View style={styles.matches}>
        <Icon name="check" size={14} strokeWidth={2.6} color={c.ink} />
        <Text variant="small" style={[styles.grow, { color: c.ink2 }]}>
          Matches what you approved at {clock.approved}. Nothing added after.
        </Text>
      </View>

      <Card>
        {jobs.map(j => (
          <View key={j.id} style={styles.row}>
            <Text variant="body" style={styles.grow}>
              {j.name}
            </Text>
            <Text variant="bodyStrong">{inr(priceOf(j))}</Text>
          </View>
        ))}
        {coinsOff ? (
          <View style={styles.row}>
            <Text variant="body" style={styles.grow}>
              Coupon FIRST200
            </Text>
            <Text variant="bodyStrong">−{inr(coinsOff)}</Text>
          </View>
        ) : null}
        <Divider />
        <View style={styles.row}>
          <Text variant="h3">{paid ? 'Paid' : 'To pay'}</Text>
          <Text variant="h3">{inr(due)}</Text>
        </View>
        <Text variant="small" tone="muted">
          GST included
        </Text>
      </Card>

      <Card selected>
        <View style={styles.row}>
          <View style={styles.grow}>
            <Text variant="label">GoodMiles health passport</Text>
            <Text variant="h3">
              {car ? car.model : 'Your car'} · Service 1
            </Text>
          </View>
          <Icon name="shield" size={22} color={c.ink} />
        </View>
        <Text variant="small" style={{ color: c.ink2 }}>
          {paid
            ? 'Added to your passport.'
            : 'Added to your passport when you pay.'}
        </Text>
      </Card>

      {paid ? (
        <Card>
          <Text variant="bodyStrong">Payment received</Text>
          <Text variant="small" tone="muted">
            {METHODS[method]} · ref 4521 8890 1123
          </Text>
        </Card>
      ) : (
        <Pressable
          accessibilityRole="button"
          onPress={() => setMethod(m => (m + 1) % METHODS.length)}
        >
          <Card>
            <View style={styles.row}>
              <View style={styles.grow}>
                <Text variant="small" tone="muted">
                  Pay with
                </Text>
                <Text variant="bodyStrong">{METHODS[method]}</Text>
              </View>
              <Text variant="smallStrong" style={styles.link}>
                Change
              </Text>
            </View>
          </Card>
        </Pressable>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  matches: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  link: { textDecorationLine: 'underline' },
});
