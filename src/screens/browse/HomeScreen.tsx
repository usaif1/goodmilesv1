import { useMemo, useRef } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { carImage, categoryImage } from '@/assets';

import { CarsSheet, CategoryTile, Section, Text } from '@/components';
import { CATEGORIES, serviceById } from '@/data';
import { inr, priceFor } from '@/domain';
import { useApp } from '@/store';
import { Icon, face, layout, radius, useTheme } from '@/theme';

import type { TabScreenProps } from '@/navigation/types';

/**
 * Two photo tiles lead, chosen by season: AC peaks March to June,
 * cleaning the rest of the year. The prototype picks these from twelve
 * months of billing rather than taste.
 */
function headlineCategories(month: number): [string, string][] {
  const acSeason = month >= 2 && month <= 5;
  return [
    ['periodic', 'standard'],
    acSeason ? ['ac', 'acreg'] : ['spa', 'deep'],
  ];
}

const PROMISES: [string, string][] = [
  ['car', 'Free pickup and drop'],
  ['box', 'Old parts back to you'],
  ['check', 'Nothing extra without your OK'],
  ['shield', 'Branded parts with warranty'],
  ['camera', 'Every job photographed'],
  ['wrench', 'Any damage, we repair it'],
];

const PART_BRANDS = ['BOSCH', 'DENSO', 'Valeo', 'MAHLE', 'NGK', 'Castrol'];

/** How many small tiles sit under the two big ones. */
const SMALL_TILES = 7;

