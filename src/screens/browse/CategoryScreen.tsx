import { StyleSheet, View } from 'react-native';

import { CartBar, Screen, ScreenHeader, ServiceRow, Text } from '@/components';
import { categoryById, servicesInCategory } from '@/data';
import { useApp } from '@/store';

import type { RootScreenProps } from '@/navigation/types';

export function CategoryScreen({
  navigation,
  route,
}: RootScreenProps<'Category'>) {
  const { categoryId } = route.params;
  const category = categoryById(categoryId);
  const services = servicesInCategory(categoryId);

  const car = useApp(s => s.car);
  const cart = useApp(s => s.cart);
  const toggleCart = useApp(s => s.toggleCart);

  return (
    <Screen
      header={
        <ScreenHeader
          title={category?.name ?? 'Services'}
          subtitle={car ? `${car.brand} ${car.model}` : 'Choose your car'}
          onBack={navigation.goBack}
        />
      }
      footer={<CartBar onPress={() => navigation.navigate('Cart')} />}
    >
      {services.length ? (
        <View style={styles.list}>
          {services.map(s => (
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
      ) : (
        <Text variant="body" tone="muted">
          Nothing here yet.
        </Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12 },
});
