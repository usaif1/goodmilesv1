import type { ReactNode } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from 'react-native';
import { color, layout, radius, space, type } from '@/theme';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  /** Leading element, e.g. the magnifier on the C02 search field. */
  left?: ReactNode;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  multiline?: boolean;
  autoFocus?: boolean;
  textContentType?: TextInputProps['textContentType'];
};

/**
 * The white input used for the C01 phone field, the C02 search box and
 * the C14 complaint note. 47pt tall with a grey-300 hairline, measured
 * identically on C01 and C02.
 */
export function TextField({
  value,
  onChangeText,
  placeholder,
  left,
  keyboardType,
  maxLength,
  multiline,
  autoFocus,
  textContentType,
}: Props) {
  return (
    <View style={[s.field, multiline && s.fieldMultiline]}>
      {left}
      <TextInput
        style={[s.input, multiline && s.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={color.textDisabled}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        autoFocus={autoFocus}
        textContentType={textContentType}
      />
    </View>
  );
}

const s = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    height: 47,
    paddingHorizontal: layout.cardPadding,
    backgroundColor: color.surface,
    borderRadius: radius.md,
    borderWidth: layout.hairline,
    borderColor: color.border,
  },
  fieldMultiline: {
    height: undefined,
    minHeight: 96,
    alignItems: 'flex-start',
    paddingVertical: space.md,
  },
  input: { flex: 1, ...type.body, padding: 0 },
  inputMultiline: { textAlignVertical: 'top', minHeight: 72 },
});
