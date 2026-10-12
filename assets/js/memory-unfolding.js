(() => {
  const essay=document.querySelector('.memory-essay[data-unfolding="true"]');
  if(!essay)return;
  const journey=essay.querySelector('.memory-unfolding');
  const stage=essay.querySelector('.memory-stage');
  const layer=essay.querySelector('.memory-scene-layer');
  const poem=essay.querySelector('.memory-growing-poem');
  const atlas=essay.querySelector('.memory-atlas');
  const lines=[...poem.querySelectorAll('.memory-poem-line')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  // Width, resting place, reading side and reveal count belong to each scene.
  const specs=[
    {id:'nabokov',width:860,small:210,home:[.12,.14],focus:[.23,.52],side:'right',turn:-5,lines:2},
    {id:'burns',width:650,small:155,home:[.88,.16],focus:[.76,.55],side:'left',turn:6,lines:2},
    {id:'brideshead',width:1120,small:290,home:[.12,.38],focus:[.22,.52],side:'right',turn:-3,lines:4},
    {id:'nalan',width:680,small:180,home:[.89,.4],focus:[.78,.5],side:'left',turn:7,lines:6},
    {id:'pushkin',width:740,small:190,home:[.87,.87],focus:[.78,.53],side:'left',turn:5,lines:9},
    {id:'wong',width:1080,small:245,home:[.88,.66],focus:[.79,.54],side:'left',turn:4,lines:10},
    {id:'thackeray',width:1120,small:280,home:[.3,.1],focus:[.22,.5],side:'right',turn:-2,lines:10},
    {id:'present',width:1000,small:210,home:[.72,.1],focus:[.5,.52],side:'right',turn:0,lines:11}
  ];
  const scenes=specs.map(s=>({...s,figure:atlas.querySelector(`[data-scene="${s.id}"]`),beat:essay.querySelector(`[data-for="${s.id}"]`)}));
  const entrances={nabokov:[.42,.6],burns:[.7,.78],brideshead:[.5,.56],nalan:[.78,.3],wong:[.5,.5],pushkin:[.66,.8],thackeray:[.7,.5],present:[.5,.52]};
  for(const s of scenes){
    s.art=s.figure.querySelector('.memory-art');s.quote=s.figure.querySelector('blockquote');
    s.figure.style.setProperty('--scene-width',`${s.width}px`);
    s.figure.dataset.side=s.side;
  }
  for(const s of scenes){
    if(!s.quote)continue;
    const walker=document.createTreeWalker(s.quote,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
      const fragment=document.createDocumentFragment();
      for(const token of node.textContent.match(/\p{Script=Han}|[^\s\p{Script=Han}]+|\s+/gu)||[]){
        if(/^\s+$/.test(token)){fragment.append(token);continue}
        const word=document.createElement('span');word.className='memory-quote-word';word.textContent=token;fragment.append(word);
      }
      node.replaceWith(fragment);
    }
  }
  let top=0,step=0,current=0,target=0,last=0,raf=null,atEnd=false;
  let opened=null,closing=false;
  // Each first viewing has its own time. Returning to an earlier scene is free.
  const durations=[30,30,30,24,36,30,42,24];
  let unlocked=0,gateStarted=false,gateElapsed=0,gateLast=0,gateTimer=null,queuedForward=false;
  let butterflyHalfway=false,butterflyFinished=false,trainFinished=false,advanceTimer=null;
  const scrollCue=document.createElement('button');
  scrollCue.type='button';scrollCue.className='memory-scroll-cue';
  scrollCue.setAttribute('aria-label','Continue reading');
  scrollCue.setAttribute('aria-hidden','true');scrollCue.tabIndex=-1;
  const sceneProgress=document.createElementNS('http://www.w3.org/2000/svg','svg');sceneProgress.classList.add('memory-scene-progress');
  sceneProgress.setAttribute('viewBox','0 0 32 32');
  sceneProgress.innerHTML='<circle class="memory-progress-track" cx="16" cy="16" r="13"/><circle class="memory-progress-arc" cx="16" cy="16" r="13" pathLength="1"/>';
  sceneProgress.setAttribute('aria-hidden','true');
  scrollCue.append(sceneProgress);stage.append(scrollCue);
  const previousCue=document.createElement('button');
  previousCue.type='button';previousCue.className='memory-scroll-cue memory-previous-cue';
  previousCue.setAttribute('aria-label','Previous passage');
  previousCue.setAttribute('aria-hidden','true');previousCue.tabIndex=-1;
  stage.append(previousCue);
  function canContinue(){
    return !reduced.matches&&!opened&&current>=0&&current<scenes.length-.02&&Math.floor(current)<unlocked;
  }
  function canSkip(){
    return !reduced.matches&&!opened&&gateStarted&&Math.floor(current)===unlocked;
  }
  function updateCue(){
    const canGoBack=!reduced.matches&&!opened&&current>=1;
    previousCue.classList.toggle('is-visible',canGoBack);
    previousCue.setAttribute('aria-hidden',String(!canGoBack));previousCue.tabIndex=canGoBack?0:-1;
    const waiting=canSkip(),ready=canContinue(),visible=waiting||ready;
    scrollCue.classList.toggle('is-ready',ready);scrollCue.classList.toggle('is-waiting',waiting);
    scrollCue.setAttribute('aria-hidden',String(!visible));scrollCue.tabIndex=visible?0:-1;
    const seconds=Number(essay.dataset.sceneRemaining||0);
    scrollCue.style.setProperty('--scene-progress',waiting?String(1-seconds/durations[unlocked]):'1');
    scrollCue.setAttribute('aria-label',waiting?(unlocked===0?'Continue to the mouse':'Skip to the next scene'):'Continue reading');
  }
  function releaseGate(skipped=false){
    if(!gateStarted)return;
    const id=scenes[unlocked].id,advance=skipped||(queuedForward&&current>=unlocked+.5);
    if(gateTimer!==null)clearTimeout(gateTimer);gateTimer=null;
    unlocked++;gateStarted=false;gateElapsed=0;queuedForward=false;
    delete essay.dataset.waitingFor;delete essay.dataset.sceneRemaining;
    if(skipped)dispatchEvent(new CustomEvent('memory-scene-skip',{detail:{id}}));
    updateCue();
    if(skipped)advanceScene();
    else if(advance)advanceTimer=setTimeout(advanceScene,1900);
    schedule();
  }
  function advanceScene(){
    if(advanceTimer!==null)clearTimeout(advanceTimer);advanceTimer=null;
    if(document.hidden)return;
    if(canSkip()){releaseGate(true);return}
    if(!canContinue())return;
    const next=Math.floor(current)+1;
    scrollTo({top:top+step*(next<scenes.length?next+.4:scenes.length),behavior:'smooth'});
  }
  scrollCue.addEventListener('click',advanceScene);
  previousCue.addEventListener('click',()=>{
    if(opened||current<1)return;
    if(advanceTimer!==null)clearTimeout(advanceTimer);advanceTimer=null;
    if(essay.dataset.opening==='joined'){
      essay.dataset.opening='revisiting';
      for(const s of scenes.slice(0,2)){
        s.art.classList.remove('is-opening-duet');
        s.figure.dataset.side=s.side;
      }
    }
    scrollTo({top:top+step*(Math.floor(current)-1+.4),behavior:'smooth'});
  });
  function separateOpening(){
    if(essay.dataset.opening!=='joined')return;
    essay.dataset.opening='separated';
    if(unlocked===1&&gateStarted){queuedForward=false;releaseGate()}
    for(const s of scenes.slice(0,2)){
      s.figure.dataset.side=s.side;
      if(s.id==='burns'){s.art.style.opacity='0.44'}
      setTimeout(()=>s.art.classList.remove('is-opening-duet'),6000);
    }
    scrollTo({top:top+step*1.98,behavior:'smooth'});
    schedule();
  }
  addEventListener('memory-butterfly-halfway',()=>{
    butterflyHalfway=true;
    if(unlocked>1||(unlocked===0&&!gateStarted))return;
    essay.dataset.opening='joined';
    for(const s of scenes.slice(0,2)){
      s.art.classList.add('is-opening-duet');
    }
    queuedForward=false;
    if(unlocked===0)releaseGate();
    scrollTo({top:top+step*1.4,behavior:'smooth'});
  });
  addEventListener('memory-butterfly-finished',()=>{butterflyFinished=true;separateOpening()});
  addEventListener('memory-train-finished',()=>{trainFinished=true});
  document.addEventListener('visibilitychange',()=>{gateLast=performance.now()});
  function gateTick(){
    gateTimer=null;
    if(!gateStarted||reduced.matches||unlocked>=scenes.length)return;
    const now=performance.now();
    if(!document.hidden&&!opened)gateElapsed+=(now-gateLast)/1000;
    gateLast=now;
    essay.dataset.waitingFor=scenes[unlocked].id;
    let remaining=Math.max(0,durations[unlocked]-gateElapsed);
    const opening=unlocked<2;
    const visual=opening?document.querySelector('.memory-butterfly'):scenes[unlocked].id==='thackeray'?document.querySelector('.memory-train'):null;
    if(visual){
      const progress=Number(visual.dataset.progress||0);
      const visualRemaining=opening?Math.max(0,(unlocked===0?.5:1)-progress)*60:(1-progress)*durations[unlocked];
      remaining=Math.max(remaining,visualRemaining);
    }
    essay.dataset.sceneRemaining=String(Math.ceil(remaining));
    updateCue();
    if(essay.dataset.opening==='joined')render();
    const visualDone=unlocked===0?butterflyHalfway:unlocked===1?butterflyFinished:scenes[unlocked].id==='thackeray'?trainFinished:true;
    if(gateElapsed>=durations[unlocked]&&visualDone){releaseGate();return}
    gateTimer=setTimeout(gateTick,200);
  }
  function beginGate(index){
    if(reduced.matches||gateStarted||index!==unlocked)return;
    gateStarted=true;gateLast=performance.now();
    dispatchEvent(new CustomEvent('memory-scene-start',{detail:{id:scenes[index].id,duration:durations[index]*1000}}));
    gateTick();
  }
  function atGate(){return !reduced.matches&&!opened&&unlocked<scenes.length&&scrollY>=top+step*(unlocked+.64)-2}
  addEventListener('wheel',event=>{
    if(event.deltaY>0&&atGate()){event.preventDefault();queuedForward=true}
  },{passive:false});
  addEventListener('keydown',event=>{
    if(!['ArrowDown','PageDown','End',' '].includes(event.key)||event.target.closest?.('a,button,input,textarea,select,[role="button"]'))return;
    if(atGate()){event.preventDefault();queuedForward=true}
  });
  let touchY=0;
  addEventListener('touchstart',event=>{touchY=event.touches[0]?.clientY||0},{passive:true});
  addEventListener('touchmove',event=>{
    const y=event.touches[0]?.clientY||0;
    if(y<touchY&&atGate()){event.preventDefault();queuedForward=true}
    touchY=y;
  },{passive:false});
  const dialog=document.createElement('dialog');
  dialog.className='memory-world-dialog';
  const closeButton=document.createElement('button');
  closeButton.className='memory-world-close';
  closeButton.type='button';
  closeButton.setAttribute('aria-label','Close this world');
  closeButton.innerHTML='<img src="/assets/images/memory/cursor-close.svg?v=2" width="36" height="36" alt="">';
  dialog.append(closeButton);
  essay.append(dialog);

  function zoom(art,from,to,reverse=false){
    if(reduced.matches)return null;
    const transform=`translate(${from.left-to.left}px,${from.top-to.top}px) scale(${from.width/to.width},${from.height/to.height})`;
    const frames=[{transform,opacity:.44},{transform:'none',opacity:.95}];
    return art.animate(reverse?frames.reverse():frames,{duration:reverse?520:850,easing:'cubic-bezier(.2,.75,.2,1)',fill:'both'});
  }
  function openWorld(s){
    if(opened||!s.figure.classList.contains('is-reached'))return;
    state(s,'set');
    const origin=s.art.getBoundingClientRect();
    opened={s,origin,parent:s.figure.parentNode,next:s.figure.nextSibling,artStyle:s.art.getAttribute('style'),quoteStyle:s.quote?.getAttribute('style'),overflow:document.documentElement.style.overflow};
    if(raf!==null)cancelAnimationFrame(raf);raf=null;last=0;
    s.art.getAnimations().forEach(a=>a.cancel());
    s.art.style.removeProperty('transform');s.art.style.removeProperty('opacity');
    s.quote?.style.removeProperty('transform');s.quote?.style.removeProperty('opacity');
    s.art.setAttribute('aria-expanded','true');
    s.art.tabIndex=-1;
    if(s.quote){s.quote.inert=false;s.quote.removeAttribute('aria-hidden')}
    dialog.setAttribute('aria-label',s.art.getAttribute('aria-label').replace(/^Open: /,''));
    dialog.classList.toggle('has-quotation',!!s.quote);
    dialog.append(s.figure);
    document.documentElement.style.overflow='hidden';
    dialog.showModal();
    closeButton.focus({preventScroll:true});
    updateCue();
    const animation=zoom(s.art,origin,s.art.getBoundingClientRect());
    animation?.finished.then(()=>animation.cancel()).catch(()=>{});
    if(!reduced.matches)s.quote?.animate([{opacity:0},{opacity:1}],{duration:850,delay:200,fill:'backwards'});
  }
  async function closeWorld(){
    if(!opened||closing)return;
    closing=true;
    const saved=opened,{s}=saved;
    s.art.getAnimations().forEach(a=>a.cancel());
    const animation=zoom(s.art,saved.origin,s.art.getBoundingClientRect(),true);
    if(!reduced.matches)s.quote?.animate([{opacity:1},{opacity:0}],{duration:240,fill:'forwards'});
    if(animation)await animation.finished.catch(()=>{});
    s.art.getAnimations().forEach(a=>a.cancel());s.quote?.getAnimations().forEach(a=>a.cancel());
    saved.parent.insertBefore(s.figure,saved.next);
    if(saved.artStyle===null)s.art.removeAttribute('style');else s.art.setAttribute('style',saved.artStyle);
    if(s.quote){if(saved.quoteStyle===null)s.quote.removeAttribute('style');else s.quote.setAttribute('style',saved.quoteStyle)}
    s.art.setAttribute('aria-expanded','false');
    s.art.tabIndex=0;
    dialog.close();
    document.documentElement.style.overflow=saved.overflow;
    opened=null;closing=false;
    s.art.focus({preventScroll:true});
    schedule();
  }
  closeButton.addEventListener('click',closeWorld);
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeWorld()});
  dialog.addEventListener('click',event=>{if(event.target===dialog)closeWorld()});
  for(const s of scenes){
    s.art.setAttribute('role','button');
    s.art.setAttribute('aria-label',`Open: ${s.art.getAttribute('aria-label')}`);
    s.art.setAttribute('aria-haspopup','dialog');
    s.art.setAttribute('aria-expanded','false');
    s.art.tabIndex=-1;
    s.art.addEventListener('click',()=>{if(!opened)openWorld(s)});
    s.art.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();openWorld(s)}
    });
  }
  const clamp=x=>Math.max(0,Math.min(1,x));
  const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
  const mix=(a,b,t)=>a+(b-a)*t;
  function state(s,value){
    if(s.art.dataset.state===value)return;
    // A developed print stays a print, including when the reader scrolls back.
    if(s.art.dataset.state==='set')return;
    s.art.dataset.state=value;
    const svg=s.art.querySelector('svg');
    if(value==='present'&&!reduced.matches&&s.art.dataset.world!=='3d')svg?.unpauseAnimations?.();
    else svg?.pauseAnimations?.();
  }
  function place(end){
    if(atEnd===end)return;
    atEnd=end;
    stage.append(poem);for(const s of scenes)layer.append(s.figure)
  }
  function render(){
    place(current>=scenes.length+.04);
    const joined=essay.dataset.opening==='joined';
    const flight=Number(document.querySelector('.memory-butterfly')?.dataset.progress||0);
    const blend=smooth((flight-.5)/.22);
    let count=2;
    for(let i=0;i<scenes.length;i++){
      const s=scenes[i],p=current-i;
      const previous=i?scenes[i-1].lines:0;
      if(p>=0)count=Math.max(count,mix(previous,s.lines,smooth((p-.12)/.34)));
      const reached=p>=0||(joined&&i===1);
      s.figure.classList.toggle('is-reached',reached);
      s.art.tabIndex=reached&&(p<.95||current>=scenes.length-.1)?0:-1;
      s.figure.setAttribute('aria-hidden',String(!reached));
      if(!reached)continue;
      if(p>=.06)beginGate(i);
      if(opened?.s===s)continue;
      if(joined&&i<2||p<.87)state(s,'present');else state(s,'set');
      const entering=smooth(p/.28),settling=smooth((p-.7)/.3);
      // A broad translucent arrival crosses the page, then becomes a small print.
      const approach=s.id==='wong'?1.7:1.35;
      const baseScale=Math.min(1,innerWidth/1728);
      const focusScale=baseScale*(s.id==='present'?.9:.86);
      const scale=mix(mix(approach*baseScale,focusScale,entering),s.small/s.width,settling);
      const entry=entrances[s.id];
      let x=mix(mix(entry[0],s.focus[0],entering),s.home[0],settling)*innerWidth;
      let y=mix(mix(entry[1],s.focus[1],entering),s.home[1],settling)*innerHeight;
      const arc=Math.sin(clamp(p)*Math.PI*2)*(s.id==='wong'?45:18)*baseScale*(1-settling);
      y+=arc;
      const rotation=mix(s.turn*(1-entering),s.turn*.55,settling);
      // Earlier prints recede while another quote needs the reading space.
      const collected=current>=scenes.length-.1;
      const restingOpacity=collected?.44:.035;
      const opacity=mix(mix(0,.68,smooth(p/.16)),restingOpacity,settling);
      s.art.style.transform=`translate3d(${x-s.width/2}px,${y-s.width*9/32}px,0) rotate(${rotation}deg) scale(${scale})`;
      s.art.style.opacity=String(opacity);
      s.art.style.pointerEvents=p<.95||collected?'auto':'none';
      s.art.classList.toggle('is-settled',p>=1);
      s.art.style.setProperty('--pass',String(clamp(p)));
      s.figure.style.zIndex=p<1?'2':'1';
      if(s.quote){
        const alpha=smooth((p-.16)/.15)*(1-smooth((p-.72)/.18));
        s.quote.style.opacity=String(alpha);
        s.quote.setAttribute('aria-hidden',String(alpha<.05));
        s.quote.inert=alpha<.05;
        s.quote.style.transform=`translate(${(1-entering)*(s.side==='right'?35:-35)}px,-50%)`;
      }
      if(joined&&i<2){
        const width=innerWidth*.47;
        s.art.style.transform=`translate3d(${innerWidth*.23-s.width/2}px,${innerHeight*.53-s.width*9/32}px,0) scale(${width/s.width})`;
        s.art.style.opacity=String(i===0?.68:0);
        s.figure.style.zIndex=i===0?'1':'2';
        if(s.quote){
          // The image can overlap; the passages take turns remaining legible.
          const alpha=i===0?Math.max(0,1-blend*3):Math.max(0,(blend-.45)/.55);
          s.quote.style.opacity=String(alpha);
          s.quote.style.transform='translate(0,-50%)';
          s.quote.setAttribute('aria-hidden',String(alpha<.05));
          s.quote.inert=alpha<.05;
        }
      }
    }
    for(let i=0;i<lines.length;i++)lines[i].style.setProperty('--reveal',String(clamp(count-i)));
    essay.dataset.poemLines=String(Math.floor(count));
    poem.style.setProperty('--visible-lines',String(Math.max(2,Math.ceil(count))));
    essay.dataset.activeScene=atEnd?'collected':scenes[Math.min(scenes.length-1,Math.max(0,Math.floor(current)))].id;
    updateCue();
  }
  function animate(now){
    raf=null;
    const dt=last?Math.min(.1,(now-last)/1000):.016;last=now;
    current+= (target-current)*(1-Math.exp(-dt/.32));
    if(Math.abs(target-current)<.0005)current=target;
    render();
    if(current!==target)raf=requestAnimationFrame(animate);
    else last=0;
  }
  function schedule(){
    if(reduced.matches||opened)return;
    const ceiling=unlocked<scenes.length?unlocked+.64:Infinity;
    const requested=(scrollY-top)/step;
    if(advanceTimer!==null&&requested<current-.02){clearTimeout(advanceTimer);advanceTimer=null}
    if(requested>ceiling+.001){
      queuedForward=true;
      scrollTo({top:top+step*ceiling,behavior:'instant'});
    }
    target=Math.max(-.1,Math.min(requested,ceiling));
    if(raf===null)raf=requestAnimationFrame(animate);
  }
  function resize(){
    if(reduced.matches){journey.style.height='100svh';render();return}
    top=journey.getBoundingClientRect().top+scrollY;
    step=innerHeight*1.35;
    journey.style.height=`${step*scenes.length+innerHeight}px`;
    for(let i=0;i<scenes.length;i++)scenes[i].beat.style.top=`${step*(i+.5)}px`;
    schedule();
  }
  async function mode(){
    if(opened)await closeWorld();
    if(raf!==null)cancelAnimationFrame(raf);raf=null;
    if(reduced.matches){
      delete essay.dataset.opening;
      for(const s of scenes.slice(0,2))s.art.classList.remove('is-opening-duet');
      if(advanceTimer!==null)clearTimeout(advanceTimer);advanceTimer=null;
      if(gateTimer!==null)clearTimeout(gateTimer);gateTimer=null;gateStarted=false;unlocked=scenes.length;
      delete essay.dataset.waitingFor;delete essay.dataset.sceneRemaining;
      essay.classList.add('is-unfolding','is-static');
      current=target=scenes.length+.05;atEnd=false;
      for(const s of scenes){state(s,'set');s.beat.style.top='0'}
      resize();return;
    }
    if(!butterflyFinished){
      essay.dataset.opening='joined';
      for(const s of scenes.slice(0,2)){s.art.classList.add('is-opening-duet')}
    }
    essay.classList.remove('is-static');
    essay.classList.add('is-unfolding');atEnd=true;place(false);resize();
  }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',resize);
  reduced.addEventListener('change',mode);
  mode();
  // Native fragment links still lead to the intended reading beat.
  const hash=decodeURIComponent(location.hash.slice(1));
  if(hash&&scenes.some(s=>s.id===hash))requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView());
})();
