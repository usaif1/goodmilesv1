import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, StatusBand, StickyFooter, TextField } from '@/components';
import type { RootNav } from '@/navigation';
import { color, layout, space, type } from '@/theme';
import { OtpInput } from './OtpInput';

/** 24 -> "0:24", as the mockup writes it. */
const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/**
 * C01.
 *
 * The only screen with no header: the mockup shows the status band
 * sitting straight on the page background, so StatusBand is used on
 * its own rather than through ScreenHeader.
 */
export default function LoginScreen() {
  const navigation = useNavigation<RootNav>();
  const [phone, setPhone] = useState('98XXX XXX21');
  const [otp, setOtp] = useState('471');
  const [remaining, setRemaining] = useState(24);

  useEffect(() => {
    if (remaining <= 0) {
      return;
    }
    const id = setInterval(() => setRemaining(n => Math.max(0, n - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining]);

  return (
    <View style={s.root}>
      <StatusBand />
      <ScrollView
        contentContainerStyle={s.body}
        keyboardShouldPersistTaps="handled">
        <View style={s.brand}>
          <Text style={s.logo}>XYZ</Text>
          <Text style={s.tagline}>Car service at your doorstep</Text>
        </View>

        <Text style={s.heading}>Login with mobile number</Text>

        <View style={s.field}>
          <TextField
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            left={<Text style={s.dialCode}>+91</Text>}
          />
        </View>

        <Text style={s.otpLabel}>Enter the 4-digit OTP sent to your number</Text>
        <View style={s.otp}>
          <OtpInput value={otp} onChange={setOtp} />
        </View>

        <Text style={s.resend}>
          {remaining > 0 ? `Resend OTP in ${clock(remaining)}` : 'Resend OTP'}
        </Text>
      </ScrollView>

      <StickyFooter>
        <Button
          label="Verify & Continue"
          block
          disabled={otp.length < 4}
          onPress={() => navigation.navigate('CitySelect')}
        />
      </StickyFooter>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  body: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 56,
    paddingBottom: space.xxl,
  },
  brand: { alignItems: 'center', gap: space.sm },
  logo: type.display,
  tagline: type.bodyMuted,
  /** Measured: 60pt from the tagline down to this heading on C01. */
  heading: { ...type.h1, marginTop: 60 },
  field: { marginTop: space.lg },
  dialCode: { ...type.body, color: color.textStrong },
  otpLabel: { ...type.meta, marginTop: space.lg },
  otp: { marginTop: space.md },
  resend: { ...type.meta, marginTop: space.md },
});
