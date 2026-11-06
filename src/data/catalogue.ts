import type { IconName } from '@/theme';

/**
 * The service catalogue, lifted from the reference prototype. Generated -
 * re-extract rather than hand-editing.
 *
 * `base` is the 44th percentile of what customers were actually billed
 * for that job over twelve months, across all cars. It is not a price:
 * pricing.ts scales it by car size, age and gearbox. A service with
 * `parts` can be fitted with branded (OES) or carmaker (OEM) parts.
 */
export type Category = {
  id: string;
  name: string;
  icon: IconName;
  /** Overrides for the category's artwork; unused while images are out. */
  png?: string;
  photo?: string;
};

export type Service = {
  id: string;
  cat: string;
  name: string;
  /** Benchmark cost before scaling. Zero means the job is free. */
  base: number;
  hrs: string;
  /** What the job covers: [line, warranty]. */
  inc: [string, string][];
  /** Present when the job fits a part, so OES/OEM applies. */
  parts?: number;
  /** Service interval, where the job has one. */
  every?: string;
  img?: string;
  credit?: number;
  /** Marks the three headline periodic packages. */
  pack?: number;
};

export const CATEGORIES = [
  {
    "id": "periodic",
    "name": "Car service",
    "icon": "wrench"
  },
  {
    "id": "spa",
    "name": "Cleaning & detailing",
    "icon": "spray"
  },
  {
    "id": "ac",
    "name": "AC service & repair",
    "icon": "snow"
  },
  {
    "id": "denting",
    "name": "Denting & painting",
    "icon": "paint"
  },
  {
    "id": "sos",
    "name": "Roadside help",
    "icon": "pin",
    "png": "battery",
    "photo": "u-express"
  },
  {
    "id": "brakes",
    "name": "Brakes",
    "icon": "disc"
  },
  {
    "id": "inspection",
    "name": "Inspections & check-ups",
    "icon": "scan"
  },
  {
    "id": "battery",
    "name": "Batteries",
    "icon": "battery"
  },
  {
    "id": "tyres",
    "name": "Tyres & wheels",
    "icon": "tyre"
  },
  {
    "id": "suspension",
    "name": "Suspension & steering",
    "icon": "gear",
    "png": "clutch",
    "photo": "shocks"
  },
  {
    "id": "clutch",
    "name": "Clutch & gearbox",
    "icon": "gear"
  },
  {
    "id": "glass",
    "name": "Windshield & lights",
    "icon": "bulb"
  },
  {
    "id": "engine",
    "name": "Engine & electricals",
    "icon": "wrench",
    "png": "periodic",
    "photo": "u-bay"
  }
] as const satisfies readonly Category[];

