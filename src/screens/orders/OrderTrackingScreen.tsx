import { useRoute, type RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { Placeholder } from '@/navigation/Placeholder';

export default function OrderTrackingScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'OrderTracking'>>();
  return (
    <Placeholder
      title="Order tracking"
      mockup="C11"
      params={route.params}
      next={[
        { label: 'Review estimate', go: n => n.navigate('EstimateReview', { orderId: 'XYZ-100245' }) },
        { label: 'Rate your service', go: n => n.navigate('Feedback', { orderId: 'XYZ-100245' }) },
      ]}
    />
  );
}
