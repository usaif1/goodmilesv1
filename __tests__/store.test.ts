import { initialAppState, useApp } from '@/store';

/**
 * Screens are often checked by seeding this state and booting straight
 * into them, and that seeding has been committed by accident before:
 * the app shipped logged in, with a car and something in the cart.
 * A fresh install must start empty.
 */
describe('initial state is a fresh install', () => {
  it('is logged out with no identity', () => {
    expect(initialAppState.loggedIn).toBe(false);
    expect(initialAppState.phone).toBe('');
  });

  it('has no car', () => {
    expect(initialAppState.car).toBeNull();
    expect(initialAppState.cars).toEqual([]);
    expect(initialAppState.reg).toBeNull();
  });

  it('has an empty cart and no discounts applied', () => {
    expect(initialAppState.cart).toEqual([]);
    expect(initialAppState.coupon).toBe(false);
    expect(initialAppState.member).toBe(false);
    expect(initialAppState.coins).toBe(0);
  });

  it('has nothing booked', () => {
    expect(initialAppState.order).toBeNull();
    expect(initialAppState.stage).toBe(-1);
    expect(initialAppState.approved).toBeNull();
    expect(initialAppState.note).toBeNull();
    expect(initialAppState.symptoms).toEqual([]);
  });
});

describe('store actions', () => {
  beforeEach(() => useApp.getState().reset());

  it('keeps the phone separate from being logged in', () => {
    useApp.getState().setPhone('9876543210');
    expect(useApp.getState().loggedIn).toBe(false);
    useApp.getState().login();
    expect(useApp.getState().loggedIn).toBe(true);
  });

  it('toggles cart items', () => {
    const { toggleCart } = useApp.getState();
    toggleCart('standard');
    expect(useApp.getState().cart).toEqual(['standard']);
    toggleCart('standard');
    expect(useApp.getState().cart).toEqual([]);
  });

  it('does not add the same car twice', () => {
    const car = {
      brand: 'Hyundai',
      model: 'Creta',
      year: '2020–2022',
      fuel: 'Petrol',
      trans: 'Manual',
    };
    useApp.getState().setCar(car);
    useApp.getState().setCar(car);
    expect(useApp.getState().cars).toHaveLength(1);
  });

  it('stops advancing past the last stage', () => {
    const { advanceStage } = useApp.getState();
    for (let i = 0; i < 20; i++) advanceStage();
    expect(useApp.getState().stage).toBe(9);
  });

  it('logging out returns to a fresh install', () => {
    useApp.getState().setPhone('9876543210');
    useApp.getState().login();
    useApp.getState().toggleCart('standard');
    useApp.getState().logout();
    expect(useApp.getState().loggedIn).toBe(false);
    expect(useApp.getState().cart).toEqual([]);
  });
});
