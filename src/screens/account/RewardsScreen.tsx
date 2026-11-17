import { StyleSheet, View } from 'react-native';

import { Button, Card, Footer, Screen, ScreenHeader, Text } from '@/components';
import { inr } from '@/domain';
import { useApp } from '@/store';
import { Icon, useTheme, type IconName } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const EARN: [IconName, string, string][] = [
  ['wrench', '₹300 after every service', 'Use it on your next one'],
  ['gift', '₹500 for each friend you refer', 'They get ₹500 too'],
  ['star', '₹50 on your birthday and car anniversary', ''],
];

export function RewardsScreen({ navigation }: RootScreenProps<'Rewards'>) {
  const { c } = useTheme();
  const coins = useApp(s => s.coins);

  return (
    <Screen
      header={<ScreenHeader title="Your coins" onBack={navigation.goBack} />}
      footer={
        <Footer>
          <Button label="Refer a friend" onPress={() => navigation.navigate('Refer')} />
        </Footer>
      }
    >
      <Card>
        <Text variant="label">Balance</Text>
        <Text variant="h1">{inr(coins)}</Text>
        <Text variant="small" tone="muted">
          1 coin = ₹1 · Use up to 10% of any bill
        </Text>
      </Card>

      {coins ? (
        <Card>
          <View style={styles.row}>
            <Icon name="clock" size={22} color={c.ink} />
            <View style={styles.grow}>
              <Text variant="smallStrong">
                {inr(coins)} expires on 27 Jun 2027
              </Text>
              <Text variant="small" tone="muted">
                Book before then to use your coins.
              </Text>
            </View>
          </View>
        </Card>
      ) : null}

      <Card>
        <Text variant="h3">How to earn</Text>
        {EARN.map(([icon, title, detail]) => (
          <View key={title} style={styles.earn}>
            <Icon name={icon} size={20} color={c.ink} />
            <View style={styles.grow}>
              <Text variant="bodyStrong">{title}</Text>
              {detail ? (
                <Text variant="small" tone="muted">
                  {detail}
                </Text>
              ) : null}
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  earn: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
});
