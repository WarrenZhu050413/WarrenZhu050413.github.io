"""Brideshead in shadow: Castle Howard across the lake, as a few tonal masses.

Writes _includes/memory-art/waugh2.svg. Nothing is drawn in detail; the place
comes from silhouettes at five depths, the light behind them, and the water.
Layers run well past the frame so the pointer can look around the world:
mv-d0 sky, mv-d1 far land, mv-d2 house and its reflection, mv-d3 the lake
surface, mv-d4 the near bank. All motion is SMIL so the engine can stop the
scene on a single frame with pauseAnimations().
"""
import pathlib
import random

random.seed(3)
W, H = 1600, 900
HZ = 500  # the far shore, where the house stands and the water begins
OUT = pathlib.Path(__file__).resolve().parents[3] / "_includes/memory-art/waugh2.svg"

out = []
add = out.append


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


defs = f"""
<linearGradient id="bs-sky" x2="0" y2="1">
  <stop offset="0" stop-color="#c2cac7"/><stop offset=".55" stop-color="#dcdcd2"/><stop offset="1" stop-color="#ead8cb"/>
</linearGradient>
<linearGradient id="bs-water" x2="0" y2="1">
  <stop offset="0" stop-color="#d9d6cc"/><stop offset=".25" stop-color="#b3b9b1"/><stop offset="1" stop-color="#7f8c86"/>
</linearGradient>
<linearGradient id="bs-house" x2="0" y2="1">
  <stop offset="0" stop-color="#7a8681"/><stop offset=".8" stop-color="#8a948c"/><stop offset="1" stop-color="#a3a99f"/>
</linearGradient>
<radialGradient id="bs-sun"><stop offset="0" stop-color="#fbebd2" stop-opacity=".95"/><stop offset=".45" stop-color="#f3dcc6" stop-opacity=".4"/><stop offset="1" stop-color="#f3dcc6" stop-opacity="0"/></radialGradient>
<filter id="bs-blur-s"><feGaussianBlur stdDeviation="1.2"/></filter>
<filter id="bs-blur-m" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="bs-blur-l" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
<filter id="bs-foliage" x="-10%" y="-20%" width="120%" height="140%">
  <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="8"/>
  <feDisplacementMap in="SourceGraphic" scale="26" xChannelSelector="R" yChannelSelector="G"/>
  <feGaussianBlur stdDeviation="2.2"/>
</filter>
<filter id="bs-ripple" filterUnits="userSpaceOnUse" x="-300" y="{HZ}" width="2200" height="260">
  <feTurbulence type="turbulence" baseFrequency=".004 .09" numOctaves="2" seed="5">
    <animate attributeName="baseFrequency" dur="11s" values=".004 .09;.006 .11;.004 .09" repeatCount="indefinite"/>
  </feTurbulence>
  <feDisplacementMap in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G"/>
  <feGaussianBlur stdDeviation="1.6"/>
</filter>
<linearGradient id="bs-reflect-fade" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="bs-reflect-mask" maskUnits="userSpaceOnUse" x="-300" y="{HZ}" width="2200" height="260">
  <rect x="-300" y="{HZ}" width="2200" height="200" fill="url(#bs-reflect-fade)"/>
</mask>
"""


def house():
    """The south front as one mass: low wings, the block, pediment, drum and dome."""
    parts = []
    # Wings, with chimney stacks breaking the roofline.
    parts.append(f"M430 {HZ}V461H700V{HZ}Z M900 {HZ}V461H1170V{HZ}Z")
    for x in (452, 470, 540, 612, 630, 968, 986, 1060, 1128, 1146):
        parts.append(f"M{x} 462V447H{x + 9}V462Z")
    # The centre block and its pediment.
    parts.append(f"M700 {HZ}V434H900V{HZ}Z")
    parts.append("M738 435L800 415L862 435Z")
    for x in (708, 722, 870, 884):
        parts.append(f"M{x} 436V418H{x + 8}V436Z")
    # Drum, dome, lantern and finial.
    parts.append("M772 420V388H828V420Z")
    parts.append("M776 389C776 368 788 356 800 356C812 356 824 368 824 389Z")
    parts.append("M795 358V346H805V358Z M796 347C796 341 798 339 800 339C802 339 804 341 804 347Z M799.3 340V328H800.7V340Z")
    # The small dome at the end of the west wing.
    parts.append("M1092 462V449H1112V462Z M1093 450C1093 442 1097 438 1102 438C1107 438 1111 442 1111 450Z")
    # Statues and urns on the skyline, the only ornament: a few dots and posts.
    for x in (442, 500, 560, 650, 714, 886, 950, 1010, 1080, 1158):
        parts.append(f"M{x} 462V455.5H{x + 3.4}V462Z")
    return " ".join(parts)


