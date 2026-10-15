import { Placeholder } from '@/navigation/Placeholder';

export default function CitySelectScreen() {
  return (
    <Placeholder
      title="Select your city"
      mockup="C02"
      next={[
        { label: 'Pick Delhi', go: n => n.reset({ index: 0, routes: [{ name: 'MainTabs' }] }) },
      ]}
    />
  );
}
