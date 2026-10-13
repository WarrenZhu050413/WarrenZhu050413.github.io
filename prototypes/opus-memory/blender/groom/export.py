"""Browser asset: a skinned skin, fur cards baked from the groom, head details and the rig.

Blender --background --python prototypes/opus-memory/blender/groom/export.py -- [--cards 6000] [--strands 300000]

Writes assets/models/memory-cat-longhair.glb (Draco). The cards follow the groom's
locks: each is a shingle laid along the mean of its strands, shaded with the skin
normal beneath it so the coat lights as one soft volume. Cards and whiskers
carry a strand atlas whose alpha is meant for alpha-to-coverage.
"""
import bpy, json, sys
import numpy as np
from pathlib import Path
from mathutils import Matrix

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
sys.path.insert(0, str(HERE))
import cat_model as cat

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def arg(name, default):
    return type(default)(ARGS[ARGS.index(name) + 1]) if name in ARGS else default
CARDS = arg('--cards', 8000)
STRANDS = arg('--strands', 300000)
OUT = Path(arg('--out', str(ROOT / 'assets/models/memory-cat-longhair.glb')))
SKIN_FACES = arg('--skin-faces', 16000)
rng = np.random.default_rng(11)

for ob in list(bpy.data.objects): bpy.data.objects.remove(ob)
model = cat.build(STRANDS, log=print)
names = model['names']

# ---------------------------------------------------------------- textures
def strand_atlas(columns=8, size=1024, strands=170):
    """Columns of clumped strands, root at the bottom (v = 0), converging and thinning to the tip."""
    width = size // columns
    acc = np.zeros((size, size)); shade = np.zeros((size, size))
    for c in range(columns):
        centre = width * (.5 + rng.normal(0, .06))
        for _ in range(strands):
            x0 = rng.uniform(.04, .96) * width; tip = centre + rng.normal(0, .14) * width
            length = (size - 2) * rng.uniform(.45, 1.) ** .55
            ys = np.arange(0, length, .5); t = ys / length
            xs = x0 + (tip - x0) * t ** 1.25 + np.sin(t * rng.uniform(2, 5) + rng.uniform(0, 6)) * rng.uniform(0, 2.5)
            weight = .85 * (1 - .75 * t)
            xi = np.floor(xs).astype(int); fx = xs - xi; yi = ys.astype(int)
            bright = rng.uniform(.6, 1.5)
            for dx, w in ((0, 1 - fx), (1, fx)):
                cols = np.clip(c * width + xi + dx, c * width, (c + 1) * width - 1)
                np.add.at(acc, (yi, cols), w * weight * .5)
                np.add.at(shade, (yi, cols), w * weight * .5 * bright)
        # A dense undercoat near the root so cards never show daylight where they leave the skin.
        v = np.arange(size)[:, None] / size
        acc[:, c * width:(c + 1) * width] += np.clip(1 - v / .22, 0, 1) * .9
        shade[:, c * width:(c + 1) * width] += np.clip(1 - v / .22, 0, 1) * .9
    alpha = 1 - np.exp(-acc * 1.7)
    tone = shade / np.maximum(acc, 1e-6)
    rgb = np.stack([.05 * tone, .047 * tone, .045 * tone], -1)
    img = bpy.data.images.new('Coat strands', size, size, alpha=True)
    img.pixels.foreach_set(np.concatenate([rgb, alpha[..., None]], -1).astype(np.float32).ravel())
    img.pack(); img.file_format = 'PNG'
    return img

def iris_image(n=256):
    y, x = np.mgrid[-1:1:n * 1j, -1:1:n * 1j]
    r = np.hypot(x, y); ang = np.arctan2(y, x)
    fibres = .85 + .15 * np.sin(ang * 61 + 3 * np.sin(ang * 7)) * np.sin(r * 23)
    base = np.stack([.7 + .04 * r, .76 + 0 * r, .5 - .08 * r], -1) * fibres[..., None]
    base *= (1 - .55 * np.clip((r - .78) / .2, 0, 1))[..., None]
    base *= (.55 + .45 * np.clip((r - .18) / .3, 0, 1))[..., None]
    base[(x / .075) ** 2 + (y / .3) ** 2 < 1] = .01
    img = bpy.data.images.new('Iris', n, n)
    img.pixels.foreach_set(np.concatenate([base, np.ones((n, n, 1))], -1).astype(np.float32).ravel())
    img.pack(); img.file_format = 'PNG'
    return img

