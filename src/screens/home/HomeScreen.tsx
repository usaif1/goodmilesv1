import { useNavigation } from '@react-navigation/native';
import ArrowRight from 'lucide-react-native/icons/arrow-right';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import MapPin from 'lucide-react-native/icons/map-pin';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Banner,
  Button,
  Grid,
  GridTile,
  ScreenHeader,
} from '@/components';
import { CATEGORIES, FEATURED_CATEGORY_IDS, membershipPriceFor } from '@/mocks';
import type { RootNav } from '@/navigation';
import { cityName, formatAmount, useLocation, useVehicle, vehicleLabel } from '@/store';
import { color, layout, radius, space, type } from '@/theme';

/** C05. */
export default function HomeScreen() {
  const navigation = useNavigation<RootNav>();
  const vehicle = useVehicle(s => s.vehicle);
  const cityId = useLocation(s => s.cityId);

  const featured = CATEGORIES.filter(c =>
    FEATURED_CATEGORY_IDS.includes(c.id),
  );
  const membership = membershipPriceFor(vehicle.segment);

  return (
    <View style={s.root}>
      <ScreenHeader
        title="XYZ"
        right={
          <Pressable
            style={s.city}
            onPress={() => navigation.navigate('CitySelect')}>
            <MapPin size={16} color={color.textOnBrand} />
            <Text style={s.cityName}>{cityName(cityId)}</Text>
            <ChevronDown size={16} color={color.textOnBrand} />
          </Pressable>
        }>
        <View style={s.carBar}>
          <View style={s.carText}>
            <Text style={s.carLabel}>Your car</Text>
            <Text style={s.carName}>{vehicleLabel(vehicle)}</Text>
          </View>
          <Button
            label="Change"
            variant="ghost"
            size="sm"
            onPress={() => navigation.navigate('CarSelect')}
          />
        </View>
      </ScreenHeader>

      <ScrollView contentContainerStyle={s.body}>
        <Banner
          title="Get Rs 300 off your first service"
          subtitle="Use code XYZFIRST · Free pickup & drop"
        />

        <Text style={s.section}>Our services</Text>

        <Grid>
          {featured.map(category => (
            <GridTile
              key={category.id}
              label={category.name}
              Icon={category.Icon}
              onPress={() =>
                navigation.navigate('CategoryServices', {
                  categoryId: category.id,
                  categoryName: category.name,
                })
              }
            />
          ))}
          <GridTile
            label={`All ${CATEGORIES.length} services`}
            Icon={ArrowRight}
            tinted
            onPress={() =>
              navigation.navigate('CategoryServices', {
                categoryId: CATEGORIES[0].id,
                categoryName: CATEGORIES[0].name,
              })
            }
          />
        </Grid>

        <Banner
          title="Reserve Member"
          subtitle={
            membership
              ? `10% off every service for 12 months · from Rs ${formatAmount(
                  membership.price,
                )}`
              : '10% off every service for 12 months'
          }
          tone="accent"
          onPress={() => navigation.navigate('ReserveMember')}
        />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  city: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  cityName: { ...type.body, color: color.textOnBrand, fontWeight: '700' },
  /**
   * The white car bar sits inside the green header on C05, measured at
   * 57pt tall with the green continuing 14pt below it.
   */
  carBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    marginTop: space.lg,
    minHeight: 57,
    backgroundColor: color.surface,
    borderRadius: radius.md,
    paddingHorizontal: layout.cardPadding,
    paddingVertical: space.sm,
  },
  carText: { flex: 1 },
  carLabel: type.meta,
  carName: { ...type.h2, marginTop: 2 },
  body: {
    padding: layout.screenPadding,
    gap: layout.screenPadding,
    paddingBottom: space.xxxl,
  },
  section: { ...type.h1, marginBottom: -space.sm },
});
