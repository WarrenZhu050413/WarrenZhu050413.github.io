# Black cat motion study

This is an isolated Blender-to-Three.js study. It does not replace the cat in
the poem yet. Compare the silhouette, fur, head turn, and three walking cycles
before expanding it to the carry scene or migrating other worlds.

Open `shadow-cat.blend` in Blender. `cat.py` regenerates the mesh, groomed fur,
skeleton, five animation clips, browser asset, and Blender source:

```sh
/Applications/Blender.app/Contents/MacOS/Blender --background \
  --python prototypes/opus-memory/blender/cat.py
sh prototypes/opus-memory/three/build.sh blender-cat-test
```

The generator overwrites `shadow-cat.blend` and `assets/models/memory-cat.glb`.
Save manual sculpting experiments under another filename before regenerating.
Its Cycles preview is `/tmp/memory-cat-blender.png`; `preview.png` is the
reviewed black-coat checkpoint.

With Jekyll running, open `/prototypes/opus-memory/blender-cat/`. The page offers
Replay, a twelve-second time scrubber, and scene-scale/close inspection. Pointer motion turns
the camera. `window.catStudy` exposes clip metadata and measured frame rate.

The coat is one remeshed surface, with separate tapered fur ribbons weighted
at their roots. The rig exports Idle, Look, Walk, Lower, and Carry. Lower and
Carry are preliminary clips, not approved pickup choreography. The preview
demonstrates Look and Walk only. Foot planting and the muzzle socket still need
verification in the final scene before integration.

Checked with Blender 5.2.2 LTS and Three.js 0.186.1. The compressed GLB is about
1.6 MB. The browser study renders shadows for the body and tail only; individual
fur ribbons and small facial details do not need separate shadow passes.
Performance of this isolated study does not establish whole-poem performance.

The Draco glTF decoder in `assets/vendor/draco/` is copied from the pinned
Three.js distribution and licensed under Apache 2.0 (license beside decoder).
