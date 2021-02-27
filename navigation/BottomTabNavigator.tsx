import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform } from 'react-native';

import BatteryScreen from '../screens/BatteryScreen';
import ChargeScreen from '../screens/ChargeScreen';
import LoadScreen from '../screens/LoadScreen';
import PanelScreen from '../screens/PanelScreen';
import {
  BottomTabParamList,
  PanelParamList,
  BatteryParamList,
  LoadParamList,
  ChargeParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Panel">
      <BottomTab.Screen
        name="Panel"
        component={PanelNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name={Platform.OS === 'ios' ? 'ios-sunny' : 'md-sunny'}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Battery"
        component={BatteryNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name={
                Platform.OS === 'ios' ? 'ios-battery-full' : 'md-battery-full'
              }
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Load"
        component={LoadNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name={Platform.OS === 'ios' ? 'ios-bulb' : 'md-bulb'}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Charge"
        component={ChargeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name={
                Platform.OS === 'ios'
                  ? 'ios-battery-charging'
                  : 'md-battery-charging'
              }
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PanelStack = createStackNavigator<PanelParamList>();

function PanelNavigator() {
  return (
    <PanelStack.Navigator>
      <PanelStack.Screen
        name="PanelScreen"
        component={PanelScreen}
        options={{ headerShown: false }}
      />
    </PanelStack.Navigator>
  );
}

const BatteryStack = createStackNavigator<BatteryParamList>();

function BatteryNavigator() {
  return (
    <BatteryStack.Navigator>
      <BatteryStack.Screen
        name="BatteryScreen"
        component={BatteryScreen}
        options={{ headerShown: false }}
      />
    </BatteryStack.Navigator>
  );
}

const LoadStack = createStackNavigator<LoadParamList>();

function LoadNavigator() {
  return (
    <LoadStack.Navigator>
      <LoadStack.Screen
        name="LoadScreen"
        component={LoadScreen}
        options={{ headerShown: false }}
      />
    </LoadStack.Navigator>
  );
}

const ChargeStack = createStackNavigator<ChargeParamList>();

function ChargeNavigator() {
  return (
    <ChargeStack.Navigator>
      <ChargeStack.Screen
        name="ChargeScreen"
        component={ChargeScreen}
        options={{ headerShown: false }}
      />
    </ChargeStack.Navigator>
  );
}
