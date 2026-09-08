const round = n => Math.round(n * 10) / 10;

const HERO_SLIDES = [
  { id: 'gym-sauna', desktop: 'assets/banner-variants/gym-sauna-desktop.png', mobile: 'assets/banner-variants/gym-sauna-mobile.png', first: 'GYM.', second: 'SAUNA.', line: 'Train. Recover. Same membership.', alt: 'The same member training at the gym and recovering in a sauna' },
  { id: 'boulder-yoga', desktop: 'assets/banner-variants/bouldering-yoga-desktop.png', mobile: 'assets/banner-variants/bouldering-yoga-mobile.png', first: 'BOULDER.', second: 'YOGA.', line: 'Climb. Reset. Same membership.', alt: 'The same member bouldering and practising yoga' },
  { id: 'swim-ride', desktop: 'assets/banner-variants/swimming-cycling-desktop.png', mobile: 'assets/banner-variants/swimming-cycling-mobile.png', first: 'SWIM.', second: 'RIDE.', line: 'Two ways to move. Same membership.', alt: 'The same member swimming and training on an indoor bike' }
];

const urlParams = new URLSearchParams(window.location.search);
const themeParam = (urlParams.get('theme') || urlParams.get('variant') || '').toLowerCase();
let heroIndex = 0; // Default signature hero

if (themeParam.includes('boulder') || themeParam.includes('yoga') || themeParam.includes('climb')) {
  heroIndex = 1;
} else if (themeParam.includes('swim') || themeParam.includes('ride') || themeParam.includes('cycl')) {
  heroIndex = 2;
} else if (themeParam.includes('gym') || themeParam.includes('sauna') || themeParam.includes('fit')) {
  heroIndex = 0;
}

const heroMedia = document.querySelector('#hero-media');
const heroImage = document.querySelector('#hero-image');
const heroSource = document.querySelector('#hero-source');
const heroFirst = document.querySelector('#hero-first');
const heroSecond = document.querySelector('#hero-second');
const heroLine = document.querySelector('#hero-line');

HERO_SLIDES.forEach(slide => [slide.desktop, slide.mobile].forEach(src => {
  const image = new Image();
  image.src = src;
}));

function getHeroSource(slide) {
  const isMobile = window.matchMedia('(max-width: 800px)').matches;
  return isMobile ? slide.mobile : slide.desktop;
}

function showHero(index, animate = false) {
  const apply = () => {
    const slide = HERO_SLIDES[index];
    const src = getHeroSource(slide);
    if (heroSource) heroSource.srcset = slide.mobile;
    if (heroImage) {
      heroImage.src = src;
      heroImage.alt = slide.alt;
    }
    if (heroFirst) heroFirst.textContent = slide.first;
    if (heroSecond) heroSecond.textContent = slide.second;
    if (heroLine) heroLine.textContent = slide.line;
    if (heroMedia) heroMedia.classList.remove('is-changing');
  };
  if (!animate) { apply(); return; }
  if (heroMedia) heroMedia.classList.add('is-changing');
  setTimeout(apply, 240);
}

showHero(heroIndex);

const mobileHeroMql = window.matchMedia('(max-width: 800px)');
mobileHeroMql.addEventListener('change', () => {
  showHero(heroIndex, false);
});

/* --- Week Activity Bezier Curve --- */
function roundedCorners(points, radius) {
  if (!points.length) return '';
  const path = [`M ${round(points[0].x)} ${round(points[0].y)}`];
  for (let i = 1; i < points.length - 1; i += 1) {
    const point = points[i], before = points[i - 1], after = points[i + 1];
    const first = Math.hypot(point.x - before.x, point.y - before.y);
    const second = Math.hypot(after.x - point.x, after.y - point.y);
    if (first < 1 || second < 1) continue;
    const r = Math.min(radius, first / 2, second / 2);
    const start = { x: point.x + (before.x - point.x) / first * r, y: point.y + (before.y - point.y) / first * r };
    const end = { x: point.x + (after.x - point.x) / second * r, y: point.y + (after.y - point.y) / second * r };
    path.push(`L ${round(start.x)} ${round(start.y)}`, `Q ${round(point.x)} ${round(point.y)} ${round(end.x)} ${round(end.y)}`);
  }
  const last = points[points.length - 1];
  path.push(`L ${round(last.x)} ${round(last.y)}`);
  return path.join(' ');
}

