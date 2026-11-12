import { StyleSheet, View } from 'react-native';

import { Button, Card, Footer, Screen, ScreenHeader, Text } from '@/components';
import { useApp } from '@/store';
import { useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const FRIENDS: [string, string, string][] = [
  ['Kabir', 'Serviced 19 Oct', '+₹500'],
  ['Neha', 'Booked for 26 Oct', 'Pending'],
];

export function ReferScreen({ navigation }: RootScreenProps<'Refer'>) {
  const { c } = useTheme();
  const phone = useApp(s => s.phone);
  const code = `ROHAN${phone.slice(-3) || '500'}`;

  return (
    <Screen
      header={<ScreenHeader title="Refer and earn" onBack={navigation.goBack} />}
      footer={
        <Footer>
          <Button label="Share on WhatsApp" icon="share" />
        </Footer>
      }
    >
      <Card>
        <Text variant="h2">
          Give ₹500.{'\n'}Get ₹500.
        </Text>
        <Text variant="small" tone="muted">
          Your friend gets ₹500 off their first service. You get ₹500 in coins
          after their car is delivered.
        </Text>
      </Card>

      <Card>
        <Text variant="label">Your code</Text>
        <View style={styles.row}>
          <Text variant="h2" style={styles.code}>
            {code}
          </Text>
          <Button label="Copy" size="sm" variant="ghost" icon="copy" />
        </View>
      </Card>

      <Card>
        <View style={styles.row}>
          <Text variant="label" style={styles.grow}>
            Friends
          </Text>
          <Text variant="meta" tone="muted">
            Example
          </Text>
        </View>
        {FRIENDS.map(([name, status, value]) => (
          <View key={name} style={styles.friend}>
            <View style={[styles.avatar, { backgroundColor: c.bay }]}>
              <Text variant="smallStrong">{name[0]}</Text>
            </View>
            <View style={styles.grow}>
              <Text variant="bodyStrong">{name}</Text>
              <Text variant="small" tone="muted">
                {status}
              </Text>
            </View>
            <Text variant="smallStrong">{value}</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  code: { letterSpacing: 1, flex: 1 },
  friend: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
