import { useNavigation } from '@react-navigation/native';
import Check from 'lucide-react-native/icons/check';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, ScreenHeader, StubNote } from '@/components';
import { GARAGE } from '@/mocks';
import type { RootNav } from '@/navigation';
import { useVehicle, vehicleLabel } from '@/store';
import { color, layout, space, type } from '@/theme';

/**
 * No mockup. Reached from the Change button on C05's car bar and from
 * Profile. Pricing is keyed on the selected car, so switching here
 * changes the catalogue behind it.
 */
export default function CarSelectScreen() {
  const navigation = useNavigation<RootNav>();
  const vehicle = useVehicle(s => s.vehicle);
  const setVehicle = useVehicle(s => s.setVehicle);

  return (
    <View style={s.root}>
      <ScreenHeader
        title="Select your car"
        subtitle="Prices and services follow the car you pick"
      />

      <ScrollView contentContainerStyle={s.body}>
        {GARAGE.map(car => {
          const selected = car.id === vehicle.id;
          return (
            <Pressable
              key={car.id}
              onPress={() => {
                setVehicle(car);
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}
              style={({ pressed }) => (pressed ? s.pressed : null)}>
              <Card style={selected ? s.selected : undefined}>
                <View style={s.row}>
                  <View style={s.text}>
                    <Text style={s.name}>{vehicleLabel(car)}</Text>
                    <Text style={s.meta}>
                      {car.registration} {'·'} {car.segment}
                    </Text>
                  </View>
                  {selected && <Check size={20} color={color.brand} />}
                </View>
              </Card>
            </Pressable>
          );
        })}

        <StubNote>
          No mockup covers this screen yet, so the layout is provisional.
        </StubNote>
      </ScrollView>
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
  selected: { borderWidth: layout.hairline + 1, borderColor: color.brand },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  text: { flex: 1 },
  name: type.h2,
  meta: { ...type.meta, marginTop: 2 },
  pressed: { opacity: 0.75 },
});