export const SERVICES = [
  {
    "id": "basic",
    "cat": "periodic",
    "pack": 1,
    "name": "Basic service",
    "base": 2617,
    "hrs": "4 hrs",
    "parts": 1,
    "img": "engine",
    "every": "Every 5,000 km or 3 months",
    "inc": [
      [
        "Engine oil replacement",
        "1,000 km"
      ],
      [
        "Oil filter replacement",
        "1,000 km"
      ],
      [
        "Air filter cleaning",
        ""
      ],
      [
        "Coolant and battery water top-up",
        ""
      ],
      [
        "Car wash",
        ""
      ],
      [
        "15-point check",
        ""
      ]
    ]
  },
  {
    "id": "standard",
    "cat": "periodic",
    "pack": 1,
    "name": "Standard service",
    "base": 3169,
    "hrs": "6 hrs",
    "parts": 1,
    "img": "engine",
    "every": "Every 10,000 km or 6 months",
    "inc": [
      [
        "Engine oil replacement",
        "1,000 km"
      ],
      [
        "Oil filter replacement",
        "1,000 km"
      ],
      [
        "Air filter replacement",
        "1,000 km"
      ],
      [
        "AC filter cleaning",
        ""
      ],
      [
        "Spark plugs cleaning",
        ""
      ],
      [
        "Front and rear brakes cleaned",
        ""
      ],
      [
        "Coolant, brake fluid and wiper fluid top-up",
        ""
      ],
      [
        "Car wash and interior vacuum",
        ""
      ],
      [
        "Computer scan",
        ""
      ],
      [
        "30-point check",
        ""
      ]
    ]
  },
  {
    "id": "comprehensive",
    "cat": "periodic",
    "pack": 1,
    "name": "Comprehensive service",
    "base": 4972,
    "hrs": "8 hrs",
    "parts": 1,
    "img": "engine",
    "every": "Every 40,000 km or 2 years",
    "inc": [
      [
        "Everything in Standard",
        "1,000 km"
      ],
      [
        "Fuel filter replacement",
        "3 months"
      ],
      [
        "Spark plugs replacement",
        "3 months"
      ],
      [
        "AC filter replacement",
        "3 months"
      ],
      [
        "Throttle body cleaning",
        "1 month"
      ],
      [
        "Wheel alignment and balancing",
        "1 month"
      ],
      [
        "Gear oil top-up",
        ""
      ],
      [
        "50-point check",
        ""
      ]
    ]
  },
  {
    "id": "airfilter",
    "cat": "periodic",
    "name": "Air filter replacement",
    "base": 475,
    "hrs": "30 min",
    "parts": 1,
    "every": "Every 10,000 km",
    "inc": [
      [
        "Air filter, new",
        "3 months"
      ],
      [
        "Air box cleaned",
        ""
      ]
    ]
  },
  {
    "id": "sparkplugs",
    "cat": "periodic",
    "name": "Spark plugs replacement, set",
    "base": 612,
    "hrs": "45 min",
    "parts": 1,
    "every": "Every 20,000 km",
    "inc": [
      [
        "All spark plugs, new",
        "3 months"
      ],
      [
        "Gap set to your carmaker's spec",
        ""
      ]
    ]
  },
  {
    "id": "fuelfilter",
    "cat": "periodic",
    "name": "Fuel filter replacement",
    "base": 1000,
    "hrs": "1 hr",
    "parts": 1,
    "every": "Every 40,000 km",
    "inc": [
      [
        "Fuel filter, new",
        "3 months"
      ],
      [
        "Fuel lines checked for leaks",
        ""
      ]
    ]
  },
  {
    "id": "throttle",
    "cat": "periodic",
    "name": "Throttle body cleaning",
    "base": 399,
    "hrs": "45 min",
    "every": "Every 20,000 km",
    "inc": [
      [
        "Throttle body cleaned",
        "1 month"
      ],
      [
        "Idle checked after cleaning",
        ""
      ]
    ]
  },
  {
    "id": "coolant",
    "cat": "periodic",
    "name": "Coolant replacement with radiator flush",
    "base": 900,
    "hrs": "1 hr",
    "parts": 1,
    "every": "Every 2 years",
    "inc": [
      [
        "Radiator flushed",
        "1 month"
      ],
      [
        "Coolant drained and refilled",
        "1 month"
      ],
      [
        "Radiator hoses checked",
        ""
      ]
    ]
  },
  {
    "id": "engineflush",
    "cat": "periodic",
    "name": "Engine flush",
    "base": 749,
    "hrs": "30 min",
    "every": "With every second oil change",
    "inc": [
      [
        "Flush run before the oil change",
        ""
      ],
      [
        "Old sludge drained out",
        ""
      ]
    ]
  },
  {
    "id": "topwash",
    "cat": "spa",
    "name": "Premium top wash",
    "base": 238,
    "hrs": "45 min",
    "every": "Every 2 weeks",
    "inc": [
      [
        "Foam wash outside",
        ""
      ],
      [
        "Tyres and rims cleaned",
        ""
      ],
      [
        "Glass cleaned inside and out",
        ""
      ]
    ]
  },
  {
    "id": "foam",
    "cat": "spa",
    "name": "Foam wash and vacuum",
    "base": 499,
    "hrs": "1 hr",
    "every": "Every 2 weeks",
    "inc": [
      [
        "Pressure foam wash",
        ""
      ],
      [
        "Interior vacuum",
        ""
      ],
      [
        "Dashboard wiped",
        ""
      ],
      [
        "Tyre dressing",
        ""
      ]
    ]
  },
  {
    "id": "washwax",
    "cat": "spa",
    "name": "Car wash and wax",
    "base": 599,
    "hrs": "1.5 hrs",
    "every": "Every month",
    "inc": [
      [
        "Foam wash",
        ""
      ],
      [
        "Liquid wax, hand applied",
        ""
      ],
      [
        "Interior vacuum",
        ""
      ]
    ]
  },
  {
    "id": "interior",
    "cat": "spa",
    "name": "Interior spa",
    "base": 1449,
    "hrs": "3 hrs",
    "every": "Every 6 months",
    "inc": [
      [
        "Seats and carpets shampooed",
        ""
      ],
      [
        "Dashboard and doors cleaned and dressed",
        ""
      ],
      [
        "Roof lining cleaned",
        ""
      ],
      [
        "AC vents cleaned",
        ""
      ]
    ]
  },
  {
    "id": "deep",
    "cat": "spa",
    "name": "Deep all-round spa",
    "base": 2299,
    "hrs": "5 hrs",
    "every": "Every 6 months",
    "inc": [
      [
        "Interior spa",
        ""
      ],
      [
        "Exterior foam wash and wax",
        ""
      ],
      [
        "Engine bay cleaned",
        ""
      ],
      [
        "Odour treatment",
        ""
      ]
    ]
  },
  {
    "id": "deep360",
    "cat": "spa",
    "name": "360° deep cleaning",
    "base": 2149,
    "hrs": "5 hrs",
    "every": "Every 6 months",
    "inc": [
      [
        "Seats, roof and carpets steam cleaned",
        ""
      ],
      [
        "Boot and door pads cleaned",
        ""
      ],
      [
        "Exterior wash and polish",
        ""
      ]
    ]
  },
  {
    "id": "rubbing",
    "cat": "spa",
    "name": "Rubbing and polishing",
    "base": 1429,
    "hrs": "4 hrs",
    "every": "Every 6 months",
    "inc": [
      [
        "Machine rubbing, full body",
        ""
      ],
      [
        "Wax polish",
        ""
      ],
      [
        "Before and after photos",
        ""
      ]
    ]
  },
  {
    "id": "rubbing3m",
    "cat": "spa",
    "name": "3M rubbing and polishing",
    "base": 2699,
    "hrs": "5 hrs",
    "every": "Every 6 months",
    "inc": [
      [
        "3M compound and polish",
        ""
      ],
      [
        "Light swirl marks removed",
        ""
      ],
      [
        "Before and after photos",
        ""
      ]
    ]
  },
  {
    "id": "ceramic",
    "cat": "spa",
    "name": "Ceramic coating, 9H",
    "base": 9999,
    "hrs": "2 days",
    "inc": [
      [
        "Paint correction first",
        ""
      ],
      [
        "9H ceramic coat",
        "1 year"
      ],
      [
        "Care guide for washing",
        ""
      ]
    ]
  },
  {
    "id": "graphene",
    "cat": "spa",
    "name": "Graphene coating, 10H",
    "base": 12999,
    "hrs": "2 days",
    "inc": [
      [
        "Paint correction first",
        ""
      ],
      [
        "10H graphene coat",
        "2 years"
      ],
      [
        "Care guide for washing",
        ""
      ]
    ]
  },
  {
    "id": "headlight",
    "cat": "spa",
    "name": "Headlight restoration, pair",
    "base": 999,
    "hrs": "2 hrs",
    "inc": [
      [
        "Oxidation removed",
        ""
      ],
      [
        "UV clear coat",
        "6 months"
      ]
    ]
  },
  {
    "id": "antirust",
    "cat": "spa",
    "name": "Anti-rust underbody coating",
    "base": 1858,
    "hrs": "4 hrs",
    "every": "Every year, before the monsoon",
    "inc": [
      [
        "Underbody washed and dried",
        ""
      ],
      [
        "Rubberised anti-rust coat",
        "1 year"
      ]
    ]
  },
  {
    "id": "ratguard",
    "cat": "spa",
    "name": "Rat repellent treatment",
    "base": 1250,
    "hrs": "1 hr",
    "inc": [
      [
        "Repellent spray in the engine bay",
        "3 months"
      ],
      [
        "Wires checked for bites",
        ""
      ]
    ]
  },
  {
    "id": "silencer",
    "cat": "spa",
    "name": "Silencer coating",
    "base": 1599,
    "hrs": "2 hrs",
    "inc": [
      [
        "Silencer cleaned",
        ""
      ],
      [
        "Heat-proof anti-rust coat",
        "1 year"
      ]
    ]
  },
  {
    "id": "accheck",
    "cat": "ac",
    "name": "AC check-up",
    "base": 99,
    "hrs": "30 min",
    "credit": 1,
    "inc": [
      [
        "Vent temperature and gas pressure checked",
        ""
      ],
      [
        "Leak check",
        ""
      ],
      [
        "Photos and a price for any fix",
        ""
      ]
    ]
  },
  {
    "id": "acreg",
    "cat": "ac",
    "name": "Regular AC service",
    "base": 2099,
    "hrs": "3 hrs",
    "every": "Every year, before summer",
    "inc": [
      [
        "AC gas top-up, up to 400 g",
        "1 month"
      ],
      [
        "Vents cleaned",
        ""
      ],
      [
        "Condenser cleaned",
        ""
      ],
      [
        "AC filter cleaned",
        ""
      ],
      [
        "Vent temperature, before and after",
        ""
      ]
    ]
  },
  {
    "id": "achp",
    "cat": "ac",
    "name": "High-performance AC service",
    "base": 3299,
    "hrs": "5 hrs",
    "every": "Every 2 years",
    "inc": [
      [
        "Everything in Regular",
        "1 month"
      ],
      [
        "Cooling coil cleaned, dashboard on",
        "1 month"
      ],
      [
        "Compressor oil top-up",
        ""
      ],
      [
        "AC filter replaced",
        "3 months"
      ]
    ]
  },
  {
    "id": "acgas",
    "cat": "ac",
    "name": "AC gas refill with leak test",
    "base": 1400,
    "hrs": "3 hrs",
    "inc": [
      [
        "Leak test before refilling",
        ""
      ],
      [
        "Full gas refill, weighed",
        "1 month"
      ],
      [
        "Vent temperature, before and after",
        ""
      ]
    ]
  },
  {
    "id": "accoil",
    "cat": "ac",
    "name": "Cooling coil cleaning",
    "base": 2299,
    "hrs": "5 hrs",
    "inc": [
      [
        "Dashboard opened and refitted",
        "1 month"
      ],
      [
        "Cooling coil foam wash",
        "1 month"
      ],
      [
        "Anti-bacterial treatment",
        ""
      ]
    ]
  },
  {
    "id": "condenser",
    "cat": "ac",
    "name": "Condenser cleaning",
    "base": 99,
    "hrs": "30 min",
    "inc": [
      [
        "Condenser fins washed",
        ""
      ],
      [
        "Radiator front cleaned",
        ""
      ]
    ]
  },
  {
    "id": "acfilter",
    "cat": "ac",
    "name": "Cabin AC filter replacement",
    "base": 499,
    "hrs": "30 min",
    "parts": 1,
    "every": "Every 10,000 km",
    "inc": [
      [
        "Cabin filter, new",
        "3 months"
      ],
      [
        "Blower and vents cleaned",
        ""
      ]
    ]
  },
  {
    "id": "coilrep",
    "cat": "ac",
    "name": "Cooling coil replacement",
    "base": 3461,
    "hrs": "6 hrs",
    "parts": 1,
    "inc": [
      [
        "Cooling coil, new",
        "6 months"
      ],
      [
        "Gas refilled after fitting",
        "1 month"
      ]
    ]
  },
  {
    "id": "compressor",
    "cat": "ac",
    "name": "AC compressor replacement",
    "base": 12727,
    "hrs": "1 day",
    "parts": 1,
    "inc": [
      [
        "Compressor, new",
        "6 months"
      ],
      [
        "Compressor oil and gas refilled",
        "1 month"
      ]
    ]
  },
  {
    "id": "condrep",
    "cat": "ac",
    "name": "Condenser replacement",
    "base": 4850,
    "hrs": "5 hrs",
    "parts": 1,
    "inc": [
      [
        "Condenser, new",
        "6 months"
      ],
      [
        "Gas refilled after fitting",
        "1 month"
      ]
    ]
  },
  {
    "id": "blower",
    "cat": "ac",
    "name": "AC blower motor replacement",
    "base": 3600,
    "hrs": "3 hrs",
    "parts": 1,
    "inc": [
      [
        "Blower motor, new",
        "6 months"
      ],
      [
        "All fan speeds tested",
        ""
      ]
    ]
  },
  {
    "id": "valve",
    "cat": "ac",
    "name": "Expansion valve replacement",
    "base": 1600,
    "hrs": "4 hrs",
    "parts": 1,
    "inc": [
      [
        "Expansion valve, new",
        "6 months"
      ],
      [
        "Gas refilled after fitting",
        "1 month"
      ]
    ]
  },
  {
    "id": "bumper",
    "cat": "denting",
    "name": "Front bumper paint",
    "base": 2469,
    "hrs": "2 days",
    "inc": [
      [
        "Dent removal",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ]
    ]
  },
  {
    "id": "rearbumper",
    "cat": "denting",
    "name": "Rear bumper paint",
    "base": 2129,
    "hrs": "2 days",
    "inc": [
      [
        "Dent removal",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ]
    ]
  },
  {
    "id": "bumperrep",
    "cat": "denting",
    "name": "Front bumper replacement",
    "base": 3276,
    "hrs": "2 days",
    "parts": 1,
    "inc": [
      [
        "Bumper, new",
        "6 months"
      ],
      [
        "Painted to match",
        "2 years"
      ]
    ]
  },
  {
    "id": "door",
    "cat": "denting",
    "name": "Door paint (each)",
    "base": 2362,
    "hrs": "2 days",
    "inc": [
      [
        "Dent removal",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ]
    ]
  },
  {
    "id": "fender",
    "cat": "denting",
    "name": "Fender paint (each)",
    "base": 2362,
    "hrs": "2 days",
    "inc": [
      [
        "Dent removal",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ]
    ]
  },
  {
    "id": "quarter",
    "cat": "denting",
    "name": "Quarter panel paint (each)",
    "base": 2362,
    "hrs": "2 days",
    "inc": [
      [
        "Dent removal",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ]
    ]
  },
  {
    "id": "bonnet",
    "cat": "denting",
    "name": "GoodMiles paint",
    "base": 2370,
    "hrs": "2 days",
    "inc": [
      [
        "Dent removal",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ]
    ]
  },
  {
    "id": "boot",
    "cat": "denting",
    "name": "Boot paint",
    "base": 2370,
    "hrs": "2 days",
    "inc": [
      [
        "Dent removal",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ]
    ]
  },
  {
    "id": "runboard",
    "cat": "denting",
    "name": "Running board paint (each)",
    "base": 2244,
    "hrs": "2 days",
    "inc": [
      [
        "Dent removal",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ]
    ]
  },
  {
    "id": "scratch",
    "cat": "denting",
    "name": "Scratch removal (each panel)",
    "base": 1499,
    "hrs": "1 day",
    "inc": [
      [
        "Sanding and touch-up paint",
        "1 year"
      ],
      [
        "Polished to match",
        ""
      ]
    ]
  },
  {
    "id": "alloy",
    "cat": "denting",
    "name": "Alloy wheel paint (each)",
    "base": 1099,
    "hrs": "1 day",
    "inc": [
      [
        "Kerb marks filled",
        ""
      ],
      [
        "Painted and lacquered",
        "1 year"
      ]
    ]
  },
  {
    "id": "fullbody",
    "cat": "denting",
    "name": "Full body paint",
    "base": 27950,
    "hrs": "7 days",
    "inc": [
      [
        "Every panel denting",
        ""
      ],
      [
        "Primer and paint, colour matched",
        "2 years"
      ],
      [
        "Rubbing and polishing",
        ""
      ]
    ]
  },
  {
    "id": "insclaim",
    "cat": "denting",
    "name": "Insurance claim repair",
    "base": 499,
    "hrs": "1 hr",
    "credit": 1,
    "inc": [
      [
        "Damage inspected, photos sent",
        ""
      ],
      [
        "We file the claim and meet the surveyor",
        ""
      ],
      [
        "You pay only what your policy does not cover",
        ""
      ]
    ]
  },
  {
    "id": "jump",
    "cat": "sos",
    "name": "Jump-start",
    "base": 500,
    "hrs": "45 min",
    "inc": [
      [
        "Mechanic comes to your car",
        ""
      ],
      [
        "Jump-start and a battery test",
        ""
      ]
    ]
  },
  {
    "id": "puncture",
    "cat": "sos",
    "name": "Puncture repair",
    "base": 500,
    "hrs": "45 min",
    "inc": [
      [
        "Mechanic comes to your car",
        ""
      ],
      [
        "Tubeless plug repair",
        ""
      ],
      [
        "Pressure set on all tyres",
        ""
      ]
    ]
  },
  {
    "id": "wontstart",
    "cat": "sos",
    "name": "Car won't start",
    "base": 500,
    "hrs": "1 hr",
    "inc": [
      [
        "Mechanic comes to your car",
        ""
      ],
      [
        "Starter, battery and fuel checked",
        ""
      ],
      [
        "Price for the fix before any work",
        ""
      ]
    ]
  },
  {
    "id": "leak",
    "cat": "sos",
    "name": "Fluid leak check",
    "base": 500,
    "hrs": "1 hr",
    "inc": [
      [
        "Mechanic comes to your car",
        ""
      ],
      [
        "Leak traced and photographed",
        ""
      ],
      [
        "Price for the fix before any work",
        ""
      ]
    ]
  },
  {
    "id": "fuel",
    "cat": "sos",
    "name": "Fuel delivery",
    "base": 500,
    "hrs": "1 hr",
    "inc": [
      [
        "Up to 5 litres brought to your car",
        ""
      ],
      [
        "Fuel billed at pump price",
        ""
      ]
    ]
  },
  {
    "id": "towlift",
    "cat": "sos",
    "name": "Towing, wheel-lift, up to 20 km",
    "base": 1000,
    "hrs": "2 hrs",
    "inc": [
      [
        "Wheel-lift tow truck",
        ""
      ],
      [
        "To our bay or any garage you name",
        ""
      ]
    ]
  },
  {
    "id": "towflat",
    "cat": "sos",
    "name": "Towing, flat-bed, up to 20 km",
    "base": 2500,
    "hrs": "2 hrs",
    "inc": [
      [
        "Flat-bed truck, safe for automatics",
        ""
      ],
      [
        "To our bay or any garage you name",
        ""
      ]
    ]
  },
  {
    "id": "pads",
    "cat": "brakes",
    "name": "Front brake pads",
    "base": 1980,
    "hrs": "2 hrs",
    "parts": 1,
    "img": "pads",
    "inc": [
      [
        "Front brake pads, pair",
        "3 months"
      ],
      [
        "Discs cleaned",
        ""
      ],
      [
        "Brake fluid topped up",
        ""
      ]
    ]
  },
  {
    "id": "rearpads",
    "cat": "brakes",
    "name": "Rear brake pads",
    "base": 2750,
    "hrs": "2 hrs",
    "parts": 1,
    "img": "pads",
    "inc": [
      [
        "Rear brake pads, pair",
        "3 months"
      ],
      [
        "Discs cleaned",
        ""
      ]
    ]
  },
  {
    "id": "shoes",
    "cat": "brakes",
    "name": "Rear brake shoes",
    "base": 1979,
    "hrs": "2 hrs",
    "parts": 1,
    "img": "pads",
    "inc": [
      [
        "Rear brake shoes, pair",
        "3 months"
      ],
      [
        "Drums cleaned",
        ""
      ]
    ]
  },
  {
    "id": "discturn",
    "cat": "brakes",
    "name": "Disc turning, pair",
    "base": 699,
    "hrs": "1 hr",
    "inc": [
      [
        "Both front discs machined flat",
        "1 month"
      ],
      [
        "Stops the shudder when braking",
        ""
      ]
    ]
  },
  {
    "id": "disc",
    "cat": "brakes",
    "name": "Front brake discs, pair",
    "base": 1688,
    "hrs": "3 hrs",
    "parts": 1,
    "inc": [
      [
        "Front brake discs, pair",
        "6 months"
      ],
      [
        "Pads refitted and checked",
        ""
      ]
    ]
  },
  {
    "id": "drumturn",
    "cat": "brakes",
    "name": "Drum turning, pair",
    "base": 899,
    "hrs": "1.5 hrs",
    "inc": [
      [
        "Both rear drums machined",
        "1 month"
      ],
      [
        "Shoes adjusted",
        ""
      ]
    ]
  },
  {
    "id": "caliper",
    "cat": "brakes",
    "name": "Caliper pin replacement",
    "base": 585,
    "hrs": "1 hr",
    "parts": 1,
    "inc": [
      [
        "Caliper pins, new",
        "3 months"
      ],
      [
        "Pins greased",
        ""
      ]
    ]
  },
  {
    "id": "caliperkit",
    "cat": "brakes",
    "name": "Caliper repair kit",
    "base": 600,
    "hrs": "2 hrs",
    "parts": 1,
    "inc": [
      [
        "Seals and boots, new",
        "3 months"
      ],
      [
        "Caliper cleaned and greased",
        ""
      ]
    ]
  },
  {
    "id": "brakefluid",
    "cat": "brakes",
    "name": "Brake fluid replacement",
    "base": 900,
    "hrs": "1 hr",
    "parts": 1,
    "every": "Every 2 years",
    "inc": [
      [
        "Brake fluid drained and refilled",
        "1 month"
      ],
      [
        "All four brakes bled",
        ""
      ]
    ]
  },
  {
    "id": "wheelcyl",
    "cat": "brakes",
    "name": "Wheel cylinder replacement",
    "base": 1230,
    "hrs": "2 hrs",
    "parts": 1,
    "inc": [
      [
        "Wheel cylinder, new",
        "3 months"
      ],
      [
        "Brakes bled",
        ""
      ]
    ]
  },
  {
    "id": "freeinsp",
    "cat": "inspection",
    "name": "Free inspection at pickup",
    "base": 0,
    "hrs": "45 min",
    "inc": [
      [
        "50-point check by your Guardian",
        ""
      ],
      [
        "Photos and an estimate on your phone",
        ""
      ],
      [
        "You pay only for what you approve",
        ""
      ]
    ]
  },
  {
    "id": "probcheck",
    "cat": "inspection",
    "name": "Check-up for a problem",
    "base": 499,
    "hrs": "1 hr",
    "credit": 1,
    "inc": [
      [
        "Test drive and a full check of what you noticed",
        ""
      ],
      [
        "Photos and a price for the fix",
        ""
      ],
      [
        "Taken off your bill if you do the repair",
        ""
      ]
    ]
  },
  {
    "id": "scan",
    "cat": "inspection",
    "name": "Computer scan",
    "base": 779,
    "hrs": "45 min",
    "inc": [
      [
        "Engine, ABS and airbag codes read",
        ""
      ],
      [
        "What each code means, in plain words",
        ""
      ]
    ]
  },
  {
    "id": "tripcheck",
    "cat": "inspection",
    "name": "Road trip check",
    "base": 1099,
    "hrs": "1 hr",
    "inc": [
      [
        "Tyres, brakes, lights and fluids",
        ""
      ],
      [
        "Spare tyre and toolkit",
        ""
      ],
      [
        "Report on your phone",
        ""
      ]
    ]
  },
  {
    "id": "usedcar",
    "cat": "inspection",
    "name": "Used car inspection",
    "base": 899,
    "hrs": "2 hrs",
    "inc": [
      [
        "200-point check",
        ""
      ],
      [
        "Accident and flood check",
        ""
      ],
      [
        "Written report you keep",
        ""
      ]
    ]
  },
  {
    "id": "amaron",
    "cat": "battery",
    "name": "Amaron battery, 55-month warranty",
    "base": 4900,
    "hrs": "45 min",
    "inc": [
      [
        "New battery, old one exchanged",
        "55 months"
      ],
      [
        "Fitted at your door",
        ""
      ]
    ]
  },
  {
    "id": "exide",
    "cat": "battery",
    "name": "Exide battery, 48-month warranty",
    "base": 4323,
    "hrs": "45 min",
    "inc": [
      [
        "New battery, old one exchanged",
        "48 months"
      ],
      [
        "Fitted at your door",
        ""
      ]
    ]
  },
  {
    "id": "battcheck",
    "cat": "battery",
    "name": "Battery and charging check",
    "base": 199,
    "hrs": "30 min",
    "every": "Before every winter",
    "inc": [
      [
        "Battery health test",
        ""
      ],
      [
        "Alternator charging test",
        ""
      ],
      [
        "Terminals cleaned and coated",
        ""
      ]
    ]
  },
  {
    "id": "battcharge",
    "cat": "battery",
    "name": "Battery charging",
    "base": 350,
    "hrs": "4 hrs",
    "inc": [
      [
        "Full charge on a bench charger",
        ""
      ],
      [
        "Health test after charging",
        ""
      ]
    ]
  },
  {
    "id": "alternator",
    "cat": "battery",
    "name": "Alternator repair",
    "base": 3780,
    "hrs": "4 hrs",
    "parts": 1,
    "inc": [
      [
        "Alternator rebuilt",
        "3 months"
      ],
      [
        "Charging tested after fitting",
        ""
      ]
    ]
  },
  {
    "id": "starter",
    "cat": "battery",
    "name": "Starter motor repair",
    "base": 2205,
    "hrs": "3 hrs",
    "parts": 1,
    "inc": [
      [
        "Starter motor rebuilt",
        "3 months"
      ],
      [
        "Cold-start test",
        ""
      ]
    ]
  },
  {
    "id": "align",
    "cat": "tyres",
    "name": "Complete wheel care",
    "base": 1349,
    "hrs": "2 hrs",
    "img": "tyre",
    "every": "Every 10,000 km",
    "inc": [
      [
        "3D wheel alignment",
        "1 month"
      ],
      [
        "Balancing, all 4 wheels",
        "1 month"
      ],
      [
        "Tyre rotation",
        ""
      ]
    ]
  },
  {
    "id": "alignonly",
    "cat": "tyres",
    "name": "Wheel alignment",
    "base": 450,
    "hrs": "1 hr",
    "every": "Every 10,000 km",
    "inc": [
      [
        "3D wheel alignment",
        "1 month"
      ],
      [
        "Steering centred",
        ""
      ]
    ]
  },
  {
    "id": "balance",
    "cat": "tyres",
    "name": "Wheel balancing, all 4",
    "base": 495,
    "hrs": "1 hr",
    "inc": [
      [
        "All 4 wheels balanced",
        "1 month"
      ],
      [
        "Weights replaced",
        ""
      ]
    ]
  },
  {
    "id": "rotation",
    "cat": "tyres",
    "name": "Tyre rotation",
    "base": 199,
    "hrs": "30 min",
    "every": "Every 5,000 km",
    "inc": [
      [
        "All four tyres rotated",
        ""
      ],
      [
        "Pressure and tread checked",
        ""
      ]
    ]
  },
  {
    "id": "tyre",
    "cat": "tyres",
    "name": "New tyre, MRF ZLX (each)",
    "base": 5711,
    "hrs": "1 hr",
    "img": "tyre",
    "inc": [
      [
        "Tyre with fitting",
        "5 years, maker"
      ],
      [
        "Balancing",
        ""
      ]
    ]
  },
  {
    "id": "suspcheck",
    "cat": "suspension",
    "name": "Suspension and noise check",
    "base": 499,
    "hrs": "1 hr",
    "credit": 1,
    "inc": [
      [
        "Test drive over bumps",
        ""
      ],
      [
        "Shocks, links and bushes checked",
        ""
      ],
      [
        "Photos and a price for the fix",
        ""
      ]
    ]
  },
  {
    "id": "shocks",
    "cat": "suspension",
    "name": "Front shock absorber (each)",
    "base": 2700,
    "hrs": "3 hrs",
    "parts": 1,
    "inc": [
      [
        "Shock absorber, new",
        "6 months"
      ],
      [
        "Wheel alignment after fitting",
        "1 month"
      ]
    ]
  },
  {
    "id": "rearshocks",
    "cat": "suspension",
    "name": "Rear shock absorber (each)",
    "base": 2401,
    "hrs": "2 hrs",
    "parts": 1,
    "inc": [
      [
        "Shock absorber, new",
        "6 months"
      ],
      [
        "Test drive after fitting",
        ""
      ]
    ]
  },
  {
    "id": "strutmount",
    "cat": "suspension",
    "name": "Shock mount replacement (each)",
    "base": 1080,
    "hrs": "2 hrs",
    "parts": 1,
    "inc": [
      [
        "Mount and bearing, new",
        "6 months"
      ],
      [
        "Noise test drive",
        ""
      ]
    ]
  },
  {
    "id": "links",
    "cat": "suspension",
    "name": "Stabiliser link (each)",
    "base": 980,
    "hrs": "1 hr",
    "parts": 1,
    "inc": [
      [
        "Stabiliser link, new",
        "3 months"
      ],
      [
        "Noise test drive",
        ""
      ]
    ]
  },
  {
    "id": "lowerarm",
    "cat": "suspension",
    "name": "Lower arm replacement (each)",
    "base": 2295,
    "hrs": "2 hrs",
    "parts": 1,
    "inc": [
      [
        "Lower arm with bushes, new",
        "6 months"
      ],
      [
        "Wheel alignment after fitting",
        "1 month"
      ]
    ]
  },
  {
    "id": "tierod",
    "cat": "suspension",
    "name": "Tie rod end (each)",
    "base": 890,
    "hrs": "1 hr",
    "parts": 1,
    "inc": [
      [
        "Tie rod end, new",
        "3 months"
      ],
      [
        "Wheel alignment after fitting",
        "1 month"
      ]
    ]
  },
  {
    "id": "balljoint",
    "cat": "suspension",
    "name": "Ball joint (each)",
    "base": 1300,
    "hrs": "1.5 hrs",
    "parts": 1,
    "inc": [
      [
        "Ball joint, new",
        "3 months"
      ],
      [
        "Noise test drive",
        ""
      ]
    ]
  },
  {
    "id": "rack",
    "cat": "suspension",
    "name": "Steering rack repair",
    "base": 4754,
    "hrs": "1 day",
    "inc": [
      [
        "Rack seals and bushes replaced",
        "6 months"
      ],
      [
        "Wheel alignment after fitting",
        "1 month"
      ]
    ]
  },
  {
    "id": "psteer",
    "cat": "suspension",
    "name": "Power steering service",
    "base": 1561,
    "hrs": "2 hrs",
    "inc": [
      [
        "Steering fluid replaced",
        "1 month"
      ],
      [
        "Pump and hoses checked",
        ""
      ]
    ]
  },
  {
    "id": "bearing",
    "cat": "suspension",
    "name": "Front wheel bearing (each)",
    "base": 1945,
    "hrs": "2 hrs",
    "parts": 1,
    "inc": [
      [
        "Wheel bearing, new",
        "6 months"
      ],
      [
        "Hum test drive",
        ""
      ]
    ]
  },
  {
    "id": "axle",
    "cat": "suspension",
    "name": "Front axle repair",
    "base": 2250,
    "hrs": "4 hrs",
    "inc": [
      [
        "Axle boots and joints repaired",
        "3 months"
      ],
      [
        "Clicking test on full lock",
        ""
      ]
    ]
  },
  {
    "id": "clutchset",
    "cat": "clutch",
    "name": "Clutch set replacement",
    "base": 4350,
    "hrs": "1 day",
    "parts": 1,
    "inc": [
      [
        "Clutch plate, pressure plate and bearing",
        "6 months"
      ],
      [
        "Gear oil top-up",
        ""
      ]
    ]
  },
  {
    "id": "clutchbear",
    "cat": "clutch",
    "name": "Clutch bearing replacement",
    "base": 1200,
    "hrs": "5 hrs",
    "parts": 1,
    "inc": [
      [
        "Release bearing, new",
        "6 months"
      ],
      [
        "Clutch adjusted",
        ""
      ]
    ]
  },
  {
    "id": "clutchover",
    "cat": "clutch",
    "name": "Clutch overhaul",
    "base": 2070,
    "hrs": "1 day",
    "inc": [
      [
        "Clutch taken apart, cleaned and set",
        "3 months"
      ],
      [
        "Worn parts priced before fitting",
        ""
      ]
    ]
  },
  {
    "id": "clutchwire",
    "cat": "clutch",
    "name": "Clutch cable replacement",
    "base": 870,
    "hrs": "1 hr",
    "parts": 1,
    "inc": [
      [
        "Clutch cable, new",
        "3 months"
      ],
      [
        "Pedal play set",
        ""
      ]
    ]
  },
  {
    "id": "clutchcheck",
    "cat": "clutch",
    "name": "Clutch and gearbox check-up",
    "base": 649,
    "hrs": "1 hr",
    "credit": 1,
    "inc": [
      [
        "Test drive and clutch travel check",
        ""
      ],
      [
        "Photos and a price for the fix",
        ""
      ]
    ]
  },
  {
    "id": "gearoil",
    "cat": "clutch",
    "name": "Gear oil replacement",
    "base": 700,
    "hrs": "1 hr",
    "parts": 1,
    "every": "Every 40,000 km",
    "inc": [
      [
        "Gear oil drained and refilled",
        "1 month"
      ],
      [
        "Gear shift checked",
        ""
      ]
    ]
  },
  {
    "id": "flywheel",
    "cat": "clutch",
    "name": "Flywheel turning",
    "base": 945,
    "hrs": "1 hr",
    "inc": [
      [
        "Flywheel machined flat",
        "3 months"
      ],
      [
        "Done with a clutch job",
        ""
      ]
    ]
  },
  {
    "id": "gbmount",
    "cat": "clutch",
    "name": "Gearbox mounting replacement",
    "base": 2200,
    "hrs": "3 hrs",
    "parts": 1,
    "inc": [
      [
        "Gearbox mount, new",
        "6 months"
      ],
      [
        "Vibration test drive",
        ""
      ]
    ]
  },
  {
    "id": "windshield",
    "cat": "glass",
    "name": "Front windshield replacement",
    "base": 5558,
    "hrs": "6 hrs",
    "parts": 1,
    "inc": [
      [
        "Windshield glass",
        "6 months"
      ],
      [
        "Beading and sealant",
        "6 months"
      ]
    ]
  },
  {
    "id": "rearglass",
    "cat": "glass",
    "name": "Rear windshield replacement",
    "base": 3199,
    "hrs": "5 hrs",
    "parts": 1,
    "inc": [
      [
        "Rear glass with demister lines",
        "6 months"
      ],
      [
        "Beading and sealant",
        "6 months"
      ]
    ]
  },
  {
    "id": "doorglass",
    "cat": "glass",
    "name": "Door glass replacement",
    "base": 1167,
    "hrs": "2 hrs",
    "parts": 1,
    "inc": [
      [
        "Door glass, new",
        "6 months"
      ],
      [
        "Window run checked",
        ""
      ]
    ]
  },
  {
    "id": "mirror",
    "cat": "glass",
    "name": "Side mirror replacement",
    "base": 2000,
    "hrs": "1 hr",
    "parts": 1,
    "inc": [
      [
        "Mirror assembly, new",
        "6 months"
      ],
      [
        "Fold and adjust tested",
        ""
      ]
    ]
  },
  {
    "id": "headlamp",
    "cat": "glass",
    "name": "Headlight assembly (each)",
    "base": 3800,
    "hrs": "1.5 hrs",
    "parts": 1,
    "inc": [
      [
        "Headlight unit, new",
        "6 months"
      ],
      [
        "Beam aimed after fitting",
        ""
      ]
    ]
  },
  {
    "id": "taillamp",
    "cat": "glass",
    "name": "Tail light assembly (each)",
    "base": 2400,
    "hrs": "1 hr",
    "parts": 1,
    "inc": [
      [
        "Tail light unit, new",
        "6 months"
      ],
      [
        "Brake and indicator tested",
        ""
      ]
    ]
  },
  {
    "id": "foglamp",
    "cat": "glass",
    "name": "Fog light (each)",
    "base": 1100,
    "hrs": "1 hr",
    "parts": 1,
    "inc": [
      [
        "Fog light unit, new",
        "6 months"
      ],
      [
        "Wiring checked",
        ""
      ]
    ]
  },
  {
    "id": "bulbs",
    "cat": "glass",
    "name": "Headlight bulb (each)",
    "base": 280,
    "hrs": "20 min",
    "parts": 1,
    "inc": [
      [
        "Bulb, new",
        "3 months"
      ],
      [
        "Beam aimed",
        ""
      ]
    ]
  },
  {
    "id": "wipers",
    "cat": "glass",
    "name": "Wiper blades, pair",
    "base": 425,
    "hrs": "15 min",
    "parts": 1,
    "every": "Every year",
    "inc": [
      [
        "Wiper blades, pair",
        "3 months"
      ],
      [
        "Washer fluid top-up",
        ""
      ]
    ]
  },
  {
    "id": "radiator",
    "cat": "engine",
    "name": "Radiator replacement",
    "base": 3600,
    "hrs": "4 hrs",
    "parts": 1,
    "inc": [
      [
        "Radiator, new",
        "6 months"
      ],
      [
        "Coolant refilled",
        "1 month"
      ]
    ]
  },
  {
    "id": "fanmotor",
    "cat": "engine",
    "name": "Radiator fan motor replacement",
    "base": 4100,
    "hrs": "3 hrs",
    "parts": 1,
    "inc": [
      [
        "Fan motor, new",
        "6 months"
      ],
      [
        "Fan switch-on temperature tested",
        ""
      ]
    ]
  },
  {
    "id": "vbelt",
    "cat": "engine",
    "name": "Drive belt replacement",
    "base": 1229,
    "hrs": "1.5 hrs",
    "parts": 1,
    "every": "Every 40,000 km",
    "inc": [
      [
        "Drive belt, new",
        "6 months"
      ],
      [
        "Tension set",
        ""
      ]
    ]
  },
  {
    "id": "enginemount",
    "cat": "engine",
    "name": "Engine mounting replacement",
    "base": 2377,
    "hrs": "3 hrs",
    "parts": 1,
    "inc": [
      [
        "Engine mount, new",
        "6 months"
      ],
      [
        "Vibration test drive",
        ""
      ]
    ]
  },
  {
    "id": "wiring",
    "cat": "engine",
    "name": "Wiring repair",
    "base": 1200,
    "hrs": "3 hrs",
    "inc": [
      [
        "Fault traced and wiring repaired",
        "3 months"
      ],
      [
        "Photos of the fix",
        ""
      ]
    ]
  },
  {
    "id": "pwindow",
    "cat": "engine",
    "name": "Power window repair",
    "base": 1099,
    "hrs": "2 hrs",
    "inc": [
      [
        "Motor or regulator repaired",
        "3 months"
      ],
      [
        "Window tested up and down",
        ""
      ]
    ]
  },
  {
    "id": "horn",
    "cat": "engine",
    "name": "Horn replacement",
    "base": 699,
    "hrs": "30 min",
    "parts": 1,
    "inc": [
      [
        "Horn, new",
        "6 months"
      ],
      [
        "Relay checked",
        ""
      ]
    ]
  },
  {
    "id": "elecheck",
    "cat": "engine",
    "name": "Electrical check-up",
    "base": 499,
    "hrs": "1 hr",
    "credit": 1,
    "inc": [
      [
        "Lights, windows, horn and charging tested",
        ""
      ],
      [
        "Photos and a price for the fix",
        ""
      ]
    ]
  }
] as unknown as readonly Service[];

