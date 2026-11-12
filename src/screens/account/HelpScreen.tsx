import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button, Card, Divider, Screen, ScreenHeader, Text } from '@/components';
import { HELP_TOPICS } from '@/data';
import { Icon, layout, radius, useTheme, type IconName } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

export function HelpScreen({ navigation }: RootScreenProps<'Help'>) {
  const { c } = useTheme();
  const [topic, setTopic] = useState<number | null>(null);
  const [question, setQuestion] = useState<number | null>(null);

  return (
    <Screen header={<ScreenHeader title="Help centre" onBack={navigation.goBack} />}>
      <View style={styles.grid}>
        {HELP_TOPICS.map(([icon, name], i) => {
          const on = topic === i;
          return (
            <Pressable
              key={name}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => {
                setTopic(on ? null : i);
                setQuestion(null);
              }}
              style={[
                styles.topic,
                {
                  backgroundColor: c.card,
                  borderColor: on ? c.sel : c.line,
                  borderWidth: on ? layout.chipBorder : layout.hairline,
                },
              ]}
            >
              <Icon name={icon as IconName} size={20} color={c.ink} />
              <Text variant="bodyStrong">{name}</Text>
            </Pressable>
          );
        })}
      </View>

      {topic !== null ? (
        <Card>
          <Text variant="h3">{HELP_TOPICS[topic][1]}</Text>
          {HELP_TOPICS[topic][2].map(([q, a], i) => (
            <View key={q}>
              {i > 0 ? <Divider /> : null}
              <Pressable
                accessibilityRole="button"
                onPress={() => setQuestion(question === i ? null : i)}
                style={styles.question}
              >
                <Text variant="bodyStrong" style={styles.grow}>
                  {q}
                </Text>
                <Icon name="down" size={16} strokeWidth={2.2} color={c.ink} />
              </Pressable>
              {question === i ? (
                <Text variant="small" tone="muted" style={styles.answer}>
                  {a}
                </Text>
              ) : null}
            </View>
          ))}
        </Card>
      ) : null}

      <Card style={{ backgroundColor: c.navy }}>
        <Text variant="bodyStrong" tone="onDark">
          Still need help?
        </Text>
        <Text variant="small" style={styles.onNavy}>
          A real person answers in 2 minutes, 8 AM–9 PM.
        </Text>
        <Button label="WhatsApp us" size="sm" variant="ghost" />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  topic: {
    width: '48.5%',
    gap: 10,
    padding: 14,
    borderRadius: radius.lg,
  },
  question: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
  answer: { paddingBottom: 10 },
  onNavy: { color: '#c2cbdb' },
});
