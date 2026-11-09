import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBar, type TabItem } from '@/components';
import { HomeScreen } from '@/screens/browse';
import { LiveScreen } from '@/screens/serviceday';
import { makePlaceholder } from '@/screens/Placeholder';
import { useApp } from '@/store';

import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const GarageScreen = makePlaceholder('My Garage', 'The passport lands in 4e.');
const AccountScreen = makePlaceholder('Account', 'Account lands in 4f.');

const ITEMS: TabItem[] = [
  { key: 'HomeTab', label: 'Home', icon: 'home' },
  { key: 'LiveTab', label: 'Bookings', icon: 'live' },
  { key: 'GarageTab', label: 'My Garage', icon: 'garage' },
  { key: 'AccountTab', label: 'Account', icon: 'user' },
];

export function TabNavigator() {
  // The live dot only shows while an order is actually running.
  const running = useApp(s => s.order !== null && s.stage < 9);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <TabBar
          items={ITEMS.map(i =>
            i.key === 'LiveTab' ? { ...i, dot: running } : i,
          )}
          active={state.routes[state.index].name}
          onSelect={key => navigation.navigate(key)}
        />
      )}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="LiveTab" component={LiveScreen} />
      <Tab.Screen name="GarageTab" component={GarageScreen} />
      <Tab.Screen name="AccountTab" component={AccountScreen} />
    </Tab.Navigator>
  );
}
