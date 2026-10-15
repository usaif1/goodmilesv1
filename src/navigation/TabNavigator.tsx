import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/**
 * Icons are imported one per path, never from the lucide barrel.
 * Metro does not tree-shake, so `import { House } from
 * 'lucide-react-native'` pulls all ~1500 icons into the bundle - it
 * measured 3.1MB vs 1.3MB for the same four icons. Please keep using
 * the per-icon paths in the screen branches.
 */
import type { LucideIcon } from 'lucide-react-native';
import ClipboardList from 'lucide-react-native/icons/clipboard-list';
import House from 'lucide-react-native/icons/house';
import Star from 'lucide-react-native/icons/star';
import User from 'lucide-react-native/icons/user';
import { StyleSheet, Text } from 'react-native';
import HomeScreen from '@/screens/home/HomeScreen';
import MyOrdersScreen from '@/screens/orders/MyOrdersScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import ReserveMemberScreen from '@/screens/reserve/ReserveMemberScreen';
import { color, layout, type } from '@/theme';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * Tab bar styling is sampled from C05/C16: a white bar over the page
 * background, a 1pt #EAECF0 top edge, brand green for the active tab
 * and grey-500 for the rest.
 *
 * The icon and label renderers are built once at module scope rather
 * than inline in the JSX. Defining them during render would hand React
 * a new component type on every pass and throw away the subtree.
 */
const icon = (Icon: LucideIcon) => {
  const render = ({ color: c, size }: { color: string; size: number }) => (
    <Icon color={c} size={size} />
  );
  return render;
};

/**
 * The mockups show the active tab bold and the rest regular, which a
 * single tabBarLabelStyle cannot express, so the label renders through
 * a function that reads focused state.
 */
const label = (text: string) => {
  const render = ({ focused }: { focused: boolean }) => (
    <Text style={[s.label, focused ? s.labelActive : s.labelInactive]}>
      {text}
    </Text>
  );
  return render;
};

const home = { tabBarIcon: icon(House), tabBarLabel: label('Home') };
const orders = {
  tabBarIcon: icon(ClipboardList),
  tabBarLabel: label('Orders'),
};
const reserve = { tabBarIcon: icon(Star), tabBarLabel: label('Reserve') };
const profile = { tabBarIcon: icon(User), tabBarLabel: label('Profile') };

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: s.bar,
        tabBarActiveTintColor: color.brand,
        tabBarInactiveTintColor: color.textMuted,
      }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={home} />
      <Tab.Screen
        name="OrdersTab"
        component={MyOrdersScreen}
        options={orders}
      />
      <Tab.Screen
        name="ReserveTab"
        component={ReserveMemberScreen}
        options={reserve}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={profile}
      />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  bar: {
    backgroundColor: color.surface,
    borderTopWidth: layout.hairline,
    borderTopColor: color.divider,
  },
  label: { ...type.tab, marginBottom: 2 },
  labelActive: { color: color.brand, fontWeight: '700' },
  labelInactive: { color: color.textMuted, fontWeight: '400' },
});
