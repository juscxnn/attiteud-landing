/**
 * Strata: three rounded plates under a small beacon. The pointer picks the
 * plate it is on; that plate lifts and takes the bright edge, and the beacon
 * gives up its rest light. The slider is the gap between the plates.
 *
 * The pattern: discrete parts. Tweens for the chosen plate, a hit test on each
 * plate's resting top plane, and a rest that is a stepped, off-centre stack
 * rather than a flat pile.
 */
const {
  Cam, facing, fit, flatDot, mk, place, pointer, prism, proj, put, rings,
  register, solid, tdone, tset, tval, tween, unproj, disposer,
} = HL;

const LIFT = 8, FIT_GAP = 20;
const POST = { half: 5, r: 1.5, h: 14 };
const TIERS = [
  { cx: -10, cy: 10, half: 64, r: 10, z0: 0, z1: 8, gm: 0 },
  { cx: 0, cy: 0, half: 50, r: 9, z0: 8, z1: 16, gm: 1 },
  { cx: 10, cy: -10, half: 38, r: 8, z0: 16, z1: 24, gm: 2 },
];

function mount({ stage, svg, read }, gap) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.65);
  const top = TIERS[2];
  const topZ = (g, lift = 0) => top.z1 + top.gm * g + lift;
  const worst = TIERS.flatMap((t) => {
    const x0 = t.cx - t.half, x1 = t.cx + t.half;
    const y0 = t.cy - t.half, y1 = t.cy + t.half;
    const z0 = t.z0 + t.gm * FIT_GAP, z1 = t.z1 + t.gm * FIT_GAP;
    return [[x0, y0, z0], [x1, y0, z0], [x0, y1, z0], [x1, y1, z0],
      [x0, y0, z1 + LIFT], [x1, y0, z1 + LIFT], [x0, y1, z1 + LIFT], [x1, y1, z1 + LIFT]];
  });
  fit(C, [...worst, [top.cx, top.cy, topZ(FIT_GAP, LIFT) + POST.h]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const tiers = TIERS.map((t) => {
    const [ring, inner] = rings(t.cx - t.half, t.cy - t.half,
      t.cx + t.half, t.cy + t.half, t.r, 1.6);
    return { ...t, ring, inner, el: solid(g), lift: tween(0), drawn: NaN };
  });
  const post = solid(g), dot = flatDot(g, C, 1.2, "dot");
  let active = -1;

  function drawTier(t, lift, i) {
    put(t.el, prism(P, front, t.ring, t.inner,
      t.z0 + t.gm * gap + lift, t.z1 + t.gm * gap + lift));
    t.el.sil.classList.toggle("hi", i === active);
  }

  function drawPost(lift) {
    const z0 = topZ(gap, lift);
    const [ring, inner] = rings(top.cx - POST.half, top.cy - POST.half,
      top.cx + POST.half, top.cy + POST.half, POST.r, 0.7);
    put(post, prism(P, front, ring, inner, z0, z0 + POST.h));
    place(dot, P(top.cx, top.cy, z0 + POST.h + 0.5));
  }

  function refresh(now) {
    tiers.forEach((t, i) => { t.drawn = NaN; drawTier(t, tval(t.lift, now), i); });
    drawPost(tval(tiers[2].lift, now));
    B.wake();
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    tiers.forEach((t, i) => {
      const l = tval(t.lift, now);
      if (l !== t.drawn) { t.drawn = l; drawTier(t, l, i); }
      if (!tdone(t.lift, now)) moving = true;
    });
    drawPost(tval(tiers[2].lift, now));
    return moving;
  });
  bag.add(B.unregister);

  function setActive(a) {
    if (a === active) return;
    const now = performance.now();
    active = a;
    tiers.forEach((t, i) => {
      tset(t.lift, i === a ? LIFT : 0, now, 0);
      t.el.sil.classList.toggle("hi", i === a);
    });
    dot.classList.toggle("off", a >= 0);
    read.textContent = a < 0 ? "rest" : `tier ${a + 1}`;
    B.wake();
  }

  function hit(p) {
    let best = -1, bestZ = -1e9;
    tiers.forEach((t, i) => {
      const z = t.z1 + t.gm * gap;
      const [x, y] = unproj(C, p[0], p[1], z);
      if (x >= t.cx - t.half && x <= t.cx + t.half &&
        y >= t.cy - t.half && y <= t.cy + t.half && z > bestZ) {
        bestZ = z; best = i;
      }
    });
    return best;
  }

  refresh(performance.now());
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { gap = v; refresh(performance.now()); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "strata",
  means: "Three strata under a beacon: the one under the pointer lifts and takes the light.",
  rules: [1, 4, 5, 9],
  range: [8, 12, 20],
  tour: [[200, 120], [200, 168], [200, 220], null],
  mount,
});