export function HomeScreen({ navigation }: TabScreenProps<'HomeTab'>) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const car = useApp(s => s.car);
  const cars = useApp(s => s.cars);
  const setCar = useApp(s => s.setCar);
  const address = useApp(s => s.address);
  const carsSheet = useRef<BottomSheetModal>(null);

  const big = useMemo(() => headlineCategories(new Date().getMonth()), []);
  const small = useMemo(
    () =>
      CATEGORIES.filter(k => !big.some(([id]) => id === k.id)).slice(
        0,
        SMALL_TILES,
      ),
    [big],
  );

  const openCategory = (id: string) =>
    navigation.navigate('Category', { categoryId: id });

  return (
    <>
    <View style={[styles.fill, { backgroundColor: c.page }]}>
      <View style={[styles.header, { backgroundColor: c.card, paddingTop: insets.top + 6 }]}>
        <Pressable style={styles.location} accessibilityRole="button">
          <Icon name="pin" size={20} color={c.ink} />
          <View style={styles.grow}>
            <View style={styles.locationTop}>
              <Text variant="bodyStrong" style={styles.locationName}>
                {address ? address.label : 'Noida'}
              </Text>
              <Icon name="down" size={14} strokeWidth={2.4} color={c.ink} />
            </View>
            <Text variant="meta" tone="muted" numberOfLines={1}>
              {address ? address.short : 'Pickup and drop across Noida'}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.car}
          accessibilityRole="button"
          accessibilityLabel={car ? `Your car: ${car.brand} ${car.model}` : 'Add your car'}
          onPress={() =>
            car ? carsSheet.current?.present() : navigation.navigate('Brand')
          }
        >
          {carImage(car?.model) ? (
            <Image
              source={carImage(car?.model)}
              style={styles.carArt}
              resizeMode="contain"
            />
          ) : (
            <Icon name="car" size={26} color={c.ink} />
          )}
          <View style={[styles.carBadge, { backgroundColor: c.ink }]}>
            {/*
              No numberOfLines here: Android under-measures uppercase text
              with letter-spacing and ellipsises a name that fits.
            */}
            <Text variant="meta" style={[styles.carLabel, { color: c.card }]}>
              {car ? car.model : 'Add car'}
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={[styles.searchBar, { backgroundColor: c.card, borderBottomColor: c.line }]}>
        <Pressable
          style={[styles.search, { borderColor: c.ctlLine }]}
          accessibilityRole="search"
          onPress={() => navigation.navigate('Search')}
        >
          <Icon name="search" size={18} color={c.muted} />
          <Text variant="body" tone="muted">
            Search for &ldquo;AC not cooling&rdquo;
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Section title={`Services for your ${car ? car.model : 'car'}`}>
          <View style={styles.bigRow}>
            {big.map(([catId, svcId]) => {
              const category = CATEGORIES.find(k => k.id === catId)!;
              const service = serviceById(svcId);
              const p = service ? priceFor(service, car) : null;
              return (
                <Pressable
                  key={catId}
                  style={styles.bigTile}
                  accessibilityRole="button"
                  onPress={() => openCategory(catId)}
                >
                  <View style={[styles.bigArt, { backgroundColor: c.card, borderColor: c.line }]}>
                    {categoryImage(category.png ?? category.id) ? (
                      <Image
                        source={categoryImage(category.png ?? category.id)}
                        style={styles.bigArtImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <Icon name={category.icon} size={44} color={c.ink} />
                    )}
                  </View>
                  <Text variant="h3">{category.name}</Text>
                  <Text variant="body" tone="muted" numberOfLines={1}>
                    {p !== null && service
                      ? `${inr(p)} · ${service.name.replace(/ service$/, '')}`
                      : 'See prices'}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.tileGrid}>
            {small.map(k => (
              <View key={k.id} style={styles.tileCell}>
                <CategoryTile category={k} onPress={() => openCategory(k.id)} />
              </View>
            ))}
            <View style={styles.tileCell}>
              <CategoryTile
                category={{ id: 'all', name: 'All services', icon: 'plus' }}
                onPress={() => navigation.navigate('AllCategories')}
              />
            </View>
          </View>
        </Section>

        <Section
          title="The GoodMiles promise"
          subtitle="What every booking includes, whatever the job."
        >
          <View style={styles.promises}>
            {PROMISES.map(([icon, label]) => (
              <View key={label} style={[styles.promise, { backgroundColor: c.bay }]}>
                <Icon name={icon as never} size={22} color={c.ink} />
                <Text variant="smallStrong">{label}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section
          title="Branded parts we fit"
          subtitle="From the makers carmakers buy from. Your old parts come back in a box."
        >
          <View style={styles.brands}>
            {PART_BRANDS.map(b => (
              <View key={b} style={[styles.brand, { borderColor: c.line }]}>
                <Text variant="h3" style={styles.brandName}>
                  {b}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section>
          <Pressable style={styles.notSure} accessibilityRole="button">
            <Icon name="help" size={20} color={c.ink} />
            <View style={styles.grow}>
              <Text variant="bodyStrong">Not sure what&rsquo;s wrong?</Text>
              <Text variant="small" tone="muted">
                Tell us what you notice. We inspect, then price every fix before
                we touch it.
              </Text>
            </View>
            <Icon name="chev" size={18} color={c.ink} />
          </Pressable>
        </Section>
      </ScrollView>
    </View>

    <CarsSheet
      ref={carsSheet}
      cars={cars}
      active={car}
      onSelect={next => {
        setCar(next);
        carsSheet.current?.dismiss();
      }}
      onAdd={() => {
        carsSheet.current?.dismiss();
        navigation.navigate('Brand');
      }}
      onClose={() => carsSheet.current?.dismiss()}
    />
    </>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  location: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: 8 },
  locationTop: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationName: { fontSize: 15 },
  grow: { flex: 1, minWidth: 0 },
  car: { flexShrink: 0, maxWidth: 110, alignItems: 'center', gap: 1 },
  carArt: { width: 66, height: 34 },
  bigArtImage: { width: '58%', height: '72%' },
  carBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
  /*
   * The bold face, not fontWeight on top of the regular one: Android
   * fakes the weight and then mis-measures the result, which clipped
   * this badge. typography.ts says the same thing.
   */
  carLabel: {
    fontFamily: face.bold,
    letterSpacing: 0.55,
    textTransform: 'uppercase',
  },
  searchBar: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 12, borderBottomWidth: layout.hairline },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    borderWidth: layout.hairline,
  },
  scroll: { paddingBottom: 24 },
  bigRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  bigTile: { flex: 1, gap: 2 },
  bigArt: {
    aspectRatio: 4 / 3,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tileGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 12, columnGap: 8 },
  tileCell: { width: '23%' },
  promises: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  promise: {
    width: '47%',
    gap: 10,
    padding: 12,
    borderRadius: radius.md,
    justifyContent: 'space-between',
    minHeight: 96,
  },
  brands: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  brand: {
    width: '31.5%',
    height: 50,
    borderRadius: radius.md,
    borderWidth: layout.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: { fontSize: 15, letterSpacing: 0.3 },
  notSure: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
