import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, layout, useTheme, type IconName } from '@/theme';

import { Text } from './Text';

export type TabItem = {
  key: string;
  label: string;
  icon: IconName;
  /** The live dot on Bookings while an order is running. */
  dot?: boolean;
};

export type TabBarProps = {
  items: TabItem[];
  active: string;
  onSelect: (key: string) => void;
};

/**
 * The flat, full-width tab bar the production rounds settled on - not
 * the floating pill of the first pass. The active tab is marked by a
 * tinted lozenge behind its icon rather than a filled background.
 */
export function TabBar({ items, active, onSelect }: TabBarProps) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: c.card,
          borderTopColor: c.line,
          paddingBottom: 6 + insets.bottom,
        },
      ]}
    >
      {items.map(item => {
        const on = item.key === active;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            style={styles.tab}
            onPress={() => onSelect(item.key)}
          >
            <View
              style={[
                styles.lozenge,
                on && { backgroundColor: c.bay },
              ]}
            >
              <Icon
                name={item.icon}
                size={22}
                color={on ? c.ink : '#7a8295'}
                strokeWidth={on ? 2.3 : 1.8}
              />
              {item.dot ? (
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: c.orange, borderColor: c.card },
                  ]}
                />
              ) : null}
            </View>
            <Text
              variant={on ? 'tabOn' : 'tab'}
              style={{ color: on ? c.ink : '#7a8295' }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    flexShrink: 0,
    paddingTop: 6,
    paddingHorizontal: 4,
    borderTopWidth: layout.hairline,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3, paddingTop: 4, paddingBottom: 2 },
  lozenge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
  },
});
