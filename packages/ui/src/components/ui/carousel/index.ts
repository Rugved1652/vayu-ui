// index.ts
// Public API

import CarouselRoot from "./Carousel";
import CarouselViewport from "./CarouselViewport";
import CarouselSlide from "./CarouselSlide";
import CarouselPrevious from "./CarouselPrevious";
import CarouselNext from "./CarouselNext";
import CarouselBullets from "./CarouselBullets";
import CarouselPlayPause from "./CarouselPlayPause";
import CarouselSpeedControl from "./CarouselSpeedControl";
import CarouselGallery from "./CarouselGallery";

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
