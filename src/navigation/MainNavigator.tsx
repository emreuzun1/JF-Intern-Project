import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';

import LoginPage from '../Pages/Login';
import FormPage from '../Pages/Form';
import SubmissionPage from '../Pages/Submission';
import SubmissionEditPage from '../Pages/SubmissionEdit';
import {store} from '../redux/store';

const MainStack = createStackNavigator<RootStackParamList>();

const MainNavigator: FC = () => {
  const {Navigator} = MainStack;

  const {
    auth: {appKey},
  } = store.getState();

  return (
    <Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#333333'},
        headerTitleStyle: {color: '#ccc'},
      }}>
      <MainStack.Screen
        name="Login"
        component={LoginPage}
        initialParams={{isLogged: appKey === '' ? false : true}}
      />
      <MainStack.Screen name="Form" component={FormPage} options={{}} />
      <MainStack.Screen name="Submission" component={SubmissionPage} />
      <MainStack.Screen name="Edit" component={SubmissionEditPage} />
    </Navigator>
  );
};

export default MainNavigator;
