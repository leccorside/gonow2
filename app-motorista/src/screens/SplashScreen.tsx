import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '../theme';

export const SplashScreen: React.FC = () => {
  // Garantir que size seja string explícita
  const indicatorSize: 'small' | 'large' = 'large';
  const indicatorColor = colors.primary;
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GoNow</Text>
      <Text style={styles.subtitle}>Motorista</Text>
      <ActivityIndicator 
        size={indicatorSize}
        color={indicatorColor}
        style={styles.loader}
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
  },
  logo: {
    fontSize: typography.sizes.xxxl * 2,
    fontWeight: typography.weights.bold,
    color: colors.textWhite,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.medium,
    color: colors.textWhite,
    opacity: 0.9,
    marginBottom: spacing.xl,
  },
  loader: {
    marginTop: spacing.xl,
  },
});
