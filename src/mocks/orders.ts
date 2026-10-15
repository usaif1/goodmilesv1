import type { TimelineStep } from '@/components';
import type { Coupon, Order, Slot } from './types';

/** The three rows on C16, in order. */
export const ORDERS: readonly Order[] = [
  {
    id: 'XYZ-100245',
    vehicle: 'Swift Petrol',
    summary: 'Standard Service + 1 more',
    date: '9 Oct',
    state: 'estimate_sent',
  },
  {
    id: 'XYZ-099812',
    vehicle: 'Swift Petrol',
    summary: 'Car Wash',
    date: '14 Aug',
    state: 'completed',
    total: 649,
  },
  {
    id: 'XYZ-098004',
    vehicle: 'Swift Petrol',
    summary: 'Wheel Alignment',
    date: '2 Jul',
    state: 'cancelled',
    reason: 'Want a different date',
  },
];

export const orderById = (id: string) => ORDERS.find(o => o.id === id);

/** The nine steps on C11, with the order paused on the estimate. */
export const TRACKING_STEPS: readonly TimelineStep[] = [
  { label: 'Booking received', at: '8 Oct, 6:12 PM', state: 'done' },
  { label: 'Booking confirmed', at: '8 Oct, 6:40 PM', state: 'done' },
  { label: 'Car picked up', at: '9 Oct, 3:22 PM', state: 'done' },
  { label: 'Car at workshop', at: '9 Oct, 4:05 PM', state: 'done' },
  {
    label: 'Estimate ready - please approve',
    at: '9 Oct, 5:30 PM',
    state: 'active',
  },
  { label: 'Repair in progress', state: 'pending' },
  { label: 'Your car is ready', state: 'pending' },
  { label: 'Delivered', state: 'pending' },
  { label: 'Paid and closed', state: 'pending' },
];

/** C09 offers four dates; the second is preselected. */
export const DATES = [
  { id: 'today', day: 'Today', date: '8 Oct' },
  { id: 'fri', day: 'Fri', date: '9 Oct' },
  { id: 'sat', day: 'Sat', date: '10 Oct' },
  { id: 'sun', day: 'Sun', date: '11 Oct' },
] as const;

/** Afternoon slots carry a flat Rs 200 off on C09. */
export const SLOTS: readonly Slot[] = [
  { id: '10-11', label: '10 - 11 AM', discount: 0 },
  { id: '11-12', label: '11 AM - 12 PM', discount: 0 },
  { id: '12-1', label: '12 - 1 PM', discount: 0 },
  { id: '1-2', label: '1 - 2 PM', discount: 0 },
  { id: '2-3', label: '2 - 3 PM', discount: 0 },
  { id: '3-4', label: '3 - 4 PM', discount: 200 },
  { id: '4-5', label: '4 - 5 PM', discount: 200 },
  { id: '5-6', label: '5 - 6 PM', discount: 200 },
];

/**
 * The coupon applied on C08. It is restricted to Periodic Services,
 * which is what makes the mockup's arithmetic work: 8% of the 3,099
 * Standard Service is 248, and the 2,099 AC service is excluded.
 */
export const COUPONS: readonly Coupon[] = [
  {
    code: 'XYZSERVICE',
    label: '8% off Periodic Services (max Rs 600)',
    percent: 8,
    flat: 0,
    appliesToCategory: 'periodic',
    maxDiscount: 600,
  },
  {
    code: 'XYZFIRST',
    label: 'Rs 300 off your first service',
    percent: 0,
    flat: 300,
    appliesToCategory: null,
    maxDiscount: 300,
  },
];

export const couponByCode = (code: string) =>
  COUPONS.find(c => c.code === code);

/** The seven reasons offered on C14. */
export const COMPLAINT_REASONS: readonly string[] = [
  'Delay in delivery',
  'Bill higher than estimate',
  'Work quality',
  'Car damaged',
  'Staff behaviour',
  'Refund',
  'Other',
];
