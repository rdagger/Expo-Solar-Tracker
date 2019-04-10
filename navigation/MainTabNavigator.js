import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import PanelScreen from '../screens/PanelScreen';
import BatteryScreen from '../screens/BatteryScreen';
import LoadScreen from '../screens/LoadScreen';
import ChargeScreen from '../screens/ChargeScreen';

const PanelStack = createStackNavigator({
  Home: PanelScreen,
});

PanelStack.navigationOptions = {
  tabBarLabel: 'Panel',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-sunny${focused ? '' : '-outline'}`
          : 'md-sunny'
      }
    />
  ),
};

const BatteryStack = createStackNavigator({
  Links: BatteryScreen,
});

BatteryStack.navigationOptions = {
  tabBarLabel: 'Battery',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-battery-full${focused ? '' : '-outline'}`
          : 'md-battery-full'
      }
    />
  ),
};

const LoadStack = createStackNavigator({
  Settings: LoadScreen,
});

LoadStack.navigationOptions = {
  tabBarLabel: 'Load',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-bulb${focused ? '' : '-outline'}`
          : 'md-bulb'
      }
    />
  ),
};

const ChargeStack = createStackNavigator({
  Settings: ChargeScreen,
});

ChargeStack.navigationOptions = {
  tabBarLabel: 'Charge',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-bulb${focused ? '' : '-outline'}`
          : 'md-bulb'
      }
    />
  ),
};

export default createBottomTabNavigator({
  PanelStack,
  BatteryStack,
  LoadStack,
  ChargeStack,
});
