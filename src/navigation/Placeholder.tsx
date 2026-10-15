import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, layout, radius, shadow, space, type } from '@/theme';
import type { RootNav } from './types';

/**
 * Temporary scaffold so every route renders something and the whole
 * flow is clickable before any real screen exists. Each screen branch
 * replaces its own screens' bodies; this file goes away once the last
 * one lands.
 *
 * `go` is a thunk rather than a { to, params } pair on purpose: it
 * keeps each destination concretely typed at the call site, so a wrong
 * route name or a missing param is a compile error instead of a cast.
 */
export type NextRoute = { label: string; go: (nav: RootNav) => void };

type Props = {
  title: string;
  /** Mockup this route will be built from, e.g. "C06". */
  mockup?: string;
  params?: object;
  next?: NextRoute[];
};

export function Placeholder({ title, mockup, params, next = [] }: Props) {
  const navigation = useNavigation<RootNav>();
  const insets = useSafeAreaInsets();

  return (
    <View style={s.root}>
      <View style={[s.header, { paddingTop: insets.top + space.md }]}>
        <Text style={s.headerTitle}>{title}</Text>
        <Text style={s.headerSub}>
          {mockup ? `${mockup} - not built yet` : 'No mockup - stub route'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={s.body}>
        {params && Object.keys(params).length > 0 && (
          <View style={s.card}>
            <Text style={s.cardTitle}>Route params</Text>
            {Object.entries(params).map(([k, v]) => (
              <Text key={k} style={s.param}>
                {k}: {String(v)}
              </Text>
            ))}
          </View>
        )}

        {next.length > 0 && (
          <View style={s.card}>
            <Text style={s.cardTitle}>Goes to</Text>
            {next.map(n => (
              <Pressable
                key={n.label}
                style={s.btn}
                onPress={() => n.go(navigation)}>
                <Text style={s.btnText}>{n.label}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {navigation.canGoBack() && (
          <Pressable style={s.back} onPress={() => navigation.goBack()}>
            <Text style={s.backText}>Back</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  header: {
    backgroundColor: color.brand,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: layout.headerPaddingBottom,
  },
  headerTitle: { ...type.h1, color: color.textOnBrand },
  headerSub: { ...type.meta, color: color.brandTint, marginTop: 2 },
  body: { padding: layout.screenPadding, gap: layout.cardGap },
  card: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: layout.cardPadding,
    gap: space.sm,
    ...shadow.card,
  },
  cardTitle: type.h2,
  param: type.meta,
  btn: {
    backgroundColor: color.brandTint,
    borderRadius: radius.md,
    paddingVertical: space.md,
    paddingHorizontal: layout.cardPadding,
  },
  btnText: { ...type.buttonSmall, color: color.brand },
  back: {
    alignSelf: 'flex-start',
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
  },
  backText: { ...type.buttonSmall, color: color.textMuted },
});
