import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  shadow = true,
}) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const cardStyles = {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
  };

  const shadowStyles = shadow ? {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } : {};

  return (
    <View
      style={[
        cardStyles,
        shadowStyles,
        style,
      ]}
    >
      {children}
    </View>
  );
};
