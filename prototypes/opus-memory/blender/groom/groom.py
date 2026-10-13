"""Cycles stills of the cat in a pose, for comparison with the reference.

Blender --background --python prototypes/opus-memory/blender/groom/groom.py -- \
    [--pose approach|carry|rest] [--view walk|face|scene|carry] [--skin] [--cpu] \
    [--strands 400000] [--samples 96] [--out name]
"""
import bpy, math, sys, time
import numpy as np
from pathlib import Path
from mathutils import Vector

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import cat_model as cat

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def arg(name, default):
    return type(default)(ARGS[ARGS.index(name) + 1]) if name in ARGS else default
VIEW = arg('--view', 'walk')
POSE = arg('--pose', 'carry' if VIEW == 'carry' else 'approach')
STRANDS = arg('--strands', 400000)
SAMPLES = arg('--samples', 96)
OUT = arg('--out', f'fur-{VIEW}')
clock = time.time()
def log(*a): print(f'[{time.time() - clock:6.1f}s]', *a, flush=True)

# ---------------------------------------------------------------- materials
def principled(name, colour, roughness=.6, **inputs):
    m = bpy.data.materials.new(name); m.use_nodes = True
    p = m.node_tree.nodes['Principled BSDF']
    p.inputs['Base Color'].default_value = (*colour, 1); p.inputs['Roughness'].default_value = roughness
    for k, v in inputs.items(): p.inputs[k].default_value = v
    return m

def hair_material():
    m = bpy.data.materials.new('Black long coat'); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial'); h = nt.nodes.new('ShaderNodeBsdfHairPrincipled')
    # Strong, nearly neutral absorption: black fur whose shine is the white surface reflection.
    h.parametrization = 'ABSORPTION'
    h.inputs['Absorption Coefficient'].default_value = (4.4, 4.5, 4.75)
    for k, v in {'Roughness': .32, 'Radial Roughness': .42, 'Coat': .08, 'IOR': 1.55, 'Random Roughness': .25}.items():
        h.inputs[k].default_value = v
    nt.links.new(h.outputs[0], out.inputs['Surface'])
    return m

def iris_image():
    n = 512; y, x = np.mgrid[-1:1:n * 1j, -1:1:n * 1j]
    r = np.hypot(x, y); ang = np.arctan2(y, x)
    fibres = .85 + .15 * np.sin(ang * 61 + 3 * np.sin(ang * 7)) * np.sin(r * 23)
    base = np.stack([.7 + .04 * r, .76 + 0 * r, .5 - .08 * r], -1) * fibres[..., None]
    base *= (1 - .55 * np.clip((r - .78) / .2, 0, 1))[..., None]
    base *= (.55 + .45 * np.clip((r - .18) / .3, 0, 1))[..., None]
    base[(x / .075) ** 2 + (y / .3) ** 2 < 1] = .01
    img = bpy.data.images.new('Iris', n, n)
    img.pixels.foreach_set(np.concatenate([base, np.ones((n, n, 1))], -1).astype(np.float32).ravel())
    return img

def materials():
    eye = principled('Eye', (.5, .5, .5), .4, **{'Coat Weight': .35, 'Coat Roughness': .12})
    tex = eye.node_tree.nodes.new('ShaderNodeTexImage'); tex.image = iris_image()
    eye.node_tree.links.new(tex.outputs['Color'], eye.node_tree.nodes['Principled BSDF'].inputs['Base Color'])
    return dict(
        skin=principled('Undercoat', (.016, .014, .013), .55, **{'Sheen Weight': .6, 'Sheen Roughness': .4,
                        'Sheen Tint': (.25, .24, .23, 1)}),
        nose=principled('Nose leather', (.016, .014, .014), .82), lid=principled('Lid', (.008, .007, .007), .5),
        eye=eye, hair=hair_material(), whisker=principled('Whisker', (.5, .5, .49), .4))

# ---------------------------------------------------------------- objects
def mesh_object(name, verts, faces, mat, uv=None):
    me = bpy.data.meshes.new(name)
    if isinstance(faces, np.ndarray) and len(faces) > 5000:
        n = faces.shape[1]
        me.vertices.add(len(verts)); me.vertices.foreach_set('co', verts.astype(np.float32).ravel())
        me.loops.add(faces.size); me.loops.foreach_set('vertex_index', faces.astype(np.int32).ravel())
        me.polygons.add(len(faces)); me.polygons.foreach_set('loop_start', (np.arange(len(faces)) * n).astype(np.int32))
        me.update(calc_edges=True)
    else:
        me.from_pydata([tuple(v) for v in verts], [], [tuple(int(i) for i in f) for f in faces]); me.update()
    if uv is not None:
        layer = me.uv_layers.new(name='UVMap'); loops = np.empty(len(me.loops), np.int32)
        me.loops.foreach_get('vertex_index', loops); layer.data.foreach_set('uv', uv[loops].astype(np.float32).ravel())
    me.materials.append(mat); me.shade_smooth()
    ob = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(ob)
    return ob

def curves_object(name, S, r_root, r_tip, mat):
    n, K, _ = S.shape
    cv = bpy.data.hair_curves.new(name); cv.add_curves([K] * n)
    cv.position_data.foreach_set('vector', S.astype(np.float32).ravel())
    rad = cv.attributes.new('radius', 'FLOAT', 'POINT'); t = np.linspace(0, 1, K)
    rad.data.foreach_set('value', np.tile(r_root + (r_tip - r_root) * t ** .8, n).astype(np.float32))
    ob = bpy.data.objects.new(name, cv); bpy.context.collection.objects.link(ob); cv.materials.append(mat)
    return ob

