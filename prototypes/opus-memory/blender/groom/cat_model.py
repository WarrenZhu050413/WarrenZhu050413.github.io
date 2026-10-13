"""The long-haired black cat: anatomy, skeleton, coat and posing.

Everything is built once in a neutral rest pose. Each anatomical volume belongs
to a bone and carries its own coat (length, flow, lift, droop). Skin weights
come from the same volumes, and every strand follows the bones of its root, so
a posed still deforms exactly as the browser rig will.

Metres, cat facing +X, its right side towards -Y, ground at z = 0.
"""
import math
import numpy as np
from mathutils import Matrix
from mathutils.kdtree import KDTree

rng = np.random.default_rng(7)

def unit(v):
    v = np.asarray(v, float)
    return v / np.maximum(np.linalg.norm(v, axis=-1, keepdims=True), 1e-12)

def rotation(yaw=0., pitch=0., roll=0.):
    """Columns are the local forward, left and up axes. Pitch > 0 lowers the nose."""
    return np.array(Matrix.Rotation(yaw, 3, 'Z') @ Matrix.Rotation(pitch, 3, 'Y') @ Matrix.Rotation(roll, 3, 'X'))

def rotation_between(a, b):
    a, b = unit(a), unit(b); v = np.cross(a, b); c = a @ b
    if c < -.9999:
        axis = unit(np.cross(a, (1, 0, 0) if abs(a[0]) < .9 else (0, 1, 0)))
        return 2 * np.outer(axis, axis) - np.eye(3)
    vx = np.array([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]])
    return np.eye(3) + vx + vx @ vx / (1 + c)

# ---------------------------------------------------------------- anatomy
PRIMS, BONES = [], {}
OWNER = None
def coat(**fur):
    base = dict(length=.05, flow=(-1, 0, -.5), radial=0., along=0., lift=.3, droop=.3, loft=.2,
                clump=.45, density=1., under=None, behind=None, above=None, mat='skin')
    base.update(fur)
    return base
def cone(name, a, b, ra, rb, k=.02, **fur):
    PRIMS.append(dict(name=name, kind='cone', bone=OWNER, a=np.array(a, float), b=np.array(b, float), ra=ra, rb=rb, k=k,
                      fur=coat(**fur)))
def ell(name, c, r, k=.02, rot=None, sub=False, **fur):
    PRIMS.append(dict(name=name, kind='ell', bone=OWNER, c=np.array(c, float), r=np.array(r, float),
                      rot=np.eye(3) if rot is None else rot, k=k, sub=sub, fur=coat(**fur)))
def bone(name, parent, head, tail):
    BONES[name] = dict(parent=parent, head=np.array(head, float), tail=np.array(tail, float))

# Head frame at rest: carried forward, the nose a little down.
HEAD = np.array([.30, 0, .385])
HR = rotation(pitch=.15)
HS = 1.36
def hp(x, y, z): return HEAD + HR @ np.array([x, y, z], float) * HS
def hv(x, y, z): return HR @ np.array([x, y, z], float)
NECK_END = hp(-.03, 0, -.005)

# Skeleton. Legs are top (shoulder or hip), mid (elbow or stifle), low (wrist or hock), paw.
LEGS = {
    'fore_r': [(.152, -.05, .277), (.128, -.057, .174), (.148, -.057, .046), (.166, -.057, .017)],
    'fore_l': [(.152, .05, .277), (.128, .057, .174), (.148, .057, .046), (.166, .057, .017)],
    'hind_r': [(-.19, -.053, .295), (-.105, -.063, .18), (-.24, -.059, .078), (-.222, -.057, .017)],
    'hind_l': [(-.19, .053, .295), (-.105, .063, .18), (-.24, .059, .078), (-.222, .057, .017)],
}
TOE = np.array([.035, 0, 0])
TAIL = [(-.255, 0, .339), (-.3, 0, .387), (-.322, .004, .455), (-.31, .01, .525), (-.268, .014, .583), (-.205, .018, .609)]
TAIL_R = [.021, .016, .0125, .01, .008, .0055]

bone('root', None, (0, 0, 0), (0, 0, .05))
bone('pelvis', 'root', (-.26, 0, .3), (-.12, 0, .3))
bone('spine', 'pelvis', (-.12, 0, .3), (.03, 0, .302))
bone('chest', 'spine', (.03, 0, .302), (.16, 0, .31))
bone('neck', 'chest', (.16, 0, .31), NECK_END)
bone('head', 'neck', NECK_END, hp(.07, 0, 0))
for i in range(len(TAIL) - 1):
    bone(f'tail{i}', 'pelvis' if i == 0 else f'tail{i - 1}', TAIL[i], TAIL[i + 1])
for leg, (top, mid, low, paw) in LEGS.items():
    bone(f'{leg}.upper', 'chest' if leg.startswith('fore') else 'pelvis', top, mid)
    bone(f'{leg}.lower', f'{leg}.upper', mid, low)
    bone(f'{leg}.foot', f'{leg}.lower', low, paw)
    bone(f'{leg}.toe', f'{leg}.foot', paw, np.array(paw) + TOE)

# Trunk: a deep chest, the tuck of the loin, a round rump.
OWNER = 'chest'
ell('ribcage', (.065, 0, .28), (.13, .078, .095), k=.03, length=.07, flow=(-1, 0, -.6), lift=.24, droop=.55,
    under=dict(length=.058, droop=1.0, lift=.36))
ell('prosternum', (.172, 0, .244), (.052, .054, .066), k=.03, length=.085, flow=(.15, 0, -1), radial=.9, lift=.55, droop=.5,
    loft=.3, above=dict(radial=0, lift=.3, flow=(-1, 0, -.3)))
