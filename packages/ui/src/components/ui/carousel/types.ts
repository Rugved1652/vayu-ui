// types.ts
// Types

import type { HTMLAttributes, ButtonHTMLAttributes } from "react";

export type SpeedMultiplier = 0.5 | 1 | 1.5 | 2;

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface CarouselContextValue {
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

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  totalItems: number;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  defaultSpeed?: SpeedMultiplier;
  defaultIndex?: number;
  children: React.ReactNode;
}

export interface CarouselViewportProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CarouselSlideProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  children: React.ReactNode;
}

export interface CarouselNavigationProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  showLabel?: boolean;
}

export interface CarouselBulletsProps extends HTMLAttributes<HTMLDivElement> {}

export interface CarouselPlayPauseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  showLabel?: boolean;
}

export interface CarouselSpeedControlProps extends HTMLAttributes<HTMLDivElement> {
  showLabel?: boolean;
}

export interface CarouselGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
}
