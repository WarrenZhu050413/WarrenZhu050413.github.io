// Quiet material sounds, driven by the frames the paintings actually render.
// The train keeps its approved separate mix; these voices sit underneath it.
(() => {
  const audio=document.getElementById('memory-soundtrack');
  if(!audio)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const {clamp}=window.memoryMotion;
  let context,master,voices,frame=null,last=0,sleepTimer;
  const pulse=(phase,power=8)=>(.5+.5*Math.cos(phase*Math.PI*2))**power;
  const read=id=>window.memoryGestures?.get(id)||{};
  const allowed=()=>!audio.paused&&!audio.ended&&!audio.seeking&&!audio.muted&&audio.volume>0&&!document.hidden&&!reduced.matches&&!document.querySelector('.memory-world-dialog[open]');
  // Each voice describes a material, not a second scene timeline.
  const score=[
    {id:'wings',band:[650,2400],gain:()=>{const v=read('butterfly');return (v.strength||0)*pulse(v.phase||0,10)*.095},pan:()=>read('butterfly').x},
    {id:'mouse',band:[500,1800],gain:()=>{const v=read('mouse');return (v.moving||0)*pulse((v.phase||0)*4,18)*.025},pan:()=>read('mouse').x},
    {id:'paws',band:[120,1100],gain:()=>{const v=read('burns');return (v.moving||0)*(pulse((v.phase||0)*4,18))*.16},pan:()=>read('burns').x},
    {id:'motor',band:[45,240],gain:()=>{const v=read('brideshead');return v.moving?clamp(v.speed/10)*.23:0},pan:()=>read('brideshead').x},
    {id:'gravel',band:[280,1600],gain:()=>{const v=read('brideshead');return v.moving?clamp(v.speed/7)*(.02+.04*pulse((v.distance||0)*.75,8)):0},pan:()=>read('brideshead').x},
    {id:'leaves',band:[550,2700],gain:()=>{const v=read('nalan');return (v.leaf||0)*.065},pan:()=>read('nalan').x},
    {id:'paper',band:[900,3400],gain:()=>{const v=read('pushkin');return (v.paper||0)*.065},pan:()=>read('pushkin').x},
    {id:'rain',band:[700,4200],gain:()=>{const v=read('wong');return (v.rain||0)*.11},pan:()=>.28},
    {id:'footsteps',band:[100,700],gain:()=>{const v=read('wong');return (v.moving||0)*pulse((v.phase||0)*2,16)*.08},pan:()=>read('wong').x},
    {id:'cord',band:[350,1600],gain:()=>{const v=read('pendant');return (v.moving||0)*.025},pan:()=>0},
  ];
  function prepare(){
    if(context)return;
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
    context=new Audio({latencyHint:'playback'});master=context.createGain();master.gain.value=0;master.connect(context.destination);
    const buffer=context.createBuffer(1,context.sampleRate*5,context.sampleRate),data=buffer.getChannelData(0);
    let seed=186;
    for(let i=0;i<data.length;i++){seed=seed*16807%2147483647;data[i]=seed/1073741824-1}
    // Equal ends remove the otherwise audible splice in each noise loop.
    for(let i=0;i<512;i++)data[i]=data[data.length-1]*(1-i/512)+data[i]*i/512;
    voices=score.map((part,index)=>{
      const source=context.createBufferSource(),high=context.createBiquadFilter(),low=context.createBiquadFilter();
      const gain=context.createGain(),pan=context.createStereoPanner();
      source.buffer=buffer;source.loop=true;
      high.type='highpass';high.frequency.value=part.band[0];high.Q.value=.5;
      low.type='lowpass';low.frequency.value=part.band[1];low.Q.value=.5;
      gain.gain.value=0;source.connect(high).connect(low).connect(gain).connect(pan).connect(master);
      source.start(0,index*.39);return {...part,gainNode:gain,panNode:pan};
    });
  }
  function quiet(){
    if(frame!==null)cancelAnimationFrame(frame);frame=null;last=0;
    if(context&&context.state!=='closed'){
      master.gain.setTargetAtTime(0,context.currentTime,.018);
      clearTimeout(sleepTimer);sleepTimer=setTimeout(()=>{if(!allowed())context.suspend().catch(()=>{})},150);
    }
    audio.dataset.sceneSound='silent';
  }
  function update(now){
    frame=null;if(!allowed()){quiet();return}
    if(now-last>=1000/30){
      last=now;let sounding=false;
      master.gain.setTargetAtTime(.12*audio.volume/.28,context.currentTime,.12);
      for(const voice of voices){
        const gain=voice.gain();sounding||=gain>.001;
        voice.gainNode.gain.setTargetAtTime(gain,context.currentTime,.025);
        voice.panNode.pan.setTargetAtTime(clamp(voice.pan()||0,-.65,.65),context.currentTime,.2);
      }
      audio.dataset.sceneSound=sounding?'playing':'silent';
    }
    frame=requestAnimationFrame(update);
  }
  async function wake(){
    if(!allowed())return;
    try{prepare();if(!context)return;clearTimeout(sleepTimer);await context.resume();if(allowed()&&frame===null)frame=requestAnimationFrame(update)}catch{quiet()}
  }
  addEventListener('memory-mouse-frame',event=>{const v=event.detail;window.memoryGestures?.set('mouse',{phase:v.phase,moving:v.moving,x:v.groundX/innerWidth*2-1})});
  for(const type of ['play','seeked'])audio.addEventListener(type,wake);
  for(const type of ['pause','ended','seeking'])audio.addEventListener(type,quiet);
  const reconcile=()=>allowed()?wake():quiet();
  audio.addEventListener('volumechange',reconcile);
  document.addEventListener('visibilitychange',reconcile);
  document.addEventListener('toggle',event=>{if(event.target.matches?.('.memory-world-dialog'))reconcile()},true);
  reduced.addEventListener('change',reconcile);
  addEventListener('pointerdown',wake,{passive:true});addEventListener('keydown',wake);
  addEventListener('pagehide',()=>{quiet();context?.close().catch(()=>{})});
  if(!audio.paused)wake();
})();
