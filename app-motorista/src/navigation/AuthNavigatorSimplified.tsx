import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { OnboardingScreenSimplified } from '../screens/OnboardingScreenSimplified';

const Stack = createNativeStackNavigator();

export const AuthNavigatorSimplified: React.FC = () => {
  // Garantir que headerShown seja boolean explícito
  const headerShownValue: boolean = false;
  
  // Criar objeto de options com tipos explícitos
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: headerShownValue,
  };
  
  // Log para debug
  if (__DEV__) {
    console.log('🔍 [AuthNavigatorSimplified] screenOptions:', {
      headerShown: {
        value: screenOptions.headerShown,
        type: typeof screenOptions.headerShown,
        isBoolean: typeof screenOptions.headerShown === 'boolean',
      },
    });
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreenSimplified}
      />
    </Stack.Navigator>
  );
};
