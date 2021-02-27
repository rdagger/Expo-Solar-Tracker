import AsyncStorage from '@react-native-community/async-storage';
import { runInAction } from 'mobx';

export function createAppStore() {
  return {
    address: null,
    refresh: null,
    data: null,
    error: null,
    initialData: false,

    _updateData(data) {
      runInAction(() => {
        this.data = data;
        this.error = null;
        this.initialData = true;
      });
    },

    _fetchData() {
      if (!this.address) {
        runInAction(() => {
          this.error = 'No REST API address specified.\nPlease click settings.';
        });
        return;
      } else {
        runInAction(() => {
          this.error = null;
        });
      }
      // Fetch data from Rest API
      fetch(this.address, {
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              this._updateData(data);
            });
          } else {
            // Error
            runInAction(() => {
              if (response.status === 404) {
                this.error = '404 ERROR - The requested URL was NOT found.';
              } else {
                response.text().then((text) => (this.error = text));
              }
            });
          }
          // Repeat fetch at specified interval
          this.fetchTimer();
        })
        .catch((error) => {
          // Error no response
          runInAction(() => {
            this.error = error.message;
          });

          // Repeat fetch at specified interval
          this.fetchTimer();
        });
    },
    fetchTimer() {
      // Start timer if refresh interval specified
      if (this.refresh) {
        if (this.timeOut) {
          clearTimeout(this.timeOut);
        }
        // Note timer may not work properly if remote debugging enabled
        this.timeOut = setTimeout(
          () => this._fetchData(),
          parseFloat(this.refresh) * 1000
        );
      }
    },

    loadSettings() {
      AsyncStorage.multiGet(['address', 'refresh'], (error, stores) => {
        if (error) {
          console.log(error.message);
        }
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it

          const key = store[i][0];
          const value = store[i][1];
          if (value) {
            runInAction(() => {
              this[key] = value;
            });
          }
        });
      }).then(() => {
        // Set default refresh interval of 60 seconds if not specified
        if (!this.refresh) {
          runInAction(() => {
            this.refresh = '15';
          });
        }
        this._fetchData();
      });
    },

    saveSettings(settings, onSave) {
      const { address, refresh } = settings;
      runInAction(() => {
        this.address = address;
        this.refresh = refresh;
      });
      const set_pairs = [
        ['address', address],
        ['refresh', refresh],
      ];
      AsyncStorage.multiSet(set_pairs, (error) => {
        if (error) {
          onSave(error.message);
        } else {
          onSave(null);
          runInAction(() => {
            this.error = null;
          });
          this._fetchData();
        }
      });
    },
  };
}
