# Long-haired black cat

Made against `../portrait/reference.png`, the long-haired black cat Warren chose.

- `cat_model.py` is the model. It builds the anatomy in a neutral rest pose as a
  smooth blend of rounded cones and ellipsoids. Each volume belongs to a bone and
  carries its own coat (length, flow, lift, droop). Skin weights come from the
  same volumes. Strands follow the bones of their roots, so a posed still deforms
  as the browser rig does. Poses are solved by aiming bones, with FABRIK for the
  legs. `UPPER_LID` and `LOWER_LID` set how sleepy the cat looks.
- `groom.py` renders Cycles stills of a pose: about 400,000 strands with
  Principled Hair absorption, in the reference's rim light or at Burns scale.
- `export.py` writes the browser asset `assets/models/memory-cat-longhair.glb`
  (Draco, about 1.9 MB). The asset has a decimated skinned skin and about 6,000
  fur cards laid along the coat's locks, plus eyes, lids, nose, ears, ear fur and
  whiskers. The rig includes lid and ear bones. Short face fur is left to a velvet
  skin, because cards that small read as scales.
- `compare.py` builds side-by-side sheets of reference crops and renders.

```sh
B=/Applications/Blender.app/Contents/MacOS/Blender
$B --background --factory-startup --python groom.py -- --view walk     # approach pose, reference light
$B --background --factory-startup --python groom.py -- --view carry    # carry pose, reference's right panel
$B --background --factory-startup --python groom.py -- --view face
$B --background --factory-startup --python groom.py -- --view scene    # Burns distance and haze
$B --background --factory-startup --python export.py                   # browser GLB
$B --background --factory-startup --python compare.py -- compare-walk.png \
  "ref-walk.png|fur-walk.png" "ref-carry.png|fur-carry.png|fur-face.png" "fur-scene.png"
sh ../../three/build.sh blender-cat-test
```

Each still takes 30 to 60 seconds on Metal. The first run on a new machine also
compiles Cycles kernels, which takes several minutes. `groom.py` writes
`groom.blend` and `export.py` writes `export.blend` for inspection; neither is
committed.

The poem uses this cat. `memory-cat.js` re-exports the browser adapter,
`prototypes/opus-memory/three/src/memory-cat-longhair.js`, which keeps the
`{ root, head, mouth, pose }` contract and loads the GLB itself with the local
Draco decoder in `assets/vendor/draco/`. The coat cards use alpha-to-coverage,
so the renderer needs `antialias: true`. The study page
`/prototypes/opus-memory/blender-cat/` plays Burns' light, camera and timing,
with a grey stand-in for the mouse. `?t=27` jumps to a time, `?close` follows
the cat and `?face` frames the head.
