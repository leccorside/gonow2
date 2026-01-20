import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { SplashScreenSimplified } from './src/screens/SplashScreenSimplified';
import { OnboardingScreenSimplified } from './src/screens/OnboardingScreenSimplified';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { HomeScreen } from './src/screens/HomeScreen';

// Navegação manual sem NavigationContainer (temporário até resolver o problema)
type Screen = 'splash' | 'onboarding' | 'login' | 'register' | 'forgotPassword' | 'home';

const AppContent: React.FC = () => {
  const { loading, hasSeenOnboarding, isAuthenticated } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  // Mapear nomes de telas do React Navigation para nossos nomes
  const mapScreenName = (screen: string): Screen => {
    const mapping: Record<string, Screen> = {
      'Login': 'login',
      'Register': 'register',
      'ForgotPassword': 'forgotPassword',
      'login': 'login',
      'register': 'register',
      'forgotPassword': 'forgotPassword',
      'home': 'home',
    };
    return mapping[screen] || 'login';
  };

  // Criar objeto de navegação mock
  const navigation = {
    navigate: (screen: string) => {
      const mappedScreen = mapScreenName(screen);
      setCurrentScreen(mappedScreen);
    },
  };

  // Atualizar tela quando autenticação mudar
  useEffect(() => {
    if (!loading) {
      const hasSeen = hasSeenOnboarding === true;
      const isAuth = isAuthenticated === true;
      
      if (currentScreen === 'splash') {
        // Delay do splash
        setTimeout(() => {
          if (!hasSeen) {
            setCurrentScreen('onboarding');
          } else if (!isAuth) {
            setCurrentScreen('login');
          } else {
            setCurrentScreen('home');
          }
        }, 1000);
      } else if (isAuth && currentScreen !== 'home') {
        // Se autenticou, ir para home
        setCurrentScreen('home');
      } else if (!isAuth && (currentScreen === 'home')) {
        // Se desautenticou, ir para login
        setCurrentScreen('login');
      }
    }
  }, [loading, hasSeenOnboarding, isAuthenticated]);

  if (loading === true || currentScreen === 'splash') {
    return <SplashScreenSimplified />;
  }

  // Garantir que são booleanos explícitos
  const hasSeen = hasSeenOnboarding === true;
  const isAuth = isAuthenticated === true;

  // Renderizar tela atual
  switch (currentScreen) {
    case 'onboarding':
      return <OnboardingScreenSimplified navigation={navigation} />;
    case 'login':
      return <LoginScreen navigation={navigation} />;
    case 'register':
      return <RegisterScreen navigation={navigation} />;
    case 'forgotPassword':
      return <ForgotPasswordScreen navigation={navigation} />;
    case 'home':
      return <HomeScreen />;
    default:
      if (!hasSeen) {
        return <OnboardingScreenSimplified navigation={navigation} />;
      } else if (!isAuth) {
        return <LoginScreen navigation={navigation} />;
      } else {
        return <HomeScreen />;
      }
  }
};

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <AppContent />
          <StatusBar style="dark" />
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
