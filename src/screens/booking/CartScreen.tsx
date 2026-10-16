import { useNavigation } from '@react-navigation/native';
import Tag from 'lucide-react-native/icons/tag';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Banner,
  Button,
  Card,
  Divider,
  KeyValueRow,
  RUPEE,
  ScreenHeader,
  StickyFooter,
} from '@/components';
import { couponByCode, membershipPriceFor } from '@/mocks';
import type { RootNav } from '@/navigation';
import {
  formatAmount,
  useCart,
  useCartLines,
  useCartTotals,
  useMembership,
  useVehicle,
  vehicleShort,
} from '@/store';
import { color, layout, radius, space, type } from '@/theme';

const money = (value: number) => `${RUPEE}${formatAmount(value)}`;

/** C08. */
export default function CartScreen() {
  const navigation = useNavigation<RootNav>();
  const vehicle = useVehicle(s => s.vehicle);
  const lines = useCartLines();
  const totals = useCartTotals();
  const couponCode = useCart(s => s.couponCode);
  const isMember = useMembership(s => s.active);

  const coupon = couponCode ? couponByCode(couponCode) : null;
  const membership = membershipPriceFor(vehicle.segment);

  return (
    <View style={s.root}>
      <ScreenHeader title="Cart" subtitle={vehicleShort(vehicle)} />

      <ScrollView contentContainerStyle={s.body}>
        {lines.length === 0 ? (
          <Card>
            <Text style={s.empty}>
              Your cart is empty. Pick a service to get started.
            </Text>
          </Card>
        ) : (
          <Card>
            {lines.map((line, i) => (
              <View key={line.id} style={i > 0 ? s.lineGap : undefined}>
                <KeyValueRow label={line.title} value={money(line.price)} />
              </View>
            ))}
          </Card>
        )}

        {coupon && totals.couponDiscount > 0 && (
          <Card>
            <View style={s.couponRow}>
              <Tag size={18} color={color.warning} />
              <View style={s.couponText}>
                <Text style={s.couponCode}>{coupon.code} applied</Text>
                <Text style={s.couponLabel}>{coupon.label}</Text>
              </View>
              <Text style={s.discount}>-{money(totals.couponDiscount)}</Text>
            </View>
          </Card>
        )}

        {!isMember && (
          <Banner
            title="Become a Reserve Member"
            subtitle="Save 10% on this order and every order for 12 months"
            tone="accent"
            onPress={() => navigation.navigate('ReserveMember')}
            right={
              membership ? (
                <View style={s.priceChip}>
                  <Text style={s.priceChipText}>
                    Rs {formatAmount(membership.price)}
                  </Text>
                </View>
              ) : null
            }
          />
        )}

        <Card>
          <View style={s.walletRow}>
            <View style={s.couponText}>
              <Text style={s.cardTitle}>XYZ Cash</Text>
              <Text style={s.couponLabel}>Balance Rs 0</Text>
            </View>
            <Text style={s.unavailable}>Not available</Text>
          </View>
        </Card>

        <Card>
          <Text style={s.cardTitle}>Bill summary</Text>
          <View style={s.bill}>
            <KeyValueRow
              label="Item total"
              value={money(totals.itemTotal)}
            />
            {totals.couponDiscount > 0 && (
              <KeyValueRow
                label="Coupon"
                value={`-${money(totals.couponDiscount)}`}
                valueColor={color.success}
              />
            )}
            {totals.membershipDiscount > 0 && (
              <KeyValueRow
                label="Reserve Member"
                value={`-${money(totals.membershipDiscount)}`}
                valueColor={color.success}
              />
            )}
            {totals.slotDiscount > 0 && (
              <KeyValueRow
                label="Slot discount (3 - 4 PM)"
                value={`-${money(totals.slotDiscount)}`}
                valueColor={color.success}
              />
            )}
            <KeyValueRow
              label="Pickup & drop"
              value="FREE"
              valueColor={color.success}
            />
          </View>
          <Divider dashed />
          <KeyValueRow label="To pay" value={money(totals.toPay)} strong />
          <Text style={s.note}>
            Prices include GST. Final bill can change only after you approve
            the estimate.
          </Text>
        </Card>
      </ScrollView>

      <StickyFooter>
        <Button
          label={`Select Slot · ${money(totals.toPay)}`}
          block
          disabled={lines.length === 0}
          onPress={() => navigation.navigate('Schedule')}
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
  lineGap: { marginTop: space.md },
  empty: { ...type.bodyMuted, textAlign: 'center' },
  couponRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  couponText: { flex: 1 },
  couponCode: type.h2,
  couponLabel: { ...type.meta, marginTop: 2 },
  discount: { ...type.body, fontWeight: '700', color: color.success },
  walletRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  unavailable: type.bodyMuted,
  cardTitle: type.h2,
  bill: { marginTop: space.md, gap: space.sm },
  note: { ...type.meta, marginTop: space.sm },
  priceChip: {
    backgroundColor: color.surface,
    borderRadius: radius.md,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
  },
  priceChipText: { ...type.h2, color: color.accentDark, textAlign: 'center' },
});
