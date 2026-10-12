"""Shared primitives for the shadow scenes in "I wish it were not dark."

Every scene is a few tonal silhouettes at five depths (mv-d0 sky ... mv-d4
near), with motion in SMIL so memory-visuals.js can stop a scene on one frame
with pauseAnimations(). Nothing is drawn in detail. Lighter means farther.

Usage:
    s = Scene("waugh2")
    sky(s, ...); woods(s, ...); water(s, ...)
    s.write()          # _includes/memory-art/waugh2.svg
Silhouette paths a scene wants to share with the 3D renderer go in
s.shapes[name] = path_d; write() also dumps them to assets/memory-3d/<name>.json.
"""
import json
import pathlib
import random

ROOT = pathlib.Path(__file__).resolve().parents[3]
W, H = 1600, 900

# Low-luminance film shadows: no glowing sky, no bright paper inside the scene.
P = {
    "sky_top": "#aeb5b0", "sky_mid": "#bdbfb7", "sky_low": "#c6c0b5",
    "far": "#a6aca4", "far2": "#979e96",
    "mass": "#5f6964", "mass_lo": "#6d766f", "woods": "#56625c",
    "water_hi": "#a3a69d", "water_lo": "#626e69",
    "near": "#2f3935", "near2": "#38433e",
    "mist": "#d2cfc6", "glint": "#dfe0d8", "lamp": "#e9d2a2", "green": "#9fbf9a",
}


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


class Scene:
    def __init__(self, name, seed=3):
        self.name = name
        self.rng = random.Random(seed)
        self.defs = []
        self.layers = {k: [] for k in range(5)}
        self.shapes = {}
        self._ids = 0

    def uid(self, stem):
        self._ids += 1
        return f"{self.name[:3]}-{stem}{self._ids}"

    def add(self, depth, markup):
        self.layers[depth].append(markup)

    def write(self):
        body = []
        for k in range(5):
            if self.layers[k]:
                body.append(f'<g class="mv-d{k}">' + "\n".join(self.layers[k]) + "</g>")
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" aria-hidden="true" class="mv-scene">\n'
               f"<defs>{''.join(self.defs)}</defs>\n" + "\n".join(body) + "\n</svg>\n")
        out = ROOT / "_includes/memory-art" / f"{self.name}.svg"
        out.write_text(svg)
        if self.shapes:
            d = ROOT / "assets/memory-3d"
            d.mkdir(parents=True, exist_ok=True)
            (d / f"{self.name}.json").write_text(json.dumps(self.shapes, indent=1))
        print(out.name, out.stat().st_size)


def blur(s, sd, name=None):
    fid = name or s.uid("b")
    s.defs.append(f'<filter id="{fid}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="{sd}"/></filter>')
    return fid


def foliage_filter(s, seed=8, scale=26, sd=2.2):
    fid = s.uid("fol")
    s.defs.append(f'<filter id="{fid}" x="-10%" y="-20%" width="120%" height="140%">'
                  f'<feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="{seed}"/>'
                  f'<feDisplacementMap in="SourceGraphic" scale="{scale}" xChannelSelector="R" yChannelSelector="G"/>'
                  f'<feGaussianBlur stdDeviation="{sd}"/></filter>')
    return fid


def vgrad(s, stops):
    gid = s.uid("g")
    st = "".join(f'<stop offset="{o}" stop-color="{c}"' + (f' stop-opacity="{a}"' if a is not None else "") + "/>"
                 for o, c, a in [(x + (None,))[:3] if len(x) == 2 else x for x in stops])
    s.defs.append(f'<linearGradient id="{gid}" x2="0" y2="1">{st}</linearGradient>')
    return gid


def sky(s, bottom, top=-140, colors=None):
    """A muted sky down to `bottom`, with thin drifting cloud."""
    c = colors or (P["sky_top"], P["sky_mid"], P["sky_low"])
    g = vgrad(s, [(0, c[0]), (.6, c[1]), (1, c[2])])
    s.add(0, f'<rect x="-500" y="{top}" width="2600" height="{bottom - top + 4}" fill="url(#{g})"/>')
    b = blur(s, 9)
    s.add(0, f'<g filter="url(#{b})" fill="{P["mist"]}" opacity=".45">'
             '<animateTransform attributeName="transform" type="translate" values="0 0;90 0;0 0" dur="120s" repeatCount="indefinite"/>'
             f'<ellipse cx="300" cy="{f(bottom * .34)}" rx="260" ry="14"/><ellipse cx="1150" cy="{f(bottom * .24)}" rx="320" ry="12"/>'
             f'<ellipse cx="760" cy="{f(bottom * .5)}" rx="220" ry="9"/></g>')


