import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { spacing, typography } from '../theme';
import { Button, Card, Rating } from '../components';
import { useTheme } from '../theme/ThemeContext';

interface TripRatingScreenProps {
  navigation?: any;
}

export const TripRatingScreen: React.FC<TripRatingScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = createStyles(colors);

  const handleSubmit = () => {
    setLoading(true);
    // Simular envio da avaliação
    setTimeout(() => {
      setLoading(false);
      if (navigation) {
        navigation.navigate('home');
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Text style={styles.title}>Avalie sua viagem</Text>
          <Text style={styles.subtitle}>
            Sua opinião é muito importante para nós
          </Text>

          <View style={styles.ratingSection}>
            <Rating
              rating={rating}
              onRatingChange={setRating}
              readonly={false}
              size={40}
              showLabel={true}
              label="Como foi sua experiência?"
            />
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.commentLabel}>Comentários (opcional)</Text>
            <TextInput
              style={[styles.commentInput, {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.background,
              }]}
              placeholder="Conte-nos mais sobre sua viagem..."
              value={comment}
              onChangeText={setComment}
              multiline={true}
              numberOfLines={4}
              editable={true}
              placeholderTextColor={colors.textLight}
            />
          </View>

          <Button
            title="Enviar Avaliação"
            onPress={handleSubmit}
            loading={loading === true}
            disabled={loading === true}
            variant="primary"
            style={styles.button}
          />
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
  content: {
    flex: 1,
  },
  card: {
    margin: spacing.lg,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  ratingSection: {
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  commentSection: {
    marginBottom: spacing.lg,
  },
  commentLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.md,
    padding: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.text,
    textAlignVertical: 'top',
    minHeight: 100,
    backgroundColor: colors.background,
  },
  button: {
    marginTop: spacing.md,
  },
});
