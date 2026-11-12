import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { Card, Screen, ScreenHeader, Text } from '@/components';
import { Icon, layout, useTheme, type IconName } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

/** [icon, title, body, when] */
const UPDATES: [IconName, string, string, string][] = [
  ['user', 'Amit', 'How’s the Creta driving after the service?', 'Today'],
  [
    'coin',
    '₹300 in coins added',
    'Use them on your next service. Valid for 8 months.',
    'Yesterday',
  ],
  [
    'clock',
    'PUC expires in 13 days',
    'Book a PUC check with your next service.',
    '15 Oct',
  ],
  [
    'snow',
    'AC cooling has dropped',
    'Vent air measured 15°C at your last service.',
    '12 Oct',
  ],
];

export function NotificationsScreen({
  navigation,
}: RootScreenProps<'Notifications'>) {
  const { c } = useTheme();
  return (
    <Screen header={<ScreenHeader title="Updates" onBack={navigation.goBack} />}>
      <Text variant="meta" tone="muted">
        Example updates
      </Text>
      <Card style={styles.list}>
        {UPDATES.map(([icon, title, body, when], i) => (
          <Fragment key={title}>
            <View
              style={[
                styles.row,
                i > 0 && { borderTopWidth: layout.hairline, borderTopColor: c.line },
              ]}
            >
              <View style={[styles.bubble, { backgroundColor: c.bay }]}>
                <Icon name={icon} size={18} color={c.ink} />
              </View>
              <View style={styles.grow}>
                <Text variant="bodyStrong">{title}</Text>
                <Text variant="small" tone="muted">
                  {body}
                </Text>
              </View>
              <Text variant="meta" tone="muted">
                {when}
              </Text>
            </View>
          </Fragment>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  list: { paddingVertical: 0, gap: 0 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 14 },
  bubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
