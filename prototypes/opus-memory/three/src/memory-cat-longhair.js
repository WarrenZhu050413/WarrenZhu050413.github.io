// The long-haired black cat, from prototypes/opus-memory/blender/groom (export.py).
// Same contract as memory-cat.js: { root, head, mouth, pose }, plus ready, a promise
// that resolves once the model is attached and posable and rejects if it fails to load.
// Until then pose() does nothing and head is the root.
// Bones are posed by the solver in cat_model.py, ported: legs follow paw targets
// through FABRIK, the neck and head lower for the pickup, the tail rises after it.
import { Group, Vector3, Quaternion, Matrix4, MeshStandardMaterial, MeshPhysicalMaterial, MeshBasicMaterial, DoubleSide, Color } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';

const MODEL = '/assets/models/memory-cat-longhair.glb?v=7';
const SCALE = 4.5;            // scene units per metre inside the cat's root
const STRIDE = .9 * .72;      // world distance per gait cycle, as the scenes compute phase
const GAIT = { hind_l: 0, fore_l: .25, hind_r: .5, fore_r: .75 };
const DUTY = .62;
const Z = new Vector3(0, 0, 1), Y = new Vector3(0, 1, 0);
const clean = name => name.replace(/\s/g, '_').replace(/[[\].:/]/g, '');
const fromBlender = ([x, y, z]) => new Vector3(x, z, -y);
const smooth = x => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };

let loading;
function load() {
  loading ||= new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath('/assets/vendor/draco/')).loadAsync(MODEL);
  return loading;
}

// Coat cards: alpha-to-coverage with mip-aware coverage, lit by the skin normal from both sides,
// with a soft velvet sheen where the coat turns from the light.
function coatMaterial(map) {
  const m = new MeshPhysicalMaterial({ map, color: '#ffffff', roughness: .6, metalness: 0, side: DoubleSide, alphaToCoverage: true,
    sheen: 1, sheenColor: new Color('#7d7a76'), sheenRoughness: .42, specularIntensity: .35 });
  m.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;', 'float faceDirection = 1.0;')
      .replace('#include <alphatest_fragment>', `
        {
          vec2 texel = vMapUv * 1024.0;
          float lod = max(0.0, 0.5 * log2(max(dot(dFdx(texel), dFdx(texel)), dot(dFdy(texel), dFdy(texel)))));
          diffuseColor.a = min(1.0, diffuseColor.a * (1.0 + lod * .32));
          diffuseColor.a = clamp((diffuseColor.a - .36) / max(fwidth(diffuseColor.a) * 1.8, 1e-4) + .5, 0.0, 1.0);
        }
        #include <alphatest_fragment>`);
  };
  return m;
}

function fabrik(joints, lengths, iterations = 16) {
  const root = joints[0].clone(), target = joints[joints.length - 1].clone(), d = new Vector3();
  for (let n = 0; n < iterations; n++) {
    joints[joints.length - 1].copy(target);
    for (let i = joints.length - 2; i >= 0; i--) {
      d.subVectors(joints[i], joints[i + 1]).normalize().multiplyScalar(lengths[i]); joints[i].copy(joints[i + 1]).add(d);
    }
    joints[0].copy(root);
    for (let i = 1; i < joints.length; i++) {
      d.subVectors(joints[i], joints[i - 1]).normalize().multiplyScalar(lengths[i - 1]); joints[i].copy(joints[i - 1]).add(d);
    }
  }
  return joints;
}

