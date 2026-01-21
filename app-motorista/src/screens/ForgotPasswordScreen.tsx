import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { spacing, typography } from '../theme';
import { Button, Input } from '../components';
import { useTheme } from '../theme/ThemeContext';

interface ForgotPasswordScreenProps {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = createStyles(colors);

  const handleRecover = async () => {
    if (!email) {
      Alert.alert('Atenção', 'Digite seu email');
      return;
    }

    setLoading(true);
    // Simulando envio de email
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    Alert.alert(
      'Email Enviado',
      'Enviamos um link de recuperação para seu email. Verifique sua caixa de entrada.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>
            Digite seu email e enviaremos um link para redefinir sua senha
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Button
            title="Enviar Link"
            onPress={handleRecover}
            loading={loading}
            variant="primary"
            style={styles.recoverButton}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text style={styles.loginLinkText}>Voltar para Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  backIcon: {
    fontSize: typography.sizes.xxl,
    color: colors.text,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  recoverButton: {
    marginTop: spacing.lg,
  },
  loginLink: {
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
  loginLinkText: {
    fontSize: typography.sizes.md,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
});
