"use client";

import { clsx } from "clsx";
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Pause,
    Play,
    X,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import React, {
    forwardRef,
    HTMLAttributes,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Types & Interfaces
// ============================================================================

type CarouselVariant = "default" | "gallery" | "testimonial" | "product";
type BulletStyle = "dots" | "lines" | "numbers" | "thumbnails";
type TransitionEffect = "slide" | "fade" | "zoom" | "flip";

interface CarouselItem {
    id: string | number;
    image?: string;
    title?: string;
    description?: string;
    content?: React.ReactNode;
    thumbnail?: string;
}

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    items: CarouselItem[];
    variant?: CarouselVariant;
    bulletStyle?: BulletStyle;
    transitionEffect?: TransitionEffect;
    autoplay?: boolean;
    autoplayDelay?: number;
    showControls?: boolean;
    showBullets?: boolean;
    loop?: boolean;
    draggable?: boolean;
    enableZoom?: boolean;
    zoomOnHover?: boolean;
    maxZoom?: number;
    itemClassName?: string;
    aspectRatio?: string;
    onSlideChange?: (index: number) => void;
}

// ============================================================================
// Carousel Component
// ============================================================================

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
    (
        {
            items,
            variant = "default",
            bulletStyle = "dots",
            transitionEffect = "slide",
            autoplay = false,
            autoplayDelay = 3000,
            showControls = true,
            showBullets = true,
            loop = true,
            draggable = true,
            enableZoom = false,
            zoomOnHover = false,
            maxZoom = 3,
            className,
            itemClassName,
            aspectRatio = "16/9",
            onSlideChange,
            ...props
        },
        ref
    ) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [isPlaying, setIsPlaying] = useState(autoplay);
        const [isHovering, setIsHovering] = useState(false);
        const [isDragging, setIsDragging] = useState(false);
        const [dragStart, setDragStart] = useState(0);
        const [dragOffset, setDragOffset] = useState(0);
        const [isFullscreen, setIsFullscreen] = useState(false);
        const [zoomLevel, setZoomLevel] = useState(1);
        const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
        const [mounted, setMounted] = useState(false);

        const uniqueId = useId();
        const carouselLabelId = `${uniqueId}-label`;
        const slidePanelId = `${uniqueId}-slide`;

        const carouselRef = useRef<HTMLDivElement>(null);
        const autoplayTimerRef = useRef<NodeJS.Timeout>(undefined);
        const imageRef = useRef<HTMLImageElement>(null);

        useEffect(() => {
            setMounted(true);
        }, []);

        // ---- Navigation ----

        const goToSlide = useCallback(
            (index: number) => {
                let next: number;
                if (index < 0) {
                    next = loop ? items.length - 1 : 0;
                } else if (index >= items.length) {
                    next = loop ? 0 : items.length - 1;
                } else {
                    next = index;
                }
                setCurrentIndex(next);
                onSlideChange?.(next);
                setZoomLevel(1);
            },
            [items.length, loop, onSlideChange]
        );

        const goToPrevious = useCallback(() => {
            goToSlide(currentIndex - 1);
        }, [currentIndex, goToSlide]);

        const goToNext = useCallback(() => {
            goToSlide(currentIndex + 1);
        }, [currentIndex, goToSlide]);

        // ---- Autoplay ----

        useEffect(() => {
            if (isPlaying && !isHovering && !isDragging) {
                autoplayTimerRef.current = setInterval(
                    goToNext,
                    autoplayDelay
                );
            }
            return () => {
                if (autoplayTimerRef.current) {
                    clearInterval(autoplayTimerRef.current);
                }
            };
        }, [
            isPlaying,
            isHovering,
            isDragging,
            currentIndex,
            autoplayDelay,
            goToNext,
        ]);

        // ---- Keyboard ----

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (isFullscreen) {
                    if (e.key === "ArrowLeft") goToPrevious();
                    if (e.key === "ArrowRight") goToNext();
                    if (e.key === "Escape") setIsFullscreen(false);
                }
            };
            document.addEventListener("keydown", handleKeyDown);
            return () =>
                document.removeEventListener("keydown", handleKeyDown);
        }, [isFullscreen, goToPrevious, goToNext]);

        // ---- Drag ----

        const handleDragStart = useCallback(
            (clientX: number) => {
                if (!draggable) return;
                setIsDragging(true);
                setDragStart(clientX);
            },
            [draggable]
        );

        const handleDragMove = useCallback(
            (clientX: number) => {
                if (!isDragging || !draggable) return;
                setDragOffset(clientX - dragStart);
            },
            [isDragging, draggable, dragStart]
        );

        const handleDragEnd = useCallback(() => {
            if (!isDragging || !draggable) return;
            setIsDragging(false);

            const threshold = 50;
            if (Math.abs(dragOffset) > threshold) {
                if (dragOffset > 0) {
                    goToPrevious();
                } else {
                    goToNext();
                }
            }
            setDragOffset(0);
        }, [isDragging, draggable, dragOffset, goToPrevious, goToNext]);

        const handleMouseDown = useCallback(
            (e: React.MouseEvent) => handleDragStart(e.clientX),
            [handleDragStart]
        );

        const handleMouseMove = useCallback(
            (e: React.MouseEvent) => {
                if (zoomOnHover && enableZoom && imageRef.current) {
                    const rect =
                        imageRef.current.getBoundingClientRect();
                    const x =
                        ((e.clientX - rect.left) / rect.width) * 100;
                    const y =
                        ((e.clientY - rect.top) / rect.height) * 100;
                    setZoomPosition({ x, y });
                }
                handleDragMove(e.clientX);
            },
            [zoomOnHover, enableZoom, handleDragMove]
        );

        const handleTouchStart = useCallback(
            (e: React.TouchEvent) =>
                handleDragStart(e.touches[0].clientX),
            [handleDragStart]
        );

        const handleTouchMove = useCallback(
            (e: React.TouchEvent) =>
                handleDragMove(e.touches[0].clientX),
            [handleDragMove]
        );

        // Global mouse listeners while dragging
        useEffect(() => {
            if (!isDragging) return;

            const onMove = (e: MouseEvent) => handleDragMove(e.clientX);
            const onUp = () => handleDragEnd();

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
            return () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
            };
        }, [isDragging, handleDragMove, handleDragEnd]);

        // ---- Zoom ----

        const handleZoomIn = useCallback(() => {
            setZoomLevel((prev) => Math.min(prev + 0.5, maxZoom));
        }, [maxZoom]);

        const handleZoomOut = useCallback(() => {
            setZoomLevel((prev) => Math.max(prev - 0.5, 1));
        }, []);

        const handleZoomReset = useCallback(() => {
            setZoomLevel(1);
            setZoomPosition({ x: 50, y: 50 });
        }, []);

        // ---- Transition styles ----

        const getTransitionStyle = useCallback(
            (index: number): React.CSSProperties => {
                const offset = index - currentIndex;
                switch (transitionEffect) {
                    case "slide":
                        return {
                            transform: `translateX(${offset * 100 +
                                (dragOffset /
                                    (carouselRef.current?.offsetWidth ||
                                        1)) *
                                100
                                }%)`,
                            transition: isDragging
                                ? "none"
                                : "transform 0.5s ease-in-out",
                        };
                    case "fade":
                        return {
                            opacity: offset === 0 ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out",
                            position:
                                offset === 0 ? "relative" : "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        };
                    case "zoom":
                        return {
                            transform: `scale(${offset === 0 ? 1 : 0.8})`,
                            opacity: offset === 0 ? 1 : 0,
                            transition: "all 0.5s ease-in-out",
                            position:
                                offset === 0 ? "relative" : "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        };
                    case "flip":
                        return {
                            transform: `rotateY(${offset * 90}deg)`,
                            opacity: offset === 0 ? 1 : 0,
                            transition: "all 0.6s ease-in-out",
                            position:
                                offset === 0 ? "relative" : "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        };
                    default:
                        return {};
                }
            },
            [currentIndex, dragOffset, isDragging, transitionEffect]
        );

        // ---- Live region text ----

        const liveText = useMemo(
            () => `Slide ${currentIndex + 1} of ${items.length}`,
            [currentIndex, items.length]
        );

        // ---- Render bullets ----

        const renderBullets = () => {
            if (!showBullets) return null;

            const bulletNav = (children: React.ReactNode) => (
                <div
                    role="tablist"
                    aria-label="Slide navigation"
                    className="flex items-center justify-center gap-2"
                >
                    {children}
                </div>
            );

            const bulletButton = (
                index: number,
                innerClass: string,
                children?: React.ReactNode
            ) => (
                <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => goToSlide(index)}
                    className={innerClass}
                >
                    {children}
                </button>
            );

            switch (bulletStyle) {
                case "dots":
                    return bulletNav(
                        items.map((_, i) =>
                            bulletButton(
                                i,
                                clsx(
                                    "rounded-full transition-all duration-300",
                                    i === currentIndex
                                        ? "w-8 h-2 bg-primary-600 dark:bg-primary-400"
                                        : "w-2 h-2 bg-neutral-400 dark:bg-neutral-600 hover:bg-neutral-500 dark:hover:bg-neutral-500"
                                )
                            )
                        )
                    );

                case "lines":
                    return (
                        <div
                            role="tablist"
                            aria-label="Slide navigation"
                            className="flex items-center justify-center gap-1"
                        >
                            {items.map((_, i) =>
                                bulletButton(
                                    i,
                                    clsx(
                                        "h-1 rounded-full transition-all duration-300",
                                        i === currentIndex
                                            ? "w-12 bg-primary-600 dark:bg-primary-400"
                                            : "w-8 bg-neutral-400 dark:bg-neutral-600 hover:bg-neutral-500 dark:hover:bg-neutral-500"
                                    )
                                )
                            )}
                        </div>
                    );

                case "numbers":
                    return bulletNav(
                        items.map((_, i) =>
                            bulletButton(
                                i,
                                clsx(
                                    "w-8 h-8 rounded-full font-secondary font-semibold text-sm transition-all duration-300",
                                    i === currentIndex
                                        ? "bg-primary-600 dark:bg-primary-400 text-white scale-110"
                                        : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                                ),
                                i + 1
                            )
                        )
                    );

                case "thumbnails":
                    return (
                        <div
                            role="tablist"
                            aria-label="Slide navigation"
                            className="flex items-center justify-center gap-2 overflow-x-auto max-w-full px-4"
                        >
                            {items.map((item, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    role="tab"
                                    aria-selected={i === currentIndex}
                                    aria-label={
                                        item.title ||
                                        `Slide ${i + 1}`
                                    }
                                    onClick={() => goToSlide(i)}
                                    className={clsx(
                                        "relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 border-2",
                                        i === currentIndex
                                            ? "border-primary-600 dark:border-primary-400 scale-110"
                                            : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
                                    )}
                                >
                                    {item.thumbnail || item.image ? (
                                        <img
                                            src={
                                                item.thumbnail ||
                                                item.image
                                            }
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                                            <span className="text-xs font-secondary text-neutral-500">
                                                {i + 1}
                                            </span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    );

                default:
                    return null;
            }
        };

        // ---- Render slide content ----

        const renderItemContent = (
            item: CarouselItem,
            index: number
        ) => {
            const isCurrent = index === currentIndex;

            switch (variant) {
                case "gallery":
                    return (
                        <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                            {item.image && (
                                <div
                                    className="relative w-full h-full"
                                    onMouseEnter={() =>
                                        zoomOnHover &&
                                        setZoomLevel(2)
                                    }
                                    onMouseLeave={() =>
                                        zoomOnHover &&
                                        setZoomLevel(1)
                                    }
                                >
                                    <img
                                        ref={
                                            isCurrent
                                                ? imageRef
                                                : null
                                        }
                                        src={item.image}
                                        alt={
                                            item.title ||
                                            `Slide ${index + 1}`
                                        }
                                        className="w-full h-full object-contain transition-transform duration-300"
                                        style={{
                                            transform: `scale(${isCurrent ? zoomLevel : 1})`,
                                            transformOrigin:
                                                zoomOnHover
                                                    ? `${zoomPosition.x}% ${zoomPosition.y}%`
                                                    : "center",
                                        }}
                                    />
                                    {enableZoom && isCurrent && (
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={handleZoomIn}
                                                disabled={
                                                    zoomLevel >=
                                                    maxZoom
                                                }
                                                aria-label="Zoom in"
                                                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                                            >
                                                <ZoomIn className="w-5 h-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleZoomOut}
                                                disabled={
                                                    zoomLevel <= 1
                                                }
                                                aria-label="Zoom out"
                                                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                                            >
                                                <ZoomOut className="w-5 h-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsFullscreen(
                                                        true
                                                    )
                                                }
                                                aria-label="Enter fullscreen"
                                                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                                            >
                                                <Maximize2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                            {item.title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <h3 className="text-2xl font-primary font-bold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="font-secondary text-white/90">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    );

                case "product":
                    return (
                        <div
                            className="relative w-full h-full bg-white dark:bg-neutral-900 overflow-hidden cursor-crosshair"
                            onMouseEnter={() =>
                                zoomOnHover && setZoomLevel(2.5)
                            }
                            onMouseLeave={() =>
                                zoomOnHover && setZoomLevel(1)
                            }
                        >
                            {item.image && (
                                <img
                                    ref={
                                        isCurrent ? imageRef : null
                                    }
                                    src={item.image}
                                    alt={
                                        item.title ||
                                        `Product ${index + 1}`
                                    }
                                    className="w-full h-full object-contain transition-transform duration-200"
                                    style={{
                                        transform: `scale(${isCurrent ? zoomLevel : 1})`,
                                        transformOrigin: zoomOnHover
                                            ? `${zoomPosition.x}% ${zoomPosition.y}%`
                                            : "center",
                                    }}
                                />
                            )}
                        </div>
                    );

                case "testimonial":
                    return (
                        <div className="flex items-center justify-center h-full p-12 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
                            <div className="max-w-3xl text-center">
                                {item.content || (
                                    <>
                                        {item.description && (
                                            <blockquote className="text-2xl font-secondary text-neutral-800 dark:text-neutral-200 italic mb-6 leading-relaxed">
                                                &ldquo;
                                                {item.description}
                                                &rdquo;
                                            </blockquote>
                                        )}
                                        {item.title && (
                                            <cite className="text-lg font-primary font-bold text-primary-700 dark:text-primary-300 not-italic">
                                                &mdash; {item.title}
                                            </cite>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );

                default:
                    return (
                        <div className="relative w-full h-full">
                            {item.content || (
                                <>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={
                                                item.title ||
                                                `Slide ${index + 1}`
                                            }
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    {(item.title ||
                                        item.description) && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                                {item.title && (
                                                    <h3 className="text-2xl font-primary font-bold text-white mb-2">
                                                        {item.title}
                                                    </h3>
                                                )}
                                                {item.description && (
                                                    <p className="font-secondary text-white/90">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                </>
                            )}
                        </div>
                    );
            }
        };

        // ---- Fullscreen modal ----

        const renderFullscreenModal = () => {
            if (!mounted || !isFullscreen) return null;

            const currentItem = items[currentIndex];

            return createPortal(
                <div
                    role="dialog"
                    aria-label="Fullscreen carousel"
                    aria-modal="true"
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
                >
                    <button
                        type="button"
                        onClick={() => setIsFullscreen(false)}
                        aria-label="Close fullscreen"
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {showControls && (
                        <>
                            <button
                                type="button"
                                onClick={goToPrevious}
                                disabled={
                                    !loop && currentIndex === 0
                                }
                                aria-label="Previous slide"
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                type="button"
                                onClick={goToNext}
                                disabled={
                                    !loop &&
                                    currentIndex ===
                                    items.length - 1
                                }
                                aria-label="Next slide"
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </>
                    )}

                    <div className="w-full h-full flex items-center justify-center p-8">
                        {currentItem.image && (
                            <img
                                src={currentItem.image}
                                alt={
                                    currentItem.title ||
                                    `Slide ${currentIndex + 1}`
                                }
                                className="max-w-full max-h-full object-contain"
                                style={{
                                    transform: `scale(${zoomLevel})`,
                                }}
                            />
                        )}
                    </div>

                    {/* Zoom controls */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        <button
                            type="button"
                            onClick={handleZoomOut}
                            disabled={zoomLevel <= 1}
                            aria-label="Zoom out"
                            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={handleZoomReset}
                            aria-label="Reset zoom"
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-secondary text-sm"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={handleZoomIn}
                            disabled={zoomLevel >= maxZoom}
                            aria-label="Zoom in"
                            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Counter */}
                    <div
                        className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 text-white rounded-lg font-secondary text-sm"
                        aria-live="polite"
                    >
                        {liveText}
                    </div>
                </div>,
                document.body
            );
        };

        // ---- Main render ----

        return (
            <>
                <div
                    ref={ref}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={
                        ((props as Record<string, unknown>)[
                            "aria-label"
                        ] as string | undefined) ?? "Image carousel"
                    }
                    className={clsx("relative", className)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    {...props}
                >
                    {/* Live region for screen readers */}
                    <div
                        aria-live="polite"
                        aria-atomic="true"
                        className="sr-only"
                    >
                        {liveText}
                    </div>

                    <div
                        className="relative overflow-hidden rounded-lg"
                        style={{ aspectRatio }}
                    >
                        <div
                            ref={carouselRef}
                            className="flex w-full h-full"
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleDragEnd}
                            onMouseMove={handleMouseMove}
                        >
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    id={`${slidePanelId}-${index}`}
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={
                                        item.title ||
                                        `${index + 1} of ${items.length}`
                                    }
                                    aria-hidden={
                                        index !== currentIndex
                                    }
                                    className={clsx(
                                        "flex-shrink-0 w-full h-full",
                                        itemClassName
                                    )}
                                    style={getTransitionStyle(
                                        index
                                    )}
                                >
                                    {renderItemContent(item, index)}
                                </div>
                            ))}
                        </div>

                        {/* Prev / Next */}
                        {showControls &&
                            (isHovering || !autoplay) && (
                                <>
                                    <button
                                        type="button"
                                        onClick={goToPrevious}
                                        disabled={
                                            !loop &&
                                            currentIndex === 0
                                        }
                                        aria-label="Previous slide"
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 text-neutral-900 dark:text-white rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft
                                            className="w-6 h-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        disabled={
                                            !loop &&
                                            currentIndex ===
                                            items.length - 1
                                        }
                                        aria-label="Next slide"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 text-neutral-900 dark:text-white rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight
                                            className="w-6 h-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </>
                            )}

                        {/* Play / Pause */}
                        {autoplay && (
                            <button
                                type="button"
                                onClick={() =>
                                    setIsPlaying(!isPlaying)
                                }
                                aria-label={
                                    isPlaying
                                        ? "Pause autoplay"
                                        : "Start autoplay"
                                }
                                className="absolute bottom-4 right-4 p-2 bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 text-neutral-900 dark:text-white rounded-full shadow-lg transition-all duration-200"
                            >
                                {isPlaying ? (
                                    <Pause
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Play
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        )}

                        {/* Visual counter */}
                        <div
                            className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 text-white rounded-lg font-secondary text-sm"
                            aria-hidden="true"
                        >
                            {currentIndex + 1} / {items.length}
                        </div>
                    </div>

                    {/* Bullets */}
                    {showBullets && (
                        <div className="mt-6">{renderBullets()}</div>
                    )}
                </div>

                {renderFullscreenModal()}
            </>
        );
    }
);

Carousel.displayName = "Carousel";

// ============================================================================
// Exports
// ============================================================================

export { Carousel };

export type {
    BulletStyle,
    CarouselItem,
    CarouselProps,
    CarouselVariant,
    TransitionEffect,
};
