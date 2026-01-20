import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'motorista' | 'passageiro';
  phone?: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  type: 'motorista' | 'passageiro';
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState<boolean>(false);

  useEffect(() => {
    // Adiar a leitura do storage para evitar problemas na renderização inicial
    const timer = setTimeout(() => {
      loadStorageData();
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  async function loadStorageData() {
    try {
      // Limpar dados corrompidos primeiro
      try {
        const onboardingData = await AsyncStorage.getItem('@gonow:onboarding');
        if (onboardingData && onboardingData !== 'true' && onboardingData !== 'false') {
          console.log('⚠️ Limpando onboarding corrompido:', onboardingData);
          await AsyncStorage.removeItem('@gonow:onboarding');
        }
      } catch (e) {
        console.error('Erro ao verificar onboarding:', e);
      }

      const [userData, onboardingData] = await Promise.all([
        AsyncStorage.getItem('@gonow:user'),
        AsyncStorage.getItem('@gonow:onboarding'),
      ]);

      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          if (parsed && typeof parsed === 'object') {
            setUser(parsed);
          }
        } catch (e) {
          console.error('Erro ao parsear userData:', e);
          await AsyncStorage.removeItem('@gonow:user');
        }
      }

      // Tratamento seguro do onboarding
      let hasSeen = false;
      if (onboardingData === 'true') {
        hasSeen = true;
      } else if (onboardingData === 'false') {
        hasSeen = false;
      } else if (onboardingData !== null && onboardingData !== undefined) {
        // Tentar parsear se não for string direta
        try {
          const parsed = JSON.parse(onboardingData);
          hasSeen = parsed === true;
        } catch (e) {
          // Se falhar, limpa e assume false
          console.error('Erro ao parsear onboarding:', e);
          await AsyncStorage.removeItem('@gonow:onboarding');
          hasSeen = false;
        }
      }
      
      setHasSeenOnboardingState(hasSeen);
    } catch (error) {
      console.error('Erro ao carregar dados do storage:', error);
      setHasSeenOnboardingState(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    try {
      // Mock de autenticação - em produção, isso viria de uma API
      // Simulando delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock: aceita qualquer email/senha para teste
      const mockUser: User = {
        id: '1',
        email,
        name: 'Motorista Teste',
        type: 'motorista',
        phone: '(11) 99999-9999',
      };

      await AsyncStorage.setItem('@gonow:user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  }

  async function register(userData: RegisterData): Promise<boolean> {
    try {
      // Mock de registro - em produção, isso viria de uma API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        type: userData.type,
        phone: userData.phone,
      };

      await AsyncStorage.setItem('@gonow:user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    }
  }

  async function logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('@gonow:user');
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  async function setHasSeenOnboarding(value: boolean): Promise<void> {
    try {
      // Salvar como string "true" ou "false" para evitar problemas de parse
      const stringValue = value === true ? 'true' : 'false';
      await AsyncStorage.setItem('@gonow:onboarding', stringValue);
      setHasSeenOnboardingState(value === true);
    } catch (error) {
      console.error('Erro ao salvar onboarding:', error);
    }
  }

  // Garantir que todos os valores são booleanos explícitos
  const loadingValue = loading === true;
  const isAuthValue = user !== null && user !== undefined;
  const hasSeenValue = hasSeenOnboarding === true;

  // Log para debug
  if (__DEV__) {
    console.log('🔍 [AuthContext.Provider] Valores:', {
      loading: { value: loadingValue, type: typeof loadingValue, original: loading },
      isAuthenticated: { value: isAuthValue, type: typeof isAuthValue, user: user !== null },
      hasSeenOnboarding: { value: hasSeenValue, type: typeof hasSeenValue, original: hasSeenOnboarding },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loadingValue,
        isAuthenticated: isAuthValue,
        login,
        register,
        logout,
        hasSeenOnboarding: hasSeenValue,
        setHasSeenOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
