// index.ts
// Public API

import CarouselRoot from "./carousel";
import CarouselViewport from "./viewport";
import CarouselSlide from "./slide";
import CarouselPrevious from "./previous";
import CarouselNext from "./next";
import CarouselBullets from "./bullets";
import CarouselPlayPause from "./play-pause";
import CarouselSpeedControl from "./speed-control";
import CarouselGallery from "./gallery";

// Types
export type {
  SpeedMultiplier,
  GalleryItem,
  CarouselContextValue,
  CarouselProps,
  CarouselViewportProps,
  CarouselSlideProps,
  CarouselNavigationProps,
  CarouselBulletsProps,
  CarouselPlayPauseProps,
  CarouselSpeedControlProps,
  CarouselGalleryProps,
} from "./types";

// Compound component
const Carousel = Object.assign(CarouselRoot, {
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
export default Carousel;
