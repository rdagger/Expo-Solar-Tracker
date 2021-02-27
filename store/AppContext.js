import React from 'react'
import { createAppStore } from './AppState'
import { useLocalObservable } from 'mobx-react'

const AppContext = React.createContext(null);

export const AppProvider = ({ children }) => {
  const appStore = useLocalObservable(createAppStore);
  appStore.loadSettings();

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export const useAppStore = () => React.useContext(AppContext);

/* HOC to inject store to any functional or class component */
export const withAppStore = (Component) => (props) => {
  return <Component {...props} store={useAppStore()} />;
};
