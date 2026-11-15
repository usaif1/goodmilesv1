import { forwardRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import type { Car } from '@/domain';
import { Icon, layout, radius, useTheme } from '@/theme';

import { Button } from '../Button';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

export type CarsSheetProps = {
  cars: Car[];
  active: Car | null;
  onSelect: (car: Car) => void;
  onAdd: () => void;
  onClose: () => void;
};

export const CarsSheet = forwardRef<BottomSheetModal, CarsSheetProps>(
  function CarsSheetBase({ cars, active, onSelect, onAdd, onClose }, ref) {
    const { c } = useTheme();
    const list = cars.length ? cars : active ? [active] : [];
    return (
      <Sheet
        ref={ref}
        title="Your cars"
        snapPoints={['50%']}
        onClose={onClose}
        footer={<Button label="Add another car" variant="ghost" icon="plus" onPress={onAdd} />}
      >
        {list.map(car => {
          const on = active?.model === car.model && active?.brand === car.brand;
          return (
            <Pressable
              key={`${car.brand}-${car.model}`}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => onSelect(car)}
              style={[
                styles.row,
                {
                  backgroundColor: c.card,
                  borderColor: on ? c.sel : c.line,
                  borderWidth: on ? layout.chipBorder : layout.hairline,
                },
              ]}
            >
              <View style={[styles.thumb, { backgroundColor: c.bay }]}>
                <Icon name="car" size={22} color={c.muted} />
              </View>
              <View style={styles.grow}>
                <Text variant="bodyStrong">
                  {car.brand} {car.model}
                </Text>
                <Text variant="small" tone="muted">
                  {[car.fuel, car.trans, car.year].filter(Boolean).join(' · ')}
                </Text>
              </View>
              {on ? <Icon name="check" size={20} strokeWidth={2.4} color={c.sel} /> : null}
            </Pressable>
          );
        })}
        <Text variant="small" tone="muted">
          Switching car updates every price.
        </Text>
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: radius.lg,
  },
  thumb: {
    width: 48,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
