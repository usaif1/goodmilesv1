/**
 * Renders every primitive once. These components are pure layout, so
 * the thing worth guarding is that each one mounts at all - a bad
 * StyleSheet key, a missing icon path or a hook used outside its
 * provider all surface here rather than in a screen branch.
 *
 * @format
 */

import type { ReactNode } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Banner,
  Button,
  Card,
  CartBar,
  CheckList,
  Gradient,
  Grid,
  GridTile,
  KeyValueRow,
  Pill,
  PillGroup,
  PriceRow,
  RatingStars,
  ScreenHeader,
  ServiceCard,
  StatusBadge,
  StickyFooter,
  Timeline,
} from '@/components';
import { color, gradient } from '@/theme';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const render = (ui: ReactNode) =>
  ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={metrics}>{ui}</SafeAreaProvider>,
    );
  });

test('headers render in all three variants', async () => {
  await render(<ScreenHeader title="Cart" subtitle="Swift Petrol" />);
  await render(<ScreenHeader title="Regular AC Service" variant="hero" />);
  await render(<ScreenHeader title="Reserve Member" variant="accent" />);
});

test('buttons render across tone, variant and size', async () => {
  await render(<Button label="Verify & Continue" block />);
  await render(<Button label="Buy for 1,199" tone="accent" block />);
  await render(<Button label="ADD" size="sm" />);
  await render(<Button label="ADDED" size="sm" variant="outline" />);
  await render(<Button label="Change" size="sm" variant="ghost" />);
  await render(<Button label="Disabled" disabled />);
});

test('selection controls render', async () => {
  await render(
    <PillGroup>
      <Pill label="Scheduled Service" selected />
      <Pill label="Value Services" />
    </PillGroup>,
  );
  await render(
    <PillGroup fill>
      <Pill label="Free Pickup" selected fill />
      <Pill label="Walk-in" fill />
    </PillGroup>,
  );
});

test('value rows render', async () => {
  await render(<PriceRow price="2,599" was="3,199" />);
  await render(<PriceRow price="649" compact />);
  await render(<KeyValueRow label="Item total" value="5,198" />);
  await render(
    <KeyValueRow label="Coupon" value="-248" valueColor={color.success} />,
  );
  await render(<KeyValueRow label="To pay" value="4,750" strong />);
});

test('badges render in every tone', async () => {
  await render(<StatusBadge label="ESTIMATE SENT" tone="warning" />);
  await render(<StatusBadge label="COMPLETED" tone="success" />);
  await render(<StatusBadge label="CANCELLED" tone="error" />);
});

test('timeline renders mixed step states', async () => {
  await render(
    <Timeline
      steps={[
        { label: 'Booking received', at: '8 Oct, 6:12 PM', state: 'done' },
        { label: 'Estimate ready', at: '9 Oct, 5:30 PM', state: 'active' },
        { label: 'Delivered', state: 'pending' },
      ]}
    />,
  );
});

test('composites render', async () => {
  await render(
    <ServiceCard
      title="Basic Service"
      meta="Takes 4 Hours - 1 Month / 1,000 kms warranty"
      includes={['Air Filter Cleaning', 'Car Wash']}
      price="2,599"
      was="3,199"
    />,
  );
  await render(<CartBar count={1} total="3,099" />);
  await render(<CartBar count={3} total="9,000" />);
  await render(<StickyFooter><Button label="Select Slot" block /></StickyFooter>);
  await render(
    <Banner title="Get Rs 300 off" subtitle="Use code XYZFIRST" />,
  );
  await render(<Banner title="Reserve Member" tone="accent" />);
  await render(<Card><CheckList items={['AC Gas Topup']} /></Card>);
  await render(<CheckList items={['Car Wash']} dense />);
  await render(
    <Grid>
      <GridTile label="Delhi" selected />
      <GridTile label="Mumbai" />
      <GridTile label="All 11 services" tinted />
    </Grid>,
  );
  await render(<RatingStars value={3} />);
  await render(<RatingStars value={5} onChange={() => {}} />);
  await render(<Gradient colors={gradient.hero} />);
});
