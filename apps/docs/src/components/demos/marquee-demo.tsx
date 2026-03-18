import { Marquee, MarqueeItem } from "vayu-ui";

export default function MarqueeDemo() {
    return (
        <div className="flex flex-col gap-10 not-prose">
            {/* Default with Controls */}
            <div className="space-y-4">
                <h3 className="text-lg font-primary font-medium text-ground-900 dark:text-ground-100">
                    Default (with Pause Control)
                </h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-ground-200 dark:border-ground-700 bg-white dark:bg-ground-900 p-4">
                    <Marquee label="Technologies carousel">
                        {["React", "Next.js", "Tailwind", "TypeScript", "Vercel"].map((item) => (
                            <MarqueeItem key={item} className="mx-4">
                                <div className="px-4 py-2 bg-ground-100 dark:bg-ground-800 rounded-md border border-ground-200 dark:border-ground-700">
                                    <p className="text-sm font-secondary font-medium text-ground-700 dark:text-ground-300">
                                        {item}
                                    </p>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Fast Reverse - No Controls */}
            <div className="space-y-4">
                <h3 className="text-lg font-primary font-medium text-ground-900 dark:text-ground-100">
                    Fast Speed, Right Direction (No Controls)
                </h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-ground-200 dark:border-ground-700 bg-white dark:bg-ground-900 p-4">
                    <Marquee
                        speed="fast"
                        direction="right"
                        showControls={false}
                        label="Development process carousel"
                    >
                        {["Design", "Develop", "Ship", "Scale", "Iterate"].map((item) => (
                            <MarqueeItem key={item} className="mx-4">
                                <div className="px-4 py-2 bg-ground-900 text-white dark:bg-white dark:text-ground-900 rounded-md">
                                    <p className="text-sm font-secondary font-medium">{item}</p>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Slow - No Gradient */}
            <div className="space-y-4">
                <h3 className="text-lg font-primary font-medium text-ground-900 dark:text-ground-100">
                    Slow Speed, No Gradient Fade
                </h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-ground-200 dark:border-ground-700 bg-white dark:bg-ground-900 p-4">
                    <Marquee
                        speed="slow"
                        gradient={false}
                        label="Image gallery carousel"
                    >
                        {Array.from({ length: 5 }).map((_, i) => (
                            <MarqueeItem key={i} className="mx-4">
                                <div className="w-[100px] h-[60px] bg-ground-200 dark:bg-ground-800 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-secondary text-ground-500">
                                        Image {i + 1}
                                    </span>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* No Pause on Hover */}
            <div className="space-y-4">
                <h3 className="text-lg font-primary font-medium text-ground-900 dark:text-ground-100">
                    No Pause on Hover
                </h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-ground-200 dark:border-ground-700 bg-white dark:bg-ground-900 p-4">
                    <Marquee
                        pauseOnHover={false}
                        speed="fast"
                        label="Continuous scrolling text"
                    >
                        {["Breaking News", "Live Updates", "Trending Now", "Top Stories"].map((item) => (
                            <MarqueeItem key={item} className="mx-4">
                                <div className="px-4 py-2">
                                    <p className="text-sm font-secondary font-semibold text-primary-600 dark:text-primary-400">
                                        {item}
                                    </p>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Ping-pong Mode */}
            <div className="space-y-4">
                <h3 className="text-lg font-primary font-medium text-ground-900 dark:text-ground-100">
                    Ping-pong Mode (Bounces Back and Forth)
                </h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-ground-200 dark:border-ground-700 bg-white dark:bg-ground-900 p-4">
                    <Marquee
                        loopMode="ping-pong"
                        speed="normal"
                        label="Ping-pong scrolling content"
                    >
                        {["React", "Next.js", "Tailwind", "TypeScript"].map((item) => (
                            <MarqueeItem key={item} className="mx-4">
                                <div className="px-4 py-2 bg-linear-to-r from-primary-500 to-primary-600 text-white rounded-md">
                                    <p className="text-sm font-secondary font-medium">{item}</p>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Single Pass Mode */}
            <div className="space-y-4">
                <h3 className="text-lg font-primary font-medium text-ground-900 dark:text-ground-100">
                    Single Pass Mode (Scrolls Once and Stops)
                </h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-ground-200 dark:border-ground-700 bg-white dark:bg-ground-900 p-4">
                    <Marquee
                        loopMode="single"
                        speed="slow"
                        showControls={false}
                        label="Single pass scrolling content"
                    >
                        {["One-time", "Announcement", "Message"].map((item) => (
                            <MarqueeItem key={item} className="mx-4">
                                <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded-md">
                                    <p className="text-sm font-secondary font-medium text-amber-800 dark:text-amber-200">{item}</p>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Finite Loop Mode */}
            <div className="space-y-4">
                <h3 className="text-lg font-primary font-medium text-ground-900 dark:text-ground-100">
                    Finite Loop Mode (Loops 3 Times)
                </h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-ground-200 dark:border-ground-700 bg-white dark:bg-ground-900 p-4">
                    <Marquee
                        loopMode="finite"
                        loopCount={3}
                        speed="fast"
                        showControls={false}
                        label="Finite loop scrolling content"
                    >
                        {["Limited", "Time", "Offer", "3x Only"].map((item) => (
                            <MarqueeItem key={item} className="mx-4">
                                <div className="px-4 py-2 bg-rose-500 text-white rounded-md">
                                    <p className="text-sm font-secondary font-medium">{item}</p>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
}
