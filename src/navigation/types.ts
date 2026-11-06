import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Routes are named for the prototype's screens so the two stay easy to
 * compare. Added as each group is built.
 */
export type RootStackParamList = {
  Welcome: undefined;
  Otp: undefined;
  City: undefined;
  Brand: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
