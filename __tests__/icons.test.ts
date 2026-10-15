/**
 * Every lucide icon is imported by path, so a typo is only caught when
 * the module is first required - which for a screen can mean the app
 * bundling fine and failing on navigation. This resolves each import
 * found in src/ against both builds up front.
 *
 * It exists because `building-2` reached a screen: it is not a real
 * lucide icon in this version, and a careless shell check reported it
 * as present.
 *
 * @format
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');

const importedIcons = (): string[] => {
  const out = execSync(
    "grep -rhoE 'lucide-react-native/icons/[a-z0-9-]+' src/ | sort -u",
    { cwd: ROOT, encoding: 'utf8' },
  );
  return out
    .split('\n')
    .filter(Boolean)
    .map(line => line.slice(line.lastIndexOf('/') + 1));
};

test('every lucide icon imported in src/ exists in both builds', () => {
  const icons = importedIcons();
  expect(icons.length).toBeGreaterThan(0);

  const missing = icons.filter(name => {
    const esm = join(
      ROOT,
      'node_modules/lucide-react-native/dist/esm/icons',
      `${name}.mjs`,
    );
    const cjs = join(
      ROOT,
      'node_modules/lucide-react-native/dist/cjs/icons',
      `${name}.js`,
    );
    return !existsSync(esm) || !existsSync(cjs);
  });

  expect(missing).toEqual([]);
});
