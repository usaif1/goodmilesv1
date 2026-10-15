import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, layout, radius, shadow, space, type } from '@/theme';

type Props = {
  label: string;
  Icon?: LucideIcon;
  onPress?: () => void;
  /** Brand outline, as Delhi carries on C02. */
  selected?: boolean;
  /** Tinted fill with brand text, as "All 11 services" uses on C05. */
  tinted?: boolean;
};

/**
 * One cell of a three-column grid. The city tiles on C02 and the
 * service tiles on C05 are the same shape, so they share a component.
 */
export function GridTile({ label, Icon, onPress, selected, tinted }: Props) {
  const fg = tinted || selected ? color.brand : color.text;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={({ pressed }) => [
        s.tile,
        tinted ? s.tinted : s.plain,
        selected && s.selected,
        pressed && s.pressed,
      ]}>
      {Icon ? (
        <View style={s.icon}>
          <Icon size={26} color={fg} />
        </View>
      ) : null}
      <Text style={[s.label, { color: fg }]} numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

/** Three-column grid wrapper sized to the 16pt screen gutter. */
export function Grid({ children }: { children: React.ReactNode }) {
  return <View style={s.grid}>{children}</View>;
}

const s = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md },
  tile: {
    /** Three across with two 12pt gaps inside a 16pt gutter. */
    width: `${100 / 3}%`,
    flexGrow: 1,
    flexBasis: 96,
    maxWidth: 140,
    minHeight: 104,
    borderRadius: radius.lg,
    paddingVertical: space.lg,
    paddingHorizontal: space.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
  },
  plain: { backgroundColor: color.surface, ...shadow.card },
  tinted: { backgroundColor: color.brandTint },
  selected: { borderWidth: layout.hairline + 1, borderColor: color.brand },
  pressed: { opacity: 0.75 },
  icon: { height: 28, justifyContent: 'center' },
  label: { ...type.h2, textAlign: 'center' },
});
