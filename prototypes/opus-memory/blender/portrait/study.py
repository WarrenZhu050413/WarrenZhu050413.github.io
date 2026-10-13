"""Static proportion and grooming study. This is not the animation asset.

Blender --background --python prototypes/opus-memory/blender/portrait/study.py
"""
import bpy, math, random
from pathlib import Path
from mathutils import Vector

HERE=Path(__file__).resolve().parent
random.seed(47)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)

def material(name, colour, roughness=.8):
    m=bpy.data.materials.new(name);m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value=(*colour,1)
    p.inputs['Roughness'].default_value=roughness
    p.inputs['Specular IOR Level'].default_value=.22
    return m

coat_mat=material('Black undercoat',(.007,.008,.009))
hair_mat=material('Soft charcoal fur',(.010,.011,.012),.76)
nose_mat=material('Velvet nose',(.012,.012,.014),.6)
black=material('Pupil and mouth',(.001,.002,.002),.35)
eye_mat=material('Quiet green grey eyes',(.19,.25,.17),.38)
glint_mat=material('Window reflection',(.65,.68,.60),.2)
parts=[]

def volume(name,p,s):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40,ring_count=28,location=p)
    ob=bpy.context.object;ob.name=name;ob.scale=s
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    parts.append(ob)
    return ob

# Seated proportions: a broad, soft head, narrow neck beneath a large ruff,
# sloping shoulders, full haunches and two close, fur-covered front paws.
volume('Sitting torso',(-.20,0,.72),(.39,.30,.62))
volume('Shoulders',(-.025,0,1.13),(.29,.265,.34))
volume('Neck',(.045,0,1.39),(.22,.22,.29))
volume('Head',(.13,0,1.72),(.255,.25,.235))
volume('Forehead',(.225,0,1.81),(.17,.205,.15))
for side in [-1,1]:
    volume('Cheek',(.225,side*.158,1.65),(.165,.115,.14))
    volume('Muzzle pad',(.350,side*.064,1.655),(.088,.088,.064))
    volume('Haunch',(-.33,side*.245,.36),(.32,.23,.36))
    volume('Foreleg',(.105,side*.173,.60),(.093,.105,.47))
    volume('Wrist',(.14,side*.175,.21),(.10,.105,.19))
    volume('Paw',(.235,side*.180,.097),(.18,.135,.092))
    for toe in range(3):
        volume('Toe',(.346,side*.18+(toe-1)*.069,.086),(.061,.047,.062))
    volume('Rear paw',(-.22,side*.34,.10),(.19,.12,.085))
volume('Chin',(.318,0,1.587),(.092,.114,.052))

# Rounded ear bases and curved tips, tilted gently outward.
for side in [-1,1]:
    rings=[((.065,side*.185,1.855),(.116,.078)),
           ((.041,side*.222,1.97),(.09,.054)),
           ((.015,side*.254,2.072),(.044,.029)),
           ((.020,side*.261,2.111),(.003,.004))]
    vs=[];fs=[]
    for p,(rx,ry) in rings:
        for j in range(16):
            a=math.tau*j/16;vs.append((p[0]+rx*math.cos(a),p[1]+ry*math.sin(a),p[2]))
    for k in range(3):
        for j in range(16):a=k*16+j;b=k*16+(j+1)%16;fs.append((a,b,b+16,a+16))
    fs.extend([tuple(reversed(range(16))),tuple(range(48,64))])
    mesh=bpy.data.meshes.new('Ear form');mesh.from_pydata(vs,[],fs);mesh.update()
    ob=bpy.data.objects.new('Relaxed ear',mesh);bpy.context.collection.objects.link(ob);parts.append(ob)

bpy.ops.object.select_all(action='DESELECT')
for ob in parts:ob.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join()
body=bpy.context.object;body.name='Seated cat sculpt'
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
mod=body.modifiers.new('Continuous anatomy','REMESH');mod.mode='VOXEL';mod.voxel_size=.019;bpy.ops.object.modifier_apply(modifier=mod.name)
mod=body.modifiers.new('Soften volumes','SMOOTH');mod.factor=.65;mod.iterations=6;bpy.ops.object.modifier_apply(modifier=mod.name)
body.data.materials.append(coat_mat)
for p in body.data.polygons:p.use_smooth=True

