'use client';
import { Carousel, type GalleryItem } from 'vayu-ui';

// Sample data - replace with your actual data source
const galleryItems: GalleryItem[] = [
  { src: 'https://picsum.photos/seed/slide1/800/400', alt: 'Abstract Landscape 1' },
  { src: 'https://picsum.photos/seed/slide2/800/400', alt: 'Abstract Landscape 2' },
  { src: 'https://picsum.photos/seed/slide3/800/400', alt: 'Abstract Landscape 3' },
  { src: 'https://picsum.photos/seed/slide4/800/400', alt: 'Abstract Landscape 4' },
  { src: 'https://picsum.photos/seed/slide5/800/400', alt: 'Abstract Landscape 5' },
];

export default function CarouselDemo() {
  return (
    <main className="p-4 not-prose md:p-8 bg-canvas text-canvas-content min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-6 bg-surface p-6 rounded-2xl shadow-lg border border-border">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-bold text-brand">Featured Gallery</h1>
            <p className="text-muted-content text-sm">WCAG Compliant Interactive Media</p>
          </div>
        </header>

        {/* Carousel with autoPlay enabled, 3 second interval */}
        <Carousel totalItems={galleryItems.length} autoPlay={true} interval={3000}>
          {/* Toolbar for Accessibility and User Control */}
          <div className="flex justify-between items-center bg-sidebar p-3 rounded-lg border border-border">
            <Carousel.PlayPause />
            <Carousel.SpeedControl />
          </div>

          {/* Main Visual Area */}
          <div className="relative group mt-4">
            <Carousel.Viewport>
              {galleryItems.map((item, index) => (
                <Carousel.Slide key={index} index={index}>
                  <div className="aspect-video w-full bg-elevated flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel.Viewport>

            <Carousel.Previous />
            <Carousel.Next />
          </div>

          {/* Screen-reader accessible dot pagination */}
          <Carousel.Bullets />

          {/* Interactive Thumbnail Stack */}
          <div className="mt-6 pt-4 border-t border-border">
            <h2 className="text-sm font-semibold mb-2 text-canvas-content">Jump to item:</h2>
            <Carousel.Gallery items={galleryItems} />
          </div>
        </Carousel>
      </div>
    </main>
  );
}
