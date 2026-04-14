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
  recommendation?: "pick" | "value" | "upgrade";
};

export type Step = {
  id: string;
  jennyChoice: boolean;
  label: string;
  section: string;
  question: string;
  callout: string;
  context: string;
  critical?: boolean;
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
    label: "Heating",
    section: "Your Experience",
    critical: true,
    question: "Which heater do you want?",
    callout:
      "For a counseling van, we recommend the Espar. It runs nearly silent - a client sitting across from you won't notice it.",
    context:
      "Runs off the van's own diesel tank. No propane, no generator. This is what keeps you warm for 9 months a year in Oregon and Washington.",
    options: [
      {
        label: "Webasto Air Top 2000",
        brand: "webasto",
        note: "The industry standard. Proven, well-supported, warm. The safe dependable choice.",
        price: 1350,
        recommendation: "value",
      },
      {
        label: "Espar Airtronic - near silent",
        brand: "espar",
        note: "Brushless motor runs up to 90% quieter than Webasto. The right heater for a counseling space.",
        price: 1600,
        recommendation: "pick",
      },
      {
        label: "Espar - high output + near silent",
        brand: "espar",
        note: "Twice the heat with the same near-silent brushless motor. Best for very cold locations.",
        price: 2200,
        recommendation: "upgrade",
      },
    ],
  },
  {
    id: "ac",
    jennyChoice: true,
    label: "Air Conditioning",
    section: "Your Experience",
    critical: true,
    question: "Which AC unit do you want?",
    callout:
      "For your budget and Pacific Northwest use, Velit is the right starting point. If you want the most proven option money can buy, step up to Dometic.",
    context:
      "All battery-powered options run off the van's batteries - no plugging in required. The heater handles all heating separately.",
    options: [
      {
        label: "Velit 2000R - 12V battery powered",
        note: "Best value 12V rooftop AC. Easiest install. Has a fan-only mode for mild days. Right-sized for your use.",
        price: 1829,
        recommendation: "value",
      },
      {
        label: "Dometic RTX 2000 - 12V battery powered",
        brand: "dometic",
        note: "Most proven premium 12V rooftop AC. 10+ years of field use. Best choice if you want the safest established option.",
        price: 2700,
        recommendation: "pick",
      },
      {
        label: "Mabru 12000 - 12V battery powered",
        brand: "mabru",
        note: "Best for hotter climates. Among the quietest and most powerful 12V options available. Best if you work regularly east of the Cascades in summer.",
        price: 2599,
        recommendation: "upgrade",
      },
      {
        label: "Cruise N Comfort - split system",
        note: "The compressor mounts outside the van entirely. Zero mechanical noise inside during sessions. The quietest possible path.",
        price: 3800,
        recommendation: "upgrade",
      },
    ],
  },
  {
    id: "fan",
    jennyChoice: true,
    label: "Roof Fan",
    section: "Your Experience",
    question: "Which roof fan do you want?",
    callout:
      "We recommend the AirPlus. It's the quietest fan available and the brushless motor means it will never develop a rattle over time.",
    context:
      "Runs year-round in the Pacific Northwest for fresh air and moisture control. Closes automatically when it rains.",
    options: [
      {
        label: "MaxxAir 6200K - 10 speed",
        note: "Solid and quiet at low settings. Can run in rain without closing. Best value option.",
        price: 275,
        recommendation: "value",
      },
      {
        label: "Fantastic Fan 7350 - 14 speed",
        note: "14 speeds for precise quiet control. Closes automatically in rain.",
        price: 330,
      },
      {
        label: "AirPlus Deluxe - brushless",
        note: "Quietest fan available. Brushless motor stays silent even as it ages. Built-in blackout shade. Closes in rain.",
        price: 360,
        recommendation: "pick",
      },
    ],
  },
  {
    id: "net",
    jennyChoice: true,
    label: "Internet",
    section: "Staying Connected",
    critical: true,
    question: "How do you want to handle internet?",
    callout:
      "For rural Oregon and Washington counseling work, we recommend Starlink. Cell coverage fails in many of those areas - Starlink works everywhere.",
    context:
      "You'll be doing video sessions in areas where cell coverage is often nonexistent. Your internet is your connection to clients.",
    options: [
      {
        label: "Cell signal booster",
        note: "Amplifies existing coverage. Helps in weak signal areas but can't help where there's no signal at all.",
        price: 500,
      },
      {
        label: "Starlink - portable tripod setup",
        brand: "starlink",
        note: "Set up in 30 seconds wherever you park. True satellite coverage in rural areas with no cell signal. $120/month.",
        price: 650,
        recommendation: "value",
      },
      {
        label: "Starlink - always mounted on roof",
        brand: "starlink",
        note: "Permanently mounted. Connects the moment you park - zero setup ever.",
        price: 820,
        recommendation: "pick",
      },
    ],
  },
  {
    id: "safe",
    jennyChoice: true,
    label: "Safety + Air Quality",
    section: "Staying Connected",
    question: "What safety setup do you want?",
    callout:
      "At minimum, get the CO2 monitor. Air quality degrades quickly with two people in a sealed van and affects focus before you notice it.",
    context:
      "You'll often be working alone in a sealed space in remote areas.",
    options: [
      {
        label: "CO + smoke detectors",
        note: "Required with the diesel heater. Basic protection.",
        price: 50,
      },
      {
        label: "Detectors + air quality monitor",
        note: "Adds a live air quality readout. Important for long sessions in a sealed space with a client.",
        price: 90,
        recommendation: "pick",
      },
      {
        label: "Full safety suite + first aid",
        note: "Everything above plus a fire extinguisher, first aid kit, and roadside emergency kit for solo remote work.",
        price: 370,
        recommendation: "upgrade",
      },
    ],
  },
  {
    id: "win",
    jennyChoice: true,
    label: "Side Windows",
    section: "Staying Connected",
    question: "Which sliding windows do you want?",
    callout:
      "AM Auto is our starting recommendation - most popular in van builds, screen included, proven fit. Step up to VWD for a cleaner all-glass look.",
    context:
      "Full-sized sliders cut into each side of the van. Confirmed fit for your 2025 Sprinter 170 high roof. All slide open for ventilation.",
    options: [
      {
        label: "AM Auto - slider with built-in screen",
        note: "Most popular van build window. Tinted glass, slides open, integrated bug screen. Best value - screen already included.",
        price: 480,
        recommendation: "value",
      },
      {
        label: "VWD SE-Series - frameless all-glass",
        note: "Upgrade option. Cleaner frameless look from the outside. Same tinted glass and integrated screen.",
        price: 960,
        recommendation: "upgrade",
      },
      {
        label: "Vantek 2024 Upgraded - slider with screen",
        note: "European glass from a 16-year specialist. Larger opening, clean exterior seal, integrated screen.",
        price: 1250,
      },
      {
        label: "Vantek OEM Flush - with screen",
        note: "The slider sits completely flush with the outer glass. Looks exactly like a factory window.",
        price: 1850,
        recommendation: "upgrade",
      },
    ],
  },
  {
    id: "bat",
    jennyChoice: false,
    label: "Battery Bank",
    section: "Power System",
    critical: true,
    question: "How much battery capacity do you need?",
    callout:
      "For your 4-6 hour AC use case, we recommend 600Ah. That handles a full day of AC, internet, and laptop without ever plugging in.",
    context:
      "This determines how many hours you can run the AC, keep the internet going, and charge your laptop - all without finding an outlet.",
    options: [
      {
        label: "400Ah - covers a few hours",
        note: "Handles a few hours of AC plus daily use.",
        price: 900,
      },
      {
        label: "600Ah - right-sized for this build",
        note: "Full day of AC, internet, and laptop without plugging in. The right call for your use.",
        price: 1600,
        recommendation: "pick",
      },
      {
        label: "800Ah - maximum",
        note: "Best for full summer days east of the Cascades when the AC runs all day.",
        price: 1800,
        recommendation: "upgrade",
      },
    ],
  },
  {
    id: "inv",
    jennyChoice: false,
    label: "Outlets + Inverter",
    section: "Power System",
    question: "How do you want to power your laptop and outlets?",
    callout:
      "Everything else in the van runs on 12V and bypasses the inverter. This is just for your laptop and whatever else you plug into a standard outlet.",
    context:
      "The Victron Phoenix is completely silent - no fan at any load. The Xantrex matches our existing RV fleet and switches to shore power automatically.",
    options: [
      {
        label: "No standard outlets",
        note: "Laptop charges via a 12V car adapter. Simplest and quietest setup.",
        price: 0,
      },
      {
        label: "Xantrex Freedom X 1000W",
        brand: "xantrex",
        note: "Same brand as our RV fleet. Laptop and devices. Automatically switches to shore power when available.",
        price: 320,
        recommendation: "value",
      },
      {
        label: "Victron Phoenix 800W - fanless",
        brand: "victron",
        note: "Completely silent at any load. No fan, ever. Best choice if quiet during sessions is the priority.",
        price: 260,
        recommendation: "pick",
      },
    ],
  },
  {
    id: "solar",
    jennyChoice: false,
    label: "Solar",
    section: "Power System",
    question: "What solar setup do you want?",
    callout:
      "We recommend pre-wiring now and adding panels in Phase 2. That keeps the Phase 1 cost down while leaving the door wide open.",
    context:
      "Solar panels recharge the batteries while you're parked. Two 200W panels can recover most of a full day of AC use on a good sunny day.",
    options: [
      {
        label: "Pre-wire only - panels added later",
        note: "We run all the wiring now so panels can be added any time with zero extra labor.",
        price: 120,
        recommendation: "pick",
      },
      {
        label: "2x 200W panels - covers AC days",
        note: "Recovers most of a full day of AC in summer sun. Full self-sufficiency on sunny days.",
        price: 750,
        recommendation: "upgrade",
      },
      {
        label: "Maximum - near self-sufficient",
        note: "Full roof coverage. Near net-zero on sunny days even with AC running all day.",
        price: 1150,
      },
    ],
  },
  {
    id: "charge",
    jennyChoice: false,
    label: "Charging",
    section: "Power System",
    question: "How should we set up charging?",
    callout:
      "The premium Victron setup is the right call - silent, smart, and it gives you a live battery percentage at all times.",
    context:
      "The van charges from three sources: driving, solar, and plugging into a wall outlet. This is separate from the inverter above.",
    options: [
      {
        label: "Standard - shore power + driving",
        note: "Charges from a wall outlet and while driving.",
        price: 320,
      },
      {
        label: "Premium - Victron silent charger + shore",
        brand: "victron",
        note: "Fanless alternator charger with live battery percentage display. Faster charging, no noise.",
        price: 520,
        recommendation: "pick",
      },
      {
        label: "Premium + full monitoring screen",
        brand: "victron",
        note: "Everything above plus a touchscreen showing solar, battery, and power at a glance.",
        price: 980,
        recommendation: "upgrade",
      },
    ],
  },
  {
    id: "panel",
    jennyChoice: false,
    label: "Control Panel",
    section: "Power System",
    question: "What control panel setup do you want?",
    callout:
      "We recommend the labeled switch panel. It gives you a clear on/off switch for every circuit - fan, AC, lights - all labeled on the wall.",
    context:
      "This is where you control everything in the van day-to-day.",
    options: [
      {
        label: "Basic fuse block - no panel",
        note: "Hidden fuses. No labeled switches. Everything runs all the time.",
        price: 80,
      },
      {
        label: "Blue Sea 6-circuit labeled switches",
        note: "Six labeled backlit rocker switches on the wall. Clean and easy for daily use.",
        price: 180,
        recommendation: "pick",
      },
      {
        label: "Blue Sea 12-circuit full panel",
        note: "A labeled switch for every single circuit in the van.",
        price: 260,
        recommendation: "upgrade",
      },
    ],
  },
  {
    id: "dead",
    jennyChoice: false,
    label: "Sound Deadening",
    section: "Acoustic Foundation",
    question: "How thorough should the soundproofing be?",
    callout:
      "For a counseling van in the Pacific Northwest, we recommend the full van with the double roof layer. Rain on an unlined van roof is extremely loud.",
    context:
      "Applied to bare metal first - before anything else. Converts panel vibration into silence. The roof panel matters most in Oregon and Washington rain.",
    options: [
      {
        label: "Full van - Hushmat",
        note: "Every accessible panel. The van goes from a resonating tin box to something solid and quiet.",
        price: 680,
        recommendation: "pick",
      },
      {
        label: "Full van + double layer on roof",
        note: "Everything above plus a second layer specifically on the roof. Rain becomes nearly inaudible inside.",
        price: 820,
        recommendation: "upgrade",
      },
    ],
  },
  {
    id: "ins",
    jennyChoice: false,
    label: "Insulation",
    section: "Acoustic Foundation",
    question: "How much insulation coverage do you want?",
    callout:
      "Closed-cell spray foam is the right call for the Pacific Northwest. It fills every gap and creates a complete moisture barrier - prevents hidden rust from condensation.",
    context:
      "Goes over the sound deadening layer. More coverage means better warmth, better quiet, and no condensation issues.",
    options: [
      {
        label: "Spray foam - standard coverage",
        note: "Every gap and void filled. Complete moisture barrier. Right choice for PNW.",
        price: 480,
        recommendation: "pick",
      },
      {
        label: "Spray foam - maximum thickness",
        note: "Multiple passes to maximize depth everywhere. Best possible thermal and sound performance.",
        price: 680,
        recommendation: "upgrade",
      },
    ],
  },
];
