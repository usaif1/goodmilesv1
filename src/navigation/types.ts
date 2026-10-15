import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * The full route table, fixed up front.
 *
 * Settling every route and its params here means each screen branch
 * only fills in its own screen bodies and never has to touch the
 * navigators again - which is what keeps those branches from
 * conflicting with each other.
 */
export type TabParamList = {
  HomeTab: undefined;
  OrdersTab: undefined;
  ReserveTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  // Auth
  Login: undefined; // C01
  CitySelect: undefined; // C02

  // Tabs: Home C05, MyOrders C16, ReserveMember C15, Profile (no mockup)
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;

  // Booking flow
  CategoryServices: { categoryId: string; categoryName: string }; // C06
  ServiceDetail: { serviceId: string }; // C07
  Cart: undefined; // C08
  Schedule: undefined; // C09
  BookingConfirmed: { orderId: string }; // C10

  // Post-booking
  OrderTracking: { orderId: string }; // C11
  EstimateReview: { orderId: string }; // no mockup - C11 "Review" targets it
  Feedback: { orderId: string }; // C14
  Payment: { orderId: string }; // no mockup

  /**
   * Also a tab. Registered here as well because the Home and Cart
   * banners push it, so "Buy" returns the user where they came from
   * rather than dumping them on the Reserve tab.
   */
  ReserveMember: undefined; // C15

  CarSelect: undefined; // no mockup
};

export type RootNav = NativeStackNavigationProp<RootStackParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
