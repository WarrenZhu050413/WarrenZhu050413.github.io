# Unfolding poem experiment

Local preview: http://localhost:4000/posts/i-wish-it-were-not-dark/

The central poem uses Warren's latest dictated sequence: eleven displayed lines, ending in “How is that?”. No new poem text was generated. The earlier page is preserved in `.git/local-backups/memory-before-unfolding-20261011.md`. All nine quotation blocks are unchanged; ten existing paintings remain, including the silent Gatsby bay.

Each of ten scroll passages takes 1.35 viewport heights. The poem starts with two lines and grows to eleven. The reveal counts after each painting are 4, 5, 6, 6, 8, 9, 9, 10, 10, 11. This is provisional visual pacing, not a claim about the meaning of each text.

Scenes use different paths and scales. Brideshead and Paris are broad; Burns and the domestic scenes are smaller. Wong arrives across the viewport. Li and Pushkin rise from below. The fixed-position butterfly can leave Nabokov's mask and cross the poem. No click creates words, and nothing is draggable.

Finished scenes become small oval prints around the central poem, with widths from 155 to 290 CSS pixels at desktop size. They remain there at the end; the separate quotation collection is removed from the enhanced view. Clicking a painting moves the same figure into a native modal dialog and zooms it beside the full quotation. Closing with the outside space, close button, or Escape returns it to the same position and restores keyboard focus. Brideshead's passage remains to the building's right. No quote or painting is cloned.

The existing visual engine retains pointer parallax and the WebGL renderer. The new scroll controller owns scene lifecycle when data-unfolding is true. Set scenes remain frozen on return and release WebGL as before. Reduced motion shows the complete poem and ten clickable prints in a static arrangement, without pinned scroll passages or zoom animations. The no-JavaScript source retains the readable quotation collection. Expanded passages use 19px type with 1.95 line spacing; the central poem uses 1.5 line spacing and larger stanza gaps.

Validation: the draft text was not changed in the click-to-open pass. Real Chrome opened and closed all ten worlds, including Gatsby without a quotation. Escape, outside click, keyboard opening, and focus restoration were checked. Reduced motion retained all ten worlds and all eleven poem lines with no horizontal overflow at 1728 by 941. Each expanded world used the existing frozen image/SVG; no WebGL canvases remained at the end or were added by opening a world. Nabokov's full passage fit in the expanded reading column. No browser console errors. JavaScript syntax and git diff whitespace checks passed. The butterfly no longer reads layout on every airborne frame.


## Timed scenes and cursor response

The first viewing now gates forward progress at 0.64 of each scene. Durations in scene order are 60, 24, 30, 24, 22, 30, 36, 36, 42 and 24 seconds. The opening also waits for the actual butterfly completion event, and the railway scene waits for the actual train completion event. A blocked forward gesture queues one advance when the scene finishes. Earlier scenes remain accessible. Timers pause when the document is hidden or a quotation is open. Reduced motion shows the static complete arrangement and bypasses the waits.

The butterfly's wings now hinge at the shared SVG body origin. The flight lasts 60 seconds and makes bounded, eased arcs around a nearby pointer before rejoining the path. Frozen paintings reuse one faint fog patch per scene rather than continually appending overlapping stamps. A separate shadow train crosses the viewport during Thackeray; it lasts 42 seconds and emits its completion event before the scene can release.

Live Chrome verification: a large wheel scroll and End remained in the first scene with one reached world; the butterfly finished before Burns was released. A full 42-second train preview emitted completion. Opening a quotation held the butterfly, train and remaining-time readings unchanged; closing resumed them. Multiple pointer moves created one fog patch. SVG parsing, JavaScript syntax and whitespace checks passed. The train preview was triggered independently for the timing check; the controller's railway event wiring was inspected in source. No quotation or poem text changed.

The pacing cue is now a small bottom-center countdown and progress hairline beside a downward arrow. It is also the manual override: clicking during a wait releases that scene, gently fades its traveling butterfly/train, and proceeds. When the timed scene ends naturally, the numbers fade away and the arrow remains. A previously queued forward gesture gets a 1.9-second ready indication before advancing. Rewinding cancels that queued transition. There is no sidebar or position index.
