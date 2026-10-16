import { useNavigation } from '@react-navigation/native';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Card,
  KeyValueRow,
  ScreenHeader,
  StatusBadge,
  StubNote,
} from '@/components';
import { membershipPriceFor } from '@/mocks';
import type { RootNav } from '@/navigation';
import {
  cityName,
  formatAmount,
  useLocation,
  useMembership,
  useVehicle,
  vehicleLabel,
} from '@/store';
import { color, layout, space, type } from '@/theme';

const PHONE = '+91 98XXX XXX21';

/**
 * No mockup. The fourth tab needs a destination, so this surfaces the
 * state the other screens already depend on - car, city and membership
 * - rather than inventing an account area.
 */
export default function ProfileScreen() {
  const navigation = useNavigation<RootNav>();
  const vehicle = useVehicle(s => s.vehicle);
  const cityId = useLocation(s => s.cityId);
  const isMember = useMembership(s => s.active);
  const membership = membershipPriceFor(vehicle.segment);

  return (
    <View style={s.root}>
      <ScreenHeader title="Profile" subtitle={PHONE} />

      <ScrollView contentContainerStyle={s.body}>
        <Pressable
          onPress={() => navigation.navigate('CarSelect')}
          style={({ pressed }) => (pressed ? s.pressed : null)}>
          <Card>
            <View style={s.row}>
              <View style={s.text}>
                <Text style={s.label}>Your car</Text>
                <Text style={s.value}>{vehicleLabel(vehicle)}</Text>
                <Text style={s.meta}>{vehicle.registration}</Text>
              </View>
              <ChevronRight size={20} color={color.textMuted} />
            </View>
          </Card>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('CitySelect')}
          style={({ pressed }) => (pressed ? s.pressed : null)}>
          <Card>
            <View style={s.row}>
              <View style={s.text}>
                <Text style={s.label}>City</Text>
                <Text style={s.value}>{cityName(cityId)}</Text>
              </View>
              <ChevronRight size={20} color={color.textMuted} />
            </View>
          </Card>
        </Pressable>

        <Card>
          <View style={s.row}>
            <Text style={s.value}>Reserve Member</Text>
            <StatusBadge
              label={isMember ? 'ACTIVE' : 'NOT A MEMBER'}
              tone={isMember ? 'success' : 'warning'}
            />
          </View>
          {!isMember && membership && (
            <View style={s.upsell}>
              <KeyValueRow
                label="Your price"
                value={`Rs ${formatAmount(membership.price)} / 12 months`}
              />
              <Button
                label="See benefits"
                tone="accent"
                variant="ghost"
                size="sm"
                style={s.cta}
                onPress={() => navigation.navigate('ReserveMember')}
              />
            </View>
          )}
        </Card>

        <StubNote>
          No mockup covers this screen yet, so the layout is provisional.
        </StubNote>
      </ScrollView>
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
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  text: { flex: 1 },
  label: type.meta,
  value: { ...type.h2, marginTop: 2 },
  meta: { ...type.meta, marginTop: 2 },
  upsell: { marginTop: space.md, gap: space.md },
  cta: { alignSelf: 'flex-start' },
  pressed: { opacity: 0.75 },
});
