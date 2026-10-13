"""Author the shadow cat, rig, and portable glTF clips in Blender.
Run: Blender --background --python prototypes/opus-memory/blender/cat.py
"""
import bpy, math, random
from pathlib import Path
from mathutils import Vector, Matrix
ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'assets/models'; OUT.mkdir(exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
random.seed(24)

def material(name, colour, roughness=1):
    m=bpy.data.materials.new(name); m.diffuse_color=(*colour,1); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*colour,1);p.inputs['Roughness'].default_value=roughness;p.inputs['Specular IOR Level'].default_value=.18
    return m
fur=material('Charcoal coat',(.006,.009,.008)); rim=material('Guard hair',(.012,.018,.015)); nose=material('Nose',(.025,.030,.028)); iris=material('Muted green eyes',(.12,.16,.11)); pupil=material('Pupil',(.007,.012,.010)); glint=material('Small catchlight',(.25,.29,.23))
parts=[]
def ell(name,at,size,mat=fur,merge=True,rot=0):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,location=at)
    ob=bpy.context.object;ob.name=name;ob.scale=size;ob.rotation_euler.y=rot
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);ob.data.materials.append(mat)
    for p in ob.data.polygons:p.use_smooth=True
    if merge:parts.append(ob)
    return ob
# A continuous feline profile: long rib cage, tucked waist, elevated shoulder,
# short muzzle, cheek ruff. Limb volumes overlap before voxel union.
ell('Rib cage',(-.20,0,1.22),(.82,.24,.27));ell('Pelvis',(-.94,0,1.18),(.38,.245,.30))
ell('Withers',(.51,0,1.38),(.30,.23,.31));ell('Chest',(.64,0,1.12),(.17,.19,.25))
ell('Ruff',(.79,0,1.45),(.255,.24,.31),rot=-.25)
ell('Skull',(1.02,0,1.90),(.285,.245,.265));ell('Forehead',(1.14,0,1.98),(.205,.205,.18))
for side in [-1,1]:ell('Cheek',(1.14,side*.17,1.78),(.195,.12,.17))
for side in [-1,1]:ell('Brow',(1.16,side*.155,2.005),(.155,.125,.060),rot=.08)
ell('Muzzle',(1.29,0,1.80),(.13,.145,.09));ell('Chin',(1.27,0,1.73),(.13,.13,.065))
legs={}
for side in [-1,1]:
    z=side*.255
    for tag,x,hind in [('hind',-.97,True),('fore',.59,False)]:
        hip=Vector((x,z,1.26)); knee=Vector((x+(.23 if hind else -.06),z,.68)); ankle=Vector((x-(.07 if hind else 0),z,.17));toe=Vector((x+.12,z,.08))
        label=f'{tag}_{"L" if side<0 else "R"}';legs[label]=(hip,knee,ankle,toe,hind)
        ell(label+' upper',(hip+knee)/2,(.18 if hind else .115,.14 if hind else .095,.38),rot=-.25 if hind else .05)
        ell(label+' lower',(knee+ankle)/2,(.083,.08,.32),rot=.25 if hind else -.04)
        ell(label+' paw',toe,(.15,.105,.075))
