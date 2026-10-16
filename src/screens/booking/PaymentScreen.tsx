import { useState } from 'react';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Card,
  KeyValueRow,
  Pill,
  PillGroup,
  RUPEE,
  ScreenHeader,
  StickyFooter,
  StubNote,
} from '@/components';
import { ESTIMATE_EXTRAS } from '@/mocks';
import type { RootNav, RootStackParamList } from '@/navigation';
import { formatAmount, useCartTotals } from '@/store';
import { color, layout, space, type } from '@/theme';

const METHODS = ['UPI', 'Card', 'Netbanking', 'Pay at pickup'];

/**
 * No mockup. EstimateReview leads here once the extra items are
 * approved, and C09's footnote mentions paying after service, so both
 * paths are offered.
 */
export default function PaymentScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'Payment'>>();
  const totals = useCartTotals();
  const [method, setMethod] = useState(METHODS[0]);

  const extrasTotal = ESTIMATE_EXTRAS.reduce((sum, e) => sum + e.price, 0);
  const due = totals.toPay + extrasTotal;

  return (
    <View style={s.root}>
      <ScreenHeader
        title="Payment"
        subtitle={`Order #${route.params.orderId}`}
      />

      <ScrollView contentContainerStyle={s.body}>
        <Card>
          <KeyValueRow
            label="Amount due"
            value={`${RUPEE}${formatAmount(due)}`}
            strong
          />
          <Text style={s.note}>
            Includes the extras you approved. Prices include GST.
          </Text>
        </Card>

        <Card>
          <Text style={s.cardTitle}>How would you like to pay?</Text>
          <View style={s.methods}>
            <PillGroup>
              {METHODS.map(m => (
                <Pill
                  key={m}
                  label={m}
                  selected={method === m}
                  onPress={() => setMethod(m)}
                />
              ))}
            </PillGroup>
          </View>
        </Card>

        <StubNote>
          No mockup covers this screen yet, so the layout is provisional.
        </StubNote>
      </ScrollView>

      <StickyFooter>
        <Button
          label={`Pay ${RUPEE}${formatAmount(due)}`}
          block
          onPress={() =>
            navigation.navigate('Feedback', {
              orderId: route.params.orderId,
            })
          }
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
  cardTitle: type.h2,
  methods: { marginTop: space.md },
  note: { ...type.meta, marginTop: space.sm },
});
