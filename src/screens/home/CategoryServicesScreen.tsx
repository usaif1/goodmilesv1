import { useRoute, type RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { Placeholder } from '@/navigation/Placeholder';

export default function CategoryServicesScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CategoryServices'>>();
  return (
    <Placeholder
      title="Category services"
      mockup="C06"
      params={route.params}
      next={[
        { label: 'Standard Service', go: n => n.navigate('ServiceDetail', { serviceId: 'standard-service' }) },
        { label: 'View Cart', go: n => n.navigate('Cart') },
      ]}
    />
  );
}
