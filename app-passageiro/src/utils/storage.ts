import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Limpa todos os dados do AsyncStorage relacionados ao GoNow
 */
export async function clearGoNowStorage(): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.removeItem('@gonow:user'),
      AsyncStorage.removeItem('@gonow:onboarding'),
    ]);
    console.log('Storage limpo com sucesso');
  } catch (error) {
    console.error('Erro ao limpar storage:', error);
  }
}

/**
 * Limpa todo o AsyncStorage (use com cuidado!)
 */
export async function clearAllStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
    console.log('Todo o storage foi limpo');
  } catch (error) {
    console.error('Erro ao limpar todo o storage:', error);
  }
}
