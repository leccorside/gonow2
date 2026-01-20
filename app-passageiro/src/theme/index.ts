/**
 * Tema completo do GoNow
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
};

export type Theme = typeof theme;

export * from './colors';
export * from './typography';
export * from './spacing';
