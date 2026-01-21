import React from 'react';
import { View, Text } from 'react-native';
import { spacing, typography } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';

interface MapViewProps {
  latitude?: number;
  longitude?: number;
  height?: number | string;
  showMarker?: boolean;
  markerTitle?: string;
  style?: any;
}

export const MapView: React.FC<MapViewProps> = ({
  latitude = -23.5505,
  longitude = -46.6333,
  height = '100%',
  showMarker = true,
  markerTitle = 'Localização',
  style,
}) => {
  const { theme } = useTheme();
  const { colors } = theme;

  // Mock do mapa - será substituído por uma integração real na Fase 4
  return (
    <View style={[{ width: '100%', height }, style]}>
      <View style={{
        flex: 1,
        backgroundColor: colors.backgroundDark,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
        <Text style={{ fontSize: 64, marginBottom: spacing.sm }}>🗺️</Text>
        <Text style={{
          fontSize: typography.sizes.xl,
          fontWeight: typography.weights.bold,
          color: colors.text,
          marginBottom: spacing.xs,
        }}>
          Mapa
        </Text>
        <Text style={{
          fontSize: typography.sizes.sm,
          color: colors.textSecondary,
          marginBottom: spacing.lg,
        }}>
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </Text>
        {showMarker && (
          <View style={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: [{ translateX: -15 }, { translateY: -30 }],
            alignItems: 'center',
          }}>
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: colors.primary,
              borderWidth: 3,
              borderColor: colors.card,
            }} />
            <Text style={{
              fontSize: typography.sizes.sm,
              color: colors.text,
              marginTop: spacing.xs,
              backgroundColor: colors.card,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
              borderRadius: spacing.xs,
            }}>
              {markerTitle}
            </Text>
          </View>
        )}
        <Text style={{
          position: 'absolute',
          bottom: spacing.md,
          fontSize: typography.sizes.xs,
          color: colors.textSecondary,
          textAlign: 'center',
          paddingHorizontal: spacing.md,
        }}>
          Integração com Google Maps será implementada na Fase 4
        </Text>
      </View>
    </View>
  );
};
