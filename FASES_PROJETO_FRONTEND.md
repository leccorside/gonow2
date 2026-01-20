# FASES DO PROJETO FRONTEND - GoNow

## Visão Geral
Projeto GoNow - Aplicativo de transporte similar ao Uber, com 2 aplicativos React Native (Motorista e Passageiro) e 1 painel administrativo web.

**Cores principais:** Preto (#000000) e Laranja (#FF6B35 ou similar)

---

## FASE 1: Configuração Inicial e Estrutura Base
**Objetivo:** Configurar o ambiente de desenvolvimento e criar a estrutura base dos projetos.

### Tarefas:
- [ ] Configurar projeto React Native para App Motorista
- [ ] Configurar projeto React Native para App Passageiro
- [ ] Configurar projeto React/Next.js para Painel Administrativo
- [ ] Configurar estrutura de pastas e organização de código
- [ ] Configurar tema de cores (preto e laranja)
- [ ] Configurar bibliotecas base (navegação, estado, etc.)
- [ ] Criar componentes base reutilizáveis (botões, inputs, cards)
- [ ] Configurar tipografia e estilos globais

**Tecnologias:**
- React Native (Expo ou CLI)
- React Navigation
- Styled Components ou NativeWind
- React/Next.js para painel admin

**Resultado esperado:** Estrutura base funcional com tema de cores aplicado.

---

## FASE 2: Autenticação e Onboarding
**Objetivo:** Implementar fluxos de autenticação e telas de boas-vindas.

### Tarefas:
- [ ] Tela de Splash Screen
- [ ] Tela de Login (com opções de tipo de usuário)
- [ ] Tela de Cadastro Passageiro
- [ ] Tela de Cadastro Motorista (inicial, sem upload ainda)
- [ ] Tela de Recuperação de Senha
- [ ] Tela de Onboarding (apresentação do app)
- [ ] Implementar autenticação básica (mock/localStorage)
- [ ] Navegação entre telas de autenticação

**Resultado esperado:** Fluxo completo de autenticação funcional em ambos os apps.

---

## FASE 3: App Passageiro - Telas Principais
**Objetivo:** Criar as telas principais do aplicativo do passageiro.

### Tarefas:
- [ ] Tela Home/Mapa (com mapa integrado - mock inicial)
- [ ] Tela de Solicitação de Viagem
- [ ] Tela de Seleção de Tipo de Veículo (carro/moto)
- [ ] Tela de Viagem em Andamento
- [ ] Tela de Avaliação do Motorista (5 estrelas)
- [ ] Tela de Histórico de Viagens
- [ ] Tela de Perfil do Passageiro
- [ ] Tela de Configurações
- [ ] Bottom Navigation Bar

**Resultado esperado:** Navegação completa do app passageiro com todas as telas principais.

---

## FASE 4: App Passageiro - Funcionalidades de Mapa e Localização
**Objetivo:** Implementar integração com mapas e localização em tempo real.

### Tarefas:
- [ ] Integração com Google Maps API
- [ ] Integração com Waze (deep linking)
- [ ] Localização atual do usuário
- [ ] Busca de endereços e autocomplete
- [ ] Marcadores no mapa
- [ ] Rota entre origem e destino
- [ ] Visualização de motoristas próximos (mock)
- [ ] Atualização de localização em tempo real (mock)
- [ ] Animação de movimento do veículo no mapa

**Resultado esperado:** Mapa funcional com localização e rotas visíveis.

---

## FASE 5: App Passageiro - Pagamento e Checkout
**Objetivo:** Implementar telas e fluxo de pagamento.

### Tarefas:
- [ ] Tela de Seleção de Método de Pagamento
- [ ] Tela de Cadastro de Cartão de Crédito
- [ ] Tela de Histórico de Pagamentos
- [ ] Integração visual com Mercado Pago (mock)
- [ ] Opções: PIX, Cartão de Crédito, Dinheiro
- [ ] Tela de Confirmação de Pagamento
- [ ] Tela de Recibo/Comprovante

**Resultado esperado:** Fluxo completo de pagamento implementado (UI apenas).

---

## FASE 6: App Motorista - Telas Principais
**Objetivo:** Criar as telas principais do aplicativo do motorista.

### Tarefas:
- [ ] Tela Home/Mapa (com mapa integrado)
- [ ] Tela de Status Online/Offline
- [ ] Tela de Aceitar/Recusar Corrida
- [ ] Tela de Viagem em Andamento
- [ ] Tela de Finalização de Viagem
- [ ] Tela de Avaliação do Passageiro (5 estrelas)
- [ ] Tela de Histórico de Viagens
- [ ] Tela de Ganhos/Financeiro
- [ ] Tela de Perfil do Motorista
- [ ] Tela de Configurações
- [ ] Bottom Navigation Bar

**Resultado esperado:** Navegação completa do app motorista com todas as telas principais.

---

## FASE 7: App Motorista - Cadastro e Documentos
**Objetivo:** Implementar fluxo completo de cadastro com upload de documentos.

### Tarefas:
- [ ] Tela de Cadastro Inicial
- [ ] Tela de Upload de Documentos:
  - [ ] Documento do Carro/Moto
  - [ ] RG
  - [ ] CPF
  - [ ] CNH
  - [ ] Foto do Rosto
- [ ] Preview dos documentos enviados
- [ ] Tela de Status do Cadastro (Pendente/Aprovado/Rejeitado)
- [ ] Tela de Aguardando Aprovação
- [ ] Validação de campos e documentos
- [ ] Integração com câmera/galeria para upload

**Resultado esperado:** Fluxo completo de cadastro com upload de documentos funcional.

---

## FASE 8: App Motorista - Mapa e Navegação
**Objetivo:** Implementar funcionalidades de mapa e navegação para motorista.

### Tarefas:
- [ ] Integração com Google Maps API
- [ ] Integração com Waze (deep linking)
- [ ] Localização atual do motorista
- [ ] Visualização de solicitações de corrida próximas
- [ ] Rota para buscar passageiro
- [ ] Rota para destino do passageiro
- [ ] Atualização de localização em tempo real
- [ ] Animação de movimento do veículo no mapa
- [ ] Modo navegação durante corrida

**Resultado esperado:** Mapa funcional com navegação completa para motorista.

---

## FASE 9: Painel Administrativo - Autenticação e Dashboard
**Objetivo:** Criar painel administrativo com autenticação e dashboard principal.

### Tarefas:
- [ ] Tela de Login Administrativo
- [ ] Dashboard Principal com estatísticas
- [ ] Sidebar/Navegação lateral
- [ ] Layout responsivo
- [ ] Tema de cores (preto e laranja)
- [ ] Cards de métricas (total de usuários, corridas, etc.)

**Resultado esperado:** Painel administrativo funcional com dashboard.

---

## FASE 10: Painel Administrativo - Gerenciamento de Motoristas
**Objetivo:** Implementar funcionalidades de gerenciamento de motoristas.

### Tarefas:
- [ ] Lista de Motoristas (com filtros e busca)
- [ ] Detalhes do Motorista
- [ ] Visualização de Documentos Enviados
- [ ] Aprovar/Rejeitar Cadastro de Motorista
- [ ] Histórico de Viagens do Motorista
- [ ] Bloquear/Desbloquear Motorista
- [ ] Estatísticas do Motorista

**Resultado esperado:** Sistema completo de gerenciamento de motoristas.

---

## FASE 11: Painel Administrativo - Gerenciamento de Passageiros
**Objetivo:** Implementar funcionalidades de gerenciamento de passageiros.

### Tarefas:
- [ ] Lista de Passageiros (com filtros e busca)
- [ ] Detalhes do Passageiro
- [ ] Histórico de Viagens do Passageiro
- [ ] Bloquear/Desbloquear Passageiro
- [ ] Estatísticas do Passageiro

**Resultado esperado:** Sistema completo de gerenciamento de passageiros.

---

## FASE 12: Painel Administrativo - Gerenciamento de Viagens
**Objetivo:** Implementar visualização e gerenciamento de viagens.

### Tarefas:
- [ ] Lista de Viagens (com filtros e busca)
- [ ] Detalhes da Viagem
- [ ] Visualização de Rota no Mapa
- [ ] Histórico Completo de Viagens
- [ ] Relatórios de Viagens
- [ ] Filtros por data, status, motorista, passageiro

**Resultado esperado:** Sistema completo de visualização e gerenciamento de viagens.

---

## FASE 13: Painel Administrativo - Configurações e Relatórios
**Objetivo:** Implementar configurações gerais e relatórios do sistema.

### Tarefas:
- [ ] Tela de Configurações Gerais
- [ ] Gerenciamento de Tarifas
- [ ] Relatórios Financeiros
- [ ] Relatórios de Uso
- [ ] Exportação de Dados
- [ ] Gerenciamento de Administradores

**Resultado esperado:** Painel completo com configurações e relatórios.

---

## FASE 14: Polimento e Ajustes Finais
**Objetivo:** Refinar a experiência do usuário e corrigir detalhes.

### Tarefas:
- [ ] Revisão de todas as telas
- [ ] Ajustes de UX/UI
- [ ] Animações e transições
- [ ] Loading states e feedbacks visuais
- [ ] Tratamento de erros e estados vazios
- [ ] Testes de usabilidade
- [ ] Ajustes de responsividade
- [ ] Otimização de performance
- [ ] Ajustes finais de cores e tipografia

**Resultado esperado:** Aplicativos e painel completamente polidos e prontos para integração com backend.

---

## Observações Importantes

1. **Aguardar autorização:** Após cada fase, aguardar aprovação antes de iniciar a próxima.
2. **Commits:** Ao final de cada fase, será criado um resumo para commit.
3. **Mock Data:** Durante o desenvolvimento do frontend, usar dados mockados.
4. **Integrações:** APIs do Google Maps e Waze serão integradas visualmente, mas sem backend real ainda.
5. **Pagamentos:** Interface do Mercado Pago será criada, mas integração real será no backend.

---

## Tecnologias Sugeridas

### Apps React Native:
- React Native (Expo recomendado para desenvolvimento mais rápido)
- React Navigation
- React Native Maps (Google Maps)
- React Native Paper ou NativeBase (componentes UI)
- AsyncStorage (armazenamento local)
- React Hook Form (formulários)
- React Native Image Picker (upload de documentos)

### Painel Administrativo:
- Next.js ou React + Vite
- React Router ou Next.js Router
- Material-UI ou Tailwind CSS
- React Query ou SWR (gerenciamento de estado servidor)
- Recharts ou Chart.js (gráficos)

---

**Status Atual:** Aguardando início da FASE 1
