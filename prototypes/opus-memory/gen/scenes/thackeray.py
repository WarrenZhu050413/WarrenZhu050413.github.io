"""Thackeray: a raised embankment curving away across the world; beyond it, nothing."""
import math
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

s = Scene("thackeray", seed=31)
# The crest runs from far off at the left to near at the right, bowing slightly.
C0, C1, C2 = (-160, 452), (700, 418), (1760, 286)       # crest, quadratic
F0, F1, F2 = (-160, 474), (760, 520), (1760, 760)       # foot of the near slope


def q(p0, p1, p2, t):
    return ((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
            (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1])


CREST = f"M{C0[0]} {C0[1]}Q{C1[0]} {C1[1]} {C2[0]} {C2[1]}"
# Arc-length table so smoke can be left exactly where the engine passed.
pts = [q(C0, C1, C2, i / 400) for i in range(401)]
cum = [0.0]
for a, b in zip(pts, pts[1:]):
    cum.append(cum[-1] + math.dist(a, b))
L = cum[-1]


def at(u):
    target = u * L
    i = next(k for k, c in enumerate(cum) if c >= target)
    return pts[i], pts[min(i + 1, 400)]


def scale_at(x):
    return .3 + 1.25 * max(0, (x + 160)) / 1920  # nearer to the right


# Beyond the crest: sky and pale mist, nothing at all.
sky(s, 560, colors=("#9aa19d", "#aaada6", "#b3afa6"))
mist(s, 1, 420, [(300, 0, 700, 26), (1100, -30, 640, 34), (600, 30, 800, 20)], opacity=.7, drift=120)

# The near side: the old world going, a field edge and two hedgerow trees at near-left.
fg = vgrad(s, [(0, "#7c837d"), (1, "#545c57")])
fb = blur(s, 14)
s.add(1, f'<path d="M-500 470C0 476 400 500 760 520C1200 540 1700 560 2200 560V1100H-500Z" fill="url(#{fg})" filter="url(#{fb})"/>')
s.add(1, f'<path d="M-200 640C150 636 420 650 720 690" stroke="#4f5752" stroke-width="5" fill="none" opacity=".5" filter="url(#{blur(s, 3)})"/>')
woods(s, 3, [(380, 610, 96, 70), (430, 556, 70, 58), (330, 580, 60, 50), (640, 660, 58, 44), (668, 628, 40, 34)], color="#58605b", seed=12)
s.add(3, f'<path d="M392 720V640M650 730V670" stroke="#4f5752" stroke-width="9" filter="url(#{blur(s, 2)})"/>')
# The old world dissolving: the trees are only half there.
tb = blur(s, 5)
s.layers[3] = [f'<g opacity=".55" filter="url(#{tb})">' + "".join(s.layers[3]) + "</g>"]

# The bank: the drama. Its near slope darkens toward the foot.
bk = vgrad(s, [(0, "#626b65"), (.2, "#4a534e"), (1, "#2f3834")])
bank_d = (f"M{C0[0]} {C0[1]}Q{C1[0]} {C1[1]} {C2[0]} {C2[1]}L{C2[0] + 400} {C2[1] + 10}V1000H{F2[0]}"
          f"L{F2[0]} {F2[1]}Q{F1[0]} {F1[1]} {F0[0]} {F0[1]}Z")
s.add(2, f'<path d="{bank_d}" fill="url(#{bk})"/>')
s.add(2, f'<path d="{CREST}" stroke="#8b928c" stroke-width="1.2" fill="none" transform="translate(0 -1.5)"/>')
# Grass on the slope, catching the wind in passes.
r = s.rng
grass = []
for _ in range(140):
    t = r.uniform(.15, 1)
    top, foot = q(C0, C1, C2, t), q(F0, F1, F2, t)
    k = r.uniform(.15, .95)
    x, y = top[0] + (foot[0] - top[0]) * k, top[1] + (foot[1] - top[1]) * k
    h = 3 + scale_at(x) * 9
    grass.append(f"M{f(x)} {f(y)}l{f(r.uniform(-1.5, 1.5))}-{f(h)}")
s.add(2, f'<path d="{" ".join(grass)}" stroke="#6b746e" stroke-width="1" opacity=".45" stroke-linecap="round">'
         '<animateTransform attributeName="transform" type="skewX" values="0;-4;0;-1.5;0" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1;.4 0 .6 1;.4 0 .6 1"/></path>')

# Telegraph poles along the crest, receding to the left; wires sag between them.
poles, wires, prev = [], [], None
for u in [.12, .27, .4, .51, .61, .7, .78, .85, .91, .96]:
    (x, y), _ = at(u)
    sc = scale_at(x)
    h, arm = 26 + sc * 120, 4 + sc * 16
    poles.append(f"M{f(x)} {f(y)}V{f(y - h)}M{f(x - arm)} {f(y - h + 6 * sc)}H{f(x + arm)}")
    if prev:
        px, py, ph, psc = prev
        for dy in (6,):
            wires.append(f"M{f(px)} {f(py - ph + dy * psc)}Q{f((px + x) / 2)} {f((py - ph + y - h) / 2 + 6 + sc * 10)} {f(x)} {f(y - h + dy * sc)}")
    prev = (x, y, h, sc)
s.add(2, f'<path d="{" ".join(poles)}" stroke="#3f4843" stroke-width="2" fill="none"/>'
         f'<path d="{" ".join(wires)}" stroke="#4d5651" stroke-width=".7" fill="none"/>')

# One small figure on the crest, looking over to where the other side was.
(fx, fy), _ = at(.46)
s.add(2, f'<g transform="translate({f(fx)} {f(fy - 1.5)})" fill="#2f3834"><ellipse cx="0" cy="-15.5" rx="2" ry="2.3"/>'
         '<path d="M-2.6-13H2.6L2.2-5H1.4L1.2 0H-1.2L-1.4-5H-2.2Z"/></g>')

# The train crosses every 34 seconds; its smoke stays behind and thins.
DUR = 34
sb = blur(s, 9)
puffs = []
for k in range(26):
    u = .04 + k * .036
    (x, y), _ = at(u)
    sc = scale_at(x)
    a, b = u, min(u + .5, .999)
    puffs.append(f'<ellipse cx="{f(x)}" cy="{f(y - 22 * sc)}" rx="{f(14 * sc + 6)}" ry="{f(7 * sc + 3)}" fill="#d3d0c6" opacity="0">'
                 f'<animate attributeName="opacity" values="0;0;.5;0;0" keyTimes="0;{a:.3f};{a + .01:.3f};{b:.3f};1" dur="{DUR}s" repeatCount="indefinite"/>'
                 f'<animate attributeName="cy" values="{f(y - 22 * sc)};{f(y - 22 * sc)};{f(y - 22 * sc)};{f(y - 60 * sc - 20)};{f(y - 60 * sc - 20)}" keyTimes="0;{a:.3f};{a + .01:.3f};{b:.3f};1" dur="{DUR}s" repeatCount="indefinite"/>'
                 f'<animate attributeName="rx" values="{f(14 * sc + 6)};{f(14 * sc + 6)};{f(14 * sc + 6)};{f(44 * sc + 20)};{f(44 * sc + 20)}" keyTimes="0;{a:.3f};{a + .01:.3f};{b:.3f};1" dur="{DUR}s" repeatCount="indefinite"/></ellipse>')
s.add(2, f'<g filter="url(#{sb})">{"".join(puffs)}</g>')
train = ('<path d="M0 0V-12H18V-19H23V-12H30Q35-12 35-5V0Z" fill="#283130"/>'
         + "".join(f'<rect x="{-50 - k * 54}" y="-13" width="48" height="13" fill="#283130"/>' for k in range(4)))
s.add(2, f'<g><animateMotion path="{CREST}" dur="{DUR}s" repeatCount="indefinite" rotate="auto"/>'
         f'<g><animateTransform attributeName="transform" type="scale" values=".32;1.55" dur="{DUR}s" repeatCount="indefinite"/>'
         f'<g transform="translate(0 -1)">{train}</g></g></g>')
s.write()
