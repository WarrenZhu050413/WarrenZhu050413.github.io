(() => {
  const essay = document.querySelector('.memory-essay');
  if (!essay) return;
  if (essay.dataset.unfolding === 'true') return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const passages = [...essay.querySelectorAll('.memory-own p, blockquote p')];
  const artworks = essay.dataset.visuals === 'living' ? [] : [...essay.querySelectorAll('.memory-art')];
  const pointers = new WeakMap();
  const returns = new WeakMap();
  let motion = !reduced.matches;
  let pending = false;
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
  function render() {
    pending = false;
    if (!motion) return;
    for (const passage of passages) {
      const r = passage.getBoundingClientRect();
      const clarity = smooth((innerHeight - r.top) / (innerHeight * .38)) * smooth(r.bottom / (innerHeight * .3));
      passage.style.setProperty('--clarity', String(.08 + clarity * .92));
    }
    for (const art of artworks) {
      const r = art.getBoundingClientRect();
      const p = pointers.get(art) ?? clamp((innerHeight - r.top) / (innerHeight + r.height));
      art.style.setProperty('--passage', p.toFixed(3));
      if (!art.classList.contains('art-wong')) {
        art.style.setProperty('--blur', `${p * 2.6}px`);
        art.style.setProperty('--veil', String(.18 + p * .57));
      }
    }
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(render); } }
  function setMotion(value) {
    motion = value;
    essay.classList.toggle('is-motion', value);
    render();
  }
  for (const art of artworks) {
    art.tabIndex = 0;
    art.setAttribute('role', 'button');
    art.setAttribute('aria-pressed', 'false');
    const description = art.getAttribute('aria-label');
    art.setAttribute('aria-label', `${description} Click to keep this impression clear.`);
    function keep() {
      if (!motion) return;
      const kept = art.classList.toggle('is-kept');
      art.setAttribute('aria-pressed', String(kept));
    }
    art.addEventListener('click', keep);
    function clearAt(x, y) {
      clearTimeout(returns.get(art));
      art.style.setProperty('--clear-x', `${x}px`);
      art.style.setProperty('--clear-y', `${y}px`);
      art.style.setProperty('--clear-radius', '105px');
      art.classList.add('is-clearing');
    }
    art.addEventListener('pointermove', event => {
      if (!motion) return;
      const r = art.getBoundingClientRect();
      pointers.set(art, clamp((event.clientX - r.left) / r.width));
      clearAt(event.clientX - r.left, event.clientY - r.top);
      schedule();
    }, { passive: true });
    art.addEventListener('pointerleave', () => {
      pointers.delete(art);
      // The clear patch lingers, then clouds over again.
      const started = performance.now();
      function cloud() {
        const remaining = Math.max(0, 1 - (performance.now() - started) / 1800);
        art.style.setProperty('--clear-radius', `${105 * remaining}px`);
        if (remaining) returns.set(art, setTimeout(cloud, 50));
        else art.classList.remove('is-clearing');
      }
      cloud();
      schedule();
    });
    art.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        keep();
      }
    });
    art.addEventListener('blur', () => {
      art.style.setProperty('--clear-radius', '0px');
      art.classList.remove('is-clearing');
    });
  }
  reduced.addEventListener('change', event => setMotion(!event.matches));
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  setMotion(motion);
})();
