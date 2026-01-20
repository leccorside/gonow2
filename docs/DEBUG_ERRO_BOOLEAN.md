# Sistema de Debug para Erro Boolean

## O que foi implementado

### 1. Error Boundary
- Componente que captura erros de renderização
- Mostra detalhes do erro na tela
- Exibe stack trace completo
- Permite tentar novamente

**Localização:** `src/components/ErrorBoundary/ErrorBoundary.tsx`

### 2. Validador de Props
- Função `ensureBoolean()` que garante conversão segura
- Função `logPropValue()` que registra props no console
- Função `validateBooleanProps()` para validação em massa

**Localização:** `src/utils/propValidator.ts`

### 3. Logs Detalhados
- Logs em todos os componentes críticos
- Mostra tipo e valor de cada prop booleana
- Avisos quando props não são booleanas

## Como usar

### Ver logs no Console do Metro

1. Abra o terminal onde está rodando `npm start` ou `expo start`
2. Procure por logs que começam com:
   - `🔍 [ComponentName]` - Logs de props
   - `⚠️ [ComponentName]` - Avisos de props inválidas
   - `🚨 ErrorBoundary` - Erros capturados

### Ver erro na tela

Se o ErrorBoundary capturar um erro, você verá:
- Tipo do erro
- Mensagem do erro
- Stack trace completo
- Component stack (onde o erro ocorreu)

### Identificar o problema

1. **Verifique os logs do console:**
   ```
   🔍 [Input] secureTextEntry: { value: true, type: 'boolean', ... }
   ⚠️ [Input] Prop secureTextEntry não é boolean: string true
   ```

2. **Verifique o ErrorBoundary:**
   - Se aparecer na tela, leia o stack trace
   - Identifique qual componente está causando o erro
   - Veja o "Component Stack" para saber onde renderizar

3. **Procure por padrões:**
   - Se vários componentes têm o mesmo problema
   - Se o erro sempre ocorre no mesmo lugar
   - Se há props sendo passadas incorretamente

## Exemplo de Logs

```
🔍 [Input] secureTextEntry: {
  value: true,
  type: 'boolean',
  isBoolean: true,
  isString: false
}

⚠️ [Button] Prop disabled não é boolean: string "false"

🚨 ErrorBoundary capturou um erro: Error: String cannot be cast to Boolean
📋 Error Info: { componentStack: '...' }
📍 Stack: '...'
```

## Próximos Passos

1. **Execute o app** e observe os logs
2. **Identifique qual componente** está causando o erro
3. **Verifique as props** desse componente
4. **Corrija a prop** problemática

## Desabilitar Logs (Produção)

Os logs só aparecem em modo desenvolvimento (`__DEV__`). Em produção, eles são automaticamente desabilitados.
