import { useRoute, type RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { Placeholder } from '@/navigation/Placeholder';

export default function ServiceDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceDetail'>>();
  return (
    <Placeholder
      title="Service detail"
      mockup="C07"
      params={route.params}
      next={[
        { label: 'Add to Cart', go: n => n.navigate('Cart') },
      ]}
    />
  );
}
