import { Placeholder } from '@/navigation/Placeholder';

export default function HomeScreen() {
  return (
    <Placeholder
      title="Home"
      mockup="C05"
      next={[
        { label: 'Periodic Services', go: n => n.navigate('CategoryServices', { categoryId: 'periodic', categoryName: 'Periodic Services' }) },
        { label: 'AC Service & Repair', go: n => n.navigate('CategoryServices', { categoryId: 'ac', categoryName: 'AC Service & Repair' }) },
        { label: 'Reserve Member banner', go: n => n.navigate('ReserveMember') },
        { label: 'Change car', go: n => n.navigate('CarSelect') },
        { label: 'Cart', go: n => n.navigate('Cart') },
      ]}
    />
  );
}
