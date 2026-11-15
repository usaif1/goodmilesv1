import { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
  Button,
  Card,
  Divider,
  Footer,
  NoteSheet,
  Screen,
  Text,
} from '@/components';
import { inr, pickupDays, windowText } from '@/domain';
import { GARAGE } from '@/data';
import { useApp } from '@/store';
import { Icon, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

export function ConfirmedScreen({ navigation }: RootScreenProps<'Confirmed'>) {
  const { c } = useTheme();
  const order = useApp(s => s.order);
  const car = useApp(s => s.car);
  const address = useApp(s => s.address);
  const note = useApp(s => s.note);
  const setNote = useApp(s => s.setNote);
  const noteSheet = useRef<BottomSheetModal>(null);

  if (!order) {
    return (
      <Screen>
        <Text tone="muted">No booking yet.</Text>
      </Screen>
    );
  }

  const day = pickupDays()[order.slot.day];
  const when = `${day.top.toLowerCase()}, ${day.date} · ${windowText(order.slot.win)}`;

  return (
    <>
    <Screen
      footer={
        <Footer>
          <Button
            label="Track booking"
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })}
          />
          <Button label="Message Amit" variant="ghost" />
        </Footer>
      }
    >
      <View>
        <View style={[styles.tick, { backgroundColor: c.sel }]}>
          <Icon name="check" size={16} strokeWidth={3} color="#ffffff" />
        </View>
        <Text variant="h2" style={styles.booked}>
          Booked
        </Text>
        <Text variant="body" tone="muted">
          {order.self ? 'Drop your car' : 'Pickup'} {when}
        </Text>
      </View>

      <Card>
        <View style={styles.amit}>
          <View style={[styles.avatar, { backgroundColor: c.bay }]}>
            <Icon name="user" size={26} color={c.muted} />
          </View>
          <View style={styles.grow}>
            <Text variant="h3">Amit Sharma</Text>
            <Text variant="small" tone="muted">
              Your Guardian for this car · 9 years with cars
            </Text>
            <Text variant="small" style={[styles.amitNote, { color: c.ink2 }]}>
              He looks after your car from {order.self ? 'drop-off' : 'pickup'} to
              delivery.
            </Text>
          </View>
        </View>
      </Card>

      {note ? (
        <Card>
          <Text variant="bodyStrong">Amit has your note</Text>
          {note.seconds ? (
            <Text variant="small" tone="muted">
              Voice note · 0:{String(note.seconds).padStart(2, '0')}
            </Text>
          ) : null}
          {note.text ? (
            <Text variant="small" tone="muted">
              &ldquo;{note.text}&rdquo;
            </Text>
          ) : null}
          <Text variant="small" tone="muted">
            He replies on WhatsApp before {order.self ? 'you drop the car' : 'pickup'}.
          </Text>
        </Card>
      ) : (
        <Pressable
          accessibilityRole="button"
          onPress={() => noteSheet.current?.present()}
        >
          <Card>
            <View style={styles.noteRow}>
              <View style={[styles.mic, { backgroundColor: c.sel }]}>
                <Icon name="mic" size={16} color="#ffffff" />
              </View>
              <View style={styles.grow}>
                <Text variant="bodyStrong">
                  Anything wrong with your {car ? car.model : 'car'}?
                </Text>
                <Text variant="small" tone="muted">
                  Tell Amit before {order.self ? 'drop-off' : 'pickup'}
                </Text>
              </View>
              <Icon name="chev" size={16} color={c.ink} />
            </View>
          </Card>
        </Pressable>
      )}

      <Card>
        {order.items.map(([name, amount]) => (
          <View key={name} style={styles.row}>
            <Text variant="body" style={styles.grow}>
              {name}
            </Text>
            <Text variant="bodyStrong">
              {amount === null ? '—' : amount === 0 ? 'Free' : inr(amount)}
            </Text>
          </View>
        ))}
        <View style={styles.row}>
          <Text variant="body" style={styles.grow}>
            {order.self ? 'Drop at' : 'Pickup from'}
          </Text>
          <Text variant="bodyStrong" style={styles.right}>
            {order.self
              ? GARAGE.full
              : address
                ? address.short
                : 'Your address'}
          </Text>
        </View>
        <Divider />
        <View style={styles.row}>
          <Text variant="body" style={styles.grow}>
            Paid now
          </Text>
          <Text variant="bodyStrong">₹0</Text>
        </View>
        <View style={styles.row}>
          <Text variant="body" style={styles.grow}>
            Order
          </Text>
          <Text variant="bodyStrong">{order.id}</Text>
        </View>
        <Text variant="small" tone="muted">
          You pay after you approve the work.
        </Text>
      </Card>

      {car ? (
        <Text variant="small" tone="muted">
          {car.brand} {car.model} · {car.fuel} · {car.year}
        </Text>
      ) : null}
    </Screen>

    <NoteSheet
      ref={noteSheet}
      onClose={() => noteSheet.current?.dismiss()}
      onSend={n => {
        setNote(n.text || n.seconds ? n : null);
        noteSheet.current?.dismiss();
      }}
    />
    </>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  tick: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  booked: { marginTop: 10, marginBottom: 2 },
  amit: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amitNote: { marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  mic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: { textAlign: 'right' },
});
