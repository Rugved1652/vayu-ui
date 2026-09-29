import type { NumberType } from './types';

export function isNumericInput(value: string, kind: NumberType): boolean {
  const signed = kind === 'integer' || kind === 'decimal';
  const decimal = kind === 'decimal' || kind === 'positive';
  return new RegExp(`^${signed ? '-?' : ''}\\d*${decimal ? '(\\.\\d*)?' : ''}$`).test(value);
}

/** Normalize strings without rounding integers larger than Number.MAX_SAFE_INTEGER. */
export function normalizeNumber(value: string): string {
  if (value === '' || value === '-') return value;
  const sign = value.startsWith('-') ? '-' : '';
  const [integer, fraction] = value.replace(/^-/, '').split('.');
  const digits = (integer || '0').replace(/^0+(?=\d)/, '');
  return `${sign}${digits}${fraction === undefined ? '' : `.${fraction}`}`;
}

export function formatNumber(value: string): string {
  const normalized = normalizeNumber(value);
  const [integer, fraction] = normalized.split('.');
  return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${fraction === undefined ? '' : `.${fraction}`}`;
}
