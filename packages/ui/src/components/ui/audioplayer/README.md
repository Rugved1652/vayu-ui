# AudioPlayer

## Anatomy
- `audioplayer.tsx` — Composition: Root component + context + core logic
- `playlist.tsx` — UI: Playlist + Track subcomponents
- `track-info.tsx` — UI: Track info display
- `controls.tsx` — UI: Controls + PlayPause + Next + Previous + Time
- `progress.tsx` — UI: Seek + Progress (alias)
- `volume.tsx` — UI: Volume + Mute
- `rate.tsx` — UI: Rate control
- `status.tsx` — UI: Loading + Error + Buffer (alias)
- `waveform.tsx` — UI: Waveform visualization
- `hooks.ts` — Logic: (tightly coupled to Root, no separate hooks)
- `utils.ts` — Helpers: formatTime, hashString, pseudoRandom
- `types.ts` — Types: TypeScript interfaces
- `index.ts` — Public API: Exports

## Use Cases
- Single track playback with HLS support
- Playlist management with auto-play next
- Keyboard shortcuts (Space, Arrows, N/P keys)
- Seeded waveform visualization for tracks
