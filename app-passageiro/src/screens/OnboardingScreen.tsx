import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { spacing, typography } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { ensureBoolean, logPropValue } from '../utils/propValidator';

const { width } = Dimensions.get('window');

export const OnboardingScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setHasSeenOnboarding } = useAuth();

  const slides = [
    {
      id: 1,
      title: 'Select Destination',
      description: 'Safety and comforts is our concerns',
      color: colors.backgroundLight,
      icon: '📍', // Mãos segurando smartphone com mapa
    },
    {
      id: 2,
      title: 'Get Your Taxi',
      description: 'Safety and comforts is our concerns',
      color: colors.backgroundLight,
      icon: '🚕', // Taxi estacionado
    },
    {
      id: 3,
      title: 'Rate Your Trip',
      description: 'Safety and comforts is our concerns',
      color: colors.backgroundLight,
      icon: '⭐', // Motorista com estrelas
    },
  ];

  const styles = createStyles(colors);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = async () => {
    await setHasSeenOnboarding(true);
  };

  // Garantir props booleanas explícitas
  const isHorizontal = ensureBoolean(true, true);
  const isPagingEnabled = ensureBoolean(true, true);
  const showsIndicator = ensureBoolean(false, false);
  
  // Log para debug
  if (__DEV__) {
    logPropValue('OnboardingScrollView', 'horizontal', isHorizontal);
    logPropValue('OnboardingScrollView', 'pagingEnabled', isPagingEnabled);
    logPropValue('OnboardingScrollView', 'showsHorizontalScrollIndicator', showsIndicator);
  }

  return (
    <View style={styles.container}>
      {/* Botão Skip no topo direito */}
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal={isHorizontal}
        pagingEnabled={isPagingEnabled}
        showsHorizontalScrollIndicator={showsIndicator}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { backgroundColor: slide.color }]}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{slide.icon}</Text>
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {currentIndex > 0 && (
            <TouchableOpacity onPress={() => {
              scrollViewRef.current?.scrollTo({
                x: (currentIndex - 1) * width,
                animated: true,
              });
            }} style={styles.arrowButton}>
              <Text style={styles.arrow}>←</Text>
            </TouchableOpacity>
          )}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.dotActive,
              ]}
            />
          ))}
          {currentIndex < slides.length - 1 && (
            <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  skipContainer: {
    position: 'absolute',
    top: 50,
    right: spacing.lg,
    zIndex: 10,
  },
  skipButton: {
    padding: spacing.sm,
  },
  skipText: {
    color: colors.secondary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  icon: {
    fontSize: 120,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xl,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.secondary,
    width: 24,
  },
  arrowButton: {
    padding: spacing.sm,
    marginHorizontal: spacing.sm,
  },
  arrow: {
    fontSize: typography.sizes.xl,
    color: colors.secondary,
    fontWeight: typography.weights.bold,
  },
});
