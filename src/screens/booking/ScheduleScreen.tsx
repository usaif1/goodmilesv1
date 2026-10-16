import { useNavigation } from '@react-navigation/native';
import MapPin from 'lucide-react-native/icons/map-pin';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Card,
  Pill,
  PillGroup,
  RUPEE,
  ScreenHeader,
  StickyFooter,
} from '@/components';
import { DATES, SLOTS } from '@/mocks';
import type { RootNav } from '@/navigation';
import { formatAmount, useCart, useCartTotals } from '@/store';
import { color, layout, space, type } from '@/theme';

const ADDRESS = 'Flat 12B, Green Park Extension, New Delhi 110016';

/** C09. */
export default function ScheduleScreen() {
  const navigation = useNavigation<RootNav>();
  const mode = useCart(s => s.mode);
  const setMode = useCart(s => s.setMode);
  const dateId = useCart(s => s.dateId);
  const setDate = useCart(s => s.setDate);
  const slotId = useCart(s => s.slotId);
  const setSlot = useCart(s => s.setSlot);
  const totals = useCartTotals();

  return (
    <View style={s.root}>
      <ScreenHeader title="Schedule" subtitle="Choose how and when" />

      <ScrollView contentContainerStyle={s.body}>
        <Card>
          <PillGroup fill>
            <Pill
              label="Free Pickup"
              fill
              selected={mode === 'pickup'}
              onPress={() => setMode('pickup')}
            />
            <Pill
              label="Walk-in"
              fill
              selected={mode === 'walkin'}
              onPress={() => setMode('walkin')}
            />
          </PillGroup>
        </Card>

        <Card>
          <Text style={s.cardTitle}>Date</Text>
          <View style={s.group}>
            <PillGroup>
              {DATES.map(d => (
                <Pill
                  key={d.id}
                  label={`${d.day}\n${d.date}`}
                  selected={dateId === d.id}
                  onPress={() => setDate(d.id)}
                />
              ))}
            </PillGroup>
          </View>
        </Card>

        <Card>
          <Text style={s.cardTitle}>Time slot</Text>
          <View style={s.group}>
            <PillGroup>
              {SLOTS.map(slot => (
                <Pill
                  key={slot.id}
                  label={
                    slot.discount > 0
                      ? `${slot.label} · Rs ${slot.discount} off`
                      : slot.label
                  }
                  selected={slotId === slot.id}
                  onPress={() => setSlot(slot.id)}
                />
              ))}
            </PillGroup>
          </View>
        </Card>

        {mode === 'pickup' && (
          <Card>
            <View style={s.addressRow}>
              <View style={s.addressText}>
                <View style={s.addressHead}>
                  <MapPin size={16} color={color.error} />
                  <Text style={s.cardTitle}>Pickup address</Text>
                </View>
                <Text style={s.address}>{ADDRESS}</Text>
              </View>
              <Button label="Change" variant="ghost" size="sm" />
            </View>
          </Card>
        )}
      </ScrollView>

      <StickyFooter>
        <Button
          label={`Confirm Booking · ${RUPEE}${formatAmount(totals.toPay)}`}
          block
          onPress={() =>
            /**
             * Reset rather than push: once the booking exists, Back must
             * not return to the slot picker and let it be submitted
             * again. MainTabs stays underneath so Back lands on Home.
             */
            navigation.reset({
              index: 1,
              routes: [
                { name: 'MainTabs' },
                {
                  name: 'BookingConfirmed',
                  params: { orderId: 'XYZ-100245' },
                },
              ],
            })
          }
        />
        <Text style={s.footnote}>
          Pay after service, or pay Rs 100 now to reserve your slot
        </Text>
      </StickyFooter>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  body: {
    padding: layout.screenPadding,
    gap: layout.cardGap,
    paddingBottom: space.xxxl,
  },
  cardTitle: type.h2,
  group: { marginTop: space.md },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  addressText: { flex: 1 },
  addressHead: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  address: { ...type.meta, marginTop: space.xs },
  footnote: { ...type.meta, textAlign: 'center' },
});
