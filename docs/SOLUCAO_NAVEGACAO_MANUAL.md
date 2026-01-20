# Solução: Navegação Manual (Workaround para React Navigation)

## Problema Identificado

O erro `java.lang.String cannot be cast to java.lang.Boolean` persistia quando o `NavigationContainer` do React Navigation era utilizado, mesmo com todas as props booleanas explicitamente definidas.

## Solução Implementada

Foi implementada uma **navegação manual** usando `useState` para controlar qual tela está sendo exibida, eliminando temporariamente a dependência do `NavigationContainer`.

### Arquivos Modificados

- `app-motorista/App.tsx`
- `app-passageiro/App.tsx`
- `app-motorista/src/screens/OnboardingScreenSimplified.tsx`
- `app-passageiro/src/screens/OnboardingScreenSimplified.tsx`

### Implementação

#### 1. Tipo de Tela
```typescript
type Screen = 'splash' | 'onboarding' | 'login' | 'register' | 'forgotPassword' | 'home';
```

#### 2. Estado de Navegação
```typescript
const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
```

#### 3. Objeto Navigation Mock
```typescript
const navigation = {
  navigate: (screen: string) => {
    const mappedScreen = mapScreenName(screen);
    setCurrentScreen(mappedScreen);
  },
};
```

#### 4. Mapeamento de Telas
```typescript
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
```

#### 5. Auto-navegação com useEffect
```typescript
useEffect(() => {
  if (!loading) {
    const hasSeen = hasSeenOnboarding === true;
    const isAuth = isAuthenticated === true;
    
    if (currentScreen === 'splash') {
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
      setCurrentScreen('home');
    } else if (!isAuth && (currentScreen === 'home')) {
      setCurrentScreen('login');
    }
  }
}, [loading, hasSeenOnboarding, isAuthenticated]);
```

#### 6. Renderização Condicional
```typescript
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
    // Fallback baseado no estado de autenticação
    if (!hasSeen) {
      return <OnboardingScreenSimplified navigation={navigation} />;
    } else if (!isAuth) {
      return <LoginScreen navigation={navigation} />;
    } else {
      return <HomeScreen />;
    }
}
```

## Vantagens

1. ✅ **Funciona sem erros**: Elimina o problema do React Navigation
2. ✅ **Compatível**: As telas existentes continuam funcionando com o objeto `navigation` mock
3. ✅ **Simples**: Implementação direta e fácil de entender
4. ✅ **Auto-navegação**: Redireciona automaticamente baseado no estado de autenticação

## Desvantagens

1. ⚠️ **Temporário**: Esta é uma solução de contorno até resolver o problema do React Navigation
2. ⚠️ **Sem histórico**: Não mantém histórico de navegação (não pode voltar com gesto)
3. ⚠️ **Sem deep linking**: Não suporta deep linking nativo
4. ⚠️ **Sem animações**: Não tem as animações padrão do React Navigation

## Próximos Passos

1. Investigar a causa raiz do problema com React Navigation
2. Verificar versões compatíveis do React Navigation com Expo Go
3. Considerar atualizar para uma versão mais recente do React Navigation
4. Quando resolver, migrar de volta para React Navigation com todas as funcionalidades

## Status

✅ **Funcionando**: As telas aparecem normalmente e a navegação funciona corretamente.
