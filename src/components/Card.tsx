import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { color, layout, radius, shadow } from '@/theme';

type Props = {
  children: ReactNode;
  /** Drop the internal padding when the card hosts its own rows. */
  padded?: boolean;
  style?: ViewStyle;
};

/**
 * The standard white surface. Cards in the mockups are lifted by a soft
 * shadow and carry no border - what reads as an outline is the shadow
 * falling off over roughly 4pt.
 */
export function Card({ children, padded = true, style }: Props) {
  return (
    <View style={[s.card, padded && s.padded, style]}>{children}</View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    ...shadow.card,
  },
  padded: { padding: layout.cardPadding },
});
