"""Side-by-side sheet of reference crops and renders.

Blender --background --python compare.py -- out.png "a.png|b.png" "c.png|d.png" "e.png" ...
Each argument is one row; images in a row are scaled to a common height.
"""
import bpy, sys
import numpy as np

ARGS = sys.argv[sys.argv.index('--') + 1:]
OUT, ROWS = ARGS[0], [row.split('|') for row in ARGS[1:]]
WIDTH, GAP = 1800, 12

def load(path):
    img = bpy.data.images.load(path)
    px = np.array(img.pixels[:], np.float32).reshape(img.size[1], img.size[0], 4)
    return px

def resize(px, h, w):
    ys = np.linspace(0, px.shape[0] - 1, h); xs = np.linspace(0, px.shape[1] - 1, w)
    y0 = np.floor(ys).astype(int); x0 = np.floor(xs).astype(int)
    y1 = np.minimum(y0 + 1, px.shape[0] - 1); x1 = np.minimum(x0 + 1, px.shape[1] - 1)
    fy = (ys - y0)[:, None, None]; fx = (xs - x0)[None, :, None]
    top = px[y0][:, x0] * (1 - fx) + px[y0][:, x1] * fx
    bottom = px[y1][:, x0] * (1 - fx) + px[y1][:, x1] * fx
    return top * (1 - fy) + bottom * fy

rows = []
for row in ROWS:
    imgs = [load(p) for p in row]
    aspect = sum(i.shape[1] / i.shape[0] for i in imgs)
    h = int((WIDTH - GAP * (len(imgs) - 1)) / aspect)
    strip = np.zeros((h, WIDTH, 4), np.float32); strip[..., 3] = 1; x = 0
    for i in imgs:
        w = int(round(i.shape[1] * h / i.shape[0])); w = min(w, WIDTH - x)
        strip[:, x:x + w] = resize(i, h, w); x += w + GAP
    rows.append(strip)
sheet = np.zeros((sum(r.shape[0] for r in rows) + GAP * (len(rows) - 1), WIDTH, 4), np.float32); sheet[..., 3] = 1
y = sheet.shape[0]
for r in rows:
    sheet[y - r.shape[0]:y] = r; y -= r.shape[0] + GAP
out = bpy.data.images.new('sheet', WIDTH, sheet.shape[0])
out.pixels.foreach_set(sheet.ravel())
out.filepath_raw = OUT; out.file_format = 'PNG'; out.save()
print('wrote', OUT, sheet.shape)
