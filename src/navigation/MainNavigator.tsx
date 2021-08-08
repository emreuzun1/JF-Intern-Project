import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import LoginPage from '../screens/LoginPage';
import FormPage from '../screens/FormPage';
import SubmissionPage from '../screens/SubmissionPage';

const MainStack = createStackNavigator<RootStackParamList>();
interface IMainNavigator {
  loggedIn: boolean
}

const MainNavigator: FC<IMainNavigator> = ({ loggedIn }) => {
  const { Navigator } = MainStack;

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Login" component={LoginPage} initialParams={{ isLogged: loggedIn }} />
      <MainStack.Screen name="Form" component={FormPage} />
      <MainStack.Screen name="Submission" component={SubmissionPage} />
    </Navigator>
  );
};

export default MainNavigator;
