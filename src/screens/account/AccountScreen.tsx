import { Fragment } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button, Card, Screen, ScreenHeader, Text, useToast } from '@/components';
import { call, openWhatsApp } from '@/lib';
import { useApp } from '@/store';
import { Icon, layout, radius, useTheme, type IconName } from '@/theme';

import type { RootStackParamList, TabScreenProps } from '@/navigation/types';

type Row = {
  icon: IconName;
  label: string;
  to?: Extract<
    keyof RootStackParamList,
    'Address' | 'Refer' | 'NotRight' | 'Safety' | 'Help' | 'Notifications'
  >;
};

const ROWS: Row[] = [
  { icon: 'pin', label: 'Saved addresses', to: 'Address' },
  { icon: 'gift', label: 'Refer a friend', to: 'Refer' },
  { icon: 'warn', label: 'Something not right?', to: 'NotRight' },
  { icon: 'shield', label: 'Safety and quality', to: 'Safety' },
  { icon: 'bell', label: 'Updates', to: 'Notifications' },
  { icon: 'help', label: 'Help centre', to: 'Help' },
];

export function AccountScreen({ navigation }: TabScreenProps<'AccountTab'>) {
  const { c, isDark, toggleTheme } = useTheme();
  const { toast } = useToast();
  const loggedIn = useApp(s => s.loggedIn);
  const phone = useApp(s => s.phone);
  const address = useApp(s => s.address);
  const logout = useApp(s => s.logout);

  return (
    <Screen header={<ScreenHeader root title="Account" />}>
      {loggedIn ? (
        <View style={styles.identity}>
          <View style={[styles.avatar, { backgroundColor: c.sel }]}>
            <Text variant="h2" style={styles.initial}>
              R
            </Text>
          </View>
          <View style={styles.grow}>
            <Text variant="h3">Rohan Mehta</Text>
            <Text variant="small" tone="muted">
              +91 {phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
            </Text>
          </View>
        </View>
      ) : (
        <Card>
          <Text variant="bodyStrong">You&rsquo;re browsing as a guest</Text>
          <Text variant="small" tone="muted">
            Log in to book and keep your car&rsquo;s passport.
          </Text>
          <Button label="Log in" onPress={() => navigation.navigate('Welcome')} />
        </Card>
      )}

      <View style={styles.tiles}>
        {(
          [
            ['live', 'Bookings', () => navigation.navigate('LiveTab')],
            ['shield', 'Passport', () => navigation.navigate('Passport')],
            ['coin', 'Coins', () => navigation.navigate('Rewards')],
          ] as const
        ).map(([icon, label, onPress]) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            onPress={onPress}
            style={[styles.tile, { backgroundColor: c.card }]}
          >
            <Icon name={icon} size={22} color={c.ink} />
            <Text variant="smallStrong">{label}</Text>
          </Pressable>
        ))}
      </View>

      <Card>
        <Text variant="bodyStrong">Help in 2 minutes</Text>
        <Text variant="small" tone="muted">
          A real person replies in about 2 minutes, 8 AM to 9 PM.
        </Text>
        <View style={styles.helpRow}>
          <Button
            label="WhatsApp us"
            size="sm"
            style={styles.grow}
            onPress={async () => {
              if (!(await openWhatsApp())) toast("WhatsApp isn\u2019t available here.");
            }}
          />
          <Button
            label="Call"
            size="sm"
            variant="ghost"
            style={styles.grow}
            onPress={async () => {
              if (!(await call())) toast("Calling GoodMiles\u2026");
            }}
          />
        </View>
      </Card>

      <Card style={styles.list}>
        {ROWS.map((r, i) => (
          <Fragment key={r.label}>
            <Pressable
              accessibilityRole="button"
              onPress={() => r.to && navigation.navigate(r.to)}
              style={[
                styles.row,
                i > 0 && { borderTopWidth: layout.hairline, borderTopColor: c.line },
              ]}
            >
              <Icon name={r.icon} size={20} color={c.ink} />
              <Text variant="body" style={styles.grow}>
                {r.label}
              </Text>
              {r.label === 'Saved addresses' && address ? (
                <Text variant="small" tone="muted">
                  {address.label}
                </Text>
              ) : null}
              <Icon name="chev" size={16} color={c.ink} />
            </Pressable>
          </Fragment>
        ))}
      </Card>

      <Card style={styles.list}>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: isDark }}
          onPress={toggleTheme}
          style={styles.row}
        >
          <Icon name="moon" size={20} color={c.ink} />
          <Text variant="body" style={styles.grow}>
            Dark mode
          </Text>
          <Text variant="smallStrong" tone="muted">
            {isDark ? 'On' : 'Off'}
          </Text>
        </Pressable>
      </Card>

      {loggedIn ? (
        <Card style={styles.list}>
          <Pressable accessibilityRole="button" onPress={logout} style={styles.row}>
            <Icon name="logout" size={20} color={c.ink} />
            <Text variant="body" style={styles.grow}>
              Log out
            </Text>
          </Pressable>
        </Card>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: { color: '#ffffff' },
  tiles: { flexDirection: 'row', gap: 10 },
  tile: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: radius.lg,
  },
  helpRow: { flexDirection: 'row', gap: 8 },
  list: { paddingVertical: 0, gap: 0 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
});
