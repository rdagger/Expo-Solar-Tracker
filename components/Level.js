import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { withAppStore } from '../store/AppContext';
import Gauge from './Gauge';

@withAppStore
@observer
class Level extends React.Component {
  render() {
    const { store } = this.props;
    const { height, width } = Dimensions.get('window');
    const gauge =
      store.data && typeof store.data[this.props.query] !== undefined ? (
        <Gauge
          value={store.data[this.props.query]}
          units={this.props.units}
          width={width}
          height={height - 200}
          min={this.props.min}
          max={this.props.max}
          label={this.props.label}
          color="lime"
          backgroundColor="grey"
          valueFontSize={50}
          labelFontSize={30}
        />
      ) : (
        <ActivityIndicator animating size="large" />
      );

    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>{store.error}</Text>
        {gauge}
      </View>
    );
  }
} // End Level
export default Level;

Level.propTypes = {
  query: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  units: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsButtonContainer: {
    alignItems: 'flex-end',
    marginRight: 25,
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
});
