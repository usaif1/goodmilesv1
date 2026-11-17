import { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useTheme } from '@/theme';

import { Button } from '../Button';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

export type CancelSheetProps = {
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * Cancelling a booking. Keeping it is the primary action and cancelling
 * the quiet one, because the sheet opens from a link that is easy to
 * hit by accident.
 */
export const CancelSheet = forwardRef<BottomSheetModal, CancelSheetProps>(
  function CancelSheetBase({ onClose, onConfirm }, ref) {
    const { c } = useTheme();
    return (
      <Sheet
        ref={ref}
        title="Cancel this booking?"
        snapPoints={['38%']}
        onClose={onClose}
      >
        <Text variant="body" style={{ color: c.ink2 }}>
          Cancelling is free until the inspection starts. Your Guardian will
          message you to confirm.
        </Text>
        <Button label="Keep booking" onPress={onClose} />
        <Button
          label="Cancel booking"
          variant="ghost"
          destructive
          onPress={onConfirm}
          style={styles.cancel}
        />
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  cancel: { marginTop: -4 },
});
