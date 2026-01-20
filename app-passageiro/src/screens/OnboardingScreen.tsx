import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { ensureBoolean, logPropValue } from '../utils/propValidator';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Bem-vindo ao GoNow',
    description: 'A forma mais rápida e segura de se locomover pela cidade.',
    color: colors.primary,
  },
  {
    id: 2,
    title: 'Viagens Rápidas',
    description: 'Solicite uma corrida e chegue ao seu destino em minutos.',
    color: colors.primaryDark,
  },
  {
    id: 3,
    title: 'Comece Agora',
    description: 'Cadastre-se e comece a usar o GoNow hoje mesmo.',
    color: colors.secondary,
  },
];

export const OnboardingScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setHasSeenOnboarding } = useAuth();

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
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttons}>
          {currentIndex < slides.length - 1 ? (
            <>
              <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipText}>Pular</Text>
              </TouchableOpacity>
              <Button
                title="Próximo"
                onPress={handleNext}
                variant="secondary"
                style={styles.nextButton}
              />
            </>
          ) : (
            <Button
              title="Começar"
              onPress={handleFinish}
              variant="secondary"
              style={styles.finishButton}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: typography.sizes.lg,
    color: colors.textWhite,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: spacing.lg,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.textWhite,
    width: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: spacing.sm,
  },
  skipText: {
    color: colors.textWhite,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  nextButton: {
    flex: 1,
    marginLeft: spacing.md,
  },
  finishButton: {
    width: '100%',
  },
});
