import { VideoPlayerRoot } from "./VideoPlayer";
import { VideoPlayerVideo } from "./Video";
import {
  VideoPlayerSource,
  VideoPlayerPlaylist,
  VideoPlayerTrackItem,
  VideoPlayerTrackInfo,
} from "./VideoPlayerPlaylist";
import { VideoPlayerControls } from "./VideoPlayerControls";
import {
  VideoPlayerPlayPause,
  VideoPlayerNext,
  VideoPlayerPrevious,
} from "./VideoPlayerPlayback";
import {
  VideoPlayerProgress,
  VideoPlayerSeek,
  VideoPlayerTime,
  VideoPlayerBuffer,
} from "./VideoPlayerProgress";
import { VideoPlayerVolume, VideoPlayerMute } from "./VideoPlayerVolume";
import {
  VideoPlayerFullscreen,
  VideoPlayerPiP,
  VideoPlayerCaptions,
  VideoPlayerQuality,
  VideoPlayerSpeed,
} from "./VideoPlayerAdvanced";
import {
  VideoPlayerLoading,
  VideoPlayerError,
} from "./VideoPlayerStatus";

export {
  useVideoPlayer,
  useVideoPlayerState,
  useVideoPlayerActions,
} from "./VideoPlayer";

export type {
  VideoTrack,
  VideoQuality,
  QualityLevel,
  VideoPlayerState,
  VideoPlayerActions,
  VideoPlayerContextValue,
} from "./types";

// ============================================================================
// Namespace object (compound component pattern)
// ============================================================================

const VideoPlayer = Object.assign(VideoPlayerRoot, {
  Source: VideoPlayerSource,
  Playlist: VideoPlayerPlaylist,
  Video: VideoPlayerVideo,
  Track: VideoPlayerTrackItem,
  TrackInfo: VideoPlayerTrackInfo,
  Controls: VideoPlayerControls,
  PlayPause: VideoPlayerPlayPause,
  Next: VideoPlayerNext,
  Previous: VideoPlayerPrevious,
  Progress: VideoPlayerProgress,
  Seek: VideoPlayerSeek,
  Time: VideoPlayerTime,
  Buffer: VideoPlayerBuffer,
  Volume: VideoPlayerVolume,
  Mute: VideoPlayerMute,
  Fullscreen: VideoPlayerFullscreen,
  PiP: VideoPlayerPiP,
  Captions: VideoPlayerCaptions,
  Quality: VideoPlayerQuality,
  Speed: VideoPlayerSpeed,
  Loading: VideoPlayerLoading,
  Error: VideoPlayerError,
});

export default VideoPlayer;
export { VideoPlayer };
