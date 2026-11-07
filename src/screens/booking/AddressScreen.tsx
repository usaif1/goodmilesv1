import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Chip,
  Field,
  Footer,
  Screen,
  ScreenHeader,
  Text,
} from '@/components';
import { useApp } from '@/store';
import { Icon, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const PARKING = ['Basement', 'Open parking', 'Street'];
const TAGS = ['Home', 'Office', 'Other'];

export function AddressScreen({ navigation }: RootScreenProps<'Address'>) {
  const { c } = useTheme();
  const setAddress = useApp(s => s.setAddress);

  const [flat, setFlat] = useState('Flat 1204, Tower B');
  const [landmark, setLandmark] = useState('Near the metro station');
  const [guardNote, setGuardNote] = useState('');
  const [parking, setParking] = useState(PARKING[0]);
  const [tag, setTag] = useState(TAGS[0]);

  const save = () => {
    setAddress({
      label: tag,
      short: 'Sector 137, Noida',
      full: `${flat}, Sector 137, Noida 201305`,
      parking,
      guardNote,
    });
    navigation.goBack();
  };

  return (
    <Screen
      header={<ScreenHeader title="Pickup address" onBack={navigation.goBack} />}
      footer={
        <Footer>
          <Button label="Save address" onPress={save} />
        </Footer>
      }
    >
      {/* The prototype draws a stylised map here; a plain panel stands in
          while images and maps are out of scope. */}
      <View style={[styles.map, { backgroundColor: c.bay }]}>
        <Icon name="pin" size={40} strokeWidth={2} color={c.ink} />
        <Text variant="meta" tone="muted">
          Move the map to adjust the pin
        </Text>
      </View>

      <Button label="Use my current location" variant="ghost" icon="location" />

      <Card>
        <Text variant="bodyStrong">Sector 137</Text>
        <Text variant="small" tone="muted">
          Noida, Uttar Pradesh 201305
        </Text>
        <View style={styles.free}>
          <Icon name="check" size={14} strokeWidth={2.6} color={c.ink} />
          <Text variant="small">
            Free pickup: you&rsquo;re 4.2 km from our garage
          </Text>
        </View>
      </Card>

      <Labelled label="House / flat number, building">
        <Field value={flat} onChangeText={setFlat} accessibilityLabel="House or flat number" />
      </Labelled>

      <Labelled label="Landmark (optional)">
        <Field value={landmark} onChangeText={setLandmark} accessibilityLabel="Landmark" />
      </Labelled>

      <Labelled label="Where is the car parked?">
        <View style={styles.chips}>
          {PARKING.map(p => (
            <Chip
              key={p}
              label={p}
              selected={parking === p}
              onPress={() => setParking(p)}
            />
          ))}
        </View>
      </Labelled>

      <Labelled label="Note for the guard (optional)">
        <Field
          value={guardNote}
          onChangeText={setGuardNote}
          accessibilityLabel="Note for the guard"
        />
      </Labelled>

      <Labelled label="Save as">
        <View style={styles.chips}>
          {TAGS.map(t => (
            <Chip key={t} label={t} selected={tag === t} onPress={() => setTag(t)} />
          ))}
        </View>
      </Labelled>
    </Screen>
  );
}

function Labelled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.labelled}>
      <Text variant="label">{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 190,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  free: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  labelled: { gap: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
