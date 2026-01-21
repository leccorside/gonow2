import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../theme';
import { Card, Rating } from '../components';
import { useTheme } from '../theme/ThemeContext';

interface Trip {
  id: string;
  date: string;
  origin: string;
  destination: string;
  driver: string;
  vehicle: string;
  rating: number;
  price: string;
  status: 'completed' | 'cancelled';
}

interface TripHistoryScreenProps {
  navigation?: any;
}

// Mock de dados de viagens
const mockTrips: Trip[] = [
  {
    id: '1',
    date: '15/01/2024 14:30',
    origin: 'Rua das Flores, 123',
    destination: 'Shopping Center',
    driver: 'João Silva',
    vehicle: 'Honda Civic - ABC-1234',
    rating: 5,
    price: 'R$ 25,50',
    status: 'completed',
  },
  {
    id: '2',
    date: '14/01/2024 09:15',
    origin: 'Avenida Principal, 456',
    destination: 'Aeroporto',
    driver: 'Maria Santos',
    vehicle: 'Toyota Corolla - XYZ-5678',
    rating: 4,
    price: 'R$ 45,00',
    status: 'completed',
  },
  {
    id: '3',
    date: '13/01/2024 18:20',
    origin: 'Praça Central',
    destination: 'Rua do Comércio, 789',
    driver: 'Pedro Costa',
    vehicle: 'Honda CB 600F - DEF-9012',
    rating: 5,
    price: 'R$ 18,00',
    status: 'completed',
  },
];

export const TripHistoryScreen: React.FC<TripHistoryScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [trips] = useState<Trip[]>(mockTrips);
  const [activeTab, setActiveTab] = useState<'oncoming' | 'completed' | 'cancelled'>('oncoming');

  const handleTripPress = (trip: Trip) => {
    // Navegar para detalhes da viagem se necessário
    console.log('Trip pressed:', trip);
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Trips</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'oncoming' && styles.tabActive]}
          onPress={() => setActiveTab('oncoming')}
        >
          <Text style={[styles.tabText, activeTab === 'oncoming' && styles.tabTextActive]}>
            Oncoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'cancelled' && styles.tabActive]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.tabTextActive]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {trips.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>📋</Text>
            <Text style={styles.emptyTitle}>Nenhuma viagem encontrada</Text>
            <Text style={styles.emptySubtitle}>
              Suas viagens aparecerão aqui
            </Text>
          </Card>
        ) : (
          // Example trip card
          <Card style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <Text style={styles.tripDate}>16 April 2021</Text>
              <View style={[styles.statusBadge, { backgroundColor: colors.secondary + '20' }]}>
                <Text style={[styles.statusText, { color: colors.secondary }]}>ONCOMING</Text>
              </View>
            </View>

            <View style={styles.tripLocation}>
              <View style={styles.locationRow}>
                <View style={styles.timeCircle} />
                <Text style={styles.timeText}>18:14</Text>
                <Text style={styles.locationText}>Piton Ar-Ge and Software House</Text>
              </View>
              <View style={styles.locationLine} />
              <View style={styles.locationRow}>
                <Text style={styles.locationPin}>📍</Text>
                <Text style={styles.timeText}>18:36</Text>
                <Text style={styles.locationText}>İsmet İnönü 1 Avenue</Text>
              </View>
            </View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingTop: 50,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.sm,
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
  placeholder: {
    width: 40,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.secondary,
  },
  tabText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  tabTextActive: {
    color: colors.secondary,
    fontWeight: typography.weights.bold,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  emptyCard: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  tripCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tripDate: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
  },
  statusCompleted: {
    backgroundColor: colors.success + '20',
  },
  statusCancelled: {
    backgroundColor: colors.error + '20',
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  tripLocation: {
    marginBottom: spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  timeCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondary,
    marginRight: spacing.sm,
  },
  locationPin: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  timeText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    fontWeight: typography.weights.medium,
    marginRight: spacing.md,
    width: 50,
  },
  locationText: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 5,
    marginBottom: spacing.xs,
  },
  tripDriver: {
    marginBottom: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  driverLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  driverName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  driverVehicle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  tripRating: {
    marginBottom: spacing.md,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  tripPrice: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
  },
  detailsButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
    backgroundColor: colors.backgroundDark,
  },
  detailsButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.secondary,
    fontWeight: typography.weights.medium,
  },
});
