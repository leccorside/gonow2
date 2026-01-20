import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SplashScreen } from './src/screens';
import { SplashScreenSimplified } from './src/screens/SplashScreenSimplified';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import AsyncStorage from '@react-native-async-storage/async-storage';

// DESCOMENTE A LINHA ABAIXO PARA LIMPAR O STORAGE AUTOMATICAMENTE (apenas para debug)
// import { clearAllStorage } from './src/utils/debugStorage';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading, hasSeenOnboarding } = useAuth();

  // Limpar storage corrompido na primeira inicialização
  useEffect(() => {
    const clearCorruptedData = async () => {
      try {
        // Limpar TODOS os dados do GoNow para garantir que não há corrupção
        // Isso resolve o problema de dados corrompidos no AsyncStorage
        await Promise.all([
          AsyncStorage.removeItem('@gonow:user'),
          AsyncStorage.removeItem('@gonow:onboarding'),
        ]);
        console.log('✅ Storage limpo para evitar dados corrompidos');
      } catch (error) {
        // Ignorar erros silenciosamente
      }
    };
    // Executar apenas uma vez na montagem
    clearCorruptedData();
  }, []);

  // Logs para debug
  if (__DEV__) {
    console.log('🔍 [AppContent] Estados:', {
      loading: { value: loading, type: typeof loading, isBoolean: typeof loading === 'boolean' },
      hasSeenOnboarding: { value: hasSeenOnboarding, type: typeof hasSeenOnboarding, isBoolean: typeof hasSeenOnboarding === 'boolean' },
      isAuthenticated: { value: isAuthenticated, type: typeof isAuthenticated, isBoolean: typeof isAuthenticated === 'boolean' },
    });
  }

  // TESTE: Usar versão simplificada do Splash para isolar o problema
  const USE_SIMPLIFIED_SPLASH = true;

  if (loading === true) {
    return USE_SIMPLIFIED_SPLASH ? <SplashScreenSimplified /> : <SplashScreen />;
  }

  // Garantir que são booleanos explícitos
  const hasSeen = hasSeenOnboarding === true;
  const isAuth = isAuthenticated === true;
  const showAuth = !hasSeen || !isAuth;

  if (__DEV__) {
    console.log('🔍 [AppContent] Condições:', {
      hasSeen: { value: hasSeen, type: typeof hasSeen },
      isAuth: { value: isAuth, type: typeof isAuth },
      showAuth: { value: showAuth, type: typeof showAuth },
    });
  }

  // Log antes de renderizar NavigationContainer
  if (__DEV__) {
    console.log('🔍 [AppContent] Renderizando NavigationContainer com:', {
      showAuth: { value: showAuth, type: typeof showAuth },
      hasSeen: { value: hasSeen, type: typeof hasSeen },
      isAuth: { value: isAuth, type: typeof isAuth },
    });
  }

  try {
    return (
      <NavigationContainer>
        {showAuth ? (
          <AuthNavigator />
        ) : (
          <AppNavigator />
        )}
        <StatusBar style="dark" />
      </NavigationContainer>
    );
  } catch (error) {
    console.error('❌ [AppContent] Erro ao renderizar NavigationContainer:', error);
    throw error;
  }
};

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
