import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingScreenSimplifiedProps {
  navigation?: any;
}

export const OnboardingScreenSimplified: React.FC<OnboardingScreenSimplifiedProps> = ({ navigation }) => {
  const { setHasSeenOnboarding } = useAuth();

  const handleFinish = async () => {
    await setHasSeenOnboarding(true);
    if (navigation) {
      navigation.navigate('login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao GoNow</Text>
      <Text style={styles.description}>
        A forma mais rápida e segura de se locomover pela cidade.
      </Text>
      <Button
        title="Começar"
        onPress={handleFinish}
        variant="secondary"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: typography.sizes.lg,
    color: colors.textWhite,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.lg,
  },
});
