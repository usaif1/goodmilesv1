import { StyleSheet, Text } from 'react-native';
import { space, type } from '@/theme';

/**
 * Marks a screen the mockups do not cover, so a reviewer clicking
 * through can tell a provisional layout from a finished one.
 *
 * Delete this component and its four uses once designs land for
 * EstimateReview, Payment, Profile and CarSelect.
 */
export function StubNote({ children }: { children: string }) {
  return <Text style={s.note}>{children}</Text>;
}

const s = StyleSheet.create({
  note: {
    ...type.meta,
    textAlign: 'center',
    paddingHorizontal: space.lg,
    paddingTop: space.sm,
  },
});
