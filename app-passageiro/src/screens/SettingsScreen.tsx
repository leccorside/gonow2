import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { spacing, typography } from '../theme';
import { Card } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme/ThemeContext';

interface SettingsScreenProps {
  navigation?: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { theme, themeMode, toggleTheme } = useTheme();
  const { colors } = theme;
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.');
          },
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Notificações',
      items: [
        {
          label: 'Notificações Push',
          value: notifications,
          onValueChange: setNotifications,
          type: 'switch' as const,
        },
        {
          label: 'Atualizações por Email',
          value: emailUpdates,
          onValueChange: setEmailUpdates,
          type: 'switch' as const,
        },
      ],
    },
    {
      title: 'Aparência',
      items: [
        {
          label: 'Modo Escuro',
          value: themeMode === 'dark',
          onValueChange: (value: boolean) => {
            if (value && themeMode !== 'dark') {
              toggleTheme();
            } else if (!value && themeMode !== 'light') {
              toggleTheme();
            }
          },
          type: 'switch' as const,
        },
      ],
    },
    {
      title: 'Localização',
      items: [
        {
          label: 'Rastreamento de Localização',
          value: locationTracking,
          onValueChange: setLocationTracking,
          type: 'switch' as const,
        },
      ],
    },
    {
      title: 'Conta',
      items: [
        {
          label: 'Alterar Senha',
          type: 'action' as const,
          onPress: () => Alert.alert('Em desenvolvimento', 'Funcionalidade em breve'),
        },
        {
          label: 'Alterar Email',
          type: 'action' as const,
          onPress: () => Alert.alert('Em desenvolvimento', 'Funcionalidade em breve'),
        },
        {
          label: 'Excluir Conta',
          type: 'action' as const,
          onPress: handleDeleteAccount,
          destructive: true,
        },
      ],
    },
    {
      title: 'Sobre',
      items: [
        {
          label: 'Versão do App',
          value: '1.0.0',
          type: 'info' as const,
        },
        {
          label: 'Termos de Uso',
          type: 'action' as const,
          onPress: () => Alert.alert('Termos de Uso', 'Conteúdo em breve'),
        },
        {
          label: 'Política de Privacidade',
          type: 'action' as const,
          onPress: () => Alert.alert('Política de Privacidade', 'Conteúdo em breve'),
        },
      ],
    },
  ];

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                {item.type === 'switch' && (
                  <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={colors.textWhite}
                    />
                  </View>
                )}
                {item.type === 'action' && (
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.settingLabel,
                        item.destructive && styles.settingLabelDestructive,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text style={styles.settingArrow}>›</Text>
                  </TouchableOpacity>
                )}
                {item.type === 'info' && (
                  <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Text style={styles.settingValue}>{item.value}</Text>
                  </View>
                )}
                {itemIndex < section.items.length - 1 && (
                  <View style={styles.settingDivider} />
                )}
              </React.Fragment>
            ))}
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

// Estilos devem ser criados dentro do componente para acessar o tema dinamicamente
const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    flex: 1,
  },
  sectionCard: {
    margin: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  settingLabel: {
    fontSize: typography.sizes.md,
    color: colors.text,
    flex: 1,
  },
  settingLabelDestructive: {
    color: colors.error,
  },
  settingValue: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  settingArrow: {
    fontSize: typography.sizes.xl,
    color: colors.textSecondary,
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.xs,
  },
});
