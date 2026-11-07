import { NavigationContainer, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AllCategoriesScreen,
  CategoryScreen,
  SearchScreen,
  ServiceDetailScreen,
} from '@/screens/browse';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
