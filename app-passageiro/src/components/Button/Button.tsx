import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '../../theme';
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
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: size === 'small' ? spacing.sm : size === 'large' ? spacing.md : spacing.sm + 2,
      paddingHorizontal: size === 'small' ? spacing.md : size === 'large' ? spacing.xl : spacing.lg,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    if (variant === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
      };
    }

    if (variant === 'secondary') {
      return {
        ...baseStyle,
        backgroundColor: colors.secondary,
      };
    }

    return {
      ...baseStyle,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: size === 'small' ? typography.sizes.sm : size === 'large' ? typography.sizes.lg : typography.sizes.md,
      fontWeight: typography.weights.semibold,
    };

    if (variant === 'outline') {
      return {
        ...baseStyle,
        color: colors.primary,
      };
    }

    return {
      ...baseStyle,
      color: colors.textWhite,
    };
  };

  const isDisabled = ensureBoolean(disabled, false) || ensureBoolean(loading, false);
  
  // Log para debug
  if (__DEV__) {
    logPropValue('Button', 'disabled', disabled);
    logPropValue('Button', 'loading', loading);
  }
  
  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.textWhite} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
