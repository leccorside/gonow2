import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../theme';
import { Button, MapView } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme/ThemeContext';

interface HomeScreenProps {
  navigation?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { colors } = theme;
  const [showRequestPanel, setShowRequestPanel] = useState(false);

  const handleRequestTrip = () => {
    if (navigation) {
      navigation.navigate('tripRequest');
    }
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView height="100%" showMarker={true} markerTitle="Sua localização" />
      </View>

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Usuário'}!</Text>
            <Text style={styles.subtitle}>Para onde você vai?</Text>
          </View>
        </View>
      </View>

      <View style={styles.requestPanel}>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={handleRequestTrip}
          activeOpacity={0.8}
        >
          <Text style={styles.requestButtonText}>📍 Solicitar Viagem</Text>
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
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  requestPanel: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  requestButton: {
    backgroundColor: colors.secondary,
    padding: spacing.lg,
    borderRadius: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  requestButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textWhite,
  },
});
