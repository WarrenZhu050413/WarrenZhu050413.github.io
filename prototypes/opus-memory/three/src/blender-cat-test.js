import {Scene,Color,Fog,PerspectiveCamera,WebGLRenderer,HemisphereLight,DirectionalLight,Mesh,PlaneGeometry,MeshStandardMaterial,AnimationMixer,LoopRepeat,Vector3,PCFShadowMap} from 'three';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const scene=new Scene();scene.background=new Color('#171c1b');scene.fog=new Fog('#171c1b',14,35);
const renderer=new WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=PCFShadowMap;document.querySelector('main').append(renderer.domElement);
const camera=new PerspectiveCamera(32,1,.1,100);
scene.add(new HemisphereLight('#b7c9c2','#222723',1.2));
const key=new DirectionalLight('#d6ddd2',2.0);key.position.set(-3,6,-4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);scene.add(key);
const fill=new DirectionalLight('#9db2b5',.8);fill.position.set(3,4,6);scene.add(fill);
const floor=new Mesh(new PlaneGeometry(100,100),new MeshStandardMaterial({color:'#303b36',roughness:1}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
let cat,mixer,actions={},seconds=0,playing=true,last=0,inspection=false,turn=0,frames=0,measurementStart=0;
const start=performance.now();
const draco=new DRACOLoader().setDecoderPath('/assets/vendor/draco/');
const gltf=await new GLTFLoader().setDRACOLoader(draco).loadAsync('/assets/models/memory-cat.glb?v=quiet-6');
cat=gltf.scene;cat.scale.setScalar(.72);cat.traverse(o=>{if(o.isMesh){o.castShadow=/continuous|Plumed/.test(o.name);o.receiveShadow=o.castShadow}});scene.add(cat);
mixer=new AnimationMixer(cat);for(const clip of gltf.animations){const a=mixer.clipAction(clip);a.play();a.setEffectiveWeight(0);a.setLoop(LoopRepeat,Infinity);actions[clip.name]=a;}
window.catStudy={clips:gltf.animations.map(c=>({name:c.name,duration:c.duration})),loadedMs:performance.now()-start};
const status=document.querySelector('#status');status.textContent='Head turn · three steps · settle';
function pose(t){
 for(const a of Object.values(actions))a.setEffectiveWeight(0);
 const ramp=Math.max(0,Math.min(1,(t-4.2)/.45,(9.45-t)/.45));
 const walk=ramp*ramp*(3-2*ramp);
 const look=1-walk;
 const a=actions.Walk||Object.values(actions)[0],b=t<4.4?actions.Look:actions.Idle;
 a.setEffectiveWeight(walk);a.time=(Math.max(0,t-4.4)*.75)%1.2;
 if(b){b.setEffectiveWeight(look);b.time=t<4.4?Math.max(0,t-.8)/3.6*2.4:(t-4.4)%2.4;}
 mixer.update(0);cat.position.x=-1.05+Math.min(4.8,Math.max(0,t-4.4))*.437;
}
function size(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()};addEventListener('resize',size);size();
document.querySelector('#play').onclick=e=>{playing=!playing;e.target.textContent=playing?'Pause':'Play'};
document.querySelector('#replay').onclick=()=>{seconds=0;playing=true;document.querySelector('#play').textContent='Pause'};
document.querySelector('#scale').onclick=e=>{inspection=!inspection;e.target.textContent=inspection?'Scene size':'Inspect closer'};
document.querySelector('#time').oninput=e=>{seconds=+e.target.value;playing=false;document.querySelector('#play').textContent='Play'};
addEventListener('pointermove',e=>turn=(e.clientX/innerWidth-.5)*.55);
function frame(now){const dt=Math.min(.04,(now-last)/1000||0);last=now;if(playing){seconds=Math.min(12,seconds+dt);if(seconds===12){playing=false;document.querySelector('#play').textContent='Play'}}pose(seconds);
 const radius=(inspection?6.5:12)*Math.max(1,1/camera.aspect);camera.position.set(Math.sin(turn+.3)*radius,inspection?2.7:3.5,Math.cos(turn+.3)*radius);camera.lookAt(cat.position.x,.8,0);renderer.render(scene,camera);
 document.querySelector('#time').value=seconds;window.catStudy.time=seconds;window.catStudy.drawCalls=renderer.info.render.calls;window.catStudy.triangles=renderer.info.render.triangles;
 frames++;if(!measurementStart)measurementStart=now;if(now-measurementStart>=1000){window.catStudy.fps=Math.round(frames*1000/(now-measurementStart));frames=0;measurementStart=now}requestAnimationFrame(frame);
}requestAnimationFrame(frame);
