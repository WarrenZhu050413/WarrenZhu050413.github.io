"""Burns: a November field at dusk, the turned nest, the wind going over."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

HZ = 440
VX = 820  # where the furrows meet
s = Scene("burns", seed=11)
sky(s, HZ, colors=("#a3a9a4", "#b1b1a8", "#b6aea2"))
birds(s, 0, ["M560 300C660 250 820 260 780 320C740 370 600 340 560 300Z",
             "M980 250C1060 220 1140 250 1100 290C1060 330 990 300 980 250Z",
             "M700 220C760 190 860 200 830 240C800 270 720 260 700 220Z"])
band(s, 1, 428, P["far"], amp=6, bottom=HZ + 4, seed=4)
# A hedge line and one bare tree far off, only as masses.
woods(s, 1, [(300, 436, 260, 9), (1250, 434, 300, 10), (760, 438, 180, 6)], color="#868d86", base=(436, HZ + 4))
woods(s, 1, [(1060, 426, 90, 14), (1110, 420, 46, 16), (520, 430, 70, 9)], color="#7c847d", seed=3)
mist(s, 1, HZ - 2, [(500, 0, 520, 8), (1200, 3, 420, 7)], opacity=.4, drift=90)

# The field itself, and its furrows running away to the hedge.
g = vgrad(s, [(0, "#8c8f85"), (.45, "#73776d"), (1, "#4c524b")])
s.add(2, f'<rect x="-500" y="{HZ}" width="2600" height="500" fill="url(#{g})"/>')
fur = []
for i in range(-6, 7):
    x1 = VX + i * 300
    w = 14 + abs(i) * 4
    fur.append(f"M{VX + i * 16 - 2} {HZ + 1}L{x1 - w} 920H{x1 + w}L{VX + i * 16 + 2} {HZ + 1}Z")
fb = blur(s, 5)
s.add(2, f'<path d="{" ".join(fur)}" fill="#3e443f" opacity=".16" filter="url(#{fb})"/>')
# Wind: a paler breath of light passing over the stubble, again and again.
b = blur(s, 30)
s.add(2, f'<g filter="url(#{b})" opacity=".18"><animateTransform attributeName="transform" type="translate" values="-900 0;1700 0" dur="17s" repeatCount="indefinite"/>'
         f'<ellipse cx="0" cy="560" rx="220" ry="60" fill="#d9d6cb"/><ellipse cx="-140" cy="640" rx="160" ry="40" fill="#d9d6cb"/></g>')

# Stubble, row on row, leaning with the wind.
r = s.rng
rows = []
for y in (560, 610, 660):
    t = (y - HZ) / 200
    strokes = []
    for _ in range(int(16 + t * 10)):
        x = r.uniform(250, 1350)
        h = 3 + t * 9
        strokes.append(f"M{f(x)} {f(y + r.uniform(-6, 6))}l{f(r.uniform(-1, 1.5))}-{f(h)}")
    dur = 3.5 + t * 1.5
    rows.append(f'<path d="{" ".join(strokes)}" stroke="#4a5049" stroke-width="{f(.8 + t)}" stroke-linecap="round" opacity=".3">'
                f'<animateTransform attributeName="transform" type="skewX" values="0;-6;0" dur="{dur:.1f}s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/></path>')
s.add(3, "".join(rows))

# The nest the plough turned up, and the mouse beside it.
nf = foliage_filter(s, seed=6, scale=14, sd=1.6)
s.add(3, f'<g filter="url(#{nf})" fill="#353b37"><ellipse cx="900" cy="600" rx="34" ry="14"/><ellipse cx="884" cy="594" rx="16" ry="9"/></g>')
s.add(3, '<g data-memory-object="mouse" fill="#353b37"><animateTransform attributeName="transform" type="translate" values="0 0;0 0;-14 1;-14 1;0 0" keyTimes="0;.55;.62;.9;1" dur="14s" repeatCount="indefinite"/>'
         '<ellipse cx="952" cy="606" rx="9" ry="5"/><circle cx="944" cy="602" r="3.2"/><circle cx="946" cy="598.6" r="1.6"/>'
         '<path d="M961 607Q972 610 976 604" stroke="#353b37" stroke-width="1" fill="none"/></g>')

# The near ridge of ploughed earth, with taller stalks.
bank(s, 4, "M-500 900V760C-200 744 100 770 400 752C700 736 1000 760 1300 746C1600 734 1900 760 2100 748V900Z", "#3a403b")
reeds(s, 4, [(-200, 300, 770, 18), (1300, 1800, 762, 18)], color="#343a36")
s.write()
