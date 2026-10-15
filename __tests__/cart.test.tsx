/**
 * @format
 */

import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import {
  formatAmount,
  useCart,
  useCartTotals,
  useMembership,
} from '@/store';

beforeEach(() => {
  useCart.getState().clear();
  useMembership.getState().cancel();
});

test('add is idempotent and remove is not order-dependent', () => {
  const { add, remove } = useCart.getState();
  add('standard-service');
  add('standard-service');
  expect(useCart.getState().serviceIds).toEqual(['standard-service']);

  add('regular-ac-service');
  remove('standard-service');
  expect(useCart.getState().serviceIds).toEqual(['regular-ac-service']);

  remove('not-in-cart');
  expect(useCart.getState().serviceIds).toEqual(['regular-ac-service']);
});

test('toggle adds then removes', () => {
  const { toggle } = useCart.getState();
  toggle('car-wash');
  expect(useCart.getState().serviceIds).toContain('car-wash');
  toggle('car-wash');
  expect(useCart.getState().serviceIds).not.toContain('car-wash');
});

test('clear resets the cart but keeps the C08 defaults', () => {
  const { add, setSlot, clear } = useCart.getState();
  add('car-wash');
  setSlot(null);
  clear();
  expect(useCart.getState().serviceIds).toEqual([]);
  expect(useCart.getState().slotId).toBe('3-4');
  expect(useCart.getState().couponCode).toBe('XYZSERVICE');
});

/**
 * useCartTotals builds a fresh object. If that were done inside a
 * zustand selector it would hand useSyncExternalStore a new snapshot
 * on every read and re-render without end, so this mounts a real
 * component to prove it settles.
 */
function Bill() {
  const totals = useCartTotals();
  return <Text>{formatAmount(totals.toPay)}</Text>;
}

test('useCartTotals settles and tracks store updates', async () => {
  useCart.getState().add('standard-service');
  useCart.getState().add('regular-ac-service');

  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<Bill />);
  });
  expect(JSON.stringify(tree!.toJSON())).toContain('4,750');

  await ReactTestRenderer.act(() => {
    useMembership.getState().activate();
  });
  // 5,198 - 248 coupon - 200 slot - 520 membership
  expect(JSON.stringify(tree!.toJSON())).toContain('4,230');
});
