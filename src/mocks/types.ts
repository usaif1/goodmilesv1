import type { LucideIcon } from 'lucide-react-native';

export type City = { id: string; name: string };

export type Segment = 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury';

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  fuel: 'Petrol' | 'Diesel' | 'CNG';
  segment: Segment;
  registration: string;
};

export type Category = {
  id: string;
  name: string;
  /**
   * The icon lives on the data rather than in a lookup in the screen.
   * The mockups use emoji here, so these are the closest lucide
   * equivalents - see the C05 grid.
   */
  Icon: LucideIcon;
};

/** C06 splits a category's services across two tabs. */
export type ServiceTab = 'scheduled' | 'value';

export type Service = {
  id: string;
  categoryId: string;
  title: string;
  /** e.g. "Takes 4 Hours - 1 Month / 1,000 kms warranty". */
  meta: string;
  includes: readonly string[];
  /** Paise-free rupees, as every price in the mockups is whole. */
  price: number;
  was?: number;
  tab: ServiceTab;
  /** Longer blurb shown on C07. */
  recommended?: string;
};

export type OrderState =
  | 'estimate_sent'
  | 'completed'
  | 'cancelled'
  | 'in_progress';

export type Order = {
  id: string;
  vehicle: string;
  summary: string;
  date: string;
  state: OrderState;
  total?: number;
  /** Shown on C16 for cancelled orders. */
  reason?: string;
};

export type Coupon = {
  code: string;
  label: string;
  /** Percentage off the eligible lines; 0 for a flat-value coupon. */
  percent: number;
  /** Flat rupees off, as XYZFIRST gives; 0 for a percentage coupon. */
  flat: number;
  /** Restricts the discount to one category, as XYZSERVICE does. */
  appliesToCategory: string | null;
  maxDiscount: number;
};

export type Slot = {
  id: string;
  label: string;
  /** Off-peak slots carry a flat discount on C09. */
  discount: number;
};
