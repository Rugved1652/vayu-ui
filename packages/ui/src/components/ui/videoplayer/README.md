# VideoPlayer

## Anatomy

- `videoplayer.tsx` — Composition: Root component + context + core logic
- `video.tsx` — UI: Video element wrapper
- `controls.tsx` — UI: Controls container
- `progress.tsx` — UI: Progress bar with seeking + hover time preview
- `volume.tsx` — UI: Volume control with expandable slider
- `buttons.tsx` — UI: PlayPause, Skip, TimeDisplay, Fullscreen, Settings, Subtitles, Download, LoadingOverlay, CenterPlayButton
- `utils.ts` — Helpers: formatTime, VIDEO_BTN
- `types.ts` — Types: TypeScript interfaces
- `index.ts` — Public API: Exports

## Use Cases

- Video playback with custom compound controls
- Keyboard shortcuts (Space, Arrows, J/K/L, M, F, C, 0/Home, End)
- Auto-hiding controls with configurable delay
- Fullscreen toggle, subtitle toggling, and video download
