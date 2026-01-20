import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 ErrorBoundary capturou um erro:', error);
    console.error('📋 Error Info:', errorInfo);
    console.error('📍 Stack:', error.stack);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>🚨 Erro Detectado</Text>
            <Text style={styles.subtitle}>
              {this.state.error?.message || 'Erro desconhecido'}
            </Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipo do Erro:</Text>
              <Text style={styles.errorText}>
                {this.state.error?.name || 'Unknown'}
              </Text>
            </View>

            {this.state.error?.stack && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Stack Trace:</Text>
                <Text style={styles.stackText}>
                  {this.state.error.stack}
                </Text>
              </View>
            )}

            {this.state.errorInfo && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Component Stack:</Text>
                <Text style={styles.stackText}>
                  {this.state.errorInfo.componentStack}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={this.handleReset}
            >
              <Text style={styles.buttonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.error,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    fontFamily: 'monospace',
  },
  stackText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
});