def material(name, colour, roughness=.7, image=None, alpha=False):
    m = bpy.data.materials.new(name); m.use_nodes = True
    p = m.node_tree.nodes['Principled BSDF']
    p.inputs['Base Color'].default_value = (*colour, 1); p.inputs['Roughness'].default_value = roughness
    if image:
        tex = m.node_tree.nodes.new('ShaderNodeTexImage'); tex.image = image
        m.node_tree.links.new(tex.outputs['Color'], p.inputs['Base Color'])
        if alpha:
            m.node_tree.links.new(tex.outputs['Alpha'], p.inputs['Alpha'])
            m.surface_render_method = 'DITHERED'
    return m

atlas = strand_atlas()
MATS = dict(skin=material('Skin', (.018, .016, .015), .8), coat=material('Coat', (1, 1, 1), .6, atlas, alpha=True),
            eye=material('Eye', (1, 1, 1), .25, iris_image()), lid=material('Lid', (.008, .007, .007), .5),
            nose=material('Nose', (.02, .017, .017), .6), whisker=material('Whisker', (.72, .72, .7), .4, atlas, alpha=True))

# ---------------------------------------------------------------- geometry
def mesh(name, verts, faces, mat, uv=None, normals=None):
    me = bpy.data.meshes.new(name)
    me.from_pydata([tuple(v) for v in verts], [], [tuple(int(i) for i in f) for f in faces]); me.update()
    if uv is not None:
        layer = me.uv_layers.new(name='UVMap'); loops = np.empty(len(me.loops), np.int32)
        me.loops.foreach_get('vertex_index', loops); layer.data.foreach_set('uv', uv[loops].astype(np.float32).ravel())
    me.materials.append(MATS[mat]); me.shade_smooth()
    if normals is not None: me.normals_split_custom_set_from_vertices([tuple(n) for n in normals])
    ob = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(ob)
    return ob

def dense_weights(P):
    """Skin weights at arbitrary points from the anatomical volumes, as in cat.build."""
    grow = [p for p in cat.PRIMS if not p.get('sub')]
    D = np.stack([cat.sd(P, p) for p in grow], 1)
    Ws = np.exp(-(D - D.min(1, keepdims=True)) / .012)
    Wb = np.zeros((len(P), len(names)))
    for k, pr in enumerate(grow): Wb[:, names.index(pr['bone'])] += Ws[:, k]
    return Wb / Wb.sum(1, keepdims=True)
def bone_weights(P): return cat.top_weights(dense_weights(P))

def skin_mesh():
    s = model['skin']
    ob = mesh('Skin', s['verts'], s['faces'], 'skin')
    # The face keeps its full resolution: collapsing edges near the sockets pushes skin through the eyes.
    face = ob.vertex_groups.new(name='face')
    near = np.linalg.norm(s['verts'] - cat.hp(.03, 0, 0), axis=1) < .07 * cat.HS / 1.36
    face.add(np.nonzero(near)[0].tolist(), 1., 'REPLACE')
    mod = ob.modifiers.new('fewer', 'DECIMATE'); mod.ratio = min(1, SKIN_FACES / len(s['faces']))
    mod.vertex_group = 'face'; mod.invert_vertex_group = True; mod.vertex_group_factor = 1.
    bpy.context.view_layer.objects.active = ob; bpy.ops.object.modifier_apply(modifier=mod.name)
    ob.vertex_groups.remove(ob.vertex_groups['face'])
    V = np.array([v.co for v in ob.data.vertices])
    return ob, bone_weights(V)

