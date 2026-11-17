import { forwardRef } from 'react';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Sheet } from '../Sheet';
import { Text } from '../Text';

/**
 * Where the photographs came from. The prototype carries this because
 * the imagery is a mix of originals and licensed stock, and the licences
 * require attribution.
 */
export const CreditsSheet = forwardRef<BottomSheetModal, { onClose: () => void }>(
  function CreditsSheetBase({ onClose }, ref) {
    return (
      <Sheet
        ref={ref}
        title="Photo credits"
        snapPoints={['45%']}
        onClose={onClose}
      >
        <Text variant="small" tone="muted">
          Service icons and the workshop photographs are GoodMiles
          originals.
        </Text>
        <Text variant="small" tone="muted">
          Car pictures, brand logos and some service banners come from
          their manufacturers or from Wikimedia Commons under CC BY and
          CC BY-SA licences. Each is credited to its photographer in the
          source listing that ships with the image set.
        </Text>
        <Text variant="small" tone="muted">
          Brand logos remain the property of their owners and are shown
          only to identify the car you drive.
        </Text>
      </Sheet>
    );
  },
);
