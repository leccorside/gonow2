# Instruções para Debug do Erro Boolean

## Situação Atual

Os logs mostram que as props booleanas dos componentes que estamos logando estão corretas:
- ✅ OnboardingScrollView: todas as props são booleanas
- ✅ Button: todas as props são booleanas

**MAS o erro ainda persiste!**

Isso significa que o problema está em:
1. Alguma biblioteca externa (React Navigation, SafeAreaProvider, etc.)
2. Algum componente que não estamos logando
3. Alguma prop sendo passada através do spread operator `{...props}`

## Próximos Passos para Identificar

### 1. Verifique os Novos Logs

Agora adicionamos logs em:
- `[AppContent]` - Estados e condições antes de renderizar
- `[AuthContext.Provider]` - Valores do contexto
- `[AuthNavigator]` - Props do navigator

**Execute o app e procure por:**
```
🔍 [AppContent] Estados: ...
🔍 [AppContent] Condições: ...
🔍 [AppContent] Renderizando NavigationContainer: ...
🔍 [AuthContext.Provider] Valores: ...
🔍 [AuthNavigator] headerShown: ...
```

### 2. Verifique o ErrorBoundary

Se o erro aparecer na tela do ErrorBoundary:
- **Leia o "Component Stack"** - mostra exatamente qual componente causou o erro
- **Leia o "Stack Trace"** - mostra a linha exata do erro
- **Copie essas informações** e me envie

### 3. Verifique o Console do Metro

Procure por:
- `⚠️` - Avisos de props inválidas
- `❌` - Erros capturados
- `🔍` - Logs de debug

### 4. Informações que Preciso

Quando o erro ocorrer, me envie:

1. **Todos os logs do console** (especialmente os que começam com 🔍)
2. **Screenshot do ErrorBoundary** (se aparecer na tela)
3. **Stack trace completo** do erro
4. **Qual tela estava sendo renderizada** quando o erro ocorreu

## Possíveis Causas

### 1. React Navigation
O erro pode estar vindo do `NavigationContainer` ou `Stack.Navigator`. Verifique se há alguma prop sendo passada incorretamente.

### 2. SafeAreaProvider
Pode estar passando props booleanas incorretas.

### 3. StatusBar
O `style="dark"` pode estar causando problemas.

### 4. Bibliotecas Externas
- `react-native-paper` (instalado mas não usado)
- `react-native-screens`
- `react-native-safe-area-context`

## Solução Temporária

Se quiser testar sem o NavigationContainer:

1. Comente temporariamente o NavigationContainer
2. Renderize apenas o SplashScreen
3. Veja se o erro ainda ocorre

Isso ajudará a isolar se o problema está no NavigationContainer ou em outro lugar.

## Próxima Ação

**Execute o app novamente e me envie:**
1. Todos os logs do console (especialmente os 🔍)
2. Se o ErrorBoundary aparecer, copie o stack trace completo
3. Qual tela estava sendo renderizada quando o erro ocorreu

Com essas informações, conseguirei identificar exatamente onde está o problema!
