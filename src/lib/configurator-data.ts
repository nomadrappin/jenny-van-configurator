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
  imageUrl?: string;
  photoSourceUrl?: string;
  sourceLinks?: Array<{ label: string; url: string }>;
  photoGallery?: Array<{ url: string; caption: string }>;
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
        recommendation: "pick",
      },
      {
        label: "Dometic RTX 2000 - 12V battery powered",
        brand: "dometic",
        note: "Most proven premium 12V rooftop AC. 10+ years of field use. Best choice if you want the safest established option.",
        price: 2700,
        recommendation: "upgrade",
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
        label: "No internet setup for now",
        note: "Use offline workflows or phone hotspot only when available. Can be upgraded later.",
        price: 0,
      },
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
        recommendation: "pick",
      },
      {
        label: "Starlink - always mounted on roof",
        brand: "starlink",
        note: "Permanently mounted. Connects the moment you park - zero setup ever.",
        price: 820,
        recommendation: "upgrade",
      },
      {
        label: "Starlink - in-motion setup",
        brand: "starlink",
        note: "Stays connected while driving so internet is always available during travel days.",
        price: 2700,
        recommendation: "upgrade",
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
      "Our recommendation is the VanTek BOTH SLIDE NEW 170 package. These are paired middle-section slider packages: one passenger sliding-door window plus one driver-side forward window (directly across from it).",
    context:
      "Every option here is slider-only and specific to the Sprinter 170 middle section. Open each card to scroll photos before choosing.",
    options: [
      {
        label: "AM Auto OEM pair (MS06-R1-HSS P + MS06-L1-HSS P)",
        note: "Most common OEM-style half-slider pair. Balanced price, proven fit, and integrated screens on both sides.",
        price: 1290,
        recommendation: "pick",
        sourceLinks: [
          {
            label: "Passenger sliding door source",
            url: "https://www.campervan-hq.com/products/am-auto-mercedes-sprinter-passenger-side-sliding-door-half-slider-window-ms06-r1-hss-p",
          },
          {
            label: "Driver forward source",
            url: "https://www.campervan-hq.com/products/am-auto-mercedes-sprinter-driver-side-forward-half-slider-window-ms06-l1-hss-p",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/d047ac477978.jpg",
            caption: "Passenger sliding door - AM Auto MS06-R1-HSS P",
          },
          {
            url: "/window-photos/cbe6f47ea924.jpg",
            caption: "Driver forward - AM Auto MS06-L1-HSS P",
          },
        ],
      },
      {
        label: "VWD SES pair (SR101-SES + SL101-SES)",
        note: "Most budget-friendly VWD pair. Clean look with internal screens on both middle windows.",
        price: 980,
        recommendation: "value",
        sourceLinks: [
          {
            label: "Passenger SR101-SES source",
            url: "https://vanwindowsdirect.com/vwd-ses-series-sliding-van-window-sr101-ses/",
          },
          {
            label: "Driver SL101-SES source",
            url: "https://vanwindowsdirect.com/vwd-ses-series-sliding-van-window-sl101-ses/",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/61b9a60229eb.jpg",
            caption: "Passenger sliding door - VWD SR101-SES",
          },
          {
            url: "/window-photos/54f90cfd6ac4.jpg",
            caption: "Passenger interior view - VWD SR101-SES",
          },
          {
            url: "/window-photos/d8c5e33e8c01.jpg",
            caption: "Driver forward - VWD SL101-SES",
          },
          {
            url: "/window-photos/85b1187a16d6.jpg",
            caption: "Driver interior view - VWD SL101-SES",
          },
        ],
      },
      {
        label: "VWD SE pair (SR101-SE + SL101-SE)",
        note: "Popular all-glass style pair with modern exterior look and integrated screens.",
        price: 1120,
        recommendation: "value",
        sourceLinks: [
          {
            label: "Passenger SR101-SE source",
            url: "https://vanwindowsdirect.com/vwd-se-series-sliding-van-window-sr101-se/",
          },
          {
            label: "Driver SL101-SE source",
            url: "https://vanwindowsdirect.com/vwd-se-series-sliding-van-window-sl101-se/",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/652060aaedd6.jpg",
            caption: "Passenger sliding door - VWD SR101-SE",
          },
          {
            url: "/window-photos/eab0445123ac.jpg",
            caption: "Passenger close-up - VWD SR101-SE",
          },
          {
            url: "/window-photos/0b4ad67c3ed0.jpg",
            caption: "Driver forward - VWD SL101-SE",
          },
          {
            url: "/window-photos/b1f12a6baf4e.jpg",
            caption: "Driver close-up - VWD SL101-SE",
          },
        ],
      },
      {
        label: "VWD SL dual-latch pair (SR101-SL + SL101-SL)",
        note: "Dual-latch version that allows a secure cracked-open position for airflow while parked.",
        price: 1280,
        recommendation: "upgrade",
        sourceLinks: [
          {
            label: "Passenger SR101-SL source",
            url: "https://nomadicsupply.com/vwd-sr101-sl-internal-screen-dual-latch-mercedes-sprinter-half-slider-window-passenger-side-forward/",
          },
          {
            label: "Driver SL101-SL source",
            url: "https://nomadicsupply.com/vwd-sl101-sl-internal-screen-dual-latch-mercedes-sprinter-half-slider-window-driver-side-forward/",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/c7093732febe.jpg",
            caption: "Passenger sliding door - VWD SR101-SL",
          },
          {
            url: "/window-photos/602e81ba94b6.jpg",
            caption: "Passenger profile - VWD SR101-SL",
          },
          {
            url: "/window-photos/2b6dfce01ed2.jpg",
            caption: "Driver forward - VWD SL101-SL",
          },
          {
            url: "/window-photos/60439fd350f2.jpg",
            caption: "Driver profile - VWD SL101-SL",
          },
        ],
      },
      {
        label: "VWD DS double-slider pair (SR101-DS + SL101-DS)",
        note: "Dual-pane sliders on both sides for maximum cross-ventilation and best visibility options.",
        price: 1690,
        recommendation: "upgrade",
        sourceLinks: [
          {
            label: "Passenger SR101-DS source",
            url: "https://vanwindowsdirect.com/vwd-double-sliding-van-window-sr101-ds/",
          },
          {
            label: "Driver SL101-DS source",
            url: "https://vanwindowsdirect.com/vwd-double-sliding-van-window-sl101-ds/",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/4d69b1bdb94b.jpg",
            caption: "Passenger sliding door - VWD SR101-DS",
          },
          {
            url: "/window-photos/fb0cc05746fc.jpg",
            caption: "Passenger interior detail - VWD SR101-DS",
          },
          {
            url: "/window-photos/9dd907bb10ad.jpg",
            caption: "Driver forward - VWD SL101-DS",
          },
          {
            url: "/window-photos/652e94e30e4d.jpg",
            caption: "Driver interior detail - VWD SL101-DS",
          },
        ],
      },
      {
        label: "Mercedes OEM imported pair",
        note: "OEM import set with factory appearance and premium hardware feel.",
        price: 1390,
        sourceLinks: [
          {
            label: "OEM pair source",
            url: "https://nomadicsupply.com/mercedes-sprinter-oem-sliding-windows/",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/4b78c8287b8f.jpeg",
            caption: "OEM passenger/driver slider set",
          },
          {
            url: "/window-photos/ee0a91176a6e.jpeg",
            caption: "Installed OEM-style look on Sprinter body",
          },
        ],
      },
      {
        label: "Tec Vanlife OEM-style pair",
        note: "OEM-style half-slider package with flush look and privacy tint emphasis.",
        price: 1850,
        recommendation: "upgrade",
        sourceLinks: [
          {
            label: "Tec Vanlife source",
            url: "https://tecvanlife.com/products/mercedes-sprinter-oem-style-half-slider-window",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/616541ed7ec7.jpg",
            caption: "Tec OEM-style half-slider profile",
          },
          {
            url: "/window-photos/9065e0c6fc4a.jpg",
            caption: "Tec OEM-style detail",
          },
        ],
      },
      {
        label: "Backland AMA OEM-style pair",
        note: "AMA OEM-style slider package sold by Backland Expedition Gear.",
        price: 1480,
        sourceLinks: [
          {
            label: "Backland source",
            url: "https://backlandgear.com/en-us/products/window-oem-style",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/1527be2ca194.jpg",
            caption: "Backland AMA OEM slider set",
          },
          {
            url: "/window-photos/a4ce390e6ca0.jpg",
            caption: "Backland installed slider look",
          },
        ],
      },
      {
        label: "Hybrid: AM Auto passenger + VWD SE driver",
        note: "Keep AM Auto on the slider door, pair it with VWD SE opposite for cleaner driver-side exterior glass.",
        price: 1210,
        sourceLinks: [
          {
            label: "AM Auto passenger source",
            url: "https://www.campervan-hq.com/products/am-auto-mercedes-sprinter-passenger-side-sliding-door-half-slider-window-ms06-r1-hss-p",
          },
          {
            label: "VWD SE driver source",
            url: "https://vanwindowsdirect.com/vwd-se-series-sliding-van-window-sl101-se/",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/d047ac477978.jpg",
            caption: "Passenger sliding door - AM Auto",
          },
          {
            url: "/window-photos/0b4ad67c3ed0.jpg",
            caption: "Driver forward - VWD SE",
          },
        ],
      },
      {
        label: "Hybrid: VWD SE passenger + AM Auto driver",
        note: "Use VWD all-glass look on the slider door and AM Auto on the opposite driver side.",
        price: 1210,
        sourceLinks: [
          {
            label: "VWD SE passenger source",
            url: "https://vanwindowsdirect.com/vwd-se-series-sliding-van-window-sr101-se/",
          },
          {
            label: "AM Auto driver source",
            url: "https://www.campervan-hq.com/products/am-auto-mercedes-sprinter-driver-side-forward-half-slider-window-ms06-l1-hss-p",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/652060aaedd6.jpg",
            caption: "Passenger sliding door - VWD SE",
          },
          {
            url: "/window-photos/cbe6f47ea924.jpg",
            caption: "Driver forward - AM Auto",
          },
        ],
      },
      {
        label: "VanTek BOTH SLIDE NEW 170 package",
        note: "Exact VanTek pair package for Sprinter 170 middle section (passenger sliding door + driver forward). This is the option Jenny called out.",
        price: 799,
        recommendation: "pick",
        sourceLinks: [
          {
            label: "VanTek exact package source",
            url: "https://vantekglass.com/product/mercedes-sprinter-sliding-windows-2/",
          },
        ],
        photoGallery: [
          {
            url: "/window-photos/dbc9e4ccf73c.png",
            caption: "VanTek package image - BOTH SLIDE NEW 170",
          },
          {
            url: "/window-photos/c2971d659504.jpg",
            caption: "VanTek product photo 1",
          },
          {
            url: "/window-photos/30e5f61d3e05.jpg",
            caption: "VanTek product photo 2",
          },
          {
            url: "/window-photos/0bda30aff67b.jpg",
            caption: "VanTek product photo 3",
          },
          {
            url: "/window-photos/d0b407fbcd10.jpg",
            caption: "VanTek product photo 5",
          },
          {
            url: "/window-photos/d288e06160d0.jpg",
            caption: "VanTek product photo 6",
          },
        ],
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
