"""Li Qingzhao: one candle at a table's edge, the books in shadow, tea gone cold. Light only."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

TABLE = 560
CX = 760  # the candle
s = Scene("li", seed=61)
bg = vgrad(s, [(0, "#4f5652"), (1, "#5a605b")])
s.add(0, f'<rect x="-500" y="-100" width="2600" height="1100" fill="url(#{bg})"/>')
# The candle's reach on the wall, slowly breathing.
glow = radial(s, [(0, "#9a917c", .55), (.5, "#7b7a6c", .2), (1, "#5a605b", 0)])
s.add(0, f'<ellipse cx="{CX}" cy="430" rx="420" ry="300" fill="url(#{glow})"><animate attributeName="rx" values="420;400;430;410;420" dur="5s" repeatCount="indefinite"/></ellipse>')
# Books in stacks: only dark masses, a little lighter where the flame reaches.
bb = blur(s, 9)
stacks = []
for x, n, w in [(440, 7, 120), (980, 9, 140), (1110, 5, 110), (330, 4, 96)]:
    y = TABLE
    for k in range(n):
        h = s.rng.uniform(9, 16)
        dx = s.rng.uniform(-8, 8)
        stacks.append(f"M{f(x + dx)} {f(y)}h{f(w + s.rng.uniform(-10, 10))}v-{f(h - 1)}h-{f(w)}z")
        y -= h
s.add(1, f'<path d="{" ".join(stacks)}" fill="#3c433f" filter="url(#{bb})"/>')
# The table top in candlelight.
tg = vgrad(s, [(0, "#6e6c62"), (1, "#3d4440")])
s.add(2, f'<path d="M-500 {TABLE - 10}H2100V900H-500Z" fill="url(#{tg})" filter="url(#{blur(s, 6)})"/>')
pool = radial(s, [(0, "#b3a989", .5), (1, "#6e6c62", 0)])
s.add(2, f'<ellipse cx="{CX}" cy="{TABLE + 40}" rx="300" ry="60" fill="url(#{pool})"><animate attributeName="opacity" values="1;.85;1;.9;1" dur="4s" repeatCount="indefinite"/></ellipse>')
# Pages with a crease, and the ring a cup left on them.
pg = blur(s, 3)
s.add(2, f'<g filter="url(#{pg})"><path d="M800 {TABLE + 30}L1010 {TABLE + 20}L1030 {TABLE + 70}L812 {TABLE + 84}Z" fill="#8e8b7e" opacity=".45"/>'
         f'<path d="M905 {TABLE + 25}L921 {TABLE + 77}" stroke="#6a695f" stroke-width="2" opacity=".5"/>'
         f'<ellipse cx="960" cy="{TABLE + 52}" rx="22" ry="7" fill="none" stroke="#6f624d" stroke-width="3" opacity=".45"/></g>')
# The candle: a pale stem and a small flame that will not keep still.
s.add(2, f'<rect x="{CX - 4}" y="{TABLE - 60}" width="8" height="64" fill="#7d7a6e" filter="url(#{blur(s, 1.5)})"/>')
fb = blur(s, 1.2)
s.add(2, f'<g filter="url(#{fb})"><path d="M{CX} {TABLE - 84}Q{CX + 6} {TABLE - 70} {CX} {TABLE - 62}Q{CX - 6} {TABLE - 70} {CX} {TABLE - 84}Z" fill="{P["lamp"]}">'
         f'<animateTransform attributeName="transform" type="skewX" values="0;4;-3;2;0" dur="2.6s" repeatCount="indefinite"/></path></g>')
# Steam from tea set down and forgotten, only a breath rising.
sb = blur(s, 4)
steam = "".join(f'<path d="M{x} {TABLE + 40}q-10-30 4-60q12-26-2-56" stroke="#a7a294" stroke-width="5" fill="none" stroke-linecap="round" opacity="0">'
                f'<animate attributeName="opacity" values="0;.35;0" dur="{d}s" begin="{b}s" repeatCount="indefinite"/>'
                f'<animateTransform attributeName="transform" type="translate" values="0 0;6 -40" dur="{d}s" begin="{b}s" repeatCount="indefinite"/></path>'
                for x, d, b in [(1040, 7, 0), (1052, 8, 3), (1030, 9, 5)])
s.add(3, f'<g filter="url(#{sb})">{steam}</g>')
# Near: the edge of the table falling away into dark.
nb = blur(s, 24)
s.add(4, f'<rect x="-500" y="{TABLE + 160}" width="2600" height="300" fill="#2c3330" filter="url(#{nb})" opacity=".8"/>')
s.write()
