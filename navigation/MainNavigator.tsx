import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginPage from '../screens/LoginPage';
import MainPage from '../screens/MainPage';

const MainStack = createStackNavigator();

const MainNavigator: FC = () => {
  const {Navigator, Screen} = MainStack;

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Login" component={LoginPage} />
      <Screen name="Main" component={MainPage} />
    </Navigator>
  );
};

export default MainNavigator;
