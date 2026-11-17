import { NavigationContainer, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  CertificateScreen,
  CertifiedPdfScreen,
  GuardianScreen,
  HelpScreen,
  MembershipScreen,
  NotRightScreen,
  NotificationsScreen,
  PassportScreen,
  ReferScreen,
  RewardsScreen,
  SafetyScreen,
} from '@/screens/account';
import {
  AddressScreen,
  CartScreen,
  ConfirmedScreen,
  ReviewScreen,
  SlotScreen,
} from '@/screens/booking';
import {
  AllCategoriesScreen,
  CategoryScreen,
  SearchScreen,
  ServiceDetailScreen,
} from '@/screens/browse';
import {
  BillScreen,
  SampleDayScreen,
  CarPhotosScreen,
  DeliveryScreen,
  EstimateScreen,
  PickupScreen,
  RateScreen,
  WorkScreen,
} from '@/screens/serviceday';
import {
  BrandScreen,
  CityScreen,
  OtpScreen,
  WelcomeScreen,
} from '@/screens/onboarding';
import { TabNavigator } from './TabNavigator';
import { face, useTheme } from '@/theme';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { c, isDark } = useTheme();

  /**
   * Screens draw their own headers, so this only colours what sits
   * behind them - the push animation's backdrop, mainly.
   */
  const navTheme: Theme = {
    dark: isDark,
    colors: {
      primary: c.sel,
      background: c.page,
      card: c.card,
      text: c.ink,
      border: c.line,
      notification: c.orange,
    },
    fonts: {
      regular: { fontFamily: face.regular, fontWeight: '400' },
      medium: { fontFamily: face.medium, fontWeight: '400' },
      bold: { fontFamily: face.semibold, fontWeight: '400' },
      heavy: { fontFamily: face.bold, fontWeight: '400' },
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="City" component={CityScreen} />
        <Stack.Screen name="Brand" component={BrandScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Slot" component={SlotScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Confirmed" component={ConfirmedScreen} />
        <Stack.Screen name="Pickup" component={PickupScreen} />
        <Stack.Screen name="CarPhotos" component={CarPhotosScreen} />
        <Stack.Screen name="Estimate" component={EstimateScreen} />
        <Stack.Screen name="Work" component={WorkScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
        <Stack.Screen name="Bill" component={BillScreen} />
        <Stack.Screen name="Rate" component={RateScreen} />
        <Stack.Screen name="SampleDay" component={SampleDayScreen} />
        <Stack.Screen name="Passport" component={PassportScreen} />
        <Stack.Screen name="CertifiedPdf" component={CertifiedPdfScreen} />
        <Stack.Screen name="Certificate" component={CertificateScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Rewards" component={RewardsScreen} />
        <Stack.Screen name="Refer" component={ReferScreen} />
        <Stack.Screen name="Membership" component={MembershipScreen} />
        <Stack.Screen name="Safety" component={SafetyScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="NotRight" component={NotRightScreen} />
        <Stack.Screen name="Guardian" component={GuardianScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
