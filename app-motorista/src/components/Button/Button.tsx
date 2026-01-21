import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { spacing, typography } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';
import { ensureBoolean, logPropValue } from '../../utils/propValidator';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: size === 'small' ? spacing.sm : size === 'large' ? spacing.md : spacing.sm + 2,
      paddingHorizontal: size === 'small' ? spacing.md : size === 'large' ? spacing.xl : spacing.lg,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      minHeight: size === 'small' ? 36 : size === 'large' ? 56 : 48,
    };

    if (variant === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
      };
    } else if (variant === 'secondary') {
      return {
        ...baseStyle,
        backgroundColor: colors.secondary,
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
      };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: size === 'small' ? typography.sizes.sm : size === 'large' ? typography.sizes.lg : typography.sizes.md,
      fontWeight: typography.weights.semibold,
    };

    if (variant === 'outline') {
      return {
        ...baseTextStyle,
        color: colors.primary,
      };
    } else {
      return {
        ...baseTextStyle,
        color: colors.textWhite,
      };
    }
  };

  // Garantir que loading e disabled são booleanos
  const loadingBool = ensureBoolean(loading);
  const disabledBool = ensureBoolean(disabled);

  // Log para debug (pode ser removido depois)
  logPropValue('Button', 'loading', loadingBool);
  logPropValue('Button', 'disabled', disabledBool);

  return (
    <TouchableOpacity
      style={[getButtonStyle(), (disabledBool || loadingBool) && { opacity: 0.6 }, style]}
      onPress={onPress}
      disabled={disabledBool || loadingBool}
      activeOpacity={0.8}
    >
      {loadingBool && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? colors.primary : colors.textWhite}
          style={{ marginRight: spacing.xs }}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
