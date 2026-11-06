import fs from 'fs';
import path from 'path';

import { dark, light } from '@/theme';

/**
 * The prototype's stylesheet layers three design passes, so a token's
 * first definition is usually not its final one - transcribing the top
 * of the file silently produces the wrong palette. This re-derives the
 * computed values and compares them, so the tokens cannot drift from
 * the source of truth.
 *
 * reference/ is deliberately untracked, so this skips when it is absent
 * rather than failing on a fresh clone.
 */
const REFERENCE = path.join(__dirname, '..', 'reference', 'index.html');
const present = fs.existsSync(REFERENCE);

type Vars = Record<string, string>;

function cascade(): { light: Vars; dark: Vars } {
  const raw = fs.readFileSync(REFERENCE, 'utf8');
  const css = [...raw.matchAll(/<style>([\s\S]*?)<\/style>/g)]
    .map(m => m[1])
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');

  const l: Vars = {};
  const d: Vars = {};
  const rule = /(:root(\[data-theme="dark"\])?)\s*\{([^}]*)\}/g;
  for (const m of css.matchAll(rule)) {
    const target = m[2] ? d : l;
    for (const decl of m[3].split(';')) {
      const i = decl.indexOf(':');
      if (i < 0) continue;
      const k = decl.slice(0, i).trim();
      if (k.startsWith('--')) target[k] = decl.slice(i + 1).trim();
    }
  }
  return { light: l, dark: d };
}

/** Follows `var(--x)` chains to a literal. */
function resolve(vars: Vars, base: Vars, key: string): string {
  let v = vars[key] ?? base[key];
  const seen = new Set<string>();
  while (v?.startsWith('var(')) {
    const ref = v.slice(4, -1).trim();
    if (seen.has(ref)) break;
    seen.add(ref);
    v = vars[ref] ?? base[ref];
  }
  return v;
}

const CHECK: [keyof typeof light, string][] = [
  ['page', '--page'],
  ['bay', '--bay'],
  ['line', '--line'],
  ['line2', '--line2'],
  ['muted', '--muted'],
  ['ink', '--ink'],
  ['ink2', '--ink-2'],
  ['card', '--card'],
  ['ok', '--ok'],
  ['okTint', '--ok-tint'],
  ['sel', '--sel'],
  ['orange', '--orange'],
  ['stage', '--stage'],
  ['red', '--red'],
  ['ctlLine', '--ctl-line'],
];

(present ? describe : describe.skip)('tokens match the prototype cascade', () => {
  const vars = present ? cascade() : { light: {}, dark: {} };

  it.each(CHECK)('light %s', (token, cssVar) => {
    expect(light[token].toLowerCase()).toBe(
      resolve(vars.light, {}, cssVar).toLowerCase(),
    );
  });

  it.each(CHECK)('dark %s', (token, cssVar) => {
    expect(dark[token].toLowerCase()).toBe(
      resolve(vars.dark, vars.light, cssVar).toLowerCase(),
    );
  });
});
