import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Limpa TODOS os dados do AsyncStorage
 * Use apenas para debug/reset completo
 */
export async function clearAllStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
    console.log('✅ Todo o AsyncStorage foi limpo');
  } catch (error) {
    console.error('❌ Erro ao limpar storage:', error);
  }
}

/**
 * Limpa apenas os dados do GoNow
 */
export async function clearGoNowStorage(): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.removeItem('@gonow:user'),
      AsyncStorage.removeItem('@gonow:onboarding'),
    ]);
    console.log('✅ Dados do GoNow foram limpos');
  } catch (error) {
    console.error('❌ Erro ao limpar dados do GoNow:', error);
  }
}

/**
 * Descomente a linha abaixo para limpar o storage automaticamente na inicialização
 * Útil para debug quando há dados corrompidos
 */
// clearAllStorage();