# The pointed ears are actual thin volumes, not cones.
for side in [-1,1]:
    y=side*.18
    verts=[(.86,y-.13,2.08),(1.12,y-.10,2.09),(1.02,y+.10,2.11),(.85,y+side*.11,2.38)]
    mesh=bpy.data.meshes.new('Ear');mesh.from_pydata(verts,[],[(0,1,3),(1,2,3),(2,0,3),(0,2,1)]);mesh.update()
    ob=bpy.data.objects.new('Ear',mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(fur);parts.append(ob)
HEAD_DROP=.22
for ob in parts:
    if ob.name.startswith(('Skull','Forehead','Cheek','Brow','Muzzle','Chin','Ear')):ob.location.z-=HEAD_DROP
# Join and remesh the anatomy so lighting reads one animal rather than components.
bpy.ops.object.select_all(action='DESELECT')
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();coat=bpy.context.object;coat.name='Cat continuous coat'
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
mod=coat.modifiers.new('Sculpt union','REMESH');mod.mode='VOXEL';mod.voxel_size=.032;bpy.ops.object.modifier_apply(modifier=mod.name)
mod=coat.modifiers.new('Relax silhouette','SMOOTH');mod.factor=.65;mod.iterations=4;bpy.ops.object.modifier_apply(modifier=mod.name)
mod=coat.modifiers.new('Export surface','DECIMATE');mod.ratio=.48;bpy.ops.object.modifier_apply(modifier=mod.name)
for p in coat.data.polygons:p.use_smooth=True
# Skeleton: z-up in Blender; glTF exporter maps it to browser y-up.
arm=bpy.data.armatures.new('Cat skeleton');rig=bpy.data.objects.new('ShadowCat',arm);bpy.context.collection.objects.link(rig)
bpy.context.view_layer.objects.active=rig;rig.select_set(True);bpy.ops.object.mode_set(mode='EDIT')
rest={}
def bone(name,a,b,parent=None):
    e=arm.edit_bones.new(name);e.head=a;e.tail=b
    if parent:e.parent=arm.edit_bones[parent]
    rest[name]=(Vector(a),Vector(b));return e
bone('body',(-.9,0,1.25),(.6,0,1.36));bone('neck',(.6,0,1.36),(.93,0,1.58),'body');bone('head',(.93,0,1.58),(1.40,0,1.66),'neck')
for key,(h,k,a,t,_) in legs.items():
    bone(key+'_upper',h,k,'body');bone(key+'_lower',k,a,key+'_upper');bone(key+'_paw',a,t,key+'_lower')
tailpts=[(-1.27,0,1.32),(-1.64,.03,1.55),(-1.89,.07,1.96),(-1.83,.08,2.27),(-1.62,.08,2.36)]
for i in range(4):bone('tail'+str(i),tailpts[i],tailpts[i+1],'body' if i==0 else 'tail'+str(i-1))
bone('ear_L',(.99,-.18,1.90),(.85,-.29,2.16),'head');bone('ear_R',(.99,.18,1.90),(.85,.29,2.16),'head')
bpy.ops.object.mode_set(mode='OBJECT')
# Tail is a tapered, curved skin. Sparse guard hairs keep the shadow edge organic.
def tube(name,pts,radii):
    if len(pts)>3:
        source=list(map(Vector,pts)); radii0=radii; expanded=[]; rr=[]
        for step in range((len(source)-1)*10+1):
            u=step/10; k=min(len(source)-2,int(u)); t=u-k
            a=source[max(0,k-1)];b=source[k];c=source[k+1];d=source[min(len(source)-1,k+2)]
            expanded.append(.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t));rr.append(radii0[k]*(1-t)+radii0[k+1]*t)
        pts=expanded;radii=rr
    vs=[];fs=[];sides=12
    for i,p in enumerate(map(Vector,pts)):
        tangent=Vector(pts[min(i+1,len(pts)-1)])-Vector(pts[max(0,i-1)])
        u=tangent.normalized().cross(Vector((0,1,0))).normalized();v=tangent.normalized().cross(u)
        for j in range(sides):vs.append(p+radii[i]*(math.cos(j*math.tau/sides)*u+math.sin(j*math.tau/sides)*v))
    for i in range(len(pts)-1):
        for j in range(sides):a=i*sides+j;b=i*sides+(j+1)%sides;fs.append((a,b,b+sides,a+sides))
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(vs,[],fs);mesh.update();ob=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(fur)
    for p in mesh.polygons:p.use_smooth=True
    return ob
