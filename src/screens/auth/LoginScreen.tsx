import { Placeholder } from '@/navigation/Placeholder';

export default function LoginScreen() {
  return (
    <Placeholder
      title="Login"
      mockup="C01"
      next={[
        { label: 'Enter OTP, continue', go: n => n.navigate('CitySelect') },
      ]}
    />
  );
}
