import { useMemo, useState } from 'react';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  CartBar,
  Pill,
  PillGroup,
  ScreenHeader,
  ServiceCard,
  StickyFooter,
} from '@/components';
import { servicesForCategory, type ServiceTab } from '@/mocks';
import type { RootNav, RootStackParamList } from '@/navigation';
import {
  cityName,
  formatAmount,
  useCart,
  useCartTotals,
  useLocation,
  useVehicle,
  vehicleShort,
} from '@/store';
import { color, layout, space } from '@/theme';

const TABS: { id: ServiceTab; label: string }[] = [
  { id: 'scheduled', label: 'Scheduled Service' },
  { id: 'value', label: 'Value Services' },
];

/** C06. */
export default function CategoryServicesScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'CategoryServices'>>();
  const { categoryId, categoryName } = route.params;

  const vehicle = useVehicle(s => s.vehicle);
  const cityId = useLocation(s => s.cityId);
  const serviceIds = useCart(s => s.serviceIds);
  const toggle = useCart(s => s.toggle);
  const totals = useCartTotals();

  const [tab, setTab] = useState<ServiceTab>('scheduled');

  const services = useMemo(
    () => servicesForCategory(categoryId).filter(s2 => s2.tab === tab),
    [categoryId, tab],
  );

  return (
    <View style={s.root}>
      <ScreenHeader
        title={categoryName}
        subtitle={`Prices for ${vehicle.make} ${vehicleShort(
          vehicle,
        )} · ${cityName(cityId)}`}
      />

      {/* C06 puts the tabs on their own white band below the header. */}
      <View style={s.tabs}>
        <PillGroup>
          {TABS.map(t => (
            <Pill
              key={t.id}
              label={t.label}
              selected={tab === t.id}
              onPress={() => setTab(t.id)}
            />
          ))}
        </PillGroup>
      </View>

      <ScrollView contentContainerStyle={s.body}>
        {services.length === 0 ? (
          <Text style={s.empty}>Nothing here yet for this category.</Text>
        ) : (
          services.map(service => (
            <ServiceCard
              key={service.id}
              title={service.title}
              meta={service.meta}
              includes={service.includes}
              price={formatAmount(service.price)}
              was={service.was ? formatAmount(service.was) : undefined}
              added={serviceIds.includes(service.id)}
              onToggle={() => toggle(service.id)}
            />
          ))
        )}
      </ScrollView>

      {serviceIds.length > 0 && (
        <StickyFooter>
          <CartBar
            count={serviceIds.length}
            total={formatAmount(totals.toPay)}
            onPress={() => navigation.navigate('Cart')}
          />
        </StickyFooter>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  tabs: {
    backgroundColor: color.surface,
    paddingHorizontal: layout.screenPadding,
    paddingVertical: space.sm,
  },
  body: {
    padding: layout.screenPadding,
    gap: layout.cardGap,
    paddingBottom: space.xxxl,
  },
  empty: {
    textAlign: 'center',
    marginTop: space.xxl,
    color: color.textMuted,
  },
});
