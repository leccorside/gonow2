import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../theme';
import { Card } from '../components';
import { useTheme } from '../theme/ThemeContext';

interface Trip {
  id: string;
  date: string;
  origin: string;
  destination: string;
  passenger: string;
  rating: number;
  earnings: string;
  status: 'completed' | 'cancelled' | 'oncoming';
}

interface TripHistoryScreenProps {
  navigation?: any;
}

// Mock de dados de viagens do motorista
const mockTrips: Trip[] = [
  {
    id: '1',
    date: '16/01/2024 18:14',
    origin: 'Piton Ar-Ge and Software House',
    destination: 'İsmet İnönü 1 Avenue',
    passenger: 'João Silva',
    rating: 5,
    earnings: 'R$ 35,50',
    status: 'completed',
  },
  {
    id: '2',
    date: '15/01/2024 14:30',
    origin: 'Rua das Flores, 123',
    destination: 'Shopping Center',
    passenger: 'Maria Santos',
    rating: 4,
    earnings: 'R$ 25,00',
    status: 'completed',
  },
  {
    id: '3',
    date: '14/01/2024 09:15',
    origin: 'Avenida Principal, 456',
    destination: 'Aeroporto',
    passenger: 'Pedro Costa',
    rating: 5,
    earnings: 'R$ 45,00',
    status: 'completed',
  },
];

export const TripHistoryScreen: React.FC<TripHistoryScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [trips] = useState<Trip[]>(mockTrips);
  const [activeTab, setActiveTab] = useState<'oncoming' | 'completed' | 'cancelled'>('oncoming');

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'oncoming') return trip.status === 'oncoming';
    if (activeTab === 'completed') return trip.status === 'completed';
    if (activeTab === 'cancelled') return trip.status === 'cancelled';
    return false;
  });

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
        {filteredTrips.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>📋</Text>
            <Text style={styles.emptyTitle}>Nenhuma viagem encontrada</Text>
            <Text style={styles.emptySubtitle}>
              Suas corridas aparecerão aqui
            </Text>
          </Card>
        ) : (
          filteredTrips.map((trip) => (
            <Card key={trip.id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripDate}>{trip.date}</Text>
                <View style={[
                  styles.statusBadge,
                  trip.status === 'completed' && { backgroundColor: colors.success + '20' },
                  trip.status === 'cancelled' && { backgroundColor: colors.error + '20' },
                  trip.status === 'oncoming' && { backgroundColor: colors.secondary + '20' },
                ]}>
                  <Text style={[
                    styles.statusText,
                    trip.status === 'completed' && { color: colors.success },
                    trip.status === 'cancelled' && { color: colors.error },
                    trip.status === 'oncoming' && { color: colors.secondary },
                  ]}>
                    {trip.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.tripLocation}>
                <View style={styles.locationRow}>
                  <View style={styles.timeCircle} />
                  <Text style={styles.locationText}>{trip.origin}</Text>
                </View>
                <View style={styles.locationLine} />
                <View style={styles.locationRow}>
                  <Text style={styles.locationPin}>📍</Text>
                  <Text style={styles.locationText}>{trip.destination}</Text>
                </View>
              </View>

              {trip.status === 'completed' && (
                <>
                  <View style={styles.tripPassenger}>
                    <Text style={styles.passengerLabel}>Passageiro:</Text>
                    <Text style={styles.passengerName}>{trip.passenger}</Text>
                  </View>

                  {trip.rating > 0 && (
                    <View style={styles.tripRating}>
                      <Text style={styles.ratingLabel}>Avaliação:</Text>
                      <View style={styles.ratingStars}>
                        {[...Array(5)].map((_, i) => (
                          <Text key={i} style={styles.star}>
                            {i < trip.rating ? '★' : '☆'}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )}
                </>
              )}

              <View style={styles.tripFooter}>
                <Text style={styles.tripEarnings}>{trip.earnings}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => handleTripPress(trip)}
                >
                  <Text style={styles.detailsButtonText}>Detalhes</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
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
    paddingTop: spacing.xl + 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.card,
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
    backgroundColor: colors.card,
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
  tripPassenger: {
    marginBottom: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  passengerLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  passengerName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  tripRating: {
    marginBottom: spacing.md,
  },
  ratingLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  ratingStars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: typography.sizes.lg,
    color: colors.star,
    marginRight: spacing.xs,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  tripEarnings: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
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
