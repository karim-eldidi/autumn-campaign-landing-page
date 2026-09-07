const VENUE_CATEGORIES = [
  { id: 'all', label: 'All Activities', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
  { id: 'gym', label: 'Gym & Fitness', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"/></svg>' },
  { id: 'sauna', label: 'Sauna & Recovery', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M8 6v3M16 6v3M6 13a6 6 0 0 0 12 0c0-4-6-9-6-9s-6 5-6 9z"/></svg>' },
  { id: 'swim', label: 'Swimming & Pools', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 5 1.5 7 0M2 17c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 5 1.5 7 0"/></svg>' },
  { id: 'boulder', label: 'Bouldering', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 22 22 22 12 2"/></svg>' },
  { id: 'yoga', label: 'Yoga & Pilates', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M9 9c0 0 0 6 3 9s3-9 3-9M3 12h18M9 18c0 1.5 3 4 3 4s3-2.5 3-4"/></svg>' },
  { id: 'cycling', label: 'Cycling & Spinning', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 18h12M9 9c0 0 6-2 9 0"/></svg>' },
  { id: 'dance', label: 'Dance & Zumba', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M9 9l-2 4M15 9l2 4M9 13l-3 5M15 13l3 5M12 9v4"/></svg>' },
  { id: 'martial', label: 'Martial Arts', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M8 9l-3 3M16 9l3 3M10 15l-2 6M14 15l2 6M12 9v6"/></svg>' },
  { id: 'crossfit', label: 'CrossFit', iconSvg: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M12 3v18M6 6l12 12M18 6l-12 12"/></svg>' }
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
        categories: ['sauna', 'swim'],
        address: 'Möckernstraße 10, 10963 Berlin',
        image: 'assets/venues/berlin-liquidrom.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/liquidrom'
      },
      {
        name: 'Holmes Place Gendarmenmarkt',
        area: 'Mitte',
        type: 'Health club & pool',
        tier: 'Premium',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Friedrichstraße 68, 10117 Berlin',
        image: 'assets/venues/berlin-holmes-gendarmenmarkt.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-gendarmenmarkt'
      },
      {
        name: 'Holmes Place Neue Welt',
        area: 'Neukölln',
        type: 'Fitness & wellness',
        tier: 'Classic',
        categories: ['gym', 'sauna'],
        address: 'Hasenheide 107-113, 10967 Berlin',
        image: 'assets/venues/berlin-holmes-neue-welt.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-neue-welt'
      },
      {
        name: 'Stadtbad Neukölln',
        area: 'Neukölln',
        type: 'Swimming pool & sauna',
        tier: 'Classic',
        categories: ['swim', 'sauna'],
        address: 'Ganghoferstraße 3, 12043 Berlin',
        image: 'assets/venue-stadtbad.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/stadtbad-neukolln'
      },
      {
        name: 'Anti-Spa Berlin',
        area: 'Kreuzberg',
        type: 'Recovery & cold plunge',
        tier: 'Premium',
        categories: ['sauna'],
        address: 'Oranienstraße 185, 10999 Berlin',
        image: 'assets/venues/berlin-anti-spa.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/anti-spa-berlin'
      },
      {
        name: 'Berta Block Boulderhalle',
        area: 'Pankow',
        type: 'Indoor climbing arena',
        tier: 'Classic',
        categories: ['boulder', 'gym'],
        address: 'Mühlenstraße 62, 13187 Berlin',
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/berta-block-boulderhalle'
      },
      {
        name: 'Original Feelings',
        area: 'Kreuzberg',
        type: 'Yoga & sound sanctuary',
        tier: 'Classic',
        categories: ['yoga'],
        address: 'Hauptstraße 8, 10827 Berlin',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/original-feelings'
      },
      {
        name: 'Ride.bln Mitte',
        area: 'Mitte',
        type: 'Rhythm indoor cycling',
        tier: 'Classic',
        categories: ['cycling'],
        address: 'Chausseestraße 8, 10115 Berlin',
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/ride-bln-mitte'
      },
      {
        name: 'Barry\x27s Bootcamp Berlin',
        area: 'Mitte',
        type: 'High-intensity training',
        tier: 'Premium',
        categories: ['crossfit', 'gym'],
        address: 'Krausenstraße 9-10, 10117 Berlin',
        image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/barrys-bootcamp-berlin'
      },
      {
        name: 'EVO Fitness Mitte',
        area: 'Mitte',
        type: 'Boutique functional gym',
        tier: 'Classic',
        categories: ['gym'],
        address: 'Rosenthaler Str. 63, 10119 Berlin',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/evo-fitness-mitte'
      },
      {
        name: 'Flying Steps Academy',
        area: 'Kreuzberg',
        type: 'Urban dance academy',
        tier: 'Classic',
        categories: ['dance'],
        address: 'Lobeckstraße 30-35, 10969 Berlin',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/flying-steps-academy'
      },
      {
        name: 'Fenriz Gym',
        area: 'Kreuzberg',
        type: 'Muay Thai, MMA & BJJ',
        tier: 'Classic',
        categories: ['martial'],
        address: 'Lobeckstraße 36, 10969 Berlin',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/fenriz-gym'
      },
      {
        name: 'Chimosa',
        area: 'Mitte',
        type: 'Martial arts & yoga',
        tier: 'Classic',
        categories: ['martial', 'yoga'],
        address: 'Linienstraße 127, 10115 Berlin',
        image: 'https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/chimosa'
      },
      {
        name: 'CrossFit Mitte',
        area: 'Mitte',
        type: 'CrossFit & strength',
        tier: 'Classic',
        categories: ['crossfit', 'gym'],
        address: 'Heidestraße 48, 10557 Berlin',
        image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/crossfit-mitte'
      },
      {
        name: 'Rocycle Berlin',
        area: 'Charlottenburg',
        type: 'Indoor cycling studio',
        tier: 'Classic',
        categories: ['cycling'],
        address: 'Bleibtreustraße 24, 10707 Berlin',
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/rocycle-berlin-charlottenburg'
      },
      {
        name: 'Schwimmhalle Finckensteinallee',
        area: 'Lichterfelde',
        type: '50m Olympic sports pool',
        tier: 'Classic',
        categories: ['swim'],
        address: 'Finckensteinallee 73, 12205 Berlin',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/schwimmhalle-finckensteinallee'
      },
      {
        name: 'Superfit Alexanderplatz',
        area: 'Mitte',
        type: '24/7 fitness club & sauna',
        tier: 'Essential',
        categories: ['gym', 'sauna'],
        address: 'Alexanderplatz 9, 10178 Berlin',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/superfit-alexanderplatz'
      },
      {
        name: 'Vabali Spa Berlin',
        area: 'Moabit',
        type: 'Luxury day spa & sauna oasis',
        tier: 'Max',
        categories: ['sauna', 'swim'],
        address: 'Seydlitzstraße 6, 10557 Berlin',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/vabali-spa-berlin'
      },
      {
        name: 'Peace Yoga Berlin',
        area: 'Kreuzberg',
        type: 'Jivamukti yoga studio',
        tier: 'Classic',
        categories: ['yoga'],
        address: 'Glogauer Str. 19, 10999 Berlin',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/peace-yoga-berlin'
      }
    ]
  },
  hamburg: {
    name: 'Hamburg',
    centre: { lat: 53.5511, lng: 9.9937 },
    directoryUrl: 'https://urbansportsclub.com/en/venues/hamburg/hamburg',
    venues: [
      {
        name: 'Kaifu-Bad & Kaifu-Lodge',
        area: 'Eimsbüttel',
        type: 'Swimming pool & spa',
        tier: 'Classic',
        categories: ['swim', 'sauna'],
        address: 'Hohe Weide 15, 20259 Hamburg',
        image: 'assets/venues/hamburg-kaifubad.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/kaifu-bad'
      },
      {
        name: 'Fitness First St. Georg',
        area: 'St. Georg',
        type: 'Premium gym & pool',
        tier: 'Classic',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Lange Reihe 107, 20099 Hamburg',
        image: 'assets/venues/hamburg-fitness-first.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/fitness-first-st-georg'
      },
      {
        name: 'Sports Club Hamburg',
        area: 'Altona',
        type: 'Strength & functional gym',
        tier: 'Classic',
        categories: ['gym'],
        address: 'Bahrenfelder Str. 260, 22765 Hamburg',
        image: 'assets/venues/hamburg-sports-club.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/sports-club-hamburg'
      },
      {
        name: 'The Longevity Club Hamburg',
        area: 'Rotherbaum',
        type: 'Cryo & infrared sauna',
        tier: 'Premium',
        categories: ['sauna'],
        address: 'Mittelweg 144, 20148 Hamburg',
        image: 'assets/venues/hamburg-longevity.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/the-longevity-club-hamburg'
      },
      {
        name: 'Flashh Bouldering Lounge',
        area: 'Bahrenfeld',
        type: 'Indoor bouldering hall',
        tier: 'Classic',
        categories: ['boulder', 'gym'],
        address: 'Gasstraße 18, 22761 Hamburg',
        image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/flashh-bouldering-lounge'
      },
      {
        name: 'Rocycle Hamburg',
        area: 'Bleichenbrücke',
        type: 'Rhythm cycling studio',
        tier: 'Classic',
        categories: ['cycling'],
        address: 'Bleichenbrücke 10, 20354 Hamburg',
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/rocycle-hamburg'
      },
      {
        name: 'Urban Yoga Hamburg',
        area: 'Sternschanze',
        type: 'Vinyasa & Yin yoga',
        tier: 'Classic',
        categories: ['yoga'],
        address: 'Susannenstraße 21, 20357 Hamburg',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/urban-yoga-hamburg'
      },
      {
        name: 'Holthusenbad',
        area: 'Eppendorf',
        type: 'Thermal wave bath & sauna',
        tier: 'Classic',
        categories: ['swim', 'sauna'],
        address: 'Goernestraße 21, 20249 Hamburg',
        image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holthusenbad'
      },
      {
        name: 'CrossFit Altona',
        area: 'Altona',
        type: 'CrossFit & Olympic lifting',
        tier: 'Classic',
        categories: ['crossfit', 'gym'],
        address: 'Schomburgstraße 50, 22767 Hamburg',
        image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/crossfit-altona'
      },
      {
        name: 'Tanzstudio Danzador',
        area: 'Hamburg-Nord',
        type: 'Dance & contemporary flow',
        tier: 'Classic',
        categories: ['dance'],
        address: 'Alsterdorfer Str. 262, 22297 Hamburg',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/tanzstudio-danzador'
      },
      {
        name: 'Zanshin Dojo Hamburg',
        area: 'Barmbek',
        type: 'Martial arts, boxing & BJJ',
        tier: 'Classic',
        categories: ['martial'],
        address: 'Sengelmannstraße 141, 22297 Hamburg',
        image: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/zanshin-dojo'
      }
    ]
  },
  munich: {
    name: 'Munich',
    centre: { lat: 48.1351, lng: 11.582 },
    directoryUrl: 'https://urbansportsclub.com/en/venues/munich/munich',
    venues: [
      {
        name: 'Nordbad München',
        area: 'Schwabing',
        type: 'Historic pool & sauna',
        tier: 'Classic',
        categories: ['swim', 'sauna'],
        address: 'Schleißheimer Str. 142, 80797 München',
        image: 'assets/venues/munich-nordbad.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/nordbad-munchen'
      },
      {
        name: 'EVO Fitness Schwabing',
        area: 'Schwabing',
        type: 'Boutique fitness & gym',
        tier: 'Classic',
        categories: ['gym'],
        address: 'Leopoldstraße 154, 80804 München',
        image: 'assets/venues/munich-evo.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/evo-fitness-schwabing'
      },
      {
        name: 'Fitness First Marienplatz',
        area: 'Altstadt',
        type: 'Full gym & wellness sauna',
        tier: 'Classic',
        categories: ['gym', 'sauna'],
        address: 'Kaufingerstraße 15, 80331 München',
        image: 'assets/venues/munich-fitness-first.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/fitness-first-marienplatz'
      },
      {
        name: 'Munichgym',
        area: 'Sendling',
        type: 'Strength & free weights',
        tier: 'Classic',
        categories: ['gym'],
        address: 'Plinganserstraße 45, 81369 München',
        image: 'assets/venues/munich-munichgym.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/munichgym'
      },
      {
        name: 'Boulderwelt München Ost',
        area: 'Berg am Laim',
        type: 'Bouldering hall & arena',
        tier: 'Classic',
        categories: ['boulder', 'gym'],
        address: 'Friedenstraße 22a, 81671 München',
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/boulderwelt-munchen-ost'
      },
      {
        name: 'Blackbiit Indoor Cycling',
        area: 'Maxvorstadt',
        type: 'Rhythm cycling studio',
        tier: 'Classic',
        categories: ['cycling'],
        address: 'Theresienstraße 51, 80333 München',
        image: 'https://images.unsplash.com/photo-1591258370814-01609b341790?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/blackbiit-indoor-cycling'
      },
      {
        name: 'Jivamukti Yoga München',
        area: 'Glockenbachviertel',
        type: 'Vinyasa yoga & meditation',
        tier: 'Classic',
        categories: ['yoga'],
        address: 'Müllerstraße 44, 80469 München',
        image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/jivamukti-yoga-munchen'
      },
      {
        name: 'Müller\x27sches Volksbad',
        area: 'Haidhausen',
        type: 'Art nouveau pool & roman bath',
        tier: 'Premium',
        categories: ['swim', 'sauna'],
        address: 'Rosenheimer Str. 1, 81667 München',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/mullersches-volksbad'
      },
      {
        name: 'CrossFit Munich',
        area: 'Moosach',
        type: 'CrossFit & strength coaching',
        tier: 'Classic',
        categories: ['crossfit', 'gym'],
        address: 'Dachauer Str. 192, 80992 München',
        image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/crossfit-munich'
      },
      {
        name: 'MMA Munich',
        area: 'Bogenhausen',
        type: 'Boxing, MMA & Muay Thai',
        tier: 'Classic',
        categories: ['martial'],
        address: 'Prinzregentenstraße 120, 81677 München',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/mma-munich'
      },
      {
        name: 'Tanzloft München',
        area: 'Schwabing',
        type: 'Modern dance & ballet',
        tier: 'Classic',
        categories: ['dance'],
        address: 'Tengstraße 34, 80796 München',
        image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/tanzloft-munchen'
      }
    ]
  },
  cologne: {
    name: 'Cologne',
    centre: { lat: 50.9375, lng: 6.9603 },
    directoryUrl: 'https://urbansportsclub.com/en/venues/cologne/cologne',
    venues: [
      {
        name: 'Holmes Place am Gürzenich',
        area: 'Altstadt',
        type: 'Luxury health club & indoor pool',
        tier: 'Premium',
        categories: ['gym', 'swim', 'sauna'],
        address: 'Gürzenichstraße 6-16, 50667 Köln',
        image: 'assets/venues/cologne-holmes.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/holmes-place-am-gurzenich'
      },
      {
        name: 'Mauritius Therme & Spa',
        area: 'Neustadt-Süd',
        type: 'Thermal salt bath & 7 saunas',
        tier: 'Classic',
        categories: ['sauna', 'swim'],
        address: 'Mauritiuskirchplatz 3-11, 50676 Köln',
        image: 'assets/venues/cologne-mauritius.jpg',
        sourceUrl: 'https://urbansportsclub.com/en/venues/mauritius-therme'
      },
      {
        name: 'Iron Soul Gym',
        area: 'Ehrenfeld',
        type: 'Strength training & powerlifting',
        tier: 'Classic',
        categories: ['gym'],
        address: 'Vogelsanger Str. 197, 50825 Köln',
        image: 'assets/venues/cologne-iron-soul.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/iron-soul-gym'
      },
      {
        name: 'The Other Space',
        area: 'Belgisches Viertel',
        type: 'Sound bath & recovery studio',
        tier: 'Premium',
        categories: ['sauna', 'yoga'],
        address: 'Brüsseler Str. 89-93, 50672 Köln',
        image: 'assets/venues/cologne-other-space.png',
        sourceUrl: 'https://urbansportsclub.com/en/venues/the-other-space'
      },
      {
        name: 'K11 Bouldern',
        area: 'Braunsfeld',
        type: 'Bouldering & climbing hall',
        tier: 'Classic',
        categories: ['boulder', 'gym'],
        address: 'Kupfergasse 11, 50933 Köln',
        image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/k11-bouldern'
      },
      {
        name: 'Radeln & Schwitzen Cycling',
        area: 'Belgisches Viertel',
        type: 'Boutique cycling studio',
        tier: 'Classic',
        categories: ['cycling'],
        address: 'Aachener Str. 58, 50674 Köln',
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/radeln-schwitzen-cycling'
      },
      {
        name: 'The Yoga Loft Cologne',
        area: 'Ehrenfeld',
        type: 'Vinyasa flow & Yin yoga',
        tier: 'Classic',
        categories: ['yoga'],
        address: 'Neusser Str. 27-29, 50670 Köln',
        image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/the-yoga-loft-cologne'
      },
      {
        name: 'Neptunbad Premium Spa',
        area: 'Ehrenfeld',
        type: 'Historic bath & Asian sauna',
        tier: 'Premium',
        categories: ['sauna', 'swim'],
        address: 'Neptunplatz 1, 50823 Köln',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/neptunbad'
      },
      {
        name: 'Agrippabad Köln',
        area: 'Altstadt-Süd',
        type: '25m sport pool & wellness',
        tier: 'Classic',
        categories: ['swim', 'sauna'],
        address: 'Kämmergasse 1, 50676 Köln',
        image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/agrippabad'
      },
      {
        name: 'CrossFit Cologne',
        area: 'Ehrenfeld',
        type: 'Functional conditioning & barbells',
        tier: 'Classic',
        categories: ['crossfit', 'gym'],
        address: 'Girlitzweg 30, 50829 Köln',
        image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/crossfit-cologne'
      },
      {
        name: 'TanzFaktur Köln',
        area: 'Deutz',
        type: 'Urban dance & contemporary',
        tier: 'Classic',
        categories: ['dance'],
        address: 'Siegburger Str. 233w, 50679 Köln',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/tanzfaktur-koln'
      },
      {
        name: 'Combat Club Cologne',
        area: 'Ehrenfeld',
        type: 'BJJ, Boxing & Kickboxing',
        tier: 'Classic',
        categories: ['martial'],
        address: 'Oskar-Jäger-Straße 173, 50825 Köln',
        image: 'https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=800&h=500&fit=crop',
        sourceUrl: 'https://urbansportsclub.com/en/venues/combat-club-cologne'
      }
    ]
  }
};
