import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Level from '../components/Level';

export default function BatteryScreen() {
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
  ); // End Battery Screen
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
