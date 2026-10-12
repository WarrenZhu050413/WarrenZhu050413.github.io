// A single slow crossing leaves the railway scene and passes through the page.
(() => {
  const template=document.querySelector('#memory-train-template');
  if(!template)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let train=null,elapsed=0,previous=0,frameId=null,covered=false,duration=42000;
  function frame(now){
    frameId=null;
    if(!train||reduced.matches)return;
    if(!document.hidden&&!covered){
      if(previous)elapsed+=Math.min(64,now-previous);
      const p=Math.min(1,elapsed/duration),width=Math.min(680,innerWidth*.42);
      train.style.width=`${width}px`;
      train.style.transform=`translate3d(${-width+(innerWidth+width)*p}px,${innerHeight*.29}px,0)`;
      train.style.opacity=String(Math.min(1,p/.1,(1-p)/.12)*.48);
      train.dataset.progress=p.toFixed(3);
      if(p===1){train.remove();train=null;dispatchEvent(new Event('memory-train-finished'));return}
    }
    previous=now;
    if(!document.hidden&&!covered)frameId=requestAnimationFrame(frame);
  }
  function resume(){previous=0;if(train&&frameId===null)frameId=requestAnimationFrame(frame)}
  addEventListener('memory-scene-start',event=>{
    if(event.detail.id!=='thackeray'||train||reduced.matches)return;
    duration=event.detail.duration;elapsed=0;previous=0;
    train=document.createElement('div');train.className='memory-train';train.setAttribute('aria-hidden','true');
    train.append(template.content.cloneNode(true));document.body.append(train);
    resume();
  });
  addEventListener('memory-scene-skip',event=>{
    if(event.detail.id!=='thackeray'||!train)return;
    const departing=train;train=null;
    if(frameId!==null)cancelAnimationFrame(frameId);frameId=null;
    departing.animate([{opacity:getComputedStyle(departing).opacity},{opacity:0}],{duration:600,fill:'forwards'}).finished.then(()=>departing.remove());
    dispatchEvent(new Event('memory-train-finished'));
  });
  document.addEventListener('visibilitychange',resume);
  document.addEventListener('toggle',event=>{
    if(!event.target.matches?.('.memory-world-dialog'))return;
    covered=event.target.open;resume();
  },true);
  reduced.addEventListener('change',()=>{
    if(reduced.matches&&train){train.remove();train=null;if(frameId!==null)cancelAnimationFrame(frameId);frameId=null}
  });
})();
