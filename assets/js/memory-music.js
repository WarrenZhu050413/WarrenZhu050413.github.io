// Piano starts with the experience; the reading follows its current time.
(() => {
  if (!document.querySelector('.memory-essay')) return;
  const player = document.createElement('div');
  player.className = 'memory-music';
  player.innerHTML = `
    <div class="memory-music-credit" id="memory-music-credit">
      <span>Rachmaninoff · Prelude in E-flat major, Op. 23, No. 6</span>
      <span>Vladimir Ashkenazy · <a href="https://www.youtube.com/watch?v=G0EBMHFsEwY" target="_blank" rel="noopener">source recording</a></span>
    </div>
    <button type="button" class="memory-music-toggle" aria-label="Play Rachmaninoff, Prelude in E-flat major" aria-describedby="memory-music-credit" aria-pressed="false">
      <svg viewBox="0 0 20 20" aria-hidden="true"><path class="music-play" d="m7 5 8 5-8 5Z"/><path class="music-pause" d="M7 5v10m6-10v10"/></svg>
    </button>`;
  document.body.append(player);
  const credit=player.querySelector('.memory-music-credit');
  document.querySelector('.memory-stage')?.append(credit);
  const button = player.querySelector('button');
  const audio = new Audio();
  audio.id = 'memory-soundtrack';
  audio.hidden = true;
  audio.preload = 'auto';
  audio.autoplay = true;
  audio.volume = .28;
  audio.src = '/assets/audio/rachmaninoff-op23-no6-ashkenazy.m4a';
  player.append(audio);
  let pending = false, pausedByUser = false;
  const gestures = ['pointerdown','click','keydown'];
  function stopWaitingForGesture() {
    for (const name of gestures) removeEventListener(name, firstInteraction, true);
  }
  function reflect() {
    button.setAttribute('aria-pressed', String(!audio.paused));
    button.setAttribute('aria-label', audio.paused ? 'Play Rachmaninoff, Prelude in E-flat major' : 'Pause Rachmaninoff');
    player.dataset.state = audio.paused ? 'paused' : 'playing';
    if (!audio.paused) stopWaitingForGesture();
  }
  async function start() {
    if (pending || pausedByUser || !audio.paused) return;
    pending = true;
    button.setAttribute('aria-busy', 'true');
    try { await audio.play(); }
    catch (error) {
      if (error.name === 'NotAllowedError') player.dataset.state = 'waiting-for-interaction';
      else if (error.name !== 'AbortError') {
        player.dataset.state = 'unavailable';
        button.setAttribute('aria-label', 'Playback unavailable. Try playing Rachmaninoff again');
      }
    }
    finally { pending = false; button.removeAttribute('aria-busy'); }
  }
  function firstInteraction(event) {
    if (event.target.closest?.('.memory-music') || event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
    start();
  }
  button.addEventListener('click', () => {
    if (!audio.paused || pending) {
      pausedByUser = true; stopWaitingForGesture(); audio.pause(); return;
    }
    pausedByUser = false; start();
  });
  audio.addEventListener('play', reflect);
  audio.addEventListener('pause', reflect);
  audio.addEventListener('ended', reflect);
  for (const name of gestures) addEventListener(name, firstInteraction, true);
  start();
  addEventListener('pagehide', () => audio.pause());
})();
