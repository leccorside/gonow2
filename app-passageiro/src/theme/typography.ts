/**
 * Tipografia do GoNow
 */

export const typography = {
  // Tamanhos de fonte
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Pesos de fonte
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Famílias de fonte
  families: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
};

export type Typography = typeof typography;
