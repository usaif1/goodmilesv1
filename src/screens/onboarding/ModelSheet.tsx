import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Button, Sheet, Text } from '@/components';
import { MODELS, fuelsFor, transmissionsFor, yearsFor } from '@/data';
import type { Car } from '@/domain';
import { Icon, layout, radius, useTheme } from '@/theme';

export type ModelSheetProps = {
  brand: string | null;
  onClose: () => void;
  onPick: (car: Car) => void;
};

type Step = 'fuel' | 'trans' | 'year';

const SUBTITLE: Record<string, string> = {
  Manual: 'Clutch pedal',
  Automatic: 'AMT, CVT or DCT',
};

/**
 * Model, then fuel, gearbox and year. The options narrow to what each
 * model was actually sold with, and where only one remains it is filled
 * in rather than asked - a Windsor EV has no petrol option to offer and
 * no manual to choose.
 *
 * This matters beyond tidiness: the year band is a price multiplier, so
 * a combination that never existed still produces a confident number.
 */
export const ModelSheet = forwardRef<BottomSheetModal, ModelSheetProps>(
  function ModelSheetBase({ brand, onClose, onPick }, ref) {
    const { c } = useTheme();
    const [model, setModel] = useState<string | null>(null);
    const [fuel, setFuel] = useState<string | null>(null);
    const [trans, setTrans] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);

    // Starting a different brand clears whatever was half-answered.
    useEffect(() => {
      setModel(null);
      setFuel(null);
      setTrans(null);
      setYear(null);
    }, [brand]);

    // Memoised because the effects below depend on them; rebuilding the
    // arrays each render would re-fire the auto-fill on every pass.
    const fuels = useMemo(() => (model ? fuelsFor(model) : []), [model]);
    const transmissions = useMemo(
      () => (model && fuel ? transmissionsFor(model, fuel) : []),
      [model, fuel],
    );
    const years = useMemo(
      () => (model && fuel ? yearsFor(model, fuel) : []),
      [model, fuel],
    );

    // Collapse any step that has exactly one valid answer.
    useEffect(() => {
      if (fuels.length === 1 && fuel !== fuels[0]) setFuel(fuels[0]);
    }, [fuels, fuel]);
    useEffect(() => {
      if (transmissions.length === 1 && trans !== transmissions[0]) {
        setTrans(transmissions[0]);
      }
    }, [transmissions, trans]);
    useEffect(() => {
      if (years.length === 1 && year !== years[0]) setYear(years[0]);
      if (year && years.length && !years.includes(year)) setYear(null);
    }, [years, year]);

    const ready = model && fuel && trans && year;
    const current: Step = !fuel ? 'fuel' : !trans ? 'trans' : 'year';

    if (!model) {
      const models = brand ? (MODELS[brand] ?? []) : [];
      return (
        <Sheet
          ref={ref}
          title="Choose your model"
          subtitle={brand ?? undefined}
          snapPoints={['70%']}
          onClose={onClose}
        >
          <View style={styles.grid}>
            {models.map(m => (
              <Pressable
                key={m}
                accessibilityRole="button"
                onPress={() => setModel(m)}
                style={[styles.modelTile, { backgroundColor: c.card, borderColor: c.line }]}
              >
                <View style={[styles.art, { backgroundColor: c.bay }]}>
                  <Icon name="car" size={28} color={c.muted} />
                </View>
                <Text variant="smallStrong" style={styles.centre} numberOfLines={2}>
                  {m}
                </Text>
              </Pressable>
            ))}
            <View style={[styles.modelTile, styles.dashed, { borderColor: c.ctlLine }]}>
              <Text variant="smallStrong" style={styles.centre}>
                My model isn&rsquo;t listed
              </Text>
              <Text variant="meta" tone="muted" style={styles.centre}>
                Enter your car number
              </Text>
            </View>
          </View>
        </Sheet>
      );
    }

    const step = (
      key: Step,
      label: string,
      value: string | null,
      options: string[],
      onSelect: (v: string) => void,
    ) => {
      const done = !!value;
      const open = key === current || done;
      return (
        <View
          key={key}
          style={[
            styles.step,
            {
              backgroundColor: c.card,
              borderColor: open && !done ? c.sel : c.line,
              borderWidth: open && !done ? layout.chipBorder : layout.hairline,
            },
            open ? null : styles.waiting,
          ]}
        >
          <View style={styles.stepHead}>
            <Text variant="label" style={styles.grow}>
              {label}
            </Text>
            {done ? <Text variant="smallStrong">{value}</Text> : null}
          </View>

          {!done && open
            ? options.map(o => (
                <Pressable
                  key={o}
                  accessibilityRole="button"
                  onPress={() => onSelect(o)}
                  style={[styles.option, { borderColor: c.line }]}
                >
                  <View style={styles.grow}>
                    <Text variant="bodyStrong">{o}</Text>
                    {SUBTITLE[o] ? (
                      <Text variant="meta" tone="muted">
                        {o === 'Automatic' && fuel === 'Electric'
                          ? 'Single speed'
                          : SUBTITLE[o]}
                      </Text>
                    ) : null}
                  </View>
                  <Icon name="chev" size={16} color={c.ink} />
                </Pressable>
              ))
            : null}
        </View>
      );
    };

    return (
      <Sheet
        ref={ref}
        title={model}
        subtitle={brand ?? undefined}
        snapPoints={['70%']}
        onClose={onClose}
        footer={
          <Button
            label={ready ? 'See my prices' : 'Choose all three'}
            disabled={!ready}
            onPress={() =>
              ready &&
              onPick({ brand: brand!, model, fuel: fuel!, trans: trans!, year: year! })
            }
          />
        }
      >
        <Pressable accessibilityRole="button" onPress={() => setModel(null)}>
          <Text variant="smallStrong" style={styles.change}>
            Change model
          </Text>
        </Pressable>

        {step('fuel', 'Fuel', fuel, fuels, setFuel)}
        {step('trans', 'Gearbox', trans, transmissions, setTrans)}
        {step('year', 'Year', year, years, setYear)}

        {fuels.length === 1 || transmissions.length === 1 ? (
          <Text variant="small" tone="muted">
            Some choices are filled in because the {model} only came one way.
          </Text>
        ) : null}
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  centre: { textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  modelTile: {
    width: '48.5%',
    gap: 6,
    padding: 8,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashed: { borderStyle: 'dashed', borderWidth: layout.chipBorder, minHeight: 92 },
  art: {
    width: '100%',
    aspectRatio: 3 / 2,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  change: { textDecorationLine: 'underline' },
  step: { gap: 10, padding: 16, borderRadius: radius.lg },
  stepHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  waiting: { opacity: 0.45 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
  },
});
