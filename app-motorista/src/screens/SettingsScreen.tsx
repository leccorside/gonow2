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
  const [autoAccept, setAutoAccept] = useState(false);

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
        {
          label: 'Som de Notificação',
          value: true,
          onValueChange: () => {},
          type: 'switch' as const,
        },
      ],
    },
    {
      title: 'Corridas',
      items: [
        {
          label: 'Aceitar Corridas Automaticamente',
          value: autoAccept,
          onValueChange: setAutoAccept,
          type: 'switch' as const,
        },
        {
          label: 'Modo Disponível',
          value: true,
          onValueChange: () => {},
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
        {
          label: 'Compartilhar Localização em Tempo Real',
          value: true,
          onValueChange: () => {},
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
          label: 'Informações do Veículo',
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
  ];

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card style={styles.card}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  {item.type === 'switch' ? (
                    <View style={styles.settingRow}>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={colors.textWhite}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.settingRow}
                      onPress={item.onPress}
                    >
                      <Text style={[
                        styles.settingLabel,
                        item.destructive && styles.destructiveText
                      ]}>
                        {item.label}
                      </Text>
                      <Text style={styles.arrow}>→</Text>
                    </TouchableOpacity>
                  )}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingTop: spacing.xl + 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: typography.sizes.xxl,
    color: colors.text,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.card,
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  settingLabel: {
    fontSize: typography.sizes.md,
    color: colors.text,
    flex: 1,
  },
  destructiveText: {
    color: colors.error,
  },
  arrow: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    marginLeft: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 0,
  },
});
