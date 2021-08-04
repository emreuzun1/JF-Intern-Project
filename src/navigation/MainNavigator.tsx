import React, { FC, useState } from 'react';
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
  const { Navigator, Screen } = MainStack;

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {loggedIn ? (
        <>
          <MainStack.Screen name="Form" component={FormPage} />
          <MainStack.Screen name="Submission" component={SubmissionPage} />
        </>
      ) : (
        <>
          <MainStack.Screen name="Login" component={LoginPage} />
        </>
      )}
    </Navigator>
  );
};

export default MainNavigator;
