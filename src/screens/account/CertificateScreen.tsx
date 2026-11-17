import { StyleSheet, View } from 'react-native';

import { Button, Card, Footer, Screen, ScreenHeader, Text } from '@/components';
import { ODOMETER } from '@/data';
import { pickupDays } from '@/domain';
import { useApp } from '@/store';
import { Icon, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const WARRANTIES: [string, string][] = [
  ['Front brake pads', '3 months'],
  ['Engine oil and filter', '1,000 km'],
  ['Labour', '1 month'],
];

export function CertificateScreen({
  navigation,
}: RootScreenProps<'Certificate'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const order = useApp(s => s.order);
  const approvedSel = useApp(s => s.approvedSel);

  const day = pickupDays()[order?.slot.day ?? 0];
  const selection = approvedSel ?? { m1: true, m2: true };
  const covered = WARRANTIES.filter(
    ([name]) => name !== 'Front brake pads' || selection.m2,
  );

  return (
    <Screen
      header={
        <ScreenHeader title="Service certificate" onBack={navigation.goBack} />
      }
      footer={
        <Footer>
          <Button
            label="See the certified PDF"
            onPress={() => navigation.navigate('CertifiedPdf')}
          />
        </Footer>
      }
    >
      {/* The one dark card in the app, as the prototype has it. */}
      <View style={[styles.cert, { backgroundColor: c.navy }]}>
        <View style={styles.head}>
          <View style={[styles.badge, { backgroundColor: c.navy2 }]}>
            <Icon name="wrench" size={22} color="#ffffff" />
          </View>
          <View style={styles.grow}>
            <Text variant="smallStrong" style={{ color: c.orangeDeep }}>
              GoodMiles service record
            </Text>
            <Text variant="h2" tone="onDark">
              {car ? `${car.brand} ${car.model}` : 'Hyundai Creta'}
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          <Field label="Date" value={day.full} />
          <Field label="Odometer" value={ODOMETER.delivery} />
          <Field label="Order" value={order?.id ?? 'GM-24817'} />
          <Field label="Guardian" value="Amit Sharma" />
        </View>
      </View>

      <Card>
        <Text variant="h3">Warranty card</Text>
        {covered.map(([name, term]) => (
          <View key={name} style={styles.row}>
            <Text variant="body" style={styles.grow}>
              {name}
            </Text>
            <Text variant="bodyStrong">{term}</Text>
          </View>
        ))}
        <Text variant="small" tone="muted">
          Tap &ldquo;Something not right?&rdquo; in Account and we pick the car
          up free to check.
        </Text>
      </Card>
    </Screen>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text variant="small" style={styles.fieldLabel}>
        {label}
      </Text>
      <Text variant="bodyStrong" tone="onDark">
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  cert: { gap: 16, padding: 16, borderRadius: radius.lg },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 12, columnGap: 10 },
  field: { width: '47%' },
  fieldLabel: { color: '#c2cbdb' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
