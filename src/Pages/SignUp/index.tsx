import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';

import {requestRegister} from '../../redux/actions';
import {styles} from './style';

const SignUp = () => {
  const dispatch = useDispatch();

  const register = (data: any) => {
    dispatch(requestRegister(data.username, data.email, data.password));
  };

  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../img/jotform-icon-orange.png')}
          style={styles.logoImg}
        />
      </View>
      <View style={styles.bottomContainer}>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'email',
              name: 'email',
              rules: {
                required: {
                  value: true,
                  message: 'Email is required!',
                },
              },
              textInputProps: {
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                style: styles.input,
                label: 'Email',
              },
            },
            {
              type: 'text',
              name: 'username',
              rules: {
                required: {
                  value: true,
                  message: 'Username is required!',
                },
              },
              textInputProps: {
                style: styles.input,
                label: 'Username',
              },
            },
            {
              type: 'password',
              name: 'password',
              rules: {
                required: {
                  value: true,
                  message: 'Password is required!',
                },
              },
              textInputProps: {
                secureTextEntry: true,
                style: styles.input,
                label: 'Password',
              },
            },
          ]}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit((data: any) => register(data))}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
