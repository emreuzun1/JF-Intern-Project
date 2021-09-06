import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';

import LoginPage from '../Pages/Login';
import FormPage from '../Pages/Form';
import SubmissionPage from '../Pages/Submission';
import SignUpPage from '../Pages/SignUp';

const MainStack = createStackNavigator<RootStackParamList>();

interface Props {
  loggedIn: boolean;
}

const MainNavigator: FC<Props> = ({loggedIn}) => {
  const {Navigator} = MainStack;

  return (
    <Navigator initialRouteName="Login">
      <MainStack.Screen
        name="Login"
        component={LoginPage}
        initialParams={{isLogged: loggedIn}}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Form"
        component={FormPage}
        options={{gestureEnabled: false}}
      />
      <MainStack.Screen name="Submission" component={SubmissionPage} />
      <MainStack.Screen name="SignUp" component={SignUpPage} />
    </Navigator>
  );
};

export default MainNavigator;
