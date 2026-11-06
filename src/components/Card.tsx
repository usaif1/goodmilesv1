import { StyleSheet, View, type ViewProps } from 'react-native';

import { layout, radius, shadow, useTheme } from '@/theme';

export type CardProps = ViewProps & {
  /**
   * `raised` is the default: flat white with a shadow, sitting on the
   * grey page. `outlined` is what round 2 switches to wherever the
   * surface behind is already white - inside a sheet, or a home
   * section - where a shadow would have nothing to lift off.
   */
  variant?: 'raised' | 'outlined';
  /** Draws the 1.5px navy outline the prototype uses to mark a card. */
  selected?: boolean;
};

export function Card({
  variant = 'raised',
  selected = false,
  style,
  ...rest
}: CardProps) {
  const { c } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: c.card,
          borderRadius: radius.lg,
          padding: layout.cardPadding,
          gap: layout.cardGap,
        },
        variant === 'raised'
          ? shadow.card
          : { borderWidth: layout.hairline, borderColor: c.line },
        selected && [styles.selected, { borderColor: c.sel }],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  selected: { borderWidth: 1.5 },
});
