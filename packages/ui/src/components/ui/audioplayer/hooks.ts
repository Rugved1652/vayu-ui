// audioplayer/hooks.ts
// Logic
// Re-exports hooks from audioplayer.tsx to avoid circular context dependency

export {
  useAudioPlayerState,
  useAudioPlayerActions,
  useAudioPlayer,
} from "./audioplayer";
