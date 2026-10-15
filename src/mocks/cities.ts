import type { City } from './types';

/** The twelve cities on C02, in the order the grid shows them. */
export const CITIES: readonly City[] = [
  { id: 'delhi', name: 'Delhi' },
  { id: 'gurugram', name: 'Gurugram' },
  { id: 'noida', name: 'Noida' },
  { id: 'ghaziabad', name: 'Ghaziabad' },
  { id: 'faridabad', name: 'Faridabad' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'thane', name: 'Thane' },
  { id: 'navi-mumbai', name: 'Navi Mumbai' },
  { id: 'pune', name: 'Pune' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'bengaluru', name: 'Bengaluru' },
  { id: 'chennai', name: 'Chennai' },
];

/** C02 says "We detected Delhi from your location". */
export const DETECTED_CITY_ID = 'delhi';
