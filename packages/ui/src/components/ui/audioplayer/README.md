# AudioPlayer

## Anatomy

- `Audio.tsx` — Composition: Root component + context + core logic
- `AudioPlaylist.tsx` — UI: Playlist + Track subcomponents
- `AudioTrackInfo.tsx` — UI: Track info display
- `AudioControls.tsx` — UI: Controls + PlayPause + Next + Previous + Time
- `AudioProgress.tsx` — UI: Seek + Progress (alias)
- `AudioVolume.tsx` — UI: Volume + Mute
- `AudioRate.tsx` — UI: Rate control
- `AudioStatus.tsx` — UI: Loading + Error + Buffer (alias)
- `AudioWaveform.tsx` — UI: Waveform visualization
- `utils.ts` — Helpers: formatTime, hashString, pseudoRandom
- `types.ts` — Types: TypeScript interfaces
- `index.ts` — Public API: Exports

## Use Cases

- Single track playback with HLS support
- Playlist management with auto-play next
- Keyboard shortcuts (Space, Arrows, N/P keys)
- Seeded waveform visualization for tracks
