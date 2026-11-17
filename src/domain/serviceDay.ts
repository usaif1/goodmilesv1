/** The default pickup window when none has been chosen. */
export const DEFAULT_WINDOW = '8:30 – 10:30';

export const WINDOWS = [
  '8:30 – 10:30',
  '10:30 – 12:30',
  '12:30 – 2:30',
  '2:30 – 4:30',
  '4:30 – 6:30',
] as const;

/** Minutes past midnight to a 12-hour clock, e.g. 614 -> "10:14 AM". */
export function hm(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${
    h < 12 ? 'AM' : 'PM'
  }`;
}

/** The windows are written in 12-hour time with the PM implied. */
function windowStart(win: string): number {
  const [h, m] = win.split('–')[0].trim().split(':').map(Number);
  return (h < 8 ? h + 12 : h) * 60 + (m || 0);
}

export type ServiceClock = {
  pickup: string;
  /** The eight pickup photos, taken a minute apart around pickup. */
  photo: (index: number) => string;
  estimate: string;
  approved: string;
  work: string;
  /** Each approved job, in order. */
  job: (index: number) => string;
  road: string;
  done: string;
  back: string;
  delivered: string;
  paid: string;
  recorded: string;
};

/**
 * Every timestamp on the service day, derived from the booked pickup
 * window so a 2:30 pickup reads consistently from photos to payment.
 *
 * The tail of the day is pinned to the evening: if the work would run
 * past 5:30pm the remaining steps shift out together, so delivery never
 * lands before the car is finished.
 */
export function serviceClock(win: string = DEFAULT_WINDOW): ServiceClock {
  const start = windowStart(win || DEFAULT_WINDOW);
  const pickup = start + 44;
  const estimate = pickup + 98;
  const work = estimate + 13;
  const shift = Math.max(0, work + 240 - 1050);

  return {
    pickup: hm(pickup),
    photo: i => hm(pickup - 7 + i).replace(/ [AP]M$/, ''),
    estimate: hm(estimate),
    approved: hm(estimate + 6),
    work: hm(work),
    job: k => hm(work + 35 * (k + 1)),
    road: hm(1040 + shift),
    done: hm(1050 + shift),
    back: hm(1104 + shift),
    delivered: hm(1122 + shift),
    paid: hm(1130 + shift),
    recorded: hm(1131 + shift),
  };
}

/** The next seven days, as the pickup day chips show them. */
export type DayOption = { top: string; date: string; full: string };

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function pickupDays(from: Date = new Date()): DayOption[] {
  const base = new Date(from);
  base.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const top = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : WEEKDAYS[d.getDay()];
    return {
      top,
      date: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
      full: `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
    };
  });
}

/** "8:30 – 10:30" as the app writes it: "8:30–10:30 AM". */
export function windowText(win: string): string {
  if (!win) return '';
  const map: Record<string, string> = {
    '8:30 – 10:30': '8:30–10:30 AM',
    '10:30 – 12:30': '10:30 AM–12:30 PM',
  };
  return map[win] ?? `${win.replace(' – ', '–')} PM`;
}
