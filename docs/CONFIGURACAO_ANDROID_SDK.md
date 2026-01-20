# Configuração do Android SDK para GoNow

## Passo a Passo

### 1. Instalar Android Studio

1. Baixe o Android Studio em: https://developer.android.com/studio
2. Instale seguindo o assistente de instalação
3. Durante a instalação, certifique-se de instalar:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

### 2. Configurar Variáveis de Ambiente

#### Windows:

1. Abra as **Variáveis de Ambiente do Sistema**:
   - Pressione `Win + R`
   - Digite `sysdm.cpl` e pressione Enter
   - Vá na aba **Avançado**
   - Clique em **Variáveis de Ambiente**

2. Crie/Edite as seguintes variáveis:

   **ANDROID_HOME:**
   - Nome: `ANDROID_HOME`
   - Valor: `C:\Users\pc johnathan\AppData\Local\Android\Sdk`
   - (Ou o caminho onde você instalou o Android SDK)

   **Path:**
   - Adicione os seguintes caminhos ao Path:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\tools`
     - `%ANDROID_HOME%\tools\bin`

3. Reinicie o terminal/PowerShell após configurar

### 3. Verificar Instalação

Abra um novo terminal e execute:

```bash
# Verificar se o adb está funcionando
adb version

# Verificar se o Android SDK está configurado
echo $env:ANDROID_HOME
```

### 4. Criar um Emulador Android

1. Abra o Android Studio
2. Vá em **Tools > Device Manager**
3. Clique em **Create Device**
4. Escolha um dispositivo (ex: Pixel 5)
5. Escolha uma imagem do sistema (recomendado: API 33 ou superior)
6. Finalize a criação

### 5. Testar o App

```bash
cd app-motorista
npm start
# Pressione 'a' para abrir no Android
```

## Alternativa: Usar Expo Go (Mais Simples)

Se não quiser configurar o Android SDK agora, você pode:

1. Instalar o app **Expo Go** no seu celular
2. Executar `npm start` no projeto
3. Escanear o QR code com o Expo Go

Isso não requer configuração do Android SDK!
