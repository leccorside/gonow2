# Solução para Erro: String cannot be cast to Boolean

## Erro
```
java.lang.String cannot be cast to java.lang.Boolean
```

## Causa
O erro ocorre quando valores booleanos são salvos ou lidos incorretamente do AsyncStorage, ou quando props booleanas são passadas como strings para componentes nativos.

## Soluções Aplicadas

### 1. Correções nos Componentes
- ✅ Componente `Input`: Props booleanas (`secureTextEntry`, `editable`, `multiline`) agora são explicitamente convertidas
- ✅ Componente `Button`: Props `disabled` e `loading` são explicitamente booleanas
- ✅ Navegadores: `headerShown` é explicitamente boolean

### 2. Correções no AuthContext
- ✅ Leitura segura do AsyncStorage com tratamento de erros
- ✅ Conversão explícita de strings para boolean
- ✅ Limpeza automática de dados corrompidos

### 3. Correções no App.tsx
- ✅ Comparações estritas (`=== true`) em vez de `Boolean()`
- ✅ Limpeza automática de dados corrompidos na inicialização

## Como Resolver o Erro

### Opção 1: Limpar o Storage Manualmente (Recomendado)

**No terminal do Expo:**
1. Pare o app (Ctrl+C)
2. Execute:
```bash
# Para limpar o cache do Metro
npx expo start --clear
```

**Ou desinstale e reinstale o app:**
- Android: Desinstale o app do dispositivo/emulador e reinstale
- iOS: Desinstale o app do simulador e reinstale

### Opção 2: Limpar o Storage via Código (Temporário)

1. Abra `app-motorista/App.tsx` ou `app-passageiro/App.tsx`
2. Descomente as linhas:
```typescript
import { clearAllStorage } from './src/utils/debugStorage';
```
E dentro do `useEffect`:
```typescript
await clearAllStorage();
```

3. Execute o app uma vez
4. **IMPORTANTE**: Comente novamente essas linhas após limpar

### Opção 3: Limpar via DevTools

Se estiver usando React Native Debugger ou similar:
```javascript
// No console do debugger
const AsyncStorage = require('@react-native-async-storage/async-storage').default;
AsyncStorage.clear();
```

## Verificação

Após limpar o storage, o app deve:
1. Mostrar a tela de Splash
2. Carregar o Onboarding (primeira vez)
3. Permitir login/cadastro normalmente

## Prevenção

As correções aplicadas previnem que o erro ocorra novamente:
- ✅ Todas as props booleanas são explicitamente convertidas
- ✅ Leitura segura do AsyncStorage
- ✅ Limpeza automática de dados corrompidos

## Se o Erro Persistir

1. Verifique o console do Metro para logs de erro
2. Verifique se há dados corrompidos no AsyncStorage
3. Tente limpar completamente o storage (Opção 2)
4. Verifique se todas as dependências estão atualizadas:
```bash
npm install
```

## Arquivos Modificados

- `src/components/Input/Input.tsx` - Props booleanas explícitas
- `src/components/Button/Button.tsx` - Props booleanas explícitas
- `src/contexts/AuthContext.tsx` - Leitura segura do storage
- `App.tsx` - Comparações estritas e limpeza automática
- `src/navigation/*.tsx` - Props booleanas explícitas
