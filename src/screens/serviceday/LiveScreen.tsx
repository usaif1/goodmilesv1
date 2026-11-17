import { Fragment, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
  Button,
  CancelSheet,
  Card,
  IconButton,
  Pill,
  Screen,
  ScreenHeader,
  Text,
  useToast,
} from '@/components';
import { openWhatsApp } from '@/lib';
import { SAMPLE_CHAPTERS, STAGES, STAGE_ACTIONS } from '@/data';
import { serviceClock } from '@/domain';
import { CANCELLABLE_UNTIL, useApp } from '@/store';
import { Icon, layout, useTheme } from '@/theme';

import type { TabScreenProps } from '@/navigation/types';

/**
 * Which screen each stage opens, where it has one. Only routes that
 * take no params, so the stage rows can navigate without a cast.
 */
type StageRoute =
  | 'CarPhotos'
  | 'Estimate'
  | 'Work'
  | 'Delivery'
  | 'Bill'
  | 'Pickup';

const DESTINATION: Record<string, StageRoute> = {
  carphotos: 'CarPhotos',
  estimate: 'Estimate',
  work: 'Work',
  delivery: 'Delivery',
  bill: 'Bill',
  pickup: 'Pickup',
};

export function LiveScreen({ navigation }: TabScreenProps<'LiveTab'>) {
  const { c } = useTheme();
  const order = useApp(s => s.order);
  const stage = useApp(s => s.stage);
  const car = useApp(s => s.car);
  const advanceStage = useApp(s => s.advanceStage);
  const cancelOrder = useApp(s => s.cancelOrder);
  const { toast } = useToast();
  const cancelSheet = useRef<BottomSheetModal>(null);

  if (!order) {
    return (
      <Screen
        header={
          <ScreenHeader
            root
            title="Bookings"
            subtitle="No bookings yet"
            right={
              <IconButton
                name="help"
                plain
                accessibilityLabel="Help in 2 minutes"
                onPress={() => navigation.navigate('Help')}
              />
            }
          />
        }
      >
        <Card>
          <View style={styles.emptyRow}>
            <View style={styles.grow}>
              <Text variant="bodyStrong">Nothing booked yet</Text>
              <Text variant="small" tone="muted">
                ₹0 to book. Pay after you approve.
              </Text>
            </View>
            <Button
              label="Book"
              size="sm"
              onPress={() => navigation.navigate('HomeTab')}
            />
          </View>
        </Card>

        {/*
          With nothing to track, the prototype offers the sample day
          instead of an empty screen - the customer approves a sample
          estimate themselves, so the promise is shown rather than told.
        */}
        <Card>
          <View style={styles.sampleHead}>
            <Pill label="Sample · a Creta's service day" />
            <Text variant="small" tone="muted">
              1 min
            </Text>
          </View>
          <Text variant="bodyStrong">
            Amit found 2 more jobs. Nothing starts without your OK.
          </Text>
          <View style={styles.chapters}>
            {SAMPLE_CHAPTERS.map(ch => (
              <Text key={ch} variant="small" tone="muted">
                · {ch}
              </Text>
            ))}
          </View>
          <Button
            label="Play the sample day"
            variant="ghost"
            onPress={() => navigation.navigate('SampleDay')}
          />
          <Text variant="small" tone="muted">
            You approve a sample estimate yourself. Nothing is booked or
            charged.
          </Text>
        </Card>
      </Screen>
    );
  }

  const clock = serviceClock(order.slot.win);
  const times = [
    '',
    '',
    clock.pickup,
    clock.estimate,
    clock.work,
    clock.done,
    clock.back,
    clock.delivered,
    clock.paid,
    clock.recorded,
  ];

  return (
    <>
    <Screen
      header={
        <ScreenHeader
          root
          title="Bookings"
          subtitle={`${car ? car.model + ' · ' : ''}${order.id}`}
          right={
            <IconButton
              name="help"
              plain
              accessibilityLabel="Help in 2 minutes"
              onPress={() => navigation.navigate('Help')}
            />
          }
        />
      }
    >
      <Card>
        <View style={styles.nowRow}>
          <Pill label={`Live · ${order.id}`} tone="navy" />
          {/*
            The prototype hides stage-stepping behind a long press on the
            order number so it never shows up as a customer control.
          */}
          <Pressable
            onLongPress={advanceStage}
            delayLongPress={600}
            accessibilityLabel="Order number"
            hitSlop={8}
          >
            <Text variant="small" tone="muted">
              {stage < STAGES.length - 1 ? 'In progress' : 'Complete'}
            </Text>
          </Pressable>
        </View>
        <Text variant="h3">{STAGES[stage]?.[0]}</Text>
        <Text variant="small" tone="muted">
          {STAGES[stage]?.[1]}
        </Text>
      </Card>

      <Card>
        {STAGES.map(([title, detail, screen], i) => {
          const done = i < stage;
          const now = i === stage;
          const dest = screen ? DESTINATION[screen] : undefined;
          const openable = (done || now) && dest;
          return (
            <Fragment key={title}>
              <Pressable
                accessibilityRole={openable ? 'button' : 'text'}
                disabled={!openable}
                onPress={() => openable && navigation.navigate(dest)}
                style={[
                  styles.stage,
                  i > 0 && { borderTopWidth: layout.hairline, borderTopColor: c.line },
                ]}
              >
                <View
                  style={[
                    styles.node,
                    {
                      backgroundColor: done ? c.sel : now ? c.card : c.card,
                      borderColor: now || done ? c.sel : c.ctlLine,
                      borderWidth: now ? 3 : done ? 0 : 2,
                    },
                  ]}
                >
                  {done ? (
                    <Icon name="check" size={12} strokeWidth={3} color="#ffffff" />
                  ) : null}
                </View>
                <View style={styles.grow}>
                  <Text variant={now ? 'bodyStrong' : 'body'} tone={done || now ? 'ink' : 'muted'}>
                    {title}
                  </Text>
                  {now ? (
                    <Text variant="small" tone="muted">
                      {detail}
                    </Text>
                  ) : null}
                </View>
                {times[i] ? (
                  <Text variant="meta" tone="muted">
                    {times[i]}
                  </Text>
                ) : null}
                {openable ? <Icon name="chev" size={14} color={c.ink} /> : null}
              </Pressable>
            </Fragment>
          );
        })}
      </Card>

      {STAGES[stage]?.[2] && DESTINATION[STAGES[stage][2]!] ? (
        <Button
          label={STAGE_ACTIONS[stage]}
          onPress={() => navigation.navigate(DESTINATION[STAGES[stage][2]!])}
        />
      ) : null}

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={async () => {
            if (!(await openWhatsApp('Hi GoodMiles, about my booking.'))) {
              toast('WhatsApp isn\u2019t available here.');
            }
          }}
        >
          <Text variant="smallStrong" style={styles.link}>
            Message Amit
          </Text>
        </Pressable>

        {/*
          Only while the promise still holds. Past the inspection the
          work has started, so the link would offer something we have
          said three times over that we cannot do.
        */}
        {stage <= CANCELLABLE_UNTIL ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => cancelSheet.current?.present()}
          >
            <Text variant="smallStrong" style={styles.link}>
              Reschedule or cancel
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Screen>

    <CancelSheet
      ref={cancelSheet}
      onClose={() => cancelSheet.current?.dismiss()}
      onConfirm={() => {
        cancelSheet.current?.dismiss();
        cancelOrder();
        toast('Booking cancelled. Your Guardian will message you to confirm.');
      }}
    />
    </>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  emptyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sampleHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  chapters: { gap: 2 },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 20, paddingTop: 4 },
  link: { textDecorationLine: 'underline' },
  nowRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stage: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  node: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
