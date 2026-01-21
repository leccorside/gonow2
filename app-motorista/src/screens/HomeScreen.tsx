import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { spacing, typography } from '../theme';
import { Card, MapView } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme/ThemeContext';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { colors } = theme;
  const [isOnline, setIsOnline] = useState(false);
  const [hasActiveTrip, setHasActiveTrip] = useState(false);

  const styles = createStyles(colors);

  const toggleOnlineStatus = (value: boolean) => {
    setIsOnline(value);
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView height="100%" showMarker={true} markerTitle="Sua localização" />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Motorista'}!</Text>
            <Text style={styles.subtitle}>Status: {isOnline ? 'Online' : 'Offline'}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>{isOnline ? 'Online' : 'Offline'}</Text>
            <Switch
              value={isOnline}
              onValueChange={toggleOnlineStatus}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.textWhite}
            />
          </View>
        </View>
      </View>

      {/* Active Trip Card (se houver corrida ativa) */}
      {hasActiveTrip && (
        <View style={styles.tripCard}>
          <Card style={styles.tripCardContent}>
            <Text style={styles.tripCardTitle}>Corrida Ativa</Text>
            <Text style={styles.tripCardText}>Destino: Rua Exemplo, 123</Text>
            <Text style={styles.tripCardText}>Distância: 5.2 km</Text>
            <View style={styles.tripCardActions}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.completeButton}>
                <Text style={styles.completeButtonText}>Finalizar</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      )}

      {/* Available Trips Panel (quando online) */}
      {isOnline && !hasActiveTrip && (
        <View style={styles.tripsPanel}>
          <Card style={styles.tripsCard}>
            <Text style={styles.tripsTitle}>Corridas Disponíveis</Text>
            <View style={styles.tripItem}>
              <View style={styles.tripInfo}>
                <Text style={styles.tripOrigin}>📍 Origem: Rua A, 100</Text>
                <Text style={styles.tripDestination}>📍 Destino: Rua B, 200</Text>
                <Text style={styles.tripDistance}>Distância: 3.5 km • Tempo: 8 min</Text>
              </View>
              <View style={styles.tripActions}>
                <TouchableOpacity style={styles.rejectButton}>
                  <Text style={styles.rejectButtonText}>✕</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.acceptButton}
                  onPress={() => setHasActiveTrip(true)}
                >
                  <Text style={styles.acceptButtonText}>✓</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      )}

      {/* Offline Message */}
      {!isOnline && !hasActiveTrip && (
        <View style={styles.offlinePanel}>
          <Card style={styles.offlineCard}>
            <Text style={styles.offlineTitle}>Você está offline</Text>
            <Text style={styles.offlineText}>
              Ative o status online para receber solicitações de corridas
            </Text>
          </Card>
        </View>
      )}

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    padding: spacing.lg,
    paddingTop: spacing.xl + 20,
    borderBottomLeftRadius: spacing.xl,
    borderBottomRightRadius: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  tripCard: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  tripCardContent: {
    backgroundColor: colors.card,
  },
  tripCardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tripCardText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  tripCardActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textWhite,
  },
  completeButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textWhite,
  },
  tripsPanel: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  tripsCard: {
    backgroundColor: colors.card,
  },
  tripsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tripItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tripInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  tripOrigin: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tripDestination: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tripDistance: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  tripActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  rejectButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    fontSize: typography.sizes.lg,
    color: colors.textWhite,
    fontWeight: typography.weights.bold,
  },
  acceptButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    fontSize: typography.sizes.lg,
    color: colors.textWhite,
    fontWeight: typography.weights.bold,
  },
  offlinePanel: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  offlineCard: {
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  offlineTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  offlineText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
  },
  logoutButton: {
    backgroundColor: colors.secondary,
    padding: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textWhite,
  },
});