function layoutJourney() {
  const section = document.querySelector('.week');
  const svg = section?.querySelector('.week__journey');
  const path = svg?.querySelector('path');
  const pass = section?.querySelector('.pass');
  const stops = [...(section?.querySelectorAll('[data-journey-stop]') || [])];
  const end = section?.querySelector('.week__end');
  const gridEl = section?.querySelector('.week__grid');
  if (!section || !path || !pass || stops.length < 2 || !end || !gridEl) return;

  const base = section.getBoundingClientRect();
  const box = element => {
    const rect = element.getBoundingClientRect();
    return { l:rect.left-base.left, r:rect.right-base.left, t:rect.top-base.top, b:rect.bottom-base.top,
      cx:rect.left+rect.width/2-base.left, cy:rect.top+rect.height/2-base.top, w:rect.width, h:rect.height };
  };
  const tiles = stops.map(box), passBox = box(pass), endBox = box(end), grid = box(gridEl);
  svg.setAttribute('viewBox', `0 0 ${round(base.width)} ${round(base.height)}`);
  const anchor = (b, towards) => {
    const dx = towards.x - b.cx, dy = towards.y - b.cy;
    if (Math.abs(dx) >= Math.abs(dy)) return {x:dx >= 0 ? b.r : b.l,y:b.cy,axis:'h'};
    return {x:b.cx,y:dy >= 0 ? b.b : b.t,axis:'v'};
  };
  const between = (from, to) => {
    if (Math.abs(from.y-to.y)<1.5 || Math.abs(from.x-to.x)<1.5) return [];
    if (from.axis==='h' && to.axis==='v') return [{x:to.x,y:from.y}];
    if (from.axis==='v' && to.axis==='h') return [{x:from.x,y:to.y}];
    if (from.axis==='h') { const m=(from.x+to.x)/2; return [{x:m,y:from.y},{x:m,y:to.y}]; }
    const m=(from.y+to.y)/2; return [{x:from.x,y:m},{x:to.x,y:m}];
  };
  const wraps = (a,b) => b.cy > a.cy + a.h*.5 && b.cx < a.cx - 1;
  const wrapRoute = (a,b) => {
    const margin=Math.max(8,Math.min(18,base.width-grid.r,grid.l)), gutter=(a.b+b.t)/2;
    return {leave:{x:a.r,y:a.cy,axis:'h'},enter:{x:b.l,y:b.cy,axis:'h'},via:[{x:grid.r+margin,y:a.cy},{x:grid.r+margin,y:gutter},{x:grid.l-margin,y:gutter},{x:grid.l-margin,y:b.cy}]};
  };

  const stacked = passBox.b < tiles[0].t - 2;
  const nodes=[], points=[];
  let previous, pending=null;
  if (stacked) {
    const start={x:passBox.r,y:passBox.cy,axis:'h'}, turnX=Math.min(base.width-24,Math.max(passBox.r+24,tiles[2].cx));
    const gutter=(passBox.b+tiles[0].t)/2, enter={x:tiles[0].cx,y:tiles[0].t,axis:'v'};
    points.push(start,{x:turnX,y:passBox.cy},{x:turnX,y:gutter},{x:tiles[0].cx,y:gutter},enter); nodes.push(enter);
    pending=wraps(tiles[0],tiles[1])?wrapRoute(tiles[0],tiles[1]):null;
    previous=pending?pending.leave:anchor(tiles[0],{x:tiles[1].cx,y:tiles[1].cy});
    if (previous.x!==enter.x || previous.y!==enter.y) points.push(previous);
  } else {
    previous=anchor(passBox,{x:tiles[0].cx,y:tiles[0].cy}); points.push(previous);
  }
  tiles.forEach((tile,index) => {
    if (stacked && index===0) return;
    const next=tiles[index+1], onward=next||endBox;
    const wrap=next&&wraps(tile,next)?wrapRoute(tile,next):null;
    const enter=pending?pending.enter:anchor(tile,{x:previous.x,y:previous.y});
    const leave=wrap?wrap.leave:anchor(tile,{x:onward.cx,y:onward.cy});
    const firstCorridor=!stacked&&index===0&&previous.axis==='h'&&enter.axis==='h'
      ? [{x:Math.max(previous.x+24,enter.x-46),y:previous.y},{x:Math.max(previous.x+24,enter.x-46),y:enter.y}]
      : between(previous,enter);
    points.push(...(pending?pending.via:firstCorridor),enter); nodes.push(enter);
    if (leave.x!==enter.x || leave.y!==enter.y) points.push(leave);
    previous=leave; pending=wrap;
  });
  const terminal=anchor(endBox,{x:previous.x,y:previous.y});
  points.push(...between(previous,terminal),terminal);
  path.setAttribute('d',roundedCorners(points,22));
  section.style.setProperty('--journey-length',`${Math.ceil(path.getTotalLength())+4}px`);

  let layer=section.querySelector('.week__nodes');
  if (!layer) { layer=document.createElement('div'); layer.className='week__nodes'; layer.setAttribute('aria-hidden','true'); section.appendChild(layer); }
  const all=[...nodes,terminal]; layer.replaceChildren(...all.map((point,index)=>{const dot=document.createElement('span');dot.className=`week__node${index===all.length-1?' week__node--end':''}`;dot.style.left=`${round(point.x)}px`;dot.style.top=`${round(point.y)}px`;return dot;}));
}