for s in (-1, 1):
    ell(f'scapula{s}', (.13, s * .05, .32), (.066, .034, .056), k=.025, rot=rotation(pitch=-.5),
        length=.056, flow=(-1, s * .2, -.6), lift=.26, droop=.3)
OWNER = 'spine'
ell('loin', (-.075, 0, .287), (.12, .072, .078), k=.035, length=.072, flow=(-1, 0, -.7), lift=.24, droop=.6,
    under=dict(length=.06, droop=1.1, lift=.34))
OWNER = 'pelvis'
ell('rump', (-.18, 0, .297), (.094, .076, .082), k=.03, length=.076, flow=(-1, 0, -.85), lift=.26, droop=.6)
OWNER = 'neck'
cone('neck', (.15, 0, .322), NECK_END, .052, .042, k=.03, length=.105, flow=(-.25, 0, -.55), radial=1.,
     lift=.55, droop=.25, loft=.35, above=dict(radial=.1, lift=.2, flow=(-1, 0, -.2), length=.052))

# Head: broad skull, full cheeks, a modest muzzle. Eyes sit in shallow sockets.
OWNER = 'head'
HEAD_PRIMS = len(PRIMS)
ell('cranium', hp(-.002, 0, .006), (.045, .04, .037), k=.012, length=.019, flow=hv(-1, 0, -.15), lift=.2, droop=.05)
for s in (-1, 1):
    ell(f'cheek{s}', hp(.008, s * .031, -.016), (.031, .021, .024), k=.014, length=.024,
        flow=hv(-.7, s * 1.05, -.55), lift=.45, droop=.15, loft=.28, behind=dict(length=.068, lift=.55))
    ell(f'pad{s}', hp(.053, s * .0102, -.0215), (.0122, .0103, .0098), k=.008, length=.005, flow=hv(.3, s * 1, -.4),
        lift=.15, droop=0, density=1.6)
    ell(f'brow{s}', hp(.03, s * .021, .013), (.012, .013, .0045), k=.008, length=.005, flow=hv(-.6, s * .7, .1), lift=.1, droop=0)
ell('muzzle', hp(.046, 0, -.0185), (.018, .017, .0125), k=.01, length=.006, flow=hv(.2, 0, -1), lift=.15, droop=0, density=1.6)
ell('chin', hp(.04, 0, -.034), (.014, .012, .008), k=.008, length=.01, flow=hv(-.2, 0, -1), lift=.25, droop=.1)
cone('bridge', hp(.016, 0, .022), hp(.064, 0, -.004), .0135, .008, k=.01, length=.005, flow=hv(-1, 0, .5), lift=.1, droop=0,
     density=1.6)
EYE_R = .0105 * HS
EYES = [dict(side=s, gaze=unit(hv(1, s * .2, .02))) for s in (-1, 1)]
for e in EYES:
    e['centre'] = hp(.033, e['side'] * .0225, .004) - e['gaze'] * EYE_R * .3
    e['up'] = -unit(np.cross(np.cross(e['gaze'], (0, 0, 1)), e['gaze']))
    e['across'] = np.cross(e['up'], e['gaze'])
    ell(f'socket{e["side"]}', e['centre'], (EYE_R * 1.1,) * 3, k=.004, sub=True)
for pr in PRIMS[HEAD_PRIMS:]:
    if pr['kind'] == 'ell' and not pr['name'].startswith('socket'): pr['r'] = pr['r'] * HS
    if pr['kind'] == 'cone': pr['ra'] *= HS; pr['rb'] *= HS

# Legs: thick, furred columns and large paws with four toes under tufts.
for leg, (top, mid, low, paw) in LEGS.items():
    s = 1 if leg.endswith('l') else -1
    if leg.startswith('fore'):
        OWNER = f'{leg}.upper'
        cone(f'{leg}.arm', top, mid, .04, .031, k=.022, length=.05, flow=(-.2, 0, -1), radial=.4, lift=.4, droop=.4,
             behind=dict(length=.06, droop=.7))
        OWNER = f'{leg}.lower'
        cone(f'{leg}.forearm', mid, low, .028, .021, k=.014, length=.022, flow=(0, 0, -1), lift=.22, droop=.2,
             behind=dict(length=.048, lift=.35, droop=.4))
    else:
        OWNER = f'{leg}.upper'
        ell(f'{leg}.thigh', (np.array(top) + mid) / 2 + (-.012, 0, -.006), (.068, .036, .062), k=.03,
            rot=rotation(pitch=-.9), length=.08, flow=(-.6, s * .15, -1), lift=.34, droop=.5,
            behind=dict(length=.11, droop=.9, lift=.45))
        OWNER = f'{leg}.lower'
        cone(f'{leg}.shin', mid, low, .029, .018, k=.016, length=.04, flow=(-.4, 0, -1), lift=.3, droop=.4,
             behind=dict(length=.06, droop=.6))
        OWNER = f'{leg}.foot'
        cone(f'{leg}.hock', low, np.array(paw) + (.004, 0, .006), .018, .017, k=.012, length=.02, flow=(0, 0, -1),
             lift=.15, droop=.2, behind=dict(length=.03, lift=.4))
    OWNER = f'{leg}.toe'
    p = np.array(paw)
    ell(f'{leg}.paw', p + (.006, 0, .001), (.035, .027, .018), k=.012, length=.01, flow=(1, 0, -.4), lift=.2, droop=.1,
        density=1.4)
    for t in range(4):
        a = (t - 1.5) * .42
        ell(f'{leg}.toe{t}', p + (.029 + .007 * math.cos(a * 1.4), math.sin(a) * .023, -.005 + .003 * math.cos(a)),
            (.012, .0098, .0095), k=.005, length=.012, flow=(1, math.sin(a) * .5, -.2), lift=.3, droop=0, density=1.4)

