import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Card,
  CheckList,
  PriceRow,
  ScreenHeader,
  StickyFooter,
} from '@/components';
import { HOW_IT_WORKS, serviceById } from '@/mocks';
import type { RootNav, RootStackParamList } from '@/navigation';
import {
  formatAmount,
  useCart,
  useIsInCart,
  useVehicle,
  vehicleShort,
} from '@/store';
import { color, layout, radius, space, type } from '@/theme';

/** C07. */
export default function ServiceDetailScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceDetail'>>();
  const service = serviceById(route.params.serviceId);

  const vehicle = useVehicle(s => s.vehicle);
  const add = useCart(s => s.add);
  const inCart = useIsInCart(route.params.serviceId);

  if (!service) {
    return (
      <View style={s.root}>
        <ScreenHeader title="Service" subtitle="Not found" />
        <Text style={s.missing}>
          This service is no longer listed. Please go back and pick another.
        </Text>
      </View>
    );
  }

  const saving = service.was ? service.was - service.price : 0;

  return (
    <View style={s.root}>
      <ScreenHeader
        title={service.title}
        subtitle={service.meta}
        variant="hero"
      />

      <ScrollView contentContainerStyle={s.body}>
        <Card>
          <View style={s.priceRow}>
            <PriceRow
              price={formatAmount(service.price)}
              was={service.was ? formatAmount(service.was) : undefined}
            />
            {saving > 0 && (
              <View style={s.saveBadge}>
                <Text style={s.saveText}>Save ₹{formatAmount(saving)}</Text>
              </View>
            )}
          </View>
          <Text style={s.gst}>
            Price includes GST - for {vehicleShort(vehicle)}
          </Text>
        </Card>

        <Card>
          <Text style={s.cardTitle}>What's included</Text>
          <View style={s.includes}>
            <CheckList items={service.includes} />
          </View>
        </Card>

        <Card>
          <Text style={s.cardTitle}>How it works</Text>
          <Text style={s.steps}>
            {HOW_IT_WORKS.map((step, i) => `${i + 1}. ${step}`).join('  ')}
          </Text>
        </Card>
      </ScrollView>

      <StickyFooter>
        <Button
          label={inCart ? 'Go to Cart' : 'Add to Cart'}
          block
          onPress={() => {
            add(service.id);
            navigation.navigate('Cart');
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
  saveBadge: {
    backgroundColor: color.warningBg,
    borderRadius: radius.sm,
    paddingVertical: space.xs,
    paddingHorizontal: space.md,
  },
  saveText: { ...type.buttonSmall, color: color.warningText },
  gst: { ...type.meta, marginTop: space.xs },
  /** Card titles measure ~15pt across C06/C07/C08, not the 18pt h1. */
  cardTitle: type.h2,
  includes: { marginTop: space.md },
  steps: { ...type.meta, marginTop: space.xs, lineHeight: 16 },
  missing: { ...type.bodyMuted, padding: layout.screenPadding },
});
