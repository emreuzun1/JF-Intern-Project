import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, FC, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Input, Button } from '../components';
import { RootNavigatorParamsList } from '../navigation/types';
import { requestLogin } from '../redux/actions';

const { height, width } = Dimensions.get('screen');
const logoImg = require('../img/jotform-logo.png');

export interface LoginProps {
  navigation: StackNavigationProp<RootNavigatorParamsList, 'Login'>;
}

const App: FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const handleUsernameChange = useCallback((val: string) => {
    setUsername(val);
  }, []);

  const handlePasswordChange = useCallback((val: string) => {
    setPassword(val);
  }, []);

  const login = () => {
    dispatch(requestLogin(username, password));
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logoImg} source={logoImg} />
      </View>
      <View style={styles.bottomContainer}>
        <Input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          value={username}
          secureTextEntry
          onChangeText={handlePasswordChange}
        />

        <Button title="Login" onPress={login} />

        <TouchableOpacity style={styles.signUp} onPress={() => { }}>
          <Text>
            Don't you have an account?{' '}
            <Text style={{ color: '#fa8900', fontWeight: '700' }}>Sign up!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