tail=tube('Plumed tail',tailpts,[.105,.115,.105,.075,.013])
extras=[]
eye_centres=[]
def almond_eye(side):
    # A low almond opening with a heavy upper lid; the eye sits into the head,
    # rather than a round eyeball applied to the side of the face.
    centre=Vector((1.20,side*.216,1.965-HEAD_DROP))
    outward=Vector((.35,side*.94,0));horizontal=Vector((.94,-side*.35,0))
    hit,point,normal,_=coat.ray_cast(centre+outward,-outward)
    if hit:
        outward=Vector((normal.x,normal.y,0)).normalized()
        horizontal=Vector((abs(outward.y),-side*outward.x,0)).normalized()
        centre=point+outward*.009
    eye_centres.append(centre.copy())
    centre.z+=HEAD_DROP
    vertices=[centre+outward*.010];faces=[];colours=[(.10,.145,.085,1)]
    for ring in range(1,5):
        radius=ring/4
        for i in range(48):
            a=math.tau*i/48;u=math.cos(a)*.074*radius
            z=math.sin(a)*(.030 if math.sin(a)>0 else .027)*radius-u*.10
            vertices.append(centre+horizontal*u+Vector((0,0,z))+outward*(.010*(1-radius*radius)))
            variation=.86+.14*math.sin(i*13)
            colour=(.013,.022,.012,1) if ring==4 else (.10*variation,.145*variation,.085*variation,1)
            colours.append(colour)
    for i in range(48):faces.append((0,1+i,1+(i+1)%48))
    for ring in range(3):
        for i in range(48):
            a=1+ring*48+i;b=1+ring*48+(i+1)%48;faces.append((a,a+48,b+48,b))
    mesh=bpy.data.meshes.new('Almond cornea');mesh.from_pydata(vertices,[],faces);mesh.update()
    colour_attribute=mesh.color_attributes.new(name='Iris fibres',type='FLOAT_COLOR',domain='POINT')
    for i,c in enumerate(colours):colour_attribute.data[i].color=c
    eye_material=material('Moss green iris',(.10,.145,.085),.65)
    colour_node=eye_material.node_tree.nodes.new('ShaderNodeVertexColor');colour_node.layer_name='Iris fibres'
    eye_material.node_tree.links.new(colour_node.outputs['Color'],eye_material.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
    ob=bpy.data.objects.new('Half-lidded eye',mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(eye_material);extras.append((ob,'head'))
    # The slit and glint lie inside the lid opening, close to the eye surface.
    def feature(name,points,mat):
        m=bpy.data.meshes.new(name);m.from_pydata([centre+outward*.012+horizontal*u+Vector((0,0,z)) for u,z in points],[],[tuple(range(len(points)))]);m.update()
        o=bpy.data.objects.new(name,m);bpy.context.collection.objects.link(o);o.data.materials.append(mat);extras.append((o,'head'))
    feature('Quiet vertical pupil',[(-.010,0),(0,.028),(.010,0),(0,-.025)],pupil)
    feature('Eye catchlight',[(-.026,.006),(-.022,.010),(-.018,.006),(-.022,.002)],glint)
    # Dark lid rims follow the opening, with a little weight above it.
    lid=tube('Upper eyelid',[tuple(centre+horizontal*(math.cos(i*math.pi/12)*.076)+Vector((0,0,math.sin(i*math.pi/12)*.032-math.cos(i*math.pi/12)*.0076))) for i in range(13)],[.008]*13)
    extras.append((lid,'head'))
for side in [-1,1]:
    almond_eye(side)
# Small flattened triangle: a cat nose has a plane and a lower point.
mesh=bpy.data.meshes.new('Nose plane');mesh.from_pydata([(1.409,-.044,1.829),(1.409,.044,1.829),(1.425,0,1.793),(1.395,0,1.825)],[],[(0,1,2),(0,3,1),(0,2,3),(1,3,2)]);mesh.update()
ob=bpy.data.objects.new('Cat nose',mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(nose);extras.append((ob,'head'))
# Fine whiskers, combined into one lightweight mesh, follow the head bone.
for side in [-1,1]:
    for j in range(4):
        ob=tube('Whisker',[(1.31,side*.11,1.79),(1.38,side*.30,1.78+j*.012),(1.33-j*.018,side*.49,1.74+j*.025)],[.0025,.0017,.0003]);ob.data.materials.clear();ob.data.materials.append(rim);extras.append((ob,'head'))
for ob,_ in extras:ob.location.z-=HEAD_DROP
# Fine curved ribbons flow down the coat. They are exported geometry, so the
# silhouette keeps its fur in glTF without a Blender-only particle shader.
def groom(source, count, tail_coat=False):
    vs=[];fs=[]
    faces=[p for p in source.data.polygons if p.area>0]
    weights=[p.area for p in faces]
    for face in random.choices(faces,weights=weights,k=count):
        corners=[source.data.vertices[i].co for i in face.vertices]
        a,b,c=corners[:3];u=random.random();v=random.random()
        if u+v>1:u=1-u;v=1-v
        p=a+(b-a)*u+(c-a)*v;n=face.normal.normalized()
        if not tail_coat and p.z<.32:continue
        if not tail_coat and any(abs(p.x-e.x)<.085 and abs(p.z-e.z)<.045 and abs(p.y-e.y)<.055 for e in eye_centres):continue
        ruff=p.x>.48 and p.z>1.05
        face_coat=not tail_coat and p.x>1.0 and p.z>1.40
        length=random.uniform(.022,.055) if face_coat else random.uniform(.13,.24) if ruff or tail_coat else random.uniform(.04,.10)
        flow=Vector((-.35,math.sin(p.x*11+p.z*7)*.15,-1))
        if tail_coat:
            k=min(range(len(tailpts)),key=lambda i:(p-Vector(tailpts[i])).length_squared)
            flow=Vector(tailpts[min(k+1,len(tailpts)-1)])-Vector(tailpts[max(0,k-1)])
        flow=(flow-n*flow.dot(n)).normalized()
        side=n.cross(flow).normalized()*random.uniform(.0006,.0012)
        base=len(vs)
        for j in range(4):
            t=j/3;centre=p+n*(math.sin(t*math.pi*.75)*length*.48)+flow*(length*t)
            width=side*(1-t*.94);vs.extend([centre-width,centre+width])
        for j in range(3):i=base+j*2;fs.append((i,i+1,i+3,i+2))
    mesh=bpy.data.meshes.new('Groomed fur');mesh.from_pydata(vs,[],fs);mesh.update()
    ob=bpy.data.objects.new('Tail fur' if tail_coat else 'Layered coat fur',mesh);bpy.context.collection.objects.link(ob);ob.data.materials.append(rim)
    for p in mesh.polygons:p.use_smooth=True
    return ob
tufts=groom(coat,28000);tailfur=groom(tail,6000,True)

def segmentdist(p,a,b):
    d=b-a;return (p-(a+d*max(0,min(1,(p-a).dot(d)/d.length_squared)))).length

def smooth(a,b,x):
    t=max(0,min(1,(x-a)/(b-a)));return t*t*(3-2*t)

def skin(ob,forced=None):
    bpy.context.view_layer.objects.active=ob;ob.select_set(True);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
    groups={name:ob.vertex_groups.new(name=name) for name in rest}
    for v in ob.data.vertices:
        # Each strand follows its root: different weights along a tiny hair
        # would fan it apart at the neck while the head turns.
        p=ob.data.vertices[(v.index//8)*8].co if ob in (tufts,tailfur) else v.co
        if forced:weights=[(forced,1)]
        elif ob in (tail,tailfur):
            choices=sorted((segmentdist(p,*rest[n]),n) for n in rest if n.startswith('tail'))[:2];weights=[(n,1/(d+.04)**3) for d,n in choices]
        elif p.x>.48 and p.z>1.22:
            head=smooth(.68,1.12,p.x)*smooth(1.22,1.52,p.z)
            neck=smooth(.48,.80,p.x)*smooth(1.22,1.52,p.z)*(1-head)
            ear=smooth(1.91,2.22,p.z)*.65
            weights=[('head',head*(1-ear)),('ear_L' if p.y<0 else 'ear_R',head*ear),('neck',neck),('body',1-head-neck)]
        elif p.z<1.30:
            near=min(legs,key=lambda k:abs(p.y-legs[k][0].y)+abs(p.x-legs[k][0].x)*.7)
            choices=sorted((segmentdist(p,*rest[n]),n) for n in rest if n.startswith(near))[:2];weights=[(n,1/(d+.035)**4) for d,n in choices]
            total=sum(w for _,w in weights); body=max(0,min(1,(p.z-.78)/.52)); weights=[(n,w/total*(1-body)) for n,w in weights]+[('body',body)]
        else:weights=[('body',1)]
        total=sum(w for _,w in weights)
        for name,w in weights:groups[name].add([v.index],w/total,'REPLACE')
    ob.parent=rig;mod=ob.modifiers.new('Skeleton','ARMATURE');mod.object=rig
skin(coat);skin(tail);skin(tufts);skin(tailfur)
for ob,parent in extras:skin(ob,parent)
# Mouth socket used by the browser to carry the existing mouse.
socket=bpy.data.objects.new('MouthSocket',None);bpy.context.collection.objects.link(socket);socket.parent=rig;socket.parent_type='BONE';socket.parent_bone='head';socket.location=(0,.12,0)
# Baked visual poses: walk's stance is linear backwards, swing clears ground.
rig.animation_data_create()
FPS=30;scene=bpy.context.scene;scene.render.fps=FPS
restmatrix={n:arm.bones[n].matrix_local.copy() for n in rest}
def setbone(name,a,b):
    a,b=Vector(a),Vector(b);ra,rb=rest[name];q=(rb-ra).rotation_difference(b-a)@restmatrix[name].to_quaternion();rig.pose.bones[name].matrix=Matrix.Translation(a)@q.to_matrix().to_4x4()
def pose(t,walk=0,lower=0,look=0):
    bob=.018*math.sin(t*math.tau/1.2)*walk
    for n,p in rig.pose.bones.items():p.matrix_basis.identity()
    for name in ['body','neck','head']:
        a,b=rest[name];a=a.copy();b=b.copy();a.z+=bob;b.z+=bob
        if name=='head':
            a.z-=lower*.80;b.z-=lower*.90;a.x+=lower*.20;b.x+=lower*.25
            b.y+=look*.10;b.z+=look*.055-.045
        elif name=='neck':b.z-=lower*.80;b.x+=lower*.20
        setbone(name,a,b)
    for idx,(key,(hip,knee,ankle,toe,hind)) in enumerate(legs.items()):
        phase=(t/1.2+[0,.5,.25,.75][idx])%1
        # 70% stance; root motion + this backward foot motion keeps paw planted.
        if phase<.7:dx=.34-phase/.7*.68;lift=0
        else:
            u=(phase-.7)/.3;dx=-.34+.68*(.5-.5*math.cos(u*math.pi));lift=.17*math.sin(u*math.pi)
        h=hip.copy();h.z+=bob;foot=ankle+Vector((dx*walk,0,lift*walk))
        upper=(knee-hip).length;bottom=(ankle-knee).length;axis=foot-h;d=min(axis.length,upper+bottom-.001);e=axis.normalized()
        along=(upper*upper-bottom*bottom+d*d)/(2*d);height=math.sqrt(max(0,upper*upper-along*along))
        bend=Vector((1 if hind else -1,0,0));bend=(bend-e*bend.dot(e)).normalized()
        k=h+e*along+bend*height
        setbone(key+'_upper',h,k);setbone(key+'_lower',k,foot);setbone(key+'_paw',foot,foot+(toe-ankle))
    for i in range(4):
        a,b=map(Vector,tailpts[i:i+2]);a.y+=math.sin(t*.8+i*.6)*.04;b.y+=math.sin(t*.8+(i+1)*.6)*.04;setbone('tail'+str(i),a,b)
    # Ears remain attached to the head and make a very small independent turn.
    for side in ['L','R']:rig.pose.bones['ear_'+side].rotation_mode='XYZ';rig.pose.bones['ear_'+side].rotation_euler.y=.04*math.sin(t*1.3+(side=='R'))
    bpy.context.view_layer.update()

def action(name,duration,kind):
    act=bpy.data.actions.new(name);rig.animation_data.action=act
    for f in range(round(duration*FPS)+1):
        t=f/FPS;scene.frame_set(f+1)
        if kind=='walk':pose(t,walk=1)
        elif kind=='look':pose(t,look=math.sin(min(1,t/duration)*math.pi)*1.2)
        elif kind=='lower':pose(t,lower=.5-.5*math.cos(min(1,t/duration)*math.pi))
        elif kind=='carry':pose(t,walk=1,lower=.18)
        else:pose(t)
        for p in rig.pose.bones:
            p.rotation_mode='QUATERNION';p.keyframe_insert('location',frame=f+1,group=p.name);p.keyframe_insert('rotation_quaternion',frame=f+1,group=p.name);p.keyframe_insert('scale',frame=f+1,group=p.name)
    track=rig.animation_data.nla_tracks.new();track.name=name;strip=track.strips.new(name,1,act);strip.action_frame_start=1;strip.action_frame_end=round(duration*FPS)+1;track.mute=True
    return act
for args in [('Idle',2.4,'idle'),('Look',2.4,'look'),('Walk',1.2,'walk'),('Lower',1.6,'lower'),('Carry',1.2,'carry')]:action(*args)
rig.animation_data.action=None
for tr in rig.animation_data.nla_tracks:tr.mute=False
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True)
for o in rig.children:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'memory-cat.glb'),export_format='GLB',export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=7,use_selection=True,export_animations=True,export_animation_mode='NLA_TRACKS',export_force_sampling=True,export_nla_strips=True)
# Save editable source. Render a preview independently of the export selection.
for tr in rig.animation_data.nla_tracks:tr.mute=True
rig.animation_data.action=bpy.data.actions['Look'];scene.frame_set(26)
world=scene.world or bpy.data.worlds.new('World');scene.world=world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.025,.033,.032,1);world.node_tree.nodes['Background'].inputs[1].default_value=.4
floor=material('Ground',(.065,.080,.077));bpy.ops.mesh.primitive_plane_add(size=200);bpy.context.object.data.materials.append(floor)
def area(name,loc,power,colour,size):
    bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.color=colour;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler()
area('Soft window',(2,-5,7),550,(.69,.81,.83),5);area('Silver edge',(-2,4,5),850,(.78,.85,.76),4)
bpy.ops.object.camera_add(location=(5,-8,3.1));cam=bpy.context.object;cam.rotation_euler=(Vector((-.05,0,1.25))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=4.8;scene.camera=cam
scene.render.engine='CYCLES';scene.cycles.samples=24;scene.render.resolution_x=1000;scene.render.resolution_y=650;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.filepath='/tmp/memory-cat-blender.png'
scene.frame_end=73
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':
            area.spaces.active.region_3d.view_distance=6
            area.spaces.active.region_3d.view_perspective='CAMERA'
            area.spaces.active.overlay.show_overlays=False
            area.spaces.active.region_3d.view_location=Vector((0,0,1.1))
            area.spaces.active.shading.type='MATERIAL'
bpy.ops.wm.save_as_mainfile(filepath=str(Path(__file__).parent/'shadow-cat.blend'));bpy.ops.render.render(write_still=True)
print('CAT_EXPORT',OUT/'memory-cat.glb')