HOUSE = house()
WINDOWS = [(746, 478), (770, 479), (830, 479), (854, 478), (566, 484), (1010, 483), (800, 452)]


def sky():
    add('<g class="mv-d0">')
    add(f'<rect x="-400" y="-120" width="2400" height="{HZ + 140}" fill="url(#bs-sky)"/>')
    add('<circle cx="610" cy="420" r="260" fill="url(#bs-sun)"/>')
    add('<g filter="url(#bs-blur-m)" fill="#f4efe6" opacity=".7">'
        '<animateTransform attributeName="transform" type="translate" values="0 0;90 0;0 0" dur="120s" repeatCount="indefinite"/>'
        '<ellipse cx="300" cy="170" rx="260" ry="16"/><ellipse cx="1150" cy="120" rx="320" ry="14"/>'
        '<ellipse cx="760" cy="250" rx="220" ry="10"/><ellipse cx="1500" cy="260" rx="200" ry="11"/></g>')
    # Rooks, far off, turning over the dome.
    for k, p in enumerate(["M760 300C840 260 940 280 900 330C860 370 780 340 760 300Z",
                           "M680 260C620 230 560 270 600 300C640 330 690 300 680 260Z"]):
        add(f'<path d="M-3 0Q-1.5-2 0 0Q1.5-2 3 0" stroke="#5c6662" stroke-width="1" fill="none">'
            f'<animate attributeName="d" values="M-3 0Q-1.5-2 0 0Q1.5-2 3 0;M-3-.6Q-1.5 1 0 0Q1.5 1 3-.6;M-3 0Q-1.5-2 0 0Q1.5-2 3 0" dur="{.7 + k * .15:.2f}s" repeatCount="indefinite"/>'
            f'<animateMotion path="{p}" dur="{34 + k * 11}s" repeatCount="indefinite"/></path>')
    add('</g>')


def far_land():
    add('<g class="mv-d1">')
    add(f'<path d="M-400 {HZ}V474C-200 462 0 470 160 466C380 458 520 470 700 468C900 464 1100 456 1300 466C1500 474 1700 460 2000 470V{HZ}Z" fill="#c4c7bd"/>')
    add(f'<path d="M-400 {HZ}V486C-100 478 200 488 500 484C800 480 1100 486 1400 480C1700 476 1900 486 2000 484V{HZ}Z" fill="#b3b8ae"/>')
    add('</g>')


