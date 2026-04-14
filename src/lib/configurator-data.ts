export type BrandKey =
  | "webasto"
  | "espar"
  | "victron"
  | "dometic"
  | "mabru"
  | "starlink"
  | "xantrex";

export type Phase = 1 | 2 | 3;

export type Option = {
  label: string;
  note: string;
  price: number;
  brand?: BrandKey;
  recommended?: boolean;
};

export type Step = {
  id: string;
  jennyChoice: boolean;
  section: string;
  question: string;
  context: string;
  options: Option[];
};

export type Selection = {
  idx: number;
  phase: Phase;
};

export const BRANDS: Record<BrandKey, string> = {
  webasto: "Webasto",
  espar: "Espar",
  victron: "Victron",
  dometic: "Dometic",
  mabru: "Mabru",
  starlink: "Starlink",
  xantrex: "Xantrex",
};

export const STEPS: Step[] = [
  {
    id: "heat",
    jennyChoice: true,
    section: "Your Comfort",
    question: "How quiet does the heater need to be?",
    context:
      "The van runs on diesel from its own fuel tank - no propane, no propane smell, no generator. This is what keeps you warm for 9 months of the year in Oregon and Washington.",
    options: [
      {
        label: "Webasto - reliable workhorse",
        brand: "webasto",
        note: "A proven heater used in vans worldwide. Warm and reliable in any weather.",
        price: 1350,
      },
      {
        label: "Espar - near silent",
        brand: "espar",
        note: "So quiet a client sitting across from you won't notice it's running. Our pick for a counseling space.",
        price: 1600,
        recommended: true,
      },
      {
        label: "Webasto - high output",
        brand: "webasto",
        note: "Twice the heating power. Good for very cold working locations.",
        price: 2100,
      },
      {
        label: "Espar - high output, near silent",
        brand: "espar",
        note: "Maximum heat with almost no noise. The best of both.",
        price: 2200,
      },
      {
        label: "Espar - high output + extra quiet",
        brand: "espar",
        note: "Same powerful Espar with an added muffler for the absolute lowest noise.",
        price: 2350,
      },
    ],
  },
  {
    id: "ac",
    jennyChoice: true,
    section: "Your Comfort",
    question: "What kind of air conditioning works for you?",
    context:
      "You mentioned using it 4-6 hours on summer days east of the Cascades. All the battery-powered options run off the van's own batteries - no plugging in required.",
    options: [
      {
        label: "Standard rooftop - needs power hookup",
        note: "Lower upfront cost. Works great whenever you're parked somewhere with an outlet.",
        price: 720,
      },
      {
        label: "Velit - runs off the van battery",
        note: "Cool the van without plugging in anywhere. Has an airflow-only mode for lighter days. Best value for your use.",
        price: 1829,
        recommended: true,
      },
      {
        label: "Dometic - most field-tested",
        brand: "dometic",
        note: "The most proven battery-powered AC available. Longest runtime per charge of any competitor.",
        price: 2700,
      },
      {
        label: "Mabru - most powerful + quietest",
        brand: "mabru",
        note: "The quietest AC unit made. Nearly double the cooling power. Best for regular summer use east of the Cascades.",
        price: 2599,
      },
      {
        label: "Nomadic Cooling - battery powered",
        note: "Runs off battery with an airflow-only mode option.",
        price: 3100,
      },
      {
        label: "Cruise N Comfort - split system",
        note: "The compressor lives outside the van entirely. Zero mechanical noise inside during sessions. The premium option.",
        price: 3800,
      },
    ],
  },
  {
    id: "fan",
    jennyChoice: true,
    section: "Your Comfort",
    question: "How quiet does the roof fan need to be?",
    context:
      "The fan runs year-round in the Pacific Northwest for fresh air and moisture control - even in winter. It matters that it can close automatically when it rains.",
    options: [
      {
        label: "MaxxAir - standard",
        note: "Reliable and simple. Opens, closes, moves air.",
        price: 220,
      },
      {
        label: "MaxxAir 6200K - 10 speed",
        note: "Very quiet on its lowest settings. Can run while it's raining without closing. Best value.",
        price: 275,
        recommended: true,
      },
      {
        label: "Fantastic Fan 7350 - 14 speed",
        note: "14 speeds so you can turn it down almost silent. Closes automatically when it rains.",
        price: 330,
      },
      {
        label: "AirPlus Deluxe - brushless motor",
        note: "The quietest fan available. Stays silent even as it ages - no rattle, ever. Has a built-in blackout shade. Closes in rain.",
        price: 360,
        recommended: true,
      },
      {
        label: "Dual fan setup",
        note: "One fan silently exhausting, one pulling fresh air in. Maximum airflow without running the AC.",
        price: 780,
      },
    ],
  },
  {
    id: "net",
    jennyChoice: true,
    section: "Staying Connected",
    question: "How reliable does your internet need to be?",
    context:
      "You're doing counseling in rural Oregon and Washington. Cell coverage is unreliable or nonexistent in many of those areas. This is your connection to clients and video sessions.",
    options: [
      {
        label: "Cell signal booster",
        note: "Amplifies existing coverage. Helps in weak signal areas but can't help where there's no signal at all.",
        price: 500,
      },
      {
        label: "Starlink - set up at each location",
        brand: "starlink",
        note: "True satellite internet. Set up in 30 seconds wherever you park. Works in areas with zero cell coverage. $120/month.",
        price: 650,
        recommended: true,
      },
      {
        label: "Starlink - always mounted, always ready",
        brand: "starlink",
        note: "Permanently on the roof. Connects the moment you park - no setup at all.",
        price: 820,
        recommended: true,
      },
      {
        label: "Starlink - works while driving",
        brand: "starlink",
        note: "Stays connected even while moving. Most capable option.",
        price: 2700,
      },
    ],
  },
  {
    id: "safe",
    jennyChoice: true,
    section: "Staying Connected",
    question: "What safety monitoring do you want?",
    context:
      "You'll often be working alone in a sealed van in remote areas. The air quality monitor is the one most people don't think about - CO2 builds up gradually in a small sealed space and affects focus before anyone notices.",
    options: [
      {
        label: "Basic detectors",
        note: "Carbon monoxide and smoke. Required with the diesel heater.",
        price: 50,
      },
      {
        label: "Detectors + air quality monitor",
        note: "Adds a live readout of air quality. Important for working in a sealed space with a client over long sessions.",
        price: 90,
        recommended: true,
      },
      {
        label: "Full safety suite",
        note: "Detectors, air quality monitor, and a fire extinguisher.",
        price: 170,
      },
      {
        label: "Full suite + first aid kit",
        note: "Everything above plus a first aid kit and roadside emergency supplies for solo work in remote areas.",
        price: 370,
      },
    ],
  },
  {
    id: "win",
    jennyChoice: true,
    section: "Windows",
    question: "How much natural light do you want?",
    context:
      "Options 1-4 add 2 windows - one per side. Options 5 and 6 add rear quarter windows too for a fully windowed van.",
    options: [
      {
        label: "2 windows - standard tinted",
        note: "One per side. Good light and air.",
        price: 300,
      },
      {
        label: "2 windows - factory-style fit",
        note: "Looks like it came from the factory. Tinted with a bug screen.",
        price: 480,
      },
      {
        label: "2 windows - all-glass modern look",
        note: "Clean frameless appearance. Tinted with screen. Our recommendation.",
        price: 580,
        recommended: true,
      },
      {
        label: "2 side + 2 rear awning windows",
        note: "Adds rear windows that ventilate even in light rain.",
        price: 980,
      },
      {
        label: "4 windows - full van",
        note: "Windows on both sides and the rear quarters.",
        price: 1160,
      },
      {
        label: "4 windows - premium European",
        note: "The best windows available - superior seals and hardware built to last.",
        price: 1800,
      },
    ],
  },
  {
    id: "bat",
    jennyChoice: false,
    section: "Power System",
    question: "How long do you need to run everything without plugging in?",
    context:
      "This is what determines how many hours you can run the AC, keep the internet going, and charge your laptop - all without finding an outlet.",
    options: [
      {
        label: "400Ah - covers a few hours",
        note: "Enough for a few hours of AC plus regular daily use.",
        price: 900,
      },
      {
        label: "600Ah - right-sized for this build",
        note: "Handles a full day of AC, internet, and your laptop without ever needing to plug in.",
        price: 1600,
        recommended: true,
      },
      {
        label: "800Ah - maximum capacity",
        note: "Best for full summer days east of the Cascades when the AC runs all day.",
        price: 1800,
      },
    ],
  },
  {
    id: "inv",
    jennyChoice: false,
    section: "Power System",
    question: "What do you need to plug in?",
    context:
      "Everything else in the van (the AC, heater, fan, lights) runs on the van's battery directly. This is just for your laptop and anything you plug into a standard outlet.",
    options: [
      {
        label: "No standard outlets",
        note: "Laptop charges from a 12V car adapter. Simplest and quietest.",
        price: 0,
      },
      {
        label: "Xantrex 1000W - right-sized",
        brand: "xantrex",
        note: "Handles a laptop and a few devices. Automatically switches to wall power when available. Same brand as the Hitch Up AZ RV fleet.",
        price: 320,
        recommended: true,
      },
      {
        label: "Victron Phoenix - completely silent",
        brand: "victron",
        note: "Zero noise at any load, ever. Best if silence during sessions is the priority.",
        price: 260,
        recommended: true,
      },
      {
        label: "Xantrex 2000W - more headroom",
        brand: "xantrex",
        note: "More capacity for multiple devices at once.",
        price: 480,
      },
      {
        label: "Xantrex XC 2000 - with battery charging",
        brand: "xantrex",
        note: "Inverter plus the ability to recharge the batteries from a wall outlet.",
        price: 700,
      },
      {
        label: "Victron MultiPlus - full system",
        brand: "victron",
        note: "Powers outlets and charges batteries from a wall outlet or generator.",
        price: 800,
      },
    ],
  },
  {
    id: "solar",
    jennyChoice: false,
    section: "Power System",
    question: "How self-sufficient do you want to be between sessions?",
    context:
      "Solar panels on the roof recharge the batteries while you're parked. On a good sunny day in eastern Oregon, two panels can recover most of a full day of AC use.",
    options: [
      {
        label: "Pre-wire only - panels added later",
        note: "We run all the wiring now so panels can be added any time with zero extra labor.",
        price: 120,
        recommended: true,
      },
      {
        label: "One panel - tops up on sunny days",
        note: "Good for light daily loads and phones.",
        price: 280,
      },
      {
        label: "Two panels - covers daily use including AC",
        note: "Recovers most of a full day of AC use in summer sun. Our pick.",
        price: 750,
        recommended: true,
      },
      {
        label: "Maximum - near self-sufficient",
        note: "Full roof coverage. Near net-zero on sunny days even with AC running all day.",
        price: 1150,
      },
    ],
  },
  {
    id: "shore",
    jennyChoice: false,
    section: "Power System",
    question: "How do you want the batteries recharged?",
    context:
      "The batteries charge from three sources: driving, solar, and plugging into a wall. This covers the driving charger and the wall hookup. Note: this is separate from the outlet inverter above.",
    options: [
      {
        label: "Standard - shore power + driving charge",
        note: "Charges when you plug in and while you drive. Gets the job done.",
        price: 320,
      },
      {
        label: "Premium - silent driving charger + shore",
        brand: "victron",
        note: "Upgraded alternator charger with no fan noise. Charges faster from both driving and shore power. Our recommendation.",
        price: 520,
        recommended: true,
      },
      {
        label: "Premium + battery percentage display",
        brand: "victron",
        note: "Everything above plus a display showing your exact battery level at all times.",
        price: 660,
      },
    ],
  },
  {
    id: "panel",
    jennyChoice: false,
    section: "Power System",
    question: "How do you want to control everything?",
    context:
      "This is the panel on the wall where you turn things on and off. The labeled switch panel means you can clearly see and control every circuit - fan, AC, lights - without guessing.",
    options: [
      {
        label: "Basic fuse block",
        note: "Hidden fuses with no switches. Everything runs all the time.",
        price: 80,
      },
      {
        label: "Blue Sea - labeled switches",
        note: "Six labeled rocker switches on the wall. Fan, AC, lights - each has its own clearly labeled switch. Clean and easy to use daily.",
        price: 180,
        recommended: true,
      },
      {
        label: "Blue Sea - full control panel",
        note: "A switch for every circuit. The most complete setup for a professional daily-use vehicle.",
        price: 260,
      },
    ],
  },
  {
    id: "dead",
    jennyChoice: false,
    section: "Acoustic Foundation",
    question: "How thorough should the soundproofing be?",
    context:
      "This is the first layer installed on bare metal - before anything else. It converts vibration into silence. The roof matters especially in Oregon and Washington where it rains constantly.",
    options: [
      {
        label: "Floor and wheel wells only",
        note: "The loudest panels covered. Minimum coverage.",
        price: 380,
      },
      {
        label: "Full van - Hushmat everywhere",
        note: "Every accessible panel. The van goes from a resonating tin box to something solid and quiet.",
        price: 680,
        recommended: true,
      },
      {
        label: "Full van + double layer on roof",
        note: "Everything above, plus a second layer on the roof specifically. Rain on an unlined van roof is extremely loud.",
        price: 820,
        recommended: true,
      },
    ],
  },
  {
    id: "ins",
    jennyChoice: false,
    section: "Acoustic Foundation",
    question: "How thoroughly should we insulate?",
    context:
      "Closed-cell spray foam fills every gap and crack and creates a complete moisture barrier - critical in the Pacific Northwest where condensation causes hidden rust over time. Rapp applies it in careful layers.",
    options: [
      {
        label: "Spray foam - standard coverage",
        note: "Every gap and void filled. Complete moisture barrier throughout.",
        price: 480,
        recommended: true,
      },
      {
        label: "Spray foam - maximum thickness",
        note: "Multiple passes to maximize depth everywhere. Best possible thermal and sound performance.",
        price: 680,
        recommended: true,
      },
    ],
  },
];
