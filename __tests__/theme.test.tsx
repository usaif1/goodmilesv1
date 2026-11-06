import fs from 'fs';
import path from 'path';

import { dark, face, ICONS, light, type } from '@/theme';

describe('fonts', () => {
  const fontDir = path.join(__dirname, '..', 'assets', 'fonts');

  it('bundles a file for every face the type scale names', () => {
    for (const file of Object.values(face)) {
      expect(fs.existsSync(path.join(fontDir, `${file}.ttf`))).toBe(true);
    }
  });

  it('is registered on both platforms', () => {
    const android = fs.readdirSync(
      path.join(__dirname, '..', 'android/app/src/main/assets/fonts'),
    );
    const plist = fs.readFileSync(
      path.join(__dirname, '..', 'ios/goodmilesv1/Info.plist'),
      'utf8',
    );
    for (const file of Object.values(face)) {
      expect(android).toContain(`${file}.ttf`);
      expect(plist).toContain(`${file}.ttf`);
    }
  });

  /**
   * Android silently falls back to regular when a numeric weight has no
   * matching face, which is why every role names its face instead.
   */
  it('never sets fontWeight', () => {
    for (const [role, style] of Object.entries(type)) {
      expect({ role, weight: 'fontWeight' in style }).toEqual({
        role,
        weight: false,
      });
    }
  });

  it('only uses faces that exist', () => {
    const known = new Set<string>(Object.values(face));
    for (const [role, style] of Object.entries(type)) {
      expect({ role, known: known.has(style.fontFamily) }).toEqual({
        role,
        known: true,
      });
    }
  });
});

describe('palettes', () => {
  it('defines the same keys in both themes', () => {
    expect(Object.keys(dark).sort()).toEqual(Object.keys(light).sort());
  });

  it('actually differs from light where the prototype overrides it', () => {
    expect(dark.page).not.toBe(light.page);
    expect(dark.ink).not.toBe(light.ink);
    expect(dark.card).not.toBe(light.card);
  });

  /** The prototype's dark block leaves these alone, so they inherit. */
  it('keeps the brand constants across themes', () => {
    expect(dark.orange).toBe(light.orange);
    expect(dark.onOrange).toBe(light.onOrange);
    expect(dark.wa).toBe(light.wa);
  });
});

describe('icons', () => {
  it('carries the prototype’s full set', () => {
    expect(Object.keys(ICONS)).toHaveLength(47);
  });

  /**
   * `as const` already proves each icon has elements, so this checks the
   * part the type system cannot: that every primitive carries the props
   * needed to actually draw it.
   */
  it('has drawable geometry for every name', () => {
    const required: Record<string, string[]> = {
      Path: ['d'],
      Rect: ['width', 'height'],
      Circle: ['cx', 'cy', 'r'],
    };
    for (const [name, els] of Object.entries(ICONS)) {
      for (const [tag, props] of els) {
        expect(['Path', 'Rect', 'Circle']).toContain(tag);
        for (const key of required[tag]) {
          expect({ name, tag, key, present: key in props }).toEqual({
            name,
            tag,
            key,
            present: true,
          });
        }
      }
    }
  });
});
