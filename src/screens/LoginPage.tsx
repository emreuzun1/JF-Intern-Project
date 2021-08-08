import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';

import { Button, Input } from '../components';
import { RootStackParamList } from '../navigation/types';
import { requestLogin } from '../redux/actions';
import { Formik } from 'formik';
import Waiting from '../components/Waiting';

const { width } = Dimensions.get('screen');
const logoImg = require('../img/jotform-logo.png');


type LoginProps = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginRouteProps = RouteProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginProps,
  route: LoginRouteProps
}

interface IFormValues {
  username: string,
  password: string
}

const App: FC<Props> = ({ route, navigation }) => {
  const initialValues: IFormValues = { username: '', password: '' };
  const dispatch = useDispatch();

  const login = (values: any) => {
    dispatch(requestLogin(values.username, values.password));
    navigation.navigate('Form');
  };


  if (route.params.isLogged) {
    navigation.navigate('Form');
    return (
      <Waiting />
    )
  }
  return (

    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logoImg} source={logoImg} />
      </View>
      <View style={styles.bottomContainer}>
        <Formik initialValues={initialValues}
          onSubmit={values => login(values)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
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
        <TouchableOpacity style={styles.signUp} onPress={() => { }}>
          <Text>
            Don't you have an account?{' '}
            <Text style={{ color: '#fa8900', fontWeight: '700' }}>Sign up!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fa8900',
  },

  topContainer: {
    flex: 2,
    justifyContent: 'center',
  },

  bottomContainer: {
    flex: 3,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 24,
  },

  inputContainer: {
    alignItems: 'center',
    marginTop: 12
  },

  logoImg: {
    width: width / 1.2,
    resizeMode: 'contain',
    marginBottom: 12,
  },

  input: {
    backgroundColor: '#e3e3e3e3',
    borderRadius: 5,
    width: width / 1.6,
    marginVertical: 10,
    fontSize: 16,
  },

  signUp: {
    marginTop: 24,
  },
});

export default App;
