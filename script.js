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

document.querySelectorAll('[data-area]').forEach(button => button.addEventListener('click', () => {
  const area=button.dataset.area;
  document.querySelectorAll('[data-area]').forEach(item => { const active=item===button; item.classList.toggle('is-active',active); item.setAttribute('aria-pressed',String(active)); });
  document.querySelectorAll('[data-venue-area]').forEach(card => { card.hidden=area!=='all'&&card.dataset.venueArea!==area; });
}));
