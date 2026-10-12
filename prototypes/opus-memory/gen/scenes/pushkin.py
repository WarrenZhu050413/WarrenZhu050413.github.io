"""Pushkin, copied out each day: pale sheets on a dark table under a lamp."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

TABLE = 470
CX, CY = 790, 600  # the pile
s = Scene("pushkin", seed=81)
bg = vgrad(s, [(0, "#4e5551"), (1, "#5b615c")])
s.add(0, f'<rect x="-500" y="-100" width="2600" height="1100" fill="url(#{bg})"/>')
# The lamp's cone falling from above, faint.
cb = blur(s, 30)
s.add(1, f'<path d="M700 -60L890 -60L1120 {TABLE + 260}L470 {TABLE + 260}Z" fill="#8d8a7c" opacity=".5" filter="url(#{cb})"><animate attributeName="opacity" values=".35;.3;.36;.33;.35" dur="7s" repeatCount="indefinite"/></path>')
tg = vgrad(s, [(0, "#5e615a"), (1, "#3a413d")])
s.add(1, f'<rect x="-500" y="{TABLE - 10}" width="2600" height="520" fill="url(#{tg})" filter="url(#{blur(s, 10)})"/>')
pool = radial(s, [(0, "#a9a38d", .55), (1, "#5e615a", 0)])
s.add(1, f'<ellipse cx="{CX}" cy="{CY}" rx="380" ry="110" fill="url(#{pool})"/>')


def sheet(dx, dy, rot, tone, op):
    """A sheet with the same eight lines on it, too faint to read."""
    lines = " ".join(f"M{-92 + (k % 3) * 4} {-62 + k * 16}h{150 - (k * 37 % 50)}" for k in range(8))
    return (f'<g data-memory-object="sheet" transform="translate({f(CX + dx)} {f(CY + dy)}) scale(1 .38) rotate({f(rot)})" opacity="{op}">'
            f'<rect x="-110" y="-80" width="220" height="160" fill="{tone}"/>'
            f'<path d="{lines}" stroke="#86837a" stroke-width="2.4" opacity=".3"/></g>')


r = s.rng
pile = "".join(sheet(r.uniform(-12, 12), 12 - k * 3, r.uniform(-9, 9), ("#7f7d73", "#86837a", "#8c897e")[k % 3], .75) for k in range(12))
sb = blur(s, 3)
s.add(2, f'<ellipse cx="{CX + 8}" cy="{CY + 22}" rx="130" ry="30" fill="#2f3633" opacity=".45" filter="url(#{blur(s, 8)})"/><g filter="url(#{sb})">{pile}</g>')
# Today's sheet coming down onto the others, every day the same.
day = sheet(0, 0, 6, "#949084", 1)
s.add(3, f'<g opacity="0"><animate attributeName="opacity" values="0;.7;.8;0" keyTimes="0;.25;.85;1" dur="16s" repeatCount="indefinite"/>'
         f'<animateTransform attributeName="transform" type="translate" values="40 -150;10 -30;0 -30;0 -30" keyTimes="0;.45;.6;1" dur="16s" repeatCount="indefinite" calcMode="spline" keySplines=".3 0 .4 1;.3 0 .5 1;0 0 1 1"/>'
         f'<g filter="url(#{sb})">{day}</g></g>')
motes = "".join(f'<circle cx="{x}" cy="{y}" r="1.1" fill="#d2cdbd" opacity="0"><animate attributeName="opacity" values="0;.5;0" dur="{d}s" begin="{b}s" repeatCount="indefinite"/>'
                f'<animateTransform attributeName="transform" type="translate" values="0 0;{dx} 20" dur="{d}s" begin="{b}s" repeatCount="indefinite"/></circle>'
                for x, y, d, b, dx in [(720, 300, 9, 0, 8), (840, 240, 11, 3, -6), (780, 380, 8, 5, 4), (900, 330, 10, 1, -8)])
s.add(3, motes)
nb = blur(s, 24)
s.add(4, f'<rect x="-500" y="{TABLE + 290}" width="2600" height="300" fill="#2c3330" filter="url(#{nb})" opacity=".7"/>')
s.write()
