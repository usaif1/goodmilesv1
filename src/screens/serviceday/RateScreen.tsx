import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button, Chip, Footer, Screen, ScreenHeader, Text } from '@/components';
import { useApp } from '@/store';
import { Icon, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const LABELS = ['', 'Very poor', 'Poor', 'Okay', 'Good', 'Excellent'];

const GOOD = [
  'On time',
  'Clear photos and updates',
  'Bill matched the estimate',
  'Old parts returned',
  'Amit was helpful',
  'Car came back clean',
];
const BAD = ['Late', 'Bill higher than expected', 'Work quality', 'Communication'];

export function RateScreen({ navigation }: RootScreenProps<'Rate'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const rating = useApp(s => s.rating);
  const rate = useApp(s => s.rate);
  const advanceStage = useApp(s => s.advanceStage);

  const [stars, setStars] = useState(rating ?? 0);
  const [tags, setTags] = useState<string[]>([]);

  const good = stars >= 4;
  const options = good ? GOOD : BAD;

  const finish = () => {
    rate(stars);
    advanceStage();
    navigation.navigate('Main');
  };

  return (
    <Screen
      header={<ScreenHeader title="Rate your service" onBack={navigation.goBack} />}
      footer={
        <Footer>
          <Button label="Done" onPress={finish} disabled={!stars} />
        </Footer>
      }
    >
      <View style={styles.head}>
        <View style={[styles.avatar, { backgroundColor: c.bay }]}>
          <Icon name="user" size={28} color={c.muted} />
        </View>
        <Text variant="h3">How was your service with Amit?</Text>
        <Text variant="small" tone="muted">
          {car ? `${car.brand} ${car.model}` : 'Your car'}
        </Text>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map(i => (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`${i} star${i > 1 ? 's' : ''}`}
              onPress={() => setStars(i)}
              hitSlop={4}
            >
              <Icon
                name="star"
                size={38}
                strokeWidth={stars >= i ? 2.6 : 1.8}
                color={stars >= i ? c.sel : c.ctlLine}
              />
            </Pressable>
          ))}
        </View>
        <Text variant={stars ? 'bodyStrong' : 'body'} tone={stars ? 'ink' : 'muted'}>
          {stars ? LABELS[stars] : 'Tap a star'}
        </Text>
      </View>

      {stars ? (
        <View style={styles.tagBlock}>
          <Text variant="h3">{good ? 'What went well?' : 'What went wrong?'}</Text>
          <View style={styles.tags}>
            {options.map(t => (
              <Chip
                key={t}
                label={t}
                selected={tags.includes(t)}
                onPress={() =>
                  setTags(v => (v.includes(t) ? v.filter(x => x !== t) : [...v, t]))
                }
              />
            ))}
          </View>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { alignItems: 'center', gap: 8, paddingTop: 8 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stars: { flexDirection: 'row', gap: 6, marginTop: 4 },
  tagBlock: { gap: 12, paddingTop: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
