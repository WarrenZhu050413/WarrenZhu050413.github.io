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
} from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

const PAL = {
  skyTop: '#c3c7c1', skyLow: '#c9c6bd', fog: '#c9c6bd', mass: '#66706b', woods: '#68736d',
  ground: '#717b75', water: '#7d8781', near: '#2f3935', lamp: '#ecd3a0', green: '#a7c9a0', swan: '#dcdad2',
};

const rng = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);
const rand = (a, b) => a + (b - a) * rng();

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
  // Far shore and park.
  add(scene, new BoxGeometry(900, 1, 260), lambert(PAL.ground), 0, -.3, -138);

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
  add(house, new CylinderGeometry(.75, .8, 1.6, 10), stone, 0, 16.6, -6);
  add(house, new SphereGeometry(.8, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), lead, 0, 17.4, -6);
  add(house, new CylinderGeometry(.06, .06, 1.8, 4), lead, 0, 18.6, -6);
  // Chimney stacks along the roofs, and the small dome at the west end.
  for (const x of [-33, -31.6, -25, -17, -15.6, 15.6, 17, 25, 31.6, 33]) add(house, box, stone, x, 6.6, -6, .7, 1.8, .7);
  for (const x of [-8.6, -7.3, 7.3, 8.6]) add(house, box, stone, x, 10.2, -9, .7, 2.2, .7);
  add(house, new CylinderGeometry(1.1, 1.1, 1.2, 12), stone, 32, 6.4, -4.5);
  add(house, new SphereGeometry(1.1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), lead, 32, 7, -4.5, 1, 1.2, 1);
  // A few statues on the skyline: posts, no more.
  for (const x of [-34, -28, -20, -12, -6.8, 6.8, 12, 20, 28, 34]) add(house, box, stone, x, 6.2, -.3, .3, .8, .3);
  house.position.y = .2;
  scene.add(house);
  const windows = lights(house, [[-3.4, 3, .55], [-1.2, 3, .55], [1.2, 3, .55], [3.4, 3, .55], [-18, 2.4, .05], [14, 2.4, .05], [0, 7, .55]]);

  woods(scene, [[-56, -8, 4], [-66, -16, 5], [-80, -6, 4], [-46, -26, 5], [54, -8, 4], [66, -18, 5], [80, -8, 4], [46, -28, 5],
    [-104, -20, 6], [104, -22, 6], [-22, -32, 5], [22, -34, 5], [-4, -46, 6], [-140, -40, 8], [140, -44, 8], [-180, -70, 10], [180, -70, 10]]);
  const fog = mist(scene, [[-30, 1.2, 8, 60, 3], [30, 1, 4, 70, 3.5], [0, 1.6, -2, 90, 4], [-60, 1.4, -10, 80, 4], [60, 1.2, 14, 50, 2.5]]);

  // Two swans, far out.
  const swanMat = new MeshBasicMaterial({ color: new Color(PAL.swan), fog: true });
  const swans = new Group();
  [0, 1.4].forEach(dx => add(swans, new SphereGeometry(.35, 8, 6), swanMat, dx, .18, 0, 1.4, .5, .7));
  swans.position.set(20, 0, 26);
  swans.userData = { drift: [-.35, 0], bounds: [-70, 70, -1, 80] };
  scene.add(swans);
  const skiff = rowingBoat(scene, -16, 46);
  skiff.userData = { drift: [0, 0], bounds: [-70, 70, 0, 90] };

  const target = new Vector3(0, 6.5, -4);
  const reeds = reedArc(scene, target, 140, -40, -12, 30).concat(reedArc(scene, target, 140, 12, 40, 30));
  const birds = rooks(scene, new Vector3(0, 14, -6));

  return {
    target, radius: 165, height: 4.2, fov: 23, movables: [swans, skiff], water: water_,
    tick(t) {
      water_.material.uniforms.uTime.value = t;
      for (const w of windows) w.material.opacity = .45 + .35 * Math.sin(t * w.userData.speed + w.userData.phase) ** 2;
      for (const m of fog) m.position.x = m.userData.x0 + Math.sin(t * .05 * m.userData.speed + m.userData.phase) * 12;
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

// ---------------------------------------------------------------- Wong: a street seen through dusty glass
function wong(scene) {
  scene.fog = new Fog('#9fa29b', 10, 120);
  skyDome(scene, '#8d938e', '#a5a69e');
  scene.add(new HemisphereLight(new Color('#bdbab0'), new Color('#33393a'), 1.2));
  const lamp = new DirectionalLight(new Color('#e9d3a6'), .7);
  lamp.position.set(10, 20, 10);
  scene.add(lamp);
  const water_ = water(scene, 400, '#5f6863'); // the wet street
  const wall = lambert('#4f5853');
  const box = new BoxGeometry(1, 1, 1);
  // Two walls of a narrow street, falling away into the haze.
  for (let i = 0; i < 9; i++) {
    const z = -i * 14;
    add(scene, box, wall, -9, rand(9, 15), z, 6, rand(18, 30), 13);
    add(scene, box, wall, 9, rand(9, 15), z - 6, 6, rand(18, 30), 13);
  }
  const windows = lights(scene, [[-5.9, 6, -4], [5.9, 9, -18], [-5.9, 11, -40], [5.9, 5, -60], [-5.9, 8, -82]], PAL.lamp, [1.2, 1.8]);
  windows.forEach((w, i) => { w.rotation.y = i % 2 ? -Math.PI / 2 : Math.PI / 2; });
  const fog = mist(scene, [[0, 1.5, -10, 30, 4], [0, 2, -40, 40, 6]], .25);
  return {
    target: new Vector3(0, 5, -30), radius: 46, height: 4.5, fov: 34, yaw: 14, pitch: [3, 9], movables: [], water: water_,
    tick(t) {
      water_.material.uniforms.uTime.value = t * .6;
      for (const w of windows) w.material.opacity = .4 + .3 * Math.sin(t * w.userData.speed + w.userData.phase) ** 2;
      for (const m of fog) m.position.x = m.userData.x0 + Math.sin(t * .05 + m.userData.phase) * 4;
    },
    camUniform: water_.material.uniforms.uCam,
  };
}

// ---------------------------------------------------------------- Gatsby: the green light across the bay
function gatsby(scene) {
  scene.fog = new Fog('#6f7774', 30, 380);
  skyDome(scene, '#5d6562', '#7d8580');
  scene.add(new HemisphereLight(new Color('#9da39c'), new Color('#232a28'), 1.1));
  const water_ = water(scene, 900, '#4a5451');
  ridges(scene, -260, '#4f5855', 9, 1000, [6, 14]);
  // The far dock: a long low line with a post and the light at its end.
  const dark = lambert('#323a37');
  const box = new BoxGeometry(1, 1, 1);
  add(scene, box, dark, 12, .7, -150, 26, .5, 2.2);
  add(scene, box, dark, 25, 2.1, -150, .4, 3.4, .4);
  const greenTex = softSprite('#b7d8ae');
  const halo = new Sprite(new SpriteMaterial({ map: greenTex, transparent: true, opacity: .8, depthWrite: false, fog: false }));
  halo.position.set(25, 4, -150); halo.scale.set(7, 7, 1);
  scene.add(halo);
  add(scene, new SphereGeometry(.3, 8, 6), new MeshBasicMaterial({ color: new Color(PAL.green), fog: false }), 25, 4, -150);
  // The near dock, running out from under us.
  for (let i = 0; i < 16; i++) add(scene, box, dark, -9, .9, 44 - i * 3, 3.2, .25, 2.6);
  for (let i = 0; i < 8; i++) { add(scene, box, dark, -10.6, .1, 44 - i * 6, .3, 2.2, .3); add(scene, box, dark, -7.4, .1, 44 - i * 6, .3, 2.2, .3); }
  const boat = new Group();
  const hull = add(boat, new SphereGeometry(1, 14, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), dark, 0, .25, 0, 1.1, .5, 3);
  hull.rotation.y = .2;
  scene.add(boat);
  boat.position.set(6, 0, 10);
  boat.userData = { drift: [0, -.4], bounds: [-60, 60, -100, 80] };
  return {
    target: new Vector3(12, 3, -120), radius: 190, height: 3.4, fov: 26, movables: [boat], water: water_,
    tick(t) {
      water_.material.uniforms.uTime.value = t * .7;
      halo.material.opacity = .62 + Math.sin(t * .8) * .14;
      boat.position.y = Math.sin(t * .9) * .08;
      boat.rotation.z = Math.sin(t * .7) * .04;
    },
    camUniform: water_.material.uniforms.uCam,
  };
}


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
  for (let i = 0; i < tops.length - 1; i++) {
    const a = tops[i], b = tops[i + 1], seg = [];
    for (let k = 0; k <= 8; k++) { const v = a.clone().lerp(b, k / 8); v.y -= Math.sin(Math.PI * k / 8) * .7; seg.push(v); }
    scene.add(line(seg, '#4a524e', .7));
  }
  // One person on the crest, looking over to the other side.
  const watcher = figure('#2c3330', 1.7);
  const wp = curve.getPointAt(.53); watcher.position.set(wp.x, 6, wp.z); watcher.rotation.y = Math.PI;
  scene.add(watcher);
  // The old world on this side: a hedge and two trees, already half gone in the mist.
  add(scene, new BoxGeometry(160, 2.2, 2.2), lambert('#59635c'), -80, 1.1, 38);
  woods(scene, [[-46, 44, 4], [-20, 58, 5]], '#56615a');
  // The train, and the smoke it leaves where it was.
  const cars = Array.from({ length: 5 }, (_, i) => add(scene, new BoxGeometry(2.4, i ? 2.3 : 2.7, i ? 7 : 6), lambert('#323a37'), 0, 0, 0));
  const puffs = smoke(scene, 26);
  let nextPuff = 0;
  return {
    target: new Vector3(0, 5, -18), radius: 92, height: 3, fov: 30, yaw: 30, pitch: [2, 17],
    tick(t) {
      const u0 = (t / 38) % 1;
      cars.forEach((c, i) => {
        const u = MathUtils.clamp(u0 - i * .024, 0, 1), p = curve.getPointAt(u), d = curve.getTangentAt(u);
        c.position.set(p.x, 7.3 + (i ? -.2 : 0), p.z); c.rotation.y = Math.atan2(d.x, d.z); c.visible = u0 - i * .024 > 0;
      });
      if (t > nextPuff) {
        nextPuff = t + .35;
        const s = puffs.find(p => p.userData.age > 9) || puffs[0];
        s.position.copy(cars[0].position).add(new Vector3(0, 2, 0)); s.userData.age = 0; s.userData.born = t;
      }
      for (const s of puffs) {
        if (s.userData.age > 9) continue;
        const a = s.userData.age = t - s.userData.born;
        s.position.y += .012; s.scale.setScalar(2 + a * 2.2);
        s.material.opacity = Math.max(0, .5 * (1 - a / 9));
      }
    },
  };
}

// ---------------------------------------------------------------- Burns: a November field and a turned nest
function burns(scene) {
  scene.fog = new Fog('#c2bdb1', 18, 190);
  skyDome(scene, '#bdbdb5', '#c9c1b2');
  scene.add(new HemisphereLight(new Color('#d6d0c2'), new Color('#4f5550'), 1.1));
  const sun = new DirectionalLight(new Color('#f0d8b8'), 1.0); sun.position.set(60, 9, -80); scene.add(sun);
  const field = new PlaneGeometry(500, 500, 250, 120);
  const pos = field.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin(pos.getX(i) * 1.5) * .22);
  field.computeVertexNormals();
  add(scene, field, lambert('#807b6c'), 0, 0, 0).rotation.x = -Math.PI / 2;
  add(scene, new BoxGeometry(600, 3, 3), lambert('#5d625b'), 0, 1.5, -110);
  woods(scene, [[-60, -112, 6], [20, -116, 7], [90, -110, 5], [-150, -120, 9], [160, -125, 9]], '#5b6159');
  // Stubble near us, bending in the wind.
  const stalkGeo = new ConeGeometry(.03, .7, 3, 1, true); stalkGeo.translate(0, .35, 0);
  const stalkMat = new MeshBasicMaterial({ color: new Color('#6e6a5c'), side: DoubleSide });
  const stalks = [];
  for (let i = 0; i < 700; i++) {
    const m = new Mesh(stalkGeo, stalkMat);
    m.position.set(rand(-28, 28), 0, rand(4, 46)); m.scale.y = rand(.6, 1.4);
    m.userData = { phase: rand(0, 6), base: rand(-.1, .1) };
    scene.add(m); stalks.push(m);
  }
  // The nest, and the mouse that can be lifted away from it.
  add(scene, new SphereGeometry(.7, 10, 6), lambert('#4a4840'), 1.5, .2, 26, 1, .45, .9);
  const mouse = new Group();
  add(mouse, new SphereGeometry(.22, 10, 8), lambert('#3c3a35'), 0, .16, 0, 1, .8, 1.5);
  add(mouse, new SphereGeometry(.12, 8, 6), lambert('#3c3a35'), 0, .2, .3);
  const tail = add(mouse, new CylinderGeometry(.015, .015, .6, 4), lambert('#3c3a35'), 0, .1, -.55); tail.rotation.x = 1.3;
  mouse.position.set(2.6, 0, 27.2); mouse.userData = { reach: 1.2, bounds: [-20, 20, 8, 40] };
  scene.add(mouse);
  const birds = rooks(scene, new Vector3(-10, 9, -20));
  return {
    target: new Vector3(0, 1, 18), radius: 38, height: 2.4, fov: 34, yaw: 26, pitch: [1.5, 12], movables: [mouse],
    tick(t) {
      const gust = Math.sin(t * .35) * .5 + .5;
      for (const s of stalks) s.rotation.z = s.userData.base + Math.sin(t * 1.6 + s.position.x * .25 + s.userData.phase * .3) * .12 * (.4 + gust);
      for (const b of birds) {
        const u = b.userData, a = t * u.speed + u.phase;
        b.position.set(u.centre.x + Math.cos(a) * u.r, u.h + Math.sin(a * 2) * .6, u.centre.z + Math.sin(a) * u.r * .6);
        b.scale.y = 1 + Math.sin(t * 9 + u.phase) * .8;
      }
    },
  };
}

