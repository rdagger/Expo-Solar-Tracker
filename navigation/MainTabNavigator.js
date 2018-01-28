import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';
import PanelScreen from '../screens/PanelScreen';
import BatteryScreen from '../screens/BatteryScreen';
import LoadScreen from '../screens/LoadScreen';
import ChargeScreen from '../screens/ChargeScreen';

export default TabNavigator(
  {
    Panel: {
      screen: PanelScreen,
    },
    Battery: {
      screen: BatteryScreen,
    },
    Load: {
      screen: LoadScreen,
    },
    Charge: {
      screen: ChargeScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Panel':
            iconName =
              Platform.OS === 'ios'
                ? `ios-sunny${focused ? '' : '-outline'}`
                : 'md-sunny';
            break;
          case 'Battery':
            iconName =
              Platform.OS === 'ios'
                ? `ios-battery-full${focused ? '' : '-outline'}`
                : 'md-battery-full';
            break;
          case 'Load':
            iconName =
              Platform.OS === 'ios'
                ? `ios-bulb${focused ? '' : '-outline'}`
                : 'md-bulb';
            break;
          case 'Charge':
            iconName =
              Platform.OS === 'ios'
                ? `ios-battery-charging${focused ? '' : '-outline'}`
                : 'md-battery-charging';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
