import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Card } from './src/components';
import { colors, spacing, typography } from './src/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.content}>
          <Text style={styles.title}>GoNow</Text>
          <Text style={styles.subtitle}>App Passageiro</Text>
          
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Bem-vindo!</Text>
            <Text style={styles.cardText}>
              Estrutura base configurada com tema preto e laranja.
            </Text>
          </Card>

          <View style={styles.buttonContainer}>
            <Button
              title="Botão Primário"
              onPress={() => console.log('Botão pressionado')}
              variant="primary"
            />
            <Button
              title="Botão Secundário"
              onPress={() => console.log('Botão pressionado')}
              variant="secondary"
              style={styles.button}
            />
            <Button
              title="Botão Outline"
              onPress={() => console.log('Botão pressionado')}
              variant="outline"
            />
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  card: {
    width: '100%',
    marginBottom: spacing.lg,
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
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
});
