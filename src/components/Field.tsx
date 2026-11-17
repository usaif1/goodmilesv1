import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { Icon, layout, radius, typeScale, useTheme, type IconName } from '@/theme';

import { Text } from './Text';

export type FieldProps = Omit<TextInputProps, 'style'> & {
  /** A leading glyph, e.g. the search icon on the brand picker. */
  icon?: IconName;
  /** A fixed leading label such as `+91`, divided off by a rule. */
  prefix?: string;
  style?: ViewStyle;
};

/**
 * `.field` - round 2 gives it a 1px ink border rather than a grey one,
 * and doubles that to an inset ring on focus.
 */
export function Field({ icon, prefix, style, ...rest }: FieldProps) {
  const { c } = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[
        styles.base,
        { backgroundColor: c.card, borderColor: c.ink },
        focused && styles.focused,
        style,
      ]}
    >
      {icon ? <Icon name={icon} size={20} color={c.ink} /> : null}
      {prefix ? (
        <Text variant="bodyStrong" style={[styles.prefix, { borderRightColor: c.line }]}>
          {prefix}
        </Text>
      ) : null}
      <TextInput
        style={[styles.input, { color: c.ink }]}
        placeholderTextColor={c.muted}
        onFocus={e => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={e => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: layout.fieldHeight,
    paddingHorizontal: 14,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
  },
  focused: { borderWidth: 2 },
  prefix: { paddingRight: 12, borderRightWidth: StyleSheet.hairlineWidth },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 14,
    ...typeScale.input,
  },
});
