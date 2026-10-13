// The butterfly leaves the masked painting; the essay itself remains untouched.
(() => {
  const art = document.querySelector('.art-nabokov');
  const template = document.querySelector('#memory-butterfly-template');
  if (!art || !template) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const openingLine=document.querySelector('.memory-growing-poem .memory-poem-line:nth-child(2)');
  const butterfly = document.createElement('div');
  butterfly.className = 'memory-butterfly';
  butterfly.setAttribute('aria-hidden', 'true');
  butterfly.append(template.content.cloneNode(true));
  document.body.append(butterfly); // Outside every art mask and stacking context.
  const mouse=document.createElement('div');
  mouse.className='memory-mouse';mouse.setAttribute('aria-hidden','true');
  // Compact field mouse: the haunch does most of the drawing; no long snout.
  mouse.innerHTML='<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g class="memory-mouse-body"><g opacity=".55"><path class="memory-mouse-back-far" stroke="currentColor" stroke-width="1"/><path class="memory-mouse-front-far" stroke="currentColor" stroke-width="1"/></g><path class="memory-mouse-tail" d="M29 43C18 48 15 38 6 42" stroke="currentColor" stroke-width=".85" stroke-linecap="round"/><path class="memory-mouse-haunch" d="M28 38C28 32 32 28 39 28C45 28 49 31 51 35L55 39Q49 43 38 43C32 43 28 42 28 38Z" fill="currentColor"/><g class="memory-mouse-head"><path d="M46 33Q54 29 59 35L64 39 59 42 48 42Z" fill="currentColor"/><ellipse cx="51" cy="30" rx="3.5" ry="4.7" fill="currentColor"/><ellipse cx="51" cy="30" rx="1.8" ry="2.7" fill="#65746b" opacity=".3"/><circle cx="57" cy="34.5" r="1.45" fill="#142326"/><circle cx="57.4" cy="34" r=".5" fill="#d3e1d9" opacity=".9"/><path class="memory-mouse-whisker" d="m63 38 5-1m-5 2 5 1" stroke="currentColor" stroke-width=".4" opacity=".45"/></g><path class="memory-mouse-back-foot" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><path class="memory-mouse-front-foot" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></g></svg>';
  document.body.append(mouse);
  const shadow=document.createElement('div');
  shadow.className='memory-creature-shadow';shadow.setAttribute('aria-hidden','true');
  shadow.innerHTML='<svg viewBox="-46 -39 92 78" xmlns="http://www.w3.org/2000/svg"><path d="M0 0C-14-30-39-40-37-18Q-33 2-2 5C-25 7-28 27-14 27Q-1 22 0 4C14-30 39-40 37-18Q33 2 2 5C25 7 28 27 14 27Q1 22 0 4Z" fill="currentColor"/></svg>';
  document.body.append(shadow);
  const mouseShadow=mouse.cloneNode(true);
  mouseShadow.className='memory-mouse-shadow';document.body.append(mouseShadow);
  let started = false, ended = false, elapsed = 0, previous = 0, frameId = null;
  let gait=0;
  const mousePosition={x:.43,y:.65,vx:0,facing:1};
  let motionSeed=47,nextBout=1.2,pace=1,groundOffset=0,strideScale=1,strideIndex=0;
  let hasJumped=false,leapStart=-Infinity,lastFlightX=null,flightDirection=1;
  const motionRandom=()=>((motionSeed=motionSeed*16807%2147483647)-1)/2147483646;
  const leftWing=butterfly.querySelector('.memory-butterfly-left');
  const rightWing=butterfly.querySelector('.memory-butterfly-right');
  function openWings(){
    leftWing.setAttribute('transform','scale(1,1)');
    rightWing.setAttribute('transform','scale(1,1)');
  }
  const pointer={x:0,y:0,present:false};
  const drift={x:0,y:0};
  let orbit=0,curious=false,covered=false;
  let halfway=false,transferring=false;
  const mouseTail=mouse.querySelector('.memory-mouse-tail');
  const mouseHead=mouse.querySelector('.memory-mouse-head');
  const mouseBody=mouse.querySelector('.memory-mouse-body');
  const backFoot=mouse.querySelector('.memory-mouse-back-foot');
  const frontFoot=mouse.querySelector('.memory-mouse-front-foot');
  const farBack=mouse.querySelector('.memory-mouse-back-far');
  const farFront=mouse.querySelector('.memory-mouse-front-far');
  const {smooth,clamp,cubic}=window.memoryMotion;
  addEventListener('pointermove',event=>{
    if(event.pointerType==='touch')return;
    pointer.x=event.clientX;pointer.y=event.clientY;pointer.present=true;
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>{pointer.present=false});
  addEventListener('blur',()=>{pointer.present=false});
  document.addEventListener('toggle',event=>{
    if(!event.target.matches?.('.memory-world-dialog'))return;
    covered=event.target.open;previous=0;schedule();
  },true);
  // The opening keeps the essay's clock (the music's time), so it lasts as long as its phrases.
  const duration = 52000;
  // Quick flights alternate with drifting hovers, giving the mouse time to
  // close the distance. The whole encounter still occupies the same minute.
  const flightBeats=[
    [0,0],[.075,.15],[.14,.156],[.245,.26],[.30,.38],
    [.385,.387],[.46,.49],[.535,.62],[.61,.625],
    [.71,.72],[.80,.87],[.89,.882],[1,1]
  ];
  function flightProgress(progress){
    let i=0;
    while(i<flightBeats.length-2&&progress>flightBeats[i+1][0])i++;
    const [start,a]=flightBeats[i],[end,b]=flightBeats[i+1];
    const t=clamp((progress-start)/(end-start),0,1);
    return a+(b-a)*(.15*t+.85*smooth(t));
  }
  function paw(node,anchorX,anchorY,phase){
    const u=((phase%1)+1)%1,stance=.62,stride=6;
    const t=u<stance?u/stance:(u-stance)/(1-stance);
    // During stance the foot moves backward relative to the body at exactly
    // its forward speed. It stays planted in the scene until the swing.
    const x=anchorX+(u<stance?stride*(.5-t):stride*(smooth(t)-.5));
    const y=46-(u<stance?0:Math.sin(Math.PI*t)*1.8);
    node.setAttribute('d',`M${anchorX} ${anchorY}Q${(anchorX+x)/2} ${y-4} ${x} ${y}l2.3 0`);
  }
  function frame(now) {
    frameId = null;
    if (ended) return;
    // Once airborne the path uses viewport ratios, without a layout read per frame.
    const r = (!started || reduced.matches) ? art.getBoundingClientRect() : null;
    const visible = r ? r.bottom > 0 && r.top < innerHeight : true;
    if (!started && (art.dataset.state === 'present' || art.closest('figure')?.classList.contains('is-reached')) && visible) {
      started = true;

    }
    if (reduced.matches) {
      openWings();
      openingLine?.style.setProperty('--opening-ink','1');
      butterfly.style.opacity = visible ? '.5' : '0';
      butterfly.style.transform = `translate3d(${r.left+r.width*.55}px,${r.top+r.height*.43}px,0) translate(-50%,-50%)`;
      previous = now;
      return;
    }
    if (started && !document.hidden && !covered) {
      const dt=previous?Math.min(64,now-previous)/1000:0;
      const shared=window.memoryTimeline?.time?.();
      elapsed = shared===undefined ? elapsed+dt*1000 : Math.min(duration,shared*1000);
      const p = Math.min(1,elapsed/duration);
      openingLine?.style.setProperty('--opening-ink',String(smooth((p-.025)/.18))); 
      // One coordinate system for the cradle, the mouse and the butterfly.
      const w=innerWidth*.47,h=w*9/16;
      const cradle={left:innerWidth*.23-w/2,top:innerHeight*.53-h/2,w,h};
      const q=flightProgress(p);
      let x,y,angle;
      if(q<.22){
        const t=q/.22;
        x=cubic(.51,.79,.86,.64,t);y=cubic(.39,.16,.68,.52,t);angle=24*Math.sin(t*Math.PI);
      }else if(q<.44){
        const t=(q-.22)/.22;
        x=cubic(.64,.4,.2,.48,t);y=cubic(.52,.16,.2,.42,t);angle=-28*Math.sin(t*Math.PI);
      }else if(q<.66){
        const t=(q-.44)/.22;
        x=cubic(.48,.8,1.18,.78,t);y=cubic(.42,.12,.34,.56,t);angle=26*Math.sin(t*Math.PI);
      }else if(q<.86){
        const t=(q-.66)/.2;
        x=cubic(.78,.58,.25,.45,t);y=cubic(.56,.76,.44,.38,t);angle=-26*Math.sin(t*Math.PI);
      }else{
        const t=(q-.86)/.14;
        x=cubic(.45,.38,.49,.55,t);y=cubic(.38,.58,.3,.35,t);angle=16*Math.sin(t*Math.PI);
      }
      const flutter=elapsed/1000;
      const baseX=cradle.left+x*w,baseY=cradle.top+y*h+Math.sin(flutter*.8)*3;
      const dx=baseX-pointer.x,dy=baseY-pointer.y,distance=Math.hypot(dx,dy);
      const interest=pointer.present&&p<.65?clamp(1-distance/280,0,1):0;
      if(interest>0&&!curious)orbit=Math.atan2(dy,dx);
      curious=interest>0;
      orbit+=dt*.8;
      // A nearby pointer invites a loose arc, never a chase across the page.
      let aimX=(pointer.x+Math.cos(orbit)*86-baseX)*interest;
      let aimY=(pointer.y+Math.sin(orbit)*64-baseY)*interest;
      const reach=Math.hypot(aimX,aimY);
      if(reach>140){aimX*=140/reach;aimY*=140/reach}
      const ease=1-Math.exp(-dt/1.1),oldX=drift.x;
      drift.x+=(aimX-drift.x)*ease;drift.y+=(aimY-drift.y)*ease;
      const bank=dt?clamp((drift.x-oldX)/dt*.18,-12,12):0;
      // Reserve clear air over the mouse, including room for a reaching jump.
      const flightY=Math.min(baseY+drift.y,cradle.top+mousePosition.y*h-118);
      butterfly.style.transform=`translate3d(${baseX+drift.x}px,${flightY}px,0) translate(-50%,-50%) rotate(${angle+bank}deg)`;
      // SVG transforms hinge at the shared body origin, not a wing bounding box.
      const flap=.22+.78*(.5+.5*Math.cos(flutter*12.4+.24*Math.sin(flutter*1.7)));
      const fold=flap+(1-flap)*smooth((p-.96)/.04);
      leftWing.setAttribute('transform',`scale(${fold},1)`);
      rightWing.setAttribute('transform',`scale(${Math.min(1,fold+.035*Math.sin(flutter*2))},1)`);
      window.memoryGestures?.set('butterfly',{phase:(flutter*12.4+.24*Math.sin(flutter*1.7))/(Math.PI*2),strength:.7,x:(baseX+drift.x)/innerWidth*2-1});
      const distanceVeil=.54+.05*Math.sin(flutter*.27);
      butterfly.style.opacity=String(distanceVeil);
      butterfly.dataset.progress=p.toFixed(3);
      const seconds=elapsed/1000;
      if(seconds>=26&&!transferring)startTransfer();
      if(!transferring){
      // Chase the butterfly's ground projection, gathering speed then braking.
      // Its flight can leave the painting; the mouse's world ends at the cradle.
      const flightX=baseX+drift.x;
      const flightVelocity=lastFlightX===null||!dt?0:(flightX-lastFlightX)/dt;
      lastFlightX=flightX;
      if(Math.abs(flightVelocity)>12){
        flightDirection+=(Math.sign(flightVelocity)-flightDirection)*(1-Math.exp(-dt/.5));
      }
      const shadowY=cradle.top+h*.665;
      const followingDistance=.033+.022*clamp(Math.abs(flightVelocity)/45,0,1);
      const targetX=clamp((flightX-cradle.left)/w-flightDirection*followingDistance,.28,.79);
      const gap=targetX-mousePosition.x;
      if(seconds>=nextBout){
        const hesitate=motionRandom()<.28;
        pace=hesitate?0:.6+motionRandom()*.95;
        nextBout=seconds+(hesitate?.18+motionRandom()*.42:.75+motionRandom()*1.9);
        if(!hesitate)groundOffset=(motionRandom()-.5)*.017;
      }
      const desiredSpeed=Math.abs(gap)>.014?clamp(gap*1.9,-.095,.11)*pace:0;
      const braking=desiredSpeed*mousePosition.vx<=0||Math.abs(desiredSpeed)<Math.abs(mousePosition.vx);
      mousePosition.vx+=(desiredSpeed-mousePosition.vx)*(1-Math.exp(-dt/(braking?.15:.32)));
      const oldMouseX=mousePosition.x,oldMouseY=mousePosition.y;
      mousePosition.x=clamp(mousePosition.x+mousePosition.vx*dt,.28,.79);
      const groundY=.695+Math.sin((mousePosition.x-.43)*13)*.009+groundOffset;
      mousePosition.y+=(groundY-mousePosition.y)*(1-Math.exp(-dt/1.5));
      const distanceMoved=Math.hypot((mousePosition.x-oldMouseX)*w,(mousePosition.y-oldMouseY)*h);
      const mx=cradle.left+mousePosition.x*w,my=cradle.top+mousePosition.y*h;
      const speed=dt?distanceMoved/dt:0;
      const moving=clamp(speed/8,0,1);
      // 50 CSS pixels / 80 SVG units; phase follows actual distance travelled.
      gait+=distanceMoved*.62/(6*(50/80)*strideScale);
      if(Math.floor(gait)!==strideIndex){strideIndex=Math.floor(gait);strideScale=.83+motionRandom()*.34}
      const look=baseX+drift.x-mx;
      const facing=Math.sign(look)||1;
      mousePosition.facing+=(facing-mousePosition.facing)*(1-Math.exp(-dt/.22));
      const near=clamp(1-Math.hypot(look,(flightY-my)*.8)/(w*.24),0,1);
      if(!hasJumped&&seconds>3&&Math.hypot(look,(shadowY-my)*1.2)<48&&my-flightY<134){
        leapStart=seconds;hasJumped=true;
      }
      const leapTime=seconds-leapStart;
      const airborne=clamp((leapTime-.22)/.88,0,1);
      const jump=leapTime>=.22&&leapTime<1.1?4*airborne*(1-airborne):0;
      const crouch=leapTime>=0&&leapTime<.22?Math.sin(leapTime/.22*Math.PI):0;
      const depthScale=1+(mousePosition.y-.65)*1.6;
      const sniff=(1-moving)*Math.max(0,Math.sin(seconds*2.3))**8;
      const headTilt=-near*(1-moving)*5+sniff*1.3;
      mouse.style.transform=`translate3d(${mx+jump*facing*9}px,${my-jump*60}px,0) translate(-50%,-50%) scale(${depthScale})`;
      mouseBody.setAttribute('transform',`translate(40 0) scale(${mousePosition.facing} 1) translate(-40 0)`);
      mouseHead.setAttribute('transform',`rotate(${headTilt} 49 40)`);
      paw(backFoot,34,39,gait);
      paw(frontFoot,54,38,gait-.25);
      paw(farBack,35,39,gait-.5);
      paw(farFront,53,38,gait-.75);
      mouseTail.setAttribute('d',`M29 43C18 ${47+Math.sin(gait*Math.PI*2-.5)*moving*.45} 15 39 6 ${42+Math.sin(gait*Math.PI*2-1)*moving*.65}`);
      const visible=1;
      mouse.style.opacity='.48';
      mouse.dataset.progress=p.toFixed(3);
      mouse.dataset.gesture=jump>0?'jumping':moving>.15?'walking':near>.2?'looking':'sniffing';
      mouse.dataset.jumps=hasJumped?'1':'0';
      dispatchEvent(new CustomEvent('memory-mouse-frame',{detail:{phase:gait,moving,facing,heading:Math.atan2(-(shadowY-my)*2.5,look),groundX:mx,groundY:my,depthScale,jump,crouch,seconds}}));
      shadow.style.transform=`translate3d(${flightX}px,${shadowY}px,0) translate(-50%,-50%) scale(.8,.13)`;
      shadow.style.opacity=String(visible*.12*(1-Math.min(1,Math.abs(y-.65))));
      mouseShadow.style.transform=`translate3d(${mx-2}px,${my+10}px,0) translate(-50%,-50%) scale(${depthScale*(1+jump*.25)},.16)`;
      mouseShadow.style.opacity=String(visible*.065*(1-jump*.5));
      }
      if(p>=.5&&!halfway){halfway=true;dispatchEvent(new Event('memory-butterfly-halfway'))}
      if(p===1){settle();return;}

    }
    previous=now;
    if (started && !document.hidden && !covered) frameId=requestAnimationFrame(frame);
  }
  function settle(){
    if(ended)return;
    window.memoryGestures?.clear('butterfly');
    openWings();
    ended=true;openingLine?.style.setProperty('--opening-ink','1');
    if(frameId!==null)cancelAnimationFrame(frameId);frameId=null;
    // The butterfly remains in the print; the mouse walks into the field.
    for(const [element,parent,left,top,width,ratio] of [
      [butterfly,art,'55%','35%','10%','92/78']
    ]){
      if(!parent){element.remove();continue}
      parent.append(element);element.classList.add('is-inhabitant');
      Object.assign(element.style,{position:'absolute',left,top,width,height:'auto',aspectRatio:ratio,transform:'translate(-50%,-50%)'});
    }
    shadow.remove();mouseShadow.remove();
    dispatchEvent(new Event('memory-butterfly-finished'));
    if(!transferring)startTransfer();
  }
  function startTransfer(){
    if(transferring)return;
    transferring=true;
    const from=mouse.getBoundingClientRect();
    mouseShadow.remove();
    mouse.dataset.transfer='true';
    let lastTime=performance.now(),lastX=from.left+from.width/2,lastY=from.top+from.height/2;
    function transfer(now){
      const t=window.memoryTimeline?.time?.()??31;
      const target=document.querySelector('.art-burns')?._world?.travellerPosition?.();
      const progress=smooth((t-26)/5);
      if(target){
        const x=(from.left+from.width/2)*(1-progress)+target.x*progress;
        const y=(from.top+from.height/2)*(1-progress)+target.y*progress;
        const distance=Math.hypot(x-lastX,y-lastY),dt=Math.max(.001,(now-lastTime)/1000);
        gait+=distance*.15;
        mouse.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
        const moving=clamp(distance/dt/8,0,1);
        dispatchEvent(new CustomEvent('memory-mouse-frame',{detail:{phase:gait,moving,heading:Math.atan2(-(y-lastY)*2.5,x-lastX),groundX:x,groundY:y,depthScale:1,seconds:t}}));
        lastX=x;lastY=y;lastTime=now;
      }
      if(progress<1&&!reduced.matches){requestAnimationFrame(transfer);return}
      mouse.remove();
      dispatchEvent(new Event('memory-mouse-transferred'));
    }
    requestAnimationFrame(transfer);
  }
  // The same butterfly returns to lift the pendant by its cord in the coda.
  let returnFrom=null;
  addEventListener('memory-pendant-frame',event=>{
    if(reduced.matches)return;
    if(!returnFrom){
      const r=butterfly.getBoundingClientRect();returnFrom={x:r.left+r.width/2,y:r.top+r.height/2};
      document.body.append(butterfly);
      Object.assign(butterfly.style,{position:'fixed',left:'0',top:'0',width:'48px',height:'41px',aspectRatio:'92/78'});
      butterfly.classList.remove('is-inhabitant');
    }
    const {x,y,seconds}=event.detail;
    const p=smooth((seconds-168)/3),arc=Math.sin(p*Math.PI)*innerHeight*.12;
    butterfly.style.transform=`translate3d(${returnFrom.x+(x-returnFrom.x)*p}px,${returnFrom.y+(y-returnFrom.y)*p-arc}px,0) translate(-50%,-50%) rotate(${-8+Math.sin(seconds*1.2)*4}deg)`;
    window.memoryGestures?.set('butterfly',{phase:seconds*11/(Math.PI*2),strength:.5,x:x/innerWidth*2-1});
    const wing=.3+.7*(.5+.5*Math.cos(seconds*11));
    leftWing.setAttribute('transform',`scale(${wing},1)`);rightWing.setAttribute('transform',`scale(${wing},1)`);
    butterfly.style.opacity='.58';
  });
  function schedule() {
    if (!ended && frameId===null) frameId=requestAnimationFrame(frame);
  }
  addEventListener('memory-scene-skip',event=>{
    if(!['nabokov','burns'].includes(event.detail.id)||ended)return;
    if(event.detail.id==='nabokov'&&!halfway){
      elapsed=duration*.5;previous=0;schedule();return;
    }
    settle();
  });
  new MutationObserver(schedule).observe(art,{attributes:true,attributeFilter:['data-state']});
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  document.addEventListener('visibilitychange',()=>{previous=0;schedule();});
  reduced.addEventListener('change',()=>{previous=0;schedule();});
  schedule();
})();
