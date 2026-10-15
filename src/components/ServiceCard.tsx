import { StyleSheet, Text, View } from 'react-native';
import { space, type } from '@/theme';
import { Button } from './Button';
import { Card } from './Card';
import { CheckList } from './CheckList';
import { PriceRow } from './PriceRow';

type Props = {
  title: string;
  /** e.g. "Takes 4 Hours - 1 Month / 1,000 kms warranty". */
  meta: string;
  includes: readonly string[];
  price: string;
  was?: string;
  added?: boolean;
  onToggle?: () => void;
};

/**
 * One service row on C06. Added flips the button to the outline
 * variant, which is how the mockup distinguishes ADD from ADDED.
 */
export function ServiceCard({
  title,
  meta,
  includes,
  price,
  was,
  added = false,
  onToggle,
}: Props) {
  return (
    <Card>
      <View style={s.head}>
        <Text style={s.title}>{title}</Text>
        <Button
          label={added ? 'ADDED' : 'ADD'}
          variant={added ? 'outline' : 'solid'}
          size="sm"
          onPress={onToggle}
        />
      </View>
      <Text style={s.meta}>{meta}</Text>
      <View style={s.includes}>
        <CheckList items={includes} dense />
      </View>
      <PriceRow price={price} was={was} />
    </Card>
  );
}

const s = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: space.md,
  },
  /** Measured 10pt cap on C06, i.e. 14pt - the h2 role, not h1. */
  title: { ...type.h2, flex: 1 },
  meta: { ...type.meta, lineHeight: 16, marginTop: 2 },
  includes: { marginTop: 0, marginBottom: space.sm },
});
