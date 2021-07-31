import axios from 'axios';
import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Input, Button} from '../components';

const {height, width} = Dimensions.get('screen');
const logoImg = require('../img/jotform-logo.png');

const App: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function login() {
    await axios({
      method: 'POST',
      url: 'https://api.jotform.com/user/login',
      params: {
        username: username,
        password: password,
        access: 'full',
        appName: 'JFTable',
      },
    })
      .then(response => {
        console.log(response.data.content);
      })
      .catch(err => {
        console.log(err);
      });
  }

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
          onChangeText={val => setUsername(val)}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          value={username}
          secureTextEntry
          onChangeText={val => setPassword(val)}
        />

        <Button title="Login" onPress={() => login()} />

        <TouchableOpacity style={styles.signUp} onPress={() => {}}>
          <Text>
            Don't you have an account?{' '}
            <Text style={{color: '#fa8900', fontWeight: '700'}}>Sign up!</Text>
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
    fontSize : 16,
  },

  signUp: {
    marginTop: 24,
  },
});

export default App;
