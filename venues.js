const VENUE_CATEGORIES = [
  { id: 'all', label: 'All Activities', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
  { id: 'gym', label: 'Gym & Fitness', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"/></svg>' },
  { id: 'sauna', label: 'Sauna & Recovery', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M8 6v3M16 6v3M6 13a6 6 0 0 0 12 0c0-4-6-9-6-9s-6 5-6 9z"/></svg>' },
  { id: 'swim', label: 'Swimming & Pools', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 5 1.5 7 0M2 17c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 5 1.5 7 0"/></svg>' },
  { id: 'boulder', label: 'Bouldering', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 22 22 22 12 2"/></svg>' }
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
    annualPrice: 99,
    checkIns: 'Daily + 4 Plus/mo',
    summary: 'Daily fitness + premium spas & massage',
    description: 'Premium fitness, boutique studios, hotel spas, plus 1 monthly 30-min massage or PLUS check-in.',
    features: [
      '14,800+ partner venues across Europe',
      'Daily gym, pool & partner sauna access',
      '4 Plus check-ins for high-end boutique studios & spas',
      '1 free massage (30 min) per month',
      'Pause membership anytime'
    ],
    popular: false,
    cta: 'Choose Premium and continue',
    url: 'https://urbansportsclub.com/en/prices'
  },
  {
    id: 'max',
    name: 'Max',
    headline: 'Everything unlimited',
    emoji: '⚡',
    tierInfo: 'Daily + 8 Plus visits · 2 massages',
    monthlyPrice: 169,
    annualPrice: 145,
    checkIns: 'Daily + 8 Plus/mo',
    summary: 'Maximum access + 2 monthly massages',
    description: 'Ultimate wellbeing and fitness freedom. Includes 8 Plus check-ins and 2 monthly massages.',
    features: [
      '14,800+ partner venues across Europe',
      'Unlimited daily fitness & wellness access',
      '8 Plus check-ins for boutique studios & day spas',
      '2 free massages (30 min) per month',
      'Pause membership anytime'
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
        name: 'Boulderklub Kreuzberg',
        area: 'Kreuzberg',
        type: 'Bouldering & training',
        tier: 'Classic',
        categories: ['boulder', 'gym'],
        address: 'Ohlauer Str. 38, 10999 Berlin',
        image: 'assets/venue-boulderklub.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/boulderklub-kreuzberg'
      },
      {
        name: 'Liquidrom',
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
        name: 'Anti Spa & Wellness',
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
        name: 'Sports Club Hamburg City',
        area: 'Mitte',
        type: 'Gym, pool & sauna',
        tier: 'Classic',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Poststraße 18, 20354 Hamburg',
        image: 'assets/venues/hamburg-sports-club.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/sports-club-hamburg-city-gmbh'
      },
      {
        name: 'Bäderland Kaifubad',
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
        name: 'Nordbad Sauna & Pool',
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
        name: 'Iron & Soul Köln',
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
        name: 'The Other Space',
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
