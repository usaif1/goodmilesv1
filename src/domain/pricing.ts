import {
  SEGMENT,
  YEAR_FACTOR,
  serviceById,
  servicesInCategory,
  type Service,
} from '@/data';

export type PartChoice = 'oes' | 'oem';

export type Car = {
  brand: string;
  model: string;
  /** A band from YEAR_BANDS, not a calendar year. */
  year: string;
  fuel: string;
  trans: string;
};

/** Luxury marques cost well over twice a hatchback to service. */
const LUXURY = ['BMW', 'Mercedes-Benz', 'Audi'];
const LUXURY_FACTOR = 2.2;

/** Automatics take longer on a periodic service. */
const AUTOMATIC_FACTOR = 1.06;

/** Carmaker (OEM) parts over branded (OES). */
const OEM_FACTOR = 1.22;

/** Compare-at price is 30% over what we charge. */
const MRP_FACTOR = 1.3;

/**
 * Every price the customer sees ends in 99 - round to the nearest
 * hundred, then take one off. Never below 99.
 */
export const r99 = (n: number): number =>
  n <= 0 ? 0 : Math.max(99, Math.round(n / 100) * 100 - 1);

/** The struck-through compare-at price. */
export const mrp = (p: number): number => r99(p * MRP_FACTOR);

/** How much more this car costs to service than the smallest cars. */
export function segmentFactor(car: Car | null): number {
  if (!car) return 1;
  if (LUXURY.includes(car.brand)) return LUXURY_FACTOR;
  const band = Object.keys(SEGMENT).find(f => SEGMENT[f].includes(car.model));
  return band ? Number(band) : 1;
}

/**
 * What this car pays for this job.
 *
 * Returns null when no car is chosen - the screens show "Add your car to
 * see the price" rather than a number, so this is a real state, not an
 * error. Zero means the job is genuinely free.
 */
export function priceFor(
  service: Service,
  car: Car | null,
  part?: PartChoice,
): number | null {
  if (!car) return null;
  if (service.base === 0) return 0;
  const parts = (part ?? 'oes') === 'oem' && service.parts ? OEM_FACTOR : 1;
  const auto =
    car.trans === 'Automatic' && service.cat === 'periodic'
      ? AUTOMATIC_FACTOR
      : 1;
  return r99(
    service.base *
      (YEAR_FACTOR[car.year] ?? 1) *
      segmentFactor(car) *
      auto *
      parts,
  );
}

/** The "from" price on a category tile: its cheapest paid job. */
export function categoryFrom(cat: string, car: Car | null): number | null {
  if (!car) return null;
  const prices = servicesInCategory(cat)
    .filter(s => s.base > 0)
    .map(s => priceFor(s, car, 'oes'))
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}

export type BillInput = {
  cart: string[];
  car: Car | null;
  qty?: Record<string, number>;
  parts?: Record<string, PartChoice>;
  member?: boolean;
  coupon?: boolean;
  coins?: number;
  coinsOn?: boolean;
  loggedIn?: boolean;
  express?: boolean;
  payNow?: boolean;
};

export type BillLine = {
  service: Service;
  qty: number;
  unit: number | null;
  total: number | null;
};

export type Bill = {
  items: BillLine[];
  sub: number;
  memberFee: number;
  memberOff: number;
  couponOff: number;
  coinsUse: number;
  prepay: number;
  express: number;
  mrpOff: number;
  total: number;
  saved: number;
  /** What membership would save, whether or not it is taken. */
  memberSave: number;
};

const MEMBER_FEE = 1000;
const MEMBER_RATE = 0.1;
const COUPON_CAP = 200;
/** Coins can only ever pay a tenth of a bill. */
const COINS_RATE = 0.1;
const EXPRESS_FEE = 149;
const PREPAY_OFF = 59;
const PREPAY_MIN = 2000;

/**
 * The cart total. Discounts stack in a fixed order: the member discount
 * and the coupon are mutually exclusive, coins are capped against what
 * is left, and the membership fee and express pickup are added after.
 */
export function buildBill({
  cart,
  car,
  qty = {},
  parts = {},
  member = false,
  coupon = false,
  coins = 0,
  coinsOn = true,
  loggedIn = false,
  express = false,
  payNow = false,
}: BillInput): Bill {
  const items: BillLine[] = cart.flatMap(id => {
    const service = serviceById(id);
    if (!service) return [];
    const q = qty[id] ?? 1;
    const unit = priceFor(service, car, parts[id]);
    return [{ service, qty: q, unit, total: unit === null ? null : unit * q }];
  });

  const sub = items.reduce((a, b) => a + (b.total ?? 0), 0);
  const mrpOff = items.reduce(
    (a, b) => a + (b.unit ? (mrp(b.unit) - b.unit) * b.qty : 0),
    0,
  );

  const memberFee = member ? MEMBER_FEE : 0;
  const memberOff = member ? Math.round(sub * MEMBER_RATE) : 0;
  // A coupon cannot be used with the member discount.
  const couponOff = !member && coupon ? Math.min(COUPON_CAP, sub) : 0;
  const coinsUse =
    coinsOn && loggedIn
      ? Math.min(coins, Math.floor((sub - memberOff - couponOff) * COINS_RATE))
      : 0;
  const prepay = payNow && sub > PREPAY_MIN ? PREPAY_OFF : 0;
  const expressFee = express ? EXPRESS_FEE : 0;

  const total = Math.max(
    0,
    sub - memberOff - couponOff - coinsUse - prepay + memberFee + expressFee,
  );

  return {
    items,
    sub,
    memberFee,
    memberOff,
    couponOff,
    coinsUse,
    prepay,
    express: expressFee,
    mrpOff,
    total,
    saved: mrpOff + memberOff + couponOff + coinsUse + prepay,
    memberSave: Math.round(sub * MEMBER_RATE),
  };
}

/** Indian digit grouping, e.g. 1,04,299. */
export const inr = (n: number): string =>
  '₹' + Math.round(n).toLocaleString('en-IN');
