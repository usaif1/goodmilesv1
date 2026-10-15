import ReactTestRenderer from 'react-test-renderer';
import { View } from 'react-native';
import { Gradient } from '@/components';
import { gradient } from '@/theme';

/**
 * Gradients are defined inside an <Svg> and referenced by id. A shared
 * literal id would make every gradient on screen resolve to whichever
 * definition mounted last, which is easy to miss because a single
 * gradient on its own still looks right. react-native-svg surfaces the
 * id as `name` on the native node and the reference as `brushRef`.
 *
 * @format
 */

test('each Gradient instance gets a distinct id', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(
      <View>
        <Gradient colors={gradient.hero} />
        <Gradient colors={gradient.accent} />
        <Gradient colors={gradient.promo} />
      </View>,
    );
  });
  const json = JSON.stringify(tree!.toJSON());
  const names = [...json.matchAll(/"name":"(grad[^"]*)"/g)].map(m => m[1]);
  const refs = [...json.matchAll(/"brushRef":"(grad[^"]*)"/g)].map(m => m[1]);
  console.log('  gradient ids :', JSON.stringify(names));
  console.log('  rect refs    :', JSON.stringify(refs));
  expect(names).toHaveLength(3);
  expect(new Set(names).size).toBe(3);
  expect(names.every(n => /^grad[a-zA-Z0-9]+$/.test(n))).toBe(true);
  // each Rect must point at its own gradient, not a neighbour's
  expect(refs).toEqual(names);
});
