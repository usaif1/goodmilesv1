import { StyleSheet, View } from 'react-native';

import { CategoryTile, Screen, ScreenHeader } from '@/components';
import { CATEGORIES } from '@/data';
import { useApp } from '@/store';

import type { RootScreenProps } from '@/navigation/types';

export function AllCategoriesScreen({
  navigation,
}: RootScreenProps<'AllCategories'>) {
  const car = useApp(s => s.car);

  return (
    <Screen
      header={
        <ScreenHeader
          title="All services"
          subtitle={car ? `${car.brand} ${car.model} · ${car.fuel} · ${car.year}` : 'Choose your car'}
          onBack={navigation.goBack}
        />
      }
    >
      <View style={styles.grid}>
        {CATEGORIES.map(k => (
          <View key={k.id} style={styles.cell}>
            <CategoryTile
              category={k}
              car={car}
              withPrice
              onPress={() =>
                navigation.navigate('Category', { categoryId: k.id })
              }
            />
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 16, columnGap: 8 },
  cell: { width: '31.5%' },
});
