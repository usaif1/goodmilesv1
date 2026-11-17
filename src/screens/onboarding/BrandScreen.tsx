import { useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { brandImage, carImage } from '@/assets';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Card, Field, RegnoSheet, ScreenHeader, Text } from '@/components';
import { BRANDS, MODELS } from '@/data';
import type { Car } from '@/domain';
import { useApp } from '@/store';
import { Icon, layout, radius, useTheme } from '@/theme';

import { ModelSheet } from './ModelSheet';

import type { RootScreenProps } from '@/navigation/types';

/** Ignores spaces and hyphens, so "mercedesbenz" finds Mercedes-Benz. */
const norm = (s: string) => s.toLowerCase().replace(/[\s-]/g, '');

/**
 * Model search is deliberately looser than the brand grid: "cre" should
 * find the Creta, and so should any word in the name, so "nios" finds
 * the Grand i10 Nios.
 */
function matchModel(query: string, brand: string, model: string) {
  const nq = norm(query);
  if (!nq) return false;
  if (norm(model).startsWith(nq)) return true;
  if (model.toLowerCase().split(/[\s-]/).some(w => w.startsWith(query.trim().toLowerCase())))
    return true;
  return norm(brand + model).startsWith(nq) && nq.length > norm(brand).length;
}

export function BrandScreen({ navigation }: RootScreenProps<'Brand'>) {
  const { c } = useTheme();
  const [query, setQuery] = useState('');
  const setCar = useApp(s => s.setCar);

  const sheet = useRef<BottomSheetModal>(null);
  const regnoSheet = useRef<BottomSheetModal>(null);
  const [picking, setPicking] = useState<string | null>(null);
  const setReg = useApp(s => s.setReg);

  /** A brand opens the sheet; the sheet is where the car is finished. */
  const openBrand = (brand: string) => {
    setPicking(brand);
    sheet.current?.present();
  };

  const chosen = (car: Car) => {
    setCar(car);
    sheet.current?.dismiss();
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  const brands = useMemo(
    () => BRANDS.filter(b => norm(b).includes(norm(query))),
    [query],
  );

  const models = useMemo(() => {
    if (!query.trim()) return [];
    return BRANDS.flatMap(b =>
      (MODELS[b] ?? [])
        .filter(m => matchModel(query, b, m))
        .map(m => [b, m] as const),
    ).slice(0, 8);
  }, [query]);

  const nothing = query.trim() && !brands.length && !models.length;

  return (
    <>
    <View style={[styles.page, { backgroundColor: c.page }]}>
      <ScreenHeader
        onBack={navigation.goBack}
        right={
          <Text variant="headerSub" style={styles.step}>
            Step 3 of 3
          </Text>
        }
      />
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text variant="h1">Which car do you drive?</Text>

        <View>
          <Text variant="body" style={styles.label}>
            Search by brand or model
          </Text>
          <Field
            icon="search"
            value={query}
            onChangeText={setQuery}
            accessibilityLabel="Search by brand or model"
            autoCorrect={false}
          />
        </View>

        <Card variant="outlined" style={styles.regRow}>
          <Pressable
            style={styles.regPress}
            accessibilityRole="button"
            onPress={() => regnoSheet.current?.present()}
          >
            <Icon name="car" size={24} color={c.ink} />
            <View style={styles.grow}>
              <Text variant="bodyStrong">Enter your car number instead</Text>
              <Text variant="small" tone="muted">
                We&rsquo;ll fill in the brand, model and year
              </Text>
            </View>
            <Icon name="chev" size={18} color={c.ink} />
          </Pressable>
        </Card>

        {nothing ? (
          <Text variant="h3" style={styles.none}>
            No brand or model matches &ldquo;{query}&rdquo;.
          </Text>
        ) : null}

        {brands.length ? (
          <View style={styles.grid}>
            {brands.map(b => (
              <Pressable
                key={b}
                style={[styles.tile, { backgroundColor: c.card, borderColor: c.line }]}
                accessibilityRole="button"
                onPress={() => openBrand(b)}
              >
                {brandImage(b) ? (
                  <Image
                    source={brandImage(b)}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={[styles.initials, { backgroundColor: c.bay }]}>
                    <Text variant="bodyStrong">
                      {b.split(/[\s-]/).map(w => w[0]).join('').slice(0, 2)}
                    </Text>
                  </View>
                )}
                <Text variant="meta" tone="ink" numberOfLines={2} style={styles.tileName}>
                  {b}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {models.length ? (
          <View style={[styles.rows, { backgroundColor: c.card, borderColor: c.line }]}>
            {models.map(([b, m], i) => (
              <Pressable
                key={`${b}-${m}`}
                accessibilityRole="button"
                onPress={() => openBrand(b)}
                style={[
                  styles.modelRow,
                  i > 0 && { borderTopWidth: layout.hairline, borderTopColor: c.line },
                ]}
              >
                {carImage(m) ? (
                  <Image source={carImage(m)} style={styles.carThumb} resizeMode="contain" />
                ) : (
                  <View style={[styles.thumb, { backgroundColor: c.bay }]} />
                )}
                <View style={styles.grow}>
                  <Text variant="bodyStrong">{m}</Text>
                  <Text variant="body" tone="muted">
                    {b}
                  </Text>
                </View>
                <Icon name="chev" size={18} color={c.ink} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
    <RegnoSheet
      ref={regnoSheet}
      onClose={() => regnoSheet.current?.dismiss()}
      onFound={(found, reg) => {
        setCar(found);
        setReg(reg);
        regnoSheet.current?.dismiss();
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      }}
    />
    <ModelSheet
      ref={sheet}
      brand={picking}
      onClose={() => sheet.current?.dismiss()}
      onPick={chosen}
    />
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  step: { marginLeft: 'auto' },
  body: { padding: 16, paddingBottom: 32, gap: 16 },
  label: { marginBottom: 8 },
  regRow: { padding: 0 },
  regPress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  grow: { flex: 1, minWidth: 0 },
  none: { marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tile: {
    width: '31.5%',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 2,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
  },
  initials: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileName: { textAlign: 'center' },
  rows: { borderRadius: radius.lg, borderWidth: layout.hairline, overflow: 'hidden' },
  modelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 56,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  thumb: { width: 40, height: 30, borderRadius: radius.sm },
  logo: { width: 44, height: 44 },
  carThumb: { width: 56, height: 36 },
});
