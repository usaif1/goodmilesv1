/**
 * Car reference data. Generated from the reference prototype.
 */
export const BRANDS = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Kia",
  "Toyota",
  "Honda",
  "MG",
  "Skoda",
  "Volkswagen",
  "Renault",
  "Nissan",
  "Jeep",
  "Citroen",
  "BMW",
  "Mercedes-Benz",
  "Audi"
] as const;

export const MODELS: Record<string, string[]> = {
  "Maruti Suzuki": [
    "Swift",
    "Baleno",
    "Dzire",
    "Brezza",
    "WagonR",
    "Ertiga",
    "Fronx",
    "Grand Vitara",
    "Alto K10"
  ],
  "Hyundai": [
    "Creta",
    "Venue",
    "i20",
    "Verna",
    "Exter",
    "Grand i10 Nios",
    "Alcazar",
    "Aura"
  ],
  "Tata": [
    "Nexon",
    "Punch",
    "Tiago",
    "Altroz",
    "Harrier",
    "Safari"
  ],
  "Mahindra": [
    "XUV700",
    "Scorpio-N",
    "Thar",
    "XUV 3XO",
    "Bolero"
  ],
  "Kia": [
    "Seltos",
    "Sonet",
    "Carens"
  ],
  "Toyota": [
    "Innova Crysta",
    "Fortuner",
    "Glanza",
    "Hyryder"
  ],
  "Honda": [
    "City",
    "Amaze",
    "Elevate"
  ],
  "MG": [
    "Hector",
    "Astor",
    "ZS EV",
    "Windsor EV"
  ],
  "Skoda": [
    "Slavia",
    "Kushaq",
    "Kylaq"
  ],
  "Volkswagen": [
    "Virtus",
    "Taigun"
  ],
  "Renault": [
    "Kwid",
    "Kiger",
    "Triber"
  ],
  "Nissan": [
    "Magnite"
  ],
  "Jeep": [
    "Compass",
    "Meridian"
  ],
  "Citroen": [
    "C3",
    "Basalt"
  ],
  "BMW": [
    "3 Series",
    "X1"
  ],
  "Mercedes-Benz": [
    "C-Class",
    "GLA"
  ],
  "Audi": [
    "A4",
    "Q3"
  ]
};

export const YEAR_BANDS = [
  "2023 or newer",
  "2020–2022",
  "2017–2019",
  "2016 or older"
] as const;
export type YearBand = (typeof YEAR_BANDS)[number];

/** Older cars cost more to service. */
export const YEAR_FACTOR: Record<string, number> = {
  "2023 or newer": 1,
  "2020–2022": 1.05,
  "2017–2019": 1.1,
  "2016 or older": 1.18
};

/** The last calendar year in each band. */
export const YEAR_END: Record<string, number> = {
  "2023 or newer": 2026,
  "2020–2022": 2022,
  "2017–2019": 2019,
  "2016 or older": 2016
};

/**
 * Size multipliers. Base prices are set for the smallest cars, so only
 * the larger segments are listed; anything absent is 1.0, and the German
 * three are handled separately in pricing.ts.
 */
export const SEGMENT: Record<string, string[]> = {
  "1.1": [
    "Dzire",
    "Brezza",
    "Fronx",
    "Venue",
    "Verna",
    "Aura",
    "Nexon",
    "Sonet",
    "City",
    "Amaze",
    "Slavia",
    "Virtus",
    "Kylaq",
    "XUV 3XO",
    "Kiger",
    "Magnite",
    "C3",
    "Basalt",
    "ZS EV",
    "Windsor EV"
  ],
  "1.2": [
    "Grand Vitara",
    "Ertiga",
    "Creta",
    "Seltos",
    "Carens",
    "Hyryder",
    "Elevate",
    "Astor",
    "Kushaq",
    "Taigun",
    "Thar",
    "Bolero",
    "Alcazar"
  ],
  "1.35": [
    "XUV700",
    "Scorpio-N",
    "Harrier",
    "Safari",
    "Innova Crysta",
    "Hector",
    "Compass",
    "Meridian"
  ],
  "1.5": [
    "Fortuner"
  ]
};

export const FUELS = ['Petrol', 'Diesel', 'CNG', 'Electric'] as const;
export const TRANSMISSIONS = ['Manual', 'Automatic'] as const;

/** Models sold only as an EV. */
const EV_ONLY = ['ZS EV', 'Windsor EV'];

/** Models with no manual gearbox on sale. */
const AUTO_ONLY = ['3 Series', 'X1', 'C-Class', 'GLA', 'A4', 'Q3'];

/** Models that also have an electric version. */
const EV = ['Nexon', 'Punch', 'Tiago', 'ZS EV', 'Windsor EV', 'Creta'];

/** Models never sold with a diesel engine. */
const NO_DIESEL = [
  'Alto K10', 'WagonR', 'Swift', 'Baleno', 'Glanza', 'Fronx', 'Exter',
  'Punch', 'Tiago', 'Kwid', 'Triber', 'Kiger', 'Magnite', 'C3', 'Basalt',
  'Hyryder', 'Grand Vitara', 'Kylaq', 'Kushaq', 'Slavia', 'Taigun',
  'Virtus', 'Elevate', ...EV_ONLY,
];

/** First year on sale, where it is recent enough to rule a band out. */
const LAUNCH: Record<string, number> = {
  'Windsor EV': 2024, Kylaq: 2025, Basalt: 2024, 'XUV 3XO': 2024,
  Exter: 2023, Fronx: 2023, Elevate: 2023, 'Grand Vitara': 2022,
  Hyryder: 2022, Slavia: 2022, Virtus: 2022, 'Scorpio-N': 2022,
  Carens: 2022, C3: 2022, Meridian: 2022, Kushaq: 2021, Taigun: 2021,
  XUV700: 2021, Punch: 2021, Alcazar: 2021, Kiger: 2021, Astor: 2021,
  'ZS EV': 2020, Sonet: 2020, Magnite: 2020, Aura: 2020,
  'Grand i10 Nios': 2019, Venue: 2019, Seltos: 2019, Hector: 2019,
};

/** When the electric version arrived, where it came later than the petrol. */
const EV_LAUNCH: Record<string, number> = {
  Nexon: 2020, Tiago: 2022, Punch: 2024, Creta: 2025,
};

/**
 * Which fuels this model is actually sold with. Narrowing the options
 * is not cosmetic: the year band it leads to multiplies every price the
 * customer sees, so offering a combination that never existed produces
 * a real but wrong number.
 */
export const fuelsFor = (model: string): string[] =>
  EV_ONLY.includes(model)
    ? ['Electric']
    : FUELS.filter(
        f =>
          f === 'Petrol' ||
          (f === 'Diesel' && !NO_DIESEL.includes(model)) ||
          (f === 'CNG' && !AUTO_ONLY.includes(model)) ||
          (f === 'Electric' && EV.includes(model)),
      );

/** EVs and the German marques are automatic only. */
export const transmissionsFor = (model: string, fuel: string): string[] =>
  fuel === 'Electric' || AUTO_ONLY.includes(model)
    ? ['Automatic']
    : [...TRANSMISSIONS];

/** Year bands that existed for this model, and this fuel. */
export const yearsFor = (model: string, fuel: string): string[] => {
  const from = (fuel === 'Electric' && EV_LAUNCH[model]) || LAUNCH[model] || 0;
  return YEAR_BANDS.filter(y => YEAR_END[y] >= from);
};