export function cat() {
  const root = new Group();
  const api = { root, head: root, mouth: new Vector3(1.4, 1.2, 0), pose() {} };
  // Each cat gets its own skinned copy: a rebuilt world must not inherit another cat's pose.
  api.ready = load().then(gltf => {
    const model = cloneSkinned(gltf.scene);
    model.updateMatrixWorld(true);
    const rig = model.getObjectByName('Cat');
    const skeleton = JSON.parse(rig.userData.skeleton);
    const bones = {}, order = Object.keys(skeleton);
    for (const name of order) {
      const b = skeleton[name], node = model.getObjectByName(clean(name));
      bones[name] = { node, parent: b.parent, head: fromBlender(b.head), tail: fromBlender(b.tail),
        rest: node.getWorldQuaternion(new Quaternion()), local: node.position.clone() };
    }
    const rigWorld = rig.getWorldQuaternion(new Quaternion()), rigInverse = new Matrix4().copy(rig.matrixWorld).invert();
    model.traverse(o => {
      if (!o.isMesh) return;
      o.frustumCulled = false;
      const name = o.name.toLowerCase();
      if (name.startsWith('coat') || name.includes('fur')) o.material = coatMaterial(o.material.map);
      else if (name.startsWith('whisker')) o.material = new MeshBasicMaterial({ color: '#8d918c', side: DoubleSide, transparent: true, opacity: .75 });
      else if (name.startsWith('eye')) o.material = new MeshStandardMaterial({ map: o.material.map, roughness: .18, emissive: new Color('#ffffff'), emissiveMap: o.material.map, emissiveIntensity: .18 });
      // Lids sit a fraction of a millimetre outside the socket skin; the offset keeps them in front of it.
      else if (name.includes('lid') || name.startsWith('nose')) o.material = new MeshStandardMaterial({ color: '#0b0a0a', roughness: .55, side: DoubleSide,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
      else o.material = new MeshPhysicalMaterial({ color: '#100f0e', roughness: .82, sheen: .6, sheenColor: new Color('#5d5b58'), sheenRoughness: .5 });
    });
    model.scale.setScalar(SCALE);
    root.add(model);
    const mouth = model.getObjectByName('Mouth');
    api.head = mouth.parent; api.mouth = mouth.position.clone();

    const legs = Object.keys(GAIT).map(leg => {
      const chain = ['upper', 'lower', 'foot', 'toe'].map(p => `${leg}.${p}`);
      const joints = [...chain.map(c => bones[c].head), bones[chain[3]].tail];
      return { leg, chain, joints, lengths: chain.map(c => bones[c].tail.distanceTo(bones[c].head)) };
    });
    const posed = {}, q = new Quaternion(), turn = new Quaternion(), tmp = new Vector3(), want = new Vector3();
    // Lids close about the axis across each eye; ears swivel about their own length.
    const forward = new Vector3().subVectors(bones.head.tail, bones.head.head).normalize();
    const axes = {};
    for (const name of order) {
      const dir = new Vector3().subVectors(bones[name].tail, bones[name].head).normalize();
      if (name.startsWith('lid')) axes[name] = new Vector3().crossVectors(dir, forward).normalize();
      if (name.startsWith('ear')) axes[name] = dir;
    }
    const qz = a => new Quaternion().setFromAxisAngle(Z, a), qy = a => new Quaternion().setFromAxisAngle(Y, a);

    api.solved = posed;
    api.pose = ({ phase = 0, moving = 0, lower = 0, s = 0, tailUp = 0, attention = 0 }) => {
      // Phase measures distance actually travelled, so the stance sweep uses the full stride and a
      // planted paw stays put as the cat brakes; only the lift and toe flex fade with moving.
      const stride = STRIDE / (root.scale.x * SCALE) * DUTY;
      const low = Math.max(0, lower) ** .75, aims = {}, turns = {};
      // Neck and head: carried a little low, down to the ground for the pickup, then level with the chest.
      // The pickup (lower near 1) bends the neck further than the carry (lower about .18) needs.
      const reach = smooth((lower - .3) / .7);
      // The chest dips and the planted forelegs bend, so the head reaches forward rather than tucking in.
      turns.chest = qz(-.2 * reach);
      turns.neck = qy(Math.sin(s * .41) * .04 * (1 - low)).multiply(qz(-.6 - .95 * low - .08 * reach));
      turns.head = qy(Math.sin(s * .29 + 1) * .06).multiply(qz(.38 + .37 * low + .12 * reach + attention * .25 + Math.sin(phase * Math.PI * 4) * .015 * moving));
      // Tail: lowered and swinging while walking in, raised in a plume after the pickup.
      const sway = Math.sin(s * .65) * .12;
      turns.tail0 = qy(sway * .6).multiply(qz((1 - tailUp) * .75));
      turns.tail1 = qy(Math.sin(s * .65 - .5) * .1).multiply(qz((1 - tailUp) * .15));
      turns.tail2 = qy(Math.sin(s * .65 - 1) * .1).multiply(qz(-(1 - tailUp) * .35));
      turns.tail3 = qy(Math.sin(s * .65 - 1.5) * .12).multiply(qz(-(1 - tailUp) * .3));
      turns.spine = qy(Math.sin(phase * Math.PI * 2) * .035 * moving);
      const bob = -Math.cos(phase * Math.PI * 4) * .004 * moving + Math.sin(s * 1.6) * .0012;
      // A quick blink every six seconds or so, and lids that settle lower and lift again, slowly.
      const blink = Math.max(0, 1 - Math.abs((s + 1.7) % 5.9 - 3) / .13);
      const lids = .62 * Math.min(1, blink + .1 + .08 * Math.sin(s * .21) - attention * .12);
      // Ears turn slowly, twitch now and then, and come forward with attention.
      const twitch = Math.max(0, 1 - Math.abs((s + 3) % 7.3 - 3.6) / .18) ** 2 * .35;
      for (const leg of legs) {
        const u = ((phase + GAIT[leg.leg]) % 1 + 1) % 1;
        let dx, lift = 0, toe = 0;
        if (u < DUTY) dx = stride * (.5 - u / DUTY);
        else { const k = (u - DUTY) / (1 - DUTY); dx = stride * (-.5 + smooth(k)); lift = Math.sin(Math.PI * k) * .028 * moving; toe = Math.sin(Math.PI * k) * .7 * moving; }
        leg.dx = dx; leg.lift = lift; leg.toe = toe;
      }
      for (const name of order) {
        const b = bones[name];
        let R, h;
        if (!b.parent) { R = new Quaternion(); h = b.head.clone().add(tmp.set(0, bob, 0)); }
        else {
          const p = posed[b.parent];
          R = p.R.clone(); h = tmp.subVectors(b.head, bones[b.parent].head).applyQuaternion(p.R).add(p.h).clone();
        }
        const leg = legs.find(l => l.chain[0] === name);
        if (leg) {
          const paw = leg.joints[3].clone().add(tmp.set(leg.dx, leg.lift, 0));
          const toe = paw.clone().add(tmp.set(Math.cos(leg.toe), -Math.sin(leg.toe), 0).multiplyScalar(leg.lengths[3]));
          const guess = [h.clone(), leg.joints[1].clone().add(tmp.set(leg.dx * .5, leg.lift * .5, 0)),
            leg.joints[2].clone().add(tmp.set(leg.dx, leg.lift, 0)), paw, toe];
          const solved = fabrik(guess, leg.lengths);
          leg.chain.forEach((c, i) => { aims[c] = solved[i + 1]; });
        }
        if (turns[name]) R.premultiply(turns[name]);
        if (axes[name]) {
          const side = name.endsWith('-1') ? -1 : 1;
          const angle = name.startsWith('lid') ? lids
            : side * (Math.sin(s * .37 + side) * .1 - attention * .2) + (side > 0 ? twitch : 0);
          R.premultiply(q.setFromAxisAngle(tmp.copy(axes[name]).applyQuaternion(R).normalize(), angle));
        }
        if (aims[name]) {
          const dir = tmp.subVectors(b.tail, b.head).applyQuaternion(R);
          R.premultiply(q.setFromUnitVectors(dir.normalize(), want.subVectors(aims[name], h).normalize()));
        }
        posed[name] = { R, h, aim: aims[name] && aims[name].clone() };
        // Local rotation: posed world rotation relative to the posed parent.
        const world = R.clone().multiply(b.rest);
        const parentWorld = b.parent ? posed[b.parent].R.clone().multiply(bones[b.parent].rest) : rigWorld.clone();
        b.node.quaternion.copy(parentWorld.invert().multiply(world));
        if (!b.parent) b.node.position.copy(b.local).add(tmp.set(0, bob, 0).applyMatrix4(new Matrix4().extractRotation(rigInverse)));
      }
    };
    return api;
  });
  api.ready.catch(() => {});   // callers that await ready still see a failure
  return api;
}
