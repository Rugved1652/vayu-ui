"use client";

import { Carousel, type CarouselItem } from "vayu-ui";

const slides: CarouselItem[] = [
    {
        id: 1,
        title: "Modern Design System",
        description:
            "Build beautiful, accessible UIs with VedUI components.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    },
    {
        id: 2,
        title: "Dark Mode First",
        description: "Every component looks stunning in light and dark.",
        image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&q=80",
    },
    {
        id: 3,
        title: "Fully Accessible",
        description: "WCAG 2.2 AA compliant, keyboard navigable.",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    },
];

const testimonials: CarouselItem[] = [
    {
        id: "t1",
        title: "Alex Rivera, Engineering Lead",
        description:
            "VedUI saved us months of work. The component quality is outstanding.",
    },
    {
        id: "t2",
        title: "Maya Patel, Designer",
        description:
            "Finally a library that looks great without fighting the defaults.",
    },
    {
        id: "t3",
        title: "Sam Chen, CTO",
        description:
            "Accessibility built in from the start — exactly what we needed.",
    },
];

export default function CarouselDemo() {
    return (
        <div className="w-full max-w-2xl not-prose">
            <h2 id="carousel-demo-label" className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-200 mb-4">
                Carousel Example
            </h2>

            <div className="flex flex-col gap-12">
                {/* Default */}
                <div>
                    <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                        Default
                    </h3>
                    <Carousel items={slides} autoplay showControls />
                </div>

                {/* Testimonial variant */}
                <div>
                    <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                        Testimonial
                    </h3>
                    <Carousel
                        items={testimonials}
                        variant="testimonial"
                        bulletStyle="lines"
                        aspectRatio="16/7"
                    />
                </div>

                {/* Number bullets, no loop */}
                <div>
                    <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                        Numbers &amp; No Loop
                    </h3>
                    <Carousel
                        items={slides}
                        bulletStyle="numbers"
                        loop={false}
                        transitionEffect="fade"
                    />
                </div>
            </div>
        </div>
    );
}
