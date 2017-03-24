// Setting up block level variable for singleton (AppState)
let instance = null;

import { AsyncStorage } from 'react-native';
import { action, observable } from 'mobx';

class AppState {
  @observable address;
  @observable refresh;
  @observable data;
  @observable error;

  constructor() {
    // Check instance to ensure class is a singleton
    if (!instance) {
      instance = this;
    }

    this.data = null;
    this.address = null;
    this.refresh = null;
    this.loadSettings();

    // Singleton
    return instance;
  }


  @action _fetchData() {
    if (!this.address) {
      this.error = "No REST API address specified.\nPlease click settings.";
      return;
    } else {
      this.error = null;
    }
    // Fetch data from Rest API
    fetch(this.address, {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          this.data = data;
          this.error = null;
        });
      } else {
        // Error
        response.json().then((r) => {
          this.error = r.error;
        });
      }
      // Repeat fetch at specified interval
      this.fetchTimer();
    }).catch((error) => {
      // Error no response
      this.error = error.message;
      // Repeat fetch at specified interval
      this.fetchTimer();
    });
  }

  fetchTimer() {
    // Start timer if refresh interval specified
    if (this.refresh) {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      // Note timer may not work properly if remote debugging enabled
      this.timeOut = setTimeout(() => this._fetchData(), parseFloat(this.refresh) * 1000);
    }
  }

  @action loadSettings() {
    AsyncStorage.multiGet(['address', 'refresh'], (error, stores) => {
      if (error) {
        console.log(error.message);
      }
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = store[i][1];
        if (value) {
          this[key] = value;
        }
      });
    }).then(() => {
      // Set default refresh interval of 60 seconds if not specified
      if (!this.refresh) {
        this.refresh = '15';
      }
      this._fetchData();
    });
  }

  @action saveSettings(settings, onSave) {
    const { address, refresh } = settings;
    this.address = address;
    this.refresh = refresh;

    const set_pairs = [['address', address], ['refresh', refresh]];
    AsyncStorage.multiSet(set_pairs, (error) => {
      if (error) {
        onSave(error.message);
      } else {
        onSave(null);
        this.error = null;
        this._fetchData();
      }
    });
  }
}

export default AppState;
