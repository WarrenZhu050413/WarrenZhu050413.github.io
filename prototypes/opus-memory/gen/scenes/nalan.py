"""Nalan: the last sun through a sparse window, leaf shadows crossing it. Light only."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

FLOOR = 600  # where wall meets floor
s = Scene("nalan", seed=51)
# A dim room: wall and floor, nothing in it.
wall = vgrad(s, [(0, "#6c726d"), (1, "#7b807a")])
floor = vgrad(s, [(0, "#757a74"), (1, "#4d534e")])
s.add(0, f'<rect x="-500" y="-100" width="2600" height="{FLOOR + 100}" fill="url(#{wall})"/>')
s.add(0, f'<rect x="-500" y="{FLOOR}" width="2600" height="400" fill="url(#{floor})"/>')
s.add(0, f'<rect x="-500" y="{FLOOR - 6}" width="2600" height="12" fill="#5d635e" opacity=".35" filter="url(#{blur(s, 5)})"/>')
# The low west sun lays the window across the wall and folds it onto the floor.
pb = blur(s, 16)
light = "#a9a594"
patch_wall = "M470 330L900 236L960 {F}L540 {F}Z".format(F=FLOOR)
patch_floor = f"M540 {FLOOR}L960 {FLOOR}L1220 740L700 770Z"
lattice = (f"M700 286L736 {FLOOR}L752 {FLOOR}L716 283Z M736 {FLOOR}L752 {FLOOR}L986 754L962 756Z")
s.add(1, f'<g filter="url(#{pb})"><animateTransform attributeName="transform" type="translate" values="0 0;-60 18;0 0" dur="90s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/>'
         f'<animate attributeName="opacity" values=".95;.7;.95" dur="90s" repeatCount="indefinite"/>'
         f'<path d="{patch_wall} {patch_floor}" fill="{light}" opacity=".42"/>'
         f'<path d="{lattice}" fill="#626862" opacity=".45"/></g>')
# Leaf shadows from the tree outside, slipping down through the light.
leaf = "M0 0C6-10 18-12 26-6C18-1 8 4 0 0Z"
lb = blur(s, 2.4)
for k, (x, y0, y1, dx, dur, b) in enumerate([(600, 260, 640, 120, 14, 0), (760, 230, 600, -60, 17, 4), (680, 300, 760, 180, 19, 9),
                                              (820, 260, 620, 40, 15, 11), (560, 330, 720, 220, 21, 6)]):
    drift_down(s, 2, leaf, x, y0, y1, dx, dur, begin=b, rot=70, fill="#4e544f", opacity=.55, blur_id=lb, movable=True)
# Still leaf shadows from branches that do not fall: they only stir.
sb = blur(s, 3.2)
cl = " ".join(f"M{x} {y}c7-9 19-11 27-5c-8 5-18 9-27 5z" for x, y in [(840, 268), (858, 286), (826, 296), (872, 262), (850, 310)])
s.add(1, f'<g filter="url(#{sb})" fill="#5a605b" opacity=".6"><animateTransform attributeName="transform" type="translate" values="0 0;4 2;-2 1;0 0" dur="7s" repeatCount="indefinite"/><path d="{cl}"/></g>')
# Dust turning in the beam.
motes = "".join(f'<circle cx="{x}" cy="{y}" r="1.2" fill="#d6d2c4" opacity="0"><animate attributeName="opacity" values="0;.6;0" dur="{d}s" begin="{b}s" repeatCount="indefinite"/>'
                f'<animateTransform attributeName="transform" type="translate" values="0 0;{dx} -14" dur="{d}s" begin="{b}s" repeatCount="indefinite"/></circle>'
                for x, y, d, b, dx in [(640, 420, 7, 0, 10), (700, 470, 9, 2, -6), (780, 380, 8, 4, 8), (820, 520, 10, 1, 12), (600, 520, 6, 3, -4)])
s.add(3, motes)
# The window's own shadowed jamb at the near edge.
nb = blur(s, 20)
s.add(4, f'<rect x="-500" y="-100" width="760" height="1100" fill="#3f4642" filter="url(#{nb})" opacity=".55"/>')
s.write()