def coat_cards(coat, count, points=8):
    S, Nn, Wr = coat['points'], coat['normals'], coat['bone_weights']
    centres, group = cat.locks(S[:, 0], count)
    k = len(centres); n = np.bincount(group, minlength=k).astype(float)[:, None]
    spine = np.zeros((k,) + S.shape[1:]); np.add.at(spine, group, S); spine /= n[:, :, None]
    normal = np.zeros((k, 3)); np.add.at(normal, group, Nn); normal = cat.unit(normal)
    weights = np.zeros((k, Wr.shape[1])); np.add.at(weights, group, Wr); weights /= weights.sum(1, keepdims=True)
    t0 = cat.unit(spine[:, 1] - spine[:, 0])
    off = S[:, 0] - spine[group, 0]; off -= (off * t0[group]).sum(1, keepdims=True) * t0[group]
    width = np.clip(np.sqrt(np.bincount(group, (off ** 2).sum(1), minlength=k) / n[:, 0]) * 2.8, .005, .032)
    # Short fur (face, muzzle, fronts of the legs) is left to the velvet skin: cards there read as scales.
    mean_length = np.bincount(group, coat['length'], minlength=k) / n[:, 0]
    # Narrow fuzz cards for the shorter fur of the brow, crown and chin; none on the muzzle.
    nose = next(p for p in model['parts'] if p['name'] == 'Nose leather')['verts'].mean(0)
    keep = (mean_length > .016) | ((mean_length > .009) & (np.linalg.norm(spine[:, 0] - nose, axis=1) > .024))
    near = np.full(k, np.inf)
    for e in cat.EYES: near = np.minimum(near, (np.linalg.norm(spine - e['centre'], axis=-1).min(1) - width / 2) / (cat.EYE_R * 1.6))
    keep &= near > 1
    spine, normal, weights, width, k = spine[keep], normal[keep], weights[keep], width[keep] * np.clip(mean_length[keep] / .04, .32, 1), keep.sum()
    # The plume fans wider than the narrow tail its roots sit on.
    width = width * np.where(np.array([names[b].startswith('tail') for b in weights.argmax(1)]), 3., 1)
    # Resample each spine to fewer points along its index.
    src = np.linspace(0, S.shape[1] - 1, points); i0 = np.floor(src).astype(int).clip(0, S.shape[1] - 2); f = (src - i0)[None, :, None]
    spine = spine[:, i0] * (1 - f) + spine[:, i0 + 1] * f
    tangent = cat.unit(np.gradient(spine, axis=1))
    side = np.cross(tangent, normal[:, None])
    bad = np.linalg.norm(side, axis=-1) < 1e-3
    side[bad] = np.cross(tangent[bad], (0, 0, 1)); side = cat.unit(side)
    v = np.linspace(0, 1, points)[None, :, None]
    half = (width[:, None, None] * (1 - .62 * v ** 1.4)) / 2
    base = spine + normal[:, None] * .0012 * (1 - v)
    left, right = base - side * half, base + side * half
    verts = np.stack([left, right], 2).reshape(-1, 3)
    column = rng.integers(0, 8, k)[:, None, None]
    U = np.broadcast_to((column + np.array([.03, .97])[None, None]) / 8, (k, points, 2))
    V = np.broadcast_to(np.linspace(0, 1, points)[None, :, None], (k, points, 2))
    uv = np.stack([U, V], -1)
    plane = cat.unit(np.cross(side, tangent)); plane *= np.sign((plane * normal[:, None]).sum(-1, keepdims=True))
    shade = cat.unit(normal[:, None] * .75 + plane * .25)
    normals = np.repeat(shade, 2, axis=1).reshape(-1, 3)
    faces = []
    for c in range(k):
        o = c * points * 2
        for j in range(points - 1):
            a = o + j * 2; faces.append((a, a + 1, a + 3, a + 2))
    # Each card bends from its root's bones to the bones of the body it lies over, so a
    # lock on the neck stays on the shoulders when the head goes down.
    along = np.repeat(v[0, :, 0] ** 1.2, 2)[None, :, None]
    local = dense_weights(verts).reshape(k, points * 2, -1)
    blend = weights[:, None] * (1 - along) + local * along
    rig = cat.top_weights(blend.reshape(k * points * 2, -1))
    return verts, faces, uv.reshape(-1, 2), normals, rig

def strand_cards(points, width, bones, count):
    """Narrow cards for short fur such as the ear furnishings, each rigid to its strand's bone."""
    pick = rng.choice(len(points), min(count, len(points)), replace=False); S = points[pick]
    tangent = cat.unit(np.gradient(S, axis=1)); n = S.shape[1]
    side = cat.unit(np.cross(tangent, rng.normal(size=(len(S), 1, 3))))
    v = np.linspace(0, 1, n)[None, :, None]
    half = width * (1 - .6 * v) / 2
    verts = np.stack([S - side * half, S + side * half], 2).reshape(-1, 3)
    column = rng.integers(0, 8, len(S))[:, None, None]
    U = np.broadcast_to((column + np.array([.3, .7])[None, None]) / 8, (len(S), n, 2))
    V = np.broadcast_to(np.linspace(.25, 1, n)[None, :, None], (len(S), n, 2))
    faces = [(c * n * 2 + j * 2, c * n * 2 + j * 2 + 1, c * n * 2 + j * 2 + 3, c * n * 2 + j * 2 + 2)
             for c in range(len(S)) for j in range(n - 1)]
    rig = (np.repeat(bones[pick], n * 2)[:, None], np.ones((len(verts), 1)))
    return verts, faces, np.stack([U, V], -1).reshape(-1, 2), rig

