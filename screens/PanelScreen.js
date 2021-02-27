import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Level from '../components/Level';

export default function PanelScreen() {
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
  ); // End PanelScreen
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
