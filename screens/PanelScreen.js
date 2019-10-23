import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import Level from '../components/Level';
import { PiLogo } from '../components/PiLogo';

class PanelScreen extends React.Component {
  static navigationOptions = {
    title: 'Solar Tracker',
    headerLeft: <PiLogo />,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Level
          query="pv_voltage"
          label="Solar Panel Voltage"
          units="V"
          min={0}
          max={24}
        />
      </ScrollView>
    );
  }
}  // End PanelScreen
export default inject('appState')(observer(PanelScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
