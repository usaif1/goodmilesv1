import { Placeholder } from '@/navigation/Placeholder';

export default function ScheduleScreen() {
  return (
    <Placeholder
      title="Schedule"
      mockup="C09"
      next={[
        { label: 'Confirm Booking', go: n => n.reset({ index: 1, routes: [{ name: 'MainTabs' }, { name: 'BookingConfirmed', params: { orderId: 'XYZ-100245' } }] }) },
      ]}
    />
  );
}
