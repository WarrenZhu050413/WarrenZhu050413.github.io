"""Hemingway: the Seine at evening, a bridge, roofs going into the river."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

HZ = 486  # waterline
s = Scene("hemingway", seed=41)
sky(s, HZ, colors=("#a2a8a4", "#b2b2a9", "#bbb3a8"))
r = s.rng


def roofs(x0, x1, base, hmin, hmax, step=(70, 150)):
    """A row of houses with mansard tops and chimney pots, as one mass."""
    parts, x = [], x0
    while x < x1:
        w = r.uniform(*step)
        h = r.uniform(hmin, hmax)
        m = r.uniform(4, 9)
        parts.append(f"M{f(x)} {base}V{f(base - h)}L{f(x + 5)} {f(base - h - m)}H{f(x + w - 5)}L{f(x + w)} {f(base - h)}V{base}Z")
        for _ in range(r.choice((0, 0, 1))):
            cx = x + r.uniform(8, w - 12)
            parts.append(f"M{f(cx)} {f(base - h - m + 1)}V{f(base - h - m - 7)}H{f(cx + 5)}V{f(base - h - m + 1)}Z")
        x += w
    return " ".join(parts)


s.add(1, '<g id="he-shore">')
silhouette(s, 1, roofs(-300, 1900, HZ - 18, 26, 54), fill="#959b95")
silhouette(s, 1, "M1060 430V402H1100V430Z M1064 403C1064 386 1072 378 1080 378C1088 378 1096 386 1096 403Z M1078 379V368H1082V379Z", fill="#8f9690")
silhouette(s, 1, roofs(-300, 1900, HZ - 2, 14, 34, (90, 180)), fill="#7a817b")
# The bridge: a deck with one great arch and the start of the next.
s.add(1, f'<path fill-rule="evenodd" fill="#5c6560" d="M300 {HZ}V458H1300V{HZ}Z M560 {HZ}Q560 468 800 466Q1040 468 1040 {HZ}Z M300 {HZ}Q300 474 330 474V{HZ}Z M1270 {HZ}V474Q1300 474 1300 {HZ}Z"/>')
s.add(1, f'<path d="M290 458H1310" stroke="#6c756f" stroke-width="3"/>')
s.add(1, "</g>")
lamps = [(352, 446), (520, 446), (690, 446), (910, 446), (1080, 446), (1250, 446)]
for x, y in lamps:
    s.add(1, f'<path d="M{x + 1} 457V{y + 4}" stroke="#4f5853" stroke-width="1.2"/>')
water(s, 1, HZ, reflect_id="he-shore", colors=("#9b9e96", "#6f7873", "#454e4a"))
lights(s, 1, lamps + [(430, 452), (980, 455), (1180, 452), (640, 455)], size=(3, 4))
# The lamps again in the river, drawn out long.
lb = blur(s, 1.6)
long = "".join(f'<rect x="{x}" y="{HZ + 6}" width="3" height="{60 + (k % 3) * 18}" fill="{P["lamp"]}" opacity=".22"><animate attributeName="opacity" values=".12;.3;.12" dur="{4 + k * .7:.1f}s" repeatCount="indefinite"/></rect>' for k, (x, _) in enumerate(lamps))
s.add(2, f'<g filter="url(#{lb})">{long}</g>')
mist(s, 2, HZ + 4, [(700, 0, 500, 6)], opacity=.3, drift=80)
glints(s, 3, HZ + 30, 760, n=20)
# A barge passing under the bridge, very slowly.
s.add(3, f'<g><animateTransform attributeName="transform" type="translate" values="1500 {HZ + 46};120 {HZ + 46}" dur="90s" repeatCount="indefinite"/>'
         '<path d="M-90 0L-80 10H86L96 0Z" fill="#323b37"/><rect x="40" y="-9" width="26" height="9" fill="#323b37"/></g>')
# The near quay wall.
s.add(4, '<path d="M-500 900V770L420 752L440 900Z" fill="#323b37"/><path d="M-500 770L420 752L424 744L-500 760Z" fill="#4a534e"/>')
s.add(4, '<path d="M300 746V640M292 650H308" stroke="#2c3531" stroke-width="5"/><ellipse cx="300" cy="638" rx="9" ry="6" fill="#2c3531"/>')
s.write()