const week = document.querySelector('.week');
requestAnimationFrame(() => { layoutJourney(); week?.classList.add('is-drawn'); });
new ResizeObserver(layoutJourney).observe(week);
document.querySelectorAll('.week img').forEach(img => { if (!img.complete) img.addEventListener('load',layoutJourney,{once:true}); });

/* --- State Management --- */
const cityParam = (urlParams.get('city') || '').toLowerCase();
let selectedCity = (cityParam && CITY_VENUES[cityParam]) ? cityParam : 'berlin';
let selectedCategory = 'all';
let selectedBillingTerm = 'annual'; // 'annual' | 'monthly'
let selectedPlanId = 'classic';

/* --- Header & Venue City Dropdowns & Language Popover --- */
const navCityDropdown = document.querySelector('#nav-city-dropdown');
const navCityBtn = document.querySelector('#nav-city-btn');
const navCityText = document.querySelector('#nav-city-text');
const navCityMenu = document.querySelector('#nav-city-menu');

const venueCityDropdown = document.querySelector('#venue-city-dropdown');
const venueCityBtn = document.querySelector('#venue-city-btn');
const venueCityText = document.querySelector('#venue-city-btn-text');
const venueCityMenu = document.querySelector('#venue-city-menu');

const navLangDropdown = document.querySelector('#nav-lang-dropdown');
const navLangBtn = document.querySelector('#nav-lang-btn');
const navLangText = document.querySelector('#nav-lang-text');
const navLangMenu = document.querySelector('#nav-lang-menu');

function populateCityMenu(menuEl, onSelect) {
  if (!menuEl) return;
  const groups = (typeof COUNTRIES_CITIES !== 'undefined' && Array.isArray(COUNTRIES_CITIES)) ? COUNTRIES_CITIES : [
    {
      country: 'Germany',
      flag: '🇩🇪',
      cities: Object.keys(CITY_VENUES).map(k => ({ key: k, name: CITY_VENUES[k].name }))
    }
  ];

  const frag = document.createDocumentFragment();

  groups.forEach(group => {
    const title = document.createElement('div');
    title.className = 'nav-dropdown__group-title';
    title.textContent = `${group.flag} ${group.country}`;
    frag.appendChild(title);

    group.cities.forEach(city => {
      const item = document.createElement('button');
      item.className = `nav-dropdown__item${city.key === selectedCity ? ' is-active' : ''}`;
      item.type = 'button';
      item.textContent = city.name;
      item.addEventListener('click', () => {
        if (city.externalUrl && !CITY_VENUES[city.key]) {
          window.open(city.externalUrl, '_blank');
        } else {
          onSelect(city.key);
        }
        closeAllDropdowns();
      });
      frag.appendChild(item);
    });
  });

  menuEl.replaceChildren(frag);
}

