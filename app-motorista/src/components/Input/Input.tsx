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
    borderColor: error ? colors.error : colors.border,
    backgroundColor: colors.background,
    color: colors.text,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        style={[
          styles.input,
          inputStyles,
          !isEditable && styles.disabled,
          isMultiline && styles.multiline,
          style,
        ]}
        secureTextEntry={isSecure}
        editable={isEditable}
        multiline={isMultiline}
        placeholderTextColor={colors.textLight}
      />
      {error && (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.sizes.md,
    minHeight: 48,
  },
  disabled: {
    opacity: 0.6,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
});
