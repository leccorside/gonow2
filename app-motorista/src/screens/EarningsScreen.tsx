import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../theme';
import { Card } from '../components';
import { useTheme } from '../theme/ThemeContext';

interface EarningsScreenProps {
  navigation?: any;
}

interface EarningsData {
  today: string;
  week: string;
  month: string;
  total: string;
}

interface Transaction {
  id: string;
  date: string;
  time: string;
  passenger: string;
  amount: string;
  status: 'completed' | 'pending';
}

export const EarningsScreen: React.FC<EarningsScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [activePeriod, setActivePeriod] = useState<'today' | 'week' | 'month' | 'total'>('today');

  const earnings: EarningsData = {
    today: 'R$ 125,50',
    week: 'R$ 850,00',
    month: 'R$ 3.450,00',
    total: 'R$ 12.580,00',
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '16/01/2024',
      time: '14:30',
      passenger: 'João Silva',
      amount: 'R$ 25,50',
      status: 'completed',
    },
    {
      id: '2',
      date: '16/01/2024',
      time: '12:15',
      passenger: 'Maria Santos',
      amount: 'R$ 18,00',
      status: 'completed',
    },
    {
      id: '3',
      date: '16/01/2024',
      time: '10:45',
      passenger: 'Pedro Costa',
      amount: 'R$ 32,00',
      status: 'completed',
    },
    {
      id: '4',
      date: '15/01/2024',
      time: '18:20',
      passenger: 'Ana Oliveira',
      amount: 'R$ 45,00',
      status: 'completed',
    },
    {
      id: '5',
      date: '15/01/2024',
      time: '16:10',
      passenger: 'Carlos Souza',
      amount: 'R$ 28,50',
      status: 'pending',
    },
  ];

  const getCurrentEarnings = () => {
    switch (activePeriod) {
      case 'today':
        return earnings.today;
      case 'week':
        return earnings.week;
      case 'month':
        return earnings.month;
      case 'total':
        return earnings.total;
      default:
        return earnings.today;
    }
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ganhos</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Earnings Summary */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total de Ganhos</Text>
          <Text style={styles.summaryAmount}>{getCurrentEarnings()}</Text>

          {/* Period Tabs */}
          <View style={styles.periodTabs}>
            <TouchableOpacity
              style={[styles.periodTab, activePeriod === 'today' && styles.periodTabActive]}
              onPress={() => setActivePeriod('today')}
            >
              <Text style={[styles.periodTabText, activePeriod === 'today' && styles.periodTabTextActive]}>
                Hoje
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodTab, activePeriod === 'week' && styles.periodTabActive]}
              onPress={() => setActivePeriod('week')}
            >
              <Text style={[styles.periodTabText, activePeriod === 'week' && styles.periodTabTextActive]}>
                Semana
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodTab, activePeriod === 'month' && styles.periodTabActive]}
              onPress={() => setActivePeriod('month')}
            >
              <Text style={[styles.periodTabText, activePeriod === 'month' && styles.periodTabTextActive]}>
                Mês
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodTab, activePeriod === 'total' && styles.periodTabActive]}
              onPress={() => setActivePeriod('total')}
            >
              <Text style={[styles.periodTabText, activePeriod === 'total' && styles.periodTabTextActive]}>
                Total
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Corridas</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statValue}>R$ 280</Text>
            <Text style={styles.statLabel}>Média/Dia</Text>
          </Card>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Histórico de Transações</Text>
          {transactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDate}>{transaction.date} • {transaction.time}</Text>
                  <Text style={styles.transactionPassenger}>{transaction.passenger}</Text>
                </View>
                <View style={styles.transactionAmountContainer}>
                  <Text style={[
                    styles.transactionAmount,
                    transaction.status === 'pending' && styles.transactionAmountPending
                  ]}>
                    {transaction.amount}
                  </Text>
                  {transaction.status === 'pending' && (
                    <Text style={styles.transactionStatus}>Pendente</Text>
                  )}
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Withdraw Button */}
        <Card style={styles.withdrawCard}>
          <View style={styles.withdrawInfo}>
            <Text style={styles.withdrawTitle}>Saldo Disponível</Text>
            <Text style={styles.withdrawAmount}>R$ 2.450,00</Text>
          </View>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Sacar</Text>
          </TouchableOpacity>
        </Card>
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
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  summaryCard: {
    backgroundColor: colors.primary,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontSize: typography.sizes.md,
    color: colors.textWhite,
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  summaryAmount: {
    fontSize: typography.sizes.xxxl * 1.5,
    fontWeight: typography.weights.bold,
    color: colors.textWhite,
    marginBottom: spacing.lg,
  },
  periodTabs: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  periodTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  periodTabActive: {
    backgroundColor: colors.textWhite,
  },
  periodTabText: {
    fontSize: typography.sizes.sm,
    color: colors.textWhite,
    fontWeight: typography.weights.medium,
  },
  periodTabTextActive: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  transactionsSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  transactionCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.card,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDate: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  transactionPassenger: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  transactionAmountPending: {
    color: colors.warning,
  },
  transactionStatus: {
    fontSize: typography.sizes.xs,
    color: colors.warning,
    marginTop: spacing.xs,
  },
  withdrawCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginBottom: spacing.xl,
  },
  withdrawInfo: {
    flex: 1,
  },
  withdrawTitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  withdrawAmount: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  withdrawButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
  },
  withdrawButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textWhite,
  },
});
