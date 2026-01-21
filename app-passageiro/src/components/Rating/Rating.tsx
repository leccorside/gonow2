import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';

interface RatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
  showLabel?: boolean;
  label?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating = 0,
  onRatingChange,
  readonly = false,
  size = 24,
  showLabel = false,
  label,
}) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const stars = [1, 2, 3, 4, 5];

  const handleStarPress = (star: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(star);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {showLabel && (
        <Text style={{
          fontSize: typography.sizes.md,
          color: colors.text,
          marginBottom: spacing.sm,
          fontWeight: typography.weights.medium,
        }}>
          {label || 'Avaliação'}
        </Text>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
        {stars.map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            disabled={readonly === true}
            activeOpacity={readonly ? 1 : 0.7}
          >
            <Text
              style={{
                fontSize: size,
                color: star <= rating ? colors.primary : colors.border,
              }}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showLabel && rating > 0 && (
        <Text style={{
          fontSize: typography.sizes.sm,
          color: colors.textSecondary,
          marginTop: spacing.xs,
        }}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};
