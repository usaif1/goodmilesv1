import {
  DEFAULT_WINDOW,
  hm,
  pickupDays,
  serviceClock,
  windowText,
} from '@/domain';

describe('hm', () => {
  it('reads as a 12-hour clock', () => {
    expect(hm(0)).toBe('12:00 AM');
    expect(hm(554)).toBe('9:14 AM');
    expect(hm(720)).toBe('12:00 PM');
    expect(hm(1122)).toBe('6:42 PM');
  });
});

/**
 * The prototype states these times in its own copy and comments - the
 * sample day's "9:14 AM pickup ... 6:51 PM recorded", the delivery
 * screen's "Delivered 6:42 PM" and DAY.approvedAt of "10:58 AM". They
 * are the ground truth for the derivation.
 */
describe('serviceClock, for the 8:30 window', () => {
  const c = serviceClock(DEFAULT_WINDOW);

  it('matches the sample day the prototype documents', () => {
    expect(c.pickup).toBe('9:14 AM');
    expect(c.approved).toBe('10:58 AM');
    expect(c.delivered).toBe('6:42 PM');
    expect(c.recorded).toBe('6:51 PM');
  });

  it('runs in order', () => {
    expect(c.estimate).toBe('10:52 AM');
    expect(c.work).toBe('11:05 AM');
    expect(c.done).toBe('5:30 PM');
    expect(c.back).toBe('6:24 PM');
    expect(c.paid).toBe('6:50 PM');
  });

  it('spaces the jobs 35 minutes apart', () => {
    expect(c.job(0)).toBe('11:40 AM');
    expect(c.job(1)).toBe('12:15 PM');
  });

  it('drops the meridiem from photo stamps', () => {
    expect(c.photo(0)).toBe('9:07');
    expect(c.photo(7)).toBe('9:14');
  });
});

describe('serviceClock, later windows', () => {
  it('moves pickup with the booked window', () => {
    expect(serviceClock('10:30 – 12:30').pickup).toBe('11:14 AM');
    expect(serviceClock('2:30 – 4:30').pickup).toBe('3:14 PM');
  });

  /**
   * A late pickup shifts the tail of the day out together, so delivery
   * still follows the work. Note it can roll past midnight: the last
   * window delivers at 12:17 AM. That is what the prototype derives,
   * and is a product question rather than a porting one.
   */
  it('keeps delivery after the work on a late pickup', () => {
    const late = serviceClock('4:30 – 6:30');
    expect(late.pickup).toBe('5:14 PM');
    expect(late.work).toBe('7:05 PM');
    expect(late.done).toBe('11:05 PM');
    expect(late.delivered).toBe('12:17 AM');
  });

  it('runs the midday window in order', () => {
    const mid = serviceClock('12:30 – 2:30');
    expect(mid.pickup).toBe('1:14 PM');
    expect(mid.done).toBe('7:05 PM');
    expect(mid.delivered).toBe('8:17 PM');
  });

  it('falls back to the default window', () => {
    expect(serviceClock('').pickup).toBe(serviceClock(DEFAULT_WINDOW).pickup);
  });
});

describe('windowText', () => {
  it('writes the morning windows out in full', () => {
    expect(windowText('8:30 – 10:30')).toBe('8:30–10:30 AM');
    expect(windowText('10:30 – 12:30')).toBe('10:30 AM–12:30 PM');
  });

  it('treats the rest as afternoon', () => {
    expect(windowText('2:30 – 4:30')).toBe('2:30–4:30 PM');
  });
});

describe('pickupDays', () => {
  const days = pickupDays(new Date('2026-11-06T09:00:00'));

  it('offers a week', () => {
    expect(days).toHaveLength(7);
  });

  it('names the first two days rather than dating them', () => {
    expect(days[0].top).toBe('Today');
    expect(days[1].top).toBe('Tomorrow');
    expect(days[2].top).toBe('Sun');
  });

  it('carries the date for the chip', () => {
    expect(days[0].date).toBe('6 Nov');
    expect(days[6].full).toBe('12 Nov 2026');
  });
});
