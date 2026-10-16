import BatteryCharging from 'lucide-react-native/icons/battery-charging';
import CarFront from 'lucide-react-native/icons/car-front';
import CircleDot from 'lucide-react-native/icons/circle-dot';
import Cog from 'lucide-react-native/icons/cog';
import Disc from 'lucide-react-native/icons/disc';
import Droplets from 'lucide-react-native/icons/droplets';
import Lightbulb from 'lucide-react-native/icons/lightbulb';
import Palette from 'lucide-react-native/icons/palette';
import Snowflake from 'lucide-react-native/icons/snowflake';
import Sparkles from 'lucide-react-native/icons/sparkles';
import Wrench from 'lucide-react-native/icons/wrench';
import type { Category, Service } from './types';

/**
 * C05 shows eight tiles and an "All 11 services" tile, so there are
 * eleven categories. The first eight are the ones the mockup names and
 * are kept in its order; the last three fill out the count.
 */
export const CATEGORIES: readonly Category[] = [
  { id: 'periodic', name: 'Periodic Services', Icon: Wrench },
  { id: 'brakes', name: 'Brakes', Icon: Disc },
  { id: 'ac', name: 'AC Service & Repair', Icon: Snowflake },
  { id: 'spa', name: 'Car Spa & Cleaning', Icon: Droplets },
  { id: 'detailing', name: 'Detailing', Icon: Sparkles },
  { id: 'denting', name: 'Denting & Painting', Icon: Palette },
  { id: 'tyres', name: 'Tyres & Wheel Care', Icon: CircleDot },
  { id: 'windshields', name: 'Windshields & Lights', Icon: Lightbulb },
  { id: 'batteries', name: 'Batteries', Icon: BatteryCharging },
  { id: 'suspension', name: 'Suspension & Fitments', Icon: Cog },
  { id: 'body', name: 'Clutch & Body Parts', Icon: CarFront },
];

/** The eight tiles C05 shows before "All 11 services". */
export const FEATURED_CATEGORY_IDS = CATEGORIES.slice(0, 8).map(c => c.id);

export const SERVICES: readonly Service[] = [
  // C06, Scheduled Service tab
  {
    id: 'basic-service',
    categoryId: 'periodic',
    title: 'Basic Service',
    meta: 'Takes 4 Hours · 1 Month / 1,000 kms warranty',
    includes: [
      'Air Filter Cleaning',
      'Battery Water Top up',
      'Car Wash',
      'Coolant Top up',
    ],
    price: 2599,
    was: 3199,
    tab: 'scheduled',
  },
  {
    id: 'standard-service',
    categoryId: 'periodic',
    title: 'Standard Service',
    meta: 'Takes 6 Hours · 1 Month / 1,000 kms warranty',
    includes: [
      'Air Filter Replacement',
      'Battery Water Top up',
      'Brake Fluid Top up',
      'Brake Pads Serviced',
    ],
    price: 3099,
    was: 3899,
    tab: 'scheduled',
  },
  {
    id: 'comprehensive-service',
    categoryId: 'periodic',
    title: 'Comprehensive Service',
    meta: 'Takes 8 Hours · 1 Month / 1,000 kms warranty',
    includes: [
      'Air Filter Replacement',
      'Battery Water Top up',
      'Brake Fluid Top up',
      'Brake Pads Serviced',
    ],
    price: 4999,
    was: 6199,
    tab: 'scheduled',
  },
  // C06, Value Services tab
  {
    id: 'car-wash',
    categoryId: 'periodic',
    title: 'Car Wash',
    meta: 'Takes 2 Hours · Exterior and interior',
    includes: ['Exterior Wash', 'Interior Vacuum', 'Tyre Polish'],
    price: 649,
    was: 899,
    tab: 'value',
  },
  {
    id: 'wheel-alignment',
    categoryId: 'tyres',
    title: 'Wheel Alignment',
    meta: 'Takes 1 Hour · Computerised',
    includes: ['Computerised Alignment', 'Balancing', 'Air Pressure Check'],
    price: 899,
    was: 1199,
    tab: 'value',
  },
  // C07
  {
    id: 'regular-ac-service',
    categoryId: 'ac',
    title: 'Regular AC Service',
    meta: 'Takes 4 Hours · 1 Month warranty · Every 3 Months Recommended',
    includes: [
      'AC Gas Topup ( upto 400gms )',
      'Condenser Cleaning',
      'AC Filter Cleaning',
      'AC Vent Cleaning',
      'AC Inspection',
    ],
    price: 2099,
    was: 2399,
    tab: 'scheduled',
    recommended: 'Every 3 Months Recommended',
  },
];

export const servicesForCategory = (categoryId: string) =>
  SERVICES.filter(s => s.categoryId === categoryId);

export const serviceById = (id: string) => SERVICES.find(s => s.id === id);

export const categoryById = (id: string) =>
  CATEGORIES.find(c => c.id === id);

/** C07's "How it works" steps. */
export const HOW_IT_WORKS: readonly string[] = [
  'Book a slot',
  'We pick up your car',
  'Approve the estimate',
  'Pay & get your car back',
];
