import { Placeholder } from '@/navigation/Placeholder';

export default function ProfileScreen() {
  return (
    <Placeholder
      title="Profile"
      next={[
        { label: 'Change car', go: n => n.navigate('CarSelect') },
      ]}
    />
  );
}
