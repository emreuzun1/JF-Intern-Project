import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import MainNavigator from './src/Navigation/MainNavigator';
import { store, persistor } from './src/redux/store';
import { setAppKey } from './src/Lib/axios';


const App = () => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onBeforeLift = () => {
    const { auth } = store.getState();

    if (auth.appKey) {
      setLoggedIn(auth.loading);
      setAppKey(auth.appKey);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate onBeforeLift={onBeforeLift} loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigator/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
