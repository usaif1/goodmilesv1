import { create } from 'zustand';

import type { Car, PartChoice } from '@/domain/pricing';
import { DEFAULT_WINDOW } from '@/domain/serviceDay';

export type Address = {
  label: string;
  short: string;
  full?: string;
  parking?: string;
  guardNote?: string;
};

export type Slot = { day: number; win: string };

export type Order = {
  id: string;
  items: [string, number | null][];
  slot: Slot;
  /** The customer is dropping the car off themselves. */
  self: boolean;
  coupon: number;
};

export type AppState = {
  loggedIn: boolean;
  phone: string;
  car: Car | null;
  cars: Car[];
  /** Registration number, once the customer adds it. */
  reg: string | null;
  city: string | null;
  address: Address | null;

  cart: string[];
  qty: Record<string, number>;
  parts: Record<string, PartChoice>;
  coupon: boolean;
  member: boolean;
  coins: number;
  coinsOn: boolean;
  express: boolean;
  payNow: boolean;
  slot: Slot;
  dropSelf: boolean;

  order: Order | null;
  /** Index into STAGES; -1 before anything is booked. */
  stage: number;
  approved: number | null;
  /** Which estimate lines the customer ticked. */
  approvedSel: Record<string, boolean> | null;
  rating: number | null;
  /** What the customer told us is wrong, before the inspection. */
  symptoms: string[];
  /** The note left for Amit before pickup, if there is one. */
  note: { text: string; seconds: number } | null;
};

export type AppActions = {
  /** Captured on welcome, before the code is verified. */
  setPhone: (phone: string) => void;
  /** Only after the OTP checks out. */
  login: () => void;
  logout: () => void;
  setCar: (car: Car) => void;
  addCar: (car: Car) => void;
  setReg: (reg: string) => void;
  setCity: (city: string) => void;
  setAddress: (address: Address) => void;

  toggleCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setPart: (id: string, choice: PartChoice) => void;
  clearCart: () => void;
  applyCoupon: (on: boolean) => void;
  setMember: (on: boolean) => void;
  setExpress: (on: boolean) => void;
  setSlot: (slot: Partial<Slot>) => void;
  setDropSelf: (self: boolean) => void;

  confirmOrder: (order: Order) => void;
  /** Only allowed before the inspection starts; see CANCELLABLE_UNTIL. */
  cancelOrder: () => void;
  advanceStage: () => void;
  approve: (total: number, selection: Record<string, boolean>) => void;
  rate: (stars: number) => void;
  toggleSymptom: (symptom: string) => void;
  setNote: (note: { text: string; seconds: number } | null) => void;
  reset: () => void;
};

const initial: AppState = {
  loggedIn: false,
  phone: '',
  car: null,
  cars: [],
  reg: null,
  city: null,
  address: null,

  cart: [],
  qty: {},
  parts: {},
  coupon: false,
  member: false,
  coins: 0,
  coinsOn: true,
  express: false,
  payNow: false,
  slot: { day: 1, win: DEFAULT_WINDOW },
  dropSelf: false,

  order: null,
  stage: -1,
  approved: null,
  approvedSel: null,
  rating: null,
  symptoms: [],
  note: null,
};

/**
 * Mirrors the prototype's single `S` object. One store rather than
 * several, because the screens read across it constantly - the cart
 * needs the car to price itself, the service day needs the slot to
 * derive its clock.
 */
export const useApp = create<AppState & AppActions>()(set => ({
  ...initial,

  setPhone: phone => set({ phone }),
  login: () => set({ loggedIn: true }),
  logout: () => set({ ...initial }),
  setCar: car =>
    set(s => ({
      car,
      cars: s.cars.some(c => c.model === car.model) ? s.cars : [...s.cars, car],
    })),
  addCar: car => set(s => ({ cars: [...s.cars, car], car })),
  setReg: reg => set({ reg }),
  setCity: city => set({ city }),
  setAddress: address => set({ address }),

  toggleCart: id =>
    set(s => ({
      cart: s.cart.includes(id)
        ? s.cart.filter(x => x !== id)
        : [...s.cart, id],
    })),
  setQty: (id, qty) => set(s => ({ qty: { ...s.qty, [id]: qty } })),
  setPart: (id, choice) => set(s => ({ parts: { ...s.parts, [id]: choice } })),
  clearCart: () => set({ cart: [], qty: {}, parts: {} }),
  applyCoupon: on => set({ coupon: on }),
  setMember: on => set({ member: on }),
  setExpress: on => set({ express: on }),
  setSlot: slot => set(s => ({ slot: { ...s.slot, ...slot } })),
  setDropSelf: dropSelf => set({ dropSelf }),

  confirmOrder: order => set({ order, stage: 0 }),
  cancelOrder: () =>
    set({
      order: null,
      stage: -1,
      approved: null,
      approvedSel: null,
      note: null,
      symptoms: [],
    }),
  advanceStage: () => set(s => ({ stage: Math.min(s.stage + 1, 9) })),
  approve: (total, selection) =>
    set({ approved: total, approvedSel: selection }),
  rate: stars => set({ rating: stars }),
  toggleSymptom: symptom =>
    set(s => ({
      symptoms: s.symptoms.includes(symptom)
        ? s.symptoms.filter(x => x !== symptom)
        : [...s.symptoms, symptom],
    })),
  setNote: note => set({ note }),
  reset: () => set({ ...initial }),
}));

/** The live order, if the service day is still running. */
export const useLiveOrder = () =>
  useApp(s => (s.order && s.stage < 9 ? s.order : null));

/**
 * The last stage at which a booking can still be cancelled. The
 * promise is "free cancellation until the inspection starts", and the
 * inspection is what produces the estimate at stage 3.
 */
export const CANCELLABLE_UNTIL = 1;

export { initial as initialAppState };
