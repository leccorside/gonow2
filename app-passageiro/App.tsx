import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/theme/ThemeContext';
import { SplashScreenSimplified } from './src/screens/SplashScreenSimplified';
import { OnboardingScreenSimplified } from './src/screens/OnboardingScreenSimplified';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { TripRequestScreen } from './src/screens/TripRequestScreen';
import { VehicleSelectionScreen } from './src/screens/VehicleSelectionScreen';
import { TripActiveScreen } from './src/screens/TripActiveScreen';
import { TripRatingScreen } from './src/screens/TripRatingScreen';
import { TripHistoryScreen } from './src/screens/TripHistoryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { BottomNavigation } from './src/components';
import type { BottomTab } from './src/components';

// Navegação manual sem NavigationContainer (temporário até resolver o problema)
type Screen = 
  | 'splash' 
  | 'onboarding' 
  | 'login' 
  | 'register' 
  | 'forgotPassword' 
  | 'home'
  | 'tripRequest'
  | 'vehicleSelection'
  | 'tripActive'
  | 'tripRating'
  | 'tripHistory'
  | 'profile'
  | 'settings';

const AppContent: React.FC = () => {
  const { loading, hasSeenOnboarding, isAuthenticated } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [currentBottomTab, setCurrentBottomTab] = useState<BottomTab>('home');

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
      'tripRequest': 'tripRequest',
      'vehicleSelection': 'vehicleSelection',
      'tripActive': 'tripActive',
      'tripRating': 'tripRating',
      'tripHistory': 'tripHistory',
      'profile': 'profile',
      'settings': 'settings',
    };
    return mapping[screen] || 'home';
  };

  // Criar objeto de navegação mock
  const navigation = {
    navigate: (screen: string) => {
      const mappedScreen = mapScreenName(screen);
      setCurrentScreen(mappedScreen);
      
      // Atualizar bottom tab se necessário
      if (mappedScreen === 'home') {
        setCurrentBottomTab('home');
      } else if (mappedScreen === 'tripHistory') {
        setCurrentBottomTab('history');
      } else if (mappedScreen === 'profile') {
        setCurrentBottomTab('profile');
      } else if (mappedScreen === 'settings') {
        setCurrentBottomTab('settings');
      }
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
            setCurrentBottomTab('home');
          }
        }, 1000);
      } else if (isAuth && currentScreen !== 'home' && 
                 !['tripRequest', 'vehicleSelection', 'tripActive', 'tripRating'].includes(currentScreen)) {
        // Se autenticou em uma tela que não é home, não mudar automaticamente
        // Mas se estiver em login/register, ir para home
        if (['login', 'register', 'forgotPassword'].includes(currentScreen)) {
          setCurrentScreen('home');
          setCurrentBottomTab('home');
        }
      } else if (!isAuth && (currentScreen === 'home' || 
                 ['tripHistory', 'profile', 'settings'].includes(currentScreen))) {
        // Se desautenticou, ir para login
        setCurrentScreen('login');
      }
    }
  }, [loading, hasSeenOnboarding, isAuthenticated]);

  // Handler para mudança de bottom tab
  const handleBottomTabChange = (tab: BottomTab) => {
    setCurrentBottomTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'history':
        setCurrentScreen('tripHistory');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
    }
  };

  if (loading === true || currentScreen === 'splash') {
    return <SplashScreenSimplified />;
  }

  // Garantir que são booleanos explícitos
  const hasSeen = hasSeenOnboarding === true;
  const isAuth = isAuthenticated === true;

  // Renderizar tela atual
  const renderScreen = () => {
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
        return <HomeScreen navigation={navigation} />;
      case 'tripRequest':
        return <TripRequestScreen navigation={navigation} />;
      case 'vehicleSelection':
        return <VehicleSelectionScreen navigation={navigation} />;
      case 'tripActive':
        return <TripActiveScreen navigation={navigation} />;
      case 'tripRating':
        return <TripRatingScreen navigation={navigation} />;
      case 'tripHistory':
        return <TripHistoryScreen navigation={navigation} />;
      case 'profile':
        return <ProfileScreen navigation={navigation} />;
      case 'settings':
        return <SettingsScreen navigation={navigation} />;
      default:
        if (!hasSeen) {
          return <OnboardingScreenSimplified navigation={navigation} />;
        } else if (!isAuth) {
          return <LoginScreen navigation={navigation} />;
        } else {
          return <HomeScreen navigation={navigation} />;
        }
    }
  };

  // Determinar se deve mostrar bottom navigation
  // Mostrar em todas as telas principais e durante o fluxo de viagem
  const showBottomNav = isAuth && [
    'home', 
    'tripHistory', 
    'profile', 
    'settings',
    'tripRequest',
    'vehicleSelection',
    'tripActive',
    'tripRating'
  ].includes(currentScreen);

  // Determinar qual tab deve estar ativa baseado na tela atual
  const getCurrentTab = (): BottomTab => {
    if (currentScreen === 'home') return 'home';
    if (currentScreen === 'tripHistory') return 'history';
    if (currentScreen === 'profile') return 'profile';
    if (currentScreen === 'settings') return 'settings';
    // Para telas de viagem, manter o tab atual ou usar 'home' como padrão
    return currentBottomTab;
  };

  return (
    <>
      {renderScreen()}
      {showBottomNav && (
        <BottomNavigation 
          currentTab={getCurrentTab()} 
          onTabChange={handleBottomTabChange} 
        />
      )}
    </>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
            <StatusBar style="auto" />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
