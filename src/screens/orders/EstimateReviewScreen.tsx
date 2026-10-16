import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  KeyValueRow,
  RUPEE,
  ScreenHeader,
  StickyFooter,
  StubNote,
} from '@/components';
import { ESTIMATE_EXTRAS } from '@/mocks';
import type { RootNav, RootStackParamList } from '@/navigation';
import { formatAmount, useCartLines, useCartTotals } from '@/store';
import { color, layout, space, type } from '@/theme';

const money = (value: number) => `${RUPEE}${formatAmount(value)}`;

/**
 * No mockup. C11's "Review" button targets this route, and that screen
 * says the workshop found two extra items, so this shows the original
 * order against those additions and lets the customer approve.
 */
export default function EstimateReviewScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'EstimateReview'>>();
  const lines = useCartLines();
  const totals = useCartTotals();

  const extrasTotal = ESTIMATE_EXTRAS.reduce((sum, e) => sum + e.price, 0);
  const revised = totals.toPay + extrasTotal;

  return (
    <View style={s.root}>
      <ScreenHeader
        title="Review estimate"
        subtitle={`Order #${route.params.orderId}`}
      />

      <ScrollView contentContainerStyle={s.body}>
        <Card>
          <Text style={s.cardTitle}>Already approved</Text>
          <View style={s.rows}>
            {lines.length > 0 ? (
              lines.map(line => (
                <KeyValueRow
                  key={line.id}
                  label={line.title}
                  value={money(line.price)}
                />
              ))
            ) : (
              <Text style={s.muted}>No services on this order.</Text>
            )}
          </View>
        </Card>

        <Card style={s.alert}>
          <Text style={s.cardTitle}>
            Workshop found {ESTIMATE_EXTRAS.length} extra items
          </Text>
          <View style={s.rows}>
            {ESTIMATE_EXTRAS.map(extra => (
              <KeyValueRow
                key={extra.title}
                label={extra.title}
                value={money(extra.price)}
              />
            ))}
          </View>
          <Divider dashed />
          <KeyValueRow
            label="Revised total"
            value={money(revised)}
            strong
          />
          <Text style={s.note}>
            Nothing is charged until you approve. Declining keeps the
            original estimate.
          </Text>
        </Card>

        <StubNote>
          No mockup covers this screen yet, so the layout is provisional.
        </StubNote>
      </ScrollView>

      <StickyFooter>
        <Button
          label={`Approve ${'·'} ${money(revised)}`}
          block
          onPress={() =>
            navigation.navigate('Payment', { orderId: route.params.orderId })
          }
        />
        <Button
          label="Decline extras"
          variant="ghost"
          block
          onPress={() => navigation.goBack()}
        />
      </StickyFooter>
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
  alert: { borderWidth: layout.hairline + 1, borderColor: color.warning },
  cardTitle: type.h2,
  rows: { marginTop: space.md, gap: space.sm },
  note: { ...type.meta, marginTop: space.sm },
  muted: type.bodyMuted,
});
