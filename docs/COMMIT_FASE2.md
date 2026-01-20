# COMMIT FASE 2

```
feat: Implementação completa de autenticação e onboarding

- Criado contexto de autenticação (AuthContext) com gerenciamento de estado
- Implementado sistema de login e registro mock com AsyncStorage
- Criada tela de Splash Screen para ambos os apps
- Implementada tela de Onboarding com 3 slides interativos
- Criada tela de Login com validações e navegação
- Criada tela de Cadastro (Motorista e Passageiro) com validações completas
- Implementada tela de Recuperação de Senha
- Criada tela Home temporária para usuários autenticados
- Configurada navegação com React Navigation (AuthNavigator e AppNavigator)
- Integrado fluxo completo de autenticação nos App.tsx
- Implementado controle de primeira vez (onboarding)
- Persistência de sessão com AsyncStorage

Telas criadas:
- SplashScreen - Tela de carregamento inicial
- OnboardingScreen - Apresentação do app (3 slides)
- LoginScreen - Login com email e senha
- RegisterScreen - Cadastro completo
- ForgotPasswordScreen - Recuperação de senha
- HomeScreen - Tela inicial após autenticação (temporária)

Funcionalidades:
- Login e registro mock funcionais
- Validações de formulário (campos obrigatórios, senha mínima, confirmação)
- Loading states em todas as ações assíncronas
- Feedback visual de erros e sucesso
- Navegação fluida entre telas
- Persistência de sessão e preferências
- KeyboardAvoidingView para melhor UX

Estrutura:
- contexts/AuthContext.tsx - Gerenciamento de autenticação
- screens/ - Todas as telas de autenticação
- navigation/ - Navegadores de autenticação e app

Pronto para Fase 3: Telas principais do app passageiro
```
