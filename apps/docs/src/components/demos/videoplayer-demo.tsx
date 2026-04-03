"use client";

import { VideoPlayer, type VideoTrack } from "vayu-ui";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture2,
  Subtitles,
} from "lucide-react";
import { clsx } from "clsx";

const tracks: VideoTrack[] = [
  {
    id: "1",
    src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    title: "Big Buck Bunny (HLS)",
    artist: "Blender Foundation",
    poster:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg",
  },
  {
    id: "2",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Elephant's Dream",
    artist: "Blender Foundation",
    poster:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/800px-Elephants_Dream_s5_both.jpg",
  },
  {
    id: "3",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    title: "Sintel",
    artist: "Blender Foundation",
    poster:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Sintel_poster.jpg/800px-Sintel_poster.jpg",
  },
];

export default function VideoPlayerDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <VideoPlayer
        track={tracks[0]}
        playlist={tracks}
        className="bg-surface rounded-overlay shadow-elevated border border-border overflow-hidden"
      >
        {/* Video Display + Loading */}
        <div className="relative">
          <VideoPlayer.Video className="rounded-t-surface" />

          <VideoPlayer.Loading>
            <span className="text-elevated text-sm">Buffering...</span>
          </VideoPlayer.Loading>

          <VideoPlayer.Error />
        </div>

        {/* Track Info */}
        <VideoPlayer.TrackInfo className="px-4 pt-3" showPoster />

        {/* Seek Bar */}
        <div className="px-4 pt-2">
          <VideoPlayer.Seek showBuffer showThumb />
        </div>

        {/* Time */}
        <div className="px-4 pt-1">
          <VideoPlayer.Time />
        </div>

        {/* Controls */}
        <VideoPlayer.Controls autoHide autoHideDelay={3000} className="px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-1">
              <VideoPlayer.Previous>
                <SkipBack className="w-5 h-5" />
              </VideoPlayer.Previous>

              <VideoPlayer.PlayPause className="w-10 h-10">
                {(playing) =>
                  playing ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )
                }
              </VideoPlayer.PlayPause>

              <VideoPlayer.Next>
                <SkipForward className="w-5 h-5" />
              </VideoPlayer.Next>

              {/* Volume */}
              <VideoPlayer.Mute className="p-2">
                {(muted) =>
                  muted ? (
                    <VolumeX className="w-4 h-4 text-muted-content" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-muted-content" />
                  )
                }
              </VideoPlayer.Mute>
              <VideoPlayer.Volume className="w-20" />

              {/* Captions */}
              <VideoPlayer.Captions>
                {(enabled) => (
                  <Subtitles
                    className={clsx(
                      "w-4 h-4",
                      enabled ? "text-brand" : "text-muted-content"
                    )}
                  />
                )}
              </VideoPlayer.Captions>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <VideoPlayer.Speed rates={[0.5, 0.75, 1, 1.25, 1.5, 2]} />
              <VideoPlayer.Quality />
              <VideoPlayer.PiP>
                <PictureInPicture2 className="w-4 h-4" />
              </VideoPlayer.PiP>
              <VideoPlayer.Fullscreen>
                {(isFullscreen) =>
                  isFullscreen ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )
                }
              </VideoPlayer.Fullscreen>
            </div>
          </div>
        </VideoPlayer.Controls>

        {/* Playlist */}
        <VideoPlayer.Playlist className="border-t border-border px-2 py-2 max-h-48 overflow-y-auto">
          {tracks.map((track) => (
            <VideoPlayer.Track
              key={track.id}
              track={track}
              showIndex
              className="text-sm"
            />
          ))}
        </VideoPlayer.Playlist>
      </VideoPlayer>
    </div>
  );
}
