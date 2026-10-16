import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, ScreenHeader, StatusBadge, type BadgeTone } from '@/components';
import { ORDERS, type Order, type OrderState } from '@/mocks';
import type { RootNav } from '@/navigation';
import { formatAmount } from '@/store';
import { color, layout, space, type } from '@/theme';

const BADGE: Record<OrderState, { label: string; tone: BadgeTone }> = {
  estimate_sent: { label: 'ESTIMATE SENT', tone: 'warning' },
  in_progress: { label: 'IN PROGRESS', tone: 'warning' },
  completed: { label: 'COMPLETED', tone: 'success' },
  cancelled: { label: 'CANCELLED', tone: 'error' },
};

/** The meta line under the order id, as C16 composes it. */
const summaryLine = (order: Order) =>
  [
    order.vehicle,
    order.summary,
    order.date,
    order.total !== undefined ? `Rs ${formatAmount(order.total)}` : null,
    order.reason ? `Reason: ${order.reason}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

/** C16. */
export default function MyOrdersScreen() {
  const navigation = useNavigation<RootNav>();

  return (
    <View style={s.root}>
      <ScreenHeader title="My orders" />

      <ScrollView contentContainerStyle={s.body}>
        {ORDERS.length === 0 ? (
          <Card>
            <Text style={s.empty}>No orders yet.</Text>
          </Card>
        ) : (
          ORDERS.map(order => {
            const badge = BADGE[order.state];
            return (
              <Pressable
                key={order.id}
                onPress={() =>
                  navigation.navigate('OrderTracking', { orderId: order.id })
                }
                style={({ pressed }) => (pressed ? s.pressed : null)}>
                <Card>
                  <View style={s.head}>
                    <Text style={s.id}>#{order.id}</Text>
                    <StatusBadge label={badge.label} tone={badge.tone} />
                  </View>
                  <Text style={s.summary}>{summaryLine(order)}</Text>
                </Card>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  body: {
    padding: layout.screenPadding,
    gap: layout.cardGap,
    paddingBottom: space.xxxl,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
  id: { ...type.h2, flexShrink: 1 },
  summary: { ...type.meta, marginTop: space.xs },
  empty: { ...type.bodyMuted, textAlign: 'center' },
  pressed: { opacity: 0.75 },
});
