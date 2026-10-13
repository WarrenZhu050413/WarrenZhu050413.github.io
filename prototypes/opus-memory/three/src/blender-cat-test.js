// The long-haired cat in the Burns light, camera and choreography, through the
// same adapter contract the poem uses. The grey ellipsoid stands in for the mouse.
import { Scene, Color, Fog, PerspectiveCamera, WebGLRenderer, HemisphereLight, DirectionalLight, Mesh, PlaneGeometry,
  SphereGeometry, MeshLambertMaterial, ShaderMaterial, BackSide, Vector3, SRGBColorSpace } from 'three';
import { cat } from './memory-cat-longhair.js';

const clamp01 = x => Math.max(0, Math.min(1, x));
const seg = (s, a, b) => { const x = clamp01((s - a) / (b - a)); return x * x * (3 - 2 * x); };
const END = 44;
const REST = new URLSearchParams(location.search).has('rest');

const scene = new Scene();
scene.fog = new Fog('#c1bcb0', 7, 42);
scene.add(new Mesh(new SphereGeometry(900, 24, 16), new ShaderMaterial({
  side: BackSide, depthWrite: false, fog: false,
  uniforms: { top: { value: new Color('#bcbcb4') }, low: { value: new Color('#c8c0b1') } },
  vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
  fragmentShader: 'uniform vec3 top; uniform vec3 low; varying vec3 vP; void main(){ float t = smoothstep(-0.02, 0.45, vP.y); gl_FragColor = vec4(mix(low, top, t), 1.0);\n#include <colorspace_fragment>\n}',
})));
scene.add(new HemisphereLight(new Color('#d7d1c3'), new Color('#4d534e'), 1.5));
const sun = new DirectionalLight(new Color('#f0d9b9'), 1.2); sun.position.set(14, 7, -30); scene.add(sun);
const faceLight = new DirectionalLight('#aebbb4', .48); faceLight.position.set(4, 5, 12); scene.add(faceLight);
const field = new Mesh(new PlaneGeometry(160, 160), new MeshLambertMaterial({ color: '#857f70' }));
field.rotation.x = -Math.PI / 2; scene.add(field);
const mouse = new Mesh(new SphereGeometry(1, 16, 10), new MeshLambertMaterial({ color: '#7c8880' }));
mouse.scale.set(.27, .15, .13); scene.add(mouse);

const puss = cat(); puss.root.scale.setScalar(.72); scene.add(puss.root); window.__catRoot = puss.root; window.__cat = puss;
const P0 = new Vector3(-5, 0, -2.6), P1 = new Vector3(-.75, 0, .1), P2 = new Vector3(-10, 0, -11);
const heading1 = Math.atan2(-(P1.z - P0.z), P1.x - P0.x), heading2 = Math.atan2(-(P2.z - P1.z), P2.x - P1.x) - Math.PI * 2;
// The mouse waits where the cat's mouth reaches: .75 ahead of P1 along the approach.
const M1 = P1.clone().add(new Vector3(Math.cos(heading1), 0, -Math.sin(heading1)).multiplyScalar(.75));
const M0 = M1.clone().add(new Vector3(.6, 0, -.05));
const approach = P0.distanceTo(P1), leave = P1.distanceTo(P2);
const mouth = new Vector3();

