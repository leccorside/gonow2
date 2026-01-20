import React from 'react';

/**
 * Wrapper para componentes que adiciona logs e validação de props
 */
export function wrapComponent<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.FC<P> {
  return (props: P) => {
    if (__DEV__) {
      // Validar props booleanas
      Object.keys(props).forEach(key => {
        const value = (props as any)[key];
        if (
          typeof value !== 'undefined' &&
          value !== null &&
          (key.includes('enabled') ||
            key.includes('shown') ||
            key.includes('secure') ||
            key.includes('editable') ||
            key.includes('disabled') ||
            key.includes('loading') ||
            key.includes('visible') ||
            key.includes('active'))
        ) {
          if (typeof value !== 'boolean') {
            console.warn(
              `⚠️ [${componentName}] Prop "${key}" não é boolean:`,
              typeof value,
              value
            );
          }
        }
      });
    }

    try {
      return React.createElement(Component, props);
    } catch (error) {
      console.error(`❌ [${componentName}] Erro ao renderizar:`, error);
      throw error;
    }
  };
}
