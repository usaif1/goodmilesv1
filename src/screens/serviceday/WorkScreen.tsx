import { StyleSheet, View } from 'react-native';

import { Card, Pill, Screen, ScreenHeader, Text } from '@/components';
import { WORK_RECORDS } from '@/data';
import { serviceClock } from '@/domain';
import { useApp } from '@/store';
import { Icon, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

/** From stage 5 everything approved is finished. */
const ALL_DONE_FROM = 5;
/** Before that, the prototype shows the first two jobs complete. */
const IN_PROGRESS_DONE = 2;

export function WorkScreen({ navigation }: RootScreenProps<'Work'>) {
  const { c } = useTheme();
  const order = useApp(s => s.order);
  const stage = useApp(s => s.stage);
  const approvedSel = useApp(s => s.approvedSel);

  const clock = serviceClock(order?.slot.win);
  const selection = approvedSel ?? { m1: true, m2: true };
  const ids = Object.keys(WORK_RECORDS).filter(id => selection[id]);
  const finished = stage >= ALL_DONE_FROM;
  const doneCount = finished ? ids.length : Math.min(IN_PROGRESS_DONE, ids.length);

  return (
    <Screen
      header={
        <ScreenHeader
          title={finished ? 'Work done' : 'Work in progress'}
          subtitle={`Bay 2 · ${doneCount} of ${ids.length} jobs done`}
          onBack={navigation.goBack}
        />
      }
    >
      {ids.map((id, k) => {
        const job = WORK_RECORDS[id];
        const ok = k < doneCount;
        return (
          <Card key={id}>
            <View style={styles.head}>
              <Text variant="h3" style={styles.grow}>
                {job.name}
              </Text>
              {ok ? (
                <View style={styles.doneRow}>
                  <Icon name="check" size={14} strokeWidth={2.6} color={c.muted} />
                  <Text variant="small" tone="muted">
                    Done · {clock.job(k)}
                  </Text>
                </View>
              ) : k === doneCount ? (
                <Pill label="In progress" tone="navy" />
              ) : (
                <Pill label="Next" />
              )}
            </View>

            {ok ? (
              <View style={styles.shots}>
                {job.shots.map(label => (
                  <View
                    key={label}
                    style={[
                      styles.shot,
                      { backgroundColor: c.bay },
                      job.shots.length === 1 && styles.shotWide,
                    ]}
                  >
                    <Icon name="camera" size={20} color={c.muted} />
                    <View style={[styles.stamp, { backgroundColor: c.card }]}>
                      <Text variant="meta" tone="ink" numberOfLines={1}>
                        {label}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}

            <Text variant="small" tone="muted">
              {ok ? job.record : 'Photos come up here when the job is done.'}
            </Text>
          </Card>
        );
      })}

      <Card>
        <View style={styles.head}>
          <Text variant="h3" style={styles.grow}>
            Road test, 6 km
          </Text>
          {finished ? (
            <View style={styles.doneRow}>
              <Icon name="check" size={14} strokeWidth={2.6} color={c.muted} />
              <Text variant="small" tone="muted">
                Done · {clock.road}
              </Text>
            </View>
          ) : (
            <Pill label="Next" />
          )}
        </View>
        {!finished ? (
          <Text variant="small" tone="muted">
            After the last job, about {clock.road}
          </Text>
        ) : null}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  doneRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  shots: { flexDirection: 'row', gap: 8 },
  shot: {
    flex: 1,
    aspectRatio: 4 / 3,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shotWide: { aspectRatio: 16 / 9 },
  stamp: {
    position: 'absolute',
    left: 6,
    bottom: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
});
