import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../theme';
import { Card, MapView, Button } from '../components';
import { useTheme } from '../theme/ThemeContext';

interface TripActiveScreenProps {
  navigation?: any;
  tripData?: {
    passengerName: string;
    passengerPhone: string;
    origin: string;
    destination: string;
    distance: string;
    estimatedTime: string;
    price: string;
  };
}

export const TripActiveScreen: React.FC<TripActiveScreenProps> = ({ navigation, tripData }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [tripStatus, setTripStatus] = useState<'picking' | 'inProgress'>('picking');

  const defaultTripData = {
    passengerName: 'João Silva',
    passengerPhone: '+90 555 123 45 67',
    origin: 'Rua das Flores, 123',
    destination: 'Shopping Center',
    distance: '5.2 km',
    estimatedTime: '12 min',
    price: 'R$ 25,50',
  };

  const trip = tripData || defaultTripData;

  const handleCall = () => {
    // Implementar chamada
    console.log('Calling passenger:', trip.passengerPhone);
  };

  const handleMessage = () => {
    // Implementar mensagem
    console.log('Messaging passenger:', trip.passengerPhone);
  };

  const handleCancel = () => {
    // Implementar cancelamento
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleStartTrip = () => {
    setTripStatus('inProgress');
  };

  const handleCompleteTrip = () => {
    // Implementar finalização
    if (navigation) {
      navigation.navigate('tripRating');
    }
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView height="100%" showMarker={true} markerTitle="Rota ativa" />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {tripStatus === 'picking' ? 'Buscando Passageiro' : 'Corrida em Andamento'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Trip Info Card */}
      <View style={styles.tripCard}>
        <Card style={styles.tripCardContent}>
          {/* Passenger Info */}
          <View style={styles.passengerSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.passengerInfo}>
              <Text style={styles.passengerName}>{trip.passengerName}</Text>
              <Text style={styles.passengerPhone}>{trip.passengerPhone}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.iconButton} onPress={handleCall}>
                <Text style={styles.iconText}>📞</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={handleMessage}>
                <Text style={styles.iconText}>💬</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Trip Details */}
          <View style={styles.tripDetails}>
            <View style={styles.locationRow}>
              <View style={styles.locationDot} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Origem</Text>
                <Text style={styles.locationText}>{trip.origin}</Text>
              </View>
            </View>

            <View style={styles.locationLine} />

            <View style={styles.locationRow}>
              <Text style={styles.locationPin}>📍</Text>
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Destino</Text>
                <Text style={styles.locationText}>{trip.destination}</Text>
              </View>
            </View>
          </View>

          {/* Trip Stats */}
          <View style={styles.tripStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{trip.distance}</Text>
              <Text style={styles.statLabel}>Distância</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{trip.estimatedTime}</Text>
              <Text style={styles.statLabel}>Tempo</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{trip.price}</Text>
              <Text style={styles.statLabel}>Valor</Text>
            </View>
          </View>

          {/* Action Buttons */}
          {tripStatus === 'picking' ? (
            <View style={styles.actionSection}>
              <Button
                title="Iniciar Corrida"
                onPress={handleStartTrip}
                variant="primary"
                style={styles.startButton}
              />
              <Button
                title="Cancelar"
                onPress={handleCancel}
                variant="outline"
                style={styles.cancelButton}
              />
            </View>
          ) : (
            <View style={styles.actionSection}>
              <Button
                title="Finalizar Corrida"
                onPress={handleCompleteTrip}
                variant="primary"
                style={styles.completeButton}
              />
            </View>
          )}
        </Card>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingTop: spacing.xl + 20,
    backgroundColor: colors.card,
    borderBottomLeftRadius: spacing.xl,
    borderBottomRightRadius: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: typography.sizes.xxl,
    color: colors.text,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  tripCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  tripCardContent: {
    backgroundColor: colors.card,
  },
  passengerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 24,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  passengerPhone: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  tripDetails: {
    marginBottom: spacing.lg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondary,
    marginRight: spacing.sm,
    marginTop: spacing.xs,
  },
  locationPin: {
    fontSize: 16,
    marginRight: spacing.sm,
    marginTop: spacing.xs,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  locationText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 5,
    marginBottom: spacing.sm,
  },
  tripStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  actionSection: {
    gap: spacing.md,
  },
  startButton: {
    marginBottom: 0,
  },
  cancelButton: {
    marginBottom: 0,
  },
  completeButton: {
    marginBottom: 0,
  },
});
