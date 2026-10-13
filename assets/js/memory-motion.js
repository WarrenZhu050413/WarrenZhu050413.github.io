// Shared, frame-rate independent motion. Scene code owns meaning and timing;
// these small functions only supply interpolation and a quiet arrival/departure.
(() => {
  const clamp=(value,low=0,high=1)=>Math.max(low,Math.min(high,value));
  const smooth=value=>{const t=clamp(value);return t*t*(3-2*t)};
  const mix=(a,b,t)=>a+(b-a)*t;
  const damp=(value,target,dt,seconds)=>mix(value,target,1-Math.exp(-Math.max(0,dt)/seconds));
  const cubic=(a,b,c,d,t)=>(1-t)**3*a+3*(1-t)**2*t*b+3*(1-t)*t*t*c+t**3*d;
  function drift(alpha,{x,y,arc=0,departure=0},leaving,time=0){
    const distance=1-clamp(alpha),direction=leaving?-1:1;
    return {x:direction*x*distance+Math.sin(alpha*Math.PI)*arc,
      y:direction*y*distance-(leaving?departure*distance:0)+Math.sin(time*.73+x)*.8*distance,
      blur:distance*2.2};
  }
  const span=(time,start,end)=>smooth((time-start)/(end-start));
  window.memoryMotion=Object.freeze({clamp,smooth,mix,damp,cubic,drift,span});
  // Renderers publish the motion they actually drew. Foley follows these values,
  // so a frozen print, a paused reading, or a seek cannot leave a sound behind.
  const gestures=new Map();
  window.memoryGestures=Object.freeze({
    set(id,gesture){gestures.set(id,{...gesture,at:performance.now()})},
    get(id){const value=gestures.get(id);return value&&performance.now()-value.at<250?value:null},
    clear(id){gestures.delete(id)}
  });
})();
