import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Icon, useTheme } from '@/theme';

import { Card } from '../Card';
import { Pill } from '../Pill';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

export type PartsSheetProps = {
  /** The carmaker's name, shortened as the prototype shortens it. */
  make: string;
  onClose: () => void;
};

export const PartsSheet = forwardRef<BottomSheetModal, PartsSheetProps>(
  function PartsSheetBase({ make, onClose }, ref) {
    const { c } = useTheme();
    return (
      <Sheet
        ref={ref}
        title={`Branded (OES) or ${make} box (OEM)?`}
        snapPoints={['55%']}
        onClose={onClose}
      >
        <Card variant="outlined">
          <View style={styles.head}>
            <Text variant="bodyStrong" style={styles.grow}>
              Branded (OES)
            </Text>
            <Pill label="Costs less" />
          </View>
          <Text variant="small" style={{ color: c.ink2 }}>
            Made by the same companies that supply carmakers, such as Bosch or
            Denso, and sold in their own boxes.
          </Text>
        </Card>

        <Card variant="outlined">
          <Text variant="bodyStrong">{make} box (OEM)</Text>
          <Text variant="small" style={{ color: c.ink2 }}>
            The same kind of part, in {make}&rsquo;s own box with its logo. You
            pay more for the carmaker&rsquo;s box.
          </Text>
        </Card>

        <View style={styles.note}>
          <Icon name="shield" size={16} color={c.ink} />
          <Text variant="small" tone="muted" style={styles.grow}>
            Either way the part is new, fitted by us, and carries the same
            warranty.
          </Text>
        </View>
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  note: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
});
