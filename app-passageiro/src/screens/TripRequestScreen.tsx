import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { spacing, typography } from '../theme';
import { Button, Input, Card } from '../components';
import { MapView } from '../components/MapView';
import { useTheme } from '../theme/ThemeContext';

interface TripRequestScreenProps {
  navigation?: any;
}

export const TripRequestScreen: React.FC<TripRequestScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [origin, setOrigin] = useState('W323+2XR');
  const [destination, setDestination] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const styles = createStyles(colors);

  const handleRequestTrip = () => {
    if (!origin || !destination) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (navigation) {
        navigation.navigate('vehicleSelection');
      }
    }, 1500);
  };

  // Se mostrar formulário de endereço
  if (showAddressForm) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowAddressForm(false)} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Where from...</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Enter Location</Text>
          <Input
            placeholder="Enter address"
            value={origin}
            onChangeText={setOrigin}
            containerStyle={styles.inputContainer}
          />

          <View style={styles.quickButtons}>
            <TouchableOpacity style={styles.quickButton}>
              <Text style={styles.quickIcon}>🏠</Text>
              <Text style={styles.quickText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickButton}>
              <Text style={styles.quickIcon}>💼</Text>
              <Text style={styles.quickText}>Work</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionIcon}>📍</Text>
            <Text style={styles.optionText}>Select a location on map</Text>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionIcon}>🎯</Text>
            <Text style={styles.optionText}>Use current location</Text>
            <Text style={styles.optionArrow}>→</Text>
          </TouchableOpacity>

          <Button
            title="OK"
            onPress={() => setShowAddressForm(false)}
            variant="primary"
            style={styles.okButton}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView height="100%" showMarker={true} markerTitle="Sua localização" />
      </View>

      {/* Header com localização */}
      <View style={styles.mapHeader}>
        <Text style={styles.locationText}>HUSSAINABAD</Text>
        <Text style={styles.timeText}>5:3</Text>
      </View>

      {/* Card sobreposto com origem e destino */}
      <View style={styles.addressCard}>
        <TouchableOpacity 
          style={styles.addressRow}
          onPress={() => setShowAddressForm(true)}
        >
          <View style={styles.dot} />
          <Text style={styles.addressText}>{origin || 'W323+2XR'}</Text>
        </TouchableOpacity>

        <View style={styles.connector} />

        <TouchableOpacity 
          style={styles.addressRow}
          onPress={() => setShowAddressForm(true)}
        >
          <View style={[styles.dot, styles.dotDestination]} />
          <Text style={styles.addressText}>{destination || 'Where to...'}</Text>
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
  },
  mapHeader: {
    position: 'absolute',
    top: 50,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  locationText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  timeText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  addressCard: {
    position: 'absolute',
    top: 100,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
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
  addressText: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  connector: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 5,
    marginVertical: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: 50,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: spacing.md,
  },
  backIcon: {
    fontSize: typography.sizes.xl,
    color: colors.text,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  formContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  quickButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundDark,
    borderRadius: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  quickText: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: spacing.md,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  optionText: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  optionArrow: {
    fontSize: typography.sizes.xl,
    color: colors.textSecondary,
  },
  okButton: {
    marginTop: spacing.xl,
  },
});