/** Jobs commonly added alongside each category. */
export const ADDONS: Record<string, string[]> = {
  "periodic": [
    "pads",
    "wipers",
    "acfilter",
    "foam"
  ],
  "ac": [
    "standard",
    "foam",
    "coolant"
  ],
  "brakes": [
    "align",
    "suspcheck",
    "standard"
  ],
  "battery": [
    "jump",
    "standard",
    "scan"
  ],
  "tyres": [
    "puncture",
    "suspcheck",
    "standard"
  ],
  "spa": [
    "standard",
    "acreg",
    "wipers"
  ],
  "denting": [
    "rubbing",
    "foam",
    "headlight"
  ],
  "inspection": [
    "standard",
    "foam",
    "acreg"
  ],
  "clutch": [
    "standard",
    "align",
    "enginemount"
  ],
  "glass": [
    "headlight",
    "foam",
    "rubbing"
  ],
  "suspension": [
    "align",
    "pads",
    "standard"
  ],
  "sos": [
    "battcheck",
    "amaron",
    "tyre",
    "freeinsp"
  ],
  "engine": [
    "coolant",
    "standard",
    "scan"
  ]
};

/** What each category explicitly does not cover. */
export const EXCLUSIONS: Record<string, string[]> = {
  "periodic": [
    "Parts or repairs not listed above. If we find any, you get a photo and a price first.",
    "Body, dent or paint work"
  ],
  "ac": [
    "Parts not listed above. If the check finds any, you get a photo and a price first.",
    "Gas beyond 400 g, only if you approve it"
  ],
  "brakes": [
    "Disc or drum skimming, only if you approve it after inspection",
    "Brake booster or ABS repair"
  ],
  "battery": [
    "Wiring repair",
    "Batteries other than the one shown"
  ],
  "tyres": [
    "Sidewall puncture repair",
    "Rim repair or replacement"
  ],
  "spa": [
    "Paint correction beyond light swirl marks",
    "Stain or odour from leaks inside the car"
  ],
  "denting": [
    "Panels other than the one booked",
    "Rust treatment beyond surface rust"
  ],
  "inspection": [
    "Repairs. You get a report and prices, and decide later.",
    "Highway road test"
  ],
  "clutch": [
    "Flywheel replacement, only if you approve it",
    "Gearbox repair"
  ],
  "glass": [
    "Rain sensor or camera recalibration",
    "Wiring behind the light unit"
  ],
  "suspension": [
    "Parts beyond the one booked. If we find any, you get a photo and a price first.",
    "Wheel alignment, unless listed"
  ],
  "sos": [
    "Parts, fuel or the repair itself. You get a price before any work.",
    "Towing beyond 20 km, charged per km only if you approve it"
  ],
  "engine": [
    "Engine overhaul or head work",
    "Parts beyond the one booked, only if you approve them"
  ]
};

