import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { buildBill, inr } from '@/domain';
import { useApp } from '@/store';
import { Icon, radius, shadow, useTheme } from '@/theme';

import { Text } from './Text';

/**
 * `cartBar()` - a sticky bar that appears on the browse screens once
 * anything is in the cart, and is the only way through to checkout.
 * Renders nothing when the cart is empty.
 */
export function CartBar({ onPress }: { onPress: () => void }) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const cart = useApp(s => s.cart);
  const car = useApp(s => s.car);
  const parts = useApp(s => s.parts);
  const member = useApp(s => s.member);
  const coupon = useApp(s => s.coupon);
  const coins = useApp(s => s.coins);
  const coinsOn = useApp(s => s.coinsOn);
  const loggedIn = useApp(s => s.loggedIn);

  if (!cart.length) return null;

  const bill = buildBill({ cart, car, parts, member, coupon, coins, coinsOn, loggedIn });
  const count = cart.length;

  return (
    <View
      style={[
        styles.base,
        shadow.footer,
        { backgroundColor: c.card, paddingBottom: 10 + insets.bottom },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: c.sel },
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.grow}>
          <Text variant="meta" style={styles.count}>
            {count} {count === 1 ? 'item' : 'items'}
          </Text>
          {car ? (
            <Text variant="button" style={styles.total}>
              {inr(bill.total)}
            </Text>
          ) : null}
        </View>
        <Text variant="button" style={styles.total}>
          View cart
        </Text>
        <Icon name="chev" size={18} color="#ffffff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexShrink: 0, paddingTop: 10, paddingHorizontal: 16 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: radius.lg,
  },
  pressed: { transform: [{ scale: 0.97 }] },
  grow: { flex: 1, minWidth: 0 },
  count: { color: '#ffffff', opacity: 0.75 },
  total: { color: '#ffffff' },
});
