import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, radius, space, type } from '@/theme';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  /** Share the row evenly, as the Pickup / Walk-in switch on C09 does. */
  fill?: boolean;
};

/**
 * The selectable chip, used for the C06 service tabs, the C09 pickup
 * switch, dates and time slots, and the C14 complaint reasons. Selected
 * is a brand fill with white text; unselected is grey-100 with
 * grey-700 text, which is consistent across all four screens.
 */
export function Pill({ label, selected = false, onPress, fill }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        s.pill,
        selected ? s.selected : s.unselected,
        fill && s.fill,
        pressed && s.pressed,
      ]}>
      <Text style={[s.label, selected ? s.labelSelected : s.labelUnselected]}>
        {label}
      </Text>
    </Pressable>
  );
}

type GroupProps = {
  children: React.ReactNode;
  /** Equal-width columns instead of a wrapping row. */
  fill?: boolean;
};

/** Lays pills out as a wrapping row, or as equal columns when `fill`. */
export function PillGroup({ children, fill }: GroupProps) {
  return <View style={[s.group, fill && s.groupFill]}>{children}</View>;
}

const s = StyleSheet.create({
  pill: {
    borderRadius: radius.pill,
    /** C09 fits three slot pills per row; 16pt sides was too wide. */
    paddingVertical: space.sm,
    paddingHorizontal: space.md + 2,
    alignItems: 'center',
  },
  fill: { flex: 1 },
  selected: { backgroundColor: color.brand },
  unselected: { backgroundColor: color.fillMuted },
  pressed: { opacity: 0.75 },
  label: type.buttonSmall,
  labelSelected: { color: color.textOnBrand },
  labelUnselected: { color: color.textStrong },
  group: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  groupFill: { flexWrap: 'nowrap' },
});
