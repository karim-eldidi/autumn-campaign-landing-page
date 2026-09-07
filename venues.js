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
    monthlyPrice: 35,
    annualPrice: 29,
    checkIns: '4 check-ins / mo',
    summary: 'Ideal for weekly gym sessions',
    features: [
      '5,600+ partner venues',
      'Gym & fitness training',
      'Live online classes & VoD',
      'Free partner wellbeing apps'
    ],
    popular: false,
    cta: 'Choose Essential',
    url: 'https://urbansportsclub.com/en/prices'
  },
  {
    id: 'classic',
    name: 'Classic',
    monthlyPrice: 75,
    annualPrice: 64,
    checkIns: '1 check-in / day',
    summary: 'Gyms, pools & partner saunas',
    features: [
      '14,800+ partner venues',
      'Daily gym & fitness access',
      'Public swimming pools included',
      'Partner saunas & recovery',
      '€20 merch voucher on 12M'
    ],
    popular: true,
    badge: 'Most Popular',
    cta: 'Choose Classic',
    url: 'https://urbansportsclub.com/en/prices'
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 125,
    annualPrice: 109,
    checkIns: '1/day + 4 Plus visits',
    summary: 'Boutique studios & thermal spas',
    features: [
      '17,700+ partner venues',
      'Daily check-ins across Europe',
      '4 Plus visits for spas & massages',
      'Full thermal bath & sauna coverage',
      'All live classes & premium apps'
    ],
    popular: false,
    cta: 'Choose Premium',
    url: 'https://urbansportsclub.com/en/prices'
  },
  {
    id: 'max',
    name: 'Max',
    monthlyPrice: 165,
    annualPrice: 149,
    checkIns: '1/day + 8 Plus visits',
    summary: 'Ultimate all-inclusive access',
    features: [
      '17,800+ partner venues',
      'Daily check-ins everywhere',
      '8 Plus visits for luxury spas & massages',
      'Exclusive top-tier wellness clubs',
      'Ultimate flexibility across 7 countries'
    ],
    popular: false,
    cta: 'Choose Max',
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
        categories: ['boulder', 'gym'],
        address: 'Ohlauer Str. 38, 10999 Berlin',
        image: 'assets/venue-boulderklub.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/boulderklub-kreuzberg'
      },
      {
        name: 'LIQUIDROM',
        area: 'Kreuzberg',
        type: 'Sauna & recovery',
        categories: ['sauna'],
        address: 'Möckernstraße 10, 10963 Berlin',
        image: 'assets/venues/berlin-liquidrom.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/liquidrom-1'
      },
      {
        name: 'Stadtbad Neukölln',
        area: 'Neukölln',
        type: 'Swimming & sauna',
        categories: ['swim', 'sauna'],
        address: 'Ganghoferstraße 3, 12043 Berlin',
        image: 'assets/venue-stadtbad.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/stadtbad-neukolln'
      },
      {
        name: 'Holmes Place Neue Welt',
        area: 'Neukölln',
        type: 'Gym, swimming & sauna',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Hasenheide 109 ff., 10967 Berlin',
        image: 'assets/venues/berlin-holmes-neue-welt.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-neue-welt'
      },
      {
        name: 'Holmes Place Gendarmenmarkt',
        area: 'Mitte',
        type: 'Gym, swimming & sauna',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Friedrichstraße 68, 10117 Berlin',
        image: 'assets/venues/berlin-holmes-gendarmenmarkt.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-gendarmenmarkt'
      },
      {
        name: 'ANTI SPA',
        area: 'Mitte',
        type: 'Sauna & recovery',
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
        categories: ['gym', 'swim', 'sauna'],
        address: 'Poststraße 18, 20354 Hamburg',
        image: 'assets/venues/hamburg-sports-club.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/sports-club-hamburg-city-gmbh'
      },
      {
        name: 'Bäderland Kaifubad (Sauna/Sole)',
        area: 'Eimsbüttel',
        type: 'Sauna & wellness',
        categories: ['sauna', 'swim'],
        address: 'Hohe Weide 15, 20259 Hamburg',
        image: 'assets/venues/hamburg-kaifubad.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/baderland-kaifu-bad-sauna'
      },
      {
        name: 'Longevity Club by Cryopoint',
        area: 'Mitte',
        type: 'Recovery & wellness',
        categories: ['sauna'],
        address: 'Kaiser-Wilhelm-Straße 9, 20355 Hamburg',
        image: 'assets/venues/hamburg-longevity.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/longevity-club-by-cryopoint'
      },
      {
        name: 'Fitness First Hamburg - Eppendorf',
        area: 'Eppendorf',
        type: 'Gym & recovery',
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
        categories: ['gym', 'sauna'],
        address: 'Kathi-Kobus-Straße 11, 80797 Munich',
        image: 'assets/venues/munich-munichgym.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/munichgym'
      },
      {
        name: 'Nordbad - Sauna',
        area: 'Schwabing-West',
        type: 'Sauna & pool',
        categories: ['sauna', 'swim'],
        address: 'Schleißheimer Straße 142, 80797 Munich',
        image: 'assets/venues/munich-nordbad.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/nordbad-sauna'
      },
      {
        name: 'EVO Fitness Maxvorstadt',
        area: 'Maxvorstadt',
        type: 'Gym & functional training',
        categories: ['gym'],
        address: 'Brienner Straße 55, 80333 Munich',
        image: 'assets/venues/munich-evo.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/evo-maxvorstadt'
      },
      {
        name: 'Fitness First München - Hofstatt',
        area: 'Altstadt',
        type: 'Gym & sauna',
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
        categories: ['gym', 'sauna'],
        address: 'Weyerstraßerweg 10, 50969 Cologne',
        image: 'assets/venues/cologne-iron-soul.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/iron-soul-kln'
      },
      {
        name: 'Holmes Place Köln am Gürzenich',
        area: 'Altstadt',
        type: 'Gym, pool & sauna',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Gürzenichstr. 6, 50667 Cologne',
        image: 'assets/venues/cologne-holmes.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-am-gurzenich'
      },
      {
        name: 'Mauritius Therme',
        area: 'Altstadt',
        type: 'Thermal pools & sauna',
        categories: ['sauna', 'swim'],
        address: 'Mauritiuskirchplatz 3–11, 50676 Cologne',
        image: 'assets/venues/cologne-mauritius.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/mauritius-therme'
      },
      {
        name: 'THE OTHER SPACE',
        area: 'Ehrenfeld',
        type: 'Gym, movement & wellness',
        categories: ['gym', 'sauna'],
        address: 'Vogelsanger Straße 195A, 50825 Cologne',
        image: 'assets/venues/cologne-other-space.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/the-other-space-ehrenfeld'
      }
    ]
  }
};
