"""Gatsby: a wide bay at night, the green light at the end of a far dock, a boat facing it."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

HZ = 392
GX, GY = 1062, 384  # the green light
s = Scene("gatsby", seed=21)
sky(s, HZ, colors=("#6d7571", "#757b76", "#7f837d"))
# The far shore: a low dark line with the dock running out to the light.
s.add(1, '<g id="ga-shore">')
woods(s, 1, [(300, 386, 420, 9), (1250, 384, 460, 11), (820, 389, 200, 5)], color="#49524e", base=(388, HZ + 1), seed=5)
s.add(1, f'<path d="M{GX - 120} {HZ}V388H{GX + 2}V{HZ}Z M{GX - 2} {HZ}V{GY + 2}H{GX + 2}V{HZ}Z" fill="#434c48"/>')
s.add(1, "</g>")
water(s, 1, HZ, reflect_id="ga-shore", colors=("#6f7773", "#4d5653", "#29312e"), reflect_opacity=.35)
gb = blur(s, 9)
s.add(1, f'<circle cx="{GX}" cy="{GY}" r="30" fill="{P["green"]}" opacity=".32" filter="url(#{gb})"><animate attributeName="r" values="28;33;29;31;28" dur="7s" repeatCount="indefinite"/></circle>'
         f'<circle cx="{GX}" cy="{GY}" r="3.6" fill="#cfe7c8"><animate attributeName="opacity" values=".8;1;.85;1;.8" dur="5s" repeatCount="indefinite"/></circle>')
mist(s, 1, HZ + 4, [(500, 0, 560, 8), (1250, 3, 480, 7)], opacity=.35, drift=100)

# The light's reflection, a long trembling streak coming across the water toward us.
rb = blur(s, 2.2)
segs, r = [], s.rng
for k in range(56):
    t = (k / 55) ** 1.15
    y = HZ + 5 + t * 390 + r.uniform(-3, 3)
    w = r.uniform(.5, 1.4) * (5 + t * 52)
    x = GX - t * 120 + r.uniform(-1, 1) * (2 + t * 14)
    peak = (.6 - t * .32) * r.uniform(.6, 1)
    d = r.uniform(1.6, 3.4)
    segs.append(f'<rect x="{f(x - w / 2)}" y="{f(y)}" width="{f(w)}" height="{f(1.2 + t * 3.4)}" rx="1" fill="{P["green"]}" opacity="0">'
                f'<animate attributeName="opacity" values="0;{peak:.2f};{peak * .3:.2f};{peak * .8:.2f};0" dur="{d:.2f}s" begin="{r.uniform(0, d):.2f}s" repeatCount="indefinite"/>'
                f'<animateTransform attributeName="transform" type="translate" values="{f(-2 - t * 9)} 0;{f(2 + t * 9)} 0;{f(-2 - t * 9)} 0" dur="{r.uniform(2.4, 4):.1f}s" repeatCount="indefinite"/></rect>')
s.add(2, f'<g filter="url(#{rb})">{"".join(segs)}</g>')
glints(s, 2, HZ + 30, 700, n=10, x0=200, x1=1500)

# The boat, mid-water, bow to the light, rowing and still carried back.
boat = ('<path d="M-50 0Q-44 10 0 10Q40 10 54-3Z" fill="#252d2a"/><path d="M-7 0V-14Q-7-19 0-19Q7-19 7-14V0Z" fill="#252d2a"/>'
        '<g><animateTransform attributeName="transform" type="rotate" values="-18;12;-18" dur="4.6s" repeatCount="indefinite" calcMode="spline" keySplines=".5 0 .5 1;.5 0 .5 1"/>'
        '<path d="M0-7L-44 15M0-7L46 15" stroke="#252d2a" stroke-width="2.2"/></g>')
s.add(3, f'<g><animateTransform attributeName="transform" type="translate" values="820 548;730 560;820 548" dur="70s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>'
         f'<g transform="rotate(-6)">{boat}</g><ellipse cx="0" cy="14" rx="76" ry="4.5" fill="#1f2724" opacity=".4"/>'
         f'<path d="M-60 16h-40M64 18h30" stroke="#8a948d" stroke-width="1" opacity=".3"/></g>')

# The near dock, running out from the lower left; posts and their reflections.
L0, L1 = (20, 770), (600, 562)     # left edge, near to far
R0, R1 = (420, 920), (668, 570)    # right edge
s.add(4, f'<path d="M{L0[0]} {L0[1]}L{L1[0]} {L1[1]}L{R1[0]} {R1[1]}L{R0[0]} {R0[1]}Z" fill="#29312e"/>')
s.add(4, f'<path d="M{L0[0]} {L0[1]}L{L1[0]} {L1[1]}L{L1[0]} {L1[1] + 6}L{L0[0]} {L0[1] + 18}Z" fill="#1d2421"/>')
planks = []
for k in range(16):
    t = 1 - (1 - k / 15) ** 2.2
    a = (L0[0] + (L1[0] - L0[0]) * t, L0[1] + (L1[1] - L0[1]) * t)
    b = (R0[0] + (R1[0] - R0[0]) * t, R0[1] + (R1[1] - R0[1]) * t)
    planks.append(f"M{f(a[0])} {f(a[1])}L{f(b[0])} {f(b[1])}")
s.add(4, f'<path d="{" ".join(planks)}" stroke="#36403c" stroke-width="1.1" fill="none"/>')
posts, refl = [], []
for k in range(6):
    t = 1 - (1 - k / 5) ** 1.8
    for (p0, p1, side) in ((L0, L1, 0), (R0, R1, 1)):
        x = p0[0] + (p1[0] - p0[0]) * t
        y = p0[1] + (p1[1] - p0[1]) * t
        sc = 1 - t * .8
        w, h = 14 * sc + 2, 64 * sc + 10
        posts.append(f'<rect x="{f(x - w / 2)}" y="{f(y - 2)}" width="{f(w)}" height="{f(h)}" fill="#1d2421"/>')
        refl.append(f'<rect x="{f(x - w / 2)}" y="{f(y + h - 2)}" width="{f(w)}" height="{f(h * .85)}" fill="#1d2421" opacity=".4"/>')
wb = blur(s, 2.5)
s.add(4, f'<g filter="url(#{wb})"><animateTransform attributeName="transform" type="skewX" values="0;1.5;-1.5;0" dur="5s" repeatCount="indefinite"/>{"".join(refl)}</g>' + "".join(posts))
s.write()
