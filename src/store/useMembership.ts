import { create } from 'zustand';

type State = {
  /** Reserve Member, bought on C15. */
  active: boolean;
  activate: () => void;
  cancel: () => void;
};

/**
 * Separate from the cart because membership outlives any one order -
 * C15 sells twelve months of it - while only affecting the cart
 * through the discount it grants.
 */
export const useMembership = create<State>()(set => ({
  active: false,
  activate: () => set({ active: true }),
  cancel: () => set({ active: false }),
}));
