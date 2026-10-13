// Shadow worlds in three dimensions. Each scene is a few dark volumes in fog,
// lit from behind, with still water that holds them upside down. The camera
// sits across the water and turns around the subject with the pointer.
// The lifecycle is the same as the SVG scenes (memory-visuals.js): the world
// runs only while present; when it sets, the last frame is the one that stays.
import {
  Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer, Color, Fog, Vector3, Group, Mesh,
  BoxGeometry, CylinderGeometry, SphereGeometry, IcosahedronGeometry, PlaneGeometry, ConeGeometry,
  MeshLambertMaterial, MeshBasicMaterial, ShaderMaterial, HemisphereLight, DirectionalLight,
  BackSide, DoubleSide, CanvasTexture, SpriteMaterial, Sprite, MathUtils, SRGBColorSpace, BufferGeometry,
  Float32BufferAttribute, LineSegments, LineBasicMaterial, Line, PointLight, PCFShadowMap, CatmullRomCurve3, TubeGeometry, Shape, ExtrudeGeometry,
  ShapeGeometry, Raycaster, Plane, Vector2, AdditiveBlending, InstancedMesh, Object3D,
} from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { cat } from './memory-cat.js';

const PAL = {
  skyTop: '#c3c7c1', skyLow: '#c9c6bd', fog: '#c9c6bd', mass: '#66706b', woods: '#68736d',
  ground: '#717b75', water: '#7d8781', near: '#2f3935', lamp: '#ecd3a0', green: '#a7c9a0', swan: '#dcdad2',
};

const rng = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);
const rand = (a, b) => a + (b - a) * rng();
const clamp01 = x => Math.max(0, Math.min(1, x));
// Eased progress through one beat of a story, from second a to second b.
const seg = (s, a, b) => { const x = clamp01((s - a) / (b - a)); return x * x * (3 - 2 * x); };

// ---------------------------------------------------------------- shared kit
function skyDome(scene, top = PAL.skyTop, low = PAL.skyLow) {
  const mat = new ShaderMaterial({
    side: BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new Color(top) }, low: { value: new Color(low) } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 top; uniform vec3 low; varying vec3 vP; void main(){ float t = smoothstep(-0.02, 0.45, vP.y); gl_FragColor = vec4(mix(low, top, t), 1.0);\n#include <colorspace_fragment>\n}',
  });
  const dome = new Mesh(new SphereGeometry(900, 24, 16), mat);
  scene.add(dome);
  return dome;
}

