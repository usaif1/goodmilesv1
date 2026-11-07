import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Card, Field, ScreenHeader, Text } from '@/components';
import { BRANDS, MODELS, YEAR_BANDS } from '@/data';
import { useApp } from '@/store';
import { Icon, layout, radius, useTheme } from '@/theme';

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

  /**
   * Fuel, gearbox and year come from a second sheet in the prototype.
   * Until that is built, a model picks sensible defaults so the rest of
   * the app has a car to price against - note the year band drives the
   * price, so this is a placeholder, not a final answer.
   */
  const choose = (brand: string, model: string) => {
    setCar({ brand, model, year: YEAR_BANDS[1], fuel: 'Petrol', trans: 'Manual' });
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
          <Pressable style={styles.regPress} accessibilityRole="button">
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
                onPress={() => setQuery(b)}
              >
                <View style={[styles.initials, { backgroundColor: c.bay }]}>
                  <Text variant="bodyStrong">
                    {b.split(/[\s-]/).map(w => w[0]).join('').slice(0, 2)}
                  </Text>
                </View>
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
                onPress={() => choose(b, m)}
                style={[
                  styles.modelRow,
                  i > 0 && { borderTopWidth: layout.hairline, borderTopColor: c.line },
                ]}
              >
                <View style={[styles.thumb, { backgroundColor: c.bay }]} />
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
});