// ---------------------------------------------------------------- Hemingway: the Seine at evening
function hemingway(scene) {
  scene.fog = new Fog('#aeaea6', 30, 300);
  skyDome(scene, '#a9ada7', '#b8b5ac');
  scene.add(new HemisphereLight(new Color('#c9c6bc'), new Color('#3c4441'), 1.2));
  const water_ = water(scene, 900, '#5f6964');
  const stone = lambert('#5d6560'), roof = lambert('#4c5551');
  for (const s of [-1, 1]) {
    add(scene, new BoxGeometry(8, 3, 520), stone, s * 26, 1.5, -200);
    for (let z = 30; z > -420; z -= rand(9, 15)) {
      const h = rand(11, 17), w = rand(8, 13);
      add(scene, new BoxGeometry(12, h, w), stone, s * 37, h / 2 + 3, z);
      const r = add(scene, new CylinderGeometry(1, 1, w * .98, 4), roof, s * 37, h + 3 + 1.4, z, 6.2, 1, 2.2);
      r.rotation.set(Math.PI / 2, 0, 0); r.scale.set(6.4, 1, 2.2);
      if (rng() < .5) add(scene, new BoxGeometry(.9, 2.2, .9), stone, s * (35 + rand(-3, 3)), h + 5.5, z + rand(-2, 2));
    }
  }
  // A single stone arch, kept as one quiet silhouette.
  const bridge = new Shape();
  bridge.moveTo(-32, 0); bridge.lineTo(-32, 9); bridge.lineTo(32, 9);
  bridge.lineTo(32, 0); bridge.lineTo(20, 0);
  bridge.quadraticCurveTo(0, 13, -20, 0); bridge.lineTo(-32, 0);
  add(scene, new ExtrudeGeometry(bridge, { depth: 6, bevelEnabled: false, curveSegments: 24 }), stone, 0, 0, -98);
  add(scene, new SphereGeometry(10, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), roof, 22, 26, -360, 1, 1.25, 1);
  add(scene, new CylinderGeometry(10, 10, 12, 20), stone, 22, 20, -360);
  const lamps = [];
  const lampTex = softSprite('#f0d7a6');
  for (const s of [-1, 1]) for (let z = 20; z > -300; z -= 22) {
    add(scene, new CylinderGeometry(.08, .1, 4, 5), stone, s * 23, 5, z);
    const g = new Sprite(new SpriteMaterial({ map: lampTex, transparent: true, opacity: .8, depthWrite: false, fog: true }));
    g.position.set(s * 23, 7.2, z); g.scale.set(2.2, 2.2, 1); scene.add(g); lamps.push(g);
  }
  const barge = new Group();
  add(barge, new SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), lambert('#353d3a'), 0, .2, 0, 1.2, .35, 4.5);
  barge.position.set(-6, 0, -60); barge.userData = { drift: [0, 1.2], bounds: [-16, 16, -200, 60], reach: 6 };
  scene.add(barge);
  return {
    target: new Vector3(0, 7, -90), radius: 120, height: 6, fov: 30, yaw: 18, pitch: [2, 10], movables: [barge], water: water_,
    tick(t) {
      water_.material.uniforms.uTime.value = t * .8;
      lamps.forEach((l, i) => { l.material.opacity = .65 + Math.sin(t * .7 + i) * .12; });
    },
    camUniform: water_.material.uniforms.uCam,
  };
}

