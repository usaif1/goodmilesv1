import { useNavigation } from '@react-navigation/native';
import Star from 'lucide-react-native/icons/star';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Card,
  CheckList,
  PriceRow,
  ScreenHeader,
  StickyFooter,
} from '@/components';
import {
  MEMBERSHIP_BENEFITS,
  MEMBERSHIP_PRICES,
  membershipPriceFor,
} from '@/mocks';
import type { RootNav } from '@/navigation';
import { formatAmount, useMembership, useVehicle } from '@/store';
import { color, layout, space, type } from '@/theme';

/** C15. */
export default function ReserveMemberScreen() {
  const navigation = useNavigation<RootNav>();
  const vehicle = useVehicle(s => s.vehicle);
  const isMember = useMembership(s => s.active);
  const activate = useMembership(s => s.activate);

  const mine = membershipPriceFor(vehicle.segment);

  return (
    <View style={s.root}>
      <ScreenHeader
        title="Reserve Member"
        subtitle="One membership. Savings on every service for 12 months."
        variant="accent"
        icon={<Star size={22} color={color.gold} fill={color.gold} />}
      />

      <ScrollView contentContainerStyle={s.body}>
        <Card>
          <CheckList items={MEMBERSHIP_BENEFITS} />
        </Card>

        <Card>
          <Text style={s.cardTitle}>Price for your car</Text>
          <View style={s.prices}>
            {MEMBERSHIP_PRICES.map(row => {
              const isMine = row.segment === vehicle.segment;
              return (
                <View key={row.segment} style={s.priceRow}>
                  <Text style={s.segment}>
                    {row.segment}
                    {isMine ? ` (your ${vehicle.model})` : ''}
                  </Text>
                  <PriceRow
                    price={formatAmount(row.price)}
                    was={formatAmount(row.was)}
                  />
                </View>
              );
            })}
          </View>
        </Card>

        <Text style={s.note}>
          Discount applies automatically in the cart while the membership is
          active.
        </Text>
      </ScrollView>

      <StickyFooter>
        <Button
          label={
            isMember
              ? 'Membership active'
              : `Buy for ₹${formatAmount(mine?.price ?? 0)}`
          }
          tone="accent"
          block
          disabled={isMember}
          onPress={() => {
            activate();
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
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
  cardTitle: type.h2,
  /** C15's price table runs tighter than the default card rhythm. */
  prices: { marginTop: space.md, gap: space.sm },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
  segment: { ...type.body, flexShrink: 1 },
  note: { ...type.meta, paddingHorizontal: space.xs },
});
