import { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { SUPPORT_NUMBER } from '@/data';
import { call, openWhatsApp } from '@/lib';

import { Button } from '../Button';
import { Sheet } from '../Sheet';
import { Text } from '../Text';
import { useToast } from '../Toast';

/** +919538591731 -> +91 95385 91731 */
const pretty = (n: string) =>
  `+${n.slice(0, 2)} ${n.slice(2, 7)} ${n.slice(7)}`;

export const SupportSheet = forwardRef<BottomSheetModal, { onClose: () => void }>(
  function SupportSheetBase({ onClose }, ref) {
    const { toast } = useToast();
    return (
      <Sheet
        ref={ref}
        title="Talk to a real person"
        subtitle="Replies in about 2 minutes, 8 AM to 9 PM."
        snapPoints={['42%']}
        onClose={onClose}
      >
        <Button
          label="WhatsApp us"
          icon="chat"
          onPress={async () => {
            if (!(await openWhatsApp('Hi GoodMiles, I need help with my car.'))) {
              toast('WhatsApp isn’t available here.');
            }
          }}
        />
        <Button
          label="Call me back"
          variant="ghost"
          icon="phone"
          onPress={async () => {
            if (!(await call())) toast('We’ll call you back shortly.');
          }}
        />
        <Text variant="small" tone="muted" style={styles.number}>
          {pretty(SUPPORT_NUMBER)}
        </Text>
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  number: { textAlign: 'center' },
});