// ---------------------------------------------------------------- Pushkin: sheets under a lamp
function pushkin(scene) {
  scene.background = new Color('#303633');
  scene.fog = new Fog('#303633', 14, 60);
  scene.add(new HemisphereLight(new Color('#6d6e66'), new Color('#202523'), .55));
  const lamp = new PointLight(new Color('#f1d7aa'), 260, 40, 2); lamp.position.set(-3, 9, -1); lamp.castShadow = true;
  lamp.shadow.mapSize.set(1024, 1024); lamp.shadow.radius = 6; scene.add(lamp);
  add(scene, new ConeGeometry(1.6, 1.4, 20, 1, true), new MeshBasicMaterial({ color: new Color('#262b29'), side: DoubleSide }), -3, 10, -1);
  shade(add(scene, new BoxGeometry(26, 1, 15), lambert('#4b504b'), 0, -.5, 0), false, true);
  shade(add(scene, new PlaneGeometry(60, 30), lambert('#3a403c'), 0, 6, -9), false, true);
  const mat = new MeshLambertMaterial({ map: sheetTexture() });
  const sheetGeo = new BoxGeometry(4.2, .02, 5.6);
  const sheets = [];
  const place = (s, i) => { s.position.set(1.2 + rand(-.25, .25), .02 + i * .03, .3 + rand(-.25, .25)); s.rotation.y = rand(-.12, .12); };
  for (let i = 0; i < 16; i++) { const s = shade(add(scene, sheetGeo, mat, 0, 0, 0)); place(s, i); sheets.push(s); }
  const falling = shade(add(scene, sheetGeo, mat, 0, 0, 0));
  let nextFall = 3, count = sheets.length;
  const loose = sheets.slice(-3);
  for (const s of loose) s.userData = { reach: 2.6, bounds: [-11, 11, -6, 6], planeY: s.position.y };
  const motes = mist(scene, Array.from({ length: 14 }, () => [rand(-5, 2), rand(2, 8), rand(-3, 2), .25, .25]), .5);
  return {
    target: new Vector3(.5, .4, .2), radius: 21, height: 7, fov: 36, yaw: 38, pitch: [14, 32], shadows: true, movables: loose, traceFrom: 'last',
    tick(t) {
      lamp.intensity = 250 + Math.sin(t * 7.3) * 6 + Math.sin(t * 2.1) * 8;
      // Every so often another copy settles on the pile.
      const k = t - nextFall;
      if (k > 0 && k < 3) {
        const top = .02 + Math.min(count, 60) * .03;
        falling.visible = true;
        falling.position.set(1.2 + Math.sin(k * 3) * .4 * (1 - k / 3), top + 3 * (1 - k / 3) ** 2, .3 + Math.cos(k * 2) * .3 * (1 - k / 3));
        falling.rotation.set(Math.sin(k * 4) * .15 * (1 - k / 3), k * .2, Math.cos(k * 3) * .12 * (1 - k / 3));
      } else if (k >= 3) {
        const s = shade(add(scene, sheetGeo, mat, 0, 0, 0)); place(s, Math.min(count, 60)); count++;
        falling.visible = false; nextFall = t + 13;
      }
      motes.forEach((m, i) => { m.position.y = 2 + ((t * .08 + i * .6) % 6); });
    },
  };
}