def ribbons(points, width_root, width_tip):
    """Two crossed ribbons per strand, so whiskers stay visible from every side."""
    verts, faces, uv = [], [], []
    for S in points:
        tangent = cat.unit(np.gradient(S, axis=0)); n = len(S)
        for axis in ((0, 0, 1), (0, 1, 0)):
            side = cat.unit(np.cross(tangent, axis)); o = len(verts)
            for j, p in enumerate(S):
                t = j / (n - 1); w = (width_root + (width_tip - width_root) * t) / 2
                verts += [p - side[j] * w, p + side[j] * w]; uv += [(.0, .22 * t), (.0, .22 * t)]
            faces += [(o + j * 2, o + j * 2 + 1, o + j * 2 + 3, o + j * 2 + 2) for j in range(n - 1)]
    return np.array(verts), faces, np.array(uv)

parts = []
skin, skin_rig = skin_mesh(); parts.append((skin, skin_rig))
coat = next(c for c in model['curves'] if c['name'] == 'Long coat')
cv, cf, cu, cn, cr = coat_cards(coat, CARDS)
parts.append((mesh('Coat', cv, cf, 'coat', cu, cn), cr))
for p in model['parts']:
    parts.append((mesh(p['name'], p['verts'], p['faces'], p['mat'], p.get('uv')), p['rig']))
ears = next(c for c in model['curves'] if c['name'] == 'Ear furnishings')
ev, ef, eu, er = strand_cards(ears['points'], .0045, ears['rig'][0][:, 0], 2200)
parts.append((mesh('Ear fur', ev, ef, 'coat', eu), er))
whiskers = next(c for c in model['curves'] if c['name'] == 'Whiskers')
wv, wf, wu = ribbons(whiskers['points'], .0007, .00015)
head = names.index('head')
parts.append((mesh('Whiskers', wv, wf, 'whisker', wu), (np.full((len(wv), 1), head), np.ones((len(wv), 1)))))

# ---------------------------------------------------------------- rig
arm_data = bpy.data.armatures.new('Rig'); rig = bpy.data.objects.new('Cat', arm_data)
bpy.context.collection.objects.link(rig); bpy.context.view_layer.objects.active = rig
bpy.ops.object.mode_set(mode='EDIT')
for name, b in cat.BONES.items():
    eb = arm_data.edit_bones.new(name); eb.head = tuple(b['head']); eb.tail = tuple(b['tail']); eb.roll = 0
    if b['parent']: eb.parent = arm_data.edit_bones[b['parent']]
bpy.ops.object.mode_set(mode='OBJECT')
# The rest skeleton in Blender coordinates, for the browser's pose solver.
rig['skeleton'] = json.dumps({n: dict(parent=b['parent'], head=[round(float(x), 5) for x in b['head']],
                                      tail=[round(float(x), 5) for x in b['tail']]) for n, b in cat.BONES.items()})
for ob, (idx, w) in parts:
    groups = {}
    for b in np.unique(idx):
        vg = ob.vertex_groups.new(name=names[b]); rows, cols = np.nonzero(idx == b)
        q = np.round(w[rows, cols] * 255).astype(int)
        for level in np.unique(q):
            if level: vg.add(rows[q == level].tolist(), level / 255, 'REPLACE')
    ob.parent = rig; mod = ob.modifiers.new('rig', 'ARMATURE'); mod.object = rig
mouth = bpy.data.objects.new('Mouth', None); bpy.context.collection.objects.link(mouth)
mouth.parent = rig; mouth.parent_type = 'BONE'; mouth.parent_bone = 'head'
bpy.context.view_layer.update()
mouth.matrix_world = Matrix.Translation(tuple(cat.mouth_point(cat.pose_transforms({}))))

tris = sum(sum(len(p.vertices) - 2 for p in ob.data.polygons) for ob, _ in parts)
print('triangles', tris, 'cards', CARDS)
OUT.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.export_scene.gltf(filepath=str(OUT), export_format='GLB', export_yup=True, export_skins=True,
                          export_animations=False, export_draco_mesh_compression_enable='--plain' not in ARGS,
                          export_draco_mesh_compression_level=6, export_draco_position_quantization=14,
                          export_draco_normal_quantization=10, export_draco_texcoord_quantization=12,
                          export_image_format='AUTO', export_extras=True)
print('wrote', OUT, OUT.stat().st_size // 1024, 'KiB')
bpy.ops.wm.save_as_mainfile(filepath=str(HERE / 'export.blend'))
