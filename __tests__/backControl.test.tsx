/**
 * The back control is read from the ROOT stack, not the nearest
 * navigator. On a tab screen the nearest navigator is the tab bar,
 * whose canGoBack turns true as soon as you switch tabs - which would
 * put a back arrow on Home. These cover both shapes.
 *
 * @format
 */

import type { ReactNode } from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { NavigationContext } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

/** Minimal stand-in for a navigation object. */
const navObject = (canGoBack: boolean, parent?: object) =>
  ({
    canGoBack: () => canGoBack,
    getParent: () => parent,
    goBack: () => {},
  } as never);

const render = async (ui: ReactNode) => {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={metrics}>{ui}</SafeAreaProvider>,
    );
  });
  return JSON.stringify(tree!.toJSON());
};

const withNav = (nav: unknown, ui: ReactNode) => (
  <NavigationContext.Provider value={nav as never}>
    {ui}
  </NavigationContext.Provider>
);

const header = <ScreenHeader title="Cart" />;

test('a pushed screen shows the back control', async () => {
  const json = await render(withNav(navObject(true), header));
  expect(json).toContain('Go back');
});

test('a tab screen does not, even once tab history exists', async () => {
  // Nearest navigator (the tab bar) reports true; the root stack is at
  // its first route and reports false. The root must win.
  const rootStack = navObject(false);
  const tabNav = navObject(true, rootStack as object);
  const json = await render(withNav(tabNav, header));
  expect(json).not.toContain('Go back');
});

test('showBack overrides the navigation state both ways', async () => {
  expect(
    await render(withNav(navObject(false), <ScreenHeader title="X" showBack />)),
  ).toContain('Go back');
  expect(
    await render(
      withNav(navObject(true), <ScreenHeader title="X" showBack={false} />),
    ),
  ).not.toContain('Go back');
});

test('renders with no navigator above it at all', async () => {
  const json = await render(header);
  expect(json).not.toContain('Go back');
  expect(json).toContain('Cart');
});
