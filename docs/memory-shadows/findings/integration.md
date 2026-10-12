# Local essay integration, 11 October 2026

Preview: http://localhost:4000/posts/i-wish-it-were-not-dark/

The actual draft retains its eight quotation blocks and five prose paragraphs. Generated sample paragraphs stay in the separate density study. Quotations are 18px and own prose is 20px, with equal Chinese and English sizing within each role. No source captions, mode picker or post navigation is shown.

All nine shadow scenes now mount Three.js worlds inside the post, with SVG fallbacks. Each quotation and its painting share a side-by-side layout with a small overlap at the dissolved edge. Brideshead and Paris have the quotation on the right; Nalan has it on the left. Own writing stays in the central reading column.

The painting interaction replaces the earlier click and drag experiment. No click produces text or marks, and objects cannot be dragged. Pointer position slowly shifts the viewpoint on both axes, with a 4.5-second easing time; horizontal movement is reduced, and scene time runs at 12 percent of its former rate. Scroll contributes a small horizontal camera shift. Paris has a single arched bridge silhouette and a low curved boat; Wong no longer has the lamp post or passing figure.

Worlds mount only when reached. After a scene is passed, its final frame becomes a print and its GPU context is released. Returning does not revive it; reload starts a new visit. Reduced motion stops animation and keeps text fully readable. The main Jekyll watcher excludes the nested study worktree so study builds cannot reset the page.

Validation: all nine worlds mounted in real Chrome; the six newly integrated worlds were individually checked for their final print transition. The current post shows the side-by-side pairs, no click traces, and no memory-touch script. Source and bundle parse checks pass. Earlier drag and click test results describe the superseded experiment and are not current behavior.

Rebuild: `sh prototypes/opus-memory/three/build.sh`. Tools are pinned to three 0.186.1 and esbuild 0.28.2 in a scratch directory outside Jekyll. The bundle includes license notices and a full Three.js MIT license alongside it. SVG generators are under `prototypes/opus-memory/gen/scenes/`.

This remains an unpublished local draft. No essay commit, push, merge or deployment was performed for this integration.

Nabokov restored: the full user-supplied opening paragraph of Speak, Memory now precedes Burns. A new shadow cradle scene accompanies it. The butterfly is an independent fixed-position SVG outside the scene mask; reaching the scene starts a single 46-second flight across the viewport. No clicks are needed. Reduced motion keeps it stationary with the scene. This brings the essay to nine quotation blocks and ten scenes.
