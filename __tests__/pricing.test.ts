import { SERVICES, serviceById } from '@/data';
import {
  buildBill,
  categoryFrom,
  inr,
  mrp,
  priceFor,
  r99,
  segmentFactor,
  type Car,
} from '@/domain';

const standard = serviceById('standard')!;

const creta: Car = {
  brand: 'Hyundai',
  model: 'Creta',
  year: '2020–2022',
  fuel: 'Petrol',
  trans: 'Manual',
};
const swift: Car = {
  brand: 'Maruti Suzuki',
  model: 'Swift',
  year: '2023 or newer',
  fuel: 'Petrol',
  trans: 'Manual',
};
const bmw: Car = {
  brand: 'BMW',
  model: '3 Series',
  year: '2023 or newer',
  fuel: 'Petrol',
  trans: 'Automatic',
};

describe('r99', () => {
  it('lands every price on a 99', () => {
    for (const n of [1, 150, 3992.94, 4871.4, 10000]) {
      expect(r99(n) % 100).toBe(99);
    }
  });

  it('never goes below 99, and keeps free jobs free', () => {
    expect(r99(10)).toBe(99);
    expect(r99(0)).toBe(0);
    expect(r99(-5)).toBe(0);
  });

  it('is 30% over for the compare-at price', () => {
    expect(mrp(3999)).toBe(5199);
  });
});

describe('segment factor', () => {
  it('leaves the smallest cars at 1', () => {
    expect(segmentFactor(swift)).toBe(1);
  });

  it('scales by size', () => {
    expect(segmentFactor(creta)).toBe(1.2);
    expect(segmentFactor({ ...creta, model: 'Fortuner' })).toBe(1.5);
  });

  it('treats the German marques as a band of their own', () => {
    expect(segmentFactor(bmw)).toBe(2.2);
  });
});

describe('priceFor', () => {
  /** 3169 x 1.05 (age) x 1.2 (size) = 3992.94 -> 3999. */
  it('scales by age and size', () => {
    expect(priceFor(standard, creta)).toBe(3999);
    expect(priceFor(standard, swift)).toBe(3199);
  });

  it('charges automatics more, but only on a periodic service', () => {
    const auto = { ...creta, trans: 'Automatic' };
    expect(priceFor(standard, auto)).toBe(4199);
    const brakes = serviceById('pads')!;
    expect(priceFor(brakes, auto)).toBe(priceFor(brakes, creta));
  });

  it('charges more for carmaker parts than branded ones', () => {
    expect(priceFor(standard, creta, 'oem')).toBe(4899);
    expect(priceFor(standard, creta, 'oes')).toBe(3999);
  });

  it('ignores the part choice on a job that fits no part', () => {
    const labourOnly = SERVICES.find(s => !s.parts && s.base > 0)!;
    expect(priceFor(labourOnly, creta, 'oem')).toBe(
      priceFor(labourOnly, creta, 'oes'),
    );
  });

  it('returns null with no car, so screens can prompt for one', () => {
    expect(priceFor(standard, null)).toBeNull();
    expect(categoryFrom('periodic', null)).toBeNull();
  });

  it('keeps free jobs free', () => {
    const free = SERVICES.find(s => s.base === 0);
    if (free) expect(priceFor(free, creta)).toBe(0);
  });

  it('prices every service in the catalogue', () => {
    for (const s of SERVICES) {
      const p = priceFor(s, creta);
      expect(typeof p).toBe('number');
      expect(p).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('categoryFrom', () => {
  it('is the cheapest paid job in the category', () => {
    const from = categoryFrom('periodic', creta)!;
    const all = SERVICES.filter(s => s.cat === 'periodic' && s.base > 0).map(
      s => priceFor(s, creta)!,
    );
    expect(from).toBe(Math.min(...all));
  });
});

describe('buildBill', () => {
  const base = { cart: ['standard'], car: creta, loggedIn: true };

  it('totals the cart', () => {
    expect(buildBill(base).sub).toBe(3999);
    expect(buildBill(base).total).toBe(3999);
  });

  it('adds the membership fee and takes 10% off', () => {
    const b = buildBill({ ...base, member: true });
    expect(b.memberOff).toBe(400);
    expect(b.memberFee).toBe(1000);
    expect(b.total).toBe(4599);
  });

  it('will not stack a coupon on the member discount', () => {
    const b = buildBill({ ...base, member: true, coupon: true });
    expect(b.couponOff).toBe(0);
  });

  it('caps the coupon at the subtotal', () => {
    expect(buildBill({ ...base, coupon: true }).couponOff).toBe(200);
    expect(
      buildBill({ cart: ['throttle'], car: null, coupon: true }).couponOff,
    ).toBe(0);
  });

  it('spends coins only up to a tenth of the bill', () => {
    const b = buildBill({ ...base, coins: 5000 });
    expect(b.coinsUse).toBe(399);
  });

  it('ignores coins when logged out', () => {
    expect(buildBill({ ...base, loggedIn: false, coins: 500 }).coinsUse).toBe(0);
  });

  it('discounts prepayment only above the threshold', () => {
    expect(buildBill({ ...base, payNow: true }).prepay).toBe(59);
    expect(
      buildBill({ cart: ['throttle'], car: creta, payNow: true }).prepay,
    ).toBe(0);
  });

  it('adds express pickup', () => {
    expect(buildBill({ ...base, express: true }).total).toBe(3999 + 149);
  });

  it('never goes below zero', () => {
    const b = buildBill({ ...base, coupon: true, coins: 99999 });
    expect(b.total).toBeGreaterThanOrEqual(0);
  });

  it('skips ids that are not services', () => {
    expect(buildBill({ cart: ['nope'], car: creta }).items).toHaveLength(0);
  });
});

describe('inr', () => {
  it('groups in the Indian style', () => {
    expect(inr(3999)).toBe('₹3,999');
    expect(inr(104299)).toBe('₹1,04,299');
  });
});
