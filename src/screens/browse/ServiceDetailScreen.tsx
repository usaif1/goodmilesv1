import { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { categoryImage } from '@/assets';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
  Button,
  Card,
  Divider,
  Footer,
  PartsSheet,
  PriceTag,
  useToast,
  Screen,
  ScreenHeader,
  Text,
} from '@/components';
import {
  ADDONS,
  EXCLUSIONS,
  FAQ_ALL,
  FAQ_BY_CATEGORY,
  categoryById,
  serviceById,
} from '@/data';
import { inr, priceFor, type PartChoice } from '@/domain';
import { useApp } from '@/store';
import { Icon, layout, radius, useTheme } from '@/theme';

import type { RootScreenProps } from '@/navigation/types';

/** The prototype shortens these two for the parts labels. */
const makeName = (brand?: string) =>
  brand === 'Maruti Suzuki'
    ? 'Maruti'
    : brand === 'Mercedes-Benz'
      ? 'Mercedes'
      : (brand ?? 'Carmaker');

/** The first four jobs show; the rest sit behind "See all". */
const SHOWN = 4;

export function ServiceDetailScreen({
  navigation,
  route,
}: RootScreenProps<'ServiceDetail'>) {
  const { c } = useTheme();
  const { toast } = useToast();
  const service = serviceById(route.params.serviceId);
  const car = useApp(s => s.car);
  const cart = useApp(s => s.cart);
  const toggleCart = useApp(s => s.toggleCart);
  const parts = useApp(s => s.parts);
  const setPart = useApp(s => s.setPart);

  const partsSheet = useRef<BottomSheetModal>(null);
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) {
    return (
      <Screen header={<ScreenHeader title="Service" onBack={navigation.goBack} />}>
        <Text tone="muted">That service no longer exists.</Text>
      </Screen>
    );
  }

  const category = categoryById(service.cat);
  const inCart = cart.includes(service.id);
  const chosen: PartChoice = parts[service.id] ?? 'oes';
  const faqs = [
    ...(FAQ_BY_CATEGORY[service.cat] ? [FAQ_BY_CATEGORY[service.cat]] : []),
    ...FAQ_ALL,
  ];
  const addons = (ADDONS[service.cat] ?? [])
    .filter(id => id !== service.id)
    .map(serviceById)
    .filter(Boolean)
    .slice(0, 4);
  const jobs = showAll ? service.inc : service.inc.slice(0, SHOWN);
  const price = priceFor(service, car);

  return (
    <>
    <Screen
      header={
        <ScreenHeader
          title={category?.name ?? 'Service'}
          onBack={navigation.goBack}
        />
      }
      footer={
        inCart ? (
          <Footer>
            <View style={styles.actions}>
              <Button
                label="Remove"
                variant="ghost"
                style={styles.grow}
                onPress={() => toggleCart(service.id)}
              />
              <Button
                label="View cart"
                style={styles.grow}
                onPress={() => navigation.navigate('Cart')}
              />
            </View>
          </Footer>
        ) : (
          <Footer
            total={
              price !== null
                ? { label: service.hrs, value: price === 0 ? 'Free' : inr(price) }
                : undefined
            }
          >
            <Button
              label="Add to cart"
              style={styles.grow}
              onPress={() => toggleCart(service.id)}
            />
          </Footer>
        )
      }
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Play the explainer"
        onPress={() => toast('The video from our bay plays here.')}
        style={[styles.hero, { backgroundColor: c.bay }]}
      >
        {categoryImage(category?.png ?? service.cat) ? (
          <Image
            source={categoryImage(category?.png ?? service.cat)}
            style={styles.heroImage}
            resizeMode="contain"
          />
        ) : (
          <Icon name="wrench" size={48} color={c.muted} />
        )}
        <View style={[styles.play, { backgroundColor: c.sel }]}>
          <Icon name="play" size={18} color="#ffffff" />
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('Passport')}
        style={[styles.passport, { backgroundColor: c.card, borderColor: c.line }]}
      >
        <Icon name="shield" size={16} color={c.ink} />
        <Text variant="small" style={styles.grow}>
          Goes in your car&rsquo;s health passport
        </Text>
        <Text variant="smallStrong" style={styles.more}>
          See a sample
        </Text>
      </Pressable>

      <View>
        <Text variant="h2">{service.name}</Text>
        <PriceTag service={service} car={car} />
        <Text variant="small" tone="muted">
          {service.hrs}
          {service.every ? ` · ${service.every}` : ''}
        </Text>
      </View>

      {service.parts && car ? (
        <View style={styles.parts}>
          <View style={styles.partsHead}>
            <Text variant="label" style={styles.grow}>
              Choose your parts
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => partsSheet.current?.present()}
            >
              <Text variant="smallStrong" style={styles.more}>
                What&rsquo;s the difference?
              </Text>
            </Pressable>
          </View>
          {(['oes', 'oem'] as PartChoice[]).map(option => {
            const p = priceFor(service, car, option);
            const extra =
              option === 'oem' && p !== null
                ? p - (priceFor(service, car, 'oes') ?? 0)
                : 0;
            const on = chosen === option;
            return (
              <Pressable
                key={option}
                accessibilityRole="radio"
                accessibilityState={{ checked: on }}
                onPress={() => setPart(service.id, option)}
                style={[
                  styles.part,
                  { borderColor: on ? c.sel : c.line, backgroundColor: c.card },
                ]}
              >
                <View style={[styles.radio, { borderColor: on ? c.sel : c.ctlLine }]}>
                  {on ? <View style={[styles.dot, { backgroundColor: c.sel }]} /> : null}
                </View>
                <View style={styles.grow}>
                  <Text variant="bodyStrong">
                    {option === 'oem'
                      ? `${makeName(car.brand)} box (OEM)`
                      : 'Branded (OES)'}
                  </Text>
                  <Text variant="small" tone="muted">
                    {option === 'oes'
                      ? 'Costs less'
                      : extra > 0
                        ? `+${inr(extra)}`
                        : 'Carmaker packaging'}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      <Card>
        <Text variant="h3">What&rsquo;s included</Text>
        {jobs.map(([line, warranty]) => (
          <View key={line} style={styles.job}>
            <Icon name="check" size={16} strokeWidth={2.4} color={c.ink} />
            <Text variant="body" style={styles.grow}>
              {line}
            </Text>
            {warranty ? (
              <Text variant="meta" tone="muted">
                {warranty} warranty
              </Text>
            ) : null}
          </View>
        ))}
        {service.inc.length > SHOWN ? (
          <Pressable onPress={() => setShowAll(v => !v)} accessibilityRole="button">
            <Text variant="smallStrong" style={styles.more}>
              {showAll ? 'Show fewer' : `See all ${service.inc.length} jobs`}
            </Text>
          </Pressable>
        ) : null}
      </Card>

      {EXCLUSIONS[service.cat]?.length ? (
        <Card>
          <Text variant="h3">Not included</Text>
          {EXCLUSIONS[service.cat].map(x => (
            <Text key={x} variant="body" tone="muted">
              {x}
            </Text>
          ))}
        </Card>
      ) : null}

      {addons.length ? (
        <View>
          <Text variant="h3" style={styles.addonTitle}>
            Often added with this
          </Text>
          <View style={styles.addons}>
            {addons.map(a => (
              <Pressable
                key={a!.id}
                accessibilityRole="button"
                onPress={() =>
                  navigation.push('ServiceDetail', { serviceId: a!.id })
                }
                style={[styles.addon, { backgroundColor: c.card, borderColor: c.line }]}
              >
                <Text variant="smallStrong" numberOfLines={2}>
                  {a!.name}
                </Text>
                <Text variant="small" tone="muted">
                  {priceFor(a!, car) !== null ? inr(priceFor(a!, car)!) : a!.hrs}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      <Card>
        <Text variant="h3">Questions</Text>
        {faqs.map(([q, a], i) => (
          <View key={q}>
            {i > 0 ? <Divider /> : null}
            <Pressable
              accessibilityRole="button"
              onPress={() => setOpenFaq(openFaq === i ? null : i)}
              style={styles.faqRow}
            >
              <Text variant="bodyStrong" style={styles.grow}>
                {q}
              </Text>
              <Icon name="down" size={16} strokeWidth={2.2} color={c.ink} />
            </Pressable>
            {openFaq === i ? (
              <Text variant="small" tone="muted" style={styles.faqBody}>
                {a}
              </Text>
            ) : null}
          </View>
        ))}
      </Card>
    </Screen>

    <PartsSheet
      ref={partsSheet}
      make={makeName(car?.brand)}
      onClose={() => partsSheet.current?.dismiss()}
    />
    </>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, minWidth: 0 },
  actions: { flexDirection: 'row', gap: 8 },
  hero: {
    aspectRatio: 16 / 10,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: { width: '52%', height: '70%' },
  play: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passport: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
  },
  parts: { gap: 8 },
  partsHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  part: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  job: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  more: { textDecorationLine: 'underline' },
  addonTitle: { marginBottom: 12 },
  addons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  addon: {
    width: '48%',
    gap: 4,
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: layout.hairline,
  },
  faqRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
  faqBody: { paddingBottom: 10 },
});
