import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';

export type BottomTab = 'home' | 'history' | 'profile' | 'settings';

interface BottomNavigationProps {
  currentTab: BottomTab;
  onTabChange: (tab: BottomTab) => void;
}

interface TabIcon {
  icon: string;
  label: string;
}

const tabs: Record<BottomTab, TabIcon> = {
  home: { icon: '🏠', label: 'Início' },
  history: { icon: '📋', label: 'Histórico' },
  profile: { icon: '👤', label: 'Perfil' },
  settings: { icon: '⚙️', label: 'Config' },
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onTabChange,
}) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const containerStyle = {
    flexDirection: 'row' as const,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  };

  return (
    <View style={containerStyle}>
      {(Object.keys(tabs) as BottomTab[]).map((tab) => {
        const isActive = currentTab === tab;
        const tabInfo = tabs[tab];

        return (
          <TouchableOpacity
            key={tab}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: spacing.xs,
            }}
            onPress={() => onTabChange(tab)}
            activeOpacity={0.7}
          >
            <Text style={{
              fontSize: 24,
              marginBottom: spacing.xs,
              opacity: isActive ? 1 : 0.6,
            }}>
              {tabInfo.icon}
            </Text>
            <Text style={{
              fontSize: typography.sizes.xs,
              color: isActive ? colors.primary : colors.textSecondary,
              fontWeight: isActive ? typography.weights.bold : typography.weights.medium,
            }}>
              {tabInfo.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
