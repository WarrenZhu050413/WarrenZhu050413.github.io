# Memory poem

The soundtrack is the story clock. Animation frames only decide when to paint.

```text
Audio currentTime
      |
memory-timeline.js ---- score (seconds and scene starts)
      |
      +-- unfolding: reading position, overlapping passages, final gathering
      +-- butterfly: flight and mouse handover
      +-- 3D worlds: sceneTime(id), local poses and physical motion
                   |
              rendered gestures
                   |
              quiet scene sound
```

`memory-timeline.js` owns playback time, seek, pause and visibility. The opening
waits for playable audio. A manual skip seeks the audio even when paused.
`memory-unfolding.js` calls `tick()` once per frame. No world increments a private
story clock while a timeline exists. The score ends at 180.72 seconds.

`memory-motion.js` provides easing, bent travel paths and pointer attention.
Cursor influence is bounded and eased separately from story time: a leaf can
bend in the breeze without postponing its arrival. Every live world has a
continuous, small response: grass and rooks in Burns, dust and mist at Brideshead,
leaves and tea steam at Nalan, paper dust at Pushkin, rain at Wong, and wires
and steam at the railway. These offsets are calculated from the current pose,
never accumulated, so moving the pointer cannot cause drift or change a cue. Scene scripts report their
actual movement to `memoryGestures`; the sound layer reads that movement rather
than maintaining its own choreography. The train retains its separate mix.
Camera attention and the cursor candle ease with frame time, including while the
score is paused. The candle fades in and out at restrained intensity; it is removed
before a settled illustration is captured, so prints keep their authored lighting.

A world is unseen, present, then a print. Present worlds sample the same score,
including inside the enlarged dialog. Closing the dialog catches the reading
up to the score; opening it does not reset or freeze a live world. Settled prints
release their WebGL resources. Reduced motion shows static worlds and readable
text instead of requiring the timed journey.

The opening and Burns use one `fieldMouse` geometry factory. Their renderers and
camera scales differ; anatomy does not. The mouse crosses at 26 seconds; the
butterfly leaves by 31 seconds. Burns continues in the same composition until
Brideshead at 70 seconds. The 53-second stanza is not another empty field scene.

The cat is authored and rigged in Blender under `blender/groom/`. Its local Draco
GLB contains the skin, fur cards and skeleton. `memory-cat.js` selects the browser
adapter, which returns `{root, head, mouth, pose}` immediately and attaches the
model after loading. Its `ready` promise lets the world keep its SVG visible until
the model can be posed; a static print waits too. A failed load retains the SVG.
Burns supplies score-derived travel, gait phase and pickup
poses; stance paws counter the actual distance travelled, including braking.
The mouse's posed scruff meets the mouth marker as the cat raises its head.
The separate `blender-cat/` study uses the same asset and adapter, with a stand-in
mouse. Coat and face refinements can change that asset without changing the score.

Build the main renderer with `sh prototypes/opus-memory/three/build.sh`.
Run media/clock regressions with
`node --test prototypes/opus-memory/checks/timeline.cjs`.
The cat study has separate ownership and a separate build entry; do not silently
replace its assets while a model is being reviewed.
