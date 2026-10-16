import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import Check from 'lucide-react-native/icons/check';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  KeyValueRow,
  RUPEE,
  StatusBand,
  StickyFooter,
} from '@/components';
import { DATES, SLOTS } from '@/mocks';
import type { RootNav, RootStackParamList } from '@/navigation';
import {
  formatAmount,
  useCart,
  useCartLines,
  useCartTotals,
  useLocation,
  useVehicle,
  vehicleShort,
  cityName,
} from '@/store';
import { color, layout, radius, space, type } from '@/theme';

/**
 * C10.
 *
 * Like C01, this screen has no header - the mockup puts the status
 * band straight onto the page background.
 */
export default function BookingConfirmedScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'BookingConfirmed'>>();
  const vehicle = useVehicle(s => s.vehicle);
  const cityId = useLocation(s => s.cityId);
  const lines = useCartLines();
  const totals = useCartTotals();
  const dateId = useCart(s => s.dateId);
  const slotId = useCart(s => s.slotId);

  const date = DATES.find(d => d.id === dateId);
  const slot = SLOTS.find(sl => sl.id === slotId);
  const pickup = [date && `${date.day} ${date.date}`, slot?.label]
    .filter(Boolean)
    .join(' · ');

  return (
    <View style={s.root}>
      <StatusBand />
      <ScrollView contentContainerStyle={s.body}>
        <View style={s.hero}>
          <View style={s.check}>
            <Check size={44} color={color.textOnBrand} strokeWidth={3} />
          </View>
          <Text style={s.title}>Booking confirmed</Text>
          <Text style={s.orderId}>Order #{route.params.orderId}</Text>
        </View>

        <Card>
          <View style={s.rows}>
            <KeyValueRow
              label="Car"
              value={`${vehicleShort(vehicle)} · ${vehicle.registration}`}
            />
            <KeyValueRow
              label="Services"
              value={
                lines.length > 0
                  ? lines.map(l => l.title).join(', ')
                  : 'No services'
              }
            />
            <KeyValueRow label="Pickup" value={pickup || 'To be confirmed'} />
            <KeyValueRow
              label="Workshop"
              value={`XYZ Partner Workshop - ${cityName(cityId)} Zone 1`}
            />
          </View>
          <Divider dashed />
          <KeyValueRow
            label="Estimated total"
            value={`${RUPEE}${formatAmount(totals.toPay)}`}
            strong
          />
        </Card>

        <Text style={s.note}>
          We have sent these details on WhatsApp. Our advisor will call you to
          confirm.
        </Text>
      </ScrollView>

      <StickyFooter>
        <Button
          label="Track Order"
          block
          onPress={() =>
            navigation.navigate('OrderTracking', {
              orderId: route.params.orderId,
            })
          }
        />
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
  hero: { alignItems: 'center', paddingTop: space.xxxl + space.xl },
  check: {
    width: 70,
    height: 70,
    borderRadius: radius.lg,
    backgroundColor: color.successIcon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...type.h1, fontSize: 24, marginTop: space.xl },
  orderId: { ...type.bodyMuted, marginTop: space.xs },
  rows: { gap: space.md },
  note: { ...type.meta, textAlign: 'center', paddingHorizontal: space.md },
});
