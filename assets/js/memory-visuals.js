// Living scenes. A scene moves only while it is the reader's present. Once read
// past, it stops on the frame it was left at and stays that way: scrolling back
// does not revive it, and a pointer can only breathe on the glass.
// A pointer resting on a living scene keeps it present until it slips away.
(() => {
  const essay = document.querySelector('.memory-essay[data-visuals="living"]');
  if (!essay) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const scenes = [...essay.querySelectorAll('.memory-art')].map(art => {
    const svg = art.querySelector('svg');
    svg?.pauseAnimations?.();
    art.dataset.state = 'unseen';
    return { art, svg, held: false, running: false, lastBreath: 0, breath: null, breathTimer: null };
  });

  function run(scene, on) {
    on = on && !reduced.matches;
    if (on === scene.running || !scene.svg?.pauseAnimations) return;
    scene.running = on;
    on ? scene.svg.unpauseAnimations() : scene.svg.pauseAnimations();
  }

  function set(scene) {
    scene.art.dataset.state = 'set';
    run(scene, false);
  }

  let pending = false;
  function update() {
    pending = false;
    if (essay.dataset.unfolding === 'true') return;
    const vh = innerHeight;
    for (const scene of scenes) {
      const state = scene.art.dataset.state;
      if (state === 'set') continue;
      const r = scene.art.getBoundingClientRect();
      const visible = r.bottom > 0 && r.top < vh;
      if (state === 'unseen' && r.top < vh * .8 && r.bottom > vh * .2) scene.art.dataset.state = 'present';
      if (scene.art.dataset.state !== 'present') continue;
      if (r.bottom < vh * .32 && !scene.held) { set(scene); continue; }
      if (!reduced.matches) scene.art.style.setProperty('--pass', clamp((vh - r.top) / (vh + r.height), 0, 1).toFixed(3));
      run(scene, visible);
    }
  }
  const schedule = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };

  for (const scene of scenes) {
    const { art } = scene;
    art.addEventListener('pointerenter', () => { scene.held = art.dataset.state === 'present'; });
    art.addEventListener('pointerleave', () => {
      scene.held = false;
      if (art.dataset.state === 'present') { art.style.setProperty('--look-x', '0'); art.style.setProperty('--look-y', '0'); }
      schedule();
    });
    art.addEventListener('pointermove', event => {
      const r = art.getBoundingClientRect();
      const x = event.clientX - r.left, y = event.clientY - r.top;
      if (art.dataset.state === 'present') {
        scene.held = true;
        if (reduced.matches) return;
        art.style.setProperty('--look-x', clamp(x / r.width * 2 - 1, -1, 1).toFixed(3));
        art.style.setProperty('--look-y', clamp(y / r.height * 2 - 1, -1, 1).toFixed(3));
      } else if (art.dataset.state === 'set' && !reduced.matches) {
        const now = performance.now();
        if (now - scene.lastBreath < 40) return;
        scene.lastBreath = now;
        if(!scene.breath){
          scene.breath=document.createElement('span');
          scene.breath.className='mv-breath';
          art.appendChild(scene.breath);
        }
        scene.breath.style.left=`${x}px`;scene.breath.style.top=`${y}px`;
        scene.breath.classList.add('is-visible');
        clearTimeout(scene.breathTimer);
        scene.breathTimer=setTimeout(()=>scene.breath.classList.remove('is-visible'),650);
      }
    }, { passive: true });

  }

  reduced.addEventListener('change', () => scenes.forEach(s => run(s, s.art.dataset.state === 'present')));
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  schedule();
})();
