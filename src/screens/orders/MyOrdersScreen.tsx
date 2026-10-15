import { Placeholder } from '@/navigation/Placeholder';

export default function MyOrdersScreen() {
  return (
    <Placeholder
      title="My orders"
      mockup="C16"
      next={[
        { label: '#XYZ-100245 (estimate sent)', go: n => n.navigate('OrderTracking', { orderId: 'XYZ-100245' }) },
      ]}
    />
  );
}
