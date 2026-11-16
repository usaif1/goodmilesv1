import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import {
  Button,
  Footer,
  Screen,
  ScreenHeader,
  Text,
  useToast,
} from '@/components';
import { ODOMETER } from '@/data';
import { useApp } from '@/store';
import { face, layout, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const RECORDED_FROM = 8;
const GRID = 21;

/**
 * A stand-in QR, drawn exactly as the prototype does: finder rings in
 * three corners and a deterministic fill elsewhere, so the same record
 * always draws the same code. It encodes nothing - a real one comes
 * from the backend that issues the record.
 */
function qrCells(): [number, number][] {
  const cells: [number, number][] = [];
  for (let i = 0; i < GRID * GRID; i++) {
    const x = i % GRID;
    const y = Math.floor(i / GRID);
    const finder =
      (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    const ring =
      finder &&
      (x % 14 === 0 ||
        x % 14 === 6 ||
        y % 14 === 0 ||
        y % 14 === 6 ||
        (x % 14 > 1 && x % 14 < 5 && y % 14 > 1 && y % 14 < 5));
    const on = finder ? ring : (x * 7 + y * 13 + x * y) % 3 === 0;
    if (on) cells.push([x, y]);
  }
  return cells;
}

export function CertifiedPdfScreen({
  navigation,
}: RootScreenProps<'CertifiedPdf'>) {
  const { c } = useTheme();
  const { toast } = useToast();
  const car = useApp(s => s.car);
  const reg = useApp(s => s.reg);
  const order = useApp(s => s.order);
  const stage = useApp(s => s.stage);

  const real = !!order && stage >= RECORDED_FROM;
  const shown = car ?? { brand: 'Hyundai', model: 'Creta' };
  const record = real ? 'GMR-7F2K' : 'GMR-SAMPLE';
  const cells = useMemo(qrCells, []);

  const history: [string, string, string, string][] = real
    ? [
        [
          '9 Nov 2026',
          ODOMETER.delivery,
          'Standard service, front brake pads',
          `${order.id}-01…03 · Amit Sharma`,
        ],
      ]
    : [
        ['29 Oct 2026', '42,328 km', 'Standard service, front brake pads', 'Amit Sharma'],
        ['24 Apr 2026', '32,104 km', 'Standard service', 'Amit Sharma'],
        ['18 Oct 2025', '21,960 km', 'Standard service, AC gas top-up', 'Ravi Kumar'],
      ];

  return (
    <Screen
      header={
        <ScreenHeader
          title="Certified PDF"
          subtitle={shown.model}
          onBack={navigation.goBack}
        />
      }
      footer={
        <Footer>
          <Button
            label="Download PDF"
            onPress={() =>
              toast(
                real
                  ? "Saved to Downloads"
                  : "This is a sample. Yours is ready after your first service.",
              )
            }
          />
          <Button
            label="Share with a buyer"
            variant="ghost"
            onPress={() =>
              toast(real ? "Share link copied" : "This is a sample.")
            }
          />
        </Footer>
      }
    >
      {/* Deliberately not themed: a document looks the same in any theme. */}
      <View style={[styles.paper, { borderColor: c.line }]}>
        {!real ? (
          <View style={styles.watermarkWrap} pointerEvents="none">
            <Text style={styles.watermark}>SAMPLE</Text>
          </View>
        ) : null}

        <View style={styles.row}>
          <Text style={styles.wordmark}>GoodMiles</Text>
          <Text style={styles.meta}>Record {record}</Text>
        </View>

        <Text style={styles.title}>Certified Service Record</Text>

        <View style={styles.grid}>
          <Field label="Car" value={`${shown.brand} ${shown.model}`} />
          <Field label="Registration" value={reg ?? 'Not added yet'} />
          <Field label="Last service" value={history[0][0]} />
          <Field label="Odometer" value={ODOMETER.delivery} />
        </View>

        <View style={styles.tableHead}>
          <Text style={[styles.th, styles.colDate]}>Date</Text>
          <Text style={[styles.th, styles.colKm]}>Km</Text>
          <Text style={[styles.th, styles.grow]}>Work and parts</Text>
        </View>
        {history.map(([date, km, work, by]) => (
          <View key={date} style={styles.tr}>
            <Text style={[styles.td, styles.colDate]}>{date}</Text>
            <Text style={[styles.td, styles.colKm]}>{km}</Text>
            <View style={styles.grow}>
              <Text style={styles.td}>{work}</Text>
              <Text style={styles.tdMuted}>{by}</Text>
            </View>
          </View>
        ))}

        <View style={styles.footRow}>
          <View style={styles.grow}>
            <Text style={styles.certified}>GoodMiles certified</Text>
            <Text style={styles.meta}>
              Every job photographed, every part numbered.
            </Text>
            <Text style={styles.meta}>Scan to check this record is real.</Text>
          </View>
          <Svg
            width={64}
            height={64}
            viewBox={`0 0 ${GRID} ${GRID}`}
            accessibilityLabel="QR code to verify this record"
          >
            {cells.map(([x, y]) => (
              <Rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#16213a" />
            ))}
          </Svg>
        </View>
      </View>
    </Screen>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.meta}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

const INK = '#16213a';
const PAPER_MUTED = '#5a6478';
const RULE = '#dde1e6';

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  paper: {
    backgroundColor: '#ffffff',
    borderWidth: layout.hairline,
    borderRadius: radius.xs,
    padding: 16,
    gap: 12,
    overflow: 'hidden',
  },
  watermarkWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    fontFamily: face.bold,
    fontSize: 64,
    letterSpacing: 6,
    color: 'rgba(22,33,58,0.06)',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  wordmark: { fontFamily: face.semibold, fontSize: 20, color: INK, letterSpacing: -0.6 },
  meta: { fontFamily: face.regular, fontSize: 12, color: PAPER_MUTED },
  title: {
    fontFamily: face.semibold,
    fontSize: 17,
    color: INK,
    borderBottomWidth: 2,
    borderBottomColor: INK,
    paddingBottom: 8,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, columnGap: 10 },
  field: { width: '47%' },
  fieldValue: { fontFamily: face.semibold, fontSize: 14, color: INK },
  tableHead: {
    flexDirection: 'row',
    gap: 8,
    borderBottomWidth: layout.hairline,
    borderBottomColor: RULE,
    paddingBottom: 4,
  },
  th: { fontFamily: face.bold, fontSize: 12, color: PAPER_MUTED },
  tr: {
    flexDirection: 'row',
    gap: 8,
    borderBottomWidth: layout.hairline,
    borderBottomColor: RULE,
    paddingVertical: 6,
  },
  td: { fontFamily: face.regular, fontSize: 12, color: INK },
  tdMuted: { fontFamily: face.regular, fontSize: 12, color: PAPER_MUTED },
  colDate: { width: 78 },
  colKm: { width: 62 },
  footRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, marginTop: 4 },
  certified: { fontFamily: face.semibold, fontSize: 12, color: INK },
});