// ---------------------------------------------------------------- Nalan: west light through a sparse window
function nalan(scene) {
  scene.background = new Color('#3a3f3b');
  scene.add(new HemisphereLight(new Color('#76786f'), new Color('#262b28'), .5));
  const sun = new DirectionalLight(new Color('#f3d2a2'), 3.2);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 4;
  Object.assign(sun.shadow.camera, { left: -20, right: 20, top: 20, bottom: -20, near: 1, far: 120 });
  sun.target.position.set(4, 0, -4); scene.add(sun, sun.target);
  const plaster = lambert('#8a867b'), floor = lambert('#6b665c');
  shade(add(scene, new PlaneGeometry(60, 60), floor, 0, 0, 0), false, true).rotation.x = -Math.PI / 2;
  shade(add(scene, new PlaneGeometry(60, 24), plaster, 0, 12, -10), false, true);
  // The west wall, with one opening and a sparse lattice in it.
  const wall = new Group(), box = new BoxGeometry(1, 1, 1);
  add(wall, box, plaster, 0, 15.5, 0, .8, 9, 40); add(wall, box, plaster, 0, 2, 0, .8, 4, 40);
  add(wall, box, plaster, 0, 7.5, -13, .8, 7, 14); add(wall, box, plaster, 0, 7.5, 14, .8, 7, 14);
  for (const z of [-2.2, 2.2]) add(wall, box, plaster, 0, 7.5, z, .5, 7, .25);
  for (const y of [6.2, 8.8]) add(wall, box, plaster, 0, y, 0, .5, .25, 12);
  wall.position.set(-14, 0, -4); scene.add(shade(wall));
  const leafGeo = new PlaneGeometry(.5, .32);
  const leafMat = new MeshLambertMaterial({ color: new Color('#a48d55'), side: DoubleSide });
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const l = shade(add(scene, leafGeo, leafMat, 0, 0, 0), true, false);
    l.userData = { phase: i * 1.9, speed: rand(.22, .35), x: rand(-24, -17), z: rand(-9, 2) };
    return l;
  });
  return {
    target: new Vector3(2, 3.5, -5), radius: 21, height: 4.5, fov: 42, yaw: 22, pitch: [5, 16], shadows: true,
    tick(t) {
      // The sun lowers over a long minute and comes round again.
      const s = (t / 70) % 1;
      sun.position.set(-60, 26 - s * 14, 10 - s * 6);
      sun.intensity = 3.2 * (1 - s * .45);
      for (const l of leaves) {
        const u = l.userData, k = (t * u.speed + u.phase) % 6 / 6;
        l.position.set(u.x + Math.sin(t * .9 + u.phase) * 1.2, 16 - k * 16, u.z + Math.cos(t * .6 + u.phase) * 1.5);
        l.rotation.set(t * 1.3 + u.phase, t * .8, t * .5);
      }
    },
  };
}

