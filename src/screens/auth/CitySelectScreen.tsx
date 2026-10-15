import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BuildingComplex from 'lucide-react-native/icons/building-complex';
import Search from 'lucide-react-native/icons/search';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Grid, GridTile, ScreenHeader, TextField } from '@/components';
import { CITIES, DETECTED_CITY_ID } from '@/mocks';
import type { RootNav } from '@/navigation';
import { cityName, useLocation } from '@/store';
import { color, layout, space, type } from '@/theme';

/** C02. */
export default function CitySelectScreen() {
  const navigation = useNavigation<RootNav>();
  const cityId = useLocation(s => s.cityId);
  const setCity = useLocation(s => s.setCity);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? CITIES.filter(c => c.name.toLowerCase().includes(q)) : CITIES;
  }, [query]);

  const choose = (id: string) => {
    setCity(id);
    // Reset rather than navigate: the user must not be able to swipe
    // back into the login flow once they are in the app.
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  };

  return (
    <View style={s.root}>
      <ScreenHeader
        title="Select your city"
        subtitle={`We detected ${cityName(DETECTED_CITY_ID)} from your location`}
      />
      <ScrollView
        contentContainerStyle={s.body}
        keyboardShouldPersistTaps="handled">
        <TextField
          value={query}
          onChangeText={setQuery}
          placeholder="Search city"
          left={<Search size={18} color={color.textDisabled} />}
        />

        {results.length === 0 ? (
          <Text style={s.empty}>No cities match "{query.trim()}"</Text>
        ) : (
          <Grid>
            {results.map(city => (
              <GridTile
                key={city.id}
                label={city.name}
                Icon={BuildingComplex}
                selected={city.id === cityId}
                onPress={() => choose(city.id)}
              />
            ))}
          </Grid>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  body: {
    padding: layout.screenPadding,
    gap: layout.screenPadding,
    paddingBottom: space.xxxl,
  },
  empty: { ...type.bodyMuted, textAlign: 'center', marginTop: space.xxl },
});
