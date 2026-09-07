const round = n => Math.round(n * 10) / 10;

const HERO_SLIDES = [
  { desktop: 'assets/banner-variants/gym-sauna-desktop.png', mobile: 'assets/banner-variants/gym-sauna-mobile.png', first: 'GYM.', second: 'SAUNA.', line: 'Train. Recover. Same membership.', alt: 'The same member training at the gym and recovering in a sauna' },
  { desktop: 'assets/banner-variants/bouldering-yoga-desktop.png', mobile: 'assets/banner-variants/bouldering-yoga-mobile.png', first: 'BOULDER.', second: 'YOGA.', line: 'Climb. Reset. Same membership.', alt: 'The same member bouldering and practising yoga' },
  { desktop: 'assets/banner-variants/swimming-cycling-desktop.png', mobile: 'assets/banner-variants/swimming-cycling-mobile.png', first: 'SWIM.', second: 'RIDE.', line: 'Two ways to move. Same membership.', alt: 'The same member swimming and training on an indoor bike' }
];

const heroMedia = document.querySelector('#hero-media');
const heroImage = document.querySelector('#hero-image');
const heroSource = document.querySelector('#hero-source');
const heroFirst = document.querySelector('#hero-first');
const heroSecond = document.querySelector('#hero-second');
const heroLine = document.querySelector('#hero-line');
let heroIndex = Math.floor(Math.random() * HERO_SLIDES.length);

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

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % HERO_SLIDES.length;
    showHero(heroIndex, true);
  }, 7000);
}

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
let selectedCity = 'berlin';
let selectedCategory = 'all';
let selectedBillingTerm = 'annual'; // 'annual' | 'monthly'

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
  menuEl.replaceChildren(...Object.entries(CITY_VENUES).map(([key, city]) => {
    const item = document.createElement('button');
    item.className = `nav-dropdown__item${key === selectedCity ? ' is-active' : ''}`;
    item.type = 'button';
    item.textContent = city.name;
    item.addEventListener('click', () => {
      onSelect(key);
      closeAllDropdowns();
    });
    return item;
  }));
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
const moreVenuesHeader = document.querySelector('#more-venues-header');

function renderCategoryFilters() {
  if (!categoryOptions) return;
  categoryOptions.replaceChildren(...VENUE_CATEGORIES.map(cat => {
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
  }));
}

