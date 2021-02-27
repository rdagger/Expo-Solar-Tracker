import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Level from '../components/Level';

export default function ChargeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Level
        query="charge_current"
        label="Charge Current"
        units="A"
        min={0}
        max={5}
      />
    </ScrollView>
  );  // End Charge Screen
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
