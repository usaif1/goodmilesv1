import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Button, ScreenHeader, Text } from '@/components';
import { useApp } from '@/store';
import { layout, radius, typeScale, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

const LENGTH = 4;
const RESEND_SECONDS = 30;

export function OtpScreen({ navigation }: RootScreenProps<'Otp'>) {
  const { c } = useTheme();
  const phone = useApp(s => s.phone);
  const login = useApp(s => s.login);

  const [code, setCode] = useState('');
  const [hint, setHint] = useState('');
  const [left, setLeft] = useState(RESEND_SECONDS);
  const input = useRef<ComponentRef<typeof TextInput>>(null);

  useEffect(() => {
    input.current?.focus();
    const t = setInterval(() => setLeft(n => Math.max(0, n - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const submit = () => {
    // Any four digits are accepted - there is no backend yet.
    if (code.length < LENGTH) {
      setHint(`Enter all ${LENGTH} digits.`);
      return;
    }
    login();
    navigation.navigate('City');
  };

  const shown = phone.replace(/(\d{5})(\d{5})/, '$1 $2');

  return (
    <View style={[styles.page, { backgroundColor: c.page }]}>
      <ScreenHeader
        onBack={navigation.goBack}
        right={
          <Text variant="headerSub" style={styles.step}>
            Step 1 of 3
          </Text>
        }
      />
      <View style={styles.body}>
        <Text variant="h1">Enter your code</Text>

        <Text variant="h3" style={styles.sent}>
          Sent on WhatsApp to +91 {shown}.{' '}
          <Text variant="h3" style={styles.link} onPress={navigation.goBack}>
            Edit
          </Text>
        </Text>

        <Text variant="body" style={styles.label}>
          {LENGTH}-digit code
        </Text>

        <Pressable style={styles.boxes} onPress={() => input.current?.focus()}>
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
              <Text variant="h1">{code[i] ?? ''}</Text>
            </View>
          ))}
          <TextInput
            ref={input}
            value={code}
            onChangeText={t => {
              setCode(t.replace(/\D/g, '').slice(0, LENGTH));
              if (hint) setHint('');
            }}
            keyboardType="number-pad"
            maxLength={LENGTH}
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
            accessibilityLabel={`${LENGTH}-digit code`}
            style={styles.hidden}
          />
        </Pressable>

        {hint ? (
          <Text variant="bodyStrong" style={styles.hint} accessibilityLiveRegion="polite">
            {hint}
          </Text>
        ) : null}

        <Button label="Choose my car" onPress={submit} style={styles.cta} />
        <Text variant="body" style={styles.next}>
          Then your prices come here and on WhatsApp.
        </Text>
        <Text variant="body" style={styles.resend}>
          {left
            ? `Resend in 0:${String(left).padStart(2, '0')}`
            : 'No code? Resend on WhatsApp'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  step: { marginLeft: 'auto' },
  body: { padding: 16, paddingBottom: 32 },
  sent: { marginTop: 8, fontFamily: typeScale.body.fontFamily, lineHeight: 26 },
  link: { textDecorationLine: 'underline' },
  label: { marginTop: 32, marginBottom: 8 },
  boxes: { flexDirection: 'row', gap: 10 },
  box: {
    width: 58,
    height: 62,
    borderRadius: radius.lg,
    borderWidth: layout.chipBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: { position: 'absolute', inset: 0, opacity: 0 },
  hint: { marginTop: 8 },
  cta: { marginTop: 24 },
  next: { marginTop: 12 },
  resend: { marginTop: 24 },
});
