// I wish it were not dark. One clock carries the whole reading: the music's own
// time while it plays, a quiet clock of the same pace while it does not. Each
// passage arrives on its beat, its painting settles into a small print, and at
// the end the poem is drawn in among the passages it was read with, all of them
// turning slowly around a small dark centre with one light in it.
(() => {
  const essay=document.querySelector('.memory-essay[data-unfolding="true"]');
  if(!essay)return;
  const journey=essay.querySelector('.memory-unfolding');
  const stage=essay.querySelector('.memory-stage');
  const layer=essay.querySelector('.memory-scene-layer');
  const poem=essay.querySelector('.memory-growing-poem');
  const atlas=essay.querySelector('.memory-atlas');
  const lines=[...poem.querySelectorAll('.memory-poem-line')];
  const stanzas=[...poem.querySelectorAll('.memory-poem-stanza')];
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
  ];
  // Seconds into the recording at which each passage arrives. The quiet places
  // in the music carry Brideshead and Nalan; the last rise carries the train.
  const START={nabokov:0,burns:26,brideshead:70,nalan:92,pushkin:108,wong:126,thackeray:140,coda:160};
  const SEPARATE=52,FINALE=168,SETTLED=178,END=180.72;
  // The cat enters with Burns, while the butterfly's first world is still present.
  const STORY={burns:START.burns};
  const BEATS=[START.burns,SEPARATE,START.brideshead,START.nalan,START.pushkin,START.wong,START.thackeray,START.coda,FINALE];
  const scenes=specs.map(s=>({...s,start:START[s.id],figure:atlas.querySelector(`[data-scene="${s.id}"]`),beat:essay.querySelector(`[data-for="${s.id}"]`)}));
  const entrances={nabokov:[.42,.6],burns:[.7,.78],brideshead:[.5,.56],nalan:[.78,.3],wong:[.5,.5],pushkin:[.66,.8],thackeray:[.7,.5]};
  for(const s of scenes){
    s.art=s.figure.querySelector('.memory-art');s.quote=s.figure.querySelector('blockquote');
    s.figure.style.setProperty('--scene-width',`${s.width}px`);
    s.figure.dataset.side=s.side;
  }
  for(const s of scenes){
    if(!s.quote)continue;
    const walker=document.createTreeWalker(s.quote,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const [n,node] of nodes.entries()){
      const fragment=document.createDocumentFragment();
      for(const token of node.textContent.match(/\p{Script=Han}|[^\s\p{Script=Han}]+|\s+/gu)||[]){
        if(/^\s+$/.test(token)){fragment.append(token);continue}
        const word=document.createElement('span');word.className='memory-quote-word';word.textContent=token;
        // "But Mousie, thou art no thy lane" comes forward when the cat takes her.
        if(s.id==='burns'&&n===0)word.classList.add('memory-cue-word');
        fragment.append(word);
      }
      node.replaceWith(fragment);
    }
  }
  const {clamp,smooth,mix,damp,drift}=window.memoryMotion;

  // ---------------------------------------------------------------- the clock
  const clock={t:0,last:0,running:false};
  let musicStarted=false;
  const soundtrack=document.getElementById('memory-soundtrack');
  function advanceClock(now){
    const dt=clock.last?Math.min(.25,(now-clock.last)/1000):0;clock.last=now;
    if(soundtrack&&!soundtrack.paused&&!soundtrack.seeking&&soundtrack.currentTime>0&&clock.t<END-.5)clock.t=soundtrack.currentTime;
    else if(clock.running&&!musicStarted&&!document.hidden)clock.t+=dt;
  }
  function setTime(t){
    clock.t=t;
    if(soundtrack&&!soundtrack.paused&&t<END-.5)soundtrack.currentTime=t;
  }
  // When the music starts late (a first click, or after a pause) it joins the reading where it is.
  soundtrack?.addEventListener('play',()=>{
    musicStarted=true;
    if(clock.t<END-1&&Math.abs(soundtrack.currentTime-clock.t)>.3)soundtrack.currentTime=clock.t;
  });
  let pausedWhileHidden=false;
  document.addEventListener('visibilitychange',()=>{
    clock.last=0;
    if(!soundtrack)return;
    if(document.hidden&&!soundtrack.paused){pausedWhileHidden=true;soundtrack.pause()}
    else if(!document.hidden&&pausedWhileHidden){pausedWhileHidden=false;soundtrack.play().catch(()=>{})}
  });
  window.memoryTimeline={
    time:()=>clock.t,
    sceneTime(id){const start=STORY[id]??START[id];return start===undefined?null:Math.max(0,clock.t-start)}
  };
  function frontier(){let f=0;for(let i=0;i<scenes.length;i++)if(clock.t>=scenes[i].start)f=i;return f}

  // ---------------------------------------------------------------- cues
  let top=0,step=0,current=0,target=0,atEnd=false,opened=null,closing=false,lastBeat=-1;
  let butterflyFinished=false,loopId=null;
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
  // The figures leave the static atlas for the stage, where they are composed.
  stage.append(poem);for(const s of scenes)layer.append(s.figure);
  // A small blue pendant hangs on its cord at the centre of the ending.
  const cross=document.createElement('div');cross.className='memory-cross';cross.setAttribute('aria-hidden','true');
  layer.append(cross);
  const nextBeat=()=>BEATS.find(b=>b>clock.t+.05);
  // Behind the music, the reader may go forward freely; at its edge, the cue skips ahead.
  function canContinue(){return !reduced.matches&&!opened&&current<frontier()-.02}
  function canSkip(){return !reduced.matches&&!opened&&!canContinue()&&clock.t<FINALE&&current<scenes.length-.1}
  function updateCue(){
    const canGoBack=!reduced.matches&&!opened&&current>=1;
    previousCue.classList.toggle('is-visible',canGoBack);
    previousCue.setAttribute('aria-hidden',String(!canGoBack));previousCue.tabIndex=canGoBack?0:-1;
    const waiting=canSkip(),ready=canContinue(),visible=waiting||ready;
    scrollCue.classList.toggle('is-ready',ready);scrollCue.classList.toggle('is-waiting',waiting);
    scrollCue.setAttribute('aria-hidden',String(!visible));scrollCue.tabIndex=visible?0:-1;
    const next=nextBeat()??FINALE,previous=[0,...BEATS].filter(b=>b<=clock.t).pop()??0;
    scrollCue.style.setProperty('--scene-progress',waiting?String(clamp((clock.t-previous)/(next-previous))):'1');
    scrollCue.setAttribute('aria-label',waiting?(clock.t<START.burns?'Continue to the mouse':'Skip to the next scene'):'Continue reading');
  }
  function goTo(position){scrollTo({top:top+step*position,behavior:'smooth'})}
  scrollCue.addEventListener('click',()=>{
    if(canContinue()){goTo(Math.floor(current)+1+.4);return}
    if(!canSkip())return;
    const next=nextBeat();
    if(next===undefined)return;
    // Skipping moves the music and the paintings on together.
    const leaving=scenes[frontier()].id;
    dispatchEvent(new CustomEvent('memory-scene-skip',{detail:{id:leaving}}));
    setTime(next);
  });
  previousCue.addEventListener('click',()=>{
    if(opened||current<1)return;
    if(essay.dataset.opening==='joined'){
      essay.dataset.opening='revisiting';
      for(const s of scenes.slice(0,2)){s.art.classList.remove('is-opening-duet');s.figure.dataset.side=s.side}
    }
    goTo(Math.ceil(current-.45)-1+.4);
  });

  // ---------------------------------------------------------------- beats
  function separateOpening(){
    if(essay.dataset.opening!=='joined')return;
    essay.dataset.opening='separated';
    for(const s of scenes.slice(0,2)){
      s.figure.dataset.side=s.side;
      setTimeout(()=>s.art.classList.remove('is-opening-duet'),6000);
    }
    // The field is now its own picture, with its own small story.
    if(current<2)goTo(1.4);
  }
  addEventListener('memory-butterfly-halfway',()=>{
    if(essay.dataset.opening!=='joined'&&essay.dataset.opening)return;
    essay.dataset.opening='joined';
    for(const s of scenes.slice(0,2))s.art.classList.add('is-opening-duet');
    if(current<1.4)goTo(1.4);
  });
  addEventListener('memory-butterfly-finished',()=>{butterflyFinished=true;separateOpening()});
  function onBeat(beat){
    if(beat===SEPARATE){
      if(!butterflyFinished)dispatchEvent(new CustomEvent('memory-scene-skip',{detail:{id:'burns'}}));
      return;
    }
    if(beat===FINALE){
      dispatchEvent(new CustomEvent('memory-scene-start',{detail:{id:'finale',duration:(END-FINALE)*1000}}));
      if(!opened&&current>=scenes.length-1.1)goTo(scenes.length);
      return;
    }
    if(beat===START.coda){
      dispatchEvent(new CustomEvent('memory-scene-start',{detail:{id:'coda',duration:8000}}));
      if(!opened)goTo(scenes.length);
      return;
    }
    const i=scenes.findIndex(s=>s.start===beat);
    const after=BEATS.find(b=>b>beat)??END;
    dispatchEvent(new CustomEvent('memory-scene-start',{detail:{id:scenes[i].id,duration:(after-beat)*1000}}));
    if(i>1&&!opened&&current>=i-1.1)goTo(i+.4);
  }
  function beats(){
    while(lastBeat+1<BEATS.length&&clock.t>=BEATS[lastBeat+1]){lastBeat++;onBeat(BEATS[lastBeat])}
  }

  // ---------------------------------------------------------------- opening a world
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
    s.art.getAnimations().forEach(a=>a.cancel());
    s.art.style.removeProperty('transform');s.art.style.removeProperty('opacity');
    if(s.quote)for(const p of ['transform','opacity','left','top','width','max-height','z-index'])s.quote.style.removeProperty(p);
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
    requestScroll();
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
  function state(s,value){
    if(s.art.dataset.state===value)return;
    // A developed print stays a print, including when the reader scrolls back.
    if(s.art.dataset.state==='set')return;
    s.art.dataset.state=value;
    const svg=s.art.querySelector('svg');
    if(value==='present'&&!reduced.matches&&s.art.dataset.world!=='3d')svg?.unpauseAnimations?.();
    else svg?.pauseAnimations?.();
  }

  // ---------------------------------------------------------------- the ring at the end
  function braid(x1,y1,x2,y2){
    const length=Math.hypot(x2-x1,y2-y1),nx=-(y2-y1)/length,ny=(x2-x1)/length;
    let paths=`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#354e63" stroke-width="6" stroke-linecap="round"/>`;
    const colours=['#8aa3b6','#597991','#adc0cb'];
    for(let n=0;n<Math.ceil(length/2);n++){
      const a=n*2/length,b=Math.min(1,(n+1)*2/length);
      const strands=[0,1,2].sort((i,j)=>Math.cos(a*length*.6+i*2.094)-Math.cos(a*length*.6+j*2.094));
      for(const k of strands){
        const offset=t=>Math.sin(t*length*.6+k*2.094)*1.8;
        paths+=`<path d="M${x1+(x2-x1)*a+nx*offset(a)} ${y1+(y2-y1)*a+ny*offset(a)}L${x1+(x2-x1)*b+nx*offset(b)} ${y1+(y2-y1)*b+ny*offset(b)}" stroke="${colours[k]}" stroke-width="1.75" stroke-linecap="round"/>`;
      }
    }
    return paths;
  }
  cross.innerHTML=`<div class="memory-pendant"><svg viewBox="-44 -108 88 174" xmlns="http://www.w3.org/2000/svg">
    <path d="M-18-102C-39-84-21-49-1-39M-18-102C5-101 23-69-1-39" fill="none" stroke="#929b9f" stroke-width=".85" opacity=".65"/>
    <g fill="none">${braid(-1,-35,-1,60)}${braid(-28,-8,26,-8)}</g>
  </svg></div>`;
  let crossX=0,crossY=0;
  addEventListener('pointermove',event=>{
    crossX=(event.clientX/innerWidth-.5)*2;
    crossY=(event.clientY/innerHeight-.5)*2;
  },{passive:true});
  // The passages and the poem turn one way, the prints the other, around the small cross.
  const rings=[...scenes.filter(s=>s.quote).map(s=>({el:s.quote,focus:0,hover:false})),{el:poem,focus:0,hover:false,poem:true}];
  for(const item of rings){
    item.el.addEventListener('pointerenter',()=>{item.hover=true});
    item.el.addEventListener('pointerleave',()=>{item.hover=false});
  }
  let finaleWas=false;
  function clearFinale(){
    if(!finaleWas)return;
    finaleWas=false;
    for(const item of rings){
      for(const p of ['left','top','width','max-height','z-index','transform','opacity','pointer-events'])item.el.style.removeProperty(p);
      item.el.classList.remove('is-orbiting');
    }
    cross.style.opacity='0';
  }
  function finale(dt){
    const e=smooth((clock.t-FINALE)/(SETTLED-FINALE));
    if(e<=0){clearFinale();return false}
    finaleWas=true;
    const W=innerWidth,H=innerHeight,cx=W/2,cy=H/2;
    const spin=(clock.t-FINALE)*Math.PI*2/300;
    const swirl=(1-e)**2*1.6;
    // Every print on the outer ellipse, the present's among them; the cross at the centre.
    const outer=scenes;
    outer.forEach((s,i)=>{
      const home=s.homeAt,angle=-Math.PI/2+i/outer.length*Math.PI*2+spin+swirl;
      const rx=W*.42,ry=H*.405;
      const hr=Math.hypot(home.x-cx,(home.y-cy)*rx/ry),ha=Math.atan2((home.y-cy)*rx/ry,home.x-cx);
      let da=angle-ha;da=Math.atan2(Math.sin(da),Math.cos(da));
      const r=mix(hr,rx,e),a=ha+da*e;
      const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*ry/rx;
      const scale=s.small/s.width*mix(1,.82,e);
      s.art.style.transform=`translate3d(${x-s.width/2}px,${y-s.width*9/32}px,0) rotate(${s.turn*.55*(1-e)}deg) scale(${scale})`;
      s.art.style.opacity=String(mix(.44,.62,e));
    });
    cross.style.opacity=String(smooth((e-.15)/.6));
    const lift=smooth((clock.t-172)/8.72),liftX=Math.sin(lift*Math.PI*.8)*W*.055,liftY=-lift*H*.65;
    cross.style.transform=`translate(calc(-50% + ${liftX}px),calc(-50% + ${liftY}px)) scale(${mix(.9,1,e)})`;
    const sway=reduced.matches?0:Math.sin((clock.t-FINALE)*.82)*1.4;
    cross.firstElementChild.style.transform=`perspective(450px) rotateX(${-crossY*5}deg) rotateY(${crossX*12}deg) rotateZ(${-7+crossX*3+sway}deg)`;
    window.memoryGestures?.set('pendant',{moving:lift>0&&lift<1?Math.abs(Math.sin(clock.t*.82))*.5:0});
    const pendantBounds=cross.getBoundingClientRect();
    dispatchEvent(new CustomEvent('memory-pendant-frame',{detail:{x:pendantBounds.left+pendantBounds.width*.31,y:pendantBounds.top+pendantBounds.height*.035,seconds:clock.t}}));
    // The passages, and the poem drawn in to become one of them.
    const n=rings.length,rx=W*.265,ry=H*.29;
    rings.forEach((item,k)=>{
      item.focus+=((item.hover?1:0)-item.focus)*(1-Math.exp(-dt/.45));
      const angle=-Math.PI/2+(k+.5)/n*Math.PI*2-spin*1.3-swirl*.6;
      let x=cx+Math.cos(angle)*rx,y=cy+Math.sin(angle)*ry,scale=mix(.38,.95,item.focus),opacity=mix(.5,.97,item.focus);
      if(item.poem){
        // The poem leaves the centre and comes back as one of the passages, fading in as they do.
        if(e<.3){x=cx;y=cy;scale=1;opacity=1-smooth(e/.3)}
        else{scale=mix(.3,.85,item.focus);opacity=mix(.62,1,item.focus)*smooth((e-.2-k*.04)/.4)}
        item.el.style.transform=`translate(calc(${x-cx}px - 50%),calc(${y-cy}px - 50%)) scale(${scale})`;
        item.el.style.opacity=String(opacity);
        item.el.style.pointerEvents=e>.9?'auto':'none';
        item.el.style.zIndex=item.focus>.05?'8':'';
        return;
      }
      item.el.classList.add('is-orbiting');
      item.el.style.left='0px';item.el.style.top='0px';item.el.style.width='320px';item.el.style.maxHeight='330px';
      item.el.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%) scale(${scale})`;
      item.el.style.opacity=String(opacity*smooth((e-.2-k*.04)/.4));
      item.el.style.zIndex=item.focus>.05?'8':'';
      item.el.inert=false;item.el.setAttribute('aria-hidden','false');
    });
    return true;
  }

  // ---------------------------------------------------------------- one frame
  const stanzaMotion=stanzas.map(()=>({alpha:0,x:0,y:0}));
  const passageMotion=scenes.map(()=>({alpha:0}));
  const drifts=[[14,9],[-16,6],[10,-12],[-10,14],[15,-6],[-18,-4],[12,8],[-8,-9],[10,5],[-12,8]];
  let presentationTime=0;
  function render(dt=0){
    presentationTime+=dt;
    atEnd=current>=scenes.length-.05;
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
      if(opened?.s===s)continue;
      if(joined&&i<2||p<.87)state(s,'present');else state(s,'set');
      const entering=smooth(p/.28),settling=smooth((p-.7)/.3);
      // A broad translucent arrival crosses the page, then becomes a small print.
      const approach=s.id==='wong'?1.7:1.35;
      const baseScale=Math.min(1,innerWidth/1728);
      const focusScale=baseScale*.86;
      const scale=mix(mix(approach*baseScale,focusScale,entering),s.small/s.width,settling);
      const entry=entrances[s.id];
      let x=mix(mix(entry[0],s.focus[0],entering),s.home[0],settling)*innerWidth;
      let y=mix(mix(entry[1],s.focus[1],entering),s.home[1],settling)*innerHeight;
      const arc=Math.sin(clamp(p)*Math.PI*2)*(s.id==='wong'?45:18)*baseScale*(1-settling);
      y+=arc;
      s.homeAt={x,y};
      const rotation=mix(s.turn*(1-entering),s.turn*.55,settling);
      // Earlier prints recede while another passage needs the reading space.
      const collected=current>=scenes.length-.1;
      const restingOpacity=collected?.44:.035;
      // Paintings settle to a quiet print behind the reading.
      const opacity=mix(mix(0,.68,smooth(p/.16)),restingOpacity,settling);
      s.art.style.transform=`translate3d(${x-s.width/2}px,${y-s.width*9/32}px,0) rotate(${rotation}deg) scale(${scale})`;
      s.art.style.opacity=String(opacity);
      s.art.style.pointerEvents=p<.95||collected?'auto':'none';
      s.art.classList.toggle('is-settled',p>=1);
      s.art.style.setProperty('--pass',String(clamp(p)));
      s.figure.style.zIndex=p<1?'2':'1';
      if(s.quote&&!(atEnd&&clock.t>=FINALE)){
        const desired=smooth((p-.08)/.2)*(1-smooth((p-.82)/.24));
        const motion=passageMotion[i];
        motion.alpha=damp(motion.alpha,desired,dt,1.05);
        const alpha=motion.alpha;
        s.quote.style.opacity=String(alpha);
        s.quote.setAttribute('aria-hidden',String(alpha<.05));
        s.quote.inert=alpha<.05;
        const direction=s.side==='right'?1:-1;
        const pose=drift(alpha,{x:22*direction,y:i%2?8:-8,arc:i%2?3:-3},p>.82,presentationTime);
        s.quote.style.transform=`translate3d(${pose.x}px,calc(-50% + ${pose.y}px),0)`;
      }
      if(joined&&i<2){
        const width=innerWidth*.47;
        s.art.style.transform=`translate3d(${innerWidth*.23-s.width/2}px,${innerHeight*.53-s.width*9/32}px,0) scale(${width/s.width})`;
        const fieldArrival=smooth((clock.t-START.burns)/6);
        s.art.style.opacity=String(i===0?.68*(1-fieldArrival*.75):fieldArrival*.68);
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
    const field=window.memoryTimeline.sceneTime('burns');
    scenes[1].quote?.classList.toggle('is-cued',field>=14.1&&field<23);
    if(stanzas.length){
      const active=[...stanzas].reverse().find(s=>clock.t>=Number(s.dataset.start))||stanzas[0];
      const activeStanza=stanzas.indexOf(active);
      for(const [index,stanza] of stanzas.entries()){
        const motion=stanzaMotion[index],isActive=index===activeStanza;
        const [dx,dy]=drifts[index%drifts.length];
        motion.alpha=damp(motion.alpha,isActive?1:0,dt,1.25);
        const departing=index<activeStanza;
        stanza.hidden=!reduced.matches&&!isActive&&motion.alpha<.002;
        if(stanza.hidden)continue;
        const pose=drift(motion.alpha,{x:dx,y:dy,arc:index%2?3:-3,departure:40},departing,presentationTime);
        stanza.style.opacity=reduced.matches?'1':String(motion.alpha);
        stanza.style.transform=reduced.matches?'none':`translate3d(${pose.x}px,calc(-50% + ${pose.y}px),0)`;
        stanza.style.filter=reduced.matches?'none':`blur(${pose.blur}px)`;
        stanza.setAttribute('aria-hidden',String(!isActive&&!reduced.matches));
        const ownLines=[...stanza.querySelectorAll('.memory-poem-line')];
        ownLines.forEach((line,i)=>line.style.setProperty('--reveal',reduced.matches||departing?'1':String(smooth((clock.t-Number(stanza.dataset.start)-i*.75)/2.8))));
        if(isActive)count=ownLines.length;
      }
    }else for(let i=0;i<lines.length;i++)lines[i].style.setProperty('--reveal',String(clamp(count-i)));
    essay.dataset.poemLines=String(Math.floor(count));
    poem.style.setProperty('--visible-lines',String(Math.max(2,Math.ceil(count))));
    const ending=atEnd&&finale(dt);
    if(!ending)clearFinale();
    essay.dataset.activeScene=atEnd?(ending?'finale':'collected'):scenes[Math.min(scenes.length-1,Math.max(0,Math.floor(current)))].id;
    updateCue();
  }
  function loop(now){
    loopId=null;
    if(reduced.matches)return;
    const dt=last?Math.min(.1,(now-last)/1000):.016;last=now;
    advanceClock(now);
    beats();
    current+=(target-current)*(1-Math.exp(-dt/.32));
    if(Math.abs(target-current)<.0005)current=target;
    if(!opened)render(dt);
    loopId=requestAnimationFrame(loop);
  }
  let last=0;
  function start(){if(loopId===null&&!reduced.matches){last=0;clock.last=0;loopId=requestAnimationFrame(loop)}}
  // The reader cannot scroll past the passage the music has reached.
  function requestScroll(){
    if(reduced.matches||opened)return;
    const ceiling=clock.t>=FINALE?Infinity:frontier()+.64;
    const requested=(scrollY-top)/step;
    if(requested>ceiling+.001)scrollTo({top:top+step*ceiling,behavior:'instant'});
    target=Math.max(-.1,Math.min(requested,ceiling));
  }
  function atCeiling(){return !reduced.matches&&!opened&&clock.t<FINALE&&scrollY>=top+step*(frontier()+.64)-2}
  addEventListener('wheel',event=>{if(event.deltaY>0&&atCeiling())event.preventDefault()},{passive:false});
  addEventListener('keydown',event=>{
    if(!['ArrowDown','PageDown','End',' '].includes(event.key)||event.target.closest?.('a,button,input,textarea,select,[role="button"]'))return;
    if(atCeiling())event.preventDefault();
  });
  let touchY=0;
  addEventListener('touchstart',event=>{touchY=event.touches[0]?.clientY||0},{passive:true});
  addEventListener('touchmove',event=>{
    const y=event.touches[0]?.clientY||0;
    if(y<touchY&&atCeiling())event.preventDefault();
    touchY=y;
  },{passive:false});
  function resize(){
    if(reduced.matches){journey.style.height='100svh';render();return}
    top=journey.getBoundingClientRect().top+scrollY;
    step=innerHeight*1.35;
    journey.style.height=`${step*scenes.length+innerHeight}px`;
    for(let i=0;i<scenes.length;i++)scenes[i].beat.style.top=`${step*(i+.5)}px`;
    requestScroll();
  }
  async function mode(){
    if(opened)await closeWorld();
    if(reduced.matches){
      if(loopId!==null)cancelAnimationFrame(loopId);loopId=null;
      clock.running=false;clearFinale();
      delete essay.dataset.opening;
      for(const s of scenes.slice(0,2))s.art.classList.remove('is-opening-duet');
      essay.classList.add('is-unfolding','is-static');
      current=target=scenes.length+.05;
      for(const s of scenes){state(s,'set');s.beat.style.top='0'}
      resize();render();return;
    }
    if(!butterflyFinished){
      essay.dataset.opening='joined';
      for(const s of scenes.slice(0,2))s.art.classList.add('is-opening-duet');
    }
    essay.classList.remove('is-static');
    essay.classList.add('is-unfolding');
    clock.running=true;
    resize();start();
  }
  addEventListener('scroll',requestScroll,{passive:true});
  addEventListener('resize',resize);
  reduced.addEventListener('change',mode);
  mode();
  dispatchEvent(new CustomEvent('memory-scene-start',{detail:{id:'nabokov',duration:START.burns*1000}}));
  // Native fragment links still lead to the intended reading beat.
  const hash=decodeURIComponent(location.hash.slice(1));
  if(hash&&scenes.some(s=>s.id===hash))requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView());
})();
