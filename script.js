const round = n => Math.round(n * 10) / 10;

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
    points.push(...(pending?pending.via:between(previous,enter)),enter); nodes.push(enter);
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

const cityOptions = document.querySelector('#city-options');
const areaOptions = document.querySelector('#area-options');
const venueGrid = document.querySelector('#venue-grid');
const cityLabel = document.querySelector('#venue-city-label');
const navCity = document.querySelector('#nav-city');
const moreVenues = document.querySelector('#more-venues');
const locationStatus = document.querySelector('#location-status');
let selectedCity = 'berlin';
let selectedArea = 'all';

function renderCityOptions() {
  cityOptions.replaceChildren(...Object.entries(CITY_VENUES).map(([key, city]) => {
    const button=document.createElement('button');
    button.type='button'; button.textContent=city.name;
    const active=key===selectedCity; button.classList.toggle('is-active',active); button.setAttribute('aria-pressed',String(active));
    button.addEventListener('click',()=>selectCity(key)); return button;
  }));
}

function renderAreas() {
  const city=CITY_VENUES[selectedCity];
  const areas=['all',...new Set(city.venues.map(venue=>venue.area))];
  areaOptions.setAttribute('aria-label',`Choose an area of ${city.name}`);
  areaOptions.replaceChildren(...areas.map(area => {
    const button=document.createElement('button');
    button.type='button'; button.textContent=area==='all'?`All ${city.name}`:area;
    const active=area===selectedArea; button.classList.toggle('is-active',active); button.setAttribute('aria-pressed',String(active));
    button.addEventListener('click',()=>{selectedArea=area;renderAreas();renderVenues();}); return button;
  }));
}

function renderVenues() {
  const city=CITY_VENUES[selectedCity];
  const venues=city.venues.filter(venue=>selectedArea==='all'||venue.area===selectedArea);
  venueGrid.replaceChildren(...venues.map(venue => {
    const card=document.createElement('article'); card.className='venue';
    const img=document.createElement('img'); img.src=venue.image; img.alt=venue.name; img.loading='lazy';
    const copy=document.createElement('div'), type=document.createElement('p'), name=document.createElement('h3'), area=document.createElement('span');
    type.textContent=venue.type; name.textContent=venue.name; area.textContent=venue.area;
    copy.append(type,name,area); card.append(img,copy); return card;
  }), (() => {
    const card=document.createElement('a'); card.className='venue-end-card'; card.href='#membership';
    const kicker=document.createElement('span'); kicker.textContent='Seen enough?';
    const title=document.createElement('strong'); title.textContent='Find my fit';
    const copy=document.createElement('p'); copy.textContent='Turn the places you like into the right membership.';
    const arrow=document.createElement('b'); arrow.textContent='→';
    card.append(kicker,title,copy,arrow); return card;
  })());
}

function selectCity(key) {
  selectedCity=key; selectedArea='all';
  const city=CITY_VENUES[key]; cityLabel.textContent=city.name; navCity.textContent=city.name;
  moreVenues.href=city.directoryUrl; moreVenues.firstChild.textContent=`See more venues in ${city.name} `;
  renderCityOptions(); renderAreas(); renderVenues();
}

function distanceKm(a,b) {
  const rad=n=>n*Math.PI/180, earth=6371, dLat=rad(b.lat-a.lat), dLng=rad(b.lng-a.lng);
  const value=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;
  return earth*2*Math.atan2(Math.sqrt(value),Math.sqrt(1-value));
}

document.querySelector('#detect-location')?.addEventListener('click', () => {
  if (!navigator.geolocation) { locationStatus.textContent='Location detection is unavailable. Choose a city above.'; return; }
  locationStatus.textContent='Checking your nearest demo city…';
  navigator.geolocation.getCurrentPosition(position => {
    const point={lat:position.coords.latitude,lng:position.coords.longitude};
    const nearest=Object.entries(CITY_VENUES).map(([key,city])=>({key,city,distance:distanceKm(point,city.centre)})).sort((a,b)=>a.distance-b.distance)[0];
    if (nearest.distance>120) { locationStatus.textContent='None of the four demo cities appears to be nearby. Choose a city above.'; return; }
    selectCity(nearest.key); locationStatus.textContent=`Showing ${nearest.city.name}, your nearest demo city. Your location stays in this browser.`;
  }, () => { locationStatus.textContent='Location was not shared. Choose a city above.'; }, {enableHighAccuracy:false,timeout:8000,maximumAge:300000});
});

selectCity(selectedCity);

document.querySelectorAll('[data-scroll-venues]').forEach(button => button.addEventListener('click', () => {
  const direction=button.dataset.scrollVenues==='next'?1:-1;
  venueGrid.scrollBy({left:direction*Math.max(280,venueGrid.clientWidth*.72),behavior:'smooth'});
}));
