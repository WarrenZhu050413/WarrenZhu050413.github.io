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
bend in the breeze without postponing its arrival. Scene scripts report their
actual movement to `memoryGestures`; the sound layer reads that movement rather
than maintaining its own choreography. The train retains its separate mix.

A world is unseen, present, then a print. Present worlds sample the same score,
including inside the enlarged dialog. Closing the dialog catches the reading
up to the score; opening it does not reset or freeze a live world. Settled prints
release their WebGL resources. Reduced motion shows static worlds and readable
text instead of requiring the timed journey.

The opening and Burns use one `fieldMouse` geometry factory. Their renderers and
camera scales differ; anatomy does not. The mouse crosses at 26 seconds; the
butterfly leaves by 31 seconds. Burns continues in the same composition until
Brideshead at 70 seconds. The 53-second stanza is not another empty field scene.

Build the main renderer with `sh prototypes/opus-memory/three/build.sh`.
Run media/clock regressions with
`node --test prototypes/opus-memory/checks/timeline.cjs`.
The cat study has separate ownership and a separate build entry; do not silently
replace its assets while a model is being reviewed.
