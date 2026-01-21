import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { spacing, typography } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';
import { ensureBoolean, logPropValue } from '../../utils/propValidator';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  secureTextEntry,
  editable,
  multiline,
  ...props
}) => {
  const { theme } = useTheme();
  const { colors } = theme;

  // Garantir que todas as props booleanas sejam explícitas
  const isSecure = ensureBoolean(secureTextEntry, false);
  const isEditable = ensureBoolean(editable, true);
  const isMultiline = ensureBoolean(multiline, false);
  
  // Log para debug
  if (__DEV__) {
    logPropValue('Input', 'secureTextEntry', secureTextEntry);
    logPropValue('Input', 'editable', editable);
    logPropValue('Input', 'multiline', multiline);
  }

  const inputStyles = {
    borderWidth: 1,
    borderColor: error ? colors.error : colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.sizes.md,
    color: colors.text,
    backgroundColor: colors.background,
  };
  
  return (
    <View style={[{ marginBottom: spacing.md }, containerStyle]}>
      {label && (
        <Text style={{
          fontSize: typography.sizes.sm,
          fontWeight: typography.weights.medium,
          color: colors.text,
          marginBottom: spacing.xs,
        }}>
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        style={[inputStyles, style]}
        placeholderTextColor={colors.textLight}
        secureTextEntry={isSecure}
        editable={isEditable}
        multiline={isMultiline}
      />
      {error && (
        <Text style={{
          fontSize: typography.sizes.xs,
          color: colors.error,
          marginTop: spacing.xs,
        }}>
          {error}
        </Text>
      )}
    </View>
  );
};
