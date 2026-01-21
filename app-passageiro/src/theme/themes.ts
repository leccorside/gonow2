import { Theme } from './types';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
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
    
    // Cores específicas
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    // Cores principais
    primary: '#FF6B35', // Laranja principal (mantém)
    primaryDark: '#FF8C5A', // Laranja mais claro no modo escuro
    primaryLight: '#FFA573', // Laranja ainda mais claro
    
    secondary: '#FFFFFF', // Branco no modo escuro
    secondaryDark: '#E0E0E0', // Cinza claro
    secondaryLight: '#F5F5F5', // Cinza muito claro
    
    // Cores de fundo
    background: '#121212', // Preto quase puro
    backgroundDark: '#1E1E1E', // Cinza escuro
    backgroundLight: '#2C2C2C', // Cinza médio
    
    // Cores de texto
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textLight: '#808080',
    textWhite: '#FFFFFF',
    
    // Cores de status
    success: '#66BB6A',
    error: '#EF5350',
    warning: '#FFA726',
    info: '#42A5F5',
    
    // Cores de avaliação
    star: '#FFD700',
    starEmpty: '#4A4A4A',
    
    // Cores de borda
    border: '#333333',
    borderLight: '#2A2A2A',
    
    // Cores de estado
    online: '#66BB6A',
    offline: '#6E6E6E',
    pending: '#FFA726',
    approved: '#66BB6A',
    rejected: '#EF5350',
    
    // Cores específicas
    card: '#1E1E1E',
    overlay: 'rgba(0, 0, 0, 0.8)',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
};
