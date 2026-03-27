"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    forwardRef,
    type HTMLAttributes,
    type ButtonHTMLAttributes,
} from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./utils";

// ============================================================================
// Types
// ============================================================================

export type SpeedMultiplier = 0.5 | 1 | 1.5 | 2;

export interface GalleryItem {
    src: string;
    alt: string;
}

interface CarouselContextValue {
    currentIndex: number;
    totalItems: number;
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    speed: SpeedMultiplier;
    setSpeed: (speed: SpeedMultiplier) => void;
    loop: boolean;
    goTo: (index: number) => void;
    goNext: () => void;
    goPrevious: () => void;
    interval: number;
    isPausedByHover: boolean;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

const useCarouselContext = () => {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error(
            "Carousel compound components must be used within a Carousel component"
        );
    }
    return context;
};

// ============================================================================
// Utility: Check reduced motion preference
// ============================================================================

const usePrefersReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
};

// ============================================================================
// Root Component
// ============================================================================

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    totalItems: number;
    autoPlay?: boolean;
    interval?: number;
    loop?: boolean;
    defaultSpeed?: SpeedMultiplier;
    defaultIndex?: number;
    children: React.ReactNode;
}

const CarouselBase = forwardRef<HTMLDivElement, CarouselProps>(
    (
        {
            totalItems,
            autoPlay = false,
            interval = 3000,
            loop = true,
            defaultSpeed = 1,
            defaultIndex = 0,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [currentIndex, setCurrentIndex] = useState(defaultIndex);
        const [isPlaying, setIsPlaying] = useState(autoPlay);
        const [speed, setSpeed] = useState<SpeedMultiplier>(defaultSpeed);
        const [isPausedByHover, setIsPausedByHover] = useState(false);
        const prefersReducedMotion = usePrefersReducedMotion();

        // Calculate effective interval based on speed
        const effectiveInterval = interval / speed;

        // Navigation functions
        const goTo = useCallback(
            (index: number) => {
                if (loop) {
                    setCurrentIndex((index + totalItems) % totalItems);
                } else {
                    setCurrentIndex(Math.max(0, Math.min(index, totalItems - 1)));
                }
            },
            [totalItems, loop]
        );

        const goNext = useCallback(() => {
            if (loop || currentIndex < totalItems - 1) {
                setCurrentIndex((prev) => (prev + 1) % totalItems);
            }
        }, [totalItems, loop, currentIndex]);

        const goPrevious = useCallback(() => {
            if (loop || currentIndex > 0) {
                setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
            }
        }, [totalItems, loop, currentIndex]);

        // AutoPlay logic with interval
        useEffect(() => {
            // Don't auto-play if user prefers reduced motion, is paused by hover, or not playing
            if (!isPlaying || prefersReducedMotion || isPausedByHover) {
                return;
            }

            const timer = setInterval(() => {
                if (loop || currentIndex < totalItems - 1) {
                    setCurrentIndex((prev) => (prev + 1) % totalItems);
                } else {
                    // Stop at the end if not looping
                    setIsPlaying(false);
                }
            }, effectiveInterval);

            return () => clearInterval(timer);
        }, [
            isPlaying,
            effectiveInterval,
            loop,
            totalItems,
            currentIndex,
            prefersReducedMotion,
            isPausedByHover,
        ]);

        const contextValue: CarouselContextValue = {
            currentIndex,
            totalItems,
            isPlaying,
            setIsPlaying,
            speed,
            setSpeed,
            loop,
            goTo,
            goNext,
            goPrevious,
            interval,
            isPausedByHover,
        };

        return (
            <CarouselContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    role="region"
                    aria-label="Image carousel"
                    aria-roledescription="carousel"
                    className={cn("relative", className)}
                    onMouseEnter={() => setIsPausedByHover(true)}
                    onMouseLeave={() => setIsPausedByHover(false)}
                    {...props}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        );
    }
);

CarouselBase.displayName = "Carousel";

// ============================================================================
// Viewport Component
// ============================================================================

interface CarouselViewportProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>(
    ({ className, children, ...props }, ref) => {
        const { currentIndex, totalItems, goNext, goPrevious, goTo } = useCarouselContext();

        // Touch handling
        const touchStartX = useRef<number | null>(null);
        const viewportRef = useRef<HTMLDivElement | null>(null);

        const handleTouchStart = (e: React.TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: React.TouchEvent) => {
            if (touchStartX.current === null) return;

            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX.current - touchEndX;

            // Minimum swipe distance of 50px
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goNext();
                } else {
                    goPrevious();
                }
            }

            touchStartX.current = null;
        };

        // Keyboard navigation
        const handleKeyDown = (e: React.KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();
                    goPrevious();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    goNext();
                    break;
                case "Home":
                    e.preventDefault();
                    goTo(0);
                    break;
                case "End":
                    e.preventDefault();
                    goTo(totalItems - 1);
                    break;
            }
        };

        // Merge refs
        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                viewportRef.current = node;
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            },
            [ref]
        );

        return (
            <div
                ref={setRefs}
                role="group"
                aria-label={`Slide ${currentIndex + 1} of ${totalItems}`}
                className={cn(
                    "overflow-hidden relative rounded-surface",
                    className
                )}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                {...props}
            >
                {/* Live region for screen readers */}
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="sr-only"
                >
                    Slide {currentIndex + 1} of {totalItems}
                </div>
                {children}
            </div>
        );
    }
);