# The tail rises from the rump and curls forward, a plume held high.
for i in range(len(TAIL) - 1):
    OWNER = f'tail{i}'
    cone(f'tail{i}', TAIL[i], TAIL[i + 1], TAIL_R[i], TAIL_R[i + 1], k=.012, length=.075 + .022 * i, radial=.75, along=1.7,
         flow=(-.2, 0, 0), lift=.3, droop=.78, loft=.3, clump=.6, density=1.5)

# Expression. The lids decide how sleepy the cat looks.
UPPER_LID, LOWER_LID = .11, -.3   # height of each lid's edge straight ahead: higher = more open
CORNER, CORNER_ANGLE, TILT = -.1, 1.0, -.02
def lid_edge(edge, a, s):
    """The lids meet at the corners, so the opening is an almond."""
    f = np.clip(a / CORNER_ANGLE, -1, 1)
    shape = .62 if edge > CORNER else .8     # a heavy upper lid, gently curved into the corners
    return CORNER + (edge - CORNER) * np.cos(f * np.pi / 2) ** shape + TILT * f * s

# ---------------------------------------------------------------- signed distances
def sd_round_cone(P, a, b, r1, r2):
    ba = b - a; l2 = ba @ ba; rr = r1 - r2; a2 = l2 - rr * rr; il2 = 1 / l2
    pa = P - a; y = pa @ ba; z = y - l2
    x2 = ((pa * l2 - y[:, None] * ba) ** 2).sum(1); y2 = y * y * l2; z2 = z * z * l2
    k = np.sign(rr) * rr * rr * x2
    return np.where(np.sign(z) * a2 * z2 > k, np.sqrt(x2 + z2) * il2 - r2,
           np.where(np.sign(y) * a2 * y2 < k, np.sqrt(x2 + y2) * il2 - r1,
                    (np.sqrt(np.maximum(x2 * a2 * il2, 0)) + y * rr) * il2 - r1))

def sd(P, pr):
    if pr['kind'] == 'cone':
        return sd_round_cone(P, pr['a'], pr['b'], pr['ra'], pr['rb'])
    q = (P - pr['c']) @ pr['rot']; r = pr['r']
    k0 = np.linalg.norm(q / r, axis=1); k1 = np.linalg.norm(q / (r * r), axis=1)
    return k0 * (k0 - 1) / np.maximum(k1, 1e-9)

def bounds(pr):
    m = pr['k'] + .004
    if pr['kind'] == 'cone':
        r = max(pr['ra'], pr['rb']) + m
        return np.minimum(pr['a'], pr['b']) - r, np.maximum(pr['a'], pr['b']) + r
    r = pr['r'].max() + m
    return pr['c'] - r, pr['c'] + r

def smin(a, b, k):
    h = np.maximum(k - np.abs(a - b), 0) / k
    return np.minimum(a, b) - h * h * k * .25

GRID_LO, GRID_HI, H = np.array([-.42, -.16, -.02]), np.array([.42, .16, .66]), .002
def build_field():
    shape = np.ceil((GRID_HI - GRID_LO) / H).astype(int) + 1
    F = np.full(shape, .05, np.float32)
    for pr in PRIMS:
        lo, hi = bounds(pr)
        i0 = np.clip(np.floor((lo - GRID_LO) / H).astype(int), 0, shape - 1)
        i1 = np.clip(np.ceil((hi - GRID_LO) / H).astype(int) + 1, 0, shape)
        axes = [GRID_LO[a] + H * np.arange(i0[a], i1[a]) for a in range(3)]
        X, Y, Z = np.meshgrid(*axes, indexing='ij')
        d = sd(np.stack([X.ravel(), Y.ravel(), Z.ravel()], 1), pr).reshape(X.shape).astype(np.float32)
        block = F[i0[0]:i1[0], i0[1]:i1[1], i0[2]:i1[2]]
        block[...] = -smin(-block, d, pr['k']) if pr.get('sub') else smin(block, d, pr['k'])
    ground = int(round((0 - GRID_LO[2]) / H))
    F[:, :, :ground] = np.maximum(F[:, :, :ground], .001)
    return F

def surface_nets(F):
    cells = np.array(F.shape) - 1
    acc = np.zeros((*cells, 3), np.float64); cnt = np.zeros(cells, np.int32)
    edges = []
    for axis in range(3):
        a0 = [slice(None)] * 3; a1 = [slice(None)] * 3
        a0[axis] = slice(0, -1); a1[axis] = slice(1, None)
        f0, f1 = F[tuple(a0)], F[tuple(a1)]
        idx = np.nonzero((f0 < 0) != (f1 < 0))
        v0, v1 = f0[idx], f1[idx]
        pos = np.stack(idx, 1).astype(np.float64); pos[:, axis] += v0 / (v0 - v1)
        o1, o2 = (axis + 1) % 3, (axis + 2) % 3
        for d1 in (0, 1):
            for d2 in (0, 1):
                c = [i.copy() for i in idx]; c[o1] -= d1; c[o2] -= d2
                ok = (c[o1] >= 0) & (c[o1] < cells[o1]) & (c[o2] >= 0) & (c[o2] < cells[o2]) & (c[axis] < cells[axis])
                cc = tuple(i[ok] for i in c)
                np.add.at(acc, cc, pos[ok]); np.add.at(cnt, cc, 1)
        edges.append((axis, idx, v0 < 0))
    has = cnt > 0
    vid = np.full(cells, -1, np.int64); vid[has] = np.arange(has.sum())
    verts = GRID_LO + H * (acc[has] / cnt[has][:, None])
    quads = []
    for axis, idx, inside in edges:
        o1, o2 = (axis + 1) % 3, (axis + 2) % 3
        ok = (idx[o1] >= 1) & (idx[o2] >= 1) & (idx[o1] < cells[o1]) & (idx[o2] < cells[o2]) & (idx[axis] < cells[axis])
        base = [i[ok] for i in idx]; flip = inside[ok]
        corners = []
        for d1, d2 in ((1, 1), (0, 1), (0, 0), (1, 0)):
            c = [b.copy() for b in base]; c[o1] -= d1; c[o2] -= d2
            corners.append(vid[tuple(c)])
        q = np.stack(corners, 1)
        q[~flip] = q[~flip][:, ::-1]
        quads.append(q)
    quads = np.concatenate(quads)
    return verts, quads[(quads >= 0).all(1)]

