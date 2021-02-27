import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Panel: {
            screens: {
              PanelScreen: 'panel',
            },
          },
          Battery: {
            screens: {
              BatteryScreen: 'battery',
            },
          },
          Load: {
            screens: {
              LoadScreen: 'load',
            },
          },
          Charge: {
            screens: {
              ChargeScreen: 'charge',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
