import { Marquee, MarqueeContent, MarqueeItem } from "vayu-ui";

export default function MarqueeDemo() {
    return (
        <div className="flex flex-col gap-10">
            {/* Basic Example */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Default (Normal Speed)</h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                    <Marquee>
                        <MarqueeContent>
                            {["React", "Next.js", "Tailwind", "TypeScript", "Vercel"].map((item) => (
                                <MarqueeItem key={item} className="mx-4">
                                    <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
                                        <p className="text-sm font-medium">{item}</p>
                                    </div>
                                </MarqueeItem>
                            ))}
                        </MarqueeContent>
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-white dark:from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-white dark:from-background"></div>
                </div>
            </div>

            {/* Fast Reverse */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Fast Speed & Right Direction</h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                    <Marquee speed="fast" direction="right">
                        <MarqueeContent>
                            {["Design", "Develop", "Ship", "Scale", "Iterate"].map((item) => (
                                <MarqueeItem key={item} className="mx-4">
                                    <div className="px-4 py-2 bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 rounded-md">
                                        <p className="text-sm font-medium">{item}</p>
                                    </div>
                                </MarqueeItem>
                            ))}
                        </MarqueeContent>
                    </Marquee>
                </div>
            </div>

            {/* Slow */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Slow</h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                    <Marquee speed="slow">
                        <MarqueeContent>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <MarqueeItem key={i} className="mx-4">
                                    <div className="w-[100px] h-[60px] bg-neutral-200 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                                        <span className="text-xs text-neutral-500">Image {i + 1}</span>
                                    </div>
                                </MarqueeItem>
                            ))}
                        </MarqueeContent>
                    </Marquee>
                </div>
            </div>
        </div>
    );
}
