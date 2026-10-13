// Regression checks at the media/score boundary; no WebGL or browser mocks.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const source=readFileSync('assets/js/memory-timeline.js','utf8');
function fixture(){
  class Events{constructor(){this.listeners={}}addEventListener(k,f){(this.listeners[k]??=[]).push(f)}emit(k){for(const f of this.listeners[k]||[])f()}}
  const document=new Events();document.hidden=false;
  const audio=new Events();Object.assign(audio,{currentTime:0,paused:true,seeking:false});
  audio.play=async()=>{audio.paused=false;audio.emit('play')};audio.pause=()=>{audio.paused=true;audio.emit('pause')};
  const window={memoryGestures:{clear(){}}};
  vm.runInNewContext(source,{window,document});
  const clock=window.memoryTimeline;clock.connect(audio);clock.setRunning(true);
  return{clock,audio,document};
}
test('blocked autoplay keeps the introduction at zero',()=>{
  const {clock}=fixture();clock.tick(0);clock.tick(10000);assert.equal(clock.time(),0);
});
test('media time owns pause, resume and playback rate',async()=>{
  const {clock,audio}=fixture();await audio.play();audio.currentTime=12.5;clock.tick(100);assert.equal(clock.time(),12.5);
  audio.pause();clock.tick(10000);assert.equal(clock.time(),12.5);
  await audio.play();audio.currentTime=13.75;clock.tick(10100);assert.equal(clock.time(),13.75);
});
test('manual skip while paused seeks audio and all local scene times',async()=>{
  const {clock,audio}=fixture();await audio.play();audio.pause();clock.seek(92);
  assert.equal(audio.currentTime,92);assert.equal(clock.sceneTime('nalan'),0);assert.equal(clock.sceneTime('burns'),66);
  await audio.play();clock.tick(1000);assert.equal(clock.time(),92);
});
test('external media seek is reflected immediately and reaches the actual ending',async()=>{
  const {clock,audio}=fixture();await audio.play();audio.currentTime=140;audio.emit('seeking');assert.equal(clock.time(),140);
  audio.currentTime=180.72;audio.emit('ended');assert.equal(clock.time(),180.72);
});
test('hiding pauses playback; returning resumes only an automatically paused track',async()=>{
  const {clock,audio,document}=fixture();await audio.play();document.hidden=true;document.emit('visibilitychange');assert.equal(audio.paused,true);
  document.hidden=false;document.emit('visibilitychange');assert.equal(audio.paused,false);
  audio.pause();document.hidden=true;document.emit('visibilitychange');document.hidden=false;document.emit('visibilitychange');assert.equal(audio.paused,true);
});
