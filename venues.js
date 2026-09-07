const VENUE_CATEGORIES = [
  { id: 'all', label: 'All Activities' },
  { id: 'gym', label: 'Gym & Fitness', icon: '🏋️' },
  { id: 'sauna', label: 'Sauna & Recovery', icon: '🧖' },
  { id: 'swim', label: 'Swimming & Pools', icon: '🏊' },
  { id: 'boulder', label: 'Bouldering', icon: '🧗' }
];

const USC_PLANS = [
  {
    id: 'essential',
    name: 'Essential',
    headline: 'Once a week',
    emoji: '📅',
    tierInfo: '4 visits · 5,600+ venues',
    monthlyPrice: 35,
    annualPrice: 29,
    checkIns: '4 check-ins / mo',
    summary: 'Ideal for weekly workouts & gym sessions',
    description: 'Ideal for weekly workouts and flexible sports access across 5,600+ partner locations.',
    features: [
      '5,600+ partner venues across Germany & Europe',
      'Gym & fitness training access',
      'Live online classes & on-demand videos',
      'Free partner wellbeing and meditation apps'
    ],
    popular: false,
    cta: 'Choose Essential and continue',
    url: 'https://urbansportsclub.com/en/prices'
  },
  {
    id: 'classic',
    name: 'Classic',
    headline: 'Move most days',
    emoji: '👟',
    tierInfo: 'Daily visits · 14,800+ venues',
    monthlyPrice: 75,
    annualPrice: 64,
    checkIns: '1 check-in / day',
    summary: 'Gyms, pools & partner saunas',
    description: 'All-inclusive access to fitness, sports, and wellness across 14,800+ partner venues.',
    features: [
      '14,800+ partner venues across Europe',
      'Daily gym & fitness access',
      'Public swimming pools included',
      'Partner saunas & recovery access',
      'Pause membership anytime'
    ],
    popular: true,
    badge: 'Most popular',
    cta: 'Choose Classic and continue',
    url: 'https://urbansportsclub.com/en/prices'
  },
  {
    id: 'premium',
    name: 'Premium',
    headline: 'Add spas & recovery',
    emoji: '🪷',
    tierInfo: 'Daily + 4 Plus visits · includes 1 massage',
    monthlyPrice: 115,
    annualPrice: 109,
    checkIns: 'Daily + 4 Plus visits',
    summary: 'Boutique studios & thermal spas + massage',
    description: 'Boutique fitness, high-end thermal saunas, and 1 premium massage included every month.',
    features: [
      '17,700+ partner venues across Europe',
      'Daily check-ins across Europe',
      '4 Plus visits for boutique spas & 1 massage/month',
      'Full thermal bath & sauna coverage',
      'All live classes & premium partner apps'
    ],
    popular: false,
    cta: 'Choose Premium and continue',
    url: 'https://urbansportsclub.com/en/prices'
  },
  {
    id: 'max',
    name: 'Max',
    headline: 'Live exceptionally',
    emoji: '💛',
    tierInfo: 'Daily + 8 Plus visits · includes 2 massages',
    monthlyPrice: 165,
    annualPrice: 149,
    checkIns: 'Daily + 8 Plus visits',
    summary: 'Ultimate all-inclusive access + 2 massages',
    description: 'Ultimate luxury wellness, premium boutique clubs, and 2 massages included every month.',
    features: [
      '17,800+ partner venues everywhere',
      'Daily check-ins across all countries',
      '8 Plus visits for luxury spas & 2 massages/month',
      'Exclusive top-tier wellness & padel clubs',
      'Ultimate flexibility across 7 countries'
    ],
    popular: false,
    cta: 'Choose Max and continue',
    url: 'https://urbansportsclub.com/en/prices'
  }
];

