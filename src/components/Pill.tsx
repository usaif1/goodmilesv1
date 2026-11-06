import { StyleSheet, View, type ViewProps } from 'react-native';

import { radius, useTheme } from '@/theme';

import { Text } from './Text';

export type PillTone = 'default' | 'ok' | 'red' | 'navy';

export type PillProps = ViewProps & {
  label: string;
  tone?: PillTone;
};

/**
 * `.pill` - a small status marker. Round 2 gave it an 8 radius, so it
 * is a rounded rectangle rather than the fully round shape its name
 * suggests.
 */
export function Pill({ label, tone = 'default', style, ...rest }: PillProps) {
  const { c } = useTheme();
  const tones: Record<PillTone, { bg: string; fg: string }> = {
    default: { bg: c.bay, fg: c.ink },
    ok: { bg: c.okTint, fg: c.ok },
    red: { bg: c.redTint, fg: c.red },
    navy: { bg: c.sel, fg: '#ffffff' },
  };
  const { bg, fg } = tones[tone];
  return (
    <View style={[styles.base, { backgroundColor: bg }, style]} {...rest}>
      <Text variant="pill" style={{ color: fg }} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
  },
});
