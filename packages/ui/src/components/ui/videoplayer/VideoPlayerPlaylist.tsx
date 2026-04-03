"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { useVideoPlayer } from "./VideoPlayer";
import type {
  VideoPlayerSourceProps,
  VideoPlayerPlaylistProps,
  VideoPlayerTrackItemProps,
  VideoPlayerTrackInfoProps,
} from "./types";

// ============================================================================
// Source (renderless — sets a single track)
// ============================================================================

export const VideoPlayerSource = ({ src, title, artist, poster, subtitleSrc }: VideoPlayerSourceProps) => {
  const { playTrack, playlist } = useVideoPlayer();

  // On mount, find and play the matching track
  if (typeof window === "undefined") return null;

  const trackIndex = playlist.findIndex((t) => t.src === src);
  if (trackIndex >= 0) {
    // Defer to avoid setState during render
    setTimeout(() => playTrack(trackIndex), 0);
  }

  return null;
};

VideoPlayerSource.displayName = "VideoPlayer.Source";

// ============================================================================
// Playlist container
// ============================================================================

export const VideoPlayerPlaylist = forwardRef<HTMLDivElement, VideoPlayerPlaylistProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="list"
        aria-label="Video playlist"
        className={clsx("flex flex-col gap-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

VideoPlayerPlaylist.displayName = "VideoPlayer.Playlist";

// ============================================================================
// Track item
// ============================================================================

export const VideoPlayerTrackItem = forwardRef<HTMLButtonElement, VideoPlayerTrackItemProps>(
  ({ track, activeClassName, showIndex = false, className, ...props }, ref) => {
    const { currentTrackIndex, playlist, playTrack, isPlaying } = useVideoPlayer();

    const trackIndex = playlist.findIndex((t) => t.id === track.id);
    const isActive = currentTrackIndex === trackIndex;

    return (
      <button
        ref={ref}
        role="listitem"
        type="button"
        aria-selected={isActive}
        onClick={() => playTrack(trackIndex)}
        className={clsx(
          "w-full text-left px-3 py-2 rounded-control transition-colors",
          "hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus",
          isActive && "bg-brand/10 text-brand",
          className,
          isActive && activeClassName
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          {showIndex && (
            <span className="text-xs text-muted-content w-6 text-center shrink-0">
              {isPlaying && isActive ? "▶" : trackIndex + 1}
            </span>
          )}
          {track.poster && (
            <img
              src={track.poster}
              alt=""
              className="w-16 h-10 rounded-control object-cover shrink-0"
              aria-hidden="true"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{track.title}</p>
            {track.artist && (
              <p className="text-xs text-muted-content truncate">{track.artist}</p>
            )}
          </div>
        </div>
      </button>
    );
  }
);

VideoPlayerTrackItem.displayName = "VideoPlayer.Track";

// ============================================================================
// TrackInfo display
// ============================================================================

export const VideoPlayerTrackInfo = forwardRef<HTMLDivElement, VideoPlayerTrackInfoProps>(
  ({ showPoster = true, className, ...props }, ref) => {
    const { currentTrack } = useVideoPlayer();

    if (!currentTrack) {
      return (
        <div ref={ref} className={clsx("text-center py-4", className)} {...props}>
          <p className="text-muted-content">No video selected</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={clsx("flex items-center gap-4", className)} {...props}>
        {showPoster && currentTrack.poster && (
          <img
            src={currentTrack.poster}
            alt={currentTrack.title}
            className="w-20 h-12 rounded-surface object-cover shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-surface-content truncate">
            {currentTrack.title}
          </p>
          {currentTrack.artist && (
            <p className="text-xs text-muted-content truncate">{currentTrack.artist}</p>
          )}
        </div>
      </div>
    );
  }
);

VideoPlayerTrackInfo.displayName = "VideoPlayer.TrackInfo";