// Burns' timing, as in memory-3d.js.
function tick(s) {
  const walkIn = clamp01((s - 2.2) / 19.8), walkOut = clamp01((s - 31) / 13);
  const eIn = walkIn * (2 - walkIn), eOut = walkOut * walkOut;
  const inPos = walkIn < 1 ? eIn : 1;
  const turn = seg(s, 29, 31.5);
  const heading = heading1 + (heading2 - heading1) * turn;
  puss.root.position.copy(P0).lerp(P1, inPos).lerp(P2, eOut);
  puss.root.rotation.y = heading;
  const travelled = inPos * approach + eOut * leave + Math.abs(heading2 - heading1) * turn * .5;
  const moving = Math.min(1, (walkIn > 0 && walkIn < 1 ? 1 - walkIn ** 3 : 0) + (walkOut > 0 ? Math.min(1, walkOut * 6) : 0) + (turn > 0 && turn < 1 ? .45 : 0));
  const lower = seg(s, 22, 25) - seg(s, 27, 29) * .82;   // the head lifts with the pickup
  const phase = travelled / .9 / .72;
  if (!REST) puss.pose({ phase, moving, lower, s, tailUp: seg(s, 29, 31), attention: (1 - seg(s, 2, 4)) * .5 });
  puss.root.updateMatrixWorld(true);
  puss.head.localToWorld(mouth.copy(puss.mouth));
  const ground = M0.clone().lerp(M1, seg(s, 3.8, 6.4)), lift = seg(s, 27, 28);
  mouse.position.copy(ground).lerp(mouth.clone().sub(new Vector3(0, .3, 0)), lift);
  mouse.position.y += .15 * (1 - lift);
  return { moving, lower, phase };
}

const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); renderer.outputColorSpace = SRGBColorSpace;
document.querySelector('main').append(renderer.domElement);
const camera = new PerspectiveCamera(30, 16 / 9, .5, 2000);
const status = document.querySelector('#status');
let seconds = Number(new URLSearchParams(location.search).get('t') ?? 0), playing = !new URLSearchParams(location.search).has('t');
let close = new URLSearchParams(location.search).has('close'), last = 0, frames = 0, since = 0;
const FACE = new URLSearchParams(location.search).has('face'), headAt = new Vector3();
window.catStudy = { ready: false };
let failed = '';
puss.ready.then(() => { window.catStudy.ready = true; }, err => { failed = `The cat could not load: ${err.message}`; });

function size() {
  const w = innerWidth, h = Math.min(innerHeight, Math.round(w * 9 / 16));
  renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
}
addEventListener('resize', size); size();
const time = document.querySelector('#time'); time.max = END;
document.querySelector('#play').textContent = playing ? 'Pause' : 'Play';
document.querySelector('#scale').textContent = close ? 'Scene size' : 'Inspect closer';
document.querySelector('#play').onclick = e => { playing = !playing; e.target.textContent = playing ? 'Pause' : 'Play'; };
document.querySelector('#replay').onclick = () => { seconds = 0; playing = true; document.querySelector('#play').textContent = 'Pause'; };
document.querySelector('#scale').onclick = e => { close = !close; e.target.textContent = close ? 'Scene size' : 'Inspect closer'; };
time.oninput = e => { seconds = +e.target.value; playing = false; document.querySelector('#play').textContent = 'Play'; };

function frame(now) {
  const dt = Math.min(.04, (now - last) / 1000 || 0); last = now;
  if (playing) seconds = Math.min(END, seconds + dt);
  const { moving, lower } = tick(seconds);
  let target = close ? puss.root.position.clone().add(new Vector3(0, .7, 0)) : new Vector3(.35, .62, -.4);
  let r = close ? 4.2 : 9.6, height = close ? 1.1 : .8;
  if (FACE) { target = puss.head.getWorldPosition(headAt); r = 1.3; height = target.y + .05; }
  const yaw = (FACE ? 40 : 16) * Math.PI / 180, pitch = 4 * Math.PI / 180;
  camera.position.set(target.x + Math.sin(yaw) * r, height + Math.sin(pitch) * r * .5, target.z + Math.cos(yaw) * r);
  camera.lookAt(target);
  renderer.render(scene, camera);
  time.value = seconds;
  status.textContent = failed || `${seconds.toFixed(1)} s · ${moving > .05 ? 'walking' : lower > .5 ? 'taking her' : lower > .1 ? 'carrying' : 'standing'}`;
  Object.assign(window.catStudy, { time: seconds, drawCalls: renderer.info.render.calls, triangles: renderer.info.render.triangles });
  frames++; if (!since) since = now;
  if (now - since >= 1000) { window.catStudy.fps = Math.round(frames * 1000 / (now - since)); frames = 0; since = now; }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
