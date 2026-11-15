import { forwardRef, useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useApp } from '@/store';
import { layout, radius, useTheme } from '@/theme';

import { Button } from '../Button';
import { Field } from '../Field';
import { Sheet } from '../Sheet';
import { Text } from '../Text';

const LENGTH = 4;

export type LoginSheetProps = {
  onClose: () => void;
  /** Runs once the code checks out, so the caller can resume what it was doing. */
  onLoggedIn: () => void;
};

const digits = (v: string) => v.replace(/\D/g, '').slice(0, 10);
const spaced = (v: string) =>
  v.length > 5 ? `${v.slice(0, 5)} ${v.slice(5)}` : v;

/**
 * Logging in without leaving the screen, which is how the prototype
 * gates checkout: the cart stays exactly as it was.
 *
 * The sheet is near full height and keeps its action in the body rather
 * than the pinned footer, because @gorhom/bottom-sheet's keyboard
 * handling does not lift the sheet under RN 0.87's edge-to-edge mode -
 * neither `interactive` nor `fillParent` moved it. Worth revisiting when
 * the two agree.
 */
export const LoginSheet = forwardRef<BottomSheetModal, LoginSheetProps>(
  function LoginSheetBase({ onClose, onLoggedIn }, ref) {
    const { c } = useTheme();
    const storedPhone = useApp(s => s.phone);
    const setPhone = useApp(s => s.setPhone);
    const login = useApp(s => s.login);
    const cart = useApp(s => s.cart);
    const car = useApp(s => s.car);

    const [stage, setStage] = useState<'phone' | 'otp'>('phone');
    const [phone, setLocalPhone] = useState(storedPhone);
    const [code, setCode] = useState('');
    const [hint, setHint] = useState('');
    const otpInput = useRef<ComponentRef<typeof TextInput>>(null);

    const valid = /^[6-9]\d{9}$/.test(phone);

    const sendCode = () => {
      if (!valid) {
        setHint('Enter a valid 10-digit mobile number.');
        return;
      }
      setHint('');
      setPhone(phone);
      setStage('otp');
      setTimeout(() => otpInput.current?.focus(), 250);
    };

    const verify = () => {
      // Any four digits, as elsewhere - there is no backend.
      if (code.length < LENGTH) {
        setHint(`Enter all ${LENGTH} digits.`);
        return;
      }
      login();
      onLoggedIn();
    };

    return (
      <Sheet
        ref={ref}
        title={
          stage === 'otp'
            ? 'Enter the code'
            : cart.length && car
              ? 'Log in to book'
              : 'Log in to continue'
        }
        subtitle={
          stage === 'otp'
            ? `Sent to +91 ${spaced(phone)}`
            : 'Your cart stays as it is'
        }
        snapPoints={['92%']}
        onClose={onClose}
      >
        {stage === 'phone' ? (
          <Field
            prefix="+91"
            value={spaced(phone)}
            onChangeText={t => {
              setLocalPhone(digits(t));
              if (hint) setHint('');
            }}
            keyboardType="number-pad"
            maxLength={11}
            accessibilityLabel="Mobile number"
            autoFocus
          />

        ) : (
          <Pressable
            style={styles.boxes}
            onPress={() => otpInput.current?.focus()}
          >
            {Array.from({ length: LENGTH }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.box,
                  {
                    backgroundColor: c.card,
                    borderColor: i === code.length ? c.sel : c.line,
                  },
                ]}
              >
                <Text variant="h2">{code[i] ?? ''}</Text>
              </View>
            ))}
            <TextInput
              ref={otpInput}
              value={code}
              onChangeText={t => {
                setCode(t.replace(/\D/g, '').slice(0, LENGTH));
                if (hint) setHint('');
              }}
              keyboardType="number-pad"
              maxLength={LENGTH}
              textContentType="oneTimeCode"
              accessibilityLabel={`${LENGTH}-digit code`}
              style={styles.hidden}
            />
          </Pressable>
        )}

        {hint ? (
          <Text variant="smallStrong" accessibilityLiveRegion="polite">
            {hint}
          </Text>
        ) : (
          <Text variant="small" tone="muted">
            {stage === 'otp'
              ? 'Any 4 digits work here.'
              : 'We message about your car only.'}
          </Text>
        )}

        {/*
          The action sits with the field rather than in the sheet's
          pinned footer, which the keyboard covers.
        */}
        {stage === 'otp' ? (
          <Button label="Verify and continue" onPress={verify} />
        ) : (
          <Button label="Send code" onPress={sendCode} />
        )}
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  boxes: { flexDirection: 'row', gap: 10 },
  box: {
    width: 56,
    height: 60,
    borderRadius: radius.lg,
    borderWidth: layout.chipBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0 },
});
