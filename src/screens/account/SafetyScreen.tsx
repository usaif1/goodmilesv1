import { StyleSheet, View } from 'react-native';

import { Button, Card, Footer, Screen, ScreenHeader, Text } from '@/components';
import { SAFETY } from '@/data';
import { Icon, radius, useTheme, type IconName } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

export function SafetyScreen({ navigation }: RootScreenProps<'Safety'>) {
  const { c } = useTheme();
  return (
    <Screen
      header={<ScreenHeader title="Safety and quality" onBack={navigation.goBack} />}
      footer={
        <Footer>
          <Button label="Book a service" onPress={() => navigation.navigate('Main')} />
        </Footer>
      }
    >
      <View style={[styles.hero, { backgroundColor: c.bay }]}>
        <Icon name="shield" size={40} color={c.muted} />
      </View>

      <View>
        <Text variant="h2">How we look after your car</Text>
        <Text variant="small" tone="muted">
          The same rules for every car, every time.
        </Text>
      </View>

      <Card>
        {SAFETY.map(([icon, title, detail]) => (
          <View key={title} style={styles.item}>
            <Icon name={icon as IconName} size={20} color={c.ink} />
            <View style={styles.grow}>
              <Text variant="bodyStrong">{title}</Text>
              <Text variant="small" tone="muted">
                {detail}
              </Text>
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  hero: {
    height: 190,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
});