CarouselViewport.displayName = "Carousel.Viewport";

// ============================================================================
// Slide Component
// ============================================================================

interface CarouselSlideProps extends HTMLAttributes<HTMLDivElement> {
    index: number;
    children: React.ReactNode;
}

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
    ({ index, className, children, ...props }, ref) => {
        const { currentIndex } = useCarouselContext();
        const isActive = index === currentIndex;

        return (
            <div
                ref={ref}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1}`}
                aria-hidden={!isActive}
                data-index={index}
                data-active={isActive}
                className={cn(
                    "transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CarouselSlide.displayName = "Carousel.Slide";

// ============================================================================
// Previous Button
// ============================================================================

interface CarouselPreviousProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    showLabel?: boolean;
}

const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(
    ({ className, showLabel = false, ...props }, ref) => {
        const { goPrevious, currentIndex, loop, totalItems } = useCarouselContext();
        const isDisabled = !loop && currentIndex === 0;

        return (
            <button
                ref={ref}
                type="button"
                onClick={goPrevious}
                disabled={isDisabled}
                aria-label="Previous slide"
                className={cn(
                    "absolute left-2 top-1/2 -translate-y-1/2 z-10",
                    "flex items-center justify-center",
                    "w-10 h-10 rounded-full",
                    "bg-elevated/90 text-elevated-content",
                    "border border-border shadow-control",
                    "hover:bg-surface hover:border-brand",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                    "disabled:opacity-40 disabled:pointer-events-none",
                    "transition-all duration-150",
                    className
                )}
                {...props}
            >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                {showLabel && <span className="ml-1">Previous</span>}
            </button>
        );
    }
);

CarouselPrevious.displayName = "Carousel.Previous";

// ============================================================================
// Next Button
// ============================================================================

interface CarouselNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    showLabel?: boolean;
}

const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
    ({ className, showLabel = false, ...props }, ref) => {
        const { goNext, currentIndex, loop, totalItems } = useCarouselContext();
        const isDisabled = !loop && currentIndex === totalItems - 1;

        return (
            <button
                ref={ref}
                type="button"
                onClick={goNext}
                disabled={isDisabled}
                aria-label="Next slide"
                className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 z-10",
                    "flex items-center justify-center",
                    "w-10 h-10 rounded-full",
                    "bg-elevated/90 text-elevated-content",
                    "border border-border shadow-control",
                    "hover:bg-surface hover:border-brand",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                    "disabled:opacity-40 disabled:pointer-events-none",
                    "transition-all duration-150",
                    className
                )}
                {...props}
            >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
                {showLabel && <span className="mr-1">Next</span>}
            </button>
        );
    }
);

CarouselNext.displayName = "Carousel.Next";

// ============================================================================
// Bullets Component
// ============================================================================

interface CarouselBulletsProps extends HTMLAttributes<HTMLDivElement> {}

const CarouselBullets = forwardRef<HTMLDivElement, CarouselBulletsProps>(
    ({ className, ...props }, ref) => {
        const { currentIndex, totalItems, goTo } = useCarouselContext();

        return (
            <div
                ref={ref}
                role="tablist"
                aria-label="Slide indicators"
                className={cn(
                    "flex items-center justify-center gap-2 mt-4",
                    className
                )}
                {...props}
            >
                {Array.from({ length: totalItems }, (_, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <button
                            key={index}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={isActive ? "true" : undefined}
                            onClick={() => goTo(index)}
                            className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-150",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                                isActive
                                    ? "bg-brand w-6"
                                    : "bg-muted hover:bg-brand/60"
                            )}
                        />
                    );
                })}
            </div>
        );
    }
);

CarouselBullets.displayName = "Carousel.Bullets";

// ============================================================================
// PlayPause Component
// ============================================================================

interface CarouselPlayPauseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    showLabel?: boolean;
}

const CarouselPlayPause = forwardRef<HTMLButtonElement, CarouselPlayPauseProps>(
    ({ className, showLabel = false, ...props }, ref) => {
        const { isPlaying, setIsPlaying } = useCarouselContext();

        return (
            <button
                ref={ref}
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-pressed={isPlaying}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                className={cn(
                    "flex items-center justify-center gap-2",
                    "px-3 py-2 rounded-control",
                    "bg-surface text-surface-content",
                    "border border-border",
                    "hover:bg-muted/50 hover:border-field",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                    "transition-all duration-150",
                    className
                )}
                {...props}
            >
                {isPlaying ? (
                    <>
                        <Pause className="w-4 h-4" aria-hidden="true" />
                        {showLabel && <span>Pause</span>}
                    </>
                ) : (
                    <>
                        <Play className="w-4 h-4" aria-hidden="true" />
                        {showLabel && <span>Play</span>}
                    </>
                )}
            </button>
        );
    }
);

CarouselPlayPause.displayName = "Carousel.PlayPause";

// ============================================================================
// SpeedControl Component
// ============================================================================

interface CarouselSpeedControlProps extends HTMLAttributes<HTMLDivElement> {
    showLabel?: boolean;
}

const SPEED_OPTIONS: SpeedMultiplier[] = [0.5, 1, 1.5, 2];

const CarouselSpeedControl = forwardRef<HTMLDivElement, CarouselSpeedControlProps>(
    ({ className, showLabel = true, ...props }, ref) => {
        const { speed, setSpeed } = useCarouselContext();

        return (
            <div
                ref={ref}
                className={cn("flex items-center gap-2", className)}
                {...props}
            >
                {showLabel && (
                    <label
                        htmlFor="carousel-speed"
                        className="text-sm text-muted-content"
                    >
                        Speed:
                    </label>
                )}
                <select
                    id="carousel-speed"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value) as SpeedMultiplier)}
                    aria-label="Playback speed"
                    className={cn(
                        "px-2 py-1.5 rounded-control text-sm",
                        "bg-surface text-surface-content",
                        "border border-border",
                        "hover:bg-muted/50 hover:border-field",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                        "transition-all duration-150",
                        "cursor-pointer"
                    )}
                >
                    {SPEED_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}x
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

CarouselSpeedControl.displayName = "Carousel.SpeedControl";

// ============================================================================
// Gallery Component
// ============================================================================

interface CarouselGalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
}

const CarouselGallery = forwardRef<HTMLDivElement, CarouselGalleryProps>(
    ({ items, className, ...props }, ref) => {
        const { currentIndex, goTo } = useCarouselContext();

        return (
            <div
                ref={ref}
                role="group"
                aria-label="Slide thumbnails"
                className={cn(
                    "flex items-center gap-2 overflow-x-auto py-2",
                    "scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent",
                    className
                )}
                {...props}
            >
                {items.map((item, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => goTo(index)}
                            aria-label={`Go to slide ${index + 1}: ${item.alt}`}
                            aria-current={isActive ? "true" : undefined}
                            className={cn(
                                "shrink-0",
                                "w-16 h-12 rounded-control overflow-hidden",
                                "border-2 transition-all duration-150",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                                isActive
                                    ? "border-brand ring-2 ring-brand/20"
                                    : "border-border hover:border-muted"
                            )}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-contain bg-elevated"
                            />
                        </button>
                    );
                })}
            </div>
        );
    }
);

CarouselGallery.displayName = "Carousel.Gallery";

// ============================================================================
// Export Compound Component
// ============================================================================

const Carousel = Object.assign(CarouselBase, {
    Viewport: CarouselViewport,
    Slide: CarouselSlide,
    Previous: CarouselPrevious,
    Next: CarouselNext,
    Bullets: CarouselBullets,
    PlayPause: CarouselPlayPause,
    SpeedControl: CarouselSpeedControl,
    Gallery: CarouselGallery,
});

export { Carousel };
