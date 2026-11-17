import { forwardRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Icon, layout, radius, useTheme, type IconName } from '@/theme';

import { Card } from '../Card';
import { Pill } from '../Pill';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

export type FindOutSheetProps = {
  onClose: () => void;
  /** Adds the free inspection to the cart. */
  onBookInspection: () => void;
  onTalk: () => void;
  onRecord: () => void;
  onWhatsApp: () => void;
};

/**
 * For the customer who knows something is wrong but not what. The free
 * inspection leads, because it is the honest answer: we look, then we
 * price it, and nothing happens until they say so.
 */
export const FindOutSheet = forwardRef<BottomSheetModal, FindOutSheetProps>(
  function FindOutSheetBase(
    { onClose, onBookInspection, onTalk, onRecord, onWhatsApp },
    ref,
  ) {
    const { c } = useTheme();
    const options: [IconName, string, () => void][] = [
      ['phone', 'Talk to a technician', onTalk],
      ['mic', 'Send a voice note and we’ll call back', onRecord],
      ['chat', 'Chat on WhatsApp', onWhatsApp],
    ];

    return (
      <Sheet
        ref={ref}
        title="Not sure what your car needs?"
        subtitle="Choose how to find out"
        snapPoints={['58%']}
        onClose={onClose}
      >
        <Pressable accessibilityRole="button" onPress={onBookInspection}>
          <Card selected>
            <View style={styles.head}>
              <Text variant="bodyStrong" style={styles.grow}>
                Free inspection at pickup
              </Text>
              <Pill label="Most helpful" />
            </View>
            <Text variant="small" tone="muted">
              Your Guardian checks the car, shares photos and sends an
              estimate. You pay only for what you approve.
            </Text>
          </Card>
        </Pressable>

        {options.map(([icon, label, onPress]) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            onPress={onPress}
            style={[styles.row, { backgroundColor: c.card, borderColor: c.line }]}
          >
            <Icon name={icon} size={22} color={c.ink} />
            <Text variant="smallStrong" style={styles.grow}>
              {label}
            </Text>
            <Icon name="chev" size={16} color={c.ink} />
          </Pressable>
        ))}
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
  },
});
