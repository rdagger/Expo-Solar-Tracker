import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet, View } from 'react-native';

import { PiLogo } from '../components/PiLogo';
import SettingsButton from '../components/SettingsButton';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();


function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerTitle: 'Solar Tracker',
          headerLeft: () => (
            <View style={styles.logoContainer}>
              <PiLogo />
            </View>
          ),
          headerRight: () => (
            <View style={styles.settingsButtonContainer}>
              <SettingsButton />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  ); // End Root Navigator
}

const styles = StyleSheet.create({
  settingsButtonContainer: {
    alignItems: 'flex-end',
    marginRight: 25,
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginLeft: 25,
  },
});
