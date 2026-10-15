import { useRef, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { color, layout, radius, space, type } from '@/theme';

type Props = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
};

/**
 * The four-digit OTP field on C01.
 *
 * One hidden TextInput sits behind the boxes rather than one input per
 * digit. The per-digit approach has to re-implement backspace, paste
 * and focus movement by hand, and each of those is a separate source
 * of bugs. With a single input the platform handles all three, and SMS
 * autofill works too - which is the whole point of an OTP screen.
 *
 * The input is transparent rather than zero-sized or display:none,
 * because those can stop it taking focus.
 */
export function OtpInput({ value, onChange, length = 4, autoFocus }: Props) {
  // RN 0.87's generated types expose the instance separately from the
  // component, so the ref is taken from the component rather than typed
  // as TextInput - which no longer carries focus().
  const ref = useRef<ComponentRef<typeof TextInput>>(null);
  const boxes = Array.from({ length }, (_, i) => i);
  const focusedIndex = Math.min(value.length, length - 1);

  return (
    <Pressable onPress={() => ref.current?.focus()} style={s.wrap}>
      <View style={s.row}>
        {boxes.map(i => (
          <View
            key={i}
            style={[s.box, i === focusedIndex && value.length < length && s.boxActive]}>
            <Text style={s.digit}>{value[i] ?? ''}</Text>
          </View>
        ))}
      </View>
      <TextInput
        ref={ref}
        style={s.hidden}
        value={value}
        onChangeText={next => onChange(next.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        /** iOS pulls the code from the SMS; Android uses autoComplete. */
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        caretHidden
      />
    </Pressable>
  );
}

const s = StyleSheet.create({
  wrap: { alignSelf: 'flex-start' },
  row: { flexDirection: 'row', gap: space.sm + 2 },
  box: {
    width: 48,
    height: 50,
    borderRadius: radius.md,
    backgroundColor: color.surface,
    borderWidth: layout.hairline,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: { borderColor: color.brand },
  digit: { ...type.h1, fontSize: 22 },
  // absoluteFill is a registered style ID, not an object, so it cannot
  // be spread alongside opacity - the positions are written out.
  hidden: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0 },
});
