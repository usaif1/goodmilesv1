import { View, type ViewProps } from 'react-native';

import { layout, useTheme } from '@/theme';

/** The prototype's `.sep`: a hairline rule inside a card. */
export function Divider({ style, ...rest }: ViewProps) {
  const { c } = useTheme();
  return (
    <View
      style={[{ height: layout.hairline, backgroundColor: c.line }, style]}
      {...rest}
    />
  );
}