function renderVenues() {
  if (!venueGrid) return;
  const city = CITY_VENUES[selectedCity];
  const filteredVenues = city.venues.filter(venue => {
    if (selectedCategory === 'all') return true;
    return venue.categories && venue.categories.includes(selectedCategory);
  });

  const venueCards = filteredVenues.map(venue => {
    const card = document.createElement('a');
    card.className = 'venue';
    card.href = venue.sourceUrl;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    // Media Wrapper with Category Badge
    const media = document.createElement('div');
    media.className = 'venue__media';
    const img = document.createElement('img');
    img.src = venue.image;
    img.alt = venue.name;
    img.loading = 'lazy';

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
  endCard.href = '#membership';
  const kicker = document.createElement('span');
  kicker.textContent = 'Seen enough?';
  const title = document.createElement('strong');
  title.textContent = 'See memberships';
  const copy = document.createElement('p');
  copy.textContent = 'Choose the right plan for your routine.';
  const arrow = document.createElement('b');
  arrow.textContent = '→';
  endCard.append(kicker, title, copy, arrow);

  venueGrid.replaceChildren(...venueCards, endCard);
}

function selectCity(key) {
  selectedCity = key;
  const city = CITY_VENUES[key];
  if (cityLabel) cityLabel.textContent = city.name;
  if (moreVenuesHeader) {
    moreVenuesHeader.href = city.directoryUrl;
    moreVenuesHeader.innerHTML = `Browse all ${city.name} venues <span aria-hidden="true">↗</span>`;
  }
  updateCityUI();
  renderVenues();
}

/* Carousel navigation arrows */
document.querySelectorAll('[data-scroll-venues]').forEach(button => button.addEventListener('click', () => {
  const direction = button.dataset.scrollVenues === 'next' ? 1 : -1;
  venueGrid?.scrollBy({ left: direction * Math.max(280, venueGrid.clientWidth * .72), behavior: 'smooth' });
}));

/* --- Find My Fit Interactive Membership Plans Section --- */
let selectedPlanId = 'classic';
const plansRows = document.querySelector('#plans-rows');
const planPreviewCard = document.querySelector('#plan-preview-card');
const billingButtons = document.querySelectorAll('.billing-toggle__btn');

function renderFindMyFitPlans() {
  const activePlan = USC_PLANS.find(p => p.id === selectedPlanId) || USC_PLANS[1];
  const isAnnual = selectedBillingTerm === 'annual';

  // Render Left Rows
  if (plansRows) {
    plansRows.replaceChildren(...USC_PLANS.map(plan => {
      const isSelected = plan.id === selectedPlanId;
      const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

      const row = document.createElement('div');
      row.className = `plan-row${isSelected ? ' is-selected' : ''}`;
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.setAttribute('aria-pressed', String(isSelected));

      if (plan.popular && plan.badge) {
        const badge = document.createElement('span');
        badge.className = 'plan-row__popular-badge';
        badge.textContent = plan.badge;
        row.appendChild(badge);
      }

      const iconWrap = document.createElement('div');
      iconWrap.className = 'plan-row__icon-wrap';
      iconWrap.textContent = plan.emoji || '✨';

      const main = document.createElement('div');
      main.className = 'plan-row__main';
      main.innerHTML = `
        <span class="plan-row__headline">${plan.headline}</span>
        <span class="plan-row__tier"><strong>${plan.name}</strong> · ${plan.tierInfo}</span>
      `;

      const pricing = document.createElement('div');
      pricing.className = 'plan-row__pricing';
      pricing.innerHTML = `
        <div class="plan-row__amount">${price} €</div>
        <div class="plan-row__period">/ month</div>
      `;

      const chevron = document.createElement('div');
      chevron.className = 'plan-row__chevron';
      chevron.innerHTML = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

      row.append(iconWrap, main, pricing, chevron);

      const selectThisPlan = () => {
        selectedPlanId = plan.id;
        renderFindMyFitPlans();
      };

      row.addEventListener('click', selectThisPlan);
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectThisPlan();
        }
      });

      return row;
    }));
  }

  // Render Right Dynamic Preview Card
  if (planPreviewCard) {
    const activePrice = isAnnual ? activePlan.annualPrice : activePlan.monthlyPrice;
    const activePeriodBadge = isAnnual ? '12 months (Save 15%)' : 'Flexible Monthly';

    const featureItems = activePlan.features.map(feat => `<li>${feat}</li>`).join('');

    planPreviewCard.innerHTML = `
      <div class="plan-preview-card__head">
        <div class="plan-preview-card__title-wrap">
          <span class="plan-preview-card__emoji">${activePlan.emoji}</span>
          <h3 class="plan-preview-card__title">${activePlan.name}</h3>
        </div>
        <div class="plan-preview-card__price-wrap">
          <div class="plan-preview-card__amount">${activePrice} € <span style="font-size:16px;font-weight:600;color:#6b7280;">/ mo</span></div>
          <span class="plan-preview-card__period">${activePeriodBadge}</span>
        </div>
      </div>

      <p class="plan-preview-card__desc">${activePlan.description}</p>

      <ul class="plan-preview-card__features">
        ${featureItems}
      </ul>

      <a class="plan-preview-card__btn" href="${activePlan.url}" target="_blank" rel="noopener noreferrer">
        Choose ${activePlan.name} and continue <span aria-hidden="true">→</span>
      </a>

      <a class="plan-preview-card__secondary-link" href="#venues">
        Get a personalized routine →
      </a>

      <div class="plan-preview-card__save-note">
        <span>🔖</span>
        <span><strong>Save for later:</strong> Keeps your selection and brings you back here.</span>
      </div>
    `;
  }
}

function setupBillingToggle() {
  billingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const term = btn.getAttribute('data-term');
      selectedBillingTerm = term;
      billingButtons.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-checked', String(isActive));
      });
      renderFindMyFitPlans();
    });
  });
}

/* --- Sticky Mobile Bottom Bar Observer --- */
const stickyBottomBar = document.querySelector('#sticky-bottom-bar');

function setupStickyBar() {
  if (!stickyBottomBar) return;

  const handleScroll = () => {
    if (window.scrollY > 80) {
      stickyBottomBar.classList.add('is-visible');
      stickyBottomBar.setAttribute('aria-hidden', 'false');
    } else {
      stickyBottomBar.classList.remove('is-visible');
      stickyBottomBar.setAttribute('aria-hidden', 'true');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Init --- */
setupNavDropdowns();
renderCategoryFilters();
selectCity(selectedCity);
setupBillingToggle();
renderFindMyFitPlans();
setupStickyBar();


