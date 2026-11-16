import { Fragment } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, useToast } from '@/components';
import { SERVED_CITIES } from '@/data';
import { useApp } from '@/store';
import { Icon, layout, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

export function CityScreen({ navigation }: RootScreenProps<'City'>) {
  const { c } = useTheme();
  const { toast } = useToast();
  const insets = useSafeAreaInsets();
  const setCity = useApp(s => s.setCity);

  const choose = (city: string) => {
    setCity(city);
    navigation.navigate('Brand');
  };

  return (
    <View style={[styles.page, { backgroundColor: c.page, paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Text variant="headerSub" style={styles.step}>
          Step 2 of 3
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text variant="question">Where is your car parked?</Text>

        <View style={styles.fact}>
          <Icon name="check" size={18} strokeWidth={3} color={c.ink} />
          <Text variant="body" style={styles.factText}>
            Prices are the same across Delhi NCR.
          </Text>
        </View>

        <View
          style={[styles.list, { backgroundColor: c.card, borderColor: c.line }]}
        >
          {SERVED_CITIES.map((city, i) => (
            <Fragment key={city}>
              {i > 0 ? (
                <View style={[styles.rule, { backgroundColor: c.line }]} />
              ) : null}
              <Pressable
                style={styles.row}
                accessibilityRole="button"
                onPress={() => choose(city)}
              >
                <Text variant="h3">{city}</Text>
                <Icon name="chev" size={18} color={c.muted} />
              </Pressable>
            </Fragment>
          ))}
        </View>

        <Pressable
          style={[styles.out, { borderColor: c.ctlLine }]}
          accessibilityRole="button"
          onPress={() =>
            toast("We\u2019ll message you when we start in your area.")
          }
        >
          <View style={styles.grow}>
            <Text variant="h3">Car outside Delhi NCR?</Text>
            <Text variant="body" tone="muted">
              Not there yet. Join the waitlist.
            </Text>
          </View>
          <Icon name="chev" size={18} color={c.ink} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  top: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 16,
  },
  step: { marginLeft: 'auto' },
  body: { paddingHorizontal: 24, paddingBottom: 28 },
  fact: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 22 },
  factText: { fontSize: 16 },
  list: {
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
    overflow: 'hidden',
  },
  rule: { height: layout.hairline },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 18,
  },
  out: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: layout.chipBorder,
    borderRadius: radius.lg,
  },
  grow: { flex: 1, minWidth: 0 },
});
