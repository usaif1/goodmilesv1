import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Field, Text } from '@/components';
import { useApp } from '@/store';
import { radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

/** A number is ten digits; the prototype shows it as 5 + 5. */
const digits = (v: string) => v.replace(/\D/g, '').slice(0, 10);
const spaced = (v: string) =>
  v.length > 5 ? `${v.slice(0, 5)} ${v.slice(5)}` : v;

export function WelcomeScreen({ navigation }: RootScreenProps<'Welcome'>) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const phone = useApp(s => s.phone);
  const setPhone = useApp(s => s.setPhone);
  const [value, setValue] = useState(phone);
  const [hint, setHint] = useState('');
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const [keyboard, setKeyboard] = useState(0);

  /**
   * The CTA sits below the fold once the keyboard is up. The spacer
   * above it absorbs the window resize, so there is nothing to scroll
   * into - the page has to grow by the keyboard's height first, which
   * is what the prototype does with its 55vh of bottom padding.
   */
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboard(e.endCoordinates.height);
      setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboard(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const send = () => {
    if (value.length < 10) {
      setHint('Enter all 10 digits of your number.');
      return;
    }
    setHint('');
    setPhone(value);
    navigation.navigate('Otp');
  };

  return (
    <ScrollView
      ref={scroll}
      style={[styles.page, { backgroundColor: c.page }]}
      contentContainerStyle={[
        styles.inner,
        {
          paddingTop: insets.top + 46,
          paddingBottom: 24 + insets.bottom + keyboard,
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text variant="wordmark">GoodMiles</Text>
      <Text variant="body" style={styles.sub}>
        Car service from your door. Noida and around.
      </Text>

      <Text variant="display" style={styles.headline}>
        Know what&rsquo;s{'\n'}under it
        <Text variant="display" style={{ color: c.orange }}>
          .
        </Text>
      </Text>

      {/* Placeholder for the old-parts photo while images are out of scope. */}
      <View style={[styles.photo, { backgroundColor: c.bay }]}>
        <View style={[styles.sampleTag, { backgroundColor: c.card }]}>
          <Text variant="meta" tone="ink">
            Sample
          </Text>
        </View>
      </View>
      <Text variant="h3" style={styles.caption}>
        Your car comes back. So do its old parts.
      </Text>

      <Text variant="body" style={styles.label}>
        Your WhatsApp number. Your code comes here.
      </Text>
      <Field
        prefix="+91"
        value={spaced(value)}
        onChangeText={t => {
          setValue(digits(t));
          if (hint) setHint('');
        }}
        keyboardType="number-pad"
        maxLength={11}
        autoComplete="tel"
        accessibilityLabel="Your WhatsApp number"
        style={styles.field}
      />
      {hint ? (
        <Text variant="bodyStrong" style={styles.hint} accessibilityLiveRegion="polite">
          {hint}
        </Text>
      ) : null}

      <Button
        label="Send my car&rsquo;s prices and videos"
        onPress={send}
        style={styles.cta}
      />
      <Text variant="body" style={styles.fine}>
        We message about your car only. By continuing, you agree to our Terms
        and Privacy.
      </Text>

      <View style={styles.spacer} />
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })}
      >
        <Text variant="body" style={styles.look}>
          Just looking?{' '}
          <Text variant="bodyStrong" style={styles.underline}>
            See prices without your number
          </Text>
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  inner: { flexGrow: 1, paddingHorizontal: 24 },
  sub: { marginTop: 8 },
  headline: { marginTop: 24 },
  photo: {
    marginTop: 24,
    aspectRatio: 3 / 2,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  sampleTag: {
    position: 'absolute',
    left: 10,
    top: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  caption: { marginTop: 12 },
  label: { marginTop: 24 },
  field: { marginTop: 8 },
  hint: { marginTop: 6 },
  cta: { marginTop: 16 },
  fine: { marginTop: 12 },
  spacer: { flex: 1, minHeight: 24 },
  look: { paddingTop: 24, textAlign: 'center' },
  underline: { textDecorationLine: 'underline' },
});
