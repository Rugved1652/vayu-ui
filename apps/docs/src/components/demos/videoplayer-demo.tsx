"use client";

import { VideoPlayer } from "vayu-ui";

export default function VideoPlayerDemo() {
    return (
        <div className="not-prose flex flex-col gap-10 w-full max-w-2xl">
            {/* ── Full player ── */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Full player with controls
                </p>
                <VideoPlayer.Root className="rounded-xl overflow-hidden">
                    <VideoPlayer.Video
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        poster="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg"
                    />
                    <VideoPlayer.CenterPlayButton />
                    <VideoPlayer.LoadingOverlay />
                    <VideoPlayer.Controls>
                        <VideoPlayer.ProgressBar />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <VideoPlayer.PlayPauseButton />
                                <VideoPlayer.SkipBackwardButton />
                                <VideoPlayer.SkipForwardButton />
                                <VideoPlayer.VolumeControl />
                                <VideoPlayer.TimeDisplay />
                            </div>
                            <div className="flex items-center gap-1">
                                <VideoPlayer.SubtitlesButton />
                                <VideoPlayer.DownloadButton />
                                <VideoPlayer.SettingsButton />
                                <VideoPlayer.FullscreenButton />
                            </div>
                        </div>
                    </VideoPlayer.Controls>
                </VideoPlayer.Root>
            </div>

            {/* ── Minimal ── */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Minimal
                </p>
                <VideoPlayer.Root
                    autoHideControls={false}
                    className="rounded-xl overflow-hidden"
                >
                    <VideoPlayer.Video
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                        poster="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/800px-Elephants_Dream_s5_both.jpg"
                    />
                    <VideoPlayer.CenterPlayButton />
                    <VideoPlayer.Controls>
                        <VideoPlayer.ProgressBar showBuffer={false} />
                        <div className="flex items-center gap-2">
                            <VideoPlayer.PlayPauseButton />
                            <VideoPlayer.TimeDisplay className="flex-1" />
                            <VideoPlayer.FullscreenButton />
                        </div>
                    </VideoPlayer.Controls>
                </VideoPlayer.Root>
            </div>
        </div>
    );
}
