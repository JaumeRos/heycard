import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';

// Types
import { RootStackParamList } from './types/navigation';

// Navigation
import { TabNavigator } from './navigation/TabNavigator';

// Screens
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PersonalDetailsScreen } from './screens/PersonalDetailsScreen';
import { BusinessDetailsScreen } from './screens/BusinessDetailsScreen';
import { AddPictureScreen } from './screens/AddPictureScreen';
import { CreateCardScreen } from './screens/CreateCardScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { EditCardScreen } from './screens/EditCardScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom theme with black and white colors
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#000000',
    secondary: '#666666',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    elevation: {
      level0: '#FFFFFF',
      level1: '#FFFFFF',
      level2: '#FFFFFF',
      level3: '#FFFFFF',
      level4: '#FFFFFF',
      level5: '#FFFFFF',
    }
  },
};

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={styles.container}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerShown: true,
                headerTintColor: '#000000',
                headerStyle: {
                  backgroundColor: '#FFFFFF',
                },
              }}
            >
              {/* Welcome and Auth Stack - Always Available */}
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />

              {/* Protected Routes - Only available when user is authenticated */}
              <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateCard"
                component={CreateCardScreen}
                options={{ title: 'Create Card' }}
              />
              <Stack.Screen
                name="EditCard"
                component={EditCardScreen}
                options={{ 
                  title: 'Edit Card',
                  headerBackTitle: 'My Cards'
                }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

<Button
  mode="contained"
  style={{
    backgroundColor: '#000000',
  }}
  labelStyle={{
    color: '#FFFFFF',
  }}
>
  Button Text
</Button>

<FAB
  icon="plus"
  style={[styles.fab, {
    backgroundColor: '#000000',
  }]}
  color="#FFFFFF"
/>

<List.Item
  {...props}
  titleStyle={{
    color: '#000000',
  }}
  style={{
    backgroundColor: '#FFFFFF',
  }}
/>

export default App; 