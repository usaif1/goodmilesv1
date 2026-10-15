import { useRoute, type RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { Placeholder } from '@/navigation/Placeholder';

export default function BookingConfirmedScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'BookingConfirmed'>>();
  return (
    <Placeholder
      title="Booking confirmed"
      mockup="C10"
      params={route.params}
      next={[
        { label: 'Track Order', go: n => n.navigate('OrderTracking', { orderId: 'XYZ-100245' }) },
      ]}
    />
  );
}
