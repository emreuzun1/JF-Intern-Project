import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { setAppKey } from './src/lib/axios';

const App = () => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onBeforeLift = () => {
    const { auth } = store.getState();
    if (auth.appKey) {
      setLoggedIn(true);
      setAppKey(auth.appKey);
    }
  };


  return (
    <Provider store={store}>
      <PersistGate onBeforeLift={onBeforeLift} loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigator loggedIn={loggedIn} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
