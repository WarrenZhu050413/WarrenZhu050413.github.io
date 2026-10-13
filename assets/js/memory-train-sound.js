// A distant rolling body, paired rail joints, and a little steam. The painting
// owns the movement; sound follows its distance and speed, never a second clock.
(() => {
  const soundtrack = document.getElementById('memory-soundtrack');
  if (!soundtrack) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const smooth = value => { const t = clamp(value, 0, 1); return t * t * (3 - 2 * t); };
  let context, master, pan, roll, steam, impactBuffer;
  let frame = null, sleepTimer = null, lastUpdate = 0, previousFront = null, joint = null;
  let resuming = false;
  const impacts = new Set();

  function audible(state = window.memoryTrain?.state()) {
    return state?.running && !soundtrack.paused && !soundtrack.ended &&
      !soundtrack.seeking && !soundtrack.muted && soundtrack.volume > 0 &&
      !document.hidden && !reduced.matches && !document.querySelector('.memory-world-dialog[open]');
  }

  function filter(type, frequency, q = .7) {
    const node = context.createBiquadFilter();
    node.type = type; node.frequency.value = frequency; node.Q.value = q;
    return node;
  }

  function noise(seconds, brown = false) {
    const buffer = context.createBuffer(1, Math.ceil(seconds * context.sampleRate), context.sampleRate);
    const data = buffer.getChannelData(0);
    let seed = 1945, previous = 0;
    for (let i = 0; i < data.length; i++) {
      seed = (seed * 16807) % 2147483647;
      const white = seed / 1073741823.5 - 1;
      previous = (previous + white * .025) / 1.025;
      data[i] = brown ? previous * 4 : white;
    }
    // A short crossfade makes the loop seam inaudible.
    const seam = Math.min(512, Math.floor(data.length / 4)), edge = data[data.length - 1];
    for (let i = 0; i < seam; i++) {
      const t = i / seam;
      data[i] = edge * (1 - t) + data[i] * t;
    }
    return buffer;
  }

  function bed(buffer, high, low) {
    const source = context.createBufferSource();
    const gain = context.createGain();
    gain.gain.value = 0; source.buffer = buffer; source.loop = true;
    source.connect(filter('highpass', high)).connect(filter('lowpass', low)).connect(gain).connect(pan);
    source.start();
    return gain;
  }

  function prepare() {
    if (context || soundtrack.paused) return;
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    context = new Audio({ latencyHint: 'playback' });
    master = context.createGain(); master.gain.value = 0;
    pan = context.createStereoPanner();
    pan.connect(master).connect(context.destination);
    roll = bed(noise(3.7, true), 48, 420);
    steam = bed(noise(4.3), 650, 2400);
    impactBuffer = noise(.11);
    const data = impactBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / context.sampleRate;
      data[i] *= (1 - Math.exp(-t * 1800)) * Math.exp(-t * 65);
    }
  }

  function tap(at, strength) {
    const source = context.createBufferSource(), gain = context.createGain();
    const tone = filter('lowpass', 1150);
    source.buffer = impactBuffer; gain.gain.value = strength;
    source.connect(tone).connect(gain).connect(pan);
    impacts.add(source);
    source.onended = () => { impacts.delete(source); source.disconnect(); tone.disconnect(); gain.disconnect(); };
    source.start(at);
  }

  function quiet() {
    soundtrack.dataset.trainSound = 'silent';
    previousFront = joint = null;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; lastUpdate = 0;
    if (!context || context.state === 'closed') return;
    master.gain.setTargetAtTime(0, context.currentTime, .012);
    // A paused context must not save the second half of a clack for later.
    for (const source of impacts) source.stop();
    impacts.clear();
    clearTimeout(sleepTimer);
    sleepTimer = setTimeout(() => {
      if (!audible() && context.state === 'running') context.suspend().catch(() => {});
    }, 100);
  }

  function update(now) {
    frame = null;
    const state = window.memoryTrain?.state();
    if (!audible(state)) { quiet(); return; }
    if (!context || context.state !== 'running') { wake(); return; }
    if (now - lastUpdate >= 30) {
      lastUpdate = now;
      const time = context.currentTime;
      const pace = clamp(state.pace, 0, 1), depth = clamp(state.depth, .2, 1.6);
      const envelope = smooth(state.progress / .09) * smooth((1 - state.progress) / .13);
      const proximity = .22 + .78 * smooth((depth - .2) / 1.4);
      // Kept below the piano, including when its volume changes or it is muted.
      master.gain.setTargetAtTime(.19 * soundtrack.volume / .28 * envelope * proximity, time, .18);
      pan.pan.setTargetAtTime(clamp(state.x * .62, -.7, .7), time, .3);
      roll.gain.setTargetAtTime((.045 + .10 * pace) * (.92 + .08 * Math.sin(state.front * 2.1)), time, .12);
      steam.gain.setTargetAtTime(state.steaming ? .032 * (.35 + .65 * pace) : 0, time, .22);
      const nextJoint = Math.floor(state.front / 1.6);
      // A seek or first arrival establishes a new position without a burst of
      // missed clacks. Otherwise one pair belongs to each joint the train crosses.
      if (previousFront !== null && state.front >= previousFront && state.front - previousFront < 3 &&
          joint !== null && nextJoint > joint && state.speed > .05) {
        const strength = (.055 + .055 * pace) * (1 + (nextJoint % 3 - 1) * .06);
        tap(time + .008, strength);
        tap(time + clamp(.34 / state.speed, .045, .16), strength * .65);
      }
      previousFront = state.front; joint = nextJoint;
      soundtrack.dataset.trainSound = 'playing';
    }
    frame = requestAnimationFrame(update);
  }

  async function wake() {
    // Creation belongs to the soundtrack's play, never to a page load.
    if (soundtrack.paused || reduced.matches || document.hidden) return;
    try {
      prepare();
      if (!context) return;
      if (!audible()) { quiet(); return; }
      clearTimeout(sleepTimer);
      if (context.state === 'suspended' && !resuming) {
        resuming = true;
        try { await context.resume(); } finally { resuming = false; }
      }
      if (audible() && context.state === 'running' && frame === null) frame = requestAnimationFrame(update);
    } catch { quiet(); } // Unsupported or blocked audio leaves the piano alone.
  }

  soundtrack.addEventListener('play', wake);
  soundtrack.addEventListener('pause', quiet);
  soundtrack.addEventListener('ended', quiet);
  soundtrack.addEventListener('seeking', quiet);
  soundtrack.addEventListener('seeked', wake);
  soundtrack.addEventListener('volumechange', () => audible() ? wake() : quiet());
  addEventListener('memory-scene-start', event => {
    // The renderer handles this same event and publishes its first position
    // on the following frame. Let that frame land before reading its state.
    if (event.detail?.id === 'thackeray') setTimeout(wake, 50);
  });
  addEventListener('memory-train-finished', quiet);
  document.addEventListener('visibilitychange', () => document.hidden ? quiet() : wake());
  document.addEventListener('toggle', event => {
    if (event.target.matches?.('.memory-world-dialog')) event.target.open ? quiet() : wake();
  }, true);
  reduced.addEventListener('change', () => reduced.matches ? quiet() : wake());
  // A permitted first click can resume an AudioContext that a browser kept
  // suspended even though the media element itself was already playing.
  addEventListener('pointerdown', wake, { passive: true });
  addEventListener('keydown', wake);
  addEventListener('pagehide', () => { quiet(); context?.close().catch(() => {}); });
  if (!soundtrack.paused) wake();
})();
