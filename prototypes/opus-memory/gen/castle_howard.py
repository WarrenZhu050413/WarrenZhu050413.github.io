"""Castle Howard, south front, for "I wish it were not dark."

Writes _includes/memory-art/waugh2.svg. The house is drawn in elevation, as
the reference photograph sees it, with the Atlas fountain in front and the
yew parterre running toward the viewer. Everything that moves is SMIL, so
memory-visuals.js can stop the whole scene on one frame with pauseAnimations().

Depth groups (mv-d0 sky ... mv-d4 near hedges) carry the pointer parallax.
"""
import math
import pathlib
import random

random.seed(7)
W, H = 1600, 900
CX = 800
OUT = pathlib.Path(__file__).resolve().parents[3] / "_includes/memory-art/waugh2.svg"

# Film-print stone, lead, glass and yew.
STONE_HI = "#ebe0c6"
STONE = "#d6c9aa"
STONE_MID = "#bfb293"
STONE_LO = "#9c9479"
STONE_DEEP = "#6c6f62"
LEAD = "#76857f"
BRONZE = "#4f5a52"
YEW_TOP = "#76896c"
YEW = "#4a5f4b"
YEW_DEEP = "#364a3c"

out = []
add = out.append


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def rect(x, y, w, h, fill, extra=""):
    add(f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" fill="{fill}"{extra}/>')


def use(ref, x, y, sx=1.0, sy=1.0, extra=""):
    t = f"translate({f(x)} {f(y)})" + (f" scale({f(sx)} {f(sy)})" if (sx, sy) != (1.0, 1.0) else "")
    add(f'<use href="#{ref}" transform="{t}"{extra}/>')


# ---------------------------------------------------------------- defs
defs = f"""
<linearGradient id="ch-sky" x2="0" y2="1">
  <stop offset="0" stop-color="#b7c4c3"/><stop offset=".45" stop-color="#d3d8d1"/>
  <stop offset=".72" stop-color="#ebe5d6"/><stop offset="1" stop-color="#f1e9d8"/>
</linearGradient>
<linearGradient id="ch-facade" x2="0" y2="1">
  <stop offset="0" stop-color="{STONE_HI}"/><stop offset=".55" stop-color="{STONE}"/><stop offset="1" stop-color="{STONE_MID}"/>
</linearGradient>
<linearGradient id="ch-wing" x2="0" y2="1">
  <stop offset="0" stop-color="#e2d9c2"/><stop offset=".6" stop-color="#cfc6ab"/><stop offset="1" stop-color="#b6ad94"/>
</linearGradient>
<linearGradient id="ch-pil" x2="1">
  <stop offset="0" stop-color="{STONE_HI}"/><stop offset=".55" stop-color="{STONE}"/>
  <stop offset=".8" stop-color="{STONE_LO}"/><stop offset="1" stop-color="{STONE_DEEP}"/>
</linearGradient>
<linearGradient id="ch-glass" x2="0" y2="1">
  <stop offset="0" stop-color="#7e908b"/><stop offset=".35" stop-color="#4c5f5c"/><stop offset="1" stop-color="#28393a"/>
</linearGradient>
<linearGradient id="ch-dome" x2="1" y2=".25">
  <stop offset="0" stop-color="#b9c3b8"/><stop offset=".3" stop-color="#8e9d95"/>
  <stop offset=".75" stop-color="{LEAD}"/><stop offset="1" stop-color="#4f5f5b"/>
</linearGradient>
<linearGradient id="ch-gold" x2="1">
  <stop offset="0" stop-color="#e3d29c"/><stop offset=".5" stop-color="#bfa86c"/><stop offset="1" stop-color="#7d7051"/>
</linearGradient>
<linearGradient id="ch-bronze" x2="1" y2=".3">
  <stop offset="0" stop-color="#7f8a7c"/><stop offset=".45" stop-color="{BRONZE}"/><stop offset="1" stop-color="#2f3933"/>
</linearGradient>
<linearGradient id="ch-lawn" x2="0" y2="1">
  <stop offset="0" stop-color="#a7b293"/><stop offset="1" stop-color="#7f9271"/>
</linearGradient>
<linearGradient id="ch-pool" x2="0" y2="1">
  <stop offset="0" stop-color="#93a39c"/><stop offset="1" stop-color="#55686a"/>
</linearGradient>
<linearGradient id="ch-terrace" x2="0" y2="1">
  <stop offset="0" stop-color="#ddd3bb"/><stop offset="1" stop-color="#c3bba3"/>
</linearGradient>
<radialGradient id="ch-sun" cx=".5" cy=".5" r=".5">
  <stop offset="0" stop-color="#fff2d2" stop-opacity=".75"/><stop offset=".55" stop-color="#ffeccb" stop-opacity=".22"/>
  <stop offset="1" stop-color="#ffeccb" stop-opacity="0"/>
</radialGradient>
<linearGradient id="ch-haze" x2="0" y2="1">
  <stop offset="0" stop-color="#eee8da" stop-opacity="0"/><stop offset="1" stop-color="#eee8da" stop-opacity=".55"/>
</linearGradient>

<pattern id="ch-balusters" width="7" height="16" patternUnits="userSpaceOnUse">
  <path d="M1.2 16V14.5H2Q.6 12 2.1 9.5Q.9 7.5 2.4 5.6H1.6V4.2H5.4V5.6H4.6Q6.1 7.5 4.9 9.5Q6.4 12 5 14.5H5.8V16Z" fill="{STONE}"/>
  <path d="M4.6 5.6Q6.1 7.5 4.9 9.5Q6.4 12 5 14.5H5.8V16H4.6Z" fill="{STONE_LO}" opacity=".7"/>
</pattern>
<pattern id="ch-joints" width="24" height="9" patternUnits="userSpaceOnUse">
  <path d="M0 8.6H24M12 0V8.6" stroke="#7d7764" stroke-width=".45" opacity=".35"/>
</pattern>
<pattern id="ch-rustic" width="30" height="11" patternUnits="userSpaceOnUse">
  <path d="M0 10.4H30M15 0V10.4" stroke="#6f6a58" stroke-width="1" opacity=".45"/>
</pattern>
<pattern id="ch-mow" width="38" height="10" patternUnits="userSpaceOnUse" patternTransform="skewX(-28)">
  <rect width="19" height="10" fill="#fff" opacity=".05"/>
</pattern>

<!-- One arched window, 20 by 60, keystone and sill; scaled per storey. -->
<g id="ch-win">
  <path d="M-3.5 61.5V9Q-3.5-4.5 10-4.5Q23.5-4.5 23.5 9V61.5Z" fill="{STONE_HI}"/>
  <path d="M0 60V10A10 10 0 0 1 20 10V60Z" fill="url(#ch-glass)"/>
  <path d="M10 .5V60M0 22H20M0 36H20M0 49H20" stroke="#c9c3a8" stroke-width=".7" opacity=".75" vector-effect="non-scaling-stroke"/>
  <path d="M1.5 58V11Q1.5 2 8 1" stroke="#c3d0c9" stroke-width="1" fill="none" opacity=".35" vector-effect="non-scaling-stroke"/>
  <path d="M7-6.5H13L12.2 1.5H7.8Z" fill="{STONE_HI}" stroke="{STONE_LO}" stroke-width=".4"/>
  <rect x="-5.5" y="61" width="31" height="3.2" fill="{STONE_HI}"/>
  <rect x="-5.5" y="64" width="31" height="1.6" fill="{STONE_DEEP}" opacity=".55"/>
</g>
<g id="ch-sq">
  <rect x="-2" y="-2" width="24" height="24" fill="{STONE_HI}"/>
  <rect width="20" height="20" fill="url(#ch-glass)"/>
  <path d="M10 0V20M0 10H20" stroke="#c9c3a8" stroke-width=".6" opacity=".7" vector-effect="non-scaling-stroke"/>
</g>
<!-- A giant-order pilaster, 12 wide; height set by scale. -->
<g id="ch-pilaster">
  <rect x="0" y="0" width="12" height="100" fill="url(#ch-pil)"/>
  <path d="M2.4 2V98M5 2V98M7.6 2V98" stroke="#8a836d" stroke-width=".5" opacity=".55" vector-effect="non-scaling-stroke"/>
</g>
<g id="ch-capital">
  <path d="M-3 0H15L13 7H-1Z" fill="{STONE_HI}"/>
  <path d="M-3 0Q-6-3-3-5Q0-6 1-3M15 0Q18-3 15-5Q12-6 11-3" fill="none" stroke="{STONE_HI}" stroke-width="1.6"/>
  <path d="M1 7Q3 2 6 6Q9 2 11 7" fill="{STONE_MID}"/>
  <rect x="-4.5" y="-7" width="21" height="2.5" fill="{STONE_HI}"/>
</g>
<g id="ch-urn">
  <rect x="-5" y="-4" width="10" height="4" fill="{STONE_MID}"/>
  <path d="M-3.4-4Q-9-10-4.8-14.5H4.8Q9-10 3.4-4Z" fill="{STONE}"/>
  <path d="M1.5-4Q7-10 4.8-14.5H2.8Q5-10 .5-4Z" fill="{STONE_LO}" opacity=".8"/>
  <path d="M-3-14.5Q0-21 3-14.5Z" fill="{STONE_HI}"/><circle cy="-20.5" r="1.4" fill="{STONE_HI}"/>
</g>
<g id="ch-statue">
  <rect x="-5.5" y="-5" width="11" height="5" fill="{STONE_MID}"/>
  <path d="M-3.4-5L-2.6-15Q-4.8-17-3.5-21L-1.6-24.5Q-2.4-28 0-28.6Q2.6-28 1.6-24.5L3.6-21.5Q5.6-18 3-15.5L3.6-5Z" fill="{STONE}"/>
  <path d="M3.6-21.5Q6.5-24 6.4-28.5" stroke="{STONE}" stroke-width="1.5" fill="none"/>
  <path d="M1.6-24.5L3.6-21.5Q5.6-18 3-15.5L3.6-5H1Z" fill="{STONE_LO}" opacity=".75"/>
</g>
<g id="ch-chimney">
  <rect x="0" y="0" width="18" height="70" fill="{STONE_MID}"/>
  <rect x="12" y="0" width="6" height="70" fill="{STONE_LO}"/>
  <rect x="-2.5" y="-3" width="23" height="5" fill="{STONE_HI}"/>
  <rect x="-1.5" y="12" width="21" height="2.4" fill="{STONE_HI}" opacity=".85"/>
  <rect x="3" y="-9" width="4.2" height="6" fill="{STONE_LO}"/><rect x="10.5" y="-9" width="4.2" height="6" fill="{STONE_LO}"/>
</g>

<filter id="ch-cloud" x="-20%" y="-40%" width="140%" height="180%">
  <feTurbulence type="fractalNoise" baseFrequency=".011 .02" numOctaves="4" seed="11"/>
  <feDisplacementMap in="SourceGraphic" scale="70" xChannelSelector="R" yChannelSelector="G"/>
  <feGaussianBlur stdDeviation="7"/>
</filter>
<filter id="ch-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="34"/></filter>
<filter id="ch-mist" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="ch-trees" x="-10%" y="-20%" width="120%" height="140%">
  <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="4"/>
  <feDisplacementMap in="SourceGraphic" scale="22" xChannelSelector="R" yChannelSelector="G"/>
  <feGaussianBlur stdDeviation="1.4"/>
</filter>
<filter id="ch-ripple" filterUnits="userSpaceOnUse" x="600" y="586" width="400" height="80">
  <feTurbulence type="turbulence" baseFrequency=".012 .16" numOctaves="2" seed="2" result="n">
    <animate attributeName="baseFrequency" dur="9s" values=".012 .16;.016 .19;.012 .16" repeatCount="indefinite"/>
  </feTurbulence>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/>
  <feGaussianBlur stdDeviation=".8"/>
</filter>
<clipPath id="ch-basin-clip"><ellipse cx="{CX}" cy="626" rx="176" ry="27"/></clipPath>
"""

# ---------------------------------------------------------------- sky and weather
def sky():
    add('<g class="mv-d0">')
    rect(-60, -40, W + 120, 700, "url(#ch-sky)")
    # Cumulus in two banks; the far bank barely moves, the near one drifts.
    for layer, (dur, dx, alpha, ys) in enumerate([(140, 60, .55, (60, 210)), (90, 120, .8, (20, 170))]):
        add(f'<g opacity="{alpha}" filter="url(#ch-cloud)">')
        add(f'<animateTransform attributeName="transform" type="translate" values="0 0;{dx} 0;0 0" dur="{dur}s" repeatCount="indefinite"/>')
        for _ in range(9 if layer == 0 else 7):
            x = random.uniform(-100, W + 50)
            y = random.uniform(*ys)
            w = random.uniform(160, 360)
            h = w * random.uniform(.32, .5)
            add(f'<ellipse cx="{f(x)}" cy="{f(y + h * .18)}" rx="{f(w * .5)}" ry="{f(h * .42)}" fill="#a9b4b1"/>')
            add(f'<ellipse cx="{f(x - w * .06)}" cy="{f(y)}" rx="{f(w * .44)}" ry="{f(h * .45)}" fill="#f7f3ea"/>')
            add(f'<ellipse cx="{f(x + w * .14)}" cy="{f(y - h * .12)}" rx="{f(w * .26)}" ry="{f(h * .36)}" fill="#fffdf6"/>')
        add('</g>')
    add('</g>')


def trees():
    add('<g class="mv-d1" filter="url(#ch-trees)">')
    for side in (-1, 1):
        base = CX + side * 820
        for i in range(16):
            x = base - side * random.uniform(0, 560)
            y = random.uniform(318, 372)
            r = random.uniform(30, 64)
            tone = random.choice(["#8d9a89", "#7f8e7e", "#97a294", "#73846f"])
            add(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{tone}"/>')
        rect(min(base, base - side * 600), 352, 600, 56, "#7e8d7c")
    add('</g>')
    rect(-60, 300, W + 120, 120, "url(#ch-haze)", ' class="mv-d1" opacity=".7"')


# ---------------------------------------------------------------- the house
def balustrade(x0, x1, y, piers):
    rect(x0, y, x1 - x0, 3, STONE_HI)
    rect(x0, y + 3, x1 - x0, 15, "url(#ch-balusters)")
    rect(x0, y + 17, x1 - x0, 3, STONE_MID)
    for px in piers:
        rect(px - 4.5, y - 1, 9, 21, STONE)
        rect(px + 1.5, y - 1, 3, 21, STONE_LO, ' opacity=".7"')


def cornice(x0, x1, y, depth=1.0):
    rect(x0 - 6 * depth, y, x1 - x0 + 12 * depth, 4 * depth, STONE_HI)
    rect(x0 - 6 * depth, y + 4 * depth, x1 - x0 + 12 * depth, 2.5 * depth, STONE_DEEP, ' opacity=".7"')
    # dentils
    step = 5 * depth
    xs = " ".join(f"M{f(x)} {f(y + 6.5 * depth)}h{f(2.4 * depth)}v{f(2.6 * depth)}h-{f(2.4 * depth)}z" for x in frange(x0 - 4 * depth, x1 + 4 * depth, step))
    add(f'<path d="{xs}" fill="{STONE}"/>')
    rect(x0 - 3 * depth, y + 9 * depth, x1 - x0 + 6 * depth, 2 * depth, STONE_LO, ' opacity=".6"')


def frange(a, b, s):
    v = a
    while v < b:
        yield v
        v += s


def wing(x0, x1, side):
    top = 404
    rect(x0, top, x1 - x0, 600 - top, "url(#ch-wing)")
    rect(x0, top, x1 - x0, 600 - top, "url(#ch-joints)")
    rect(x0, 566, x1 - x0, 34, "#bdb497")
    rect(x0, 566, x1 - x0, 34, "url(#ch-rustic)")
    cornice(x0, x1, top - 12, .85)
    balustrade(x0, x1, top - 32, [])
    # Bays: pairs of windows between paired pilasters, as on the south front.
    bay = 46
    start = x1 - 30 if side < 0 else x0 + 30
    n = int((x1 - x0) / bay)
    piers = []
    for i in range(n):
        cx = start + (-1 if side < 0 else 1) * (i * bay + bay / 2)
        if not (x0 + 8 < cx < x1 - 8):
            continue
        use("ch-win", cx - 9.5, 424, .95, .92)
        use("ch-win", cx - 9.5, 504, .95, .72)
        use("ch-sq", cx - 7, 574, .7, .7)
        if i % 2 == 1:
            px = cx + (-1 if side < 0 else 1) * bay / 2
            use("ch-pilaster", px - 4.5, 416, .75, 1.46)
            use("ch-capital", px - 4.5, 416, .75, .75)
            piers.append(px)
    for px in piers:
        rect(px - 4.5, top - 33, 9, 21, STONE)
        rect(px + 1.5, top - 33, 3, 21, STONE_LO, ' opacity=".7"')
        use("ch-urn" if int(px / 46) % 2 else "ch-statue", px, top - 33, .9, .9)
    # Chimney stacks rising behind the wing roof.
    for k in range(4):
        cx = x0 + (x1 - x0) * (.14 + k * .24) + random.uniform(-10, 10)
        use("ch-chimney", cx, top - 86, .9, .85)
        use("ch-chimney", cx + 22, top - 80, .9, .78)
    # shadow where the wing meets the centre block
    edge = x1 if side < 0 else x0
    add(f'<rect x="{f(edge - (14 if side < 0 else 0))}" y="{top - 12}" width="14" height="{600 - top + 12}" fill="{STONE_DEEP}" opacity=".28"/>')


def west_pavilion():
    # The small dome at the far end of the west wing.
    x = 1418
    add('<g>')
    rect(x - 34, 340, 68, 40, STONE)
    rect(x + 12, 340, 22, 40, STONE_LO, ' opacity=".6"')
    for k in (-20, 0, 20):
        use("ch-win", x + k - 5, 348, .5, .45)
    cornice(x - 36, x + 36, 334, .6)
    add(f'<path d="M{x - 30} 334C{x - 30} 300 {x - 14} 288 {x} 288C{x + 14} 288 {x + 30} 300 {x + 30} 334Z" fill="url(#ch-dome)"/>')
    add(f'<path d="M{x - 15} 333Q{x - 14} 300 {x} 289M{x + 15} 333Q{x + 14} 300 {x} 289M{x} 289V333" stroke="#a7b3aa" stroke-width=".8" fill="none" opacity=".7"/>')
    rect(x - 5, 276, 10, 13, STONE_HI)
    add(f'<path d="M{x - 6} 276Q{x} 266 {x + 6} 276Z" fill="url(#ch-dome)"/><circle cx="{x}" cy="263" r="2.2" fill="url(#ch-gold)"/>')
    add('</g>')


def centre():
    x0, x1 = 588, 1012
    top = 338
    bays = 9
    bw = (x1 - x0) / bays
    # Roof chimneys stand behind everything in the block.
    for cx, h in ((628, 74), (652, 66), (708, 92), (876, 92), (930, 66), (954, 74)):
        use("ch-chimney", cx, 300 - h, 1, h / 70)
    dome()
    rect(x0, top, x1 - x0, 548 - top, "url(#ch-facade)")
    rect(x0, top, x1 - x0, 548 - top, "url(#ch-joints)")
    # Podium with rusticated base and the steps up to the door.
    rect(x0 - 8, 548, x1 - x0 + 16, 52, "#c9bea1")
    rect(x0 - 8, 548, x1 - x0 + 16, 52, "url(#ch-rustic)")
    rect(x0 - 10, 545, x1 - x0 + 20, 4, STONE_HI)
    for i in range(bays):
        cx = x0 + bw * (i + .5)
        if i == bays // 2:
            # The door, under a pedimented hood.
            add(f'<path d="M{f(cx - 17)} 548V478A17 17 0 0 1 {f(cx + 17)} 478V548Z" fill="#2c3a38"/>')
            add(f'<path d="M{f(cx - 17)} 548V478A17 17 0 0 1 {f(cx + 17)} 478V548" fill="none" stroke="{STONE_HI}" stroke-width="5"/>')
            add(f'<path d="M{f(cx - 27)} 457L{f(cx)} 440L{f(cx + 27)} 457Z" fill="{STONE_HI}" stroke="{STONE_LO}" stroke-width=".6"/>')
            use("ch-win", cx - 11.5, 360, 1.15, 1.0)
            continue
        use("ch-win", cx - 11, 362, 1.1, .96)
        use("ch-win", cx - 12, 458, 1.2, 1.12)
        # hood mouldings over the lower windows
        add(f'<path d="M{f(cx - 18)} 452Q{f(cx)} 440 {f(cx + 18)} 452H{f(cx - 18)}Z" fill="{STONE_HI}"/>')
        add(f'<rect x="{f(cx - 18)}" y="452" width="36" height="2" fill="{STONE_DEEP}" opacity=".45"/>')
    for i in range(bays + 1):
        px = x0 + bw * i - 6
        use("ch-pilaster", px, 350, 1, 1.95)
        use("ch-capital", px, 350)
        add(f'<rect x="{f(px + 12)}" y="350" width="5" height="195" fill="{STONE_DEEP}" opacity=".16"/>')
    # Entablature: architrave, a frieze of garlands, and a deep cornice.
    rect(x0 - 4, top - 6, x1 - x0 + 8, 8, STONE_HI)
    rect(x0 - 4, top - 18, x1 - x0 + 8, 12, STONE)
    swags = " ".join(f"M{f(x)} {top - 15}q{f(bw / 4)} 8 {f(bw / 2)} 0" for x in frange(x0 + 4, x1 - 8, bw / 2))
    add(f'<path d="{swags}" stroke="{STONE_LO}" stroke-width="1.1" fill="none" opacity=".75"/>')
    cornice(x0, x1, top - 30, 1.25)
    # Balustrade over the outer bays, the pediment over the middle five.
    px0, px1 = x0 + bw * 2, x1 - bw * 2
    piers = [x0 + bw * i for i in range(0, 3)] + [x1 - bw * i for i in range(0, 3)]
    balustrade(x0 - 6, px0, top - 52, piers)
    balustrade(px1, x1 + 6, top - 52, piers)
    for k, px in enumerate(piers):
        use("ch-statue" if k % 2 else "ch-urn", px, top - 52, 1.1, 1.1)
    pediment(px0 - 4, px1 + 4, top - 30)


def pediment(x0, x1, base):
    apex = base - 52
    mid = (x0 + x1) / 2
    add(f'<path d="M{f(x0)} {base}L{f(mid)} {apex}L{f(x1)} {base}Z" fill="{STONE}"/>')
    add(f'<path d="M{f(x0 + 16)} {base - 4}L{f(mid)} {apex + 10}L{f(x1 - 16)} {base - 4}Z" fill="{STONE_MID}"/>')
    # Tympanum: a cartouche and the arms' garlands, softened.
    add(f'<ellipse cx="{f(mid)}" cy="{base - 20}" rx="15" ry="12" fill="{STONE_HI}" stroke="{STONE_LO}" stroke-width=".8"/>')
    add(f'<path d="M{f(mid - 15)} {base - 20}q-26 6-48 2M{f(mid + 15)} {base - 20}q26 6 48 2" stroke="{STONE_HI}" stroke-width="3.2" fill="none"/>')
    add(f'<path d="M{f(mid - 40)} {base - 12}q-10 3-24 1M{f(mid + 40)} {base - 12}q10 3 24 1" stroke="{STONE_LO}" stroke-width="1.2" fill="none" opacity=".6"/>')
    add(f'<path d="M{f(x0 - 8)} {base + 1}L{f(mid)} {apex - 7}L{f(x1 + 8)} {base + 1}" fill="none" stroke="{STONE_HI}" stroke-width="7"/>')
    add(f'<path d="M{f(x0 - 2)} {base + 5}L{f(mid)} {apex - 1}L{f(x1 + 2)} {base + 5}" fill="none" stroke="{STONE_DEEP}" stroke-width="1.6" opacity=".6"/>')
    use("ch-statue", mid, apex - 9, 1.3, 1.3)
    use("ch-statue", x0 - 2, base - 3, 1.1, 1.1)
    use("ch-statue", x1 + 2, base - 3, 1.1, 1.1)


def dome():
    # Drum: an octagon seen square-on, with buttress pilasters and statues.
    d0, d1, dt, db = 726, 874, 176, 300
    rect(d0, dt, d1 - d0, db - dt, "url(#ch-facade)")
    rect(d1 - 30, dt, 30, db - dt, STONE_LO, ' opacity=".45"')
    rect(d0, dt, 22, db - dt, STONE_HI, ' opacity=".35"')
    for k, cx in enumerate((760, 800, 840)):
        use("ch-win", cx - 9, 202, .9, .95)
    for px in (734, 778, 818, 862):
        use("ch-pilaster", px - 4, 186, .7, 1.1)
        use("ch-capital", px - 4, 186, .7, .7)
    cornice(d0, d1, 168, .9)
    for px in (734, 778, 822, 866):
        use("ch-statue", px, 167, 1.0, 1.0)
    # The dome itself, lead, with ribs and small oculi.
    add('<path d="M736 168C736 120 765 96 800 96C835 96 864 120 864 168Z" fill="url(#ch-dome)"/>')
    ribs = []
    for t in (-.82, -.55, -.27, 0, .27, .55, .82):
        xb = 800 + t * 64
        xm = 800 + t * 48
        ribs.append(f"M{f(xb)} 168Q{f(xm)} 116 {f(800 + t * 10)} 99")
    add(f'<path d="{" ".join(ribs)}" stroke="#c5cdc3" stroke-width="1.6" fill="none" opacity=".55"/>')
    add(f'<path d="{" ".join(ribs)}" stroke="#46544f" stroke-width=".6" fill="none" opacity=".5" transform="translate(1.6 0)"/>')
    for t in (-.41, -.13, .13, .41):
        add(f'<ellipse cx="{f(800 + t * 58)}" cy="146" rx="4.2" ry="5" fill="{STONE_HI}"/><ellipse cx="{f(800 + t * 58)}" cy="146.5" rx="2.6" ry="3.3" fill="#2f3e3d"/>')
    add('<path d="M742 140C748 116 768 102 790 99" stroke="#eef0e6" stroke-width="5" fill="none" opacity=".28" stroke-linecap="round"/>')
    # Lantern, cupola, ball and finial, gilded.
    rect(784, 64, 32, 34, STONE_HI)
    rect(806, 64, 10, 34, STONE_LO, ' opacity=".6"')
    for cx in (792, 800, 808):
        add(f'<path d="M{cx - 2.6} 92V74A2.6 2.6 0 0 1 {cx + 2.6} 74V92Z" fill="#2e3c3b"/>')
    cornice(782, 818, 59, .5)
    add('<path d="M786 59C786 46 793 40 800 40C807 40 814 46 814 59Z" fill="url(#ch-gold)"/>')
    add('<path d="M790 58Q792 46 800 42" stroke="#f3e7bd" stroke-width="1.2" fill="none" opacity=".7"/>')
    add('<circle cx="800" cy="35" r="4.4" fill="url(#ch-gold)"/><path d="M800 31V15M796 22H804" stroke="#bfa86c" stroke-width="1.6"/>')


def house():
    add('<g class="mv-d2">')
    trees_behind_house()
    wing(-40, 588, -1)
    wing(1012, 1640, 1)
    west_pavilion()
    centre()
    # Travelling light: sun and cloud shadows passing over the stone.
    add('<g clip-path="url(#ch-house-clip)" style="mix-blend-mode:soft-light">')
    add('<ellipse cx="0" cy="360" rx="420" ry="260" fill="url(#ch-sun)">'
        '<animate attributeName="cx" values="380;1240;380" dur="48s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/></ellipse>')
    add('</g>')
    add('<g clip-path="url(#ch-house-clip)" filter="url(#ch-soft)" opacity=".24">')
    add('<g><animateTransform attributeName="transform" type="translate" values="-900 0;1700 0" dur="70s" repeatCount="indefinite"/>')
    add('<ellipse cx="0" cy="430" rx="260" ry="120" fill="#33403b"/><ellipse cx="-560" cy="380" rx="190" ry="90" fill="#33403b"/></g>')
    add('</g>')
    rect(-60, 560, W + 120, 44, "url(#ch-haze)", ' opacity=".55"')
    add('</g>')


def trees_behind_house():
    pass


# ---------------------------------------------------------------- the garden
def terrace():
    add('<g class="mv-d3">')
    rect(-60, 598, W + 120, 40, "url(#ch-terrace)")
    rect(-60, 598, W + 120, 3, "#a49d86", ' opacity=".6"')
    add('</g>')


def fountain():
    add('<g class="mv-d3">')
    # Steps and basin rim.
    for k in range(4):
        add(f'<rect x="{f(CX - 120 - k * 14)}" y="{648 + k * 7}" width="{f(240 + k * 28)}" height="7" fill="{"#d9cfb6" if k % 2 == 0 else "#bfb69c"}"/>')
    add(f'<ellipse cx="{CX}" cy="629" rx="186" ry="31" fill="#cbbf9f"/>')
    add(f'<ellipse cx="{CX}" cy="626" rx="176" ry="27" fill="url(#ch-pool)"/>')
    # The house again, upside down in the water, broken by the ripples.
    add(f'<g clip-path="url(#ch-basin-clip)"><g filter="url(#ch-ripple)" opacity=".42">')
    add(f'<use href="#ch-reflect" transform="translate(0 1200) scale(1 -1)"/>')
    add('</g>')
    for k in range(3):
        add(f'<ellipse cx="{CX}" cy="622" rx="40" ry="5" fill="none" stroke="#e9eee8" stroke-width="1" opacity="0">'
            f'<animate attributeName="rx" values="40;170" dur="4.5s" begin="{k * 1.5}s" repeatCount="indefinite"/>'
            f'<animate attributeName="ry" values="5;24" dur="4.5s" begin="{k * 1.5}s" repeatCount="indefinite"/>'
            f'<animate attributeName="opacity" values=".55;0" dur="4.5s" begin="{k * 1.5}s" repeatCount="indefinite"/></ellipse>')
    add('</g>')
    add(f'<path d="M{CX - 186} 629A186 31 0 0 0 {CX + 186} 629" fill="none" stroke="#e7dec6" stroke-width="5"/>')
    add(f'<path d="M{CX - 186} 632A186 31 0 0 0 {CX + 186} 632" fill="none" stroke="#7d7764" stroke-width="1.2" opacity=".5"/>')

    # Pedestal, the lower tritons, the bowl, Atlas and the globe.
    add(f'<path d="M{CX - 34} 622L{CX - 26} 556H{CX + 26}L{CX + 34} 622Z" fill="url(#ch-bronze)"/>')
    add(f'<path d="M{CX - 46} 560Q{CX} 548 {CX + 46} 560L{CX + 38} 566Q{CX} 556 {CX - 38} 566Z" fill="#5d695f"/>')
    for s in (-1, 1):
        triton(CX + s * 92, 612, s)
    add(f'<ellipse cx="{CX}" cy="552" rx="70" ry="10" fill="#3b4741"/>')
    add(f'<ellipse cx="{CX}" cy="549" rx="66" ry="7" fill="#71807a"/>')
    add(f'<path d="M{CX - 18} 548Q{CX - 14} 520 {CX - 6} 512H{CX + 6}Q{CX + 14} 520 {CX + 18} 548Z" fill="url(#ch-bronze)"/>')
    atlas()
    water()
    add('</g>')


def triton(x, y, s):
    # A reclining sea-god blowing a conch toward the centre.
    add(f'<g transform="translate({x} {y}) scale({s} 1)">')
    add('<path d="M-30 4Q-36-8-24-14Q-12-20-4-14Q4-30 14-30Q22-30 22-22Q28-18 22-10Q16-2 4 0Q-6 6-30 4Z" fill="url(#ch-bronze)"/>')
    add('<path d="M-30 4Q-46 0-52-12Q-44-8-36-8" fill="none" stroke="#56635a" stroke-width="5" stroke-linecap="round"/>')
    add('<circle cx="16" cy="-35" r="7" fill="#5b675e"/>')
    add('<path d="M10-36L-6-46Q-12-48-12-42L-2-38Z" fill="#7b867b"/>')
    add('<path d="M10-33Q16-40 22-36" stroke="#8c978b" stroke-width="1.4" fill="none"/>')
    add('</g>')


def atlas():
    # Atlas kneels with the globe across his shoulders.
    add(f'<g transform="translate({CX} 512)">')
    add('<path d="M-16 0Q-20-16-10-26Q-6-34 0-36Q8-34 11-24Q20-14 15 0Z" fill="url(#ch-bronze)"/>')
    add('<path d="M-10-26Q-24-36-26-52M11-24Q24-34 26-50" stroke="#46524b" stroke-width="5.5" stroke-linecap="round" fill="none"/>')
    add('<circle cx="0" cy="-40" r="6" fill="#56625a"/>')
    add('<circle cx="0" cy="-62" r="23" fill="url(#ch-bronze)"/>')
    add('<path d="M-23-62H23M0-85V-39M-20-73Q0-66 20-73M-20-51Q0-58 20-51M-12-82Q6-62-12-41M12-82Q-6-62 12-41" stroke="#93a093" stroke-width=".9" fill="none" opacity=".75"/>')
    add('<path d="M-17-74Q-12-82-4-84" stroke="#c9d1c3" stroke-width="2.4" fill="none" opacity=".55" stroke-linecap="round"/>')
    add('</g>')


def water():
    # Jets from the globe and the conches; dashes travel along each arc.
    jets = [
        f"M{CX} 425Q{CX - 4} 372 {CX - 36} 360Q{CX - 74} 356 {CX - 90} 548",
        f"M{CX} 425Q{CX + 4} 372 {CX + 36} 360Q{CX + 74} 356 {CX + 90} 548",
        f"M{CX} 425Q{CX - 2} 380 {CX - 16} 376Q{CX - 34} 380 {CX - 52} 546",
        f"M{CX} 425Q{CX + 2} 380 {CX + 16} 376Q{CX + 34} 380 {CX + 52} 546",
        f"M{CX - 104} 567Q{CX - 140} 520 {CX - 166} 612",
        f"M{CX + 104} 567Q{CX + 140} 520 {CX + 166} 612",
        f"M{CX - 104} 567Q{CX - 120} 538 {CX - 136} 616",
        f"M{CX + 104} 567Q{CX + 120} 538 {CX + 136} 616",
    ]
    add(f'<path d="M{CX} 425V352" stroke="#eef2ec" stroke-width="2.4" opacity=".7" stroke-linecap="round"/>')
    for k, d in enumerate(jets):
        dur = 1.1 + (k % 3) * .17
        add(f'<path d="{d}" fill="none" stroke="#f1f4ee" stroke-width="{1.7 if k < 4 else 1.3}" stroke-linecap="round" '
            f'stroke-dasharray="9 7 3 9" opacity=".78"><animate attributeName="stroke-dashoffset" values="0;-28" dur="{dur:.2f}s" repeatCount="indefinite"/></path>')
    # Curtains of water falling from the bowl's lip.
    for k in range(13):
        x = CX - 62 + k * 10.3
        add(f'<path d="M{f(x)} 553Q{f(x + (x - CX) * .08)} 585 {f(x + (x - CX) * .14)} 618" stroke="#e9eee8" stroke-width="1" opacity=".55" stroke-dasharray="5 6" fill="none">'
            f'<animate attributeName="stroke-dashoffset" values="0;-22" dur="{.8 + (k % 4) * .09:.2f}s" repeatCount="indefinite"/></path>')
    # Spray drifting off the top of the jets.
    add('<g filter="url(#ch-mist)">')
    for k, (x, y, r) in enumerate([(CX - 40, 362, 16), (CX + 40, 362, 16), (CX, 352, 12), (CX - 150, 600, 18), (CX + 150, 600, 18)]):
        add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fbfcf8" opacity=".35"><animate attributeName="opacity" values=".18;.48;.18" dur="{3 + k * .7:.1f}s" repeatCount="indefinite"/></circle>')
    add('</g>')


def parterre():
    add('<g class="mv-d4">')
    rect(-60, 636, W + 120, 300, "url(#ch-lawn)")
    rect(-60, 636, W + 120, 300, "url(#ch-mow)")
    # Central walk, widening toward the viewer.
    add(f'<path d="M{CX - 92} 676L{CX - 300} 940H{CX + 300}L{CX + 92} 676Z" fill="#b4bd9f"/>')
    add(f'<path d="M{CX - 92} 676L{CX - 300} 940H{CX + 300}L{CX + 92} 676Z" fill="url(#ch-mow)"/>')
    # Clipped yew in perspective rows: top face, front face, end face.
    rows = [(640, 10, 14), (664, 13, 20), (700, 17, 28), (752, 23, 40), (826, 30, 58)]
    for y, top_h, front_h in rows:
        hw = 96 + (y - 640) * .8
        for s in (-1, 1):
            inner = CX + s * hw
            outer = CX + s * 900
            end = s * (8 + (y - 640) * .14)
            xa, xb = sorted((inner, outer))
            add(f'<rect x="{f(xa)}" y="{y + top_h}" width="{f(xb - xa)}" height="{front_h}" fill="{YEW}"/>')
            add(f'<rect x="{f(xa)}" y="{y}" width="{f(xb - xa)}" height="{top_h}" fill="{YEW_TOP}"/>')
            add(f'<path d="M{f(inner)} {y}L{f(inner - end)} {y + top_h * .6}V{y + top_h + front_h}L{f(inner)} {y + top_h + front_h}Z" fill="{YEW_DEEP}"/>')
            add(f'<rect x="{f(xa)}" y="{y + top_h + front_h - 3}" width="{f(xb - xa)}" height="5" fill="#2d3c32" opacity=".45"/>')
            # Sun catching the clipped tops.
            add(f'<rect x="{f(xa)}" y="{y}" width="{f(xb - xa)}" height="{max(1.5, top_h * .22):.1f}" fill="#a7b597" opacity=".55"/>')
    add('</g>')


# ---------------------------------------------------------------- life in the air
def rooks():
    add('<g class="mv-d0">')
    paths = [
        "M610 120C700 70 900 60 980 130C1040 180 880 200 820 150C760 100 640 160 610 120Z",
        "M1000 200C1100 140 1220 170 1180 230C1140 280 1040 250 1000 200Z",
        "M500 180C430 120 300 150 340 210C380 260 470 230 500 180Z",
    ]
    for k, p in enumerate(paths):
        add(f'<path d="M-5 0Q-2.5-3.4 0 0Q2.5-3.4 5 0" stroke="#3e4843" stroke-width="1.3" fill="none" stroke-linecap="round">'
            f'<animate attributeName="d" values="M-5 0Q-2.5-3.4 0 0Q2.5-3.4 5 0;M-5-1Q-2.5 1.6 0 0Q2.5 1.6 5-1;M-5 0Q-2.5-3.4 0 0Q2.5-3.4 5 0" dur="{.6 + k * .13:.2f}s" repeatCount="indefinite"/>'
            f'<animateMotion path="{p}" dur="{26 + k * 9}s" repeatCount="indefinite"/></path>')
    add('</g>')


# ---------------------------------------------------------------- assemble
def house_clip():
    # Union of everything built in stone, for the travelling light.
    return """<clipPath id="ch-house-clip">
  <rect x="-40" y="372" width="1680" height="230"/><rect x="580" y="282" width="440" height="320"/>
  <path d="M672 282L800 230L928 282Z"/><rect x="726" y="160" width="148" height="140"/>
  <path d="M736 168C736 120 765 96 800 96C835 96 864 120 864 168Z"/><rect x="784" y="40" width="32" height="60"/>
</clipPath>"""


body_start = len(out)
sky()
trees()
house()
house_markup = None
terrace()
fountain()
parterre()
rooks()

svg = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" aria-hidden="true" class="mv-scene">',
    "<defs>", defs, house_clip(), "</defs>",
]
# The reflection reuses the house; give it an id by wrapping the house group.
joined = "\n".join(out)
start = joined.index('<g class="mv-d2">')
end = joined.index('<g class="mv-d3">')
house_block = joined[start:end]
joined = joined[:start] + house_block.replace('<g class="mv-d2">', '<g class="mv-d2" id="ch-reflect">', 1) + joined[end:]
svg.append(joined)
svg.append("</svg>")
OUT.write_text("\n".join(svg) + "\n")
print(OUT, OUT.stat().st_size)
