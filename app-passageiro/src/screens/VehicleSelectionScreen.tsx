import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../theme';
import { Button, Card } from '../components';
import { useTheme } from '../theme/ThemeContext';

interface VehicleSelectionScreenProps {
  navigation?: any;
}

type VehicleType = 'car' | 'motorcycle';

interface VehicleOption {
  type: VehicleType;
  icon: string;
  name: string;
  description: string;
  priceMultiplier: number;
  estimatedTime: string;
}

const vehicleOptions: VehicleOption[] = [
  {
    type: 'car',
    icon: '🚗',
    name: 'Carro',
    description: 'Confortável e espaçoso',
    priceMultiplier: 1.0,
    estimatedTime: '5-10 min',
  },
  {
    type: 'motorcycle',
    icon: '🏍️',
    name: 'Moto',
    description: 'Rápido e econômico',
    priceMultiplier: 0.7,
    estimatedTime: '3-7 min',
  },
];

export const VehicleSelectionScreen: React.FC<VehicleSelectionScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(false);

  const styles = createStyles(colors);

  const handleConfirm = () => {
    if (!selectedVehicle) {
      return;
    }
    setLoading(true);
    // Simular confirmação
    setTimeout(() => {
      setLoading(false);
      if (navigation) {
        navigation.navigate('tripActive');
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {/* Map placeholder - em produção seria um MapView */}
      </View>

      {/* Card com detalhes da viagem */}
      <View style={styles.tripCard}>
        {/* Rota: origem e destino */}
        <View style={styles.routeContainer}>
          <View style={styles.routeRow}>
            <View style={styles.dot} />
            <Text style={styles.routeText}>W323+2XR</Text>
          </View>
          <View style={styles.connector} />
          <View style={styles.routeRow}>
            <View style={[styles.dot, styles.dotDestination]} />
            <Text style={styles.routeText}>Memon Heights</Text>
          </View>
        </View>

        {/* Informações da viagem */}
        <View style={styles.tripInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>0,5 km</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>⏱️</Text>
            <Text style={styles.infoText}>3 dakika</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>💰</Text>
            <Text style={styles.infoText}>6.25 TL</Text>
          </View>
        </View>

        {/* Botão Start Trip Now */}
        <Button
          title="Start Trip Now"
          onPress={handleConfirm}
          loading={loading === true}
          disabled={loading === true || !selectedVehicle}
          variant="primary"
          style={styles.startButton}
        />
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
    backgroundColor: colors.backgroundDark,
  },
  tripCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopLeftRadius: spacing.xl,
    borderTopRightRadius: spacing.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xl + 80, // Espaço para bottom navigation
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  routeContainer: {
    marginBottom: spacing.lg,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondary,
    marginRight: spacing.md,
  },
  dotDestination: {
    backgroundColor: colors.primary,
  },
  routeText: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  connector: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 5,
    marginVertical: spacing.xs,
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  startButton: {
    marginTop: spacing.md,
  },
});
