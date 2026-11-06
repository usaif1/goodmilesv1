/**
 * Copy shown to customers, from the reference prototype. Generated.
 */

/** Questions shown on every service. */
export const FAQ_ALL: [string, string][] = [
  [
    "Is the price final?",
    "Yes, for the jobs you book. If we find anything else, you get photos and a price on your phone, and we do it only if you approve."
  ],
  [
    "What if something goes wrong after the service?",
    "Every job has the warranty shown above. Tap \"Something not right?\" in the app and we pick the car up free to check."
  ],
  [
    "Who will handle my car?",
    "One Guardian handles your car from pickup to delivery. Every Guardian is background-checked and trained by GoodMiles."
  ],
  [
    "Can I cancel?",
    "Yes, free until the inspection starts."
  ]
];

/** One extra question per category. */
export const FAQ_BY_CATEGORY: Record<string, [string, string]> = {
  "periodic": [
    "Which engine oil do you use?",
    "The grade your carmaker recommends, from a sealed can that we open on camera."
  ],
  "ac": [
    "How will I know the AC is fixed?",
    "We measure the vent temperature before and after, and send you both readings. The AC check-up fee comes off your bill if you go ahead with the fix."
  ],
  "brakes": [
    "How do you decide the pads need changing?",
    "We measure them. Under 3 mm needs replacing, and you get the photo with the reading."
  ],
  "battery": [
    "What happens to my old battery?",
    "We take it in exchange. That is already in the price."
  ],
  "tyres": [
    "Do you balance the new tyres?",
    "Yes. Balancing is included, and we check alignment if the car pulls to one side."
  ],
  "spa": [
    "Do I need to be at home?",
    "No. We pick the car up, clean it in our bay and bring it back."
  ],
  "denting": [
    "Will the colour match?",
    "We match it with a colour scanner and show you a sample before painting."
  ],
  "inspection": [
    "Do I have to book the repairs?",
    "No. You get the report and the prices, and decide later."
  ],
  "clutch": [
    "How do you know the clutch needs replacing?",
    "Amit test-drives the car, checks the clutch travel and shows you what he found first."
  ],
  "glass": [
    "Is there a waiting time after a new windshield?",
    "Yes. The sealant needs a few hours, so the car comes back the same evening."
  ],
  "suspension": [
    "How do you find a noise?",
    "Amit drives over the bumps where you hear it, then checks every link and bush. You get the photo of the worn part and a price before any work."
  ],
  "sos": [
    "Do you come to where my car is?",
    "Yes. A mechanic comes to your car in Noida. If it cannot be fixed there, we tow it to our bay, at the price shown."
  ],
  "engine": [
    "Can you find an electrical fault?",
    "Yes. We trace it with a meter, send you a photo of the fault and a price, and fix it only if you approve."
  ]
};

/** Help centre topics: [icon, title, [question, answer][]]. */
export const HELP_TOPICS = [
  [
    "live",
    "Bookings and pickup",
    [
      [
        "How do I change my pickup time?",
        "Message Amit on WhatsApp or tap Help in 2 minutes. Changes are free until the driver leaves for your address."
      ],
      [
        "Can someone else hand over the car?",
        "Yes. Share the handover code with them. The driver takes the keys only with that code."
      ],
      [
        "What if I am late for pickup?",
        "The driver waits 15 minutes, then Amit calls you to choose a new time."
      ]
    ]
  ],
  [
    "coin",
    "Payments and refunds",
    [
      [
        "When do I pay?",
        "Pay at booking and save ₹59, or pay after the estimate or at delivery."
      ],
      [
        "How long do refunds take?",
        "3 to 5 working days, to the way you paid."
      ],
      [
        "Can I pay cash?",
        "Yes, to the driver at delivery."
      ]
    ]
  ],
  [
    "shield",
    "Warranty and claims",
    [
      [
        "How do I claim warranty?",
        "Tap \"Something not right?\" in My Garage. We pick the car up free and check it."
      ],
      [
        "What does the warranty cover?",
        "Labour for 30 days, and each part for the period on your warranty card."
      ]
    ]
  ],
  [
    "doc",
    "Prices and estimates",
    [
      [
        "Can my bill be higher than my booking?",
        "Only if you approve extra work. Each extra job comes with photos and a price, and you choose."
      ],
      [
        "Do prices change by time or day?",
        "No. The same price at every time. Only express pickup costs extra."
      ]
    ]
  ],
  [
    "user",
    "Crew and safety",
    [
      [
        "Who handles my car?",
        "One Guardian, from pickup to delivery. Every Guardian is verified and trained by GoodMiles."
      ],
      [
        "What if my car gets damaged with you?",
        "Any damage in our care, we repair at our cost. We decide within 48 hours, with the pickup photos as the record."
      ]
    ]
  ],
  [
    "gift",
    "Coins and referrals",
    [
      [
        "How do coins work?",
        "You get coins after each service. Use them for up to 10% of a bill."
      ],
      [
        "When do I get my referral reward?",
        "When your friend completes their first service, you both get ₹500."
      ]
    ]
  ]
] as unknown as [
  string,
  string,
  [string, string][],
][];

