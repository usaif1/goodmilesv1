import { StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Divider,
  Footer,
  Screen,
  ScreenHeader,
  Text,
} from '@/components';
import { buildBill, inr, pickupDays, windowText } from '@/domain';
import { useApp } from '@/store';
import { Icon, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const NEXT: string[] = [
  'Your Guardian will message you on WhatsApp',
  'The driver photographs your car at pickup',
  'You review the photos and estimate, and approve the work',
  'Your car comes back with its old parts',
];

/** Order ids run GM-#####, continuing the prototype's BN- series. */
const newOrderId = () =>
  `GM-${Math.floor(10000 + Math.random() * 90000)}`;

export function ReviewScreen({ navigation }: RootScreenProps<'Review'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const cart = useApp(s => s.cart);
  const slot = useApp(s => s.slot);
  const address = useApp(s => s.address);
  const dropSelf = useApp(s => s.dropSelf);
  const parts = useApp(s => s.parts);
  const member = useApp(s => s.member);
  const coupon = useApp(s => s.coupon);
  const coins = useApp(s => s.coins);
  const coinsOn = useApp(s => s.coinsOn);
  const loggedIn = useApp(s => s.loggedIn);
  const express = useApp(s => s.express);
  const payNow = useApp(s => s.payNow);
  const confirmOrder = useApp(s => s.confirmOrder);

  const bill = buildBill({
    cart,
    car,
    parts,
    member,
    coupon,
    coins,
    coinsOn,
    loggedIn,
    express,
    payNow,
  });
  const day = pickupDays()[slot.day];

  const confirm = () => {
    confirmOrder({
      id: newOrderId(),
      items: bill.items.map(i => [i.service.name, i.total]),
      slot,
      self: dropSelf,
      coupon: bill.couponOff,
    });
    navigation.reset({ index: 0, routes: [{ name: 'Confirmed' }] });
  };

  return (
    <Screen
      header={<ScreenHeader title="Check and confirm" onBack={navigation.goBack} />}
      footer={
        <Footer>
          <Button label="Confirm booking" onPress={confirm} />
        </Footer>
      }
    >
      <Card>
        <View style={styles.carRow}>
          <View style={[styles.thumb, { backgroundColor: c.bay }]}>
            <Icon name="car" size={24} color={c.muted} />
          </View>
          <View style={styles.grow}>
            <Text variant="bodyStrong">
              {car ? `${car.brand} ${car.model}` : 'Your car'}
            </Text>
            {car ? (
              <Text variant="small" tone="muted">
                {car.fuel} · {car.trans} · {car.year}
              </Text>
            ) : null}
          </View>
        </View>
        <Divider />
        <Row
          label={dropSelf ? 'Drop off' : 'Pickup'}
          value={`${day.top}, ${day.date} · ${windowText(slot.win)}`}
        />
        <Row
          label="From"
          value={
            dropSelf
              ? 'GoodMiles garage'
              : address
                ? `${address.label} · ${address.short}`
                : 'Your address'
          }
        />
      </Card>

      <Card>
        {bill.items.map(i => (
          <Row
            key={i.service.id}
            label={i.service.name}
            value={i.total === 0 ? 'Free' : i.total !== null ? inr(i.total) : '—'}
          />
        ))}
        {bill.memberFee ? (
          <Row label="GoodMiles Member" value={inr(bill.memberFee)} />
        ) : null}
        {bill.memberOff ? (
          <Row
            label="Member discount (10%)"
            value={`−${inr(bill.memberOff)}`}
          />
        ) : null}
        {bill.couponOff ? (
          <Row label="Coupon FIRST200" value={`−${inr(bill.couponOff)}`} />
        ) : null}
        {/* Without these the listed lines do not add up to the total. */}
        {bill.coinsUse ? (
          <Row label="Coins" value={`−${inr(bill.coinsUse)}`} />
        ) : null}
        {bill.express ? (
          <Row label="Express pickup" value={inr(bill.express)} />
        ) : null}
        {bill.prepay ? (
          <Row label="Prepay discount" value={`−${inr(bill.prepay)}`} />
        ) : null}
        <Divider />
        <View style={styles.totalRow}>
          <Text variant="h3">Pay later</Text>
          <Text variant="h2" style={styles.total}>
            {inr(bill.total)}
          </Text>
        </View>
      </Card>

      <Card>
        <Text variant="h3">What happens next</Text>
        {NEXT.map(step => (
          <View key={step} style={styles.step}>
            <Icon name="check" size={14} strokeWidth={3} color={c.ink} />
            <Text variant="body" style={styles.grow}>
              {step}
            </Text>
          </View>
        ))}
      </Card>

      <Text variant="small" tone="muted" style={styles.fine}>
        This is the price for the jobs you booked. Extra work needs your
        approval first. Cancel free until inspection starts.
      </Text>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text variant="body" tone="muted" style={styles.grow}>
        {label}
      </Text>
      <Text variant="bodyStrong">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  carRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumb: {
    width: 56,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  total: { fontSize: 20 },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  fine: { textAlign: 'center' },
});
