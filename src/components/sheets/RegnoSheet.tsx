import { forwardRef, useState } from 'react';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import type { Car } from '@/domain';

import { Button } from '../Button';
import { Field } from '../Field';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

export type RegnoSheetProps = {
  onClose: () => void;
  onFound: (car: Car, reg: string) => void;
};

/**
 * Car number instead of picking a brand. There is no lookup behind it
 * yet, so any number resolves to the sample Creta - which is what the
 * prototype does, and why the sheet says so.
 */
export const RegnoSheet = forwardRef<BottomSheetModal, RegnoSheetProps>(
  function RegnoSheetBase({ onClose, onFound }, ref) {
    const [reg, setReg] = useState('HR 26 DK 8337');

    return (
      <Sheet
        ref={ref}
        title="Your car number"
        subtitle="We’ll find the brand, model and year"
        snapPoints={['92%']}
        onClose={onClose}
      >
        <Field
          value={reg}
          onChangeText={t => setReg(t.toUpperCase())}
          autoCapitalize="characters"
          autoCorrect={false}
          accessibilityLabel="Car registration number"
          placeholder="DL 3C AB 1234"
        />
        <Text variant="small" tone="muted">
          No lookup yet, so this fills a Hyundai Creta.
        </Text>
        <Button
          label="Find my car"
          onPress={() =>
            onFound(
              {
                brand: 'Hyundai',
                model: 'Creta',
                year: '2020–2022',
                fuel: 'Petrol',
                trans: 'Manual',
              },
              reg.trim(),
            )
          }
        />
      </Sheet>
    );
  },
);
