/**
 * The sample service day: what Amit finds, what he does about it and
 * what goes in the customer's box. Lifted from the prototype's EST and
 * WORK maps.
 *
 * Prices are not stored here. Each line names a service, and the
 * estimate prices it for the customer's own car at render time, with
 * `fallback` standing in only when there is no car yet.
 */
export type EstimateItem = {
  id: string;
  name: string;
  /** The service whose price this line takes. */
  serviceId: string;
  fallback: number;
  /** What Amit measured. */
  note: string;
  /** Answers "what if I wait?" - absent on a line already booked. */
  wait?: string;
  /** What the customer gets out of it, on the optional jobs. */
  gain?: string;
  /** Already in the booking, so the price is locked and the tick fixed. */
  booked?: boolean;
};

/** Safety work: the booked job, plus anything found that cannot wait. */
export const ESTIMATE_MUST: EstimateItem[] = [
  {
    id: 'm1',
    name: 'Standard service',
    serviceId: 'standard',
    fallback: 4299,
    note: 'You booked this · price locked',
    booked: true,
  },
  {
    id: 'm2',
    name: 'Front brake pads',
    serviceId: 'pads',
    fallback: 2499,
    note: '2 mm left. Below 3 mm they can damage the discs.',
    wait: 'The pads wear down to the metal, and replacing damaged discs can cost about ₹6,000.',
  },
];

/** Worth doing, not urgent. Unticked by default. */
export const ESTIMATE_IMPROVE: EstimateItem[] = [
  {
    id: 'i1',
    name: 'AC cooling coil cleaning',
    serviceId: 'accoil',
    fallback: 2299,
    note: 'Vent air is 15°C. The cooling coil is dirty.',
    wait: 'The AC keeps cooling less. Nothing unsafe.',
    gain: 'Vent air from 15°C to about 8°C',
  },
  {
    id: 'i2',
    name: 'Wheel alignment',
    serviceId: 'align',
    fallback: 1199,
    note: 'The car pulls left at 60 km/h, so the tyres wear unevenly.',
    wait: 'The tyres keep wearing unevenly, which shortens their life.',
    gain: 'Tyres last up to 20% longer, about 2–3% better mileage',
  },
];

export const ESTIMATE_ITEMS = [...ESTIMATE_MUST, ...ESTIMATE_IMPROVE];

/**
 * What the customer sees once a job is done: the before and after
 * labels, and the record that goes on the bill and in the passport.
 */
export type WorkRecord = {
  name: string;
  /** Captions for the before/after pair; one entry where a single photo shows both. */
  shots: string[];
  record: string;
};

export const WORK_RECORDS: Record<string, WorkRecord> = {
  m1: {
    name: 'Engine oil and filter',
    shots: ['Old oil out', 'New oil, sealed can'],
    record: '5W-30, 3.5 L · Batch B0336 · Old filter goes in your box',
  },
  m2: {
    name: 'Front brake pads',
    shots: ['Old 2 mm · New 10 mm'],
    record:
      'Branded (OES) · Part no. 58101-K9A00 · 3-month warranty · Old pads go in your box',
  },
  i1: {
    name: 'AC cooling coil cleaning',
    shots: ['Vent 15°C', 'Coil cleaned'],
    record: 'Vent air after: 8°C',
  },
  i2: {
    name: 'Wheel alignment',
    shots: ['Pulled left', 'Aligned'],
    record: 'Before and after readings go in your service record',
  },
};

/** The eight angles photographed at pickup, in order. */
export const PICKUP_ANGLES = [
  'Front left',
  'Front right',
  'Rear',
  'Left side',
  'Right side',
  'Odometer, fuel',
  'Interior',
  'Bumper scratch',
] as const;

/** The action each stage offers on the bookings timeline. */
export const STAGE_ACTIONS = [
  'Pickup details',
  'Meet your Guardian',
  'See car photos',
  'Review estimate',
  'See work photos',
  'See work photos',
  'See delivery',
  'See delivery',
  'See your bill',
  'Open passport',
] as const;

/** Odometer and fuel as recorded at pickup and delivery. */
export const ODOMETER = { pickup: '42,310 km', delivery: '42,328 km' } as const;
