import { useState } from 'react';
import { StyleSheet } from 'react-native';

import {
  Button,
  Field,
  Screen,
  ScreenHeader,
  Text,
  useToast,
} from '@/components';
import { useApp } from '@/store';

import type { RootScreenProps } from '@/navigation/types';

const digits = (v: string) => v.replace(/\D/g, '').slice(0, 10);
const spaced = (v: string) =>
  v.length > 5 ? `${v.slice(0, 5)} ${v.slice(5)}` : v;

/**
 * Reached when the customer's city is outside the pickup area. It takes
 * a number for later rather than turning them away, and still offers
 * the Noida prices - seeing what a service costs is useful even where
 * we cannot do it yet.
 */
export function SoonScreen({ navigation, route }: RootScreenProps<'Soon'>) {
  const { toast } = useToast();
  const storedPhone = useApp(s => s.phone);
  const setPhone = useApp(s => s.setPhone);
  const [value, setValue] = useState(storedPhone);

  const where = route.params?.city || 'your area';

  return (
    <Screen header={<ScreenHeader onBack={navigation.goBack} />}>
      <Text variant="h1">We don&rsquo;t serve {where} yet</Text>
      <Text variant="body" tone="muted">
        For now we pick up in Noida and around. Leave your number and
        we&rsquo;ll message you when we start in {where}.
      </Text>

      <Field
        prefix="+91"
        value={spaced(value)}
        onChangeText={t => setValue(digits(t))}
        keyboardType="number-pad"
        maxLength={11}
        accessibilityLabel="Mobile number"
        style={styles.field}
      />

      <Button
        label="Tell me when you launch"
        onPress={() => {
          if (value.length === 10) setPhone(value);
          toast('Done. We’ll message you when we launch.');
        }}
      />
      <Button
        label="See Noida prices anyway"
        variant="ghost"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  field: { marginTop: 4 },
});
