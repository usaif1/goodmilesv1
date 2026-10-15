import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import CitySelectScreen from '@/screens/auth/CitySelectScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import BookingConfirmedScreen from '@/screens/booking/BookingConfirmedScreen';
import CartScreen from '@/screens/booking/CartScreen';
import PaymentScreen from '@/screens/booking/PaymentScreen';
import ScheduleScreen from '@/screens/booking/ScheduleScreen';
import CarSelectScreen from '@/screens/home/CarSelectScreen';
import CategoryServicesScreen from '@/screens/home/CategoryServicesScreen';
import ServiceDetailScreen from '@/screens/home/ServiceDetailScreen';
import EstimateReviewScreen from '@/screens/orders/EstimateReviewScreen';
import FeedbackScreen from '@/screens/orders/FeedbackScreen';
import OrderTrackingScreen from '@/screens/orders/OrderTrackingScreen';
import ReserveMemberScreen from '@/screens/reserve/ReserveMemberScreen';
import { color } from '@/theme';
import { TabNavigator } from './TabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * headerShown is off everywhere: every screen in the mockups draws its
 * own green header, so there is no native header to configure.
 *
 * StatusBar carries only barStyle: RN 0.87 removed the Android
 * backgroundColor prop as part of the edge-to-edge migration. The
 * mockups show a darker strip (#0B5C55) behind the status bar, which
 * ScreenHeader will draw as an inset-height band in feat/ui-primitives.
 *
 * There is deliberately no auth gate. Login -> CitySelect -> MainTabs
 * is a reset rather than a conditional stack, which gives the same
 * "cannot go back to login" behaviour without inventing session state
 * this branch has no use for.
 */
export function RootNavigator() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.bg } }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CitySelect" component={CitySelectScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="CategoryServices" component={CategoryServicesScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="BookingConfirmed" component={BookingConfirmedScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        <Stack.Screen name="EstimateReview" component={EstimateReviewScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="ReserveMember" component={ReserveMemberScreen} />
        <Stack.Screen name="CarSelect" component={CarSelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
