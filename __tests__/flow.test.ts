import { CATEGORIES, SERVICES } from '@/data';
import { buildBill } from '@/domain';
import { useApp } from '@/store';

/**
 * These pin the shape of the flows rather than any screen's markup.
 *
 * The checkout order was wrong for most of this build - a review step
 * was inserted that the design does not have - and nothing caught it,
 * because every test asserted logic and none asserted a transition.
 */
describe('booking leaves the app in a bookable state', () => {
  beforeEach(() => useApp.getState().reset());

  const order = {
    id: 'GM-24817',
    items: [['Standard service', 3999]] as [string, number | null][],
    slot: { day: 1, win: '8:30 – 10:30' },
    self: false,
    coupon: 0,
  };

  it('empties the cart, so the next visit does not re-book it', () => {
    const s = useApp.getState();
    s.toggleCart('standard');
    s.toggleCart('pads');
    expect(useApp.getState().cart).toHaveLength(2);

    useApp.getState().confirmOrder(order);
    useApp.getState().clearCart();

    expect(useApp.getState().cart).toEqual([]);
    expect(useApp.getState().order).not.toBeNull();
    expect(useApp.getState().stage).toBe(0);
  });

  it('starts the service day at the first stage', () => {
    useApp.getState().confirmOrder(order);
    expect(useApp.getState().stage).toBe(0);
  });
});

describe('every category leads somewhere', () => {
  it('has at least one service behind it', () => {
    for (const category of CATEGORIES) {
      const count = SERVICES.filter(s => s.cat === category.id).length;
      expect({ id: category.id, empty: count === 0 }).toEqual({
        id: category.id,
        empty: false,
      });
    }
  });
});

describe('services referenced by the UI exist', () => {
  /**
   * These ids are typed into screens by hand, so a rename in the
   * catalogue would leave a tile or rail pointing at nothing.
   */
  const referenced = [
    'standard', // Home's headline tile, the estimate's booked line
    'acreg', // Home's AC-season tile
    'deep', // Home's cleaning tile
    'pads', // the estimate, the work record
    'accoil',
    'align',
    'foam', // Good to add
    'headlight',
    'battcheck',
    'freeinsp', // added by the "not sure what's wrong" sheet
  ];

  it.each(referenced)('%s is in the catalogue', id => {
    expect(SERVICES.some(s => s.id === id)).toBe(true);
  });
});

describe('pricing without a car is absent, not zero', () => {
  /**
   * priceFor returns null when no car is chosen, and buildBill sums
   * those as zero. The cart footer printed that total, so a cart full
   * of services read as "Total ₹0" - free, rather than not yet
   * priceable. Screens must branch on the car, not on the number.
   */
  it('leaves every line unpriced', () => {
    const bill = buildBill({ cart: ['standard', 'pads'], car: null });
    expect(bill.items.every(i => i.unit === null)).toBe(true);
  });

  it('still sums to zero, which is why the guard has to be the car', () => {
    const bill = buildBill({ cart: ['standard', 'pads'], car: null });
    expect(bill.total).toBe(0);
    expect(bill.sub).toBe(0);
  });

  it('prices everything once a car is known', () => {
    const bill = buildBill({
      cart: ['standard', 'pads'],
      car: {
        brand: 'Hyundai',
        model: 'Creta',
        year: '2020–2022',
        fuel: 'Petrol',
        trans: 'Manual',
      },
    });
    expect(bill.items.every(i => i.unit !== null)).toBe(true);
    expect(bill.total).toBeGreaterThan(0);
  });
});
