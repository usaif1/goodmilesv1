import { useRoute, type RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { Placeholder } from '@/navigation/Placeholder';

export default function FeedbackScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Feedback'>>();
  return (
    <Placeholder
      title="Rate your service"
      mockup="C14"
      params={route.params}
      next={[
        { label: 'Submit', go: n => n.reset({ index: 0, routes: [{ name: 'MainTabs' }] }) },
      ]}
    />
  );
}
