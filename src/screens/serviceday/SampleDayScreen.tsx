import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Divider, Footer, IconButton, Pill, Text } from '@/components';
import { SAMPLE_ANGLES, SAMPLE_CHAPTERS, SAMPLE_DAY } from '@/data';
import { inr } from '@/domain';
import { Icon, layout, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const LAST = SAMPLE_CHAPTERS.length;

export function SampleDayScreen({ navigation }: RootScreenProps<'SampleDay'>) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  const [chapter, setChapter] = useState(0);
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [zoom, setZoom] = useState<number | null>(null);
  const [proof, setProof] = useState<string | null>(null);
  const [tag, setTag] = useState<number | null>(null);

  const total =
    SAMPLE_DAY.base.price +
    SAMPLE_DAY.extras.filter(e => picked[e.id]).reduce((a, e) => a + e.price, 0);
  const parts = [
    'Oil filter',
    'Air filter',
    ...(picked.pads ? ['Front brake pads'] : []),
  ];
  const done = chapter === LAST;

  const go = (k: number) => {
    setChapter(Math.max(0, Math.min(LAST, k)));
    setZoom(null);
    setProof(null);
    setTag(null);
  };

  return (
    <View style={[styles.fill, { backgroundColor: c.page }]}>
      <View
        style={[
          styles.head,
          { backgroundColor: c.card, borderBottomColor: c.line, paddingTop: insets.top + 8 },
        ]}
      >
        <View style={styles.headRow}>
          <View style={[styles.sampleTag, { backgroundColor: c.bay }]}>
            <Icon name="eye" size={12} color={c.ink} />
            <Text variant="meta" tone="ink">
              Sample · not your car
            </Text>
          </View>
          <Text variant="small" tone="muted" style={styles.grow} numberOfLines={1}>
            {SAMPLE_DAY.car}
          </Text>
          <IconButton
            name="close"
            size={20}
            plain
            accessibilityLabel="Close sample"
            onPress={navigation.goBack}
          />
        </View>

        <View style={styles.steps} accessibilityRole="tablist">
          {SAMPLE_CHAPTERS.map((label, i) => {
            const past = i < chapter;
            const now = i === chapter;
            return (
              <Pressable
                key={label}
                accessibilityRole="tab"
                accessibilityState={{ selected: now }}
                onPress={() => go(i)}
                style={styles.step}
              >
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: past || now ? c.sel : c.line2 },
                  ]}
                />
                <Text
                  variant={now ? 'smallStrong' : 'small'}
                  tone={now ? 'ink' : 'muted'}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {done ? (
          <>
            <View style={[styles.tick, { backgroundColor: c.sel }]}>
              <Icon name="check" size={34} strokeWidth={2.6} color="#ffffff" />
            </View>
            <Text variant="h1">That&rsquo;s the day.</Text>
            <Text variant="body" tone="muted">
              You approved {inr(total)}. You paid {inr(total)}. Not a rupee more.
            </Text>
            <Card>
              {[
                ['Nothing started without your OK', `You approved at ${SAMPLE_DAY.approvedAt}`],
                ['A photo of every job', 'Before and after, as it happened'],
                [`${parts.length} old parts back, labelled`, parts.join(', ')],
              ].map(([title, detail]) => (
                <View key={title} style={styles.summaryRow}>
                  <Icon name="check" size={16} strokeWidth={2.4} color={c.ink} />
                  <View style={styles.grow}>
                    <Text variant="bodyStrong">{title}</Text>
                    <Text variant="small" tone="muted">
                      {detail}
                    </Text>
                  </View>
                </View>
              ))}
            </Card>
            <Pressable accessibilityRole="button" onPress={() => go(0)}>
              <Text variant="smallStrong" style={styles.replay}>
                Play again
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <View style={styles.clock}>
              <Text variant="h3">{SAMPLE_DAY.times[chapter]}</Text>
              <Text variant="small" tone="muted">
                Amit ·{' '}
                {chapter === 0 ? `sent ${SAMPLE_DAY.driver}` : 'your Guardian'}
              </Text>
            </View>

            {chapter === 0 ? (
              <>
                <View style={[styles.hero, { backgroundColor: c.bay }]}>
                  <Icon name="camera" size={32} color={c.muted} />
                  <View style={[styles.chip, { backgroundColor: c.card }]}>
                    <Text variant="meta" tone="ink">
                      Code {SAMPLE_DAY.code}
                    </Text>
                  </View>
                </View>
                <Text variant="h2">
                  {SAMPLE_DAY.driver} photographs your car before he drives it.
                </Text>
                <Text variant="body" tone="muted">
                  Amit, your Guardian, sent him. Old marks are noted with you,
                  and keys change hands only against your 4-digit code.
                </Text>
                <View style={styles.grid}>
                  {SAMPLE_ANGLES.map((angle, i) => (
                    <Pressable
                      key={angle}
                      accessibilityRole="button"
                      onPress={() => setZoom(zoom === i ? null : i)}
                      style={[
                        styles.tile,
                        {
                          backgroundColor: c.bay,
                          borderColor: zoom === i ? c.sel : 'transparent',
                        },
                      ]}
                    >
                      <Icon name="camera" size={18} color={c.muted} />
                      <View style={[styles.stamp, { backgroundColor: c.card }]}>
                        <Text variant="meta" tone="ink" numberOfLines={1}>
                          {angle}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
                {zoom !== null ? (
                  <Card variant="outlined">
                    <Text variant="small">
                      {SAMPLE_ANGLES[zoom]} · recorded at {SAMPLE_DAY.times[0]},
                      before the car moved.
                    </Text>
                  </Card>
                ) : null}
              </>
            ) : null}

            {chapter === 1 ? (
              <>
                <Text variant="h2">Amit found 2 things on your car. You decide.</Text>
                <Text variant="body" tone="muted">
                  Each has a photo and a price. Nothing extra starts without your
                  OK.
                </Text>
                <Card>
                  <View style={styles.lineRow}>
                    <View style={[styles.lockTick, { backgroundColor: c.bay }]}>
                      <Icon name="check" size={14} strokeWidth={3} color={c.ink} />
                    </View>
                    <View style={styles.grow}>
                      <Text variant="bodyStrong">{SAMPLE_DAY.base.name}</Text>
                      <Text variant="small" tone="muted">
                        You booked this · price locked
                      </Text>
                    </View>
                    <Text variant="bodyStrong">{inr(SAMPLE_DAY.base.price)}</Text>
                  </View>

                  {SAMPLE_DAY.extras.map(extra => (
                    <View key={extra.id}>
                      <Divider />
                      <View style={styles.extra}>
                        <View style={styles.extraHead}>
                          <Text variant="bodyStrong" style={styles.grow}>
                            {extra.name}
                          </Text>
                          <Pill
                            label={extra.tag}
                            tone={extra.tag === 'Fix now' ? 'navy' : 'default'}
                          />
                        </View>
                        <Text variant="small" tone="muted">
                          {extra.note}
                        </Text>
                        <Pressable
                          accessibilityRole="button"
                          onPress={() =>
                            setProof(proof === extra.id ? null : extra.id)
                          }
                        >
                          <Text variant="smallStrong" style={styles.replay}>
                            {proof === extra.id ? 'Hide the photo' : 'See the photo'}
                          </Text>
                        </Pressable>
                        {proof === extra.id ? (
                          <View style={[styles.proof, { backgroundColor: c.bay }]}>
                            <Icon name="camera" size={22} color={c.muted} />
                            <View style={[styles.stamp, { backgroundColor: c.card }]}>
                              <Text variant="meta" tone="ink">
                                Photo at {SAMPLE_DAY.times[1]}
                              </Text>
                            </View>
                          </View>
                        ) : null}
                        <View style={styles.choice}>
                          {[true, false].map(add => {
                            const on = picked[extra.id] === add;
                            return (
                              <Pressable
                                key={String(add)}
                                accessibilityRole="button"
                                accessibilityState={{ selected: on }}
                                onPress={() =>
                                  setPicked(p => ({ ...p, [extra.id]: add }))
                                }
                                style={[
                                  styles.choiceButton,
                                  {
                                    backgroundColor: on ? c.sel : c.card,
                                    borderColor: on ? c.sel : c.line,
                                  },
                                ]}
                              >
                                <Text
                                  variant="smallStrong"
                                  style={{ color: on ? '#ffffff' : c.ink }}
                                >
                                  {add ? `Add · ${inr(extra.price)}` : 'Skip'}
                                </Text>
                              </Pressable>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  ))}

                  <Divider />
                  <View style={styles.totalRow}>
                    <Text variant="small" tone="muted">
                      Total you approve
                    </Text>
                    <Text variant="h2" style={styles.total}>
                      {inr(total)}
                    </Text>
                  </View>
                </Card>
              </>
            ) : null}

            {chapter === 2 ? (
              <>
                <View style={[styles.hero, { backgroundColor: c.bay }]}>
                  <Icon name="camera" size={32} color={c.muted} />
                  <View style={[styles.stamp, { backgroundColor: c.card }]}>
                    <Text variant="meta" tone="ink">
                      {picked.pads
                        ? 'Old 2 mm · New 10 mm'
                        : 'New oil, sealed can opened on camera · 11:40'}
                    </Text>
                  </View>
                </View>
                <Text variant="h2">Every job you approved, photographed.</Text>
                <Text variant="body" tone="muted">
                  Before and after, as each job finishes. Find something new? We
                  stop and ask you first.
                </Text>
              </>
            ) : null}

            {chapter === 3 ? (
              <>
                <View style={[styles.hero, { backgroundColor: c.bay }]}>
                  <Icon name="box" size={32} color={c.muted} />
                </View>
                <View style={styles.tags}>
                  {parts.map((part, i) => (
                    <Pressable
                      key={part}
                      accessibilityRole="button"
                      onPress={() => setTag(tag === i ? null : i)}
                      style={[
                        styles.partTag,
                        {
                          backgroundColor: tag === i ? c.sel : c.card,
                          borderColor: tag === i ? c.sel : c.line,
                        },
                      ]}
                    >
                      <Text
                        variant="meta"
                        style={{ color: tag === i ? '#ffffff' : c.ink }}
                      >
                        {i + 1}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Text variant="h2">Your car is back. So are your old parts.</Text>
                <Text variant="body" tone="muted">
                  Each label matches a line on your bill.
                </Text>
                {tag !== null ? (
                  <Card variant="outlined">
                    <Text variant="small">
                      <Text variant="smallStrong">{parts[tag]}</Text> is on your
                      bill, and in the box with the same number.
                    </Text>
                  </Card>
                ) : null}
              </>
            ) : null}

            {chapter === 4 ? (
              <>
                <Text variant="h2">
                  You pay {inr(total)}. Exactly what you approved.
                </Text>
                <Text variant="body" tone="muted">
                  Your first rupee is today, by UPI, with the car already home.
                </Text>
                <Card>
                  <View style={styles.totalRow}>
                    <Text variant="body">{SAMPLE_DAY.base.name}</Text>
                    <Text variant="bodyStrong">{inr(SAMPLE_DAY.base.price)}</Text>
                  </View>
                  {SAMPLE_DAY.extras
                    .filter(e => picked[e.id])
                    .map(e => (
                      <View key={e.id} style={styles.totalRow}>
                        <Text variant="body">{e.name}</Text>
                        <Text variant="bodyStrong">{inr(e.price)}</Text>
                      </View>
                    ))}
                  <Divider />
                  <View style={styles.totalRow}>
                    <Text variant="h3">Paid</Text>
                    <Text variant="h3">{inr(total)}</Text>
                  </View>
                </Card>
              </>
            ) : null}
          </>
        )}
      </ScrollView>

      <Footer>
        {done ? (
          <>
            <Button
              label="Book a service for my car"
              onPress={() => navigation.navigate('Main')}
            />
            <Text variant="small" tone="muted" style={styles.centre}>
              ₹0 to book · pay after you approve
            </Text>
          </>
        ) : (
          <Button
            label={
              chapter === LAST - 1
                ? 'See the day in full'
                : `Next: ${SAMPLE_CHAPTERS[chapter + 1]}`
            }
            onPress={() => go(chapter + 1)}
          />
        )}
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  grow: { flex: 1, minWidth: 0 },
  centre: { textAlign: 'center' },
  head: { paddingHorizontal: 16, paddingBottom: 10, borderBottomWidth: layout.hairline, gap: 10 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sampleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  steps: { flexDirection: 'row', gap: 4 },
  step: { flex: 1, alignItems: 'center', gap: 4 },
  dot: { width: '100%', height: 3, borderRadius: 2 },
  body: { padding: 16, paddingBottom: 32, gap: 12 },
  clock: { gap: 2 },
  hero: {
    height: 200,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    position: 'absolute',
    left: 10,
    top: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  stamp: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tile: {
    width: '48.5%',
    aspectRatio: 4 / 3,
    borderRadius: radius.sm,
    borderWidth: layout.chipBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  lockTick: {
    width: 24,
    height: 24,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extra: { gap: 8, paddingVertical: 4 },
  extraHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  replay: { textDecorationLine: 'underline' },
  proof: {
    height: 150,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choice: { flexDirection: 'row', gap: 8 },
  choiceButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: radius.lg,
    borderWidth: layout.chipBorder,
  },
  totalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  total: { fontSize: 20 },
  tick: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  tags: { flexDirection: 'row', gap: 8 },
  partTag: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: layout.chipBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
