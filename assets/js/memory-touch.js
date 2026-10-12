// Small encounters inside the SVG scenes. Canvas worlds own their interactions.
(() => {
  const essay = document.querySelector('.memory-essay[data-visuals="living"]');
  if (!essay) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ns = 'http://www.w3.org/2000/svg';
  const targets = {
    'art-burns': '[data-memory-object="mouse"]',
    'art-nalan': '[data-memory-object="leaf"]',
    'art-pushkin': '[data-memory-object="sheet"]'
  };
  const live = art => art.dataset.state === 'present' && !art.querySelector('canvas');
  for (const art of essay.querySelectorAll('.memory-art')) {
    const svg = art.querySelector('svg');
    if (!svg) continue;
    const paragraph = art.closest('figure')?.querySelector('blockquote p');
    const firstLine = paragraph?.innerHTML.split(/<br\s*\/?\s*>/i)[0];
    const text = document.createElement('span');
    text.innerHTML = firstLine || '';
    const phrase = text.textContent.trim().match(/^.*?[.!?。！？](?:\s|$)/)?.[0]?.trim() || text.textContent.trim();
    let last = 0;
    function encounter(event, linger = false) {
      if (!live(art) || reduced.matches || performance.now() - last < 1000) return;
      last = performance.now();
      const r = art.getBoundingClientRect();
      const x = event.clientX - r.left, y = event.clientY - r.top;
      const mark = document.createElement('span');
      mark.className = 'memory-encounter';
      mark.style.left = `${x}px`;
      mark.style.top = `${y}px`;
      if (phrase && phrase.length < 190) {
        mark.textContent = phrase;
        mark.classList.add('memory-encounter-text');
      } else mark.classList.add('memory-encounter-ripple');
      if (linger) mark.style.animationDuration = '6s';
      mark.setAttribute('aria-hidden', 'true');
      art.append(mark);
      mark.addEventListener('animationend', () => mark.remove(), { once: true });
      const marks = art.querySelectorAll('.memory-encounter');
      if (marks.length > 3) marks[0].remove();
    }
    art.addEventListener('pointermove', event => encounter(event), { passive: true });
    art.addEventListener('click', event => encounter(event, true));
    const selector = Object.entries(targets).find(([name]) => art.classList.contains(name))?.[1];
    if (!selector) continue;
    for (const object of svg.querySelectorAll(selector)) {
      const carrier = document.createElementNS(ns, 'g');
      object.replaceWith(carrier);
      carrier.append(object);
      carrier.classList.add('memory-movable');
      let drag = null, offset = { x: 0, y: 0 };
      const point = event => {
        const matrix = carrier.parentNode.getScreenCTM();
        return matrix ? new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse()) : null;
      };
      carrier.addEventListener('pointerdown', event => {
        if (!live(art) || event.button !== 0) return;
        const p = point(event);
        if (!p) return;
        drag = { pointer: event.pointerId, x: p.x, y: p.y, start: { ...offset } };
        carrier.setPointerCapture(event.pointerId);
        art.classList.add('memory-dragging');
        event.preventDefault();
      });
      carrier.addEventListener('pointermove', event => {
        if (!drag || event.pointerId !== drag.pointer || !live(art)) return;
        const p = point(event);
        if (!p) return;
        const limit = svg.viewBox.baseVal.width * .18;
        offset.x = Math.max(-limit, Math.min(limit, drag.start.x + p.x - drag.x));
        offset.y = Math.max(-limit / 2, Math.min(limit / 2, drag.start.y + p.y - drag.y));
        carrier.setAttribute('transform', `translate(${offset.x} ${offset.y})`);
      });
      const release = () => { drag = null; art.classList.remove('memory-dragging'); };
      carrier.addEventListener('pointerup', release);
      carrier.addEventListener('pointercancel', release);
      carrier.addEventListener('lostpointercapture', release);
    }
  }
})();
