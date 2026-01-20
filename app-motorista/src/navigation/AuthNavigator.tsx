import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../screens';
import { OnboardingScreenSimplified } from '../screens/OnboardingScreenSimplified';

const Stack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  const headerShownValue = false;
  
  // Log para debug
  if (__DEV__) {
    console.log('🔍 [AuthNavigator] headerShown:', {
      value: headerShownValue,
      type: typeof headerShownValue,
      isBoolean: typeof headerShownValue === 'boolean',
    });
  }

  // TESTE: Usar versão simplificada do Onboarding para isolar o problema
  const USE_SIMPLIFIED_ONBOARDING = true;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: headerShownValue,
      }}
    >
      <Stack.Screen 
        name="Onboarding" 
        component={USE_SIMPLIFIED_ONBOARDING ? OnboardingScreenSimplified : OnboardingScreen} 
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
