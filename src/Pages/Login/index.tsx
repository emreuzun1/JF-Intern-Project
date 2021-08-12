import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../Navigation/types';
import {requestLogin} from '../../redux/actions';
import {Formik} from 'formik';
import Waiting from '../../components/Loading';
import {styles} from './style';

const logoImg = require('../../img/jotform-logo.png');

type LoginProps = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginRouteProps = RouteProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginProps;
  route: LoginRouteProps;
  requestLogin: (username: string, password: string) => void;
}
interface IFormValues {
  username: string;
  password: string;
}

const Login = (props: Props) => {
  const initialValues: IFormValues = {username: '', password: ''};
  const {navigation, route} = props;

  if (route.params.isLogged) {
    navigation.navigate('Form');
    return <Waiting />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logoImg} source={logoImg} />
      </View>
      <View style={styles.bottomContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={values =>
            props.requestLogin(values.username, values.password)
          }>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder=" Username"
                value={values.username}
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
              />
              <TextInput
                style={styles.input}
                placeholder=" Password"
                value={values.password}
                secureTextEntry
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
              />
              <Button title="Login" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
        <TouchableOpacity style={styles.signUp} onPress={() => {}}>
          <Text>
            Don't you have an account?
            <Text style={{color: '#fa8900', fontWeight: '700'}}>Sign up!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  const {appKey} = state.auth;
  return {appKey};
};

const mapDispatchToProps = {
  requestLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
