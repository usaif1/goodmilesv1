import { useRoute, type RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { Placeholder } from '@/navigation/Placeholder';

export default function PaymentScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Payment'>>();
  return (
    <Placeholder
      title="Payment"
      params={route.params}
      next={[
        { label: 'Pay and close', go: n => n.navigate('Feedback', { orderId: 'XYZ-100245' }) },
      ]}
    />
  );
}
