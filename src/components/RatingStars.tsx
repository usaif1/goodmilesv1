import Star from 'lucide-react-native/icons/star';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, space, type } from '@/theme';

type Props = {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: number;
};

/**
 * The C14 rating control. Filled stars take the gold fill; the rest
 * are drawn as outlines in the same colour, which is what the mockup
 * shows. Read-only when no onChange is supplied.
 */
export function RatingStars({ value, max = 5, onChange, size = 30 }: Props) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <View style={s.wrap}>
      <View style={s.row}>
        {stars.map(n => {
          const filled = n <= value;
          return (
            <Pressable
              key={n}
              disabled={!onChange}
              onPress={() => onChange?.(n)}
              accessibilityRole="button"
              accessibilityLabel={`${n} of ${max}`}>
              <Star
                size={size}
                color={color.gold}
                fill={filled ? color.gold : 'none'}
              />
            </Pressable>
          );
        })}
      </View>
      <Text style={s.caption}>
        {value} / {max}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { alignItems: 'center', gap: space.sm },
  row: { flexDirection: 'row', gap: space.sm },
  caption: type.meta,
});
