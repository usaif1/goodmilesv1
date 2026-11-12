import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Chip,
  Footer,
  Pill,
  Screen,
  ScreenHeader,
  Text,
} from '@/components';
import { useApp } from '@/store';

import type { RootScreenProps } from '@/navigation/types';

const ISSUES = [
  'Same problem is back',
  'New noise',
  'Leak or smell',
  'New scratch or dent',
  'Warning light',
  'Something else',
];

export function NotRightScreen({ navigation }: RootScreenProps<'NotRight'>) {
  const order = useApp(s => s.order);
  const [picked, setPicked] = useState<string[]>([]);
  const [safe, setSafe] = useState(true);

  return (
    <Screen
      header={
        <ScreenHeader
          title="Something not right?"
          subtitle="Check your warranty"
          onBack={navigation.goBack}
        />
      }
      footer={
        <Footer>
          <Button label="Send to Amit" onPress={navigation.goBack} />
        </Footer>
      }
    >
      <Card>
        <View style={styles.row}>
          <View style={styles.grow}>
            <Text variant="bodyStrong">
              Standard service · {order?.id ?? 'GM-24817'}
            </Text>
            <Text variant="small" tone="muted">
              Warranty runs 1 month from delivery
            </Text>
          </View>
          <Pill label="Covered" tone="ok" />
        </View>
      </Card>

      <Text variant="h3">What&rsquo;s happening?</Text>
      <View style={styles.chips}>
        {ISSUES.map(issue => (
          <Chip
            key={issue}
            label={issue}
            selected={picked.includes(issue)}
            onPress={() =>
              setPicked(v =>
                v.includes(issue) ? v.filter(x => x !== issue) : [...v, issue],
              )
            }
          />
        ))}
      </View>

      <Text variant="h3">Is the car safe to drive?</Text>
      <View style={styles.chips}>
        <Chip label="Yes" selected={safe} onPress={() => setSafe(true)} />
        <Chip label="No, come to me" selected={!safe} onPress={() => setSafe(false)} />
      </View>

      <View style={styles.actions}>
        <Button label="Record sound" size="sm" variant="ghost" icon="mic" style={styles.grow} />
        <Button label="Photo or video" size="sm" variant="ghost" icon="camera" style={styles.grow} />
      </View>

      <Card>
        <Text variant="bodyStrong">Free pickup and inspection</Text>
        <Text variant="small" tone="muted">
          If the issue is linked to our work, the fix is free.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actions: { flexDirection: 'row', gap: 8 },
});
