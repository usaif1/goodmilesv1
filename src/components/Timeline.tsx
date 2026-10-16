import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color, space, type } from '@/theme';

export type StepState = 'done' | 'active' | 'pending';

export type TimelineStep = {
  label: string;
  /** Timestamp, e.g. "9 Oct, 3:22 PM". Absent for steps not reached. */
  at?: string;
  state: StepState;
};

type Props = { steps: readonly TimelineStep[] };

/**
 * The nine-step order timeline on C11. Completed steps take the brand
 * green, the step awaiting the customer takes the warning orange with
 * a ring around it, and steps not yet reached are grey-300.
 *
 * The connector stays grey-300 throughout, including between completed
 * steps. Sampling C11's gutter confirms this: #0F766E dot, #D0D5DD
 * line, #0F766E dot. Filling it to show progress would read better,
 * but the design does not do that and this follows the design.
 */
export function Timeline({ steps }: Props) {
  return (
    <View>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const dot = DOT[step.state];
        return (
          <Fragment key={step.label}>
            <View style={s.row}>
              <View style={s.gutter}>
                {step.state === 'active' && <View style={s.ring} />}
                <View style={[s.dot, { backgroundColor: dot }]} />
              </View>
              <View style={s.body}>
                <Text
                  style={
                    step.state === 'pending' ? s.labelPending : s.label
                  }>
                  {step.label}
                </Text>
                {step.at ? <Text style={s.at}>{step.at}</Text> : null}
              </View>
            </View>
            {!last && (
              <View style={s.connectorRow}>
                <View style={s.connector} />
              </View>
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const DOT: Record<StepState, string> = {
  done: color.brand,
  active: color.warning,
  pending: color.pending,
};

const GUTTER = 28;

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space.md },
  gutter: { width: GUTTER, alignItems: 'center', justifyContent: 'center' },
  /** C11's dots measure 15pt across. */
  dot: { width: 15, height: 15, borderRadius: 7.5 },
  ring: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: color.warningRing,
  },
  body: { flex: 1, paddingBottom: space.xs },
  label: type.h2,
  labelPending: { ...type.h2, color: color.textMuted },
  at: { ...type.meta, marginTop: 2 },
  connectorRow: { width: GUTTER, alignItems: 'center' },
  connector: { width: 2, height: space.xl, backgroundColor: color.pending },
});
