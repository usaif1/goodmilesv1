import { Placeholder } from '@/navigation/Placeholder';

export default function CartScreen() {
  return (
    <Placeholder
      title="Cart"
      mockup="C08"
      next={[
        { label: 'Select Slot', go: n => n.navigate('Schedule') },
        { label: 'Become a Reserve Member', go: n => n.navigate('ReserveMember') },
      ]}
    />
  );
}
