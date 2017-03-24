import React from 'react';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';

import { NavIcon } from './NavIcon';

export default class RootNavigation extends React.Component {
  render() {
    return (
      <TabNavigation
        navigatorUID="main"
        tabBarHeight={56}
        initialTab="panel" >
        <TabNavigationItem
          id="panel"
          renderIcon={this._onRenderIcon('sun-o')}>
          <StackNavigation initialRoute="panel" />
        </TabNavigationItem>

        <TabNavigationItem
          id="battery"
          renderIcon={this._onRenderIcon('battery-full')}>
          <StackNavigation initialRoute="battery" />
        </TabNavigationItem>

        <TabNavigationItem
          id="load"
          renderIcon={this._onRenderIcon('lightbulb-o')}>
          <StackNavigation initialRoute="load" />
        </TabNavigationItem>

        <TabNavigationItem
          id="charge"
          renderIcon={this._onRenderIcon('bolt')}>
          <StackNavigation initialRoute="charge" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _onRenderIcon = (icon) => (isSelected) => {
    return <NavIcon icon={icon} isSelected={isSelected} />;
  }

}