def band(s, depth, y, color, amp=12, bottom=None, seed=0):
    """A soft undulating land band whose top edge sits near y."""
    r = random.Random(seed)
    pts = []
    for x in range(-500, 2201, 150):
        pts.append(f"{x} {f(y + r.uniform(-amp, amp))}")
    path = f"M-500 {bottom or y + 60}L" + "L".join(pts) + f"L2100 {bottom or y + 60}Z"
    s.add(depth, f'<path d="{path}" fill="{color}"/>')


def woods(s, depth, blobs, color=None, base=None, seed=8):
    """Tree masses: (cx, cy, rx, ry) blobs, broken up by noise."""
    fid = foliage_filter(s, seed=seed)
    inner = "".join(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/>' for cx, cy, rx, ry in blobs)
    if base is not None:
        inner += f'<rect x="-500" y="{base[0]}" width="2600" height="{base[1] - base[0]}"/>'
    s.add(depth, f'<g filter="url(#{fid})" fill="{color or P["woods"]}">{inner}</g>')


def silhouette(s, depth, d, fill=None, gid=None, name=None):
    """A solid shape. Pass name to share it with the 3D renderer."""
    fid = blur(s, 1.1)
    attrs = f' id="{gid}"' if gid else ""
    s.add(depth, f'<path{attrs} d="{d}" fill="{fill or P["mass"]}" filter="url(#{fid})"/>')
    if name:
        s.shapes[name] = d


def lights(s, depth, points, color=None, size=(3, 5), reflect_at=None):
    """Small lit windows or lamps that breathe slowly; optional reflection."""
    out = []
    for k, (x, y) in enumerate(points):
        out.append(f'<rect x="{x}" y="{y}" width="{size[0]}" height="{size[1]}" rx=".8" fill="{color or P["lamp"]}" opacity=".5">'
                   f'<animate attributeName="opacity" values=".35;.85;.5;.8;.35" dur="{9 + k * 1.7:.1f}s" repeatCount="indefinite"/></rect>')
        if reflect_at is not None:
            out.append(f'<rect x="{x - 1}" y="{2 * reflect_at - y - 2}" width="{size[0] + 2}" height="2" fill="{color or P["lamp"]}" opacity=".3">'
                       f'<animate attributeName="opacity" values=".1;.45;.15" dur="{5 + k:.1f}s" repeatCount="indefinite"/></rect>')
    s.add(depth, "".join(out))


def water(s, depth, y, reflect_id=None, bottom=920, colors=None, reflect_opacity=.55):
    """Still water from y down, holding a rippled reflection of `reflect_id`."""
    c = colors or (P["water_hi"], P["water_lo"], P["near2"])
    g = vgrad(s, [(0, c[0]), (.3, c[1]), (1, c[2])])
    s.add(depth, f'<rect x="-500" y="{y}" width="2600" height="{bottom - y}" fill="url(#{g})"/>')
    if reflect_id:
        rid, mid, fade = s.uid("rip"), s.uid("m"), s.uid("fade")
        s.defs.append(f'<filter id="{rid}" filterUnits="userSpaceOnUse" x="-500" y="{y}" width="2600" height="300">'
                      '<feTurbulence type="turbulence" baseFrequency=".004 .09" numOctaves="2" seed="5">'
                      '<animate attributeName="baseFrequency" dur="11s" values=".004 .09;.006 .11;.004 .09" repeatCount="indefinite"/></feTurbulence>'
                      '<feDisplacementMap in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="1.6"/></filter>'
                      f'<linearGradient id="{fade}" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'
                      f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="-500" y="{y}" width="2600" height="300"><rect x="-500" y="{y}" width="2600" height="220" fill="url(#{fade})"/></mask>')
        s.add(depth, f'<g mask="url(#{mid})"><g filter="url(#{rid})" opacity="{reflect_opacity}"><use href="#{reflect_id}" transform="translate(0 {2 * y}) scale(1 -1)"/></g></g>')


def mist(s, depth, y, spans, opacity=.5, drift=70):
    fid = blur(s, 9)
    inner = "".join(f'<ellipse cx="{cx}" cy="{y + dy}" rx="{rx}" ry="{ry}" fill="{P["mist"]}"/>' for cx, dy, rx, ry in spans)
    s.add(depth, f'<g filter="url(#{fid})" opacity="{opacity}"><animateTransform attributeName="transform" type="translate" '
                 f'values="-60 0;80 0;-60 0" dur="{drift}s" repeatCount="indefinite"/>{inner}</g>')


def glints(s, depth, y0, y1, n=24, x0=-200, x1=1800):
    r = s.rng
    out = []
    for _ in range(n):
        y = r.uniform(y0, y1)
        t = (y - y0) / max(1, y1 - y0)
        dur = r.uniform(5, 9)
        out.append(f'<path d="M{f(r.uniform(x0, x1))} {f(y)}h{f(20 + t * 90)}" stroke="{P["glint"]}" stroke-width="{f(.8 + t * 1.6)}" stroke-linecap="round" opacity="0">'
                   f'<animate attributeName="opacity" values="0;.45;0" dur="{dur:.1f}s" begin="{r.uniform(0, dur):.1f}s" repeatCount="indefinite"/>'
                   f'<animateTransform attributeName="transform" type="translate" values="0 0;{f(14 + t * 30)} 0" dur="{dur:.1f}s" repeatCount="indefinite"/></path>')
    s.add(depth, "".join(out))


def reeds(s, depth, spans, color=None):
    """Reeds rooted along (x0, x1, base) spans; each sways from its own root."""
    r = s.rng
    c = color or P["near"]
    out = []
    for x0, x1, base, n in spans:
        for k in range(n):
            x = r.uniform(x0, x1)
            h = r.uniform(70, 210)
            lean = r.uniform(-24, 24)
            y = base + r.uniform(-10, 30)
            dur = r.uniform(4.5, 8)
            amp = r.uniform(1.5, 3.5)
            out.append(f'<path d="M{f(x)} {f(y)}Q{f(x + lean * .4)} {f(y - h * .6)} {f(x + lean)} {f(y - h)}" stroke="{c}" stroke-width="{f(r.uniform(1.4, 3))}" fill="none" stroke-linecap="round">'
                       f'<animateTransform attributeName="transform" type="rotate" values="0 {f(x)} {f(y)};{f(amp)} {f(x)} {f(y)};0 {f(x)} {f(y)}" dur="{dur:.1f}s" repeatCount="indefinite" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/></path>')
            if k % 5 == 0:
                out.append(f'<ellipse cx="{f(x + lean)}" cy="{f(y - h + 10)}" rx="3" ry="11" fill="{c}" transform="rotate({f(lean * .6)} {f(x + lean)} {f(y - h + 10)})"/>')
    s.add(depth, "".join(out))


def birds(s, depth, paths, color="#4d5652"):
    out = []
    for k, p in enumerate(paths):
        out.append(f'<path d="M-3 0Q-1.5-2 0 0Q1.5-2 3 0" stroke="{color}" stroke-width="1" fill="none">'
                   f'<animate attributeName="d" values="M-3 0Q-1.5-2 0 0Q1.5-2 3 0;M-3-.6Q-1.5 1 0 0Q1.5 1 3-.6;M-3 0Q-1.5-2 0 0Q1.5-2 3 0" dur="{.7 + k * .15:.2f}s" repeatCount="indefinite"/>'
                   f'<animateMotion path="{p}" dur="{34 + k * 11}s" repeatCount="indefinite"/></path>')
    s.add(depth, "".join(out))


def bank(s, depth, d, color=None):
    s.add(depth, f'<path d="{d}" fill="{color or P["near"]}"/>')


def radial(s, stops, cx=.5, cy=.5, r=.5):
    gid = s.uid("r")
    st = "".join(f'<stop offset="{o}" stop-color="{c}" stop-opacity="{a}"/>' for o, c, a in stops)
    s.defs.append(f'<radialGradient id="{gid}" cx="{cx}" cy="{cy}" r="{r}">{st}</radialGradient>')
    return gid


def drift_down(s, depth, shapes, x, y0, y1, dx, dur, begin=0, rot=40, fill=None, opacity=.5, blur_id=None, movable=False):
    """A shape (or shadow of one) falling slowly on a diagonal and fading, forever."""
    b = f' filter="url(#{blur_id})"' if blur_id else ""
    marker = ' data-memory-object="leaf"' if movable else ''
    s.add(depth, f'<g opacity="0"{b}{marker}><animate attributeName="opacity" values="0;{opacity};{opacity};0" keyTimes="0;.15;.8;1" dur="{dur}s" begin="{begin}s" repeatCount="indefinite"/>'
                 f'<animateTransform attributeName="transform" type="translate" values="{f(x)} {f(y0)};{f(x + dx)} {f(y1)}" dur="{dur}s" begin="{begin}s" repeatCount="indefinite"/>'
                 f'<g><animateTransform attributeName="transform" type="rotate" values="0;{rot};{-rot * .4};{rot * .6}" dur="{dur}s" begin="{begin}s" repeatCount="indefinite"/>'
                 f'<path d="{shapes}" fill="{fill or P["near"]}"/></g></g>')
