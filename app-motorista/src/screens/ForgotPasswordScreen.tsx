import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Button, Input } from '../components';

interface ForgotPasswordScreenProps {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
            style={styles.backButton}
          >
            <Text style={styles.backText}>Voltar para o login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
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
    marginTop: spacing.md,
  },
  backButton: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  backText: {
    fontSize: typography.sizes.md,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
});
