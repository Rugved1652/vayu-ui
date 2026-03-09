"use client";

import { AudioPlayer, useAudioPlayer, Track } from "vayu-ui";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader2 } from "lucide-react";

const tracks: Track[] = [
  { id: "1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", title: "Neon Dreams", artist: "Synthwave" },
  { id: "2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", title: "Electric Soul", artist: "Funky" },
];

const PlayerUI = () => {
  const player = useAudioPlayer();
  
  // Screen Reader Announcer for track changes
  const announcement = player.isPlaying 
    ? `Playing ${player.currentTrack?.title}` 
    : `Paused ${player.currentTrack?.title}`;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    player.seek(percent * player.duration);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 border border-gray-200 relative">
      
      {/* Accessibility Live Region - Screen readers announce this when it changes */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {/* Track Info */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 truncate">
          {player.currentTrack?.title || "Select a track"}
        </h2>
        <p className="text-sm text-gray-500 truncate">
          {player.currentTrack?.artist || "Unknown Artist"}
        </p>
      </div>

      {/* Progress Bar */}
      <div 
        className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer group"
        onClick={handleSeek}
        {...player.getProgressProps({ 
          className: "w-full h-2 bg-gray-200 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
        })}
      >
        {/* Buffer */}
        <div 
          className="absolute h-full bg-gray-300 rounded-full"
          style={{ width: `${(player.buffered / player.duration) * 100}%` }}
        />
        {/* Progress */}
        <div 
          className="absolute h-full bg-blue-600 rounded-full"
          style={{ width: `${(player.currentTime / player.duration) * 100}%` }}
        />
        {/* Thumb (Visual only) */}
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
             style={{ left: `${(player.currentTime / player.duration) * 100}%`, transform: 'translate(-50%, -50%)' }} 
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-gray-500 font-mono mt-2 mb-4">
        <span>{player.formatTime(player.currentTime)}</span>
        <span>{player.formatTime(player.duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        
        <button {...player.getPrevButtonProps({ 
          className: "p-2 rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50" 
        })}>
          <SkipBack className="w-6 h-6 text-gray-700" />
        </button>

        <button {...player.getPlayButtonProps({ 
          className: "w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        })}>
          {player.isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : player.isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>

        <button {...player.getNextButtonProps({ 
          className: "p-2 rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50" 
        })}>
          <SkipForward className="w-6 h-6 text-gray-700" />
        </button>

      </div>

      {/* Volume */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button 
          onClick={player.toggleMute}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={player.isMuted ? "Unmute" : "Mute"}
        >
          {player.isMuted ? <VolumeX className="w-5 h-5 text-gray-500"/> : <Volume2 className="w-5 h-5 text-gray-500"/>}
        </button>
        
        <input 
          {...player.getVolumeProps({ 
            className: "w-24 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          })} 
        />
      </div>
    </div>
  );
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <AudioPlayer.Root track={tracks[0]} playlist={tracks}>
        <PlayerUI />
      </AudioPlayer.Root>
    </div>
  );
}