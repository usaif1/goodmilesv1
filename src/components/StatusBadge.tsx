import { StyleSheet, Text, View } from 'react-native';
import { color, radius, space, type } from '@/theme';

export type BadgeTone = 'warning' | 'success' | 'error';

type Props = { label: string; tone: BadgeTone };

const TONES: Record<BadgeTone, { bg: string; fg: string }> = {
  warning: { bg: color.warningBg, fg: color.warningText }, // ESTIMATE SENT, OPEN
  success: { bg: color.successBg, fg: color.successText }, // COMPLETED
  error: { bg: color.errorBg, fg: color.error }, // CANCELLED
};

/**
 * The pill-shaped status chip on C16 and C14. Label is passed already
 * capitalised rather than uppercased here, so screens keep control of
 * the wording.
 */
export function StatusBadge({ label, tone }: Props) {
  const { bg, fg } = TONES[tone];

  return (
    <View style={[s.badge, { backgroundColor: bg }]}>
      <Text style={[s.label, { color: fg }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: {
    borderRadius: radius.pill,
    paddingVertical: space.xs + 2,
    paddingHorizontal: space.md,
    alignSelf: 'flex-start',
  },
  label: type.badge,
});
