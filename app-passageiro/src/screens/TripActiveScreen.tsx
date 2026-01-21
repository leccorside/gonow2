import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../theme';
import { MapView } from '../components/MapView';
import { useTheme } from '../theme/ThemeContext';

interface TripActiveScreenProps {
  navigation?: any;
}

export const TripActiveScreen: React.FC<TripActiveScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [searching, setSearching] = useState(true);
  const [driverFound, setDriverFound] = useState(false);
  const [driverInfo] = useState({
    name: 'Jack Doe',
    plate: '26 XXX 216',
    estimatedArrival: '14 min',
  });

  const styles = createStyles(colors);

  useEffect(() => {
    // Simular busca de motorista
    const searchTimer = setTimeout(() => {
      setSearching(false);
      setDriverFound(true);
    }, 3000);

    return () => clearTimeout(searchTimer);
  }, []);

  const handleCancelTrip = () => {
    if (navigation) {
      navigation.navigate('home');
    }
  };

  const handleCall = () => {
    // Implementar chamada
  };

  const handleMessage = () => {
    // Implementar mensagem
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>☰</Text>
        <Text style={styles.headerIcon}>✕</Text>
        <Text style={styles.headerIcon}>🔔</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView height="100%" showMarker={true} markerTitle="Em movimento" />
      </View>

      {searching && (
        <View style={styles.searchingContainer}>
          <Text style={styles.searchingIcon}>∞</Text>
          <Text style={styles.searchingText}>Searching taxi...</Text>
        </View>
      )}

      {driverFound && !searching && (
        <View style={styles.driverCard}>
          <View style={styles.driverHeader}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>👨</Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driverInfo.name}</Text>
              <Text style={styles.driverPlate}>{driverInfo.plate}</Text>
            </View>
            <View style={styles.arrivalContainer}>
              <Text style={styles.arrivalIcon}>⏱️</Text>
              <Text style={styles.arrivalTime}>{driverInfo.estimatedArrival}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Text style={styles.actionIcon}>📞</Text>
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelTrip}>
              <Text style={styles.cancelIcon}>✕</Text>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    zIndex: 10,
  },
  headerIcon: {
    fontSize: 24,
    color: colors.text,
  },
  mapContainer: {
    flex: 1,
  },
  searchingContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  searchingIcon: {
    fontSize: 60,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  searchingText: {
    fontSize: typography.sizes.lg,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  driverCard: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopLeftRadius: spacing.xl,
    borderTopRightRadius: spacing.xl,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  driverAvatarText: {
    fontSize: 32,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  driverPlate: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  arrivalContainer: {
    alignItems: 'flex-end',
  },
  arrivalIcon: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  arrivalTime: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  actionText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
  },
  cancelIcon: {
    fontSize: 28,
    color: colors.error,
    marginBottom: spacing.xs,
  },
  cancelText: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    fontWeight: typography.weights.bold,
  },
});