def relax(verts, quads, iterations=4, factor=.5):
    """Laplacian smoothing over the quad mesh's edges."""
    e = np.concatenate([quads[:, [0, 1]], quads[:, [1, 2]], quads[:, [2, 3]], quads[:, [3, 0]]])
    deg = np.bincount(e[:, 0], minlength=len(verts)).astype(float)
    for _ in range(iterations):
        acc = np.zeros_like(verts); np.add.at(acc, e[:, 0], verts[e[:, 1]])
        verts = verts + factor * (acc / np.maximum(deg, 1)[:, None] - verts) * (deg > 0)[:, None]
    return verts

def vertex_normals(verts, quads):
    n = np.zeros_like(verts)
    fn = np.cross(verts[quads[:, 2]] - verts[quads[:, 0]], verts[quads[:, 3]] - verts[quads[:, 1]])
    for i in range(4): np.add.at(n, quads[:, i], fn)
    return unit(n)

def trilinear(G, P):
    q = (P - GRID_LO) / H; i = np.clip(np.floor(q).astype(int), 0, np.array(G.shape) - 2); f = q - i
    out = 0
    for dx in (0, 1):
        for dy in (0, 1):
            for dz in (0, 1):
                w = (f[:, 0] if dx else 1 - f[:, 0]) * (f[:, 1] if dy else 1 - f[:, 1]) * (f[:, 2] if dz else 1 - f[:, 2])
                out = out + w * G[i[:, 0] + dx, i[:, 1] + dy, i[:, 2] + dz]
    return out

def field_gradient(F, P, e=.0015):
    g = np.stack([trilinear(F, P + d) - trilinear(F, P - d) for d in np.eye(3) * e], 1)
    return unit(g)

def surface_point(F, start, direction, reach=.08):
    """The first point on the skin from `start` along `direction`."""
    ts = np.arange(0, reach, .0004); P = start + ts[:, None] * direction
    inside = np.nonzero(trilinear(F, P) < 0)[0]
    return P[inside[0]] if len(inside) else start

# ---------------------------------------------------------------- head details (rest pose)
def eye_geometry(e):
    """Eyeball sphere with planar iris UVs, and two lid shells whose edges meet at the corners."""
    g, up, side = e['gaze'], e['up'], e['across']
    rings, segs = 32, 48; vs, fs, uvs = [], [], []
    for i in range(rings + 1):
        th = math.pi * i / rings
        for j in range(segs):
            ph = 2 * math.pi * j / segs
            d = g * math.cos(th) + (side * math.cos(ph) + up * math.sin(ph)) * math.sin(th)
            vs.append(e['centre'] + EYE_R * d)
            uvs.append((.5 + d @ side * .56, .5 + d @ up * .56))
    for i in range(rings):
        for j in range(segs):
            a, b = i * segs + j, i * segs + (j + 1) % segs
            fs.append((a, b, b + segs, a + segs))
    eye = dict(verts=np.array(vs), faces=np.array(fs), uv=np.array(uvs))
    lids = []
    for which, edge in (('upper', UPPER_LID), ('lower', LOWER_LID)):
        vs, fs = [], []
        rows, cols = 10, 40
        for i in range(rows + 1):
            for j in range(cols + 1):
                a = -math.pi * .55 + math.pi * 1.1 * j / cols
                rim = float(lid_edge(edge, a, e['side']))
                el = rim + (1 - rim) * (i / rows) ** 1.3 if which == 'upper' else rim - (1 + rim) * (i / rows) ** 1.3
                el = max(-1, min(1, el)); c = math.sqrt(1 - el * el)
                bulge = 1.065 + .01 * math.cos(a)
                vs.append(e['centre'] + EYE_R * bulge * (g * c * math.cos(a) + side * c * math.sin(a) + up * el))
        # A thin dark rim at the lid's edge; the rest of the shell is covered skin.
        for part, band in (('lid', range(0, 2)), ('cover', range(2, rows))):
            fs = [(i * (cols + 1) + j, i * (cols + 1) + j + 1, (i + 1) * (cols + 1) + j + 1, (i + 1) * (cols + 1) + j)
                  for i in band for j in range(cols)]
            used = np.unique(np.array(fs)); remap = np.full(len(vs), -1); remap[used] = np.arange(len(used))
            faces = remap[np.array(fs)]; V = np.array(vs)[used]
            # Face away from the eye's centre, for one-sided skin shading; the two shells wind oppositely.
            n = np.cross(V[faces[:, 2]] - V[faces[:, 0]], V[faces[:, 3]] - V[faces[:, 1]])
            inward = (n * (V[faces].mean(1) - e['centre'])).sum(1) < 0
            faces[inward] = faces[inward][:, ::-1]
            lids.append(dict(name=which, part=part, verts=np.array(vs)[used], faces=faces))
    return eye, lids