// ---------------------------------------------------------------- Li: one candle, the books, the cup
function li(scene) {
  scene.background = new Color('#272c2a');
  scene.fog = new Fog('#272c2a', 12, 50);
  scene.add(new HemisphereLight(new Color('#55574f'), new Color('#1c201f'), .35));
  const flameLight = new PointLight(new Color('#f3cf93'), 90, 30, 2); flameLight.position.set(0, 2.3, 0);
  flameLight.castShadow = true; flameLight.shadow.mapSize.set(1024, 1024); flameLight.shadow.radius = 5; scene.add(flameLight);
  shade(add(scene, new BoxGeometry(22, 1, 12), lambert('#47443d'), 0, -.5, 0), false, true);
  shade(add(scene, new PlaneGeometry(50, 24), lambert('#3c3f3a'), 0, 8, -6.5), false, true);
  add(scene, new CylinderGeometry(.18, .2, 1.6, 12), lambert('#cfc6b2'), 0, .8, 0);
  const flame = new Sprite(new SpriteMaterial({ map: softSprite('#f6d9a0'), transparent: true, depthWrite: false }));
  flame.position.set(0, 1.95, 0); flame.scale.set(.5, .9, 1); scene.add(flame);
  const bookMat = [lambert('#3d3c36'), lambert('#45433b'), lambert('#36383a')];
  for (const [x, z, n] of [[-5, -2.5, 7], [-3.2, -3.4, 5], [4.6, -3, 9], [6.4, -1.8, 4], [-6.6, .6, 3]]) {
    let y = 0;
    for (let i = 0; i < n; i++) { const h = rand(.25, .5); shade(add(scene, new BoxGeometry(rand(1.6, 2.4), h, rand(2.2, 3)), bookMat[i % 3], x + rand(-.15, .15), y + h / 2, z)).rotation.y = rand(-.1, .1); y += h; }
  }
  const cup = new Group();
  shade(add(cup, new CylinderGeometry(.45, .35, .7, 16), lambert('#b8b2a2'), 0, .35, 0));
  cup.position.set(2.2, 0, 1.6); cup.userData = { reach: 1, bounds: [-9, 9, -4, 5], planeY: 0 };
  scene.add(cup);
  const steam = smoke(scene, 10, '#e4e1d8');
  let next = 0;
  return {
    target: new Vector3(0, 1.4, -1), radius: 15, height: 3.2, fov: 40, yaw: 30, pitch: [6, 22], shadows: true, movables: [cup],
    tick(t) {
      const f = 1 + Math.sin(t * 9.1) * .05 + Math.sin(t * 13.7) * .04 + Math.sin(t * 2.3) * .06;
      flameLight.intensity = 90 * f; flame.scale.set(.5 * f, .9 * f, 1);
      flameLight.position.x = Math.sin(t * 3.1) * .03;
      if (t > next) { next = t + .6; const s = steam.find(p => p.userData.age > 4) || steam[0]; s.position.copy(cup.position).add(new Vector3(0, .8, 0)); s.userData.age = 0; s.userData.born = t; }
      for (const s of steam) {
        if (s.userData.age > 4) continue;
        const a = s.userData.age = t - s.userData.born;
        s.position.y += .006; s.position.x += Math.sin(t * 2 + a) * .003;
        s.scale.setScalar(.3 + a * .35); s.material.opacity = Math.max(0, .35 * (1 - a / 4));
      }
    },
  };
}

