const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const button=document.getElementById('motion');
const scenes=[...document.querySelectorAll('.scene')];
let staticMode=reduced.matches;
let shader;
let pending=false;
const clamp=(v)=>Math.max(0,Math.min(1,v));
const smooth=(v)=>{v=clamp(v);return v*v*(3-2*v)};
function render(){
 pending=false;
 const h=innerHeight;
 const progress=clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-h));
 document.getElementById('progress').style.transform=`scaleX(${progress})`;
 document.getElementById('light').style.opacity=staticMode?'.12':String(.23-.08*progress);
 if(staticMode)return;
 for(const scene of scenes){
  const r=scene.getBoundingClientRect();
  let opacity;
  if(scene.classList.contains('dwell')){
   const entering=smooth((h-r.top)/(.55*h));
   opacity=entering*smooth(r.bottom/(.65*h));
  }else{
   const entering=smooth((h-r.top)/(.32*h));
   const leaving=smooth(r.bottom/(.18*h));
   opacity=entering*leaving;
  }
  const el=scene.querySelector('.reveal');
  el.style.setProperty('--opacity',opacity.toFixed(3));
  el.style.setProperty('--lift',`${(1-opacity)*14}px`);
  el.style.setProperty('--blur',`${(1-opacity)*1.3}px`);
 }
}
function schedule(){if(!pending){pending=true;requestAnimationFrame(render)}}
function mode(value){
 staticMode=value;
 document.body.classList.toggle('static',value);
 document.body.classList.toggle('is-motion',!value);
 button.setAttribute('aria-pressed',String(value));
 button.textContent=value?'Enable motion':'Read without motion';
 shader?.setSpeed(value?0:.12);
 render();
}
button.addEventListener('click',()=>mode(!staticMode));
reduced.addEventListener('change',e=>mode(e.matches));
addEventListener('scroll',schedule,{passive:true});
addEventListener('resize',schedule);
mode(staticMode);
async function mountLight(){
 if(reduced.matches)return;
 try{
  const [{ShaderMount},{godRaysFragmentShader},{getShaderColorFromString:color},{getShaderNoiseTexture}]=await Promise.all([
   import('./paper-shaders/shader-mount.js'),import('./paper-shaders/shaders/god-rays.js'),import('./paper-shaders/get-shader-color-from-string.js'),import('./paper-shaders/get-shader-noise-texture.js')
  ]);
  const noise=getShaderNoiseTexture();
  if(noise&&!noise.complete)await noise.decode();
  shader=new ShaderMount(document.getElementById('light'),godRaysFragmentShader,{
   u_colorBack:color('#111414'),u_colorBloom:color('#d9e0d2'),
   u_colors:['#94a99a','#b9baa3','#5b7672'].map(color),u_colorsCount:3,
   u_bloom:.1,u_intensity:.35,u_density:.25,u_spotty:.2,u_midSize:.3,u_midIntensity:0,
   u_noiseTexture:noise,u_fit:2,u_scale:1.6,u_rotation:135,u_originX:.22,u_originY:.2,
   u_offsetX:0,u_offsetY:0,u_worldWidth:0,u_worldHeight:0
  },undefined,staticMode?0:.12,0,1,1000000);
  document.body.dataset.shader='ready';
 }catch(error){document.body.dataset.shader='fallback';console.warn('Using static light background:',error.message)}
}
mountLight();
addEventListener('pagehide',()=>shader?.dispose(),{once:true});