def house_and_woods():
    add('<g class="mv-d2" id="bs-shore">')
    # Woods either side of the house, darker than the stone and soft-edged.
    add('<g filter="url(#bs-foliage)" fill="#73807a">')
    for cx, cy, rx, ry in [(250, 470, 230, 46), (380, 478, 120, 36), (60, 466, 200, 52),
                           (1330, 472, 200, 44), (1480, 466, 220, 50), (1230, 482, 110, 28), (446, 476, 60, 26), (1156, 476, 64, 26), (-180, 470, 260, 46), (1760, 470, 260, 48)]:
        add(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/>')
    add(f'<rect x="-400" y="474" width="2400" height="{HZ - 474 + 2}"/>')
    add('</g>')
    add(f'<path d="{HOUSE}" fill="url(#bs-house)" filter="url(#bs-blur-s)"/>')
    add('</g>')
    # A few windows lit against the coming dark; they breathe very slowly.
    add('<g class="mv-d2">')
    for k, (x, y) in enumerate(WINDOWS):
        add(f'<rect x="{x}" y="{y}" width="3" height="5" rx=".8" fill="#f3dfb2" opacity=".0">'
            f'<animate attributeName="opacity" values=".35;.85;.5;.8;.35" dur="{9 + k * 1.7:.1f}s" repeatCount="indefinite"/></rect>')
    add('</g>')


def lake():
    add('<g class="mv-d2">')
    add(f'<rect x="-400" y="{HZ}" width="2400" height="420" fill="url(#bs-water)"/>')
    # The shore, house and woods again, upside down and broken by the water.
    add(f'<g mask="url(#bs-reflect-mask)"><g filter="url(#bs-ripple)" opacity=".5">'
        f'<use href="#bs-shore" transform="translate(0 {2 * HZ}) scale(1 -1)"/></g></g>')
    for k, (x, y) in enumerate(WINDOWS):
        add(f'<rect x="{x - 1}" y="{2 * HZ - y - 2}" width="5" height="2" fill="#f3dfb2" opacity=".3" filter="url(#bs-blur-s)">'
            f'<animate attributeName="opacity" values=".1;.45;.15" dur="{5 + k:.1f}s" repeatCount="indefinite"/></rect>')
    add('</g>')
    # Mist lying on the far water, drifting.
    add('<g class="mv-d2" filter="url(#bs-blur-m)" opacity=".55">'
        '<animateTransform attributeName="transform" type="translate" values="-60 0;80 0;-60 0" dur="70s" repeatCount="indefinite"/>'
        f'<ellipse cx="500" cy="{HZ + 4}" rx="520" ry="9" fill="#f1ede4"/><ellipse cx="1250" cy="{HZ + 8}" rx="420" ry="7" fill="#f1ede4"/></g>')


def surface():
    add('<g class="mv-d3">')
    # Light lying on the nearer water: short strokes that come and go.
    for k in range(26):
        y = random.uniform(HZ + 30, 760)
        depth = (y - HZ) / 260
        x = random.uniform(-200, 1800)
        w = 20 + depth * 90
        dur = random.uniform(5, 9)
        add(f'<path d="M{f(x)} {f(y)}h{f(w)}" stroke="#eef0e8" stroke-width="{f(.8 + depth * 1.6)}" stroke-linecap="round" opacity="0">'
            f'<animate attributeName="opacity" values="0;.55;0" dur="{dur:.1f}s" begin="{random.uniform(0, dur):.1f}s" repeatCount="indefinite"/>'
            f'<animateTransform attributeName="transform" type="translate" values="0 0;{f(14 + depth * 30)} 0" dur="{dur:.1f}s" begin="{random.uniform(0, dur):.1f}s" repeatCount="indefinite"/></path>')
    # Two swans, very far, crossing the lake over a long minute.
    add('<g opacity=".8"><animateMotion path="M1180 0H380" dur="150s" repeatCount="indefinite"/>')
    for dx in (0, 26):
        add(f'<path transform="translate({dx} {HZ + 34})" d="M-9 0Q-8-4 0-4Q4-4 5-1Q5-9 7-10Q9-10 8.4-8.4L7.4-8Q6.2-6 7 0Z" fill="#f4f1ea"/>')
        add(f'<path transform="translate({dx} {HZ + 35})" d="M-9 0H8" stroke="#d6d8d0" stroke-width=".8" opacity=".7"/>')
    add('</g>')
    add('</g>')


def near_bank():
    add('<g class="mv-d4">')
    add('<path d="M-500 900V790C-300 770 -120 800 60 784C200 772 300 800 420 812C520 824 600 860 640 900Z" fill="#46514c"/>')
    add('<path d="M1100 900C1160 850 1260 812 1380 800C1520 786 1660 770 1820 778C1950 784 2050 770 2100 760V900Z" fill="#4a5550"/>')
    # Reeds on both banks; each sways from its own root.
    for side, (x0, x1, base) in ((-1, (-260, 420, 806)), (1, (1180, 1880, 802))):
        for k in range(30):
            x = random.uniform(x0, x1)
            h = random.uniform(70, 210)
            lean = random.uniform(-24, 24)
            y = base + random.uniform(-10, 30)
            dur = random.uniform(4.5, 8)
            amp = random.uniform(1.5, 3.5)
            add(f'<path d="M{f(x)} {f(y)}Q{f(x + lean * .4)} {f(y - h * .6)} {f(x + lean)} {f(y - h)}" stroke="#3f4a45" stroke-width="{f(random.uniform(1.4, 3))}" fill="none" stroke-linecap="round">'
                f'<animateTransform attributeName="transform" type="rotate" values="0 {f(x)} {f(y)};{f(amp)} {f(x)} {f(y)};0 {f(x)} {f(y)}" dur="{dur:.1f}s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/></path>')
            if k % 5 == 0:
                add(f'<ellipse cx="{f(x + lean)}" cy="{f(y - h + 10)}" rx="3" ry="11" fill="#3f4a45" transform="rotate({f(lean * .6)} {f(x + lean)} {f(y - h + 10)})"/>')
    add('</g>')


sky()
far_land()
house_and_woods()
lake()
surface()
near_bank()

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" aria-hidden="true" class="mv-scene">\n'
       f"<defs>{defs}</defs>\n" + "\n".join(out) + "\n</svg>\n")
OUT.write_text(svg)
print(OUT, OUT.stat().st_size)