/** [rating, number of ratings] per service. */
export const RATINGS: Record<string, [number, number]> = {
  "standard": [
    4.8,
    21400
  ],
  "basic": [
    4.7,
    8900
  ],
  "comprehensive": [
    4.8,
    6200
  ],
  "oil": [
    4.7,
    5100
  ],
  "acreg": [
    4.8,
    12600
  ],
  "accoil": [
    4.7,
    2300
  ],
  "pads": [
    4.8,
    7400
  ],
  "shoes": [
    4.7,
    2100
  ],
  "amaron": [
    4.9,
    4800
  ],
  "exide": [
    4.8,
    3100
  ],
  "align": [
    4.8,
    9800
  ],
  "tyre": [
    4.7,
    1900
  ],
  "foam": [
    4.8,
    15200
  ],
  "deep": [
    4.7,
    3600
  ],
  "bumper": [
    4.7,
    2800
  ],
  "door": [
    4.6,
    1700
  ],
  "freeinsp": [
    4.9,
    18300
  ],
  "usedcar": [
    4.8,
    1200
  ],
  "clutchset": [
    4.7,
    900
  ],
  "shocks": [
    4.7,
    1100
  ],
  "windshield": [
    4.7,
    800
  ],
  "headlight": [
    4.8,
    2400
  ]
};

export const serviceById = (id: string): Service | undefined =>
  SERVICES.find(s => s.id === id);

export const categoryById = (id: string): Category | undefined =>
  CATEGORIES.find(c => c.id === id);

export const servicesInCategory = (cat: string): Service[] =>
  SERVICES.filter(s => s.cat === cat);