function setupNavDropdowns() {
  populateCityMenu(navCityMenu, selectCity);
  populateCityMenu(venueCityMenu, selectCity);

  // Toggle Nav City
  navCityBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = navCityDropdown.classList.contains('is-open');
    closeAllDropdowns();
    if (!isOpen) {
      navCityDropdown.classList.add('is-open');
      navCityBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Toggle Venue City
  venueCityBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = venueCityDropdown.classList.contains('is-open');
    closeAllDropdowns();
    if (!isOpen) {
      venueCityDropdown.classList.add('is-open');
      venueCityBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Toggle Nav Lang
  navLangBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = navLangDropdown.classList.contains('is-open');
    closeAllDropdowns();
    if (!isOpen) {
      navLangDropdown.classList.add('is-open');
      navLangBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Handle Language Item clicks
  navLangMenu?.querySelectorAll('.nav-dropdown__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      navLangMenu.querySelectorAll('.nav-dropdown__item').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (navLangText) navLangText.textContent = lang.toUpperCase();
      closeAllDropdowns();
    });
  });

  // Close on outside click
  document.addEventListener('click', closeAllDropdowns);
}

function closeAllDropdowns() {
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    dropdown.classList.remove('is-open');
    dropdown.querySelector('.nav-dropdown__btn')?.setAttribute('aria-expanded', 'false');
  });
}

function updateCityUI() {
  const cityName = CITY_VENUES[selectedCity].name;
  if (navCityText) navCityText.textContent = cityName;
  if (venueCityText) venueCityText.textContent = cityName;

  [navCityMenu, venueCityMenu].forEach(menu => {
    menu?.querySelectorAll('.nav-dropdown__item').forEach(item => {
      const isCurrent = item.textContent.trim() === cityName;
      item.classList.toggle('is-active', isCurrent);
    });
  });
}

/* --- Venue Section Controls --- */
const categoryOptions = document.querySelector('#category-options');
const venueGrid = document.querySelector('#venue-grid');
const cityLabel = document.querySelector('#venue-city-label');
const venueFooterCity = document.querySelector('#venue-footer-city');
const moreVenues = document.querySelector('#more-venues');

function renderCategoryFilters() {
  if (!categoryOptions) return;
  const city = CITY_VENUES[selectedCity];

  const categoryButtons = VENUE_CATEGORIES.map(cat => {
    const button = document.createElement('button');
    button.className = 'category-btn';
    button.type = 'button';
    button.innerHTML = `${cat.iconSvg ? `<span class="category-icon">${cat.iconSvg}</span>` : ''}<span>${cat.label}</span>`;
    const active = cat.id === selectedCategory;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.addEventListener('click', () => {
      selectedCategory = cat.id;
      renderCategoryFilters();
      renderVenues();
    });
    return button;
  });

  const browsePill = document.createElement('a');
  browsePill.className = 'category-btn category-btn--browse';
  browsePill.href = city.directoryUrl;
  browsePill.target = '_blank';
  browsePill.rel = 'noopener noreferrer';
  browsePill.innerHTML = `<span>Browse all ${city.name} venues</span> <span class="category-btn__arrow" aria-hidden="true">↗</span>`;

  categoryOptions.replaceChildren(...categoryButtons, browsePill);
}

function renderVenues() {
  if (!venueGrid) return;
  const city = CITY_VENUES[selectedCity];
  const filteredVenues = city.venues.filter(venue => {
    if (selectedCategory === 'all') return true;
    return venue.categories && venue.categories.includes(selectedCategory);
  });

  const venueCards = filteredVenues.map(venue => {
    const card = document.createElement('article');
    card.className = 'venue';

    // Media Wrapper with Category Badge
    const media = document.createElement('div');
    media.className = 'venue__media';
    const img = document.createElement('img');
    img.src = venue.image;
    img.alt = venue.name;
    img.loading = 'lazy';
    img.onerror = () => {
      img.src = 'assets/about-wellness.jpg';
    };

    const badge = document.createElement('span');
    badge.className = 'venue__badge';
    badge.textContent = venue.type;
    media.append(img, badge);

    // Card Body
    const body = document.createElement('div');
    body.className = 'venue__body';

    const name = document.createElement('h3');
    name.textContent = venue.name;

    const meta = document.createElement('p');
    meta.className = 'venue__meta';
    meta.textContent = `📍 ${venue.area} · ${city.name}`;

    const tier = document.createElement('span');
    tier.className = 'venue__tier-tag';
    tier.textContent = `Included in ${venue.tier || 'Classic'}`;

    body.append(name, meta, tier);
    card.append(media, body);
    return card;
  });

  const endCard = document.createElement('a');
  endCard.className = 'venue-end-card';
  endCard.href = pricingUrl();
  endCard.target = '_blank';
  endCard.rel = 'noopener noreferrer';
  const kicker = document.createElement('span');
  kicker.textContent = 'Ready to explore?';
  const title = document.createElement('strong');
  title.textContent = 'View memberships';
  const copy = document.createElement('p');
  copy.textContent = 'Find the right plan for your routine.';
  const arrow = document.createElement('b');
  arrow.textContent = '→';
  endCard.append(kicker, title, copy, arrow);

  venueGrid.replaceChildren(...venueCards, endCard);
}

