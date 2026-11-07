import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

import { Text } from './Text';

export type SectionProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

/**
 * `.hsec` - a full-width white band on the grey page, which is how the
 * production rounds structure Home and the category pages. Sections are
 * separated by 8px of page showing through.
 */
export function Section({ title, subtitle, children }: SectionProps) {
  const { c } = useTheme();
  return (
    <View style={[styles.base, { backgroundColor: c.card }]}>
      {title ? (
        <Text variant="h3" style={subtitle ? styles.titleTight : styles.title}>
          {title}
        </Text>
      ) : null}
      {subtitle ? (
        <Text variant="small" tone="muted" style={styles.sub}>
          {subtitle}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 18, paddingHorizontal: 16, marginBottom: 8 },
  title: { marginBottom: 12 },
  titleTight: { marginBottom: 4 },
  sub: { marginBottom: 12 },
});
