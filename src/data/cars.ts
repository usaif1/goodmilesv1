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
