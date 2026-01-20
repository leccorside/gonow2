import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Card, Button } from '../components';
import { useAuth } from '../contexts/AuthContext';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo, {user?.name}!</Text>
        <Text style={styles.subtitle}>App Motorista</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Em breve</Text>
        <Text style={styles.cardText}>
          Esta é uma tela temporária. As funcionalidades principais serão implementadas nas próximas fases.
        </Text>
      </Card>

      <Button
        title="Sair"
        onPress={logout}
        variant="outline"
        style={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  card: {
    marginTop: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  logoutButton: {
    marginTop: spacing.xl,
  },
});
