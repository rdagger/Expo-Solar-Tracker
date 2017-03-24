import { createRouter } from '@expo/ex-navigation';

import RootNavigation from './RootNavigation';
import PanelScreen from '../screens/PanelScreen';
import BatteryScreen from '../screens/BatteryScreen';
import LoadScreen from '../screens/LoadScreen';
import ChargeScreen from '../screens/ChargeScreen';

export default createRouter(() => ({
  panel: () => PanelScreen,
  battery: () => BatteryScreen,
  load: () => LoadScreen,
  charge: () => ChargeScreen,
  rootNavigation: () => RootNavigation,
}));