function selectCity(key) {
  selectedCity = key;
  const city = CITY_VENUES[key];
  if (cityLabel) cityLabel.textContent = city.name;
  if (venueFooterCity) venueFooterCity.textContent = city.name;
  if (moreVenues) {
    moreVenues.href = city.directoryUrl;
    moreVenues.innerHTML = `Browse all ${city.name} venues <span aria-hidden="true">↗</span>`;
  }
  if (finalMembershipCta) finalMembershipCta.href = `https://urbansportsclub.com/en/prices/${key}`;
  updateCityUI();
  renderCategoryFilters();
  renderVenues();
  renderTiers();
}

/* Carousel navigation arrows */
document.querySelectorAll('[data-scroll-venues]').forEach(button => button.addEventListener('click', () => {
  const direction = button.dataset.scrollVenues === 'next' ? 1 : -1;
  venueGrid?.scrollBy({ left: direction * Math.max(280, venueGrid.clientWidth * .72), behavior: 'smooth' });
}));

/* --- Membership tiers: numeral anchor + card rail --- */
const tiersRail = document.querySelector('#tiers-rail');
const termButtons = document.querySelectorAll('.term-switch__btn');
const termAppBenefit = document.querySelector('#term-app-benefit');
const planContinue = document.querySelector('#plan-continue');
const selectedPlanSummary = document.querySelector('#selected-plan-summary');
const finalMembershipCta = document.querySelector('#final-membership-cta');

const PRICING_URL = 'https://urbansportsclub.com/en/prices';

function pricingUrl() {
  return `${PRICING_URL}/${selectedCity}`;
}

const TERM_COPY = {
  monthly:  'First 3 months with MOVE20 · then standard rate',
  annual:   'On a 12-month term · <b>save 15%</b>',
  biennial: 'On a 24-month term · <b>save 20%</b>'
};

const SPEC_ICONS = {
  calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  pin:      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  spa:      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c0-5 3-8 8-8 0 5-3 8-8 8Zm0 0c0-5-3-8-8-8 0 5 3 8 8 8Zm0 0c0-6 2-9 2-12a6 6 0 0 0-4 0c0 3 2 6 2 12Z"/></svg>'
};

function iconForSpec(text) {
  const t = text.toLowerCase();
  if (t.includes('venue')) return SPEC_ICONS.pin;
  if (t.includes('massage') || t.includes('spa') || t.includes('sauna')) return SPEC_ICONS.spa;
  return SPEC_ICONS.calendar;
}

function priceForTerm(plan, term) {
  if (term === 'monthly') return Math.round(plan.monthlyPrice * 0.8);
  if (term === 'annual') return plan.annualPrice;
  return plan.biennialPrice;
}

function basePrice(plan) {
  return plan.monthlyPrice;
}

