import { useState } from 'react';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Card,
  Pill,
  PillGroup,
  RatingStars,
  ScreenHeader,
  StatusBadge,
  StickyFooter,
  TextField,
} from '@/components';
import { COMPLAINT_REASONS } from '@/mocks';
import type { RootNav, RootStackParamList } from '@/navigation';
import { color, layout, space, type } from '@/theme';

const DELIVERED_AT = '10 Oct, 5:40 PM';
const COMPLAINT_ID = 'C-2201';

/**
 * A rating at or below this opens the complaint path, which is what
 * C14 shows at 3 of 5.
 */
const COMPLAINT_THRESHOLD = 3;

/** C14. */
export default function FeedbackScreen() {
  const navigation = useNavigation<RootNav>();
  const route = useRoute<RouteProp<RootStackParamList, 'Feedback'>>();

  const [rating, setRating] = useState(3);
  const [reasons, setReasons] = useState<string[]>(['Delay in delivery']);
  const [note, setNote] = useState('');

  const complaining = rating <= COMPLAINT_THRESHOLD;

  const toggleReason = (reason: string) =>
    setReasons(current =>
      current.includes(reason)
        ? current.filter(r => r !== reason)
        : [...current, reason],
    );

  return (
    <View style={s.root}>
      <ScreenHeader
        title="Rate your service"
        subtitle={`Order #${route.params.orderId} · Delivered ${DELIVERED_AT}`}
      />

      <ScrollView
        contentContainerStyle={s.body}
        keyboardShouldPersistTaps="handled">
        <Card>
          <RatingStars value={rating} onChange={setRating} />
        </Card>

        {complaining && (
          <Card>
            <Text style={s.cardTitle}>What went wrong?</Text>
            <View style={s.reasons}>
              <PillGroup>
                {COMPLAINT_REASONS.map(reason => (
                  <Pill
                    key={reason}
                    label={reason}
                    selected={reasons.includes(reason)}
                    onPress={() => toggleReason(reason)}
                  />
                ))}
              </PillGroup>
            </View>
            <TextField
              value={note}
              onChangeText={setNote}
              placeholder="Car was delivered 2 hours late..."
              multiline
            />
          </Card>
        )}

        {complaining && reasons.length > 0 && (
          <Card>
            <View style={s.complaintRow}>
              <View style={s.complaintText}>
                <Text style={s.cardTitle}>
                  Complaint #{COMPLAINT_ID} created
                </Text>
                <Text style={s.meta}>
                  Owner: Service advisor {'·'} Reply within 24 hours
                </Text>
              </View>
              <StatusBadge label="OPEN" tone="warning" />
            </View>
          </Card>
        )}
      </ScrollView>

      <StickyFooter>
        <Button
          label="Submit"
          block
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
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
  reasons: { marginTop: space.md, marginBottom: space.md },
  complaintRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  complaintText: { flex: 1 },
  meta: { ...type.meta, marginTop: 2 },
});
