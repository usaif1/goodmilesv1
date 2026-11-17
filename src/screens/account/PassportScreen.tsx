import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Card, Footer, Screen, ScreenHeader, Text } from '@/components';
import { ODOMETER } from '@/data';
import { useApp } from '@/store';
import { Icon, layout, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const RECORDED_FROM = 8;

/** [part, condition 0-1, what was measured] */
type Health = [string, number, string];

export function PassportScreen({ navigation }: RootScreenProps<'Passport'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const reg = useApp(s => s.reg);
  const order = useApp(s => s.order);
  const stage = useApp(s => s.stage);
  const approvedSel = useApp(s => s.approvedSel);

  const real = !!order && stage >= RECORDED_FROM;
  const shown = car ?? { brand: 'Hyundai', model: 'Creta', year: '2020–2022' };
  const padsDone = !real || !!approvedSel?.m2;

  const health: Health[] = [
    [
      'Brake pads, front',
      padsDone ? 1 : 0.15,
      padsDone ? 'New · 10 mm' : '2 mm · replace soon',
    ],
    ['Engine oil', 1, `Changed at ${ODOMETER.delivery}`],
    ['Battery', 0.8, 'Good · 12.6 V'],
    ['Tyres', 0.65, 'Good · 6 mm tread'],
    [
      'AC cooling',
      approvedSel?.i1 ? 1 : 0.55,
      approvedSel?.i1 ? 'Coil cleaned · vent 8°C' : 'Vent 15°C · coil dirty',
    ],
  ];

  const history: [string, string, string, string][] = real
    ? [
        [
          '9 Nov 2026',
          ODOMETER.delivery,
          'Standard service, front brake pads',
          `${order.id}-01…03 · Amit Sharma`,
        ],
      ]
    : [
        [
          '29 Oct 2026',
          '42,328 km',
          'Standard service, front brake pads',
          'GM-24817-01…03 · Amit Sharma',
        ],
        ['24 Apr 2026', '32,104 km', 'Standard service', 'GM-19022-01…02 · Amit Sharma'],
        [
          '18 Oct 2025',
          '21,960 km',
          'Standard service, AC gas top-up',
          'GM-11410-01…02 · Ravi Kumar',
        ],
      ];

  return (
    <Screen
      header={
        <ScreenHeader
          title="Health passport"
          subtitle={reg ? `${shown.model} · ${reg}` : shown.model}
          onBack={navigation.goBack}
        />
      }
      footer={
        <Footer>
          <Button
            label="See the certified PDF"
            variant="ghost"
            onPress={() => navigation.navigate('CertifiedPdf')}
          />
        </Footer>
      }
    >
      {!real ? (
        <View style={[styles.sample, { borderColor: c.ctlLine }]}>
          <Text variant="body" style={{ color: c.ink2 }}>
            <Text variant="bodyStrong">Sample </Text>
            This is how your car&rsquo;s passport will look. Yours starts with
            your first GoodMiles service.
          </Text>
        </View>
      ) : null}

      <Card selected>
        <View style={styles.row}>
          <View style={styles.grow}>
            <Text variant="label">GoodMiles certified record</Text>
            <Text variant="h3">
              {shown.brand} {shown.model}
            </Text>
          </View>
          <View style={[styles.seal, { backgroundColor: c.sel }]}>
            <Icon name="shield" size={20} color="#ffffff" />
          </View>
        </View>
        <Line label="Last service" value={`${history[0][0]} · ${history[0][1]}`} />
        <Line label="Next service due" value="Apr 2027 or 52,300 km" />
        <Button
          label={real ? 'Book the next service' : 'Book your first service'}
          variant="ghost"
          onPress={() => navigation.navigate('Main')}
        />
      </Card>

      <Card>
        <View style={styles.row}>
          <Text variant="h3" style={styles.grow}>
            Parts health
          </Text>
          <Text variant="small" tone="muted">
            Measured {real ? 'at your last service' : 'on 29 Oct'}
          </Text>
        </View>
        {health.map(([name, value, detail]) => (
          <View key={name} style={styles.health}>
            <View style={styles.row}>
              <Text variant="small" style={styles.grow}>
                {name}
              </Text>
              <Text variant="smallStrong">{detail}</Text>
            </View>
            <View style={[styles.bar, { backgroundColor: c.line2 }]}>
              <View
                style={[
                  styles.fill,
                  { width: `${Math.round(value * 100)}%`, backgroundColor: c.sel },
                ]}
              />
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <View style={styles.row}>
          <Text variant="h3" style={styles.grow}>
            Services
          </Text>
          <Text variant="small" tone="muted">
            {history.length} with GoodMiles
          </Text>
        </View>
        {history.map(([date, km, work, by], i) => (
          <Fragment key={date}>
            <View
              style={[
                styles.entry,
                i > 0 && { borderTopWidth: layout.hairline, borderTopColor: c.line },
              ]}
            >
              <View style={styles.grow}>
                <Text variant="smallStrong">
                  {date} · {km}
                </Text>
                <Text variant="small" style={{ color: c.ink2 }}>
                  {work}
                </Text>
                <Text variant="small" tone="muted">
                  {by}
                </Text>
              </View>
              <Icon name="chev" size={14} color={c.ink} />
            </View>
          </Fragment>
        ))}
      </Card>

      <Text variant="small" tone="muted">
        Every entry has its photos, part numbers and the Guardian&rsquo;s name,
        so anyone you share it with can check it.
      </Text>
    </Screen>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text variant="small" tone="muted" style={styles.grow}>
        {label}
      </Text>
      <Text variant="smallStrong">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  sample: {
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: layout.chipBorder,
    borderStyle: 'dashed',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  seal: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  health: { gap: 6 },
  bar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
  entry: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
});