/** [name, car and area, stars, quote, photo key]. */
export const REVIEWS = [
  [
    "Neha Kapoor",
    "Baleno · Sector 50, Noida",
    5,
    "Amit sent photos of the worn pads before changing them. The bill matched the estimate to the rupee.",
    "P6-customer-1"
  ],
  [
    "Arjun Malhotra",
    "Creta · DLF Phase 2, Gurugram",
    5,
    "Picked up at 9, back by 6 with the old oil filter in a labelled box. No surprises.",
    "P6-customer-2"
  ],
  [
    "Priya Sharma",
    "Swift · Dwarka, Delhi",
    4,
    "Clear updates on WhatsApp all day. Delivery was 20 minutes late, but they called ahead.",
    "P6-customer-3"
  ],
  [
    "Vikram Singh",
    "Nexon · Indirapuram, Ghaziabad",
    5,
    "I approved two of the four extra jobs and skipped the rest. Nobody pushed me.",
    "P6-customer-4"
  ],
  [
    "Sunita Arora",
    "i20 · Sector 15, Faridabad",
    5,
    "The AC was blowing 16°C before and 7°C after. They sent both readings.",
    "P6-customer-5"
  ],
  [
    "Karan Bansal",
    "City · Vaishali, Ghaziabad",
    5,
    "Express pickup came in 50 minutes. The car was back the same evening.",
    "P6-customer-6"
  ]
] as unknown as [
  string,
  string,
  number,
  string,
  string,
][];

/** Safety promises: [icon, title, detail]. */
export const SAFETY = [
  [
    "shield",
    "Every Guardian is checked",
    "ID and address checks before anyone handles a customer car."
  ],
  [
    "doc",
    "Trained by GoodMiles",
    "On our checklists, then supervised jobs before working alone."
  ],
  [
    "camera",
    "The same photos, twice",
    "8 photos at pickup and the same 8 at delivery, so you can compare."
  ],
  [
    "car",
    "Any damage, we repair it",
    "If anything happens to your car in our care, we repair it at our cost, decided within 48 hours."
  ],
  [
    "clock",
    "Warranty on every job",
    "Labour for 30 days, and parts as shown on each service."
  ]
] as unknown as [string, string, string][];

/** Symptoms a customer can report, and what we check for each. */
export const SYMPTOM_CHECKS: Record<string, string> = {
  "Noise when braking": "the brake pads and discs",
  "AC weak": "the AC gas, filter and cooling coil",
  "Warning light": "the warning light with a scanner",
  "Vibration": "wheel balance and engine mounts",
  "Pulls to one side": "alignment and tyre pressure",
  "Hard to start": "the battery and starter",
  "Smell or smoke": "for leaks and overheating",
  "Leak": "under the car for the source of the leak",
  "Gear hard": "the clutch and gear linkage"
};

/** What the inspection found, for the symptoms the sample day covers. */
export const SYMPTOM_FINDINGS: Record<string, string> = {
  "Noise when braking": "Found: front brake pads at 2 mm",
  "AC weak": "Found: dirty cooling coil, vent air at 15°C",
  "Pulls to one side": "Found: alignment off, pulls left at 60 km/h"
};