const CITY_VENUES = {
  berlin: {
    name: 'Berlin',
    centre: { lat: 52.52, lng: 13.405 },
    directoryUrl: 'https://urbansportsclub.com/en/venues/berlin/berlin',
    venues: [
      {
        name: 'BOULDERKLUB Kreuzberg',
        area: 'Kreuzberg',
        type: 'Bouldering & training',
        tier: 'Classic',
        categories: ['boulder', 'gym'],
        address: 'Ohlauer Str. 38, 10999 Berlin',
        image: 'assets/venue-boulderklub.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/boulderklub-kreuzberg'
      },
      {
        name: 'LIQUIDROM',
        area: 'Kreuzberg',
        type: 'Sauna & recovery',
        tier: 'Premium',
        categories: ['sauna'],
        address: 'Möckernstraße 10, 10963 Berlin',
        image: 'assets/venues/berlin-liquidrom.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/liquidrom-1'
      },
      {
        name: 'Stadtbad Neukölln',
        area: 'Neukölln',
        type: 'Swimming & sauna',
        tier: 'Classic',
        categories: ['swim', 'sauna'],
        address: 'Ganghoferstraße 3, 12043 Berlin',
        image: 'assets/venue-stadtbad.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/stadtbad-neukolln'
      },
      {
        name: 'Holmes Place Neue Welt',
        area: 'Neukölln',
        type: 'Gym, swimming & sauna',
        tier: 'Premium',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Hasenheide 109 ff., 10967 Berlin',
        image: 'assets/venues/berlin-holmes-neue-welt.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-neue-welt'
      },
      {
        name: 'Holmes Place Gendarmenmarkt',
        area: 'Mitte',
        type: 'Gym, swimming & sauna',
        tier: 'Premium',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Friedrichstraße 68, 10117 Berlin',
        image: 'assets/venues/berlin-holmes-gendarmenmarkt.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-gendarmenmarkt'
      },
      {
        name: 'ANTI SPA',
        area: 'Mitte',
        type: 'Sauna & recovery',
        tier: 'Premium',
        categories: ['sauna'],
        address: 'Brunnenstraße 9, 10119 Berlin',
        image: 'assets/venues/berlin-anti-spa.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/oasis'
      }
    ]
  },
  hamburg: {
    name: 'Hamburg',
    centre: { lat: 53.5511, lng: 9.9937 },
    directoryUrl: 'https://urbansportsclub.com/en/venues/hamburg/hamburg',
    venues: [
      {
        name: 'Sports Club Hamburg- City',
        area: 'Mitte',
        type: 'Gym, pool & sauna',
        tier: 'Classic',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Poststraße 18, 20354 Hamburg',
        image: 'assets/venues/hamburg-sports-club.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/sports-club-hamburg-city-gmbh'
      },
      {
        name: 'Bäderland Kaifubad (Sauna/Sole)',
        area: 'Eimsbüttel',
        type: 'Sauna & wellness',
        tier: 'Classic',
        categories: ['sauna', 'swim'],
        address: 'Hohe Weide 15, 20259 Hamburg',
        image: 'assets/venues/hamburg-kaifubad.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/baderland-kaifu-bad-sauna'
      },
      {
        name: 'Longevity Club by Cryopoint',
        area: 'Mitte',
        type: 'Recovery & wellness',
        tier: 'Premium',
        categories: ['sauna'],
        address: 'Kaiser-Wilhelm-Straße 9, 20355 Hamburg',
        image: 'assets/venues/hamburg-longevity.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/longevity-club-by-cryopoint'
      },
      {
        name: 'Fitness First Hamburg - Eppendorf',
        area: 'Eppendorf',
        type: 'Gym & recovery',
        tier: 'Classic',
        categories: ['gym', 'sauna'],
        address: 'Straßenbahnring 8, 20251 Hamburg',
        image: 'assets/venues/hamburg-fitness-first.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/fitness-first-hamburg-eppendorf-straenbahnring'
      }
    ]
  },
  munich: {
    name: 'Munich',
    centre: { lat: 48.1351, lng: 11.582 },
    directoryUrl: 'https://urbansportsclub.com/en/venues/munchen/munchen',
    venues: [
      {
        name: 'MunichGym',
        area: 'Schwabing-West',
        type: 'Gym, sauna & wellness',
        tier: 'Classic',
        categories: ['gym', 'sauna'],
        address: 'Kathi-Kobus-Straße 11, 80797 Munich',
        image: 'assets/venues/munich-munichgym.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/munichgym'
      },
      {
        name: 'Nordbad - Sauna',
        area: 'Schwabing-West',
        type: 'Sauna & pool',
        tier: 'Classic',
        categories: ['sauna', 'swim'],
        address: 'Schleißheimer Straße 142, 80797 Munich',
        image: 'assets/venues/munich-nordbad.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/nordbad-sauna'
      },
      {
        name: 'EVO Fitness Maxvorstadt',
        area: 'Maxvorstadt',
        type: 'Gym & functional training',
        tier: 'Essential',
        categories: ['gym'],
        address: 'Brienner Straße 55, 80333 Munich',
        image: 'assets/venues/munich-evo.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/evo-maxvorstadt'
      },
      {
        name: 'Fitness First München - Hofstatt',
        area: 'Altstadt',
        type: 'Gym & sauna',
        tier: 'Classic',
        categories: ['gym', 'sauna'],
        address: 'Sendlinger Straße 10, 80331 Munich',
        image: 'assets/venues/munich-fitness-first.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/fitness-first-mnchen-hofstatt'
      }
    ]
  },
  cologne: {
    name: 'Cologne',
    centre: { lat: 50.9375, lng: 6.9603 },
    directoryUrl: 'https://urbansportsclub.com/en/venues/koln/koln',
    venues: [
      {
        name: 'Iron&Soul Köln',
        area: 'Zollstock',
        type: 'Gym, Hyrox & recovery',
        tier: 'Classic',
        categories: ['gym', 'sauna'],
        address: 'Weyerstraßerweg 10, 50969 Cologne',
        image: 'assets/venues/cologne-iron-soul.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/iron-soul-kln'
      },
      {
        name: 'Holmes Place Köln am Gürzenich',
        area: 'Altstadt',
        type: 'Gym, pool & sauna',
        tier: 'Premium',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Gürzenichstr. 6, 50667 Cologne',
        image: 'assets/venues/cologne-holmes.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-am-gurzenich'
      },
      {
        name: 'Mauritius Therme',
        area: 'Altstadt',
        type: 'Thermal pools & sauna',
        tier: 'Classic',
        categories: ['sauna', 'swim'],
        address: 'Mauritiuskirchplatz 3–11, 50676 Cologne',
        image: 'assets/venues/cologne-mauritius.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/mauritius-therme'
      },
      {
        name: 'THE OTHER SPACE',
        area: 'Ehrenfeld',
        type: 'Gym, movement & wellness',
        tier: 'Classic',
        categories: ['gym', 'sauna'],
        address: 'Vogelsanger Straße 195A, 50825 Cologne',
        image: 'assets/venues/cologne-other-space.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/the-other-space-ehrenfeld'
      }
    ]
  }
};
