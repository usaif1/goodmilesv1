import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/** The four tabs the prototype's `tabbar()` shows. */
export type TabParamList = {
  HomeTab: undefined;
  LiveTab: undefined;
  GarageTab: undefined;
  AccountTab: undefined;
};

/**
 * Routes are named for the prototype's screens so the two stay easy to
 * compare. Added as each group is built.
 */
export type RootStackParamList = {
  Welcome: undefined;
  Otp: undefined;
  City: undefined;
  Brand: undefined;
  Main: undefined;
  AllCategories: undefined;
  Category: { categoryId: string };
  ServiceDetail: { serviceId: string };
  Search: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

/** A tab screen can also push onto the root stack. */
export type TabScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