const WORLDS = { 'art-waugh2': brideshead, 'art-wong': wong, 'art-gatsby': gatsby, 'art-thackeray': thackeray,
  'art-burns': burns, 'art-hemingway': hemingway, 'art-pushkin': pushkin, 'art-nalan': nalan, 'art-li': li };

// ---------------------------------------------------------------- lifecycle
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
  if (world.shadows) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFShadowMap; }
  const camera = new PerspectiveCamera(world.fov, 16 / 9, .5, 2000);
  art.insertBefore(canvas, svg);
  svg.style.display = 'none';
  svg.pauseAnimations?.();
  art.dataset.world = '3d';
  art._world = { camera, world }; // for tests: project movables to the screen

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let running = false, animation = null, start = performance.now(), last = 0, frames = 0, fpsT = performance.now();
  const maxYaw = MathUtils.degToRad(world.yaw ?? 24);
  const [pMin, pMax] = world.pitch ?? [1.5, 11];
  let yaw = 0, pitch = MathUtils.degToRad((pMin + pMax) / 2);

  function size() {
    const w = art.clientWidth, h = Math.round(w * 9 / 16);
    renderer.setSize(w, h, false);
    canvas.style.width = '100%'; canvas.style.height = 'auto';
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  // The painting responds only to attention and scroll, never to a click.
  const movables = world.movables || [];
  let dt = 0, prev = 0;

  function frame(now) {
    const t = (now - start) / 1000 * .12;
    dt = prev ? Math.min(.1, (now - prev) / 1000) : 0; prev = now;
    for (const m of movables) {
      const [vx, vz] = m.userData.drift || [0, 0], b = m.userData.bounds;
      m.position.x += vx * dt * .12; m.position.z += vz * dt * .12;
      if (b && (m.position.x < b[0] || m.position.x > b[1])) m.position.x = vx < 0 ? b[1] : b[0];
      if (b && (m.position.z < b[2] || m.position.z > b[3])) m.position.z = vz < 0 ? b[3] : b[2];
    }
    const lx = parseFloat(art.style.getPropertyValue('--look-x')) || 0;
    const ly = parseFloat(art.style.getPropertyValue('--look-y')) || 0;
    const pass = parseFloat(art.style.getPropertyValue('--pass')) || .5;
    // Both axes ease over seconds; scroll adds only a small change of viewpoint.
    const ease = 1 - Math.exp(-dt / 4.5);
    yaw += (lx * maxYaw * .3 + (pass - .5) * .06 - yaw) * ease;
    const middle = MathUtils.degToRad((pMin + pMax) / 2);
    pitch += (middle - ly * MathUtils.degToRad(5) - pitch) * ease;
    const r = world.radius, tg = world.target;
    camera.position.set(tg.x + Math.sin(yaw) * r, world.height + Math.sin(pitch) * r * .5, tg.z + Math.cos(yaw) * r);
    camera.lookAt(tg);
    world.camUniform?.value.copy(camera.position);
    world.tick(t);
    renderer.render(scene, camera);
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
    const shouldRun = state === 'present' && visible && !reduced.matches;
    if (shouldRun && !running) { running = true; if (last) start += performance.now() - last; frames = 0; fpsT = performance.now(); animation = requestAnimationFrame(loop); }
    if (!shouldRun && running) { running = false; cancelAnimationFrame(animation); animation = null; last = performance.now(); prev = 0; }
    if (state === 'set' && !printed) print();
  }
  // Once set, the world becomes a print of its last frame and gives its GPU back.
  let printed = false;
  function print() {
    printed = true;
    renderer.render(scene, camera);
    const img = new Image();
    img.className = 'mv-world'; img.alt = ''; img.src = canvas.toDataURL('image/jpeg', .92);
    img.width = canvas.width; img.height = canvas.height;
    canvas.replaceWith(img);
    art.dataset.world = 'print';
    renderer.dispose(); renderer.forceContextLoss();
  }
  size();
  frame(performance.now());
  new MutationObserver(apply).observe(art, { attributes: true, attributeFilter: ['data-state'] });
  addEventListener('scroll', () => { if (!printed) apply(); }, { passive: true });
  reduced.addEventListener('change', apply);
  addEventListener('resize', () => { if (printed) return; size(); if (!running) renderer.render(scene, camera); });
  apply();
}

