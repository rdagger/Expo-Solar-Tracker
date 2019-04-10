import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Level from '../components/Level';
import { PiLogo } from '../components/PiLogo';

export default
@inject('appState')
@observer
class LoadScreen extends React.Component {
  static navigationOptions = {
    title: 'Solar Tracker',
    headerLeft: <PiLogo />,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Level
          query="load_amps"
          label="Load Current"
          units="A"
          min={0}
          max={3}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
