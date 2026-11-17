import { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
  Button,
  Card,
  RegSaveSheet,
  Screen,
  ScreenHeader,
  Text,
  useToast,
} from '@/components';
import { useApp } from '@/store';
import { Icon, layout, radius, useTheme } from '@/theme';

import type { TabScreenProps } from '@/navigation/types';

/** The passport only becomes real once a service has been paid for. */
const RECORDED_FROM = 8;

export function GarageScreen({ navigation }: TabScreenProps<'GarageTab'>) {
  const { c } = useTheme();
  const loggedIn = useApp(s => s.loggedIn);
  const car = useApp(s => s.car);
  const reg = useApp(s => s.reg);
  const stage = useApp(s => s.stage);
  const order = useApp(s => s.order);
  const setReg = useApp(s => s.setReg);
  const { toast } = useToast();
  const regSheet = useRef<BottomSheetModal>(null);

  const serviced = !!order && stage >= RECORDED_FROM;

  if (!loggedIn) {
    return (
      <Screen header={<ScreenHeader root title="My Garage" />}>
        <View style={[styles.hero, { backgroundColor: c.bay }]}>
          <Icon name="garage" size={40} color={c.muted} />
        </View>
        <Text variant="h2">Your car&rsquo;s health passport.</Text>
        <Text variant="small" tone="muted">
          Every service, part and photo, in one certified record.
        </Text>
        {[
          'Next service, PUC and insurance reminders',
          'Parts health, measured at every service',
          'A certified PDF to share when you sell',
        ].map(t => (
          <View key={t} style={styles.bullet}>
            <Icon name="check" size={16} strokeWidth={2.4} color={c.ink} />
            <Text variant="small" style={styles.grow}>
              {t}
            </Text>
          </View>
        ))}
        <Button
          label="Log in to open My Garage"
          onPress={() => navigation.navigate('Welcome')}
        />
      </Screen>
    );
  }

  const due: [string, string][] = [
    serviced
      ? ['Next service', 'Apr 2027 or 52,300 km']
      : ['First GoodMiles service', 'Any time'],
    ...(reg
      ? ([
          ['PUC renewal', '2 Nov · 13 days left'],
          ['Insurance renewal', '14 Mar 2027'],
        ] as [string, string][])
      : []),
  ];

  return (
    <>
    <Screen
      header={<ScreenHeader root title="My Garage" subtitle={reg ?? undefined} />}
    >
      <Card>
        <View style={styles.carRow}>
          <View style={[styles.thumb, { backgroundColor: c.bay }]}>
            <Icon name="car" size={24} color={c.muted} />
          </View>
          <View style={styles.grow}>
            <Text variant="bodyStrong">
              {car ? `${car.brand} ${car.model}` : 'Add your car'}
            </Text>
            {car ? (
              <Text variant="small" tone="muted">
                {[car.fuel, car.trans, car.year].filter(Boolean).join(' · ')}
              </Text>
            ) : null}
          </View>
        </View>
      </Card>

      <Card>
        <Text variant="h3">Coming up</Text>
        {due.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text variant="body" style={styles.grow}>
              {label}
            </Text>
            <Text variant="bodyStrong">{value}</Text>
          </View>
        ))}
        {reg ? (
          <Text variant="small" tone="muted">
            We remind you on WhatsApp a week before each one.
          </Text>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={() => regSheet.current?.present()}
            style={[styles.addReg, { borderColor: c.ctlLine }]}
          >
            <Icon name="plus" size={16} color={c.ink} />
            <Text variant="small" style={styles.grow}>
              Add your car number to track PUC and insurance
            </Text>
          </Pressable>
        )}
        <Button
          label={serviced ? 'Book the next service' : 'Book your first service'}
          onPress={() => navigation.navigate('HomeTab')}
        />
      </Card>

      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('Passport')}
      >
        <Card selected>
          <View style={styles.row}>
            <View style={styles.grow}>
              <Text variant="label">GoodMiles certified record</Text>
              <View style={styles.titleRow}>
                <Text variant="h3">Health passport</Text>
                {!serviced ? (
                  <View style={[styles.sampleTag, { borderColor: c.ctlLine }]}>
                    <Text variant="meta" tone="muted">
                      Sample
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={[styles.seal, { backgroundColor: c.sel }]}>
              <Icon name="shield" size={20} color="#ffffff" />
            </View>
          </View>
          <Text variant="small" style={{ color: c.ink2 }}>
            {serviced
              ? '1 service · all parts good'
              : 'Every service, part and photo, in one record. See how it looks.'}
          </Text>
        </Card>
      </Pressable>
    </Screen>

    <RegSaveSheet
      ref={regSheet}
      initial={reg}
      onClose={() => regSheet.current?.dismiss()}
      onSave={next => {
        setReg(next);
        regSheet.current?.dismiss();
        toast('Saved. We’ll remind you before PUC and insurance are due.');
      }}
    />
    </>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  hero: {
    height: 170,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bullet: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  carRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumb: {
    width: 56,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sampleTag: {
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: radius.pill,
    borderWidth: layout.chipBorder,
    borderStyle: 'dashed',
  },
  seal: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addReg: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: layout.chipBorder,
    borderStyle: 'dashed',
  },
});
