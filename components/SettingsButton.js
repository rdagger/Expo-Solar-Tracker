import React from 'react';
import { Alert,
         TouchableOpacity,
         View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react/native';
import EditSettings from './EditSettings';

@inject("appState") @observer
export default class SettingsButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditSettings: false,
      disableForm: false,
    };

    this._onEditCancel = this._onEditCancel.bind(this);
    this._onEditSave = this._onEditSave.bind(this);
    this._onSettingsClick = this._onSettingsClick.bind(this);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this._onSettingsClick}>
          <View>
            <FontAwesome name="cog" size={30} color="grey" />
          </View>
        </TouchableOpacity>
        <EditSettings
          visible={this.state.showEditSettings}
          onCancelEdit={this._onEditCancel}
          onSaveEdit={this._onEditSave}
          disableForm={this.state.disableForm}
        />
      </View>
    );
  }

  _onEditCancel() {
    this.setState({showEditSettings : false});
  }

  _onEditSave(settings) {
    this.setState({disableForm: true});
    this.props.appState.saveSettings(settings, (error) => {
      this.setState({disableForm: false});
      if (error) {
        Alert.alert(error.message);
      } else {
        this.setState({showEditSettings: false});
      }
    });
  }

  _onSettingsClick() {
    this.setState({showEditSettings : true});
  }

}  //  End SettingsButton
