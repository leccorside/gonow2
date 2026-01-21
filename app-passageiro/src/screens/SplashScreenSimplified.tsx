import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '../theme';
import { useTheme } from '../theme/ThemeContext';

export const SplashScreenSimplified: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GoNow</Text>
      <Text style={styles.subtitle}>Passageiro</Text>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
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
  },
});
