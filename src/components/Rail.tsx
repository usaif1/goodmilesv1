import { type ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

/**
 * `.hrail` - a horizontal strip that bleeds to the screen edges while
 * keeping its first and last card inside the 16pt gutter.
 */
export function Rail({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.base}
      contentContainerStyle={styles.content}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: { marginHorizontal: -16 },
  content: { gap: 12, paddingHorizontal: 16, paddingBottom: 6 },
});
