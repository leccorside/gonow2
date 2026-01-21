import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { spacing, typography } from '../theme';
import { Button, Input } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme/ThemeContext';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const styles = createStyles(colors);

  const handleLogin = async () => {
    if (!phoneNumber) {
      Alert.alert('Atenção', 'Preencha o número de telefone');
      return;
    }

    setLoading(true);
    // Simular login com telefone
    setTimeout(() => {
      setLoading(false);
      // Por enquanto, usar login mock
      login('phone@mock.com', 'mock');
    }, 1500);
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
        <Text style={styles.title}>Log In</Text>

        {/* Instruction */}
        <Text style={styles.instruction}>
          Enter your phone number to receive a verification code
        </Text>

        {/* Phone Number Input */}
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.flagIcon}>🇹🇷</Text>
            <Text style={styles.countryCode}>+90</Text>
          </View>
          <View style={styles.phoneInput}>
            <Input
              placeholder="5xx xxx xx xx"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              containerStyle={styles.phoneField}
            />
          </View>
        </View>

        {/* Save Button */}
        <Button
          title="Save"
          onPress={handleLogin}
          loading={loading}
          variant="primary"
          style={styles.saveButton}
        />

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Text style={styles.socialIcon}>G+</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Sign Up</Text>
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
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.md,
    overflow: 'hidden',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  flagIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  countryCode: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  phoneInput: {
    flex: 1,
  },
  phoneField: {
    marginBottom: 0,
  },
  saveButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1877F2', // Facebook blue
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437', // Google red
  },
  socialIcon: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textWhite,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  registerText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: typography.sizes.md,
    color: colors.secondary,
    fontWeight: typography.weights.semibold,
  },
});
