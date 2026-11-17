import {
  BRANDS,
  MODELS,
  YEAR_BANDS,
  fuelsFor,
  transmissionsFor,
  yearsFor,
} from '@/data';

const everyModel = BRANDS.flatMap(b => MODELS[b] ?? []);

describe('fuelsFor', () => {
  it('always offers at least one fuel', () => {
    for (const m of everyModel) {
      expect({ m, n: fuelsFor(m).length > 0 }).toEqual({ m, n: true });
    }
  });

  it('offers only electric on an EV-only model', () => {
    expect(fuelsFor('ZS EV')).toEqual(['Electric']);
    expect(fuelsFor('Windsor EV')).toEqual(['Electric']);
  });

  it('withholds diesel from models that never had one', () => {
    expect(fuelsFor('Swift')).not.toContain('Diesel');
    expect(fuelsFor('Baleno')).not.toContain('Diesel');
    expect(fuelsFor('Creta')).toContain('Diesel');
  });

  it('offers electric only where that version exists', () => {
    expect(fuelsFor('Nexon')).toContain('Electric');
    expect(fuelsFor('Swift')).not.toContain('Electric');
  });

  it('withholds CNG from the automatic-only marques', () => {
    expect(fuelsFor('3 Series')).not.toContain('CNG');
  });
});

describe('transmissionsFor', () => {
  it('is automatic only for an electric car', () => {
    expect(transmissionsFor('Nexon', 'Electric')).toEqual(['Automatic']);
  });

  it('is automatic only for the German marques', () => {
    for (const m of ['3 Series', 'X1', 'C-Class', 'GLA', 'A4', 'Q3']) {
      expect(transmissionsFor(m, 'Petrol')).toEqual(['Automatic']);
    }
  });

  it('offers both on an ordinary petrol car', () => {
    expect(transmissionsFor('Swift', 'Petrol')).toEqual(['Manual', 'Automatic']);
  });
});

describe('yearsFor', () => {
  it('always offers at least one band', () => {
    for (const m of everyModel) {
      for (const f of fuelsFor(m)) {
        expect({ m, f, n: yearsFor(m, f).length > 0 }).toEqual({ m, f, n: true });
      }
    }
  });

  /**
   * The band is a price multiplier, so offering one that predates the
   * car would produce a confident but wrong number.
   */
  it('rules out bands from before the model existed', () => {
    const kylaq = yearsFor('Kylaq', 'Petrol');
    expect(kylaq).toEqual(['2023 or newer']);
    expect(kylaq).not.toContain('2016 or older');
  });

  it('offers every band for a long-running model', () => {
    expect(yearsFor('Swift', 'Petrol')).toEqual([...YEAR_BANDS]);
  });

  it('starts an electric version at its own launch', () => {
    // The Creta has been on sale for years, but its EV is from 2025.
    expect(yearsFor('Creta', 'Petrol').length).toBeGreaterThan(
      yearsFor('Creta', 'Electric').length,
    );
    expect(yearsFor('Creta', 'Electric')).toEqual(['2023 or newer']);
  });

  it('returns bands that are real', () => {
    for (const y of yearsFor('Punch', 'Electric')) {
      expect(YEAR_BANDS).toContain(y);
    }
  });
});

describe('every model can be completed', () => {
  it('yields a full car for each fuel it offers', () => {
    for (const brand of BRANDS) {
      for (const model of MODELS[brand] ?? []) {
        for (const fuel of fuelsFor(model)) {
          const trans = transmissionsFor(model, fuel);
          const years = yearsFor(model, fuel);
          expect({
            model,
            fuel,
            ok: trans.length > 0 && years.length > 0,
          }).toEqual({ model, fuel, ok: true });
        }
      }
    }
  });
});
