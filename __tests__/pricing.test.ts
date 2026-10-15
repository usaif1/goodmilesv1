/**
 * The cart bill is the only real logic in this build, and C08 states
 * every line of it, so the mockup doubles as the expected output.
 *
 * @format
 */

import { COUPONS, SLOTS, serviceById, type Service } from '@/mocks';
import { computeTotals, formatAmount } from '@/store';

const service = (id: string): Service => {
  const s = serviceById(id);
  if (!s) throw new Error(`missing fixture: ${id}`);
  return s;
};

const coupon = (code: string) => {
  const c = COUPONS.find(x => x.code === code);
  if (!c) throw new Error(`missing coupon: ${code}`);
  return c;
};

const slot = (id: string) => SLOTS.find(s => s.id === id) ?? null;

test('reproduces the C08 bill exactly', () => {
  const totals = computeTotals({
    lines: [service('standard-service'), service('regular-ac-service')],
    coupon: coupon('XYZSERVICE'),
    slot: slot('3-4'),
  });

  expect(totals.itemTotal).toBe(5198);
  expect(totals.couponDiscount).toBe(248);
  expect(totals.slotDiscount).toBe(200);
  expect(totals.pickup).toBe(0);
  expect(totals.toPay).toBe(4750);
});

test('a category coupon ignores lines outside its category', () => {
  // 8% of the whole 5,198 cart would be 416; only the 3,099 Periodic
  // line is eligible, which is what makes the mockup's 248 correct.
  const both = computeTotals({
    lines: [service('standard-service'), service('regular-ac-service')],
    coupon: coupon('XYZSERVICE'),
  });
  const periodicOnly = computeTotals({
    lines: [service('standard-service')],
    coupon: coupon('XYZSERVICE'),
  });

  expect(both.couponDiscount).toBe(248);
  expect(both.couponDiscount).toBe(periodicOnly.couponDiscount);
  expect(both.couponDiscount).not.toBe(416);
});

test('a coupon with no eligible lines discounts nothing', () => {
  const totals = computeTotals({
    lines: [service('regular-ac-service')],
    coupon: coupon('XYZSERVICE'),
  });
  expect(totals.couponDiscount).toBe(0);
  expect(totals.toPay).toBe(2099);
});

test('the coupon cap is enforced', () => {
  // Three periodic services: 2,599 + 3,099 + 4,999 = 10,697.
  // 8% is 856, above the 600 cap.
  const totals = computeTotals({
    lines: [
      service('basic-service'),
      service('standard-service'),
      service('comprehensive-service'),
    ],
    coupon: coupon('XYZSERVICE'),
  });
  expect(totals.itemTotal).toBe(10697);
  expect(totals.couponDiscount).toBe(600);
});

test('a flat coupon takes its value, not a percentage', () => {
  const totals = computeTotals({
    lines: [service('standard-service')],
    coupon: coupon('XYZFIRST'),
  });
  expect(totals.couponDiscount).toBe(300);
  expect(totals.toPay).toBe(2799);
});

test('membership takes 10 per cent, capped at 1,000', () => {
  const small = computeTotals({
    lines: [service('standard-service')],
    membership: true,
  });
  expect(small.membershipDiscount).toBe(310); // 10% of 3,099, rounded

  const large = computeTotals({
    lines: [
      service('basic-service'),
      service('standard-service'),
      service('comprehensive-service'),
    ],
    membership: true,
  });
  expect(large.membershipDiscount).toBe(1000); // 1,070 capped
});

test('an empty cart totals zero', () => {
  const totals = computeTotals({ lines: [], coupon: coupon('XYZSERVICE') });
  expect(totals.itemTotal).toBe(0);
  expect(totals.couponDiscount).toBe(0);
  expect(totals.toPay).toBe(0);
});

test('toPay never goes negative', () => {
  const totals = computeTotals({
    lines: [service('car-wash')], // 649
    slot: { id: 'x', label: 'x', discount: 5000 },
  });
  expect(totals.toPay).toBe(0);
});

test('formatAmount uses Indian grouping', () => {
  expect(formatAmount(649)).toBe('649');
  expect(formatAmount(5198)).toBe('5,198');
  expect(formatAmount(4750)).toBe('4,750');
  expect(formatAmount(10697)).toBe('10,697');
  expect(formatAmount(123456)).toBe('1,23,456');
  expect(formatAmount(10000000)).toBe('1,00,00,000');
  expect(formatAmount(0)).toBe('0');
});