function water(scene, size = 900, tint = PAL.water) {
  const shader = {
    name: 'ShadowWater',
    uniforms: {
      color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null },
      uTime: { value: 0 }, uTint: { value: new Color(tint) }, uFog: { value: new Color(PAL.fog) },
      uCam: { value: new Vector3() },
    },
    vertexShader: `uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW;
      void main(){ vUv = textureMatrix * vec4(position,1.0); vW = (modelMatrix * vec4(position,1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; uniform vec3 uTint; uniform vec3 uFog; uniform vec3 uCam;
      varying vec4 vUv; varying vec3 vW;
      void main(){
        vec4 uv = vUv;
        float w = sin(vW.z * 1.1 + uTime * 1.2) * 0.6 + sin(vW.z * 2.7 - uTime * 0.8 + vW.x * 0.15) * 0.4;
        uv.x += w * 0.010 * uv.w; uv.y += w * 0.004 * uv.w;
        vec3 refl = texture2DProj(tDiffuse, uv).rgb;
        float d = length(vW - uCam);
        float glint = 0.0 * smoothstep(0.82, 1.0, sin(vW.x * 0.9 + uTime * 0.5) * sin(vW.z * 3.1 + uTime * 0.9)) * smoothstep(140.0, 40.0, d) * 0.25;
        vec3 c = mix(uTint, refl, 0.58) + glint;
        c = mix(c, uFog, smoothstep(40.0, 300.0, d) * 0.9);
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
  };
  const r = new Reflector(new PlaneGeometry(size, size), { shader, textureWidth: 1024, textureHeight: 576, clipBias: 0.003, multisample: 0 });
  r.rotation.x = -Math.PI / 2;
  scene.add(r);
  return r;
}

const lambert = (c, extra = {}) => new MeshLambertMaterial({ color: new Color(c), ...extra });

function add(group, geo, mat, x, y, z, sx = 1, sy = 1, sz = 1) {
  const m = new Mesh(geo, mat);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  group.add(m);
  return m;
}

function woods(scene, spots, color = PAL.woods) {
  const mat = lambert(color);
  const geo = new SphereGeometry(1, 14, 10);
  for (const [x, z, s] of spots) {
    const n = 2 + Math.floor(rng() * 3);
    for (let i = 0; i < n; i++) {
      add(scene, geo, mat, x + rand(-s, s), s * rand(.35, .6), z + rand(-s, s) * .6, s * rand(1, 1.5), s * rand(.6, .85), s * rand(.8, 1.2));
    }
  }
}

function ridges(scene, z, color, count = 9, spread = 900, h = [8, 22]) {
  const mat = new MeshBasicMaterial({ color: new Color(color) });
  const geo = new SphereGeometry(1, 18, 10);
  for (let i = 0; i < count; i++) add(scene, geo, mat, -spread / 2 + (i + rand(0, 1)) * spread / count, 0, z + rand(-30, 30), rand(60, 120), rand(...h), rand(30, 60));
}

function softSprite(color = '#e2dfd6') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, color); grad.addColorStop(1, 'rgba(226,223,214,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

function mist(scene, spots, opacity = .32) {
  const tex = softSprite();
  return spots.map(([x, y, z, w, h]) => {
    const s = new Sprite(new SpriteMaterial({ map: tex, transparent: true, opacity, depthWrite: false, fog: true }));
    s.position.set(x, y, z); s.scale.set(w, h, 1);
    s.userData.x0 = x; s.userData.speed = rand(.3, .8); s.userData.phase = rand(0, 6);
    scene.add(s);
    return s;
  });
}

function reedArc(scene, target, radius, from, to, count, color = PAL.near) {
  const mat = new MeshBasicMaterial({ color: new Color(color), side: DoubleSide, fog: false });
  const reeds = [];
  for (let i = 0; i < count; i++) {
    const a = MathUtils.degToRad(rand(from, to));
    const r = radius + rand(-4, 4);
    const h = rand(2.2, 6);
    const geo = new ConeGeometry(.045, h, 3, 1, true);
    geo.translate(0, h / 2, 0);
    const m = new Mesh(geo, mat);
    m.position.set(target.x + Math.sin(a) * r, -.2, target.z + Math.cos(a) * r);
    m.rotation.z = rand(-.12, .12);
    m.userData = { base: m.rotation.z, amp: rand(.02, .05), speed: rand(.6, 1.2), phase: rand(0, 6) };
    scene.add(m);
    reeds.push(m);
  }
  return reeds;
}

function lights(group, spots, color = PAL.lamp, size = [.35, .6]) {
  const geo = new PlaneGeometry(...size);
  return spots.map(([x, y, z], i) => {
    const mat = new MeshBasicMaterial({ color: new Color(color), transparent: true, opacity: .6, fog: false });
    const m = add(group, geo, mat, x, y, z);
    m.userData = { speed: .25 + i * .05, phase: i * 1.7 };
    return m;
  });
}

function rooks(scene, centre, count = 3) {
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute([-.5, .15, 0, 0, 0, 0, 0, 0, 0, .5, .15, 0], 3));
  const mat = new LineBasicMaterial({ color: new Color('#4b5450') });
  return Array.from({ length: count }, (_, i) => {
    const b = new LineSegments(geo, mat);
    b.userData = { r: rand(8, 16), h: centre.y + rand(4, 10), speed: rand(.12, .2) * (i % 2 ? 1 : -1), phase: rand(0, 6), centre };
    scene.add(b);
    return b;
  });
}

// ---------------------------------------------------------------- Brideshead
function brideshead(scene) {
  scene.fog = new Fog(PAL.fog, 40, 300);
  skyDome(scene);
  scene.add(new HemisphereLight(new Color('#d6d3ca'), new Color('#59625d'), 1.5));
  const sun = new DirectionalLight(new Color('#efe0c8'), .55);
  sun.position.set(-60, 30, -120); // low, behind the house: we see its shadow side
  scene.add(sun);

  const water_ = water(scene);
  ridges(scene, -330, '#8a938d', 10, 1100, [10, 22]);
  ridges(scene, -200, '#7a847e', 8, 800, [4, 9]);
  // Far shore and park, with a lawn running down to the water in front of the house.
  add(scene, new BoxGeometry(900, 1, 292), lambert(PAL.ground), 0, -.3, -122);

  const house = new Group();
  const stone = lambert(PAL.mass);
  const lead = lambert('#56615c');
  const box = new BoxGeometry(1, 1, 1);
  // Wings and the centre block.
  add(house, box, stone, -23, 2.9, -4.5, 26, 5.8, 9);
  add(house, box, stone, 23, 2.9, -4.5, 26, 5.8, 9);
  add(house, box, stone, 0, 4.6, -6, 20, 9.2, 13);
  // Pediment: a triangular prism across the front of the block.
  const ped = add(house, new CylinderGeometry(1, 1, 1, 3), stone, 0, 9.9, -.6, 7.4, 1.4, 1.6);
  ped.rotation.set(Math.PI / 2, 0, Math.PI / 2); ped.scale.set(1.3, 13.5, .75);
  // Drum, dome, lantern, finial.
  add(house, new CylinderGeometry(3.3, 3.4, 3.2, 16), stone, 0, 10.8, -6);
  add(house, new SphereGeometry(3.35, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), lead, 0, 12.4, -6, 1, 1.18, 1);
  const dome = house.children[house.children.length - 1];
  // When the lantern goes, the crown of the dome goes in with it.
  const broken = new Group(); broken.position.set(0, 12.4, -6); broken.scale.set(1, 1.18, 1); broken.visible = false; house.add(broken);
  add(broken, new SphereGeometry(3.35, 24, 12, Math.PI / 2 + .55, Math.PI * 2 - 1.1, .5, Math.PI / 2 - .5), lead, 0, 0, 0);
  add(broken, new SphereGeometry(3.2, 20, 10, 0, Math.PI * 2, .5, Math.PI / 2 - .5), new MeshLambertMaterial({ color: new Color('#2b312e'), side: BackSide }), 0, 0, 0);
  // What falls first: the lantern, the stacks along the roofs, the statues.
  const falls = [];
  const fall = (m, at) => { m.userData.fall = { at, y: m.position.y, h: m.scale.y * (m.geometry.parameters.height || 1), tilt: rand(-.5, .5) }; falls.push(m); return m; };
  fall(add(house, new CylinderGeometry(.75, .8, 1.6, 10), stone, 0, 16.6, -6), 17);
  fall(add(house, new SphereGeometry(.8, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), lead, 0, 17.4, -6), 16.6);
  fall(add(house, new CylinderGeometry(.06, .06, 1.8, 4), lead, 0, 18.6, -6), 16.2);
  for (const x of [-33, -31.6, -25, -17, -15.6, 15.6, 17, 25, 31.6, 33]) fall(add(house, box, stone, x, 6.6, -6, .7, 1.8, .7), rand(5, 22));
  for (const x of [-8.6, -7.3, 7.3, 8.6]) fall(add(house, box, stone, x, 10.2, -9, .7, 2.2, .7), rand(8, 21));
  add(house, new CylinderGeometry(1.1, 1.1, 1.2, 12), stone, 32, 6.4, -4.5);
  add(house, new SphereGeometry(1.1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), lead, 32, 7, -4.5, 1, 1.2, 1);
  // A few statues on the skyline: posts, no more.
  for (const x of [-34, -28, -20, -12, -6.8, 6.8, 12, 20, 28, 34]) fall(add(house, box, stone, x, 6.2, -.3, .3, .8, .3), rand(4, 20));
  // Ivy, which will take the walls.
  const ivy = [];
  const leaves = lambert('#4b564f');
  // Each climbs from the ground: small leaves appear one above another.
  const leafBlob = new SphereGeometry(1, 8, 6);
  for (const [x, z, height, at] of [[-31, .1, 5, 5], [-22.5, .1, 3.5, 9], [-13, .1, 4.6, 7], [11.5, .1, 3.2, 12], [21, .1, 5.2, 6], [33.5, .1, 4, 10],
    [-8.5, 1, 7.5, 8], [6.8, 1, 8.4, 11], [-2, 1, 4.5, 15]]) {
    for (let i = 0; i < 14; i++) {
      const u = i / 13, r = rand(.35, .7) * (1 - u * .4);
      const m = add(house, leafBlob, leaves, x + rand(-1.1, 1.1) * (1 - u * .5), u * height + .3, z, r, r * .8, .25);
      m.userData = { r, at: at + u * 7 }; m.scale.setScalar(.001); ivy.push(m);
    }
  }
  // The chapel, at the east end: a gable, a cross, and the lamp in its window.
  const chapel = new Group();
  add(chapel, box, stone, 0, 2.7, 0, 4.6, 5.4, 8);
  const gable = new Shape(); gable.moveTo(-2.5, 0); gable.lineTo(0, 2.6); gable.lineTo(2.5, 0); gable.lineTo(-2.5, 0);
  add(chapel, new ExtrudeGeometry(gable, { depth: 8.2, bevelEnabled: false }), lead, 0, 5.4, -4.1);
  add(chapel, box, stone, 0, 8.9, 4.1, .16, 1.7, .16); add(chapel, box, stone, 0, 9.25, 4.1, .9, .16, .16);
  const sanctuary = lights(chapel, [[0, 2.9, 4.05]], '#e8b088', [.5, 1.5])[0];
  chapel.position.set(-41.5, .2, -4); scene.add(chapel);
  house.position.y = .2;
  scene.add(house);
  const windows = lights(house, [[-3.4, 3, .55], [-1.2, 3, .55], [1.2, 3, .55], [3.4, 3, .55], [-18, 2.4, .05], [14, 2.4, .05], [0, 7, .55]]);

  woods(scene, [[-56, -8, 4], [-66, -16, 5], [-80, -6, 4], [-46, -26, 5], [54, -8, 4], [66, -18, 5], [80, -8, 4], [46, -28, 5],
    [-104, -20, 6], [104, -22, 6], [-22, -32, 5], [22, -34, 5], [-4, -46, 6], [-140, -40, 8], [140, -44, 8], [-180, -70, 10], [180, -70, 10]]);
  const fog = mist(scene, [[-30, 1.2, 8, 60, 3], [30, 1, 4, 70, 3.5], [0, 1.6, -2, 90, 4], [-60, 1.4, -10, 80, 4], [60, 1.2, 14, 50, 2.5]]);

  // The Atlas fountain on the lawn, and the drive that comes round to it.
  const fountain = atlasFountain(scene, 0, 12.5);
  const drive = new CatmullRomCurve3([new Vector3(-150, 0, 19), new Vector3(-95, 0, 20.5), new Vector3(-55, 0, 20),
    new Vector3(-28, 0, 17.5), new Vector3(-14, 0, 15.6), new Vector3(-9.5, 0, 15.2)]);
  add(scene, ribbon(drive.getSpacedPoints(80), [[-1.3, .24], [1.3, .24]]), lambert('#8d938b', { side: DoubleSide }), 0, 0, 0);
  const car = tourer();
  scene.add(car.group);
  // Out from the door, once round the fountain, and away down the drive.
  const leaving = new CatmullRomCurve3([new Vector3(4.5, 0, 3.4), new Vector3(-2, 0, 3.6), new Vector3(-7.4, 0, 7.2), new Vector3(-8.6, 0, 13.2),
    new Vector3(-5.6, 0, 19.4), new Vector3(.5, 0, 21), new Vector3(6.6, 0, 18.6), new Vector3(8.8, 0, 12.4), new Vector3(6.4, 0, 6.6),
    new Vector3(.5, 0, 4.2), new Vector3(-6.5, 0, 6.4), new Vector3(-11.5, 0, 13.6), new Vector3(-16, 0, 15.8), new Vector3(-28, 0, 17.5),
    new Vector3(-55, 0, 20), new Vector3(-95, 0, 20.5), new Vector3(-150, 0, 19)]);
  const progressAt = time => .12 * seg(time, 2, 8) + .22 * seg(time, 4, 16) + .66 * seg(time, 13, 22);
  const wake = roadWake(scene, leaving, progressAt);
  const motion = {};
  const ruin = new Color(PAL.mass), stoneFresh = new Color(PAL.mass), stoneOld = new Color('#5c6560');
  // Our own bank, near: grass, and the bear someone has left sitting on it.
  const bank = new Shape();
  bank.moveTo(-90, 2); bank.bezierCurveTo(-62, -3, -40, 0, -24, -7); bank.bezierCurveTo(-12, -12, -6, -24, -3, -64); bank.lineTo(-90, -64); bank.lineTo(-90, 2);
  const near = add(scene, new ShapeGeometry(bank, 32), lambert('#68726b'), 0, .3, 74);
  near.rotation.x = -Math.PI / 2;
  const tufts = [];
  const tuftMat = new MeshBasicMaterial({ color: new Color('#46504a'), side: DoubleSide });
  for (let i = 0; i < 90; i++) {
    const h = rand(.5, 1.5), geo = new ConeGeometry(.05, h, 3, 1, true); geo.translate(0, h / 2, 0);
    const x = rand(-48, -10), z = 74 + rand(3, 24) + Math.max(0, x + 24) * 1.6;
    const m = add(scene, geo, tuftMat, x, .3, z); m.rotation.z = rand(-.2, .2);
    m.userData = { base: m.rotation.z, phase: rand(0, 6) }; tufts.push(m);
  }
  const bear = aloysius(); bear.position.set(-18, .3, 88); bear.rotation.y = .2; scene.add(bear);

  // Two swans, far out.
  const swanMat = new MeshBasicMaterial({ color: new Color(PAL.swan), fog: true });
  const swans = new Group();
  [0, 1.4].forEach(dx => add(swans, new SphereGeometry(.35, 8, 6), swanMat, dx, .18, 0, 1.4, .5, .7));
  swans.position.set(20, 0, 26);
  scene.add(swans);
  rowingBoat(scene, 24, 52);

  const target = new Vector3(0, 6.5, -4);
  const reeds = reedArc(scene, new Vector3(-4, 0, 178), 96, -30, -6, 26);
  const birds = rooks(scene, new Vector3(0, 14, -6));

  return {
    target, radius: 165, height: 4.2, fov: 23, water: water_, still: 28, motion,
    tick(t, s, dt, attention = {x:0,y:0}) {
      // The car pulls away from the door, goes once round the fountain, and leaves.
      const along = progressAt(s);
      const pace = (progressAt(s + .025) - progressAt(Math.max(0, s - .025))) / .05;
      wake.tick(s, along, pace, attention);
      Object.assign(motion, {distance: along * leaving.getLength(), speed: pace * leaving.getLength(), x: car.group.position.x / 70, moving: along > 0 && along < .995});
      const roadDistance=along*leaving.getLength();
      // Suspension responds to distance over the road, not an idle vibration.
      const roughness=(Math.sin(roadDistance*3.7)+.4*Math.sin(roadDistance*8.3))*.012*Math.min(1,pace*28);
      car.group.position.copy(leaving.getPointAt(along)).setY(.24+roughness);
      car.group.rotation.x=Math.sin(roadDistance*2.1)*.009*Math.min(1,pace*28);
      car.group.position.z+=attention.x*.15*Math.sin(along*Math.PI);
      const d = leaving.getTangentAt(along);
      car.group.rotation.y = Math.atan2(-d.z, d.x);
      car.group.visible = along < .995;
      for (const w of car.wheels) w.rotation.z = -along * leaving.getLength() / (.36 * 1.5);
      // Meanwhile the house goes: stacks and statues fall, the lantern goes in,
      // ivy takes the walls, the windows go dark and the fountain stops.
      for (const m of falls) {
        const f = m.userData.fall, k = seg(s, f.at, f.at + 1.8);
        m.position.y = f.y - k * (f.h + .8);
        m.rotation.z = f.tilt * k;
        m.visible = k < 1;
      }
      const caved = s > 17.2;
      dome.visible = !caved; broken.visible = caved;
      for (const m of ivy) m.scale.set(m.userData.r, m.userData.r * .8, .25).multiplyScalar(Math.max(.001, seg(s, m.userData.at, m.userData.at + 2.5)));
      stone.color.copy(stoneFresh).lerp(stoneOld, seg(s, 3, 26));
      const lit = 1 - seg(s, 6, 22);
      windows.forEach((w, i) => { w.visible = seg(s, 6 + i * 2.2, 7 + i * 2.2) < 1; });
      sanctuary.material.opacity = .55 + .25 * seg(s, 10, 24) + Math.sin(s * 2.3) * .04 + Math.sin(s * 5.1) * .02;
      fountain.tick(s, 1 - seg(s, 15, 22));
      swans.position.set(20 - s * .22, 0, 26 + Math.sin(s * .1) * .6);
      for (const m of tufts) m.rotation.z = m.userData.base + Math.sin(s * .9 + m.userData.phase + m.position.x * .1) * .06 + attention.x * .035;
      water_.material.uniforms.uTime.value = t;
      for (const w of windows) w.material.opacity = .45 + .35 * Math.sin(t * w.userData.speed + w.userData.phase) ** 2;
      for (const m of fog) m.position.x = m.userData.x0 + Math.sin(t * .05 * m.userData.speed + m.userData.phase) * 12 + attention.x * 2;
      for (const r of reeds) r.rotation.z = r.userData.base + Math.sin(t * r.userData.speed + r.userData.phase) * r.userData.amp;
      for (const b of birds) {
        const u = b.userData, a = t * u.speed + u.phase;
        b.position.set(u.centre.x + Math.cos(a) * u.r, u.h + Math.sin(a * 2) * .6, u.centre.z + Math.sin(a) * u.r * .6);
        b.scale.y = 1 + Math.sin(t * 9 + u.phase) * .8;
      }
    },
    camUniform: water_.material.uniforms.uCam,
  };
}

function atlasFountain(scene, x, z) {
  // A round basin, a plinth and a figure holding up a globe; the water is mist.
  const stone = lambert('#77807a'), g = new Group();
  add(g, new CylinderGeometry(5.6, 5.8, .7, 40), stone, 0, .55, 0);
  add(g, new CylinderGeometry(5.2, 5.2, .1, 40), new MeshBasicMaterial({ color: new Color('#a6aea8') }), 0, .86, 0);
  add(g, new CylinderGeometry(1.1, 1.5, 2.2, 12), stone, 0, 1.7, 0);
  add(g, new CylinderGeometry(.42, .55, 1.5, 8), stone, 0, 3.4, 0);
  add(g, new SphereGeometry(1.15, 16, 12), stone, 0, 5, 0);
  for (const a of [0, 1.57, 3.14, 4.71]) add(g, new SphereGeometry(.5, 8, 6), stone, Math.cos(a) * 2.4, 1.2, Math.sin(a) * 2.4, 1, .7, 1);
  g.position.set(x, 0, z); scene.add(g);
  const tex = softSprite('#e9ece6');
  const drops = Array.from({ length: 46 }, (_, i) => {
    const sp = new Sprite(new SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false }));
    sp.userData = { phase: i / 46, a: i * 2.4, jet: i % 5 };
    scene.add(sp); return sp;
  });
  return {
    tick(s, flow = 1) {
      for (const d of drops) {
        const u = d.userData, k = (s * .55 + u.phase) % 1;
        if (u.jet === 0) { // the plume from the globe
          d.position.set(x + Math.cos(u.a) * k * 1.2, 6.2 + k * 3.4 - k * k * 3.2, z + Math.sin(u.a) * k * .9);
        } else {            // four low jets arching into the basin
          const a = u.jet * 1.57 + .78, r = 1.6 + k * 2.8;
          d.position.set(x + Math.cos(a) * r, 1.4 + k * 2.6 - k * k * 2.7, z + Math.sin(a) * r);
        }
        d.scale.setScalar(.5 + k * .9);
        d.material.opacity = .34 * Math.sin(k * Math.PI) * flow;
      }
    },
  };
}

function tourer() {
  // An open two-seater of the twenties: long bonnet, upright radiator, wire wheels.
  const g = new Group(), paint = lambert('#28302d'), trim = lambert('#47504b'), box = new BoxGeometry(1, 1, 1);
  const profile=new Shape();
  profile.moveTo(-1.42,.38);profile.lineTo(1.43,.38);profile.lineTo(1.43,.84);
  profile.quadraticCurveTo(.7,.95,.11,.9);profile.lineTo(-.03,.59);
  profile.lineTo(-.63,.59);profile.quadraticCurveTo(-.8,1.04,-1.29,.94);profile.closePath();
  const coach=new ExtrudeGeometry(profile,{depth:.78,bevelEnabled:true,bevelThickness:.045,bevelSize:.045,bevelSegments:3,steps:1});
  add(g,coach,paint,0,0,-.39);
  add(g,box,trim,1.44,.65,0,.045,.46,.61);
  for(const z of [-.41,.41]){
    const frame=line([new Vector3(.05,.89,z),new Vector3(-.08,1.35,z)],'#66726b');g.add(frame);
    const arch=[];for(let j=0;j<=18;j++){const a=j/18*Math.PI;arch.push(new Vector3(-.86+Math.cos(a)*.49,.4+Math.sin(a)*.48,z*1.25))}
    g.add(new Mesh(new TubeGeometry(new CatmullRomCurve3(arch),18,.055,6,false),paint));
  }
  const windshield=add(g,new PlaneGeometry(.8,.43),new MeshBasicMaterial({color:'#a3b2aa',transparent:true,opacity:.17,side:DoubleSide}),-.015,1.12,0);
  windshield.rotation.y=Math.PI/2;windshield.rotation.x=.2;
  add(g,box,trim,-.68,.76,0,.14,.26,.67).rotation.z=-.1;
  const wheels = [];
  for (const [x, z] of [[.95, .5], [.95, -.5], [-.85, .5], [-.85, -.5]]) {
    const w = new Group();
    add(w, new CylinderGeometry(.36, .36, .1, 18), lambert('#1f2523'), 0, 0, 0).rotation.x = Math.PI / 2;
    for (let i = 0; i < 4; i++) add(w, box, trim, 0, 0, Math.sign(z) * .06, .6, .03, .02).rotation.z = i * Math.PI / 4;
    w.position.set(x, .36, z); g.add(w); wheels.push(w);
    add(g, new CylinderGeometry(.42, .42, .16, 12, 1, true, 0, Math.PI), paint, x, .4, z).rotation.set(Math.PI / 2, 0, 0);
  }
  g.scale.setScalar(1.5);
  return { group: g, wheels };
}

function roadWake(scene, path, progressAt) {
  // Two translucent wheel traces, revealed behind the rear axle. One mesh;
  // neither particles nor track segments accumulate during a long visit.
  const positions=[],progress=[],indices=[],n=180;
  for(let i=0;i<=n;i++){
    const u=i/n,p=path.getPointAt(u),d=path.getTangentAt(u),side=new Vector3(-d.z,0,d.x);
    for(const offset of [-.73,.73])for(const width of [-.045,.045]){
      const v=p.clone().addScaledVector(side,offset+width);positions.push(v.x,.285,v.z);progress.push(u);
    }
    if(i<n)for(const j of [0,2]){const a=i*4+j;indices.push(a,a+4,a+1,a+1,a+4,a+5)}
  }
  const geo=new BufferGeometry();geo.setAttribute('position',new Float32BufferAttribute(positions,3));
  geo.setAttribute('along',new Float32BufferAttribute(progress,1));geo.setIndex(indices);
  const uniforms={head:{value:0}};
  const mat=new ShaderMaterial({transparent:true,depthWrite:false,side:DoubleSide,uniforms,
    vertexShader:'attribute float along; varying float progress; void main(){progress=along;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float head; varying float progress; void main(){float age=head-progress; float a=smoothstep(0.,.008,age)*(1.-smoothstep(.08,.2,age));gl_FragColor=vec4(.16,.18,.16,a*.23);}' });
  scene.add(new Mesh(geo,mat));
  const dust=smoke(scene,12,'#b1aea0');
  return {tick(s,along,pace,attention){
    uniforms.head.value=Math.max(0,along-.002);
    for(let i=0;i<dust.length;i++){
      const age=(s+i*.31)%3.7,born=s-age,u=progressAt(Math.max(0,born));
      const active=born>2&&u<.995&&pace>.001,particle=dust[i];
      const p=path.getPointAt(u),direction=path.getTangentAt(u);
      particle.position.copy(p).addScaledVector(direction,-1.5-age*.18);
      particle.position.x+=Math.sin(i*2.4)*age*.22;particle.position.z+=Math.cos(i*1.7)*age*.16;
      particle.position.x+=(attention?.x||0)*age*.3;
      particle.position.y=.36+age*.22;particle.scale.setScalar(.25+age*.7);
      particle.material.opacity=active?Math.sin(age/3.7*Math.PI)*.12*Math.min(1,pace*25):0;
    }
  }};
}

function aloysius() {
  // A small bear, sitting up, seen from behind.
  const g = new Group(), fur = lambert('#5d5950'), sphere = new SphereGeometry(1, 14, 10);
  add(g, sphere, fur, 0, .42, 0, .34, .42, .3);
  add(g, sphere, fur, 0, .98, .02, .24, .23, .22);
  for (const x of [-.17, .17]) { add(g, sphere, fur, x, 1.2, .02, .08, .08, .05); add(g, sphere, fur, x * 1.6, .5, -.1, .1, .2, .1); add(g, sphere, fur, x * .9, .12, -.25, .12, .1, .2); }
  g.scale.setScalar(.85);
  return g;
}

function rowingBoat(scene, x, z) {
  const g = new Group();
  const dark = lambert(PAL.near);
  add(g, new SphereGeometry(1, 14, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), dark, 0, .25, 0, .9, .4, 2.4);
  const oar = add(g, new BoxGeometry(.06, .06, 3.2), dark, 0, .5, 0);
  oar.rotation.y = 1.3;
  g.position.set(x, 0, z);
  scene.add(g);
  return g;
}

// ---------------------------------------------------------------- Wong: a lane at night, seen through dusty glass
// 看得到，抓不着. Rain under one lamp, the wet street holding its light; a woman
// with a thermos passes slowly through it and is gone. On the near glass, dust,
// and one drop that runs.
function dustTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 512;
  const g = c.getContext('2d'), r = (seed => () => (seed = seed * 16807 % 2147483647) / 2147483647)(17);
  // A film of dust, thicker towards the edges, with fine specks and a few dried drops.
  const film = g.createRadialGradient(256, 256, 90, 256, 256, 360);
  film.addColorStop(0, 'rgba(196,190,174,.03)'); film.addColorStop(1, 'rgba(196,190,174,.16)');
  g.fillStyle = film; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 420; i++) { g.fillStyle = `rgba(210,205,190,${r() * .1})`; g.fillRect(r() * 512, r() * 512, 1 + r(), 1 + r()); }
  for (let i = 0; i < 12; i++) { const x = r() * 512, y = r() * 512, w = 1.5 + r() * 2.5; g.strokeStyle = 'rgba(220,214,198,.12)'; g.lineWidth = 1; g.beginPath(); g.ellipse(x, y, w, w * 1.3, 0, 0, 7); g.stroke(); }
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}

function walker(colour) {
  // A slim figure in a long close dress, a thermos in one hand.
  const g = new Group(), m = lambert(colour), sphere = new SphereGeometry(1, 14, 10);
  const dress = add(g, new CylinderGeometry(.24, .2, 1.25, 12), m, 0, .85, 0);
  add(g, new CylinderGeometry(.2, .27, .5, 12), m, 0, 1.6, 0);
  add(g, sphere, m, 0, 1.98, 0, .13, .15, .14);
  add(g, sphere, m, -.08, 2.05, 0, .1, .09, .09);
  const legs = [-1, 1].map(side => add(g, new CylinderGeometry(.05, .04, .3, 6), m, 0, .15, side * .07));
  const arm = new Group(); arm.position.set(0, 1.7, .26); g.add(arm);
  add(arm, new CylinderGeometry(.045, .04, .62, 6), m, 0, -.31, 0);
  add(arm, new CylinderGeometry(.075, .075, .3, 10), lambert('#6a5e4c'), 0, -.7, 0);
  return { group: g, legs, arm, dress };
}

function wong(scene) {
  scene.background = new Color('#1d2423');
  scene.fog = new Fog('#1d2423', 12, 70);
  scene.add(new HemisphereLight(new Color('#5d6b67'), new Color('#121716'), .7));
  const lampColour = new Color('#ddc8a6');
  const lamp = new PointLight(lampColour, 120, 26, 1.6); lamp.position.set(3.2, 6.6, -14); scene.add(lamp);
  const water_ = water(scene, 300, '#2a3231'); // the wet street
  water_.material.uniforms.uFog.value.set('#1d2423');
  const wall = lambert('#2e3735'), box = new BoxGeometry(1, 1, 1);
  // Two walls of a narrow lane falling away into the dark, with a few windows lit.
  for (let i = 0; i < 9; i++) {
    const z = -i * 12;
    add(scene, box, wall, -8.5, 10, z, 5, 20 + (i % 3) * 3, 11.6);
    add(scene, box, wall, 8.5, 10, z - 5, 5, 20 + ((i + 1) % 3) * 3, 11.6);
  }
  const windows = lights(scene, [[-5.95, 7.5, -8], [5.95, 10.5, -25], [-5.95, 4.6, -33], [5.95, 6, -52], [-5.95, 9, -61]], '#bdae94', [1.1, 1.6]);
  windows.forEach((w, i) => { w.rotation.y = i % 2 ? -Math.PI / 2 : Math.PI / 2; w.material.opacity = .32; });
  // The lamp on its bracket, and its glow.
  add(scene, box, lambert('#1f2625'), 5.4, 7.1, -14, 1.6, .12, .12);
  const glow = new Sprite(new SpriteMaterial({ map: softSprite('#e9d9bd'), transparent: true, opacity: .7, depthWrite: false }));
  glow.position.copy(lamp.position); glow.scale.set(2.6, 2.6, 1); scene.add(glow);
  // Rain, seen only where the lamp catches it.
  const drops = 300, seeds = [];
  for (let i = 0; i < drops; i++) seeds.push([3.2 + rand(-1, 1) * rand(1, 4.5), rand(0, 9), -14 + rand(-1, 1) * rand(1, 6), rand(.85, 1.15)]);
  const rainGeo = new BufferGeometry(); rainGeo.setAttribute('position', new Float32BufferAttribute(new Float32Array(drops * 6), 3));
  const rain = rainGeo.attributes.position.array, tint = new Float32Array(drops * 6);
  // Each drop is only as bright as the lamp is near it.
  seeds.forEach(([x, , z], i) => { const k = Math.max(0, 1 - Math.hypot(x - 3.2, z + 14) / 5.5) ** 1.6; tint.set([k, k * .92, k * .78, k * .4, k * .37, k * .3], i * 6); });
  rainGeo.setAttribute('color', new Float32BufferAttribute(tint, 3));
  const rainLines = new LineSegments(rainGeo, new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: .45, fog: false, blending: AdditiveBlending, depthWrite: false }));
  rainLines.frustumCulled = false; scene.add(rainLines);
  // Rings on the street where it lands under the lamp.
  const rings = Array.from({ length: 14 }, (_, i) => {
    const m = add(scene, new CylinderGeometry(1, 1, .01, 20, 1, true), new MeshBasicMaterial({ color: new Color('#c9b48d'), transparent: true, opacity: 0, side: DoubleSide }), 0, .03, 0);
    m.userData = { x: rand(-2, 5.5), z: rand(-18, -9), phase: i / 14 }; return m;
  });
  // Signboards hung out over the lane, their colours gone soft in the wet.
  for (const [x, y, z, c] of [[-5.3, 8.5, -11, '#7b625d'], [5.3, 11, -30, '#5f6f68'], [-5.3, 9.5, -46, '#7d705f']]) {
    add(scene, box, lambert('#1d2322'), x, y, z, .3, 4.2, 1.3);
    add(scene, box, new MeshBasicMaterial({ color: new Color(c), transparent: true, opacity: .42 }), x + (x < 0 ? .17 : -.17), y, z, .02, 3.8, 1.1);
  }
  const her = walker('#2a2e2e'); scene.add(her.group);
  // The dusty pane we look through, close to us.
  const pane = new Mesh(new PlaneGeometry(1, 1), new MeshBasicMaterial({ map: dustTexture(), transparent: true, depthWrite: false, fog: false }));
  scene.add(pane);
  const run = new Sprite(new SpriteMaterial({ map: softSprite('#e4ddc9'), transparent: true, opacity: .5, depthWrite: false, fog: false }));
  scene.add(run);
  const fog = mist(scene, [[1, 1.2, -20, 26, 3], [0, 2, -40, 34, 5]], .12);
  const camLocal = new Vector3(), motion = {};
  let paneTime=0;
  return {
    target: new Vector3(.8, 4, -22), radius: 30, height: 3.4, fov: 34, yaw: 12, pitch: [2, 7], water: water_, still: 16, motion,
    tick(t, s, dt, attention = {x:0,y:0}) {
      paneTime=s;
      water_.material.uniforms.uTime.value = t * .6 + s * .25;
      lamp.intensity = 120 + Math.sin(s * 13.1) * 2 + Math.sin(s * 3.7) * 3;
      for (let i = 0; i < drops; i++) {
        const [x, y0, z, v] = seeds[i], y = 9 - ((9 - y0 + s * 7 * v) % 9);
        rain.set([x+attention.x*.2, y, z, x - .02+attention.x*.3, y - .32, z], i * 6);
      }
      rainGeo.attributes.position.needsUpdate = true;
      for (const r of rings) {
        const u = r.userData, k = (s * .7 + u.phase) % 1;
        r.position.set(u.x + Math.floor(s * .7 + u.phase) * 1.7 % 5, .03, u.z);
        r.scale.set(.05 + k * .45, 1, .05 + k * .45); r.material.opacity = .35 * (1 - k);
      }
      // She comes out of the dark on the right, under the lamp, and away up the lane.
      const k = clamp01((s - 1.5) / 13), e = k * k * (3 - 2 * k) * .7 + k * .3;
      her.group.position.set(mix3(6.4, -1.5, e), 0, mix3(-9, -24, e));
      her.group.rotation.y = Math.atan2(-(-24 + 9), -1.5 - 6.4) * -1 + Math.PI / 2 * 0;
      her.group.lookAt(her.group.position.x - 7.9, 0, her.group.position.z - 15);
      her.group.visible = s > 1.4 && k < 1;
      const stride = Math.sin(s * 5.2);
      Object.assign(motion,{rain:.5,phase:s*5.2/(Math.PI*2),moving:her.group.visible?1:0,x:her.group.position.x/8});
      her.legs[0].position.x = stride * .06; her.legs[1].position.x = -stride * .06;
      her.dress.rotation.z = stride * .03;
      her.arm.rotation.z = Math.sin(s * 5.2 + 1) * .08;
      for (const m of fog) m.position.x = m.userData.x0 + Math.sin(s * .05 + m.userData.phase) * 2;
    },
    // The pane sits just in front of the lens, whichever way it has turned.
    camUniform: { value: { copy(p) {
      camLocal.copy(p);
      pane.position.copy(p).lerp(new Vector3(.8, 4, -22), .055);
      pane.lookAt(p); const d = pane.position.distanceTo(p);
      pane.scale.set(d * 1.6, d * .95, 1);
      run.position.copy(pane.position).add(new Vector3(.3 * d * .1, (.12 - ((paneTime * .02) % .3)) * d, 0));
      run.scale.set(d * .012, d * .02, 1);
      water_.material.uniforms.uCam.value.copy(p);
    } } },
  };
}
const mix3 = (a, b, t) => a + (b - a) * t;

// ---------------------------------------------------------------- helpers for lit rooms and long things
function shade(obj, cast = true, receive = true) { obj.traverse(o => { if (o.isMesh) { o.castShadow = cast; o.receiveShadow = receive; } }); return obj; }

function ribbon(points, profile) {
  // A solid swept along a ground curve: profile is [[offset, height], ...] across the curve.
  const pos = [], idx = [], n = points.length, m = profile.length;
  for (let i = 0; i < n; i++) {
    const p = points[i], q = points[Math.min(n - 1, i + 1)], o = points[Math.max(0, i - 1)];
    const tx = q.x - o.x, tz = q.z - o.z, l = Math.hypot(tx, tz) || 1, nx = -tz / l, nz = tx / l;
    for (const [off, h] of profile) pos.push(p.x + nx * off, h, p.z + nz * off);
  }
  for (let i = 0; i < n - 1; i++) for (let j = 0; j < m - 1; j++) {
    const a = i * m + j, b = a + 1, c = a + m, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

function line(points, color, opacity = 1) {
  const g = new BufferGeometry().setFromPoints(points);
  return new Line(g, new LineBasicMaterial({ color: new Color(color), transparent: opacity < 1, opacity }));
}

function smoke(scene, count = 18, color = '#d8d6ce') {
  const tex = softSprite(color);
  return Array.from({ length: count }, () => {
    const s = new Sprite(new SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false }));
    s.userData.age = 99; scene.add(s); return s;
  });
}

function figure(color = '#2f3633', h = 1.7) {
  const g = new Group(), m = lambert(color);
  add(g, new CylinderGeometry(h * .1, h * .15, h * .62, 8), m, 0, h * .31, 0);
  add(g, new SphereGeometry(h * .085, 8, 6), m, 0, h * .72, 0);
  return g;
}

function sheetTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 340;
  const g = c.getContext('2d');
  g.fillStyle = '#ddd8cb'; g.fillRect(0, 0, 256, 340);
  g.strokeStyle = 'rgba(70,74,70,.32)'; g.lineWidth = 1.4;
  for (let i = 0; i < 8; i++) { const y = 70 + i * 26; g.beginPath(); g.moveTo(36, y); g.lineTo(220 - (i % 3) * 18, y + (i % 2)); g.stroke(); }
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}

// ---------------------------------------------------------------- Thackeray: the embankment and nothing beyond
function thackeray(scene) {
  scene.fog = new Fog('#cbc9c0', 25, 210);
  skyDome(scene, '#cdcec8', '#cbc9c0');
  scene.add(new HemisphereLight(new Color('#dcd9d0'), new Color('#5a635d'), 1.35));
  const sun = new DirectionalLight(new Color('#efe2cb'), .5); sun.position.set(-40, 30, 60); scene.add(sun);
  add(scene, new PlaneGeometry(1400, 1400), lambert('#8e968d'), 0, 0, 0).rotation.x = -Math.PI / 2;
  const curve = new CatmullRomCurve3([new Vector3(-340, 0, -70), new Vector3(-160, 0, -30), new Vector3(0, 0, -18), new Vector3(160, 0, -24), new Vector3(340, 0, -62)]);
  const pts = curve.getSpacedPoints(160);
  add(scene, ribbon(pts, [[-11, 0], [-2.2, 6], [2.2, 6], [11, 0]]), lambert('#5c665f'), 0, 0, 0);
  const crest = (off, y) => pts.map((p, i) => { const q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)];
    const tx = q.x - o.x, tz = q.z - o.z, l = Math.hypot(tx, tz); return new Vector3(p.x - tz / l * off, y, p.z + tx / l * off); });
  scene.add(line(crest(-.7, 6.08), '#3c4440')); scene.add(line(crest(.7, 6.08), '#3c4440'));
  // Telegraph poles on the far edge of the crest, wires sagging between them.
  const poleMat = lambert('#3e4642'), tops = [];
  for (let u = .02; u < 1; u += .045) {
    const p = curve.getPointAt(u), t = curve.getTangentAt(u), nx = t.z, nz = -t.x;
    const x = p.x + nx * 2, z = p.z + nz * 2;
    add(scene, new CylinderGeometry(.09, .12, 7, 5), poleMat, x, 9.5, z);
    add(scene, new BoxGeometry(1.6, .1, .1), poleMat, x, 12.6, z).rotation.y = Math.atan2(t.x, t.z) + Math.PI / 2;
    tops.push(new Vector3(x, 12.6, z));
  }
  const wires = [];
  for (let i = 0; i < tops.length - 1; i++) {
    const a = tops[i], b = tops[i + 1], seg = [];
    for (let k = 0; k <= 8; k++) { const v = a.clone().lerp(b, k / 8); v.y -= Math.sin(Math.PI * k / 8) * .7; seg.push(v); }
    wires.push(scene.add(line(seg, '#4a524e', .7)).children.at(-1));
  }
  // One person climbs the bank, and stands on the crest looking over to the other side.
  const watcher = figure('#2c3330', 1.7);
  const wp = curve.getPointAt(.53), wt = curve.getTangentAt(.53), wn = new Vector3(-wt.z, 0, wt.x).normalize();
  const bank = off => off <= 2.2 ? 6 : Math.max(0, 6 * (11 - off) / 8.8);
  scene.add(watcher);
  // The old world on this side: a hedge and two trees, already half gone in the mist.
  // A cottage and its trees, the old world on this side, half gone in the mist.
  woods(scene, [[62, 2, 4], [84, 8, 5], [104, 0, 4], [130, 12, 6]], '#5f6a62');
  add(scene, new BoxGeometry(5, 3.2, 4), lambert('#646d67'), 95, 1.6, 10);
  add(scene, new ConeGeometry(3.6, 2.2, 4), lambert('#59625c'), 95, 4.3, 10).rotation.y = Math.PI / 4;
  // The scene is seen along the bank, so that it runs away from us into nothing.
  scene.rotation.y = .62;
  return {
    target: new Vector3(-14, 4, -4), radius: 70, height: 2.6, fov: 32, yaw: 24, pitch: [2, 12], still: 20,
    tick(t, s, dt, attention = {x:0,y:0}) {
      // Only the wires move a little; the train has gone out of this picture.
      wires.forEach((w, i) => { w.position.y = Math.sin(s * .8 + i * .7) * .03 + attention.y * .035; w.position.z = attention.x * .06; });
      const climb = seg(s, 1.5, 16), off = 15 - climb * 14.4, walking = climb > 0 && climb < 1;
      watcher.position.copy(wp).addScaledVector(wn, off).setY(bank(off) + (walking ? Math.abs(Math.sin(s * 3.6)) * .06 : 0));
      watcher.rotation.z = walking && off > 2.2 ? -.18 : 0;
    },
  };
}

// ---------------------------------------------------------------- creatures
// Two-bone legs whose feet stay where they were put while they carry weight.
const UP = new Vector3(0, 1, 0), ZAXIS = new Vector3(0, 0, 1);
function bone(mesh, a, b) {
  const d = new Vector3().subVectors(b, a);
  mesh.position.copy(a).add(b).multiplyScalar(.5);
  mesh.scale.y = Math.max(.001, d.length());
  mesh.quaternion.setFromUnitVectors(UP, d.normalize());
}
// Where a foot is in its gait: back along the ground in stance, lifted forward in swing.
function gaitFoot(leg, phase, stride, lift, stance, moving) {
  const u = ((phase + leg.phase) % 1 + 1) % 1;
  if (u < stance) return [leg.x + stride * (.5 - u / stance) * moving, 0];
  const k = (u - stance) / (1 - stance), e = k * k * (3 - 2 * k);
  return [leg.x + stride * (e - .5) * moving, Math.sin(Math.PI * k) * lift * moving];
}

function fieldMouse(colour = '#7c8880') {
  const root = new Group(), pivot = new Group(), inner = new Group();
  pivot.position.set(-.6, .1, 0); inner.position.set(.6, -.1, 0);
  root.add(pivot); pivot.add(inner);
  const fur = lambert(colour), pale = lambert('#8c958a'), dark = lambert('#263332');
  const sphere = new SphereGeometry(1, 20, 14);
  add(inner, sphere, fur, -.22, .62, 0, .91, .48, .43);
  const head = new Group(); head.position.set(.46, .65, 0); inner.add(head);
  add(head, sphere, fur, 0, 0, 0, .51, .37, .34);
  add(head, sphere, fur, .39, -.12, 0, .37, .19, .23);
  add(head, sphere, dark, .71, -.12, 0, .065, .045, .07);
  for (const side of [-1, 1]) {
    add(head, sphere, fur, -.14, .34, side * .22, .22, .28, .085);
    add(head, sphere, pale, -.12, .355, side * .265, .155, .21, .026);
    add(head, sphere, dark, .27, .1, side * .285, .065, .07, .038);
    add(head, sphere, lambert('#cedbd4'), .29, .125, side * .313, .018, .019, .014);
  }
  const tail = new Group(); tail.position.set(-.98, .43, 0); inner.add(tail);
  tail.add(new Mesh(new TubeGeometry(new CatmullRomCurve3([new Vector3(0, 0, 0), new Vector3(-.42, -.15, .07),
    new Vector3(-.82, -.18, .25), new Vector3(-1.07, -.11, .22)]), 20, .026, 5, false), fur));
  const legs = [[-.58, -.24, .5, 1], [.58, -.23, .75, 0], [-.58, .28, 0, 1], [.58, .27, .25, 0]].map(([x, z, phase, hind]) => ({
    x, z, phase, hind,
    upper: add(inner, new CylinderGeometry(.06, .075, 1, 8), fur, 0, 0, 0),
    lower: add(inner, new CylinderGeometry(.035, .05, 1, 8), fur, 0, 0, 0),
    paw: add(inner, sphere, pale, 0, 0, 0, .14, .05, .085),
  }));
  const tmp = new Vector3();
  // sit: 0 on all fours, 1 sitting up; paws: 'groom', 'hold' or 'hang'.
  function pose({ phase = 0, moving = 0, sit = 0, paws = 'hold', s = 0, hang = 0, look = 0 }) {
    pivot.rotation.z = sit * .95 - hang * .3;
    head.rotation.z = -sit * .55 + look;
    for (const leg of legs) {
      const hip = new Vector3(leg.x, .4, leg.z);
      let foot;
      if (hang > 0) foot = new Vector3(leg.x + .08, .4 - .3 + Math.sin(s * 1.7 + leg.phase * 6) * .02, leg.z * .9);
      else if (!leg.hind && sit > .01) {
        const groom = paws === 'groom' ? 1 : 0;
        const k = s * 7 + (leg.z > 0 ? 0 : Math.PI);
        const raised = new Vector3(.66 + groom * (.18 + Math.cos(k) * .06), .36 + groom * (.12 + Math.sin(k) * .07), leg.z * .45);
        const [fx, fy] = gaitFoot(leg, phase, .3, .12, .62, moving);
        foot = new Vector3(fx, .05 + fy, leg.z).lerp(raised, sit);
      } else {
        const [fx, fy] = gaitFoot(leg, phase, .3, .12, .62, moving);
        // Feet are on the ground in the root frame; express them in the pivoted frame.
        tmp.set(fx, .05 + fy, leg.z).sub(pivot.position).applyAxisAngle(ZAXIS, -pivot.rotation.z).sub(inner.position);
        foot = tmp.clone();
      }
      const knee = hip.clone().lerp(foot, .52); knee.x += leg.hind ? .08 : -.065;
      bone(leg.upper, hip, knee); bone(leg.lower, knee, foot); leg.paw.position.copy(foot);
    }
    tail.rotation.z = Math.sin(s * 1.3) * .05 * moving - hang * .9;
  }
  return { root, head, inner, pose, tail, legs };
}

// ---------------------------------------------------------------- Burns: the field, the nest, a mouse and a cat
// The present only toucheth thee. A mouse washes at her turned nest; a cat
// comes out of the haze, touches noses with her, and carries her off.
function burns(scene) {
  scene.fog = new Fog('#c1bcb0', 7, 42);
  skyDome(scene, '#bcbcb4', '#c8c0b1');
  scene.add(new HemisphereLight(new Color('#d7d1c3'), new Color('#4d534e'), 1.5));
  const sun = new DirectionalLight(new Color('#f0d9b9'), 1.2); sun.position.set(14, 7, -30); scene.add(sun);
  const field = new PlaneGeometry(160, 160, 160, 80);
  const pos = field.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin(pos.getX(i) * 2.1) * .06 + Math.sin(pos.getY(i) * .7) * .04);
  field.computeVertexNormals();
  add(scene, field, lambert('#857f70'), 0, 0, 0).rotation.x = -Math.PI / 2;
  add(scene, new BoxGeometry(200, 2.4, 1.6), lambert('#6c706a'), 0, 1.2, -34);
  woods(scene, [[-14, -40, 3], [6, -42, 4], [24, -39, 3], [-34, -44, 5]], '#6a6f69');
  // Stubble, leaving a way clear for the cat and in front of the nest.
  const stalkGeo = new ConeGeometry(.018, .5, 3, 1, true); stalkGeo.translate(0, .25, 0);
  const stalkMat = new MeshBasicMaterial({ color: new Color('#6f6b5d'), side: DoubleSide });
  const breeze={value:0};
  stalkMat.onBeforeCompile=shader=>{
    shader.uniforms.uBreeze=breeze;
    shader.vertexShader='uniform float uBreeze;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',
      '#include <begin_vertex>\ntransformed.x += sin(uBreeze*1.4+instanceMatrix[3].x*.4+instanceMatrix[3].z)*position.y*.08;');
  };
  const stalks=new InstancedMesh(stalkGeo,stalkMat,1100),placement=new Object3D();let stalkCount=0;
  for(let i=0;i<1100;i++){
    const x=rand(-16,14),z=rand(-24,6);
    if(z>-3.2&&z<1.4&&x>-11&&x<4)continue;
    if(z>1.4&&Math.abs(x-.4)<1+(z-1.4)*.6)continue;
    placement.position.set(x,0,z);placement.scale.set(1,rand(.5,1.5),1);placement.rotation.z=rand(-.12,.12);
    placement.updateMatrix();stalks.setMatrixAt(stalkCount++,placement.matrix);
  }
  stalks.count=stalkCount;scene.add(stalks);
  // The nest, turned up: a mound of grass with its door towards us.
  add(scene, new SphereGeometry(.62, 14, 8), lambert('#6a6352'), 2.6, .05, -.3, 1.2, .55, 1);
  add(scene, new SphereGeometry(.2, 10, 8), lambert('#2e2b25'), 2.05, .14, .05, .6, .7, .5);
  for (let i = 0; i < 26; i++) { const m = add(scene, stalkGeo, lambert('#7c745f'), 2.6 + rand(-.7, .7), .1, -.3 + rand(-.55, .55)); m.rotation.set(rand(-1.2, 1.2), 0, rand(-1.2, 1.2)); }
  const mouse = fieldMouse(); mouse.root.scale.setScalar(.3); scene.add(mouse.root);
  const puss = cat(); puss.root.scale.setScalar(.72); scene.add(puss.root);
  const faceLight = new DirectionalLight('#aebbb4', .48); faceLight.position.set(4, 5, 12); scene.add(faceLight);
  const M0 = new Vector3(1.75, 0, .15);
  const P0 = new Vector3(-5, 0, -2.6), P1 = new Vector3(-.75, 0, .1), P2 = new Vector3(-10, 0, -11);
  const heading1 = Math.atan2(-(P1.z - P0.z), P1.x - P0.x), heading2 = Math.atan2(-(P2.z - P1.z), P2.x - P1.x) - Math.PI * 2;
  const M1 = P1.clone().add(new Vector3(Math.cos(heading1), 0, -Math.sin(heading1)).multiplyScalar(.75));
  const approach = P0.distanceTo(P1), leave = P1.distanceTo(P2);
  const mouth = new Vector3(), scruff = new Vector3();
  const birds = rooks(scene, new Vector3(-4, 7, -22));
  const motion = {};
  return {
    target: new Vector3(.35, .62, -.4), radius: 9.6, height: .8, fov: 30, yaw: 16, pitch: [2, 6], still: 12.6, traveller: mouse.root, motion, ready: puss.ready,
    tick(t, s, dt, attention = {x:0,y:0}) {
      breeze.value=s + attention.x * .7;
      // The cat: walk in, stop, lower the head, take her, turn, walk away.
      const walkIn = clamp01((s - 2.2) / 19.8), walkOut = clamp01((s - 31) / 13);
      const eIn = walkIn * (2 - walkIn), eOut = walkOut * walkOut;
      const inPos = walkIn < 1 ? eIn : 1;
      const turn = seg(s, 29, 31.5);
      const heading = heading1 + (heading2 - heading1) * turn;
      puss.root.position.copy(P0).lerp(P1, inPos).lerp(P2, eOut);
      puss.root.rotation.y = heading;
      const travelled = inPos * approach + eOut * leave + Math.abs(heading2 - heading1) * turn * .5;
      const moving = Math.min(1, (walkIn > 0 && walkIn < 1 ? 1 - walkIn ** 3 : 0) + (walkOut > 0 ? Math.min(1, walkOut * 6) : 0) + (turn > 0 && turn < 1 ? .45 : 0));
      const lower = seg(s, 22, 25) - seg(s, 27, 29) * .82;
      const phase = travelled / .9 / .72;
      puss.pose({ phase, moving, lower, s, tailUp: seg(s, 29, 31), attention: (1-seg(s,2,4))*.5 + (1-lower)*Math.max(0,-attention.y)*.15 });
      Object.assign(motion,{phase,moving,x:puss.root.position.x/12});
      puss.root.updateMatrixWorld(true);
      puss.head.localToWorld(mouth.copy(puss.mouth));
      // The mouse: washes, goes a few steps, sees the cat, sits up; then is carried.
      const go = seg(s, 3.8, 6.4);
      const ground = M0.clone().lerp(M1, go);
      const lift = seg(s, 27, 28);
      if (lift <= 0) {
        mouse.root.position.copy(ground);
        mouse.root.rotation.set(0, Math.PI + Math.sin(s * .6) * .15 * (1 - go), 0);
        const sit = (1 - seg(s, 3.1, 3.7)) + seg(s, 7.2, 8.2) * (1 - seg(s, 26, 27));
        mouse.pose({ phase: go * (M0.distanceTo(M1) / .3) / .3, moving: go > 0 && go < 1 ? 1 : 0, sit, paws: s < 3.4 ? 'groom' : 'hold', s,
          look: sit > .5 ? Math.sin(s * 3.1) * .04 : Math.max(0, Math.sin(s * 2.3)) ** 8 * .2 });
      } else {
        // The scruff belongs to the posed mouse, including its scale and turn.
        mouse.root.position.copy(ground);
        mouse.root.rotation.set(0, Math.PI + lift * (heading + Math.PI / 2 - Math.PI), 0);
        mouse.pose({ s, hang: lift, sit: 0 });
        mouse.root.updateMatrixWorld(true);
        mouse.inner.localToWorld(scruff.set(.14, 1.02, 0));
        scruff.sub(mouse.root.position);
        mouse.root.position.lerp(mouth.clone().sub(scruff), lift);
      }
      mouse.root.visible = !document.querySelector('.memory-mouse[data-transfer="true"]');
      for (const b of birds) {
        const u = b.userData, a = s * u.speed * 4 + u.phase;
        b.position.set(u.centre.x + Math.cos(a) * u.r * .5 + attention.x * .35, u.h - attention.y * .16, u.centre.z + Math.sin(a) * u.r * .3);
        b.scale.y = 1 + Math.sin(s * 9 + u.phase) * .8;
      }
    },
  };
}

// ---------------------------------------------------------------- Pushkin: the copies under a lamp
// Every day another copy of the same eight lines. A breath of air lifts the
// newest sheet by one corner; it floats, and settles again on all the others.
function edgeTexture() {
  // The side of a pile of paper: thin uneven lines.
  const c = document.createElement('canvas'); c.width = 64; c.height = 256;
  const g = c.getContext('2d'), r = (seed => () => (seed = seed * 16807 % 2147483647) / 2147483647)(5);
  g.fillStyle = '#c9c2b1'; g.fillRect(0, 0, 64, 256);
  for (let y = 0; y < 256; y += 2 + r() * 2) { g.fillStyle = `rgba(60,58,52,${.12 + r() * .2})`; g.fillRect(0, y, 64, .8); }
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}

function handTexture() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 680;
  const g = c.getContext('2d'), r = (seed => () => (seed = seed * 16807 % 2147483647) / 2147483647)(11);
  g.fillStyle = '#ddd7c7'; g.fillRect(0, 0, 512, 680);
  g.strokeStyle = 'rgba(46,52,58,.62)'; g.lineWidth = 1.6; g.lineCap = 'round'; g.lineJoin = 'round';
  // Script, legible only as the movement of a hand.
  const word = (x, y, len) => {
    g.beginPath();
    for (let k = 0; k <= len; k += 1.4) {
      const yy = y + Math.sin(k * .62 + r() * .5) * 3.4 - (r() < .05 ? 8 : 0);
      if (k) g.lineTo(x + k, yy); else g.moveTo(x, yy);
    }
    g.stroke();
  };
  word(340, 74, 96);
  for (let i = 0; i < 8; i++) {
    let x = 58 + (i % 2) * 22;
    const y = 150 + i * 60;
    while (x < 430) { const len = 22 + r() * 60; if (x + len > 456) break; word(x, y, len); x += len + 13 + r() * 8; }
  }
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 4; return t;
}

function pushkin(scene) {
  scene.background = new Color('#2f3533');
  scene.fog = new Fog('#2f3533', 16, 60);
  scene.add(new HemisphereLight(new Color('#8a8d86'), new Color('#232826'), .9));
  const lamp = new PointLight(new Color('#f0d5a8'), 300, 44, 2); lamp.position.set(-3.4, 9.5, -1.6); lamp.castShadow = true;
  lamp.shadow.mapSize.set(1024, 1024); lamp.shadow.radius = 5; lamp.shadow.bias = -.002; scene.add(lamp);
  add(scene, new ConeGeometry(1.7, 1.5, 24, 1, true), new MeshBasicMaterial({ color: new Color('#262b29'), side: DoubleSide }), -3.4, 10.5, -1.6);
  shade(add(scene, new BoxGeometry(30, 1, 17), lambert('#4c514c'), 0, -.5, 0), false, true);
  shade(add(scene, new PlaneGeometry(70, 34), lambert('#3b413d'), 0, 7, -9), false, true);
  // Years of copies: one block, its loose top sheets, an inkwell and a pen.
  const paper = lambert('#cfc9b9'), hand = new MeshLambertMaterial({ map: handTexture(), side: DoubleSide });
  const edges = edgeTexture(), edge = new MeshLambertMaterial({ map: edges });
  const pile = shade(add(scene, new BoxGeometry(4.3, 1.3, 5.7), [edge, edge, paper, paper, edge, edge], 1.2, .65, .3));
  pile.rotation.y = .03;
  const sheetGeo = new BoxGeometry(4.2, .02, 5.6);
  for (let i = 0; i < 5; i++) shade(add(scene, sheetGeo, hand, 1.2 + rand(-.18, .18), 1.31 + i * .025, .3 + rand(-.18, .18))).rotation.y = rand(-.08, .08);
  shade(add(scene, new CylinderGeometry(.42, .5, .7, 16), lambert('#2b302e'), 5.6, .35, -1.4));
  const pen = shade(add(scene, new CylinderGeometry(.045, .03, 3.2, 8), lambert('#262a28'), 5.2, .08, 1.4));
  pen.rotation.set(0, .45, Math.PI / 2);
  // The newest copy, a flexible sheet that rests on top.
  const W = 4.2, D = 5.6, geo = new PlaneGeometry(W, D, 16, 20);
  geo.rotateX(-Math.PI / 2);
  const flat = geo.attributes.position.array.slice();
  const sheet = shade(new Mesh(geo, hand));
  scene.add(sheet);
  const top = 1.31 + 5 * .025 + .01;
  function bend(curl, wave, s) {
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = flat[i * 3], z = flat[i * 3 + 2];
      // Distance from the far left corner, which stays down longest.
      const u = ((x + W / 2) / W + (z + D / 2) / D) / 2;
      const y = curl * Math.max(0, (u - .32) / .68) ** 2.2 * 1.9 + wave * (Math.sin(x * 1.25 + s * 2.1) * .07 + Math.sin(z * 1.05 - s * 1.6) * .06);
      p.setY(i, y);
    }
    p.needsUpdate = true; geo.computeVertexNormals();
  }
  const motion = {};
  const motes = mist(scene, Array.from({ length: 10 }, () => [rand(-5, 2), rand(2, 7), rand(-3, 2), .1, .1]), .45);
  return {
    target: new Vector3(1.3, 1.3, .3), radius: 14.5, height: 3.6, fov: 34, yaw: 36, pitch: [12, 26], shadows: true, still: 24, motion,
    tick(t, s, dt, attention = {x:0,y:0}) {
      lamp.intensity = 300 + Math.sin(s * 5.3) * 5 + Math.sin(s * 1.7) * 9;
      const lift = seg(s, 4, 9) * (1 - seg(s, 12.5, 16.5));      // the corner rises, then lets go
      const float = seg(s, 8, 12) * (1 - seg(s, 13, 19));        // the whole sheet leaves the pile
      const rest = seg(s, 13, 19.5);
      const air = lift * .5 + float;
      Object.assign(motion,{paper:air*(1-rest),settle:rest,x:.3});
      bend(lift * (1 - float * .55)+Math.max(0,attention.y)*.12, air * (1 - rest), s);
      sheet.position.set(1.2 + rest * .34 + float * .3+attention.x*.12, top + float * .55 + Math.sin(s * 1.3) * .04 * float, .3 + rest * .16 + float * .1);
      sheet.rotation.set(Math.sin(s * 1.1) * .03 * float, .02 + rest * .09 + float * .07 * Math.sin(s * .8), Math.sin(s * .9) * .025 * float);
      motes.forEach((m, i) => { m.position.y = 2 + ((s * .09 + i * .37) % 6); m.position.x = m.userData.x0 + Math.sin(s * .4 + i) * .22 + air * .2 + attention.x * .35; m.position.z = Math.sin(s * .23 + i) * .2 + attention.y * .2; });
    },
  };
}

// ---------------------------------------------------------------- Nalan: west light through a sparse window
// 萧萧黄叶闭疏窗. The west light comes through a lattice casement. One leaf
// comes in at the open half and takes the whole scene to fall, swinging
// through the light, until it rests on the open book.
function leafGeometry(l = .3) {
  const sh = new Shape();
  sh.moveTo(0, -l); sh.quadraticCurveTo(l * .75, -l * .15, 0, l); sh.quadraticCurveTo(-l * .75, -l * .15, 0, -l);
  return new ShapeGeometry(sh, 5);
}

function latticePanel(mat, w, h, side) {
  // The hinge is at the origin; the panel extends along +x (side 1) or -x (side -1).
  const g = new Group(), box = new BoxGeometry(1, 1, 1), f = .24, d = .16;
  const x = u => side * u;
  add(g, box, mat, x(w / 2), h - f / 2, 0, w, f, d); add(g, box, mat, x(w / 2), f / 2, 0, w, f, d);
  add(g, box, mat, x(f / 2), h / 2, 0, f, h, d); add(g, box, mat, x(w - f / 2), h / 2, 0, f, h, d);
  for (const u of [.36, .64]) add(g, box, mat, x(w * u), h / 2, 0, .09, h, .09);
  for (const v of [.2, .44, .68, .86]) add(g, box, mat, x(w / 2), h * v, 0, w, .09, .09);
  // A small open square at the middle, the one ornament of the window.
  add(g, box, mat, x(w / 2), h * .56, 0, w * .28 + .09, .09, .09); add(g, box, mat, x(w * .36), h * .5, 0, .09, h * .12, .09);
  return shade(g);
}

function airTexture(stops) {
  // A vertical wash for whatever lies beyond a window.
  const c = document.createElement('canvas'); c.width = 4; c.height = 128;
  const g = c.getContext('2d'), grad = g.createLinearGradient(0, 0, 0, 128);
  stops.forEach((col, i) => grad.addColorStop(i / (stops.length - 1), col));
  g.fillStyle = grad; g.fillRect(0, 0, 4, 128);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}

function pageTexture(columns = true) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 320;
  const g = c.getContext('2d');
  g.fillStyle = '#d9d3c4'; g.fillRect(0, 0, 256, 320);
  g.fillStyle = 'rgba(64,62,56,.28)';
  // Columns of characters, read only as texture.
  if (columns) for (let i = 0; i < 9; i++) for (let j = 0; j < 14; j++) if ((i * 7 + j * 3) % 11) g.fillRect(212 - i * 22, 26 + j * 19, 9, 9);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}

function nalan(scene) {
  scene.background = new Color('#383d3a');
  scene.fog = new Fog('#383d3a', 28, 70);
  scene.add(new HemisphereLight(new Color('#a3aaa3'), new Color('#383c38'), 1.7));
  // Light thrown back from the floor, so the wall is plaster and not a void.
  const bounce = new DirectionalLight(new Color('#cdbfa5'), .3); bounce.position.set(6, 6, 30); scene.add(bounce);
  const sunWarm = new Color('#e8d8c0'), sunLow = new Color('#ddc9b0');
  const sun = new DirectionalLight(sunWarm.clone(), 3.6);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 3; sun.shadow.bias = -.0004;
  Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 150 });
  sun.target.position.set(2, 0, 0); scene.add(sun, sun.target);
  const plaster = lambert('#939891'), wood = lambert('#575249'), floorMat = lambert('#7a776c');
  shade(add(scene, new PlaneGeometry(80, 50), floorMat, 0, 0, 15), false, true).rotation.x = -Math.PI / 2;
  add(scene, new PlaneGeometry(160, 60), lambert('#a29f94', { fog: false }), 0, -.05, -40).rotation.x = -Math.PI / 2;
  // The west wall, facing us, with one opening.
  const box = new BoxGeometry(1, 1, 1), wall = new Group();
  add(wall, box, plaster, -18, 11, 0, 26, 22, .8); add(wall, box, plaster, 18, 11, 0, 26, 22, .8);
  add(wall, box, plaster, 0, 1.5, 0, 10, 3, .8); add(wall, box, plaster, 0, 16.5, 0, 10, 11, .8);
  add(wall, box, wood, 0, 2.95, .45, 10.6, .25, .5); // sill
  wall.position.z = -10; scene.add(shade(wall));
  // Outside: pale air, and the branch the leaves come from.
  add(scene, new PlaneGeometry(140, 70), new MeshBasicMaterial({ map: airTexture(['#bdbcb4', '#cfcabd', '#d5cdbe']), fog: false }), 0, 12, -46);
  const branch = new Group(), bark = lambert('#3e3a33');
  const limb = (x1, y1, x2, y2, r) => { const l = Math.hypot(x2 - x1, y2 - y1); const m = add(branch, new CylinderGeometry(r * .7, r, l, 6), bark, (x1 + x2) / 2, (y1 + y2) / 2, 0); m.rotation.z = Math.atan2(x1 - x2, y2 - y1); };
  limb(-17, 3, -11, 6.5, .5); limb(-11, 6.5, -6, 8.6, .36); limb(-6, 8.6, -1.5, 10.8, .26); limb(-1.5, 10.8, 3.5, 12.2, .17);
  limb(-6, 8.6, -3, 7.2, .14); limb(-3, 7.2, .5, 7.6, .09); limb(-1.5, 10.8, .5, 14.5, .11);
  const leafGeo = leafGeometry(.36), leafMat = new MeshLambertMaterial({ color: new Color('#a09577'), side: DoubleSide });
  const crown = [];
  for (let i = 0; i < 60; i++) {
    const u = rng(), m = add(branch, leafGeo, leafMat, -7 + u * 11 + rand(-1.4, 1.4), 7.6 + u * 4.6 + rand(-1.4, 1.4), rand(-1.5, 1.5));
    m.rotation.set(rand(0, 3), rand(0, 3), rand(0, 3)); m.userData = { r: m.rotation.clone(), phase: rand(0, 6) }; crown.push(m);
  }
  branch.position.set(0, 0, -17); scene.add(shade(branch, true, false));
  // Two lattice casements: the left already closed, the right open to the wind.
  const frameMat = lambert('#45584e');
  const left = latticePanel(frameMat, 5, 8, 1), right = latticePanel(frameMat, 5, 8, -1);
  left.position.set(-5, 3, -9.5); right.position.set(5, 3, -9.5);
  scene.add(left, right);
  const glassCanvas=document.createElement('canvas');glassCanvas.width=128;glassCanvas.height=128;
  const glassInk=glassCanvas.getContext('2d');glassInk.fillStyle='#9b9e86';glassInk.fillRect(0,0,128,128);
  glassInk.strokeStyle='rgba(224,216,179,.2)';glassInk.lineWidth=2;
  for(let x=0;x<144;x+=16)for(let y=0;y<144;y+=16){glassInk.beginPath();glassInk.ellipse(x,y,6,6,0,0,Math.PI*2);glassInk.stroke()}
  const glassMap=new CanvasTexture(glassCanvas);glassMap.colorSpace=SRGBColorSpace;
  const pressedGlass=new MeshLambertMaterial({map:glassMap,transparent:true,opacity:.32,side:DoubleSide,depthWrite:false});
  for(const [panel,side] of [[left,1],[right,-1]])add(panel,new PlaneGeometry(4.5,1.1),pressedGlass,side*2.5,7.25,-.02);
  // A low table in the light: an open book, a cup.
  const table = new Group();
  add(table, box, wood, 0, 1.75, 0, 7.4, .28, 3.8);
  for (const [x, z] of [[-3.3, -1.5], [3.3, -1.5], [-3.3, 1.5], [3.3, 1.5]]) add(table, box, wood, x, .8, z, .32, 1.6, .32);
  const page = new MeshLambertMaterial({ map: pageTexture() });
  for (const s of [-1, 1]) { const p = add(table, new BoxGeometry(1.7, .05, 2.3), page, s * .86, 1.96 + .04, .1); p.rotation.z = -s * .07; }
  add(table, box, lambert('#57524a'), 0, 1.92, .1, 3.6, .06, 2.4);
  const cup = add(table, new CylinderGeometry(.34, .3, .52, 18), lambert('#b9bdb0'), 2.7, 2.15, .7);
  const cupRim=add(table,new CylinderGeometry(.35,.35,.025,24),lambert('#43584f'),2.7,2.42,.7);
  add(table,new CylinderGeometry(.28,.28,.012,20),lambert('#554737'),2.7,2.438,.7);
  add(table, new CylinderGeometry(.5, .5, .04, 18), lambert('#a9ac9b'), 2.7, 1.91, .7);
  table.position.set(4.2, 0, -3.6); table.rotation.y = -.1; scene.add(shade(table));
  const steam = smoke(scene, 9, '#e6dfcf');
  // Leaves fall outside; one is carried in.
  const outside = Array.from({ length: 8 }, (_, i) => {
    const l = shade(add(scene, leafGeo, leafMat, 0, 0, 0), true, false);
    l.userData = { x: rand(-14, 10), z: rand(-24, -13), phase: i / 8, speed: rand(.05, .08), spin: rand(.6, 1.4) };
    return l;
  });
  const from = new Vector3(.3, 10.3, -9.2), rest = new Vector3(3.55, 2.07, -3.3);
  const hero = shade(add(scene, leafGeometry(.62), new MeshLambertMaterial({ color: new Color('#b5a37e'), side: DoubleSide }), 0, 0, 0), true, false);
  const motes = mist(scene, Array.from({ length: 22 }, () => [rand(-4, 6), rand(2, 9), rand(-9, 3), .09, .09]), .55);
  motes.forEach(m => { m.userData.y0 = m.position.y; m.userData.z0 = m.position.z; });
  const motion = {};
  let lastPuff = 0;
  return {
    target: new Vector3(1.8, 3.8, -3.6), radius: 18.5, height: 4.6, fov: 38, yaw: 18, pitch: [12, 21], shadows: true, still: 22, motion,
    tick(t, s, dt, attention = {x:0,y:0}) {
      const gust = .15 + .1 * Math.sin(s * .4);
      // The open casement only stirs.
      right.rotation.y = .95 + Math.sin(s * .5) * .025 + Math.sin(s * 1.3) * .008 + attention.x * .035;
      left.rotation.y = 0;
      // The sun goes down a little over the whole scene.
      const low = seg(s, 4, 26);
      sun.position.set(-7, 31 - low * 6, -56);
      sun.intensity = 3.6 - low * 1.1;
      sun.color.copy(sunWarm).lerp(sunLow, low);
      branch.rotation.z = Math.sin(s * .7) * .012 + gust * Math.sin(s * 2.3) * .05;
      branch.rotation.x = gust * .04;
      for (const m of crown) { const u = m.userData; m.rotation.x = u.r.x + Math.sin(s * (1.2 + gust * 4) + u.phase) * (.08 + gust * .4); }
      for (const l of outside) {
        const u = l.userData, k = (s * u.speed + u.phase) % 1;
        l.position.set(u.x + Math.sin(s * .5 + u.phase * 6) * 1.4 + gust * 6 * k, 15 - k * 15, u.z);
        l.rotation.set(s * u.spin + u.phase * 6, s * .7 * u.spin, s * .4);
      }
      // The leaf falls like a leaf: side to side, gliding at the bottom of each swing.
      const k = clamp01((s - 2.5) / 17.5), fall = k * k * (3 - 2 * k), land = k >= 1;
      const swing = Math.sin((s - 2.5) * 1.15), amp = 1 - seg(s, 15, 20);
      hero.visible = s > 2.5;
      hero.position.copy(from).lerp(rest, fall);
      hero.position.x = from.x + (rest.x - from.x) * fall ** 1.8 + swing * .8 * amp;
      hero.position.y += (1 - Math.abs(swing)) * .12 * amp;
      hero.position.z += Math.cos((s - 2.5) * .55) * .5 * amp;
      hero.position.x+=attention.x*.55*amp;hero.position.z+=attention.y*.3*amp;
      // It shows us its face as it swings, and lies flat only when it lands.
      const flat = seg(s, 17.5, 20);
      Object.assign(motion,{leaf:hero.visible?(1-flat)*(.45+.25*Math.abs(swing)):0,x:hero.position.x/10});
      hero.rotation.set((-.35 + Math.cos((s - 2.5) * 1.15) * .45) * (1 - flat) - Math.PI / 2 * flat, .45 + Math.sin((s - 2.5) * .4) * .35 * amp, -swing * .55 * amp);
      for (const m of motes) {
        const u = m.userData;
        m.position.y = u.y0 + Math.sin(s * .21 + u.phase) * .6 - gust * .5;
        m.position.z = u.z0 + Math.sin(s * .13 + u.phase) * .7 + gust * 2.2 * Math.sin(u.phase + s) + attention.y * .3;
        m.position.x = u.x0 + attention.x * .45 + Math.sin(s * .3 + u.phase) * .15;
        m.material.opacity = .5 * (1 - low * .5);
      }
      // Tea steam, thinning as the light goes.
      if (s - lastPuff > .9 || s < lastPuff) {
        lastPuff = s;
        const p = steam.find(q => q.userData.age > 5) || steam[0];
        p.position.set(6.9, 2.6, -3.2); p.userData.born = s; p.userData.age = 0;
      }
      for (const p of steam) {
        const a = p.userData.age = s - p.userData.born;
        if (!(a >= 0 && a < 5)) { p.material.opacity = 0; continue; }
        p.position.y = 2.6 + a * .32; p.position.x = 6.9 + Math.sin(a * 1.3 + s * .4) * .18 * a + gust * a * .3 + attention.x * a * .14;
        p.scale.setScalar(.35 + a * .22); p.material.opacity = .22 * (1 - a / 5) * (1 - seg(s, 14, 24) * .7);
      }
    },
  };
}

const WORLDS = { 'art-waugh2': brideshead, 'art-burns': burns, 'art-nalan': nalan, 'art-pushkin': pushkin,
  'art-wong': wong, 'art-thackeray': thackeray };

// ---------------------------------------------------------------- lifecycle
// Each world has two clocks. `t` is the slow ambient time of water, reeds and
// light. `s` is the scene's own story in seconds: one small event that starts
// when the scene is first read and then rests. The essay's timeline, when it
// exists, owns `s` so that the worlds keep time with the music.
function mount(art, build) {
  const svg = art.querySelector('svg');
  const canvas = document.createElement('canvas');
  canvas.className = 'mv-world';
  let renderer;
  try { renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' }); }
  catch { return; } // no WebGL: the SVG scene stays.
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene();
  const world = build(scene);
  let ready = !world.ready;
  const candle = new PointLight('#dec7a1', 0, Math.max(12, world.radius * .7), 2);
  scene.add(candle);
  const candleRay = new Vector3(), candleDirection = new Vector3();
  if (world.shadows) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap; }
  const camera = new PerspectiveCamera(world.fov, 16 / 9, .5, 2000);
  art.insertBefore(canvas, svg);
  canvas.style.display = ready ? '' : 'none';
  if (ready) svg.style.display = 'none';
  svg.pauseAnimations?.();
  art.dataset.world = ready ? '3d' : 'loading';
  const id = art.closest('[data-scene]')?.dataset.scene;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let running = false, animation = null, held = false, printed = false;
  let ambient = 0, story = 0, prev = 0, frames = 0, fpsT = performance.now();
  const attention = {x:0,y:0};
  const maxYaw = MathUtils.degToRad(world.yaw ?? 24);
  const [pMin, pMax] = world.pitch ?? [1.5, 11];
  const middle = MathUtils.degToRad((pMin + pMax) / 2);
  let yaw = 0, pitch = middle;

  function size() {
    const w = art.clientWidth || 1120, h = Math.round(w * 9 / 16);
    renderer.setSize(w, h, false);
    canvas.style.width = '100%'; canvas.style.height = 'auto';
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  // The painting responds only to attention and scroll, never to a click.
  function view(dt) {
    const lx = parseFloat(art.style.getPropertyValue('--look-x')) || 0;
    const ly = parseFloat(art.style.getPropertyValue('--look-y')) || 0;
    const pass = parseFloat(art.style.getPropertyValue('--pass')) || .5;
    // Both axes ease over seconds; scroll adds only a small change of viewpoint.
    const ease = dt ? 1 - Math.exp(-dt / 4.5) : 0;
    yaw += (lx * maxYaw * .3 + (pass - .5) * .06 - yaw) * ease;
    pitch += (middle - ly * MathUtils.degToRad(5) - pitch) * ease;
    const r = world.radius, tg = world.target;
    camera.position.set(tg.x + Math.sin(yaw) * r, world.height + Math.sin(pitch) * r * .5, tg.z + Math.cos(yaw) * r);
    camera.lookAt(tg);
    world.camUniform?.value.copy(camera.position);
  }
  function draw(dt) {
    if (!ready) return;
    view(dt);
    world.tick(ambient * .12, story, dt, attention);
    if(id)window.memoryGestures?.set(id,world.motion||{});
    const light = Number(art.style.getPropertyValue('--candle-light')) || 0;
    candle.intensity = light * Math.min(90, world.radius * 1.4);
    if (light) {
      candleRay.set(Number(art.style.getPropertyValue('--candle-x')) || 0, Number(art.style.getPropertyValue('--candle-y')) || 0, .5).unproject(camera).sub(camera.position).normalize();
      camera.getWorldDirection(candleDirection);
      candle.position.copy(camera.position).addScaledVector(candleRay, world.radius * .78 / Math.max(.3, candleRay.dot(candleDirection)));
    }
    renderer.render(scene, camera);
  }
  function frame(now) {
    const dt = prev ? Math.min(.1, (now - prev) / 1000) : 0; prev = now;
    const pointer=window.memoryMotion?.pointer?.();
    const pull=pointer?.present&&!reduced.matches?1:0;
    const ease=1-Math.exp(-dt/1.6);
    attention.x+=((pointer?.x||0)*pull-attention.x)*ease;
    attention.y+=((pointer?.y||0)*pull-attention.y)*ease;
    const owned = window.memoryTimeline?.sceneTime?.(id);
    const storyStep = owned === null || owned === undefined ? dt : Math.max(0, Math.min(.1, owned - story));
    story = owned ?? story + dt;
    ambient = owned ?? ambient + dt;
    draw(storyStep);
    frames++;
    if (now - fpsT > 2000) { art.dataset.fps = (frames * 1000 / (now - fpsT)).toFixed(1); frames = 0; fpsT = now; }
  }
  function loop(now) {
    animation = null;
    if (!running) return;
    frame(now);
    animation = requestAnimationFrame(loop);
  }
  function apply() {
    if (printed) return;
    const state = art.dataset.state;
    const r = art.getBoundingClientRect();
    const visible = r.bottom > 0 && r.top < innerHeight;
    const shouldRun = ready && state === 'present' && visible && !reduced.matches && !held;
    if (shouldRun && !running) { running = true; prev = 0; frames = 0; fpsT = performance.now(); animation = requestAnimationFrame(loop); }
    if (!shouldRun && running) { running = false; cancelAnimationFrame(animation); animation = null; }
    if (state === 'set') print();
  }
  // Once set, the world becomes a print of its last frame and gives its GPU back.
  function print() {
    if (!ready || printed) return;
    printed = true;
    window.memoryGestures?.clear(id);
    renderer.render(scene, camera);
    const img = new Image();
    img.className = 'mv-world'; img.alt = ''; img.src = canvas.toDataURL('image/jpeg', .92);
    img.width = canvas.width; img.height = canvas.height;
    canvas.replaceWith(img);
    art.dataset.world = 'print';
    release();
  }
  function release() {
    running = false;
    cancelAnimationFrame(animation);
    animation = null;
    scene.traverse(o => { o.geometry?.dispose(); if (o.material) [].concat(o.material).forEach(m => { m.map?.dispose(); m.dispose(); }); });
    renderer.dispose(); renderer.forceContextLoss();
  }
  // Studies and checks can hold a world at any moment of its story.
  art._world = {
    camera, world,
    travellerPosition() {
      if (!world.traveller) return null;
      world.traveller.updateWorldMatrix(true, false);
      const p = world.traveller.getWorldPosition(new Vector3()).project(camera), r = art.getBoundingClientRect();
      return { x: r.left + (p.x + 1) * r.width / 2, y: r.top + (1 - p.y) * r.height / 2 - 9 };
    },
    seek(seconds) { held = true; apply(); story = seconds; ambient = seconds; prev = 0; draw(0); },
    resume() { held = false; apply(); },
  };
  size();
  // Without motion the world shows the moment its story rests in.
  if (reduced.matches) { story = ambient = world.still ?? 0; }
  draw(0);
  new MutationObserver(apply).observe(art, { attributes: true, attributeFilter: ['data-state'] });
  addEventListener('scroll', () => { if (!printed) apply(); }, { passive: true });
  reduced.addEventListener('change', apply);
  addEventListener('resize', () => { if (printed) return; size(); if (ready && !running) renderer.render(scene, camera); });
  addEventListener('memory-scene-start', event => { if (event.detail?.id === id && story < 3) story = 0; });
  world.ready?.then(() => {
    ready = true;
    canvas.style.display = '';
    svg.style.display = 'none';
    art.dataset.world = '3d';
    if (!held) story = ambient = reduced.matches ? world.still ?? 0 : window.memoryTimeline?.sceneTime?.(id) ?? story;
    draw(0);
    apply();
  }, () => {
    printed = true;
    canvas.remove();
    svg.style.display = '';
    if (!reduced.matches) svg.unpauseAnimations?.();
    art.dataset.world = 'svg';
    release();
  });
  apply();
}

const stillness = matchMedia('(prefers-reduced-motion: reduce)');
for (const art of document.querySelectorAll('.memory-essay[data-visuals="living"] .memory-art')) {
  const key = Object.keys(WORLDS).find(k => art.classList.contains(k));
  if (!key) continue;
  // Without motion each world is still drawn once, at the moment its story rests, and printed.
  const ready = () => {
    if (art.dataset.state !== 'present' && !(stillness.matches && art.dataset.state === 'set')) return;
    watcher.disconnect();
    mount(art, WORLDS[key]);
  };
  const watcher = new MutationObserver(ready);
  watcher.observe(art, { attributes: true, attributeFilter: ['data-state'] });
  ready();
}

// ---------------------------------------------------------------- the train
// Out of Thackeray's picture a railway is laid, sleeper by sleeper, in one slow
// unwinding turn across the page. The train follows the layer at a walking
// pace and leaves at the near corner. Behind it, the rails are gone again.
function trackMaterial(uniforms, colour) {
  return new ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { ...uniforms, uColour: { value: new Color(colour) } },
    vertexShader: `attribute float along; uniform float uHead; varying float vAlong; varying float vDepth;
      void main(){ vAlong = along; vec3 p = position;
        float placed = clamp((uHead - along) / .014, 0., 1.);
        p.y += (1. - placed) * .9;
        vec4 mv = modelViewMatrix * vec4(p, 1.); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float uHead; uniform float uTail; uniform vec3 uColour; uniform vec3 uFog; uniform vec2 uFogRange;
      varying float vAlong; varying float vDepth;
      void main(){
        float a = smoothstep(uTail - .05, uTail + .02, vAlong) * clamp((uHead - vAlong) / .014, 0., 1.);
        if (a <= 0.) discard;
        vec3 c = mix(uColour, uFog, smoothstep(uFogRange.x, uFogRange.y, vDepth));
        gl_FragColor = vec4(c, a);
        #include <colorspace_fragment>
      }`,
  });
}

function locomotive(body, dark) {
  const g = new Group(), box = new BoxGeometry(1, 1, 1);
  const boiler = add(g, new CylinderGeometry(.42, .42, 2.1, 16), body, .45, .78, 0); boiler.rotation.z = Math.PI / 2;
  add(g, box, body, -.95, .95, 0, .9, 1.05, 1.0);
  add(g, box, dark, -.95, 1.52, 0, 1.05, .08, 1.12);
  add(g, new CylinderGeometry(.13, .16, .5, 10), dark, 1.15, 1.35, 0);
  add(g, new SphereGeometry(.2, 10, 8), body, .3, 1.2, 0, 1, .7, 1);
  add(g, box, dark, .1, .3, 0, 2.9, .26, .9);
  const wheels = [];
  for (const x of [-.8, .05, .85]) for (const z of [-.47, .47]) {
    const w = add(g, new CylinderGeometry(.3, .3, .08, 14), dark, x, .3, z); w.rotation.x = Math.PI / 2; wheels.push(w);
  }
  const rods = [-.5, .5].map(z => add(g, box, body, .02, .3, z * 1.06, 1.7, .05, .03));
  return { group: g, wheels, rods, chimney: new Vector3(1.15, 1.7, 0) };
}

function carriage(body, dark, lit, len = 3) {
  const g = new Group(), box = new BoxGeometry(1, 1, 1);
  add(g, box, body, 0, .82, 0, len, .9, 1.0);
  add(g, box, dark, 0, 1.33, 0, len + .1, .12, 1.08);
  for (let i = 0; i < 5; i++) for (const z of [-.505, .505]) add(g, new PlaneGeometry(.32, .28), lit, -len / 2 + .45 + i * (len - .9) / 4, .95, z).rotation.y = z > 0 ? 0 : Math.PI;
  const wheels = [];
  for (const x of [-len / 2 + .5, len / 2 - .5]) for (const z of [-.45, .45]) {
    const w = add(g, new CylinderGeometry(.22, .22, .07, 12), dark, x, .22, z); w.rotation.x = Math.PI / 2; wheels.push(w);
  }
  return { group: g, wheels };
}

function mountTrain() {
  const art = document.querySelector('.art-thackeray');
  if (!art) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let state = 'waiting', host, renderer, frameId = null, covered = false;
  let story = 0, prev = 0, duration = 42;
  // What the train is doing, for whatever listens to it (its sound).
  const heard = { running: false, progress: 0, front: 0, speed: 0, pace: 0, x: 0, depth: 1, steaming: false };
  const finished = () => dispatchEvent(new Event('memory-train-finished'));

  function start(seconds) {
    if (state !== 'waiting') return;
    if (reduced.matches) { state = 'done'; finished(); return; }
    duration = seconds;
    host = document.createElement('div');
    host.className = 'memory-train'; host.setAttribute('aria-hidden', 'true');
    const canvas = document.createElement('canvas');
    try { renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { state = 'done'; finished(); return; }
    state = 'running';
    host.append(canvas); document.body.append(host);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    build();
    resume();
  }

  let scene, camera, curve, length, train, uniforms, puffs, lastPuff = 0;
  const raycaster = new Raycaster(), floor = new Plane(new Vector3(0, 1, 0), 0);
  function onFloor(nx, ny) {
    raycaster.setFromCamera(new Vector2(nx * 2 - 1, 1 - ny * 2), camera);
    return raycaster.ray.intersectPlane(floor, new Vector3()) || new Vector3();
  }
  function build() {
    scene = new Scene();
    const paper = new Color(getComputedStyle(document.body).backgroundColor || '#efede6');
    camera = new PerspectiveCamera(36, innerWidth / innerHeight, 1, 600);
    camera.position.set(0, 19, 36); camera.lookAt(0, 0, -4);
    camera.updateMatrixWorld(); camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);
    scene.add(new HemisphereLight(new Color('#dfe2dc'), new Color('#59625d'), 1.6));
    const sun = new DirectionalLight(new Color('#efe6d6'), 1.1); sun.position.set(-20, 40, 10); scene.add(sun);
    // The line starts inside the picture and unwinds outward, to the near corner.
    // From where the picture is read (its focus on the page), not where it happens to be mid-arrival.
    const sx = .27, sy = .5;
    const screen = [[sx, sy], [sx - .07, sy - .11], [Math.max(.05, sx - .17), sy - .02], [Math.max(.07, sx - .13), sy + .2],
      [sx + .02, .86], [.36, .92], [.56, .93], [.74, .91], [.88, .89], [1.0, .95], [1.14, 1.12]];
    curve = new CatmullRomCurve3(screen.map(([x, y]) => onFloor(x, y)), false, 'centripetal');
    length = curve.getLength();
    uniforms = { uHead: { value: 0 }, uTail: { value: -1 }, uFog: { value: paper }, uFogRange: { value: new Vector2(30, 110) } };
    const n = Math.round(length * 9), gauge = .52, rails = [], railAlong = [], idx = [], sleepers = [], sleeperAlong = [], sIdx = [];
    for (let i = 0; i <= n; i++) {
      const u = i / n, p = curve.getPointAt(u), t = curve.getTangentAt(u), nx = -t.z, nz = t.x;
      for (const side of [-1, 1]) for (const w of [-.045, .045]) {
        rails.push(p.x + nx * (side * gauge + w), .08, p.z + nz * (side * gauge + w)); railAlong.push(u);
      }
      if (i < n) for (const k of [0, 2]) { const a = i * 4 + k, b = a + 1, c = a + 4, d = c + 1; idx.push(a, c, b, b, c, d); }
    }
    for (let i = 0, m = Math.round(length / .62); i <= m; i++) {
      const u = i / m, p = curve.getPointAt(u), t = curve.getTangentAt(u), nx = -t.z, nz = t.x, base = sleepers.length / 3;
      for (const [a, b] of [[-.8, -.1], [-.8, .1], [.8, -.1], [.8, .1]]) {
        sleepers.push(p.x + nx * a + t.x * b, .03, p.z + nz * a + t.z * b); sleeperAlong.push(u);
      }
      sIdx.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
    const mesh = (pos, along, index, colour) => {
      const geo = new BufferGeometry();
      geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
      geo.setAttribute('along', new Float32BufferAttribute(along, 1));
      geo.setIndex(index);
      const m = new Mesh(geo, trackMaterial(uniforms, colour)); m.material.side = DoubleSide; scene.add(m); return m;
    };
    mesh(sleepers, sleeperAlong, sIdx, '#8d8f88');
    mesh(rails, railAlong, idx, '#4a524e');
    // The train: an engine, its tender, three carriages with their lamps lit.
    const body = lambert('#46504b', { transparent: true }), dark = lambert('#2e3532', { transparent: true });
    const lit = new MeshBasicMaterial({ color: new Color('#e3cfa4'), transparent: true, opacity: .55 });
    const engine = locomotive(body, dark);
    const tender = carriage(body, dark, new MeshBasicMaterial({ visible: false }), 1.5);
    const cars = [0, 1, 2].map(() => carriage(body, dark, lit));
    train = [[engine, 2.9], [tender, 1.6], ...cars.map(c => [c, 3.05])];
    let offset = 0;
    for (const [part, len] of train) { part.offset = (offset + len / 2) * .78; offset += len + .22; scene.add(part.group); part.group.scale.setScalar(.78); }
    offset *= .78;
    train.length_ = offset;
    puffs = smoke(scene, 34, '#b9bdb6');
  }

  function frame(now) {
    frameId = null;
    if (state !== 'running') return;
    const dt = prev ? Math.min(.1, (now - prev) / 1000) : 0; prev = now;
    const previousStory = story;
    if (!covered && !document.hidden) story = window.memoryTimeline?.sceneTime?.('thackeray') ?? story + dt;
    const storyStep = Math.max(0, Math.min(.1, story - previousStory));
    const p = Math.min(1, story / duration);
    host.dataset.progress = p.toFixed(3);
    // The layer goes ahead; the train starts once there is line to run on.
    const lay = seg(story, 0, duration * .8);
    const run = clamp01((story - duration * .12) / (duration * .88)), eased = run * run * (3 - 2 * run);
    const front = eased * (length + train.length_ + 4);
    uniforms.uHead.value = Math.max(lay * 1.02, (front + 3) / length);
    uniforms.uTail.value = (front - train.length_ - 5) / length;
    const engine = train[0][0];
    for (const [part] of train) {
      const at = front - part.offset;
      part.group.visible = at > 0 && at < length;
      if (!part.group.visible) continue;
      const u = at / length, pt = curve.getPointAt(u), t = curve.getTangentAt(u);
      part.group.position.copy(pt).setY(.1);
      part.group.rotation.y = Math.atan2(-t.z, t.x);
      for (const w of part.wheels) w.rotation.y = -at * 2.2;
    }
    engine.rods.forEach((rod, i) => { const a = -front * 2.2 + i * Math.PI / 2; rod.position.x = .02 + Math.cos(a) * .18; rod.position.y = .3 + Math.sin(a) * .18; });
    // Steam leaves the chimney and stays behind where the engine was.
    const moving = run > 0 && run < 1;
    if (moving && engine.group.visible && story - lastPuff > .22) {
      lastPuff = story;
      const sp = puffs.find(q => q.userData.age > 5) || puffs[0];
      engine.group.updateMatrixWorld(true);
      engine.group.localToWorld(sp.position.copy(engine.chimney));
      sp.userData.born = story; sp.userData.age = 0; sp.userData.drift = rand(-.3, .3);
    }
    for (const sp of puffs) {
      const a = sp.userData.age = story - (sp.userData.born ?? -99);
      if (!(a >= 0 && a < 5)) { sp.material.opacity = 0; continue; }
      sp.position.y += storyStep * .9; sp.position.x += storyStep * (sp.userData.drift+(window.memoryMotion?.pointer?.().x||0)*.3);
      sp.scale.setScalar(.6 + a * 1.2); sp.material.opacity = .42 * Math.min(1, a * 3) * (1 - a / 5);
    }
    const was = heard.front;
    heard.running = true; heard.progress = p; heard.front = front;
    heard.speed = dt ? (front - was) / dt : heard.speed;
    heard.pace = Math.min(1, heard.speed / ((length + train.length_ + 4) * 1.5 / (duration * .88)));
    heard.steaming = moving && engine.group.visible;
    if (engine.group.visible) {
      const at = engine.group.position.clone().project(camera);
      heard.x = at.x; heard.depth = Math.min(1.6, Math.max(.2, 1 - at.z * 0 + (engine.group.position.z + 20) / 60));
    }
    renderer.render(scene, camera);
    if (p >= 1) { finish(); return; }
    frameId = requestAnimationFrame(frame);
  }
  function resume() { prev = 0; if (state === 'running' && frameId === null) frameId = requestAnimationFrame(frame); }
  function finish() {
    if (state !== 'running') return;
    state = 'done'; heard.running = false; heard.speed = heard.pace = 0; heard.steaming = false;
    if (frameId !== null) cancelAnimationFrame(frameId); frameId = null;
    const leaving = host;
    leaving.animate([{ opacity: getComputedStyle(leaving).opacity }, { opacity: 0 }], { duration: 900, fill: 'forwards' }).finished
      .then(() => { leaving.remove(); scene.traverse(o => { o.geometry?.dispose(); o.material?.dispose?.(); }); renderer.dispose(); renderer.forceContextLoss(); });
    finished();
  }
  addEventListener('memory-scene-start', e => { if (e.detail?.id === 'thackeray') start(e.detail.duration / 1000); });
  addEventListener('memory-scene-skip', e => { if (e.detail?.id === 'thackeray') { if (state === 'waiting') { state = 'done'; finished(); } else finish(); } });
  document.addEventListener('visibilitychange', resume);
  document.addEventListener('toggle', e => { if (e.target.matches?.('.memory-world-dialog')) { covered = e.target.open; resume(); } }, true);
  reduced.addEventListener('change', () => { if (reduced.matches && state === 'running') finish(); });
  addEventListener('resize', () => { if (state !== 'running') return; camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight, false); });
  // Studies can start the train directly.
  window.memoryTrain = { start, seek(sec) { story = sec; prev = 0; }, state: () => ({ ...heard }) };
}
mountTrain();

// The wandering mouse shares the butterfly's clock, rather than adding a loop.
function mountWanderingMouse() {
  const host = document.querySelector('body > .memory-mouse');
  if (!host) return;
  const canvas = document.createElement('canvas');
  let renderer;
  try { renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(50, 37.5, false);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  canvas.className = 'memory-mouse-volume';
  const scene = new Scene();
  const camera = new OrthographicCamera(-2.7, 2.7, 2.025, -2.025, .1, 30);
  camera.position.set(.7, 2.5, 7);
  camera.lookAt(0, .65, 0);
  scene.add(new HemisphereLight('#d4ded7', '#39464a', 1.5));
  const key = new DirectionalLight('#d1e0db', 2.1);
  key.position.set(-3, 5, 4); scene.add(key);
  // One mesh factory for both sides of the handover. Only the camera differs.
  const creature = fieldMouse();
  const mouse = creature.root, {tail, legs} = creature;
  scene.add(mouse);
  host.append(canvas);
  host.dataset.dimension = '3d';
  let last = -Infinity, heading = 0, disposed = false, lastGround=null;
  const ground = new Vector3(), vertical = new Vector3(0,1,0);
  const right = new Vector3(1,0,0).applyQuaternion(camera.quaternion);
  const up = new Vector3(0,1,0).applyQuaternion(camera.quaternion);
  const determinant=right.x*up.z-right.z*up.x;
  function bone(mesh,a,b){
    const delta=new Vector3().subVectors(b,a);
    mesh.position.copy(a).add(b).multiplyScalar(.5);
    mesh.scale.y=delta.length();
    mesh.quaternion.setFromUnitVectors(vertical,delta.normalize());
  }
  const draw = ({phase = 0, moving = 0, heading: direction, groundX, groundY, depthScale = 1, jump = 0, crouch = 0, seconds = 0} = {}) => {
    if(groundX!==undefined){
      if(lastGround){
        const dx=(groundX-lastGround.x)*5.4/(50*depthScale);
        const dy=-(groundY-lastGround.y)*5.4/(50*depthScale);
        ground.x+=(dx*up.z-right.z*dy)/determinant;
        ground.z+=(right.x*dy-dx*up.x)/determinant;
      }
      lastGround={x:groundX,y:groundY};
    }
    const aim = direction !== undefined ? direction : heading;
    heading += Math.atan2(Math.sin(aim-heading),Math.cos(aim-heading)) * .12;
    mouse.rotation.y = heading + Math.sin(seconds * .35) * .055;
    mouse.rotation.z = jump * .17 * (Math.cos(heading) < 0 ? -1 : 1);
    mouse.scale.y = 1 - crouch * .14;
    for (const leg of legs) {
      const u=(phase+leg.phase)%1,stance=u<.62;
      const landing=new Vector3(leg.x+.24,.05,leg.z).applyAxisAngle(vertical,mouse.rotation.y).add(ground);
      if(!leg.planted||stance&&!leg.wasStance)leg.planted=landing.clone();
      if(!stance&&leg.wasStance)leg.lift=leg.planted.clone();
      let foot;
      if(stance){
        foot=leg.planted.clone().sub(ground).applyAxisAngle(vertical,-mouse.rotation.y);
        // Replant only if a sharp turn would otherwise overextend a leg.
        if(Math.abs(foot.x-leg.x)>.65||Math.abs(foot.z-leg.z)>.4){
          leg.planted=landing.clone();foot=landing.clone().sub(ground).applyAxisAngle(vertical,-mouse.rotation.y);
        }
      }else{
        const t=(u-.62)/.38,ease=t*t*(3-2*t);
        foot=(leg.lift||landing).clone().lerp(landing,ease).sub(ground).applyAxisAngle(vertical,-mouse.rotation.y);
        foot.y=.05+Math.sin(t*Math.PI)*.12;
      }
      if(jump>0){foot.x=leg.x+.15;foot.y+=jump*.2;}
      const hip=new Vector3(leg.x,.4,leg.z);
      const knee=hip.clone().lerp(foot,.52);knee.x-=.065;
      bone(leg.upper,hip,knee);bone(leg.lower,knee,foot);
      leg.paw.position.copy(foot);leg.wasStance=stance;
    }
    tail.rotation.y = Math.sin(seconds * 1.1) * .035 * moving;
    renderer.render(scene, camera);
  };
  draw();
  host.querySelector('svg').style.display = 'none';
  const onFrame = event => {
    if (disposed || performance.now() - last < 1000 / 30) return;
    last = performance.now(); draw(event.detail);
  };
  addEventListener('memory-mouse-frame', onFrame);
  addEventListener('memory-mouse-transferred', () => {
    if (disposed) return;
    renderer.render(scene, camera);
    const print = new Image(); print.className = canvas.className; print.alt = '';
    print.src = canvas.toDataURL('image/png'); canvas.replaceWith(print);
    disposed = true; removeEventListener('memory-mouse-frame', onFrame);
    scene.traverse(object => { object.geometry?.dispose(); if (object.material) object.material.dispose(); });
    renderer.dispose(); renderer.forceContextLoss();
  }, {once: true});
}
mountWanderingMouse();
