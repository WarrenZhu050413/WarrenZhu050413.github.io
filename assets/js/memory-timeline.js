// The score is in recording seconds. Layout, worlds and foley read this clock;
// only the reading loop ticks it. RAF schedules painting, never story time.
(() => {
  const starts=Object.freeze({nabokov:0,burns:26,brideshead:70,nalan:92,pushkin:108,wong:126,thackeray:140,coda:160});
  const score=Object.freeze({starts,finale:168,settled:178,end:180.72});
  let time=0,last=null,audio=null,started=false,running=false,hiddenPause=false;
  const bounded=value=>Math.max(0,Math.min(score.end,Number.isFinite(value)?value:0));
  function seek(value){
    time=bounded(value);
    if(audio&&Math.abs(audio.currentTime-time)>.03)audio.currentTime=time;
    window.memoryGestures?.clear();
  }
  function connect(soundtrack){
    if(!soundtrack||audio)return;
    audio=soundtrack;
    if(!audio.paused){started=true;time=bounded(audio.currentTime)}
    audio.addEventListener('play',()=>{
      // The first permitted gesture joins the silent introduction where it is.
      if(!started&&Math.abs(audio.currentTime-time)>.3)audio.currentTime=time;
      started=true;last=null;
    });
    audio.addEventListener('seeking',()=>{time=bounded(audio.currentTime);window.memoryGestures?.clear()});
    audio.addEventListener('ended',()=>{time=bounded(audio.currentTime)});
  }
  document.addEventListener('visibilitychange',()=>{
    last=null;
    if(!audio)return;
    if(document.hidden&&!audio.paused){hiddenPause=true;audio.pause()}
    else if(!document.hidden&&hiddenPause){hiddenPause=false;audio.play().catch(()=>{})}
  });
  window.memoryTimeline=Object.freeze({
    score,time:()=>time,
    sceneTime(id){return starts[id]===undefined?null:Math.max(0,time-starts[id])},
    connect,seek,
    setRunning(value){running=value;last=null},
    tick(now){
      const dt=last===null?0:Math.min(.25,(now-last)/1000);last=now;
      if(audio&&started&&!audio.seeking)time=bounded(audio.currentTime);
      else if(running&&!audio&&!document.hidden)time=bounded(time+dt);
      return time;
    }
  });
})();
