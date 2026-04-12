'use client';

import { AudioPlayer } from 'vayu-ui';

export default function AudioPlayerDemo() {
  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto py-8">
      <div className="p-6 bg-surface rounded-surface shadow-surface border border-border/20">
        <h3 className="text-h3 font-primary mb-2 text-surface-content">
          Spotify-style Single Track
        </h3>
        <p className="text-text-sm text-muted-content mb-6">
          Demonstrating HLS fallback and playback controls
        </p>
        <AudioPlayer allowMultiple={false} className="max-w-md mx-auto shadow-elevated">
          {/* The Playlist holds tracks invisibly if we just want one */}
          <AudioPlayer.Playlist className="hidden">
            <AudioPlayer.Track
              src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
              title="Mux Demo HLS Stream"
              artist="Mux"
              poster="https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4?auto=format&fit=crop&q=80&w=200&h=200"
            />
          </AudioPlayer.Playlist>

          <div className="flex flex-col">
            <AudioPlayer.TrackInfo className="pt-4 px-4" />

            <AudioPlayer.Controls className="flex-col gap-2 w-full">
              <div className="flex flex-row items-center justify-between w-full">
                <AudioPlayer.Time />
              </div>
              <div className="flex flex-row items-center justify-between w-full mt-2">
                <div className="flex items-center gap-1">
                  <AudioPlayer.Mute />
                  <AudioPlayer.Volume />
                </div>
                <div className="flex items-center gap-4">
                  <AudioPlayer.Previous />
                  <AudioPlayer.PlayPause className="!w-12 !h-12 shadow-md [&>span]:w-6 [&>span]:h-6 [&_svg]:w-6 [&_svg]:h-6" />
                  <AudioPlayer.Next />
                </div>
                <div className="flex items-center gap-1">
                  <AudioPlayer.Rate />
                </div>
              </div>
            </AudioPlayer.Controls>

            <AudioPlayer.Error />
          </div>
        </AudioPlayer>
      </div>

      <div className="p-6 bg-surface rounded-surface shadow-surface border border-border/20">
        <h3 className="text-h3 font-primary mb-2 text-surface-content">
          Full Playlist Flow
        </h3>
        <p className="text-text-sm text-muted-content mb-6">
          Queue management, auto-play next, and separated components
        </p>

        <AudioPlayer
          allowMultiple={false}
          autoPlayNext
          className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-canvas rounded-surface overflow-hidden border border-border/20 shadow-md"
        >
          {/* Left: Player UI */}
          <div className="flex flex-col bg-elevated h-full border-r border-border/10">
            <AudioPlayer.TrackInfo className="p-6 border-b border-border/10 bg-surface/50 h-28" />

            <div className="flex flex-col items-center justify-center flex-1 p-6 gap-6">
              {/* Animated ring when playing */}
              <div className="relative group">
                <div className="absolute inset-0 bg-brand/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <AudioPlayer.PlayPause className="!w-20 !h-20 shadow-elevated relative z-10 [&>span]:w-10 [&>span]:h-10 [&_svg]:w-10 [&_svg]:h-10" />
              </div>

              <div className="w-full space-y-2 mt-4">
                <AudioPlayer.Seek />
                <div className="flex justify-between w-full">
                  <AudioPlayer.Time />
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-2">
                <AudioPlayer.Previous />
                <AudioPlayer.Rate />
                <AudioPlayer.Mute />
                <AudioPlayer.Volume />
                <AudioPlayer.Next />
              </div>
            </div>
          </div>

          {/* Right: Playlist Sidebar */}
          <div className="flex flex-col h-80 md:h-full max-h-[400px] bg-sidebar">
            <div className="p-4 border-b border-border/10 bg-surface text-sm font-semibold text-surface-content sticky top-0 z-10 shadow-sm">
              Up Next
            </div>
            <AudioPlayer.Playlist className="p-2 gap-1 rounded-none border-none">
              <AudioPlayer.Track
                src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
                title="Digital Watch Alarm"
                artist="Google Sounds"
                poster="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=100&h=100"
              />
              <AudioPlayer.Track
                src="https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg"
                title="Cat Purring Close"
                artist="Nature Sounds"
                poster="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=100&h=100"
              />
              <AudioPlayer.Track
                src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                title="Mux Test HLS"
                artist="Streaming Team"
                poster="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=100&h=100"
              />
              <AudioPlayer.Track
                src="https://actions.google.com/sounds/v1/water/rain_on_roof.ogg"
                title="Rain on Roof"
                artist="Nature Sounds"
                poster="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=100&h=100"
              />
            </AudioPlayer.Playlist>
          </div>
        </AudioPlayer>
      </div>
    </div>
  );
}