for ob in list(bpy.data.objects): bpy.data.objects.remove(ob)
model = cat.build(STRANDS, with_coat='--skin' not in ARGS, log=log)
pose = {'approach': cat.approach, 'carry': cat.carry, 'rest': dict}[POSE]()
T = cat.pose_transforms(pose)
names = model['names']
mats = materials()
log('pose', POSE)
skin = model['skin']
mesh_object('Cat skin', cat.deform(skin['verts'], skin['rig'], names, T), skin['faces'], mats['skin'])
for part in model['parts']:
    mesh_object(part['name'], cat.deform(part['verts'], part['rig'], names, T), part['faces'], mats[part['mat']], part.get('uv'))
for c in model['curves']:
    curves_object(c['name'], cat.deform(c['points'], c['rig'], names, T), c['root'], c['tip'], mats[c['mat']])
at, head_axes = cat.head_frame(T)
log('objects')

# ---------------------------------------------------------------- stage
scene = bpy.context.scene
scene.render.engine = 'CYCLES'; scene.cycles.samples = SAMPLES; scene.cycles.use_denoising = True
prefs = bpy.context.preferences.addons['cycles'].preferences
if '--cpu' in ARGS:
    scene.cycles.device = 'CPU'; log('cpu render')
else:
    try:
        prefs.compute_device_type = 'METAL'; prefs.get_devices()
        for dev in prefs.devices: dev.use = True
        scene.cycles.device = 'GPU'
    except Exception as err:
        log('cpu render', err)
scene.view_settings.view_transform = 'AgX'; scene.view_settings.look = 'AgX - Base Contrast'
world = bpy.data.worlds.new('World'); scene.world = world; world.use_nodes = True
bg = world.node_tree.nodes['Background']

def area_light(name, location, energy, size, colour=(1, 1, 1), target=(0, 0, .2)):
    data = bpy.data.lights.new(name, 'AREA'); data.energy = energy; data.size = size; data.color = colour; data.shape = 'DISK'
    ob = bpy.data.objects.new(name, data); scene.collection.objects.link(ob); ob.location = tuple(location)
    ob.rotation_euler = (Vector(tuple(target)) - Vector(tuple(location))).to_track_quat('-Z', 'Y').to_euler()
def camera(location, target, lens=None, fov=None):
    data = bpy.data.cameras.new('Camera')
    if lens: data.lens = lens
    if fov: data.sensor_fit = 'VERTICAL'; data.angle_y = math.radians(fov)
    ob = bpy.data.objects.new('Camera', data); scene.collection.objects.link(ob); ob.location = tuple(location)
    ob.rotation_euler = (Vector(tuple(target)) - Vector(tuple(location))).to_track_quat('-Z', 'Y').to_euler(); scene.camera = ob
def studio(rim=320):
    """Dark ground with rim light behind, as the reference is lit."""
    bg.inputs[0].default_value = (.012, .012, .012, 1); bg.inputs[1].default_value = 1
    ground.data.materials.append(principled('Ground', (.014, .014, .014), 1., **{'Specular IOR Level': 0.}))
    area_light('Rim left', (-1.2, 1.1, 1.3), rim, 1.2, (1, .99, .97))
    area_light('Rim right', (.5, 1.4, .9), rim * .44, 1., (.93, .96, 1))
    area_light('Soft front', (1.2, -1.5, .7), 30, 1.5, target=(.25, 0, .2))
    eye = at(.03, 0, .004); area_light('Eye light', eye + head_axes @ np.array([.6, -.25, .12]), 6, .3, target=eye)

bpy.ops.mesh.primitive_plane_add(size=40); ground = bpy.context.object
if VIEW == 'walk':
    studio(); camera((.78, -1.3, .34), (0, 0, .25), lens=56)
    scene.render.resolution_x, scene.render.resolution_y = 900, 760
elif VIEW == 'face':
    studio(); look = at(0, 0, 0)
    camera(look + cat.unit(head_axes @ np.array([1, -.5, .3])) * .45, look, lens=60)
    scene.render.resolution_x, scene.render.resolution_y = 800, 800
elif VIEW == 'carry':
    # The reference's right panel: the cat comes towards us, head low, tail high behind.
    studio(); camera((1.05, -.6, .3), (.04, 0, .25), lens=50)
    scene.render.resolution_x, scene.render.resolution_y = 760, 900
else:
    # The Burns field at scene scale: pale haze, sun low behind the cat.
    bg.inputs[0].default_value = (.53, .50, .44, 1); bg.inputs[1].default_value = 1.
    ground.data.materials.append(principled('Field', (.23, .21, .17), .95))
    sun = bpy.data.lights.new('Sun', 'SUN'); sun.energy = 2.5; sun.color = (1, .9, .78); sun.angle = .2
    so = bpy.data.objects.new('Sun', sun); scene.collection.objects.link(so)
    so.rotation_euler = (Vector((0, 0, 0)) - Vector((-3, 6, 1.6))).to_track_quat('-Z', 'Y').to_euler()
    camera((.55, -2.62, .32), (.02, 0, .2), fov=30)
    scene.render.resolution_x, scene.render.resolution_y = 1280, 720
scene.render.filepath = str(HERE / f'{OUT}.png')
bpy.ops.wm.save_as_mainfile(filepath=str(HERE / 'groom.blend'))
log('render')
bpy.ops.render.render(write_still=True)
log('done', scene.render.filepath)
