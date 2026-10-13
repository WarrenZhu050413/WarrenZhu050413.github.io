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
  (Draco, about 2.3 MB, 175,100 triangles, 12 draw calls). It has a decimated
  skinned skin and 9,220 fur cards laid along the coat's locks: about 1,800 finer
  locks for the plume and up to 2,000 for the face, which lie close to the skin
  and use the atlas's two sparse fuzz columns. Face and neck cards shade with the
  skin normal beneath each vertex, so the cheek ruff blends; body cards keep one
  tone per lock. The ears carry 250 thin inner wisps and 600 fringe cards along
  their edges and tip, with no cards on their backs. Head details are merged by
  material into `Eyes`, `Lid rims`, `Ears and covers` and `Nose leather`. Each
  lid is a dark rim plus a skin-coloured cover; the lower lid sits close to the
  eyeball. Each eye sits in an almond socket cut only where the lids open.
  Skinning is per vertex, so the merged meshes keep their lid, ear and head
  bones. The muzzle's short fur is left to a velvet skin.
- `compare.py` builds side-by-side sheets of reference crops and renders.
  `compare-walk.png` sets the cat against the reference; `compare-refine.png`
  (v7 to v8), `compare-next.png` (v8 to v9), `compare-v10.png` (v9 to v10) and
  `compare-v11.png` (v10 to v11) record each refinement.

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

Each still takes 30 to 60 seconds on Metal; `--cpu` renders on the CPU instead.
The first run on a new machine also compiles Cycles kernels, which takes several
minutes. `groom.py` writes `groom.blend` and `export.py` writes `export.blend`
for inspection; neither is committed.

The poem uses this cat. `memory-cat.js` re-exports the browser adapter,
`prototypes/opus-memory/three/src/memory-cat-longhair.js`, which keeps the
`{ root, head, mouth, pose }` contract and adds `ready`, a promise that settles
once the model is posable. The adapter loads the GLB itself with the local
Draco decoder in `assets/vendor/draco/`. The coat cards use alpha-to-coverage,
so the renderer needs `antialias: true`. The study page
`/prototypes/opus-memory/blender-cat/` plays Burns' light, camera and timing,
with a grey stand-in for the mouse. `?t=27` jumps to a time, `?close` follows
the cat and `?face` frames the head.
