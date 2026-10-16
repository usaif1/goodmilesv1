import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import Phone from 'lucide-react-native/icons/phone';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, ScreenHeader, Timeline } from '@/components';
import { TRACKING_STEPS } from '@/mocks';
import type { RootNav, RootStackParamList } from '@/navigation';
import { useVehicle, vehicleShort } from '@/store';
import { color, layout, space, type } from '@/theme';

const DRIVER = { name: 'Ramesh K.', otpAt: '3:22 PM' };
const DELIVERY_BY = 'Sat 10 Oct, 6 PM';

/** C11. */
export default function OrderTrackingScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'OrderTracking'>>();
  const vehicle = useVehicle(s => s.vehicle);

  const { orderId } = route.params;
  const awaitingEstimate = TRACKING_STEPS.some(
    step => step.state === 'active',
  );

  return (
    <View style={s.root}>
      <ScreenHeader
        title={`Order #${orderId}`}
        subtitle={`${vehicleShort(vehicle)} · Delivery by ${DELIVERY_BY}`}
      />

      <ScrollView contentContainerStyle={s.body}>
        {awaitingEstimate && (
          /**
           * The estimate gate. C11 outlines this card in the warning
           * orange rather than tinting it, so it reads as an action
           * waiting on the customer without shouting.
           */
          <Card style={s.alert}>
            <View style={s.alertRow}>
              <View style={s.alertText}>
                <Text style={s.cardTitle}>Estimate waiting for you</Text>
                <Text style={s.meta}>Workshop found 2 extra items</Text>
              </View>
              <Button
                label="Review"
                size="sm"
                onPress={() =>
                  navigation.navigate('EstimateReview', { orderId })
                }
              />
            </View>
          </Card>
        )}

        <Card>
          <Timeline steps={TRACKING_STEPS} />
        </Card>

        <Card>
          <View style={s.alertRow}>
            <View style={s.alertText}>
              <Text style={s.cardTitle}>Driver: {DRIVER.name}</Text>
              <Text style={s.meta}>
                Pickup OTP was shared at {DRIVER.otpAt}
              </Text>
            </View>
            <Button
              label="Call"
              variant="ghost"
              size="sm"
              icon={<Phone size={14} color={color.brand} />}
            />
          </View>
        </Card>
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
  alert: { borderWidth: layout.hairline + 1, borderColor: color.warning },
  alertRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  alertText: { flex: 1 },
  cardTitle: type.h2,
  meta: { ...type.meta, marginTop: 2 },
});
