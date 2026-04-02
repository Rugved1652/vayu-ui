// types.ts
// Types

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRCodeImageSettings {
  /** URL of the center logo image */
  src: string;
  /** Width of the logo in pixels */
  width: number;
  /** Height of the logo in pixels */
  height: number;
  /** Clear modules behind the logo for readability */
  excavate?: boolean;
}
