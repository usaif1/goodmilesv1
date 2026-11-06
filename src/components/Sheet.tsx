import { forwardRef, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
  type BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

import { layout, useTheme } from '@/theme';

import { IconButton } from './IconButton';
import { Text } from './Text';

export type SheetProps = Omit<BottomSheetModalProps, 'children'> & {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  /** Pinned actions at the bottom of the sheet - the prototype's `.sf`. */
  footer?: ReactNode;
  onClose?: () => void;
};

/**
 * The prototype's `.sheet`: a 28-radius drawer with a grab handle, a
 * title row with a close button, a scrolling body and an optional
 * pinned footer.
 *
 * Cards inside a sheet are outlined rather than raised - the surface
 * behind them is already white, so a shadow has nothing to lift off.
 */
export const Sheet = forwardRef<BottomSheetModal, SheetProps>(function SheetBase(
  { title, subtitle, children, footer, onClose, ...rest },
  ref,
) {
  const { c } = useTheme();

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.32}
    />
  );

  return (
    <BottomSheetModal
      ref={ref}
      /**
       * v5 turns dynamic sizing on by default, which silently overrides
       * snapPoints and sizes the sheet to its content - and it does not
       * count a footer rendered outside the scroll view, so the sheet
       * ends up short and the content clipped. The prototype's sheets
       * have defined heights, so snapPoints win here.
       */
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={[styles.background, { backgroundColor: c.card }]}
      handleIndicatorStyle={[styles.grab, { backgroundColor: c.dash }]}
      {...rest}
    >
      {(title || onClose) && (
        <View style={styles.head}>
          <View style={styles.headText}>
            {title ? <Text variant="h3">{title}</Text> : null}
            {subtitle ? <Text variant="small" tone="muted">{subtitle}</Text> : null}
          </View>
          {onClose ? (
            <IconButton
              name="close"
              size={22}
              plain
              onPress={onClose}
              accessibilityLabel="Close"
            />
          ) : null}
        </View>
      )}
      <BottomSheetScrollView contentContainerStyle={styles.body}>
        {children}
      </BottomSheetScrollView>
      {footer ? (
        <View style={[styles.foot, { borderTopColor: c.line }]}>{footer}</View>
      ) : null}
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  background: { borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  grab: { width: 32, height: 4 },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headText: { flex: 1, minWidth: 0 },
  body: { paddingHorizontal: 16, paddingBottom: 24, gap: layout.padGap },
  foot: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: layout.hairline,
    gap: 8,
  },
});