def nose_geometry(F):
    """A domed, rounded triangle on the nose tip, wider at the top."""
    n = unit(hv(1, 0, -.3)); across = unit(hv(0, 1, 0)); down = unit(np.cross(n, across))
    centre = surface_point(F, hp(.06, 0, -.005) + n * .05, -n) + n * .0004
    w, h = .0064 * HS / 1.36, .0046 * HS / 1.36
    outline = []
    for i in range(48):
        a = 2 * math.pi * i / 48
        x, y = math.cos(a), math.sin(a)
        y = y * (1 + .35 * max(0, y)) - .25 * max(0, y) * abs(x) ** .5
        outline.append((x * w * (1 - .35 * max(0, -y)), y * h))
    vs = [centre + n * .0011]; fs = []
    for ring in (1, 2, 3):
        f = ring / 3
        for x, y in outline:
            vs.append(centre + across * x * f + down * -y * f + n * .0011 * (1 - f * f))
    for i in range(48): fs.append((0, 1 + i, 1 + (i + 1) % 48))
    for ring in range(2):
        for i in range(48):
            a, b = 1 + ring * 48 + i, 1 + ring * 48 + (i + 1) % 48
            fs.append((a, a + 48, b + 48, b))
    return dict(verts=np.array(vs), faces=fs, centre=centre)

def ear_geometry(side):
    """A rolled shell open to the front, rounded at the tip, tilted outwards. Solidified by the caller."""
    base = hp(-.006, side * .034, .031); vs, fs = [], []
    up = unit(hv(-.18, side * .72, 1)); fwd = unit(hv(1, side * .4, 0)); out = unit(np.cross(up, fwd)) * side
    rows, cols, height = 14, 22, .054 * HS / 1.2
    for i in range(rows + 1):
        t = i / rows; width = .028 * HS / 1.2 * (1 - t) ** .8 * (1 + .25 * t) + .0012
        depth = .013 * (1 - t) ** 1.1 + .001
        for j in range(cols + 1):
            a = -math.pi * .5 + math.pi * j / cols
            vs.append(base + up * height * t + out * side * width * math.sin(a) - fwd * depth * math.cos(a) + fwd * .006 * t * t)
    for i in range(rows):
        for j in range(cols):
            q = i * (cols + 1) + j; fs.append((q, q + 1, q + cols + 2, q + cols + 1))
    return dict(verts=np.array(vs), faces=np.array(fs), base=base, up=up, fwd=fwd, height=height)

# Lids and ears get their own bones for blinks and ear turns.
for s in (-1, 1):
    e = next(e for e in EYES if e['side'] == s)
    bone(f'lid{s}', 'head', e['centre'], e['centre'] + e['up'] * EYE_R)
    ear = ear_geometry(s)
    bone(f'ear{s}', 'head', ear['base'], ear['base'] + ear['up'] * ear['height'])

def solidify(verts, faces, thickness):
    """Offset shell plus rim, so a one-sided sheet becomes a thin solid (normals by averaging)."""
    n = vertex_normals(verts, faces)
    inner = verts - n * thickness; k = len(verts)
    fs = [faces, faces[:, ::-1] + k]
    edges = {}
    for f in faces:
        for i in range(4):
            a, b = f[i], f[(i + 1) % 4]; key = (min(a, b), max(a, b)); edges[key] = edges.get(key, 0) + 1
    rim = [(a, b) for (a, b), c in edges.items() if c == 1]
    fs.append(np.array([(a, b, b + k, a + k) for a, b in rim]))
    return np.concatenate([verts, inner]), np.concatenate(fs), np.concatenate([n, -n])

# ---------------------------------------------------------------- coat
def coat_fields(grow, P, Nn, Wt):
    """Blend each volume's coat at the roots, with longer fur under the belly and behind the legs."""
    n = len(P); L = np.zeros(n); lift = np.zeros(n); droop = np.zeros(n); loft = np.zeros(n); clump = np.zeros(n)
    flow = np.zeros((n, 3))
    for k, pr in enumerate(grow):
        w = Wt[:, k]; sel = w > 1e-3
        if not sel.any(): continue
        f = pr['fur']; Ls = np.full(sel.sum(), f['length']); li = np.full(sel.sum(), f['lift']); dr = np.full(sel.sum(), f['droop'])
        nn = Nn[sel]
        d = np.broadcast_to(np.array(f['flow'], float), (sel.sum(), 3)).copy(); rad = np.full(sel.sum(), f['radial'])
        for key, test in (('under', -nn[:, 2]), ('behind', -nn[:, 0]), ('above', nn[:, 2])):
            if f[key]:
                m = np.clip((test - .25) / .45, 0, 1); o = f[key]
                Ls = Ls + m * (o.get('length', f['length']) - f['length'])
                li = li + m * (o.get('lift', f['lift']) - f['lift'])
                dr = dr + m * (o.get('droop', f['droop']) - f['droop'])
                rad = rad + m * (o.get('radial', f['radial']) - f['radial'])
                d = d + m[:, None] * (np.array(o.get('flow', f['flow']), float) - np.array(f['flow'], float))
        if f['radial'] or f['along']:
            if pr['kind'] == 'cone':
                ax = unit(pr['b'] - pr['a']); rel = P[sel] - pr['a']
                radial = unit(rel - (rel @ ax)[:, None] * ax)
            else:
                ax = np.zeros(3); radial = unit(P[sel] - pr['c'])
            d = d + rad[:, None] * radial + f['along'] * ax
        L[sel] += w[sel] * Ls; lift[sel] += w[sel] * li; droop[sel] += w[sel] * dr
        loft[sel] += w[sel] * f['loft']; clump[sel] += w[sel] * f['clump']; flow[sel] += w[sel, None] * d
    return L, unit(flow + 1e-6), lift, droop, loft, clump

