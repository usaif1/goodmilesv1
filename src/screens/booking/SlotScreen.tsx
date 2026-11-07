import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Button, Footer, Screen, ScreenHeader, Text } from '@/components';
import { GARAGE } from '@/data';
import { WINDOWS, pickupDays, windowText } from '@/domain';
import { useApp } from '@/store';
import { Icon, layout, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

/**
 * Today's earlier windows are gone by the time anyone books, and the
 * prototype shows one midday slot full on later days so the grid never
 * looks suspiciously empty.
 */
const fullWindows = (dayIndex: number) =>
  dayIndex === 0 ? WINDOWS.slice(0, 3) : ['12:30 – 2:30'];

export function SlotScreen({ navigation }: RootScreenProps<'Slot'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const slot = useApp(s => s.slot);
  const setSlot = useApp(s => s.setSlot);
  const address = useApp(s => s.address);
  const dropSelf = useApp(s => s.dropSelf);
  const setDropSelf = useApp(s => s.setDropSelf);

  const days = useMemo(() => pickupDays(), []);
  const full = fullWindows(slot.day);

  return (
    <Screen
      scroll={false}
      header={
        <ScreenHeader
          title="Pickup"
          subtitle={car ? `${car.brand} ${car.model}` : ''}
          onBack={navigation.goBack}
        />
      }
      footer={
        <Footer total={{ label: 'Pay now', value: '₹0' }}>
          <Button
            label="Confirm booking"
            style={styles.grow}
            onPress={() => navigation.navigate('Review')}
          />
        </Footer>
      }
    >
      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.modes, { backgroundColor: c.card, borderColor: c.line }]}>
          <Mode
            on={!dropSelf}
            title="We pick up from your home"
            detail="Free within the pickup area"
            onPress={() => setDropSelf(false)}
          />
          <View style={[styles.rule, { backgroundColor: c.line }]} />
          <Mode
            on={dropSelf}
            title="I&rsquo;ll drop the car myself"
            detail={`GoodMiles garage, ${GARAGE.area}`}
            onPress={() => setDropSelf(true)}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => (dropSelf ? undefined : navigation.navigate('Address'))}
          style={[styles.addressRow, { backgroundColor: c.card, borderColor: c.line }]}
        >
          <View style={styles.grow}>
            <Text variant="bodyStrong">
              {dropSelf ? 'Garage address' : 'Pickup address'}
            </Text>
            <Text variant="body" tone="muted">
              {dropSelf
                ? GARAGE.full
                : address
                  ? `${address.label} · ${address.short}`
                  : 'Add your address'}
            </Text>
          </View>
          {dropSelf ? null : <Icon name="chev" size={18} color={c.ink} />}
        </Pressable>

        <View>
          <Text variant="h3" style={styles.sectionTitle}>
            {dropSelf ? 'When will you drop it?' : 'When should we pick up?'}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dayRow}
          >
            {days.map((d, i) => {
              const on = slot.day === i;
              return (
                <Pressable
                  key={d.full}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  onPress={() => setSlot({ day: i })}
                  style={[
                    styles.day,
                    {
                      backgroundColor: on ? c.sel : c.card,
                      borderColor: on ? c.sel : c.line,
                    },
                  ]}
                >
                  <Text variant="meta" style={{ color: on ? '#c2cbdb' : c.muted }}>
                    {d.top}
                  </Text>
                  <Text variant="h3" style={{ color: on ? '#ffffff' : c.ink }}>
                    {d.date.split(' ')[0]}
                  </Text>
                  <Text variant="meta" style={{ color: on ? '#c2cbdb' : c.muted }}>
                    {d.date.split(' ')[1]}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.slotGrid}>
            {WINDOWS.map(w => {
              const isFull = full.includes(w);
              const on = slot.win === w && !isFull;
              return (
                <Pressable
                  key={w}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on, disabled: isFull }}
                  disabled={isFull}
                  onPress={() => setSlot({ win: w })}
                  style={[
                    styles.slot,
                    {
                      backgroundColor: isFull ? c.bay : on ? c.sel : c.card,
                      borderColor: isFull ? 'transparent' : on ? c.sel : c.line,
                    },
                  ]}
                >
                  <Text
                    variant="body"
                    style={{ color: isFull ? c.disChip : on ? '#ffffff' : c.ink }}
                  >
                    {windowText(w)}
                  </Text>
                  {isFull ? (
                    <Text variant="meta" tone="muted">
                      Full
                    </Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>

          <Text variant="small" tone="muted" style={styles.note}>
            Your car comes back by about 7 PM the same day. Amit confirms the
            exact time.
          </Text>
        </View>

        <Text variant="small" style={{ color: c.ink2 }}>
          Any damage in our care, we repair it at our cost, decided within 48
          hours. Free cancellation until the inspection starts.
        </Text>
      </ScrollView>
    </Screen>
  );
}

function Mode({
  on,
  title,
  detail,
  onPress,
}: {
  on: boolean;
  title: string;
  detail: string;
  onPress: () => void;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: on }}
      onPress={onPress}
      style={styles.mode}
    >
      <View style={[styles.radio, { borderColor: c.ink }]}>
        {on ? <View style={[styles.dot, { backgroundColor: c.ink }]} /> : null}
      </View>
      <View style={styles.grow}>
        <Text variant="h3">{title}</Text>
        <Text variant="body" tone="muted">
          {detail}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  body: { padding: 16, paddingBottom: 32, gap: 24 },
  modes: { borderRadius: radius.lg, borderWidth: layout.hairline, overflow: 'hidden' },
  rule: { height: layout.hairline },
  mode: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 16 },
  radio: {
    width: 22,
    height: 22,
    marginTop: 2,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
  },
  sectionTitle: { marginBottom: 12 },
  dayRow: { gap: 8, paddingBottom: 4 },
  day: {
    width: 64,
    alignItems: 'center',
    gap: 1,
    paddingVertical: 9,
    borderRadius: radius.lg,
    borderWidth: layout.chipBorder,
  },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  slot: {
    width: '48.5%',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: radius.lg,
    borderWidth: layout.chipBorder,
  },
  note: { marginTop: 12 },
});
