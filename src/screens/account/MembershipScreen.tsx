import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Chip,
  Divider,
  Footer,
  Screen,
  ScreenHeader,
  Text,
} from '@/components';
import { serviceById } from '@/data';
import { inr, priceFor } from '@/domain';
import { useApp } from '@/store';
import { Icon, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const FEE = 1000;
const WASH_VALUE = 699;
const DISCOUNT = 0.1;

const BENEFITS = [
  'Free car wash with every service',
  'Priority pickup slots',
  '10% off every service',
  'Choose your Guardian',
  'Priority support',
  'Extra coins and member-only offers',
];

export function MembershipScreen({ navigation }: RootScreenProps<'Membership'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const member = useApp(s => s.member);
  const setMember = useApp(s => s.setMember);

  const [count, setCount] = useState(2);

  const standard = serviceById('standard');
  const servicePrice = (standard && priceFor(standard, car)) || 4299;
  const discount = Math.round(servicePrice * count * DISCOUNT);
  const washes = WASH_VALUE * count;
  const net = discount + washes - FEE;

  return (
    <Screen
      header={<ScreenHeader title="GoodMiles membership" onBack={navigation.goBack} />}
      footer={
        <Footer>
          <Button
            label={member ? 'Added to your cart' : 'Add membership to my next booking'}
            disabled={member}
            onPress={() => setMember(true)}
          />
        </Footer>
      }
    >
      <Card>
        <Text variant="small" tone="muted">
          For your {car ? car.model : 'car'} · 1 year
        </Text>
        <Text variant="h1">{inr(FEE)}</Text>
      </Card>

      <Card>
        <Text variant="h3">How much would you save?</Text>
        <Text variant="small" tone="muted">
          Services in a year
        </Text>
        <View style={styles.chips}>
          {[1, 2, 3].map(n => (
            <Chip
              key={n}
              label={String(n)}
              selected={count === n}
              onPress={() => setCount(n)}
            />
          ))}
        </View>
        <Row
          label={`10% off ${count} standard service${count > 1 ? 's' : ''}`}
          value={inr(discount)}
        />
        <Row label={`${count} free wash${count > 1 ? 'es' : ''}`} value={inr(washes)} />
        <Row label="Membership" value={`−${inr(FEE)}`} />
        <Divider />
        <View style={styles.totalRow}>
          <Text variant="h3">You save</Text>
          <Text variant="h2" style={{ color: c.ok }}>
            {inr(net)}
            <Text variant="small" tone="muted">
              {' '}
              a year
            </Text>
          </Text>
        </View>
      </Card>

      <Card>
        {BENEFITS.map(b => (
          <View key={b} style={styles.benefit}>
            <Icon name="check" size={16} strokeWidth={2.4} color={c.ink} />
            <Text variant="body" style={styles.grow}>
              {b}
            </Text>
          </View>
        ))}
      </Card>

      <Text variant="small" tone="muted">
        One car per membership. Coupons can&rsquo;t be used with the member
        discount.
      </Text>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text variant="body" style={styles.grow}>
        {label}
      </Text>
      <Text variant="bodyStrong">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  chips: { flexDirection: 'row', gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  benefit: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
});
