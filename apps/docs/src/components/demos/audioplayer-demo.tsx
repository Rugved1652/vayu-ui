"use client";

import { AudioPlayer, type Track } from "vayu-ui";

const sampleTrack: Track = {
    id: "1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "SoundHelix Song 1",
    artist: "T. Schürger",
    album: "SoundHelix",
};

const playlist: Track[] = [
    sampleTrack,
    {
        id: "2",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        title: "SoundHelix Song 2",
        artist: "T. Schürger",
        album: "SoundHelix",
    },
    {
        id: "3",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        title: "SoundHelix Song 3",
        artist: "T. Schürger",
        album: "SoundHelix",
    },
];

export default function AudioPlayerDemo() {
    return (
        <div className="not-prose flex flex-col gap-10 w-full max-w-lg">
            {/* ── Full player ── */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Full player with playlist
                </p>
                <AudioPlayer.Root
                    track={sampleTrack}
                    playlist={playlist.slice(1)}
                >
                    <AudioPlayer.Audio />
                    <AudioPlayer.Player variant="card">
                        <div className="flex items-center gap-4 mb-4">
                            <AudioPlayer.Artwork size="md" />
                            <AudioPlayer.TrackInfo showAlbum />
                        </div>

                        <AudioPlayer.ProgressBar className="mb-4" />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <AudioPlayer.ShuffleButton />
                                <AudioPlayer.RepeatButton />
                            </div>

                            <div className="flex items-center gap-2">
                                <AudioPlayer.SkipBackwardButton />
                                <AudioPlayer.PlayPauseButton size="lg" />
                                <AudioPlayer.SkipForwardButton />
                            </div>

                            <div className="flex items-center gap-1">
                                <AudioPlayer.VolumeControl />
                                <AudioPlayer.PlaylistButton />
                            </div>
                        </div>

                        <AudioPlayer.LoadingIndicator />
                    </AudioPlayer.Player>
                </AudioPlayer.Root>
            </div>

            {/* ── Minimal player ── */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Minimal
                </p>
                <AudioPlayer.Root track={sampleTrack}>
                    <AudioPlayer.Audio />
                    <AudioPlayer.Player variant="minimal">
                        <div className="flex items-center gap-3">
                            <AudioPlayer.PlayPauseButton size="sm" />
                            <AudioPlayer.TrackInfo className="flex-1" />
                            <AudioPlayer.VolumeControl />
                        </div>
                        <AudioPlayer.ProgressBar
                            showTimestamps={false}
                            className="mt-3"
                        />
                    </AudioPlayer.Player>
                </AudioPlayer.Root>
            </div>
        </div>
    );
}
