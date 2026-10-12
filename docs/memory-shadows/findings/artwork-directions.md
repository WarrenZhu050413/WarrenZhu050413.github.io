# Artwork directions for the memory essay

These are proposed visual references, not claims that the current scenes reproduce these works. Keep them out of the essay itself: the writing remains Warren's. Use the references for composition, light, scale and restraint, without importing their images into the page.

| Scene | Reference | What to take |
| --- | --- | --- |
| Nabokov | [Blue morpho specimens, Natural History Museum](https://www.nhm.ac.uk/discover/spotlight-blue-morpho.html); [Friedrich, Two Men Contemplating the Moon](https://www.metmuseum.org/art/collection/search/438417) | Fine blue scale patterns and a dark wing edge; a small living thing against an immense dark field. The butterfly design is an interpretation, not a species plate. |
| Burns | [Dürer, Young Hare](https://sammlungenonline.albertina.at/objects/39222/feldhase) | An animal's bodily weight and a few attentive details. Preserve the mouse's species and the field from Burns; do not substitute a hare. |
| Brideshead | [Whistler, Nocturne: Palaces](https://www.metmuseum.org/art/collection/search/359320) | The building as one grand, low tonal mass. A few vertical reflections carry the architecture; do not enumerate every window. Keep Castle Howard's outline. |
| Nalan | [Ni Zan, The Rongxi Studio](https://theme.npm.edu.tw/exh109/Labels/digital/en.html) | Sparse dry branches and a large interval of untouched space. Let the window and one leaf carry the scene. |
| Hemingway | [Caillebotte, Paris Street; Rainy Day](https://publications.artic.edu/caillebotte/reader/paintingsanddrawings/section/574/p-42) | Receding street planes, wet paving, an intimate human scale inside a spacious city. Avoid filling the frame with rain effects. |
| Wong | [Hammershøi, Interior. Woman Reading](https://hammershoi.smk.dk/artwork/interior-woman-reading/) | A threshold, an oblique light, a room whose silence remains. Translate that restraint to the existing corridor; keep the film's period and glass motif. |
| Li Qingzhao | [Chardin, Soap Bubbles](https://www.metmuseum.org/art/collection/search/435888) | Quiet domestic attention and a fragile, momentary act. Use the cup, book edges and tea stain; do not add a bubble as a literal symbol. |
| Pushkin / Sindbad | [Hammershøi, Interior. Woman Reading](https://hammershoi.smk.dk/artwork/interior-woman-reading/) | Paper and a reading light, with the surrounding room held back. A page can move almost imperceptibly; handwriting should come only from the supplied poem. |
| Thackeray | [Turner, Rain, Steam, and Speed](https://www.nationalgallery.org.uk/paintings/catalogues/egerton-2000/rain-steam-and-speed-the-great-western-railway) | Rails converging into weather; the train emerges and takes its time to pass. Retain a clear silhouette and let the atmosphere erase the distance. |
| Silent Gatsby painting | [Whistler, Nocturne: Blue and Silver—Chelsea](https://www.whistlerpaintings.gla.ac.uk/catalogue/display/?mid=y103&xml=his) | An almost empty horizontal field, very few lights and interrupted reflections. Keep the literary text removed. |

## Controls and cursor

The [Square progress example on Mobbin](https://mobbin.com/screens/c4df63a3-d65b-40ca-9c11-196eb4c545e0) shows how a single circular mark can carry waiting. The [Paramount+ player](https://mobbin.com/screens/b328a422-e478-4885-9209-87312111b229) and [Discord player](https://mobbin.com/screens/bfa22bd3-2963-4687-9ff1-35e468c39c6a) use more controls than this essay needs. Our version takes only a tiny progress ring and downward arrow, no transport bar or sidebar. The remaining time appears on hover or keyboard focus; clicking always overrides the wait. The browser scrollbar is visually hidden only on the enhanced essay.

The bespoke cursor is a native 32px SVG lens with a fine rim, one glint, and a short handle. It uses a plus on a world that can open, a minus over the expanded backdrop, and leaves quotation text with its ordinary text cursor. No additional per-frame cursor renderer.

## Butterfly and sound implementation (superseded sound sketch)

The blue butterfly has mirrored forewings and scalloped hindwings, layered, desaturated blue gradients, branching veins, tiny pale margin marks, hindwing eyespots and repeating fine scale marks clipped to the wings. Existing wing hinges, the slow 60-second route and cursor-responsive arcs remain. Fine details remain, but their contrast is reduced under a soft glass veil. The butterfly has no drop shadow, reaches roughly half opacity, and fades in and out over longer intervals so it belongs to the same distant atmosphere as the paintings.

The optional sound is a synthesized, band-limited paper flutter: softly filtered noise envelopes, spaced irregularly 1.1–2.7 seconds apart, with minimal left/right placement following the butterfly. No music, notes, voices, recording download or microphone access. It starts silent; the small speaker toggles it only after a click, and it stops when the butterfly leaves or is skipped. Hidden tabs and open quotations are silent. The master gain is 0.008, subject to the listener's device volume. This is an imagined accompaniment, not a biological recording.

Other scenes stay silent in this pass. Possible later sounds should be infrequent: one distant rail hush for the train, one page settling for Sindbad, a near-inaudible water wash for the bay. No ten-track ambient soundtrack.

## Verification

Checked in the live Chrome preview: blue wing gradients and details render; the ring replaces the old line; the native scrollbar is hidden; time remains available in the hover/focus cue and accessible name. The lens asset is applied on openable paintings, the minus lens on the dialog backdrop, and text selection retains its text cursor. Open/close still works. Sound starts in a suspended audio context and runs only after its toggle is clicked. Skipping produced a closed Web Audio context and removed its control, then advanced to Burns; the butterfly faded out and was removed. No console errors. SVG XML, JavaScript syntax and whitespace checks passed. Subjective loudness still depends on the playback device and is for Warren to judge in the preview.

## Current music

Warren rejected the synthetic flutter and requested the Rachmaninoff prelude associated with the birth of his first child. LA Phil programme notes identify E-flat major, Op. 23, No. 6. The active page now uses an unchanged, CC BY-SA 4.0 live recording performed by Giorgi Latso and supplied by Asuas via Wikimedia Commons. Source and license are preserved in assets/audio/ATTRIBUTION.md and in the music control credits.

The small bottom-right play/pause button replaces the old sound toggle. It starts silent, downloads no audio until clicked, plays at 28 percent browser volume, and continues across scenes independently of their timing. No loop, synthetic wing noise, or large embedded video.