for (const art of document.querySelectorAll('.memory-essay[data-visuals="living"] .memory-art')) {
  const key = Object.keys(WORLDS).find(k => art.classList.contains(k));
  if (!key) continue;
  const ready = () => {
    if (art.dataset.state !== 'present') return;
    watcher.disconnect();
    mount(art, WORLDS[key]);
  };
  const watcher = new MutationObserver(ready);
  watcher.observe(art, { attributes: true, attributeFilter: ['data-state'] });
  ready();
}

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
  const mouse = new Group(); scene.add(mouse);
  const fur = lambert('#7c8880'), ear = lambert('#8c958a'), dark = lambert('#263332');
  const sphere = new SphereGeometry(1, 20, 14);
  add(mouse, sphere, fur, -.22, .62, 0, .91, .48, .43);
  add(mouse, sphere, fur, .46, .65, 0, .51, .37, .34);
  add(mouse, sphere, fur, .85, .53, 0, .37, .19, .23);
  add(mouse, sphere, dark, 1.17, .53, 0, .065, .045, .07);
  for (const side of [-1, 1]) {
    add(mouse, sphere, fur, .32, .99, side * .22, .22, .28, .085);
    add(mouse, sphere, ear, .34, 1.005, side * .265, .155, .21, .026);
    add(mouse, sphere, dark, .73, .75, side * .285, .065, .07, .038);
    add(mouse, sphere, lambert('#cedbd4'), .75, .775, side * .313, .018, .019, .014);
  }
  const tail = new Mesh(new TubeGeometry(new CatmullRomCurve3([
    new Vector3(-.98,.43,0), new Vector3(-1.4,.28,.07),
    new Vector3(-1.8,.25,.25), new Vector3(-2.05,.32,.22)
  ]), 20, .026, 5, false), fur);
  mouse.add(tail);
  const legs = [];
  for (const [x, z, phase] of [[-.58,-.24,.5],[.58,-.23,.75],[-.58,.28,0],[.58,.27,.25]]) {
    const upper = add(mouse, new CylinderGeometry(.06,.075,1,8), fur, x,.3,z);
    const lower = add(mouse, new CylinderGeometry(.035,.05,1,8), fur, x,.15,z);
    const paw = add(mouse, sphere, ear, x,.055,z,.14,.05,.085);
    legs.push({upper,lower,paw,x,z,phase,planted:null,lift:null,wasStance:false});
  }
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
  addEventListener('memory-butterfly-finished', () => {
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
