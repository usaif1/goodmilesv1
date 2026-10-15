import { useRoute, type RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { Placeholder } from '@/navigation/Placeholder';

export default function EstimateReviewScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'EstimateReview'>>();
  return (
    <Placeholder
      title="Review estimate"
      params={route.params}
      next={[
        { label: 'Approve and pay', go: n => n.navigate('Payment', { orderId: 'XYZ-100245' }) },
      ]}
    />
  );
}
