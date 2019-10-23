import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import Level from '../components/Level';
import { PiLogo } from '../components/PiLogo';

class BatteryScreen extends React.Component {
  static navigationOptions = {
    title: 'Solar Tracker',
    headerLeft: <PiLogo />,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Level
          query="batt_voltage"
          label="Battery Voltage"
          units="V"
          min={0}
          max={16}
        />
      </ScrollView>
    );
  }
}  // End BatteryScreen
export default inject('appState')(observer(BatteryScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
