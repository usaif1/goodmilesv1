import { Pressable, StyleSheet, View } from 'react-native';

import { useRef } from 'react';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
  Button,
  Card,
  Divider,
  Footer,
  LoginSheet,
  MiniCard,
  Rail,
  Screen,
  ScreenHeader,
  Text,
  useToast,
} from '@/components';
import { share } from '@/lib';
import { ADDONS, serviceById } from '@/data';
import { buildBill, inr, mrp } from '@/domain';
import { useApp } from '@/store';
import { Icon, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const PROMISES: [string, string][] = [
  ['car', 'Free pickup and drop'],
  ['check', 'Pay only after you approve the work'],
  ['box', 'Your old parts come back in a box'],
  ['shield', 'Free cancellation until the inspection starts'],
];

export function CartScreen({ navigation }: RootScreenProps<'Cart'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const cart = useApp(s => s.cart);
  const toggleCart = useApp(s => s.toggleCart);
  const coupon = useApp(s => s.coupon);
  const applyCoupon = useApp(s => s.applyCoupon);
  const member = useApp(s => s.member);
  const coins = useApp(s => s.coins);
  const coinsOn = useApp(s => s.coinsOn);
  const loggedIn = useApp(s => s.loggedIn);
  const express = useApp(s => s.express);
  const payNow = useApp(s => s.payNow);
  const parts = useApp(s => s.parts);

  const loginSheet = useRef<BottomSheetModal>(null);
  const { toast } = useToast();

  /** Jobs commonly added with what is already in the cart. */
  const suggestions = [
    ...new Set(cart.flatMap(id => ADDONS[serviceById(id)?.cat ?? ''] ?? [])),
  ]
    .filter(id => !cart.includes(id))
    .slice(0, 4)
    .map(serviceById)
    .filter((s): s is NonNullable<typeof s> => !!s);

  /** The prototype lets the cart be shared as plain text. */
  const sharePrices = async () => {
    const date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const lines = [
      `GoodMiles · ${car ? `${car.brand} ${car.model}, ${car.fuel}` : 'my car'}`,
      ...bill.items.map(
        i => `${i.service.name} ${i.total === null ? 'price after inspection' : inr(i.total)}`,
      ),
      'Pickup and drop ₹0',
      `Total ${inr(bill.total)}`,
      `Quoted ${date}. Prices include GST.`,
    ];
    if (!(await share(lines.join('\n')))) toast('Sharing isn\u2019t available here.');
  };

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

  if (!cart.length) {
    return (
      <Screen header={<ScreenHeader title="Your cart" onBack={navigation.goBack} />}>
        <View style={styles.empty}>
          <Text variant="h3">Your cart is empty</Text>
          <Text variant="body" tone="muted" style={styles.emptyNote}>
            Add a service to see your bill.
          </Text>
          <Button
            label="Browse services"
            size="sm"
            onPress={() => navigation.navigate('Main')}
          />
        </View>
      </Screen>
    );
  }

  return (
    <>
    <Screen
      header={
        <ScreenHeader
          title="Your cart"
          subtitle={
            car
              ? `${car.brand} ${car.model} · ${car.fuel} · ${car.year}`
              : 'Add your car to see prices'
          }
          onBack={navigation.goBack}
        />
      }
      footer={
        // priceFor returns null without a car, and buildBill sums those
        // as zero - printing the total here read as "free" rather than
        // "we cannot price this yet".
        <Footer
          total={car ? { label: 'Total', value: inr(bill.total) } : undefined}
        >
          <Button
            label={!car ? 'Add your car' : loggedIn ? 'Choose pickup' : 'Log in to book'}
            style={styles.grow}
            onPress={() => {
              if (!car) return navigation.navigate('Brand');
              // The prototype logs in over the cart rather than
              // sending the customer away and losing it.
              if (!loggedIn) return loginSheet.current?.present();
              navigation.navigate('Slot');
            }}
          />
        </Footer>
      }
    >
      <Card>
        {bill.items.map(({ service, unit }, i) => (
          <View key={service.id}>
            {i > 0 ? <Divider /> : null}
            <View style={styles.item}>
              <View style={[styles.thumb, { backgroundColor: c.bay }]}>
                <Icon name="wrench" size={22} color={c.muted} />
              </View>
              <View style={styles.grow}>
                <Text variant="bodyStrong">{service.name}</Text>
                <Text variant="small" tone="muted">
                  {service.hrs}
                </Text>
                {unit !== null ? (
                  <View style={styles.itemPrice}>
                    <Text variant="bodyStrong">{inr(unit)}</Text>
                    <Text variant="small" tone="muted" style={styles.was}>
                      {inr(mrp(unit))}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${service.name}`}
                onPress={() => toggleCart(service.id)}
                hitSlop={8}
              >
                <Icon name="close" size={18} color={c.muted} />
              </Pressable>
            </View>
          </View>
        ))}
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Main')}>
          <Text variant="smallStrong" style={styles.addMore}>
            + Add more services
          </Text>
        </Pressable>
      </Card>

      {suggestions.length ? (
        <View>
          <Text variant="h3" style={styles.suggestTitle}>
            Often added together
          </Text>
          <Rail>
            {suggestions.map(service => (
              <MiniCard
                key={service.id}
                service={service}
                car={car}
                added={cart.includes(service.id)}
                onAdd={() => toggleCart(service.id)}
                onPress={() =>
                  navigation.navigate('ServiceDetail', { serviceId: service.id })
                }
              />
            ))}
          </Rail>
        </View>
      ) : null}

      {!member ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => applyCoupon(!coupon)}
          style={[styles.coupon, { backgroundColor: c.card }]}
        >
          <Icon name="gift" size={20} color={c.ink} />
          <View style={styles.grow}>
            <Text variant="bodyStrong">
              {coupon ? 'FIRST200 applied' : 'Apply coupon'}
            </Text>
            {coupon ? (
              <Text variant="small" style={{ color: c.ok }}>
                {inr(bill.couponOff)} off
              </Text>
            ) : null}
          </View>
          <Text variant="smallStrong" style={styles.link}>
            {coupon ? 'Remove' : 'FIRST200'}
          </Text>
        </Pressable>
      ) : null}

      {car ? (
        <Card>
          <Text variant="h3">Bill</Text>
          <Row label="Services" value={inr(bill.sub)} />
          {bill.memberFee ? (
            <>
              <Row label="GoodMiles Member, 1 year" value={inr(bill.memberFee)} />
              <Row
                label="Member discount (10%)"
                value={`−${inr(bill.memberOff)}`}
                tone="ok"
              />
            </>
          ) : null}
          {bill.couponOff ? (
            <Row
              label="Coupon FIRST200"
              value={`−${inr(bill.couponOff)}`}
              tone="ok"
            />
          ) : null}
          {bill.coinsUse ? (
            <Row label="Coins" value={`−${inr(bill.coinsUse)}`} tone="ok" />
          ) : null}
          {bill.express ? <Row label="Express pickup" value={inr(bill.express)} /> : null}
          <Row label="Pickup and drop" value="₹0" />
          <Divider />
          <View style={styles.totalRow}>
            <Text variant="h3">Estimated total</Text>
            <Text variant="h2" style={styles.total}>
              {inr(bill.total)}
            </Text>
          </View>
          <Text variant="small" tone="muted">
            You pay &#8377;0 now. Prices include GST, and nothing extra is done
            without your OK.
          </Text>
          <Pressable accessibilityRole="button" onPress={sharePrices}>
            <Text variant="smallStrong" style={styles.addMore}>
              Share these prices
            </Text>
          </Pressable>
        </Card>
      ) : null}

      <Card>
        <Text variant="bodyStrong">The GoodMiles promise</Text>
        {PROMISES.map(([icon, label]) => (
          <View key={label} style={styles.promise}>
            <Icon name={icon as never} size={16} color={c.ink} />
            <Text variant="small">{label}</Text>
          </View>
        ))}
      </Card>
    </Screen>

    <LoginSheet
      ref={loginSheet}
      onClose={() => loginSheet.current?.dismiss()}
      onLoggedIn={() => {
        loginSheet.current?.dismiss();
        navigation.navigate('Slot');
      }}
    />
    </>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'ok';
}) {
  const { c } = useTheme();
  return (
    <View style={styles.row}>
      <Text variant="body" style={tone ? { color: c.ok } : undefined}>
        {label}
      </Text>
      <Text variant="bodyStrong" style={tone ? { color: c.ok } : undefined}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  empty: { alignItems: 'center', gap: 8, paddingVertical: 34 },
  emptyNote: { textAlign: 'center' },
  item: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 10 },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemPrice: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 2 },
  was: { textDecorationLine: 'line-through' },
  addMore: { textDecorationLine: 'underline' },
  suggestTitle: { marginBottom: 12 },
  coupon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radius.lg,
  },
  link: { textDecorationLine: 'underline' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  total: { fontSize: 20 },
  promise: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