def strands(name,paths,width,mat):
    data=bpy.data.curves.new(name,'CURVE');data.dimensions='3D';data.resolution_u=2
    data.bevel_depth=width;data.bevel_resolution=1
    for path in paths:
        spline=data.splines.new('POLY');spline.points.add(len(path)-1)
        for j,p in enumerate(path):
            spline.points[j].co=(*p,1);spline.points[j].radius=(1-j/(len(path)-1))**.7+.015
    ob=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(ob);ob.data.materials.append(mat)
    return ob

eye_points=[]
for side in [-1,1]:
    n=Vector((.69,side*.70,.10)).normalized()
    guess=Vector((.295,side*.184,1.792))
    hit,p,normal,_=body.ray_cast(guess+n,-n)
    if hit:n=normal.normalized();centre=p+n*.006
    else:centre=guess
    horizontal=Vector((abs(n.y),-side*n.x,0)).normalized()
    vertical=Vector((0,0,1))
    eye_points.append(centre)
    vs=[centre+n*.012];fs=[];colours=[(.12,.17,.09,1)]
    for ring in range(1,5):
        r=ring/4
        for i in range(48):
            a=math.tau*i/48;u=math.cos(a)*.071*r
            z=math.sin(a)*(.039 if math.sin(a)>0 else .032)*r-u*.015
            vs.append(centre+horizontal*u+vertical*z+n*(.012*(1-r*r)))
            fibre=.80+.20*math.sin(i*17)
            colours.append((.018,.025,.014,1) if ring==4 else (.15*fibre,.20*fibre,.11*fibre,1))
    for i in range(48):fs.append((0,1+i,1+(i+1)%48))
    for ring in range(3):
        for i in range(48):
            a=1+ring*48+i;b=1+ring*48+(i+1)%48;fs.append((a,a+48,b+48,b))
    mesh=bpy.data.meshes.new('Almond eye');mesh.from_pydata(vs,[],fs);mesh.update()
    attr=mesh.color_attributes.new(name='Iris fibres',type='FLOAT_COLOR',domain='POINT')
    for i,c in enumerate(colours):attr.data[i].color=c
    colour=eye_mat.node_tree.nodes.new('ShaderNodeVertexColor');colour.layer_name='Iris fibres'
    eye_mat.node_tree.links.new(colour.outputs['Color'],eye_mat.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
    ob=bpy.data.objects.new('Resting eye',mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(eye_mat)
    def oval(name,c,rx,rz,mat):
        pts=[c+horizontal*(math.cos(math.tau*i/40)*rx)+vertical*(math.sin(math.tau*i/40)*rz) for i in range(40)]
        mesh=bpy.data.meshes.new(name);mesh.from_pydata(pts,[],[tuple(range(40))]);mesh.update()
        o=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(o);o.data.materials.append(mat)
    oval('Slit pupil',centre+n*.014,.010,.028,black)
    oval('Small reflected window',centre+n*.015-horizontal*.021+vertical*.012,.006,.008,glint_mat)
    lid=[]
    for i in range(17):
        a=math.pi*i/16;u=math.cos(a)*.074
        lid.append(centre+horizontal*u+vertical*(math.sin(a)*.041-u*.015)+n*.003)
    strands('Upper eyelid',[lid],.005,coat_mat)

# Nose is a small downward triangle, with a short philtrum and two lip curves.
mesh=bpy.data.meshes.new('Nose');mesh.from_pydata([(.443,-.043,1.683),(.443,.043,1.683),(.458,0,1.652),(.435,0,1.669)],[],[(0,1,2),(0,3,1),(0,2,3),(1,3,2)]);mesh.update()
ob=bpy.data.objects.new('Feline nose',mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(nose_mat)
strands('Mouth',[[Vector((.454,0,1.654)),Vector((.452,0,1.630))],
                [Vector((.452,0,1.63)),Vector((.438,-.036,1.622)),Vector((.414,-.064,1.633))],
                [Vector((.452,0,1.63)),Vector((.438,.036,1.622)),Vector((.414,.064,1.633))]],.0017,black)

# A single curved tail rests around the haunch and front paws.
tail_path=[Vector(p) for p in [(-.55,.17,.25),(-.66,-.02,.16),(-.60,-.37,.10),(-.34,-.57,.08),(-.02,-.57,.08),(.12,-.46,.09),(.06,-.34,.09)]]
tail_curve=bpy.data.curves.new('Resting tail','CURVE');tail_curve.dimensions='3D';tail_curve.bevel_depth=.085;tail_curve.bevel_resolution=4;tail_curve.resolution_u=16
sp=tail_curve.splines.new('BEZIER');sp.bezier_points.add(len(tail_path)-1)
for i,p in enumerate(tail_path):
    b=sp.bezier_points[i];b.co=p;b.handle_left_type='AUTO';b.handle_right_type='AUTO';b.radius=1-i/len(tail_path)*.70
tail=bpy.data.objects.new('Resting tail',tail_curve);bpy.context.collection.objects.link(tail);tail.data.materials.append(coat_mat)

# Dense tapered strands are groomed down and back in overlapping layers.
# Curves give a smooth hair silhouette instead of the old ribbon fringe.
faces=[p for p in body.data.polygons if p.area>0];weights=[p.area for p in faces]
paths=[]
for face in random.choices(faces,weights=weights,k=38000):
    a,b,c=[body.data.vertices[i].co for i in face.vertices[:3]]
    u=random.random();v=random.random()
    if u+v>1:u=1-u;v=1-v
    p=a+(b-a)*u+(c-a)*v;n=face.normal.normalized()
    if p.z<.045 or any((p-e).length<.092 for e in eye_points):continue
    face_hair=p.x>.22 and p.z>1.53
    ruff=.98<p.z<1.61
    ear=p.z>1.92
    length=random.uniform(.018,.041) if face_hair or ear else random.uniform(.16,.30) if ruff else random.uniform(.055,.115)
    flow=Vector((-.30,0,-1))
    if face_hair:flow=Vector((-.5,p.y*2,-.5))
    tangent=flow-n*flow.dot(n)
    if tangent.length<.01:tangent=Vector((1,0,0))
    tangent.normalize();cross=n.cross(tangent)
    bend=random.uniform(-.18,.18);path=[]
    for j in range(7):
        t=j/6
        path.append(p+n*(length*(.25*math.sin(t*math.pi*.75)))+tangent*(length*t)+cross*(bend*length*t*t+.06*length*math.sin(t*math.pi*1.6)))
    paths.append(path)
strands('Layered long black fur',paths,.00072,hair_mat)

tail_fur=[]
for i in range(5000):
    u=random.random()*(len(tail_path)-1);k=min(len(tail_path)-2,int(u));t=u-k
    p=tail_path[k].lerp(tail_path[k+1],t);tangent=(tail_path[k+1]-tail_path[k]).normalized()
    up=Vector((0,0,1));side=tangent.cross(up).normalized();angle=random.random()*math.tau
    n=up*math.cos(angle)+side*math.sin(angle);p+=n*.07
    length=random.uniform(.065,.13)
    tail_fur.append([p+n*(length*j/6*.45)+tangent*(length*j/6) for j in range(7)])
strands('Tail feathering',tail_fur,.00072,hair_mat)

whiskers=[]
for side in [-1,1]:
    for j in range(7):
        a=Vector((.39,side*.085,1.64));b=Vector((.43,side*.23,1.65+(j-3)*.016));c=Vector((.35-j*.011,side*(.37+j*.008),1.65+(j-3)*.030))
        whiskers.append([(1-t)**2*a+2*(1-t)*t*b+t*t*c for t in [i/12 for i in range(13)]])
strands('Fine whiskers',whiskers,.0009,material('Whisker silver',(.18,.19,.19)))

scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48
scene.cycles.use_denoising=True
scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.025,.027,.029,1);scene.world.node_tree.nodes['Background'].inputs[1].default_value=.22
floor_mat=material('Charcoal ground',(.031,.034,.035))
bpy.ops.mesh.primitive_plane_add(size=200);bpy.context.object.data.materials.append(floor_mat)
def light(name,p,energy,size):
    bpy.ops.object.light_add(type='AREA',location=p);ob=bpy.context.object;ob.name=name;ob.data.energy=energy;ob.data.shape='DISK';ob.data.size=size;ob.rotation_euler=(Vector((0,0,1))-ob.location).to_track_quat('-Z','Y').to_euler()
light('Soft high window',(3,-4,5),370,4)
light('Fur rim',(-3,2,4),620,3)
light('Quiet face fill',(4,2,2.6),120,3)
bpy.ops.object.camera_add(location=(4,-6,2.8));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,1.05))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=2.52;scene.camera=cam
scene.render.resolution_x=1000;scene.render.resolution_y=1000;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.filepath=str(HERE/'portrait.png')
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':area.spaces.active.region_3d.view_perspective='CAMERA';area.spaces.active.overlay.show_overlays=False
bpy.ops.wm.save_as_mainfile(filepath=str(HERE/'portrait.blend'))
bpy.ops.render.render(write_still=True)