def grow_strands(F, P, Nn, L, flow, lift, droop, loft, K, wob):
    n = len(P)
    t_flow = unit(flow - (flow * Nn).sum(1, keepdims=True) * Nn + 1e-6)
    d = unit(lift[:, None] * Nn + (1 - lift[:, None]) * t_flow)
    S = np.zeros((n, K, 3)); S[:, 0] = P - Nn * .0004
    for j in range(1, K):
        t = j / (K - 1)
        d = unit(d + .22 * t_flow + droop[:, None] * .35 * t * np.array([0, 0, -1]) + wob * .05)
        S[:, j] = S[:, j - 1] + d * (L / (K - 1))[:, None]
        dist = trilinear(F, S[:, j]); need = .0012 + loft * L * t
        push = np.clip(need - dist, 0, None); hit = push > 0
        if hit.any():
            S[hit, j] += field_gradient(F, S[hit, j]) * push[hit, None]
            d[hit] = unit(S[hit, j] - S[hit, j - 1])
    return S

def locks(roots, groups):
    """Each strand belongs to the lock whose centre root is nearest."""
    centres = rng.choice(len(roots), groups, replace=False)
    tree = KDTree(groups)
    for i, c in enumerate(centres): tree.insert(roots[c], i)
    tree.balance()
    return centres, np.array([tree.find(r)[1] for r in roots])

def clump_and_frizz(S, owner, clump, L):
    n, K, _ = S.shape
    t = np.linspace(0, 1, K)[None, :, None]
    amount = np.clip(clump * rng.uniform(.8, 1.25, n), 0, .95)[:, None, None] * t ** 1.1
    guide = S[owner] - S[owner][:, :1] + S[:, :1]
    S = S + amount * (S[owner] - S) * .8 + amount * (guide - S) * .2
    S += rng.normal(size=S.shape) * (t ** 2) * .0008 * np.clip(L / .045, .15, 1)[:, None, None]
    return S

def top_weights(Wb, k=4):
    """The k largest bone weights per row, renormalised."""
    idx = np.argsort(-Wb, axis=1)[:, :k]
    w = np.take_along_axis(Wb, idx, 1); w /= np.maximum(w.sum(1, keepdims=True), 1e-9)
    return idx, w

