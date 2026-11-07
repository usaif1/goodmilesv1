import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Field, Screen, ScreenHeader, ServiceRow, Text } from '@/components';
import { SERVICES, categoryById } from '@/data';
import { useApp } from '@/store';

import type { RootScreenProps } from '@/navigation/types';

/**
 * Matches the service name, its category and what the job covers, so
 * "cooling" finds the AC coil clean even though the word is only in the
 * included-jobs list.
 */
function matches(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SERVICES.filter(s =>
    [s.name, categoryById(s.cat)?.name ?? '', ...s.inc.map(([line]) => line)]
      .join(' ')
      .toLowerCase()
      .includes(q),
  );
}

export function SearchScreen({ navigation }: RootScreenProps<'Search'>) {
  const [query, setQuery] = useState('');
  const car = useApp(s => s.car);
  const cart = useApp(s => s.cart);
  const toggleCart = useApp(s => s.toggleCart);

  const results = useMemo(() => matches(query), [query]);
  const searched = query.trim().length > 0;

  return (
    <Screen
      header={<ScreenHeader title="Search" onBack={navigation.goBack} />}
    >
      <Field
        icon="search"
        value={query}
        onChangeText={setQuery}
        placeholder="Try &ldquo;AC not cooling&rdquo;"
        accessibilityLabel="Search services"
        autoFocus
        autoCorrect={false}
      />

      {searched ? (
        <Text variant="small" tone="muted">
          {results.length
            ? `${results.length} ${results.length === 1 ? 'service' : 'services'}`
            : `Nothing matches “${query.trim()}”`}
        </Text>
      ) : null}

      <View style={styles.list}>
        {results.map(s => (
          <ServiceRow
            key={s.id}
            service={s}
            car={car}
            added={cart.includes(s.id)}
            onAdd={() => toggleCart(s.id)}
            onPress={() =>
              navigation.navigate('ServiceDetail', { serviceId: s.id })
            }
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
});
