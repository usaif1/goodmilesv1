import type { Segment, Vehicle } from './types';

/** The car C05 and C10 show. */
export const DEFAULT_VEHICLE: Vehicle = {
  id: 'swift-petrol',
  make: 'Maruti Suzuki',
  model: 'Swift',
  fuel: 'Petrol',
  segment: 'Hatchback',
  registration: 'DL 3C AB 1234',
};

export const MEMBERSHIP_BENEFITS: readonly string[] = [
  '10% off every service (max Rs 1,000 per order)',
  'Free pickup and drop',
  'Priority time slots',
  'Valid 12 months',
];

/** C15's price table, in the order the mockup lists it. */
export const MEMBERSHIP_PRICES: readonly {
  segment: Segment;
  price: number;
  was: number;
}[] = [
  { segment: 'Hatchback', price: 1199, was: 1899 },
  { segment: 'Luxury', price: 2299, was: 3699 },
  { segment: 'SUV', price: 1399, was: 2199 },
  { segment: 'Sedan', price: 1199, was: 1899 },
];

export const membershipPriceFor = (segment: Segment) =>
  MEMBERSHIP_PRICES.find(p => p.segment === segment);

/** Terms the cart applies while a membership is active. */
export const MEMBERSHIP_PERCENT = 10;
export const MEMBERSHIP_MAX_DISCOUNT = 1000;

/**
 * Alternatives offered by CarSelect. No mockup covers that screen, so
 * this is a small plausible garage rather than a real catalogue.
 */
export const GARAGE: readonly Vehicle[] = [
  DEFAULT_VEHICLE,
  {
    id: 'city-petrol',
    make: 'Honda',
    model: 'City',
    fuel: 'Petrol',
    segment: 'Sedan',
    registration: 'DL 8C XY 4412',
  },
  {
    id: 'creta-diesel',
    make: 'Hyundai',
    model: 'Creta',
    fuel: 'Diesel',
    segment: 'SUV',
    registration: 'HR 26 DQ 7781',
  },
];
