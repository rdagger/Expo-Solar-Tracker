import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react/native';

export default
@inject('appState')
@observer
class EditSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: props.appState.address,
      refresh: props.appState.refresh,
      addressError: false,
      refreshError: false,
    };

    this._onCancel = this._onCancel.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onChangeAddress = this._onChangeAddress.bind(this);
    this._onChangeRefresh = this._onChangeRefresh.bind(this);
    this._onEndAddress = this._onEndAddress.bind(this);
    this._onEndRefresh = this._onEndRefresh.bind(this);
  }

  render() {
    const errorStyle = {
      borderColor: 'red',
      backgroundColor: 'mistyrose',
    };
    const errorIcon = (
      <FontAwesome color="red" name="exclamation-circle" size={20} />
    );

    const addressErrorStyle = this.state.addressError ? errorStyle : null;
    const addressErrorIcon = this.state.addressError ? errorIcon : null;
    const refreshErrorStyle = this.state.refreshError ? errorStyle : null;
    const refreshErrorIcon = this.state.refreshError ? errorIcon : null;
    return (
      <View>
        <Modal
          animationType="fade"
          transparent
          visible={this.props.visible}
          onRequestClose={this._closeModal}>
          <View style={styles.innerContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address {addressErrorIcon}</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit
                editable={!this.props.disableForm}
                keyboardType="url"
                onChangeText={this._onChangeAddress}
                onEndEditing={this._onEndAddress}
                placeholder="REST API Address"
                returnKeyType="done"
                style={[styles.textInput, addressErrorStyle]}
                value={this.state.address}
              />

              <Text style={styles.inputLabel}>
                Refresh Interval {refreshErrorIcon}
              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit
                editable={!this.props.disableForm}
                keyboardType="numeric"
                onChangeText={this._onChangeRefresh}
                onEndEditing={this._onEndRefresh}
                placeholder="Refresh Inteval in Seconds"
                returnKeyType="done"
                style={[styles.textInput, refreshErrorStyle]}
                value={this.state.refresh}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={this.props.disableForm}
                onPress={this._onCancel}
                style={[styles.button, styles.buttonCancel]}>
                <Text style={styles.buttonLabel}>
                  <FontAwesome name="ban" size={30} /> Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={this.props.disableForm}
                onPress={this._onSave}
                style={[styles.button, styles.buttonSave]}>
                <Text style={styles.buttonLabel}>
                  <FontAwesome name="floppy-o" size={30} /> Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _onCancel() {
    this.props.onCancelEdit();
  }

  _closeModal() {
    console.log('closemodal');
  }

  _onSave() {
    const address = this.state.address;
    const refresh = this.state.refresh;

    if (this.state.addressError) {
      Alert.alert('Please fix address.');
    } else if (this.state.refreshError) {
      Alert.alert('Please fix refresh interval.');
    } else if (!address) {
      Alert.alert('Please enter address.');
    } else if (!refresh) {
      Alert.alert('Please enter refresh interval.');
    } else {
      this.props.onSaveEdit({
        address,
        refresh,
      });
    }
  }

  _onChangeAddress(address) {
    this.setState({ address });
    this.setState({ addressError: false });
  }

  _onChangeRefresh(refresh) {
    this.setState({ refresh });
    this.setState({ refreshError: false });
  }

  _onEndAddress() {
    const address = this.state.address;
    if (
      address &&
      address.length > 4 &&
      address.toUpperCase().startsWith('HTTP')
    ) {
      // Store address
      this.setState({ addressError: false });
    } else {
      // Invalid address
      this.setState({ addressError: true });
    }
  }

  _onEndRefresh() {
    const refresh = this.state.refresh;
    if (refresh && !isNaN(parseFloat(refresh)) && isFinite(refresh)) {
      // Store refresh interval
      this.setState({ refreshError: false });
    } else {
      // Invalid refresh
      this.setState({ refreshError: true });
    }
  }
} // End EditSettings

EditSettings.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(10, 0, 50, 0.8)',
  },
  inputContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 40,
  },
  inputLabel: {
    marginLeft: 35,
    fontSize: 20,
    alignItems: 'flex-start',
  },
  buttonsContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 48 / 2,
    borderWidth: 1,
  },
  buttonSave: {
    backgroundColor: 'chartreuse',
    paddingHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: '#DE4567',
  },
  buttonLabel: {
    fontSize: 30,
  },
  textInput: {
    alignItems: 'stretch',
    borderColor: 'cornflowerblue',
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 30,
    height: 56,
    padding: 10,
    marginHorizontal: 30,
    marginBottom: 20,
  },
});
