import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Level from '../components/Level';

export default function LoadScreen() {
  return (
    <ScrollView style={styles.container}>
      <Level query="load_amps" label="Load Current" units="A" min={0} max={3} />
    </ScrollView>
  ); // End Load Screen
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
