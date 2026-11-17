/**
 * The service day, stage by stage: [title, detail, screen the customer
 * can open]. `stage` on the order indexes into this.
 */
export const STAGES = [
  [
    "Booking confirmed",
    "Pickup slot reserved",
    null
  ],
  [
    "Guardian assigned",
    "Amit Sharma will handle your car",
    "guardian"
  ],
  [
    "Car picked up",
    "8 photos recorded and signed off",
    "carphotos"
  ],
  [
    "Estimate ready",
    "Approve the work you want",
    "estimate"
  ],
  [
    "Work in progress",
    "Before and after photos for every job",
    "work"
  ],
  [
    "Work done",
    "Every approved job, with its photos",
    "work"
  ],
  [
    "Out for delivery",
    "Your car is on its way back",
    "pickup"
  ],
  [
    "Delivered",
    "Photos from the same angles, plus your old parts",
    "delivery"
  ],
  [
    "Paid",
    "Your bill matches what you approved",
    "bill"
  ],
  [
    "Service recorded",
    "Added to your health passport",
    "passport"
  ]
] as unknown as [
  string,
  string,
  string | null,
][];

export const STAGE_COUNT = STAGES.length;
