// types.ts
// Types

import { HTMLAttributes } from 'react';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export const WCAG_COMPLIANT_COLORS = [
  '#B91C1C', // red-700 (Contrast: 5.12)
  '#C2410C', // orange-700 (Contrast: 5.81)
  '#A16207', // yellow-700 (Contrast: 5.68)
  '#4F46E5', // indigo-600 (Contrast: 4.81)
  '#2563EB', // blue-600 (Contrast: 4.56)
  '#0E7490', // cyan-700 (Contrast: 5.08)
  '#047857', // emerald-700 (Contrast: 5.25)
  '#6D28D9', // violet-700 (Contrast: 5.35)
  '#7C3AED', // violet-500 (Contrast: 4.52)
  '#DB2777', // pink-600 (Contrast: 4.52)
  '#0F766E', // teal-700 (Contrast: 5.06)
  '#1E40AF', // blue-800 (Contrast: 7.06)
];

export interface AvatarRootProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize | number;
  username?: string;
  alt?: string;
  status?: AvatarStatus;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  tabIndex?: number;
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export interface AvatarInitialsProps extends HTMLAttributes<HTMLSpanElement> {
  username: string;
}

export interface AvatarStatusProps extends HTMLAttributes<HTMLSpanElement> {
  status: AvatarStatus;
  label?: string;
}

export interface AvatarFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}
