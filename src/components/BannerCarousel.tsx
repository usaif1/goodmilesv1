import { useEffect, useRef, useState, type ComponentRef } from 'react';
import {
  AccessibilityInfo,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { radius, useTheme } from '@/theme';

import { Text } from './Text';

export type Banner = {
  title: string;
  detail: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
};

const ADVANCE_MS = 4500;
/** How long a touch pauses the carousel for. */
const HOLD_MS = 8000;

/**
 * `.hbn-vp` - the banners move on their own until touched, then stay put
 * for a while. Stops entirely when the device asks for reduced motion.
 */
export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const { c } = useTheme();
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const [index, setIndex] = useState(0);
  const held = useRef(0);
  const [calm, setCalm] = useState(false);

  /*
   * Measured, not derived from the window: computing it as
   * width - padding drifted a few points from the real viewport, and
   * paging accumulated that error until three banners were on screen
   * at once.
   */
  const [cardWidth, setCardWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) =>
    setCardWidth(e.nativeEvent.layout.width);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setCalm);
    const sub = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setCalm,
    );
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (calm || banners.length < 2 || !cardWidth) return;
    const t = setInterval(() => {
      if (Date.now() - held.current < HOLD_MS) return;
      setIndex(i => {
        const next = (i + 1) % banners.length;
        scroll.current?.scrollTo({ x: next * cardWidth, animated: true });
        return next;
      });
    }, ADVANCE_MS);
    return () => clearInterval(t);
  }, [calm, banners.length, cardWidth]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!cardWidth) return;
    const i = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <View>
      <ScrollView
        ref={scroll}
        onLayout={onLayout}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => {
          held.current = Date.now();
        }}
        onMomentumScrollEnd={onScroll}
        scrollEventThrottle={16}
      >
        {banners.map(b => (
          <Pressable
            key={b.title}
            accessibilityRole="button"
            onPress={b.onPress}
            style={[styles.banner, { width: cardWidth || undefined, backgroundColor: c.navy }]}
          >
            <View style={styles.copy}>
              <Text variant="h3" tone="onDark">
                {b.title}
              </Text>
              <Text variant="meta" style={styles.detail}>
                {b.detail}
              </Text>
            </View>
            {b.image ? (
              <Image source={b.image} style={styles.image} resizeMode="cover" />
            ) : null}
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {banners.map((b, i) => (
          <View
            key={b.title}
            style={[
              styles.dot,
              i === index
                ? { width: 16, backgroundColor: c.ink }
                : { backgroundColor: c.ctlLine },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 132,
    flexDirection: 'row',
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  copy: { flex: 1.15, justifyContent: 'center', gap: 6, padding: 16 },
  detail: { color: '#c3cad7' },
  image: { flex: 1, height: '100%' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 3 },
});
