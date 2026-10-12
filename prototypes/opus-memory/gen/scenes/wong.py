"""Wong Kar-wai: a lamp and a passing shadow, seen through rain on dusty glass. Light only."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from shadowkit import *

GROUND = 600
LX = 900  # the lamp
s = Scene("wong", seed=71)
bg = vgrad(s, [(0, "#4c5450"), (.7, "#59605b"), (1, "#4a514d")])
s.add(0, f'<rect x="-500" y="-100" width="2600" height="1100" fill="url(#{bg})"/>')
# Walls of the lane, as darker masses.
wb = blur(s, 40)
s.add(1, f'<g filter="url(#{wb})" fill="#3e4642"><path d="M-500 -100H560V{GROUND}H-500Z"/><path d="M1180 -100H2100V{GROUND}H1180Z"/></g>')
# The lamp's light, smeared by the glass, and smeared again on the wet ground.
lg = radial(s, [(0, "#d6c49b", .6), (.3, "#a59b80", .3), (1, "#59605b", 0)])
s.add(1, f'<ellipse cx="{LX}" cy="330" rx="200" ry="170" fill="url(#{lg})"><animate attributeName="opacity" values="1;.9;1" dur="6s" repeatCount="indefinite"/></ellipse>')
gb = blur(s, 8)
s.add(1, f'<rect x="{LX - 14}" y="{GROUND - 10}" width="28" height="200" fill="#a59b80" opacity=".35" filter="url(#{gb})"/>')
s.add(1, f'<rect x="-500" y="{GROUND}" width="2600" height="400" fill="#454d49" opacity=".5" filter="url(#{blur(s, 18)})"/>')
# Someone passing under the lamp and out of it, again and again.
fb = blur(s, 7)
s.add(2, f'<g filter="url(#{fb})" opacity=".8"><animateTransform attributeName="transform" type="translate" values="520 0;520 0;1250 0;1250 0" keyTimes="0;.15;.85;1" dur="26s" repeatCount="indefinite"/>'
         f'<animate attributeName="opacity" values="0;.8;.8;0" keyTimes="0;.18;.8;1" dur="26s" repeatCount="indefinite"/>'
         f'<ellipse cx="0" cy="{GROUND - 150}" rx="15" ry="18" fill="#2f3633"/><path d="M-26 {GROUND - 130}Q0 {GROUND - 142} 26 {GROUND - 130}L20 {GROUND}H-20Z" fill="#2f3633"/></g>')
# Rain beyond the glass.
rain = "".join(f'<path d="M{x} -40l-6 60" stroke="#b9b8ad" stroke-width=".9" opacity=".3" stroke-dasharray="40 220">'
               f'<animate attributeName="stroke-dashoffset" values="0;-260" dur="{d}s" repeatCount="indefinite"/>'
               f'<animateTransform attributeName="transform" type="translate" values="0 0;-30 900" dur="{d * 3:.1f}s" repeatCount="indefinite"/></path>'
               for x, d in [(s.rng.uniform(300, 1400), s.rng.uniform(.7, 1.1)) for _ in range(70)])
s.add(3, rain)
# The glass: a film of dust and breath, and drops that slide down it.
db = blur(s, 26)
s.add(4, f'<g filter="url(#{db})" fill="#c9c7bd" opacity=".22"><ellipse cx="500" cy="300" rx="260" ry="150"/><ellipse cx="1150" cy="560" rx="300" ry="170"/><ellipse cx="820" cy="140" rx="200" ry="80"/></g>')
drops = "".join(f'<g><animateTransform attributeName="transform" type="translate" values="{x} {y};{x + 2} {y + 220}" dur="{d}s" begin="{b}s" repeatCount="indefinite"/>'
                f'<animate attributeName="opacity" values="0;.6;.6;0" keyTimes="0;.1;.8;1" dur="{d}s" begin="{b}s" repeatCount="indefinite"/>'
                f'<ellipse cx="0" cy="0" rx="2.2" ry="3.2" fill="#d4d2c8"/><path d="M0 -3V-40" stroke="#d4d2c8" stroke-width="1" opacity=".4"/></g>'
                for x, y, d, b in [(640, 220, 11, 0), (980, 160, 14, 4), (1080, 330, 12, 7), (760, 380, 15, 2), (520, 420, 13, 9)])
s.add(4, drops)
s.write()
