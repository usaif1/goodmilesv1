import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import type { EstimateItem } from '@/data';
import { Icon, radius, useTheme } from '@/theme';

import { Button } from '../Button';
import { useToast } from '../Toast';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

export type ProofSheetProps = {
  item: EstimateItem | null;
  /** Timestamp of the inspection, from the service clock. */
  takenAt?: string;
  onClose: () => void;
};

/**
 * The evidence behind an estimate line: the close-up and the
 * measurement Amit took. This is what "approve every rupee" rests on -
 * without it the estimate is just a number somebody typed.
 */
export const ProofSheet = forwardRef<BottomSheetModal, ProofSheetProps>(
  function ProofSheetBase({ item, takenAt, onClose }, ref) {
    const { c } = useTheme();
    const { toast } = useToast();
    return (
      <Sheet
        ref={ref}
        title={item?.name}
        subtitle="Photos and a measurement"
        snapPoints={['62%']}
        onClose={onClose}
        footer={<Button
            label="Ask Amit to call me"
            variant="ghost"
            icon="phone"
            onPress={() => toast("Amit will call you shortly.")}
          />}
      >
        <View style={[styles.photo, { backgroundColor: c.bay }]}>
          <Icon name="camera" size={34} color={c.muted} />
          <View style={[styles.stamp, { backgroundColor: c.card }]}>
            <Text variant="meta" tone="ink">
              Close-up{takenAt ? ` · ${takenAt}` : ''}
            </Text>
          </View>
        </View>

        <Text variant="body" style={{ color: c.ink2 }}>
          {item?.note}
        </Text>

        {item?.gain ? (
          <View style={styles.gain}>
            <Icon name="plus" size={14} strokeWidth={2.6} color={c.ok} />
            <Text variant="small" style={{ color: c.ok }}>
              {item.gain}
            </Text>
          </View>
        ) : null}
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  photo: {
    height: 200,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stamp: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  gain: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
