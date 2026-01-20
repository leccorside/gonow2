import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../../theme';
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
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.textLight}
        secureTextEntry={isSecure}
        editable={isEditable}
        multiline={isMultiline}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.sizes.md,
    color: colors.text,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
