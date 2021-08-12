import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';

import LoginPage from '../Pages/Login';
import FormPage from '../Pages/Form';
import SubmissionPage from '../Pages/Submission';
import SubmissionEditPage from '../Pages/SubmissionEdit';

const MainStack = createStackNavigator<RootStackParamList>();

interface Props {
  loggedIn: boolean;
}

const MainNavigator: FC<Props> = ({loggedIn}) => {
  const {Navigator} = MainStack;

  return (
    <Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#333333'},
        headerTitleStyle: {color: '#ccc'},
      }}>
      <MainStack.Screen
        name="Login"
        component={LoginPage}
        initialParams={{isLogged: loggedIn}}
      />
      <MainStack.Screen name="Form" component={FormPage} options={{}} />
      <MainStack.Screen name="Submission" component={SubmissionPage} />
      <MainStack.Screen name="Edit" component={SubmissionEditPage} />
    </Navigator>
  );
};

export default MainNavigator;
