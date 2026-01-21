import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { spacing, typography } from '../theme';
import { Button, Input } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme/ThemeContext';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const styles = createStyles(colors);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Atenção', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    const success = await register({
      name,
      email,
      phone,
      password,
      type: 'passageiro',
    });
    setLoading(false);

    if (!success) {
      Alert.alert('Erro', 'Não foi possível criar a conta');
    }
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
        {/* Header Illustration Placeholder */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationIcon}>🚕</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome</Text>

        {/* Instruction */}
        <Text style={styles.instruction}>
          Enter your personal information
        </Text>

        {/* Name Surname Input */}
        <Input
          label="Name Surname"
          placeholder="Enter name surname"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        {/* Email Input */}
        <Input
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        {/* Save Button */}
        <Button
          title="Save"
          onPress={handleRegister}
          loading={loading}
          variant="primary"
          style={styles.saveButton}
        />

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log In</Text>
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
    paddingTop: spacing.xxl,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    height: 150,
    justifyContent: 'center',
  },
  illustrationIcon: {
    fontSize: 100,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  instruction: {
    fontSize: typography.sizes.md,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  saveButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  loginText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: typography.sizes.md,
    color: colors.secondary,
    fontWeight: typography.weights.semibold,
  },
});
