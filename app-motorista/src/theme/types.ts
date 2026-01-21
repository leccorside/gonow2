export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    // Cores principais
    primary: string;
    primaryDark: string;
    primaryLight: string;
    
    secondary: string;
    secondaryDark: string;
    secondaryLight: string;
    
    // Cores de fundo
    background: string;
    backgroundDark: string;
    backgroundLight: string;
    
    // Cores de texto
    text: string;
    textSecondary: string;
    textLight: string;
    textWhite: string;
    
    // Cores de status
    success: string;
    error: string;
    warning: string;
    info: string;
    
    // Cores de avaliação
    star: string;
    starEmpty: string;
    
    // Cores de borda
    border: string;
    borderLight: string;
    
    // Cores de estado
    online: string;
    offline: string;
    pending: string;
    approved: string;
    rejected: string;
    
    // Cores específicas para cards e overlays
    card: string;
    overlay: string;
    shadow: string;
  };
}
