# Rachmaninoff — Prelude in E-flat major, Op. 23, No. 6

- Performer: Giorgi Latso.
- Recording: Asuas, live in Beverly Hills, California, 13 April 2019.
- Source: https://commons.wikimedia.org/wiki/File:Rachmaninof_Prelude_E_flat.ogg
- Original audio: https://upload.wikimedia.org/wikipedia/commons/4/4f/Rachmaninof_Prelude_E_flat.ogg
- License: Creative Commons Attribution-ShareAlike 4.0 International, https://creativecommons.org/licenses/by-sa/4.0/
- The original Ogg file is preserved unchanged as `rachmaninoff-op23-no6-latso.ogg`. The earlier Latso preview uses an AAC format conversion, `rachmaninoff-op23-no6-latso.m4a`, for browser compatibility. No musical cuts, speed changes or added effects. The converted recording remains CC BY-SA 4.0. Playback volume is lowered in the browser.

Work identification: https://www.laphil.com/works/seven-preludes-from-op-23 associates this prelude with the birth of Irina. This is the programme note's reported account, not independent verification of the composition date.

## Tempo studies

- `rachmaninoff-op23-no6-latso-90.m4a`: 90% of the original tempo, pitch preserved; approximately 6:07.
- `rachmaninoff-op23-no6-latso-85.m4a`: 85% of the original tempo, pitch preserved; approximately 6:28.
- Changes: uniform time stretching with FFmpeg's `atempo` filter followed by AAC encoding. No cuts, new notes, added reverb or generated performance. Concert pauses remain. These are edited recordings, not separate performances by Latso.
- Both edited audio files are distributed under CC BY-SA 4.0, the same licence as the source. The licence applies to the recordings; it does not relicense the essay's separate text or artwork.
- Reproduce: `ffmpeg -i rachmaninoff-op23-no6-latso.ogg -map_metadata -1 -af atempo=0.90 -c:a aac -b:a 160k -movflags +faststart rachmaninoff-op23-no6-latso-90.m4a` (use `0.85` for the other edit).

## Selected Ashkenazy recording

- File: `rachmaninoff-op23-no6-ashkenazy.m4a`
- Performer: Vladimir Ashkenazy, as identified by the upload.
- Source: https://www.youtube.com/watch?v=G0EBMHFsEwY
- Upload title: Ashkenazy plays Rachmaninov Prelude Op.23 No.6 in E flat major
- Uploader: newFranzFerencLiszt.
- Duration: 180.720907 seconds.
- Changes: audio downloaded as AAC/M4A; no tempo changes, cuts, or added effects. Playback volume is lowered in the browser.
- No Creative Commons or other republication licence was found in the retrieved upload metadata. The CC BY-SA licence above applies only to the Latso recordings, not this file.
- Selected for the local blog preview at Warren's explicit request. The reading follows the recording clock.
- Browser playback uses `rachmaninoff-op23-no6-ashkenazy.mp3`, an MP3 conversion of the selected AAC source (`libmp3lame -q:a 2`). The performance, tempo and cuts are unchanged.
