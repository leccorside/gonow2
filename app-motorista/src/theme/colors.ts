/**
 * Tema de cores do GoNow
 * Cores principais: Preto e Laranja
 */

export const colors = {
  // Cores principais
  primary: '#FF6B35', // Laranja principal
  primaryDark: '#E55A2B', // Laranja escuro
  primaryLight: '#FF8C5A', // Laranja claro
  
  secondary: '#000000', // Preto principal
  secondaryDark: '#1A1A1A', // Preto escuro
  secondaryLight: '#333333', // Preto claro
  
  // Cores de fundo
  background: '#FFFFFF',
  backgroundDark: '#F5F5F5',
  backgroundLight: '#FAFAFA',
  
  // Cores de texto
  text: '#000000',
  textSecondary: '#666666',
  textLight: '#999999',
  textWhite: '#FFFFFF',
  
  // Cores de status
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Cores de avaliação
  star: '#FFD700',
  starEmpty: '#E0E0E0',
  
  // Cores de borda
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  
  // Cores de estado
  online: '#4CAF50',
  offline: '#9E9E9E',
  pending: '#FF9800',
  approved: '#4CAF50',
  rejected: '#F44336',
};

export type Colors = typeof colors;
