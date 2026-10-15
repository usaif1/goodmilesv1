import {
  MEMBERSHIP_MAX_DISCOUNT,
  MEMBERSHIP_PERCENT,
  type Coupon,
  type Service,
  type Slot,
} from '@/mocks';

export type Totals = {
  itemTotal: number;
  couponDiscount: number;
  slotDiscount: number;
  membershipDiscount: number;
  /** Always free in the mockups, kept explicit so the bill can say so. */
  pickup: number;
  toPay: number;
};

type Input = {
  lines: readonly Service[];
  coupon?: Coupon | null;
  slot?: Slot | null;
  membership?: boolean;
};

const capped = (value: number, max: number) => Math.min(Math.round(value), max);

/**
 * The cart bill.
 *
 * Reproduces C08 exactly: a 3,099 Standard Service plus a 2,099 AC
 * service is 5,198; XYZSERVICE takes 8% of the Periodic line only,
 * which is 248 and not 416, because the AC line is not eligible; the
 * 3-4 PM slot takes a flat 200; pickup is free. 5,198 - 248 - 200
 * leaves the 4,750 the mockup shows.
 *
 * Coupon and membership both apply. The mockups never show them
 * together - C08 offers membership to someone who has not bought it -
 * so this is an assumption rather than something the designs settle.
 */
export function computeTotals({
  lines,
  coupon,
  slot,
  membership = false,
}: Input): Totals {
  const itemTotal = lines.reduce((sum, s) => sum + s.price, 0);

  let couponDiscount = 0;
  if (coupon) {
    const eligible = coupon.appliesToCategory
      ? lines
          .filter(s => s.categoryId === coupon.appliesToCategory)
          .reduce((sum, s) => sum + s.price, 0)
      : itemTotal;
    const raw = coupon.flat > 0 ? coupon.flat : (eligible * coupon.percent) / 100;
    couponDiscount = eligible > 0 ? capped(raw, coupon.maxDiscount) : 0;
  }

  const slotDiscount = slot?.discount ?? 0;

  const membershipDiscount = membership
    ? capped((itemTotal * MEMBERSHIP_PERCENT) / 100, MEMBERSHIP_MAX_DISCOUNT)
    : 0;

  const pickup = 0;

  const toPay = Math.max(
    0,
    itemTotal - couponDiscount - slotDiscount - membershipDiscount + pickup,
  );

  return {
    itemTotal,
    couponDiscount,
    slotDiscount,
    membershipDiscount,
    pickup,
    toPay,
  };
}

/**
 * 5198 -> "5,198", 123456 -> "1,23,456": the Indian grouping the
 * mockups use, where only the last three digits group in threes and
 * everything above them groups in pairs.
 *
 * Done by hand rather than with toLocaleString('en-IN'). Hermes has
 * shipped incomplete Intl support, so the locale data this needs is
 * not something to depend on across both platforms, and a silently
 * wrong separator on device is hard to notice.
 */
export function formatAmount(value: number): string {
  const rounded = Math.round(value);
  const digits = String(Math.abs(rounded));
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3);
  const grouped = rest
    ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}`
    : last3;
  return rounded < 0 ? `-${grouped}` : grouped;
}
