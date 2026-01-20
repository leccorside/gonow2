/**
 * Utilitário para validar e converter props booleanas
 * Previne erros de cast String to Boolean no Android
 */

export function ensureBoolean(value: any, defaultValue: boolean = false): boolean {
  if (value === true || value === 'true') {
    return true;
  }
  if (value === false || value === 'false') {
    return false;
  }
  return defaultValue;
}

export function logPropValue(componentName: string, propName: string, value: any) {
  if (__DEV__) {
    const type = typeof value;
    console.log(`🔍 [${componentName}] ${propName}:`, {
      value,
      type,
      isBoolean: type === 'boolean',
      isString: type === 'string',
    });
  }
}

export function validateBooleanProps(props: Record<string, any>, componentName: string) {
  if (__DEV__) {
    Object.keys(props).forEach(key => {
      const value = props[key];
      if (typeof value !== 'undefined' && (key.includes('enabled') || key.includes('shown') || key.includes('secure') || key.includes('editable') || key.includes('disabled') || key.includes('loading'))) {
        logPropValue(componentName, key, value);
        if (typeof value !== 'boolean' && value !== null && value !== undefined) {
          console.warn(`⚠️ [${componentName}] Prop ${key} não é boolean:`, typeof value, value);
        }
      }
    });
  }
}
