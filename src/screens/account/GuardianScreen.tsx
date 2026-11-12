import { StyleSheet, View } from 'react-native';

import { Button, Card, Screen, ScreenHeader, Text } from '@/components';
import { Icon, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const DUTIES = [
  'Call before pickup',
  'Inspect your car',
  'Send photos and an estimate',
  'Check the work before delivery',
];

export function GuardianScreen({ navigation }: RootScreenProps<'Guardian'>) {
  const { c } = useTheme();
  return (
    <Screen header={<ScreenHeader title="Your Guardian" onBack={navigation.goBack} />}>
      <Card style={styles.profile}>
        <View style={[styles.avatar, { backgroundColor: c.bay }]}>
          <Icon name="user" size={44} color={c.muted} />
        </View>
        <Text variant="h2">Amit Sharma</Text>
        <Text variant="small" tone="muted">
          GoodMiles Guardian · 9 years working with cars
        </Text>
      </Card>

      <Card>
        <Text variant="h3">Amit will</Text>
        {DUTIES.map(d => (
          <View key={d} style={styles.duty}>
            <Icon name="check" size={16} strokeWidth={2.4} color={c.ink} />
            <Text variant="body" style={styles.grow}>
              {d}
            </Text>
          </View>
        ))}
      </Card>

      <View style={styles.actions}>
        <Button label="WhatsApp" icon="chat" style={styles.grow} />
        <Button label="Call" icon="phone" variant="ghost" style={styles.grow} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  profile: { alignItems: 'center', gap: 6 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duty: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  actions: { flexDirection: 'row', gap: 8 },
});
