import { useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
  Button,
  Card,
  Footer,
  Pill,
  Screen,
  ScreenHeader,
  Sheet,
  Text,
} from '@/components';
import {
  ESTIMATE_IMPROVE,
  ESTIMATE_MUST,
  SYMPTOM_FINDINGS,
  serviceById,
  type EstimateItem,
} from '@/data';
import { inr, priceFor } from '@/domain';
import { useApp } from '@/store';
import { Icon, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

export function EstimateScreen({ navigation }: RootScreenProps<'Estimate'>) {
  const { c } = useTheme();
  const car = useApp(s => s.car);
  const order = useApp(s => s.order);
  const approved = useApp(s => s.approved);
  const approvedSel = useApp(s => s.approvedSel);
  const symptoms = useApp(s => s.symptoms);
  const approve = useApp(s => s.approve);
  const advanceStage = useApp(s => s.advanceStage);

  const sheet = useRef<BottomSheetModal>(null);
  const [explaining, setExplaining] = useState<EstimateItem | null>(null);

  // Only the booked line is ticked to start; everything else is opt-in.
  const [selected, setSelected] = useState<Record<string, boolean>>({ m1: true });
  const done = approved !== null;

  const priceOf = useMemo(
    () => (item: EstimateItem) => {
      const service = serviceById(item.serviceId);
      const p = service ? priceFor(service, car) : null;
      return p ?? item.fallback;
    },
    [car],
  );

  const ticked = (item: EstimateItem) =>
    done && approvedSel ? !!approvedSel[item.id] : !!selected[item.id];

  const all = [...ESTIMATE_MUST, ...ESTIMATE_IMPROVE];
  const total = all.filter(ticked).reduce((a, x) => a + priceOf(x), 0);
  const bookedTotal = all
    .filter(x => x.booked)
    .reduce((a, x) => a + priceOf(x), 0);
  const extra = total - bookedTotal;

  const told = symptoms.filter(s => SYMPTOM_FINDINGS[s]);

  const confirm = () => {
    approve(total, selected);
    advanceStage();
    navigation.goBack();
  };

  const row = (item: EstimateItem) => {
    const on = ticked(item);
    const locked = !!item.booked || done;
    return (
      <View key={item.id} style={styles.row}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: on, disabled: locked }}
          accessibilityLabel={item.name}
          disabled={locked}
          onPress={() => setSelected(s => ({ ...s, [item.id]: !s[item.id] }))}
          style={[
            styles.tick,
            {
              backgroundColor: item.booked ? c.bay : on ? c.sel : c.card,
              borderColor: item.booked ? c.bay : on ? c.sel : c.ctlLine,
            },
          ]}
        >
          {on ? (
            <Icon
              name="check"
              size={14}
              strokeWidth={3}
              color={item.booked ? c.ink : '#ffffff'}
            />
          ) : null}
        </Pressable>

        <View style={styles.grow}>
          <View style={styles.titleRow}>
            <Text variant="h3" style={styles.grow}>
              {item.name}
            </Text>
            <Text variant="h3">{inr(priceOf(item))}</Text>
          </View>
          <Text variant="small" tone="muted">
            {item.note}
          </Text>
          {item.gain ? (
            <View style={styles.gain}>
              <Icon name="plus" size={14} strokeWidth={2.6} color={c.ok} />
              <Text variant="small" style={{ color: c.ok }}>
                {item.gain}
              </Text>
            </View>
          ) : null}
          {item.wait ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setExplaining(item);
                sheet.current?.present();
              }}
            >
              <Text variant="smallStrong" style={styles.link}>
                What if I wait?
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <>
      <Screen
        header={
          <ScreenHeader
            title="Estimate"
            subtitle={order ? `${car ? car.model + ' · ' : ''}${order.id}` : 'Example'}
            onBack={navigation.goBack}
          />
        }
        footer={
          <Footer
            total={{
              label: extra ? `+${inr(extra)} on booked` : 'Total, incl. GST',
              value: inr(total),
            }}
          >
            {done ? (
              <Button
                label="Back to booking"
                style={styles.grow}
                onPress={navigation.goBack}
              />
            ) : (
              <Button
                label={extra ? 'Approve' : 'Only what I booked'}
                style={styles.grow}
                onPress={confirm}
              />
            )}
          </Footer>
        }
      >
        {done ? (
          <Card>
            <Text variant="bodyStrong">You approved {inr(approved)}</Text>
            <Text variant="small" tone="muted">
              Work has started. You&rsquo;ll see before and after photos for
              each job.
            </Text>
          </Card>
        ) : (
          <Text variant="small" style={{ color: c.ink2 }}>
            Tick what you want done. Nothing extra happens without your OK.
          </Text>
        )}

        {told.length ? (
          <Card>
            <Text variant="h3">You told Amit, he found</Text>
            {told.map(s => (
              <View key={s} style={styles.found}>
                <Text variant="small" tone="muted">
                  You said: {s.toLowerCase()}
                </Text>
                <Text variant="smallStrong">{SYMPTOM_FINDINGS[s]}</Text>
              </View>
            ))}
          </Card>
        ) : null}

        <Card>{ESTIMATE_MUST.filter(x => x.booked).map(row)}</Card>

        <Card>
          <View style={styles.bandRow}>
            <Pill label="Fix now" tone="navy" />
            <Text variant="small" tone="muted">
              Needed for safety
            </Text>
          </View>
          {ESTIMATE_MUST.filter(x => !x.booked).map(row)}
        </Card>

        <Card>
          <View style={styles.bandRow}>
            <Pill label="Can wait" />
            <Text variant="small" tone="muted">
              Worth doing, not urgent
            </Text>
          </View>
          {ESTIMATE_IMPROVE.map(row)}
        </Card>
      </Screen>

      <Sheet
        ref={sheet}
        title="What if I wait?"
        subtitle={explaining?.name}
        snapPoints={['40%']}
        onClose={() => sheet.current?.dismiss()}
        footer={
          <Button label="Got it" onPress={() => sheet.current?.dismiss()} />
        }
      >
        <Card variant="outlined">
          <Text variant="body">{explaining?.wait}</Text>
        </Card>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 6 },
  tick: {
    width: 24,
    height: 24,
    marginTop: 2,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  gain: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  link: { textDecorationLine: 'underline', marginTop: 4 },
  found: { gap: 2, paddingVertical: 6 },
  bandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
