// An optional, very quiet paper-like flutter. Silence until explicitly enabled.
(() => {
  if (!document.querySelector('.memory-butterfly')) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'memory-wing-sound';
  control.setAttribute('aria-pressed', 'false');
  control.setAttribute('aria-label', 'Enable faint butterfly sound');
  control.title = 'Faint butterfly sound';
  control.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 6 5 8H2v4h3l3 2Z"/><path class="sound-off" d="m12 8 4 4m0-4-4 4"/><path class="sound-on" d="M11 7q3 3 0 6m3-8q5 5 0 10"/></svg>';
  document.body.append(control);
  let context, noise, filter, panner, master, timer, nextRustle = 0, enabled = false, finished = false;
  function updateVisibility() {
    const wing = document.querySelector('.memory-butterfly');
    const visible = wing && Number(wing.dataset.progress || 0) > 0;
    control.hidden = !visible || reduced.matches || !!document.querySelector('.memory-world-dialog[open]');
    return wing;
  }
  function flutter() {
    const wing = updateVisibility();
    if (!enabled || !wing || control.hidden || document.hidden || context.state !== 'running') return;
    const rect = wing.getBoundingClientRect();
    const now = context.currentTime;
    if (now < nextRustle) return;
    nextRustle = now + 1.1 + Math.random() * 1.6;
    panner.pan.setTargetAtTime(Math.max(-.15, Math.min(.15, (rect.x / innerWidth - .5) * .3)), now, .6);
    const source = context.createBufferSource(), envelope = context.createGain();
    source.buffer = noise;
    source.connect(envelope).connect(filter);
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(.35 + Math.random() * .15, now + .045);
    envelope.gain.exponentialRampToValueAtTime(.001, now + .23);
    source.start(now, (now * .37) % .7, .25);
    source.onended = () => { source.disconnect(); envelope.disconnect(); };
  }
  control.addEventListener('click', async () => {
    enabled = !enabled;
    if (!context && enabled) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) { control.hidden = true; return; }
      context = new Audio();
      noise = context.createBuffer(1, context.sampleRate, context.sampleRate);
      const data = noise.getChannelData(0);
      let air = 0;
      for (let i = 0; i < data.length; i++) {
        air = .65 * air + .35 * (Math.random() * 2 - 1);
        data[i] = air;
      }
      filter = context.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 1100; filter.Q.value = .4;
      panner = context.createStereoPanner(); master = context.createGain(); master.gain.value = .008;
      filter.connect(panner).connect(master).connect(context.destination);
    }
    try { if (enabled) await context.resume(); else await context?.suspend(); }
    catch { enabled = false; }
    control.setAttribute('aria-pressed', String(enabled));
    control.setAttribute('aria-label', enabled ? 'Mute butterfly sound' : 'Enable faint butterfly sound');
  });
  function finish() {
    if (finished) return;
    finished = true; clearInterval(timer); control.remove();
    if (context && context.state !== 'closed') context.close();
  }
  addEventListener('memory-butterfly-finished', finish, { once: true });
  timer = setInterval(flutter, 465);
  updateVisibility();
})();