function capitalise(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function renderTiers() {
  if (!tiersRail) return;
  const term = selectedBillingTerm;

  tiersRail.replaceChildren(...USC_PLANS.map(plan => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `tier-card${plan.id === selectedPlanId ? ' is-selected' : ''}`;
    card.setAttribute('aria-pressed', String(plan.id === selectedPlanId));
    
    const activePrice = priceForTerm(plan, term);
    const origPrice = basePrice(plan);
    card.setAttribute('aria-label', `${plan.name} — ${activePrice} euro per month (regular ${origPrice} euro). Select this plan.`);

    const specs = (plan.tierInfo || '').split('·').map(s => s.trim()).filter(Boolean).slice(0, 2);

    const billedText = term === 'monthly'
      ? `First 3 months with MOVE20 · then ${origPrice}&thinsp;€`
      : (TERM_COPY[term] || '');

    card.innerHTML = `
      ${plan.popular && plan.badge ? `<span class="tier-card__badge">${plan.badge}</span>` : ''}
      <div>
        <h3 class="tier-card__name">${plan.name}</h3>
        <p class="tier-card__for">${plan.headline}</p>
      </div>
      <div class="tier-card__price">
        <span class="tier-card__original"><del>${origPrice}&thinsp;&euro;</del></span>
        <span class="tier-card__amount">${activePrice}&thinsp;&euro;</span>
        <span class="tier-card__per">/ month</span>
      </div>
      <p class="tier-card__billed">${billedText}</p>
      <ul class="tier-card__specs">
        ${specs.map(spec => `<li>${iconForSpec(spec)}<span>${capitalise(spec)}</span></li>`).join('')}
      </ul>
      <span class="tier-card__select" aria-hidden="true">${plan.id === selectedPlanId ? 'Selected' : 'Select'}</span>
    `;
    card.addEventListener('click', () => {
      selectedPlanId = plan.id;
      renderTiers();
    });
    return card;
  }));

  const selectedPlan = USC_PLANS.find(plan => plan.id === selectedPlanId) || USC_PLANS[1];
  const selectedPrice = priceForTerm(selectedPlan, term);
  if (selectedPlanSummary) {
    if (term === 'monthly') {
      selectedPlanSummary.textContent = `${selectedPlan.name} selected · ${selectedPrice} € / month (first 3 months with MOVE20) · then ${selectedPlan.monthlyPrice} € / month`;
    } else {
      selectedPlanSummary.textContent = `${selectedPlan.name} selected · ${selectedPrice} € / month · ${TERM_COPY[term].replace(/<[^>]+>/g, '')}`;
    }
  }
  if (planContinue) {
    planContinue.href = pricingUrl();
    planContinue.innerHTML = `Continue with offer <span aria-hidden="true">→</span>`;
  }
}

function setupTermSwitch() {
  termButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedBillingTerm = btn.getAttribute('data-term');
      termButtons.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-checked', String(isActive));
      });
      renderTiers();
      if (termAppBenefit) {
        termAppBenefit.textContent = selectedBillingTerm === 'monthly'
          ? '✦ Choose 12 or 24 months to include access to selected wellbeing apps'
          : '✦ Included with this term: access to selected wellbeing apps';
      }
    });
  });
}

/* --- Tiers Scroll Hint Button (Mobile) --- */
const tiersScrollBtn = document.querySelector('#tiers-scroll-btn');

function setupTiersScrollHint() {
  if (!tiersRail || !tiersScrollBtn) return;

  const updateHintVisibility = () => {
    const maxScroll = tiersRail.scrollWidth - tiersRail.clientWidth;
    const isAtEnd = maxScroll <= 10 || (tiersRail.scrollLeft >= maxScroll - 15);
    tiersScrollBtn.classList.toggle('is-hidden', isAtEnd);
  };

  tiersScrollBtn.addEventListener('click', () => {
    tiersRail.scrollBy({ left: Math.max(220, tiersRail.clientWidth * 0.65), behavior: 'smooth' });
  });

  tiersRail.addEventListener('scroll', updateHintVisibility, { passive: true });
  window.addEventListener('resize', updateHintVisibility, { passive: true });
  updateHintVisibility();
}

/* --- Sticky Mobile Bottom Bar Observer --- */
const stickyBottomBar = document.querySelector('#sticky-bottom-bar');

function setupStickyBar() {
  if (!stickyBottomBar) return;
  const bottomCta = document.querySelector('.membership-cta');
  const footer = document.querySelector('.site-footer');

  let atBottom = false;

  const updateBar = () => {
    if (window.scrollY > 120 && !atBottom) {
      stickyBottomBar.classList.add('is-visible');
      stickyBottomBar.setAttribute('aria-hidden', 'false');
    } else {
      stickyBottomBar.classList.remove('is-visible');
      stickyBottomBar.setAttribute('aria-hidden', 'true');
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      atBottom = entries.some(e => e.isIntersecting);
      updateBar();
    }, { threshold: 0.05 });

    if (bottomCta) observer.observe(bottomCta);
    if (footer) observer.observe(footer);
  }

  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
}

/* --- Init --- */
setupNavDropdowns();
renderCategoryFilters();
selectCity(selectedCity);
setupTermSwitch();
renderTiers();
setupTiersScrollHint();
setupStickyBar();