# ---------------------------------------------------------------- build
def build(strands=300000, with_coat=True, log=print):
    names = list(BONES); index = {b: i for i, b in enumerate(names)}
    log('field')
    F = build_field()
    verts, quads = surface_nets(F)
    verts = relax(verts, quads)
    normals = vertex_normals(verts, quads)
    grow = [p for p in PRIMS if not p.get('sub')]
    D = np.stack([sd(verts, p) for p in grow], 1)
    W = np.exp(-(D - D.min(1, keepdims=True)) / .006); W /= W.sum(1, keepdims=True)
    # Skin weights: the same volumes, blended more softly so joints bend smoothly.
    Ws = np.exp(-(D - D.min(1, keepdims=True)) / .012)
    Wb = np.zeros((len(verts), len(names)))
    for k, pr in enumerate(grow): Wb[:, index[pr['bone']]] += Ws[:, k]
    Wb /= Wb.sum(1, keepdims=True)
    skin_idx, skin_w = top_weights(Wb)
    log('skin', len(verts), 'verts')
    m = dict(names=names, F=F, skin=dict(verts=verts, faces=quads, rig=(skin_idx, skin_w)))
    parts, curves = [], []
    m['parts'], m['curves'] = parts, curves
    head = index['head']
    rigid = lambda n, b=head: (np.full((n, 1), b), np.ones((n, 1)))

    for e in EYES:
        eye, lids = eye_geometry(e)
        parts.append(dict(name='Eye', mat='eye', uv=eye['uv'], verts=eye['verts'], faces=eye['faces'], rig=rigid(len(eye['verts']))))
        for lid in lids:
            b = index[f'lid{e["side"]}'] if lid['name'] == 'upper' else head
            name, mat = (f'{lid["name"]} lid', 'lid') if lid['part'] == 'lid' else (f'{lid["name"].title()} cover', 'skin')
            parts.append(dict(name=name, mat=mat, verts=lid['verts'], faces=lid['faces'], rig=rigid(len(lid['verts']), b)))
    nose = nose_geometry(F)
    parts.append(dict(name='Nose leather', mat='nose', verts=nose['verts'], faces=nose['faces'], rig=rigid(len(nose['verts']))))
    ears = []
    for s in (-1, 1):
        ear = ear_geometry(s)
        v, f, n = solidify(ear['verts'], ear['faces'], .0016)
        ear.update(solid=v, normals=n)
        parts.append(dict(name=f'Ear {s}', mat='skin', verts=v, faces=f, rig=rigid(len(v), index[f'ear{s}'])))
        ears.append(ear)
    if not with_coat: return m

    log('roots')
    tri = np.concatenate([quads[:, [0, 1, 2]], quads[:, [0, 2, 3]]])
    A, B, C = verts[tri[:, 0]], verts[tri[:, 1]], verts[tri[:, 2]]
    area = np.linalg.norm(np.cross(B - A, C - A), axis=1) / 2
    dominant = D.argmin(1)
    dens = np.array([grow[d]['fur']['density'] for d in dominant])[tri].mean(1)
    pick = rng.choice(len(tri), strands, p=area * dens / (area * dens).sum())
    u, v = rng.random(strands), rng.random(strands); flip = u + v > 1; u[flip], v[flip] = 1 - u[flip], 1 - v[flip]
    bary = np.stack([1 - u - v, u, v], 1)[..., None]
    P = (verts[tri[pick]] * bary).sum(1); Nn = unit((normals[tri[pick]] * bary).sum(1))
    Wt = (W[tri[pick]] * bary).sum(1); Wr = (Wb[tri[pick]] * bary).sum(1)
    keep = np.ones(len(P), bool)
    for e in EYES:
        q = P - e['centre']; r = np.linalg.norm(q, axis=1); up = (q @ e['up']) / np.maximum(r, 1e-9)
        a = np.arctan2(q @ e['across'], q @ e['gaze'])
        opening = (r < EYE_R * 1.45) & (np.abs(a) < CORNER_ANGLE) & (up < lid_edge(UPPER_LID, a, e['side']) + .015) & \
                  (up > lid_edge(LOWER_LID, a, e['side']) - .015)
        keep &= ~opening & (r > EYE_R * 1.08)
    keep &= np.linalg.norm(P - nose['centre'], axis=1) > .0085 * HS / 1.36
    P, Nn, Wt, Wr = P[keep], Nn[keep], Wt[keep], Wr[keep]
    L, flow, lift, droop, loft, clump = coat_fields(grow, P, Nn, Wt)
    # Hair beside the eyes lies back along the lids, so fur meets the lid edge without a bare ring;
    # fur parts around the nose leather.
    for e in EYES:
        away = P - e['centre']; dist = np.linalg.norm(away, axis=1); mm = np.clip((EYE_R * 2.1 - dist) / .008, 0, 1)[:, None]
        away = away - (away @ e['gaze'])[:, None] * e['gaze']
        flow = unit(flow * (1 - mm) + unit(unit(away) * .35 - e['gaze'] * .65) * mm)
        L = L * (1 - .45 * mm[:, 0])
    away = P - nose['centre']; mm = np.clip((.017 - np.linalg.norm(away, axis=1)) / .01, 0, 1)
    flow = unit(flow * (1 - mm[:, None]) + unit(away) * mm[:, None]); L = L * (1 - .55 * mm)
    # Locks vary as wholes: length, direction and loft. This layers the coat.
    centres, group = locks(P, len(P) // 16)
    g = len(centres)
    L *= rng.uniform(.78, 1.22, g)[group] * rng.uniform(.92, 1.06, len(L))
    calm = np.clip(L / .045, .25, 1)[:, None]
    flow = unit(flow + rng.normal(size=(g, 3))[group] * .14 * calm)
    lift = np.clip(lift + rng.normal(0, .06, g)[group], .05, .9)
    fly = rng.random(len(L)) < .03; L[fly] *= 1.3
    wob = (rng.normal(size=(g, 3))[group] * .4 + rng.normal(size=(len(P), 3)) * .16) * calm
    log('grow', len(P))
    S = grow_strands(F, P, Nn, L, flow, lift, droop, loft, 10, wob)
    S = clump_and_frizz(S, centres[group], clump * (~fly), L)
    curves.append(dict(name='Long coat', mat='hair', points=S, root=.00011, tip=.000018, rig=top_weights(Wr),
                            lock=group, length=L, normals=Nn, bone_weights=Wr))

    # Ear furnishings inside, a short coat on the backs.
    fur, fur_bone = [], []
    for ear, s in zip(ears, (-1, 1)):
        # Roots anywhere on the shell's faces, not on its vertex rows, which read as a comb edge-on.
        q = ear['faces']; ev = ear['solid'][:len(ear['verts'])]; en = ear['normals'][:len(ear['verts'])]
        a, b, c, d = (ev[q[:, i]] for i in range(4))
        area = np.linalg.norm(np.cross(c - a, d - b), axis=1)
        for side, count in ((1, 7000), (-1, 9000)):
            pick = rng.choice(len(q), count, p=area / area.sum()); u, v = rng.random(count)[:, None], rng.random(count)[:, None]
            root = (a[pick] * (1 - u) + b[pick] * u) * (1 - v) + (d[pick] * (1 - u) + c[pick] * u) * v
            nrm = unit((en[q[pick, 0]] + en[q[pick, 2]]) / 2)
            nrm = nrm * np.sign(nrm @ ear['fwd'])[:, None] * side      # front (inner) or back face
            root = root + nrm * .0009
            height = np.clip((root - ear['base']) @ ear['up'] / ear['height'], 0, 1)
            for i in range(count):
                if side > 0:
                    if height[i] > .8: continue
                    ln = rng.uniform(.012, .024) * (1 - height[i] * .5)
                    dirn = unit(ear['up'] * .65 + ear['fwd'] * .55 + nrm[i] * .3 + rng.normal(size=3) * .2)
                    fur.append([root[i] + dirn * ln * k / 5 + np.array([0, 0, -.002]) * (k / 5) ** 2 for k in range(6)])
                    fur_bone.append(index[f'ear{s}'])
                else:
                    dirn = unit(ear['up'] * .8 + nrm[i] * .45 + rng.normal(size=3) * .15); ln = rng.uniform(.005, .01)
                    fur.append([root[i] + dirn * ln * k / 5 for k in range(6)])
                    fur_bone.append(index[f'ear{s}'])
    curves.append(dict(name='Ear furnishings', mat='hair', points=np.array(fur), root=.00006, tip=.00001,
                       rig=(np.array(fur_bone)[:, None], np.ones((len(fur), 1)))))
    # Whiskers: long, pale, fanning forward and drooping.
    wh = []
    for s in (-1, 1):
        for j in range(7):
            root = hp(.056, s * (.011 + .003 * (j % 3)), -.017 - .0032 * j)
            out = unit(hv(.5, s * 1, .2 - .08 * j)); ln = rng.uniform(.055, .078)
            wh.append([root + out * ln * k / 9 + np.array([0, 0, -1]) * .012 * (k / 9) ** 2 + hv(1, 0, 0) * .006 * (k / 9)
                       for k in range(10)])
        for j in range(3):
            root = EYES[(s + 1) // 2]['centre'] + hv(.003, s * .004, .013)
            wh.append([root + unit(hv(.3, s * .6, 1)) * .03 * k / 9 for k in range(10)])
    curves.append(dict(name='Whiskers', mat='whisker', points=np.array(wh), root=.00014, tip=.00003, rig=rigid(len(wh))))
    log('coat', len(P), 'strands')
    return m

# ---------------------------------------------------------------- posing
def fabrik(joints, lengths, iterations=24):
    """Keeps the bone lengths, pins the first and last joints, stays near the given shape."""
    P = np.array(joints, float); root, target = P[0].copy(), P[-1].copy()
    for _ in range(iterations):
        P[-1] = target
        for i in range(len(P) - 2, -1, -1): P[i] = P[i + 1] + unit(P[i] - P[i + 1]) * lengths[i]
        P[0] = root
        for i in range(1, len(P)): P[i] = P[i - 1] + unit(P[i] - P[i - 1]) * lengths[i - 1]
    return P

def solve(pose):
    """World-space bone transforms (R, rest head, posed head) for a pose.

    pose: 'move' (offset of the whole cat), 'turn' {bone: world rotation applied on top of its parent},
    'aim' {bone: world target for its tail}, 'legs' {leg: [mid, low, paw]} with the toe laid forward.
    """
    out = {}; aims = dict(pose.get('aim', {}))
    for name, b in BONES.items():
        if b['parent'] is None:
            R = np.eye(3); h = b['head'] + np.asarray(pose.get('move', (0, 0, 0)), float)
        else:
            Rp, hr, hpp = out[b['parent']]
            R = Rp.copy(); h = Rp @ (b['head'] - hr) + hpp
        leg = name.split('.')[0]
        if name.endswith('.upper') and leg in pose.get('legs', {}):
            chain = [f'{leg}.upper', f'{leg}.lower', f'{leg}.foot', f'{leg}.toe']
            lengths = [np.linalg.norm(BONES[c]['tail'] - BONES[c]['head']) for c in chain]
            mid, low, paw = [np.asarray(p, float) for p in pose['legs'][leg]]
            heading = unit(np.asarray(pose.get('heading', (1, 0, 0)), float))
            joints = fabrik([h, mid, low, paw, paw + heading * lengths[3]], lengths)
            for c, target in zip(chain, joints[1:]): aims[c] = target
        if name in pose.get('turn', {}):
            R = pose['turn'][name] @ R
        if name in aims:
            R = rotation_between(R @ (b['tail'] - b['head']), aims[name] - h) @ R
        out[name] = (R, b['head'], h)
    return out

def deform(P, rig, names, transforms):
    """Linear blend skinning of points (any leading shape) with per-row bone indices and weights."""
    idx, w = rig
    shape = P.shape; flat = P.reshape(len(idx), -1, 3)
    out = np.zeros_like(flat)
    mats = [transforms[n] for n in names]
    R = np.stack([t[0] for t in mats]); hr = np.stack([t[1] for t in mats]); hp_ = np.stack([t[2] for t in mats])
    for k in range(idx.shape[1]):
        b = idx[:, k]
        moved = np.einsum('nij,nkj->nki', R[b], flat - hr[b][:, None]) + hp_[b][:, None]
        out += w[:, k, None, None] * moved
    return out.reshape(shape)

def head_frame(transforms):
    """The posed head: a function mapping head-local (x, y, z) like hp(), and the posed rotation."""
    R, hr, h = transforms['head']
    return (lambda x, y, z: R @ (hp(x, y, z) - hr) + h), R @ HR

# Poses from the reference. The approach: head lowered towards the mouse and turned a
# little towards the viewer, the near foreleg reaching.
def approach():
    head_rot = rotation(yaw=-.3, pitch=.5) @ HR.T
    return dict(turn={'neck': rotation_between(NECK_END - BONES['neck']['head'], (.107, 0, -.03))}, aim={},
                head=head_rot, legs={
        'fore_r': [(.136, -.057, .174), (.198, -.057, .047), (.216, -.057, .017)],
        'fore_l': [(.112, .057, .171), (.1, .057, .045), (.116, .057, .017)],
        'hind_r': [(-.114, -.063, .184), (-.272, -.059, .080), (-.256, -.057, .017)],
        'hind_l': [(-.096, .063, .178), (-.212, .059, .075), (-.173, .057, .017)]})

def carry():
    """Head low and level with the chest, the mouse held across the mouth, tail high."""
    return dict(turn={'neck': rotation_between(NECK_END - BONES['neck']['head'], (.085, -.012, -.07))},
                head=rotation(yaw=-.2, pitch=.38) @ HR.T, legs={
        'fore_r': [(.13, -.057, .174), (.172, -.057, .046), (.19, -.057, .017)],
        'fore_l': [(.124, .057, .174), (.135, .057, .046), (.153, .057, .017)],
        'hind_r': [(-.108, -.063, .18), (-.25, -.059, .078), (-.232, -.057, .017)],
        'hind_l': [(-.1, .063, .18), (-.226, .059, .078), (-.208, .057, .017)]})

def pose_transforms(pose):
    """Solve a pose whose head orientation is given as a world rotation relative to rest."""
    if 'head' in pose:
        first = solve(pose)
        Rn = first['neck'][0]
        pose = dict(pose, turn=dict(pose.get('turn', {}), head=pose['head'] @ Rn.T))
    return solve(pose)

def mouth_point(transforms):
    """Where a carried mouse's scruff sits: just behind the front teeth."""
    at, _ = head_frame(transforms)
    return at(.043, 0, -.03)
