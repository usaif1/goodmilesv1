import { useMemo } from 'react';
import { create } from 'zustand';
import {
  DATES,
  SLOTS,
  couponByCode,
  serviceById,
  type Service,
} from '@/mocks';
import { computeTotals, type Totals } from './pricing';
import { useMembership } from './useMembership';

export type FulfilmentMode = 'pickup' | 'walkin';

type State = {
  serviceIds: readonly string[];
  couponCode: string | null;
  dateId: string;
  slotId: string | null;
  mode: FulfilmentMode;

  add: (serviceId: string) => void;
  remove: (serviceId: string) => void;
  toggle: (serviceId: string) => void;
  applyCoupon: (code: string | null) => void;
  setDate: (dateId: string) => void;
  setSlot: (slotId: string | null) => void;
  setMode: (mode: FulfilmentMode) => void;
  clear: () => void;
};

/** C08 opens with the coupon already applied and the 3-4 PM slot picked. */
const INITIAL = {
  serviceIds: [] as readonly string[],
  couponCode: 'XYZSERVICE' as string | null,
  dateId: DATES[1].id,
  slotId: '3-4' as string | null,
  mode: 'pickup' as FulfilmentMode,
};

export const useCart = create<State>()((set, get) => ({
  ...INITIAL,

  add: serviceId =>
    set(s =>
      s.serviceIds.includes(serviceId)
        ? s
        : { serviceIds: [...s.serviceIds, serviceId] },
    ),

  remove: serviceId =>
    set(s => ({ serviceIds: s.serviceIds.filter(id => id !== serviceId) })),

  toggle: serviceId =>
    get().serviceIds.includes(serviceId)
      ? get().remove(serviceId)
      : get().add(serviceId),

  applyCoupon: couponCode => set({ couponCode }),
  setDate: dateId => set({ dateId }),
  setSlot: slotId => set({ slotId }),
  setMode: mode => set({ mode }),
  clear: () => set({ ...INITIAL, serviceIds: [] }),
}));

/** Resolved cart lines. */
export function useCartLines(): Service[] {
  const serviceIds = useCart(s => s.serviceIds);
  return useMemo(
    () =>
      serviceIds
        .map(serviceById)
        .filter((s): s is Service => s !== undefined),
    [serviceIds],
  );
}

/**
 * Derived totals.
 *
 * The selectors each return a stable slice and the object is built in
 * a useMemo rather than inside a selector. A selector returning a
 * fresh object every call would give useSyncExternalStore a new
 * snapshot each time and re-render without end.
 */
export function useCartTotals(): Totals {
  const lines = useCartLines();
  const couponCode = useCart(s => s.couponCode);
  const slotId = useCart(s => s.slotId);
  const membership = useMembership(s => s.active);

  return useMemo(
    () =>
      computeTotals({
        lines,
        coupon: couponCode ? couponByCode(couponCode) : null,
        slot: SLOTS.find(s => s.id === slotId) ?? null,
        membership,
      }),
    [lines, couponCode, slotId, membership],
  );
}

export const useCartCount = () => useCart(s => s.serviceIds.length);
export const useIsInCart = (serviceId: string) =>
  useCart(s => s.serviceIds.includes(serviceId));
