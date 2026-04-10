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

// Sample data for multi-item carousel
const productItems: GalleryItem[] = [
  { src: 'https://picsum.photos/seed/prod1/400/400', alt: 'Product 1' },
  { src: 'https://picsum.photos/seed/prod2/400/400', alt: 'Product 2' },
  { src: 'https://picsum.photos/seed/prod3/400/400', alt: 'Product 3' },
  { src: 'https://picsum.photos/seed/prod4/400/400', alt: 'Product 4' },
  { src: 'https://picsum.photos/seed/prod5/400/400', alt: 'Product 5' },
  { src: 'https://picsum.photos/seed/prod6/400/400', alt: 'Product 6' },
  { src: 'https://picsum.photos/seed/prod7/400/400', alt: 'Product 7' },
  { src: 'https://picsum.photos/seed/prod8/400/400', alt: 'Product 8' },
];

export default function CarouselDemo() {
  return (
    <main className="p-4 not-prose md:p-8 bg-canvas text-canvas-content min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-10 bg-surface p-6 rounded-2xl shadow-lg border border-border">
        {/* ── Single-item Carousel (crossfade) ── */}
        <section>
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h1 className="text-2xl font-bold text-brand">Featured Gallery</h1>
              <p className="text-muted-content text-sm">WCAG Compliant Interactive Media</p>
            </div>
          </header>

          <Carousel totalItems={galleryItems.length} autoPlay={true} interval={3000}>
            <div className="flex justify-between items-center bg-sidebar p-3 rounded-lg border border-border">
              <Carousel.PlayPause />
              <Carousel.SpeedControl />
            </div>

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

            <Carousel.Bullets />

            <div className="mt-6 pt-4 border-t border-border">
              <h2 className="text-sm font-semibold mb-2 text-canvas-content">Jump to item:</h2>
              <Carousel.Gallery items={galleryItems} />
            </div>
          </Carousel>
        </section>

        {/* ── Multi-item Carousel (3 per slide, responsive) ── */}
        <section>
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-2xl font-bold text-brand">Product Showcase</h2>
              <p className="text-muted-content text-sm">
                Responsive — 1 on mobile, 2 on sm, 3 on lg
              </p>
            </div>
          </header>

          <Carousel
            totalItems={productItems.length}
            itemsPerSlide={{ base: 1, sm: 2, lg: 3 }}
            loop={true}
            autoPlay={true}
            interval={4000}
          >
            <div className="relative group mt-4">
              <Carousel.Viewport>
                {productItems.map((item, index) => (
                  <Carousel.Slide key={index} index={index}>
                    <div className="aspect-square bg-elevated rounded-surface border border-border overflow-hidden p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover rounded-surface"
                      />
                    </div>
                  </Carousel.Slide>
                ))}
              </Carousel.Viewport>

              <Carousel.Previous />
              <Carousel.Next />
            </div>

            <Carousel.Bullets />
          </Carousel>
        </section>
      </div>
    </main>
  );
}
