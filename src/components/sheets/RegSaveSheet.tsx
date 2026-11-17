import { forwardRef, useState } from 'react';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Button } from '../Button';
import { Field } from '../Field';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

export type RegSaveSheetProps = {
  initial?: string | null;
  onClose: () => void;
  onSave: (reg: string) => void;
};

/**
 * Saving a registration number against a car that is already chosen -
 * the prototype's regno2. Unlike regno it looks nothing up; it is only
 * how PUC and insurance reminders get something to track.
 */
export const RegSaveSheet = forwardRef<BottomSheetModal, RegSaveSheetProps>(
  function RegSaveSheetBase({ initial, onClose, onSave }, ref) {
    const [reg, setReg] = useState(initial ?? '');

    return (
      <Sheet
        ref={ref}
        title="Registration number"
        snapPoints={['92%']}
        onClose={onClose}
      >
        <Field
          value={reg}
          onChangeText={t => setReg(t.toUpperCase())}
          autoCapitalize="characters"
          autoCorrect={false}
          placeholder="DL 3C AB 1234"
          accessibilityLabel="Registration number"
        />
        <Text variant="small" tone="muted">
          Optional. If you skip this, the driver will note it at pickup.
        </Text>
        <Button
          label="Save"
          disabled={!reg.trim()}
          onPress={() => onSave(reg.trim())}
        />
      </Sheet>
    );
  },
);
