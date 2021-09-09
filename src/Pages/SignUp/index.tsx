import React, {FC} from 'react';
import {Button, Dimensions, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import styled from 'styled-components/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Sae} from 'react-native-textinput-effects';
import * as Yup from 'yup';

import {requestRegister} from '../../redux/actions';
import {Colors} from '../../constants/Colors';
import {RootStackParamList} from '../../Navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

type SignUpProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const {width} = Dimensions.get('screen');

const StyledContainer = styled.KeyboardAvoidingView({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.jotformOrange,
});

const StyledTopContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
});

const StyledLogoImg = styled.Image({
  width: 128,
  height: 128,
  resizeMode: 'contain',
});

const StyledBottomContainer = styled.ScrollView({
  flex: 3,
  backgroundColor: Colors.black,
  width: '100%',
  borderTopLeftRadius: 36,
  borderTopRightRadius: 36,
  paddingTop: 24,
});

const StyledButtonContainer = styled.View({
  marginTop: 24,
});

const StyledErrorText = styled.Text({
  fontSize: 13,
  marginLeft: 10,
  marginTop: 4,
  color: Colors.lightRed,
});

const StyledBackButton = styled.TouchableOpacity({
  marginLeft: 8,
});

interface SignUpValues {
  username: string;
  password: string;
  email: string;
}

interface ISignUp {
  navigation: SignUpProp;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().max(255).email('Invalid email').required('Required!'),
  password: Yup.string().min(8).required('Required'),
  confirmPassword: Yup.string().min(8).required('Required'),
});

const SignUp: FC<ISignUp> = ({navigation}) => {
  const dispatch = useDispatch();

  const register = (data: SignUpValues) => {
    dispatch(requestRegister(data.username, data.email, data.password));
  };

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Sign Up',
      headerStyle: {
        backgroundColor: Colors.jotformOrange,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: () => (
        <StyledBackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={'white'} />
        </StyledBackButton>
      ),
    });
  });

  return (
    <StyledContainer behavior="padding">
      <StyledTopContainer>
        <StyledLogoImg
          source={require('../../img/jotform-logomark-transparent.png')}
        />
      </StyledTopContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={(data: SignUpValues) => {
          register(data);
        }}
        validationSchema={validationSchema}>
        {({handleSubmit, values, handleChange, errors, touched}) => (
          <StyledBottomContainer
            contentContainerStyle={styles.contentContainerStyle}>
            <Sae
              label={'Email'}
              iconClass={EntypoIcon}
              iconName={'mail'}
              inputPadding={16}
              iconColor={'white'}
              labelStyle={styles.labelStyle}
              autoCapitalize={'none'}
              autoCorrect={false}
              borderHeight={1}
              labelHeight={24}
              value={values.email}
              style={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={handleChange('email')}
            />
            {errors.email && touched.email ? (
              <StyledErrorText>{errors.email}</StyledErrorText>
            ) : null}
            <Sae
              label={'Username'}
              iconClass={Ionicons}
              iconName={'person'}
              inputPadding={16}
              iconColor={'white'}
              labelStyle={styles.labelStyle}
              autoCapitalize={'none'}
              autoCorrect={false}
              borderHeight={1}
              labelHeight={24}
              value={values.username}
              style={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={handleChange('username')}
            />
            <Sae
              label={'Password'}
              iconClass={EntypoIcon}
              iconName={'lock'}
              inputPadding={16}
              iconColor={'white'}
              labelStyle={styles.labelStyle}
              autoCapitalize={'none'}
              autoCorrect={false}
              borderHeight={1}
              labelHeight={24}
              value={values.password}
              style={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={handleChange('password')}
            />
            <Sae
              label={'Confirm Password'}
              iconClass={EntypoIcon}
              iconName={'lock'}
              inputPadding={16}
              iconColor={'white'}
              labelStyle={styles.labelStyle}
              autoCapitalize={'none'}
              autoCorrect={false}
              borderHeight={1}
              labelHeight={24}
              value={values.confirmPassword}
              style={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={handleChange('confirmPassword')}
            />
            <StyledButtonContainer>
              <Button
                onPress={handleSubmit}
                title="Register"
                color={Colors.jotformOrange}
              />
            </StyledButtonContainer>
          </StyledBottomContainer>
        )}
      </Formik>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
  },
  labelStyle: {
    color: 'white',
    fontWeight: '400',
  },
  input: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    width: width / 1.6,
    borderRadius: 5,
    marginVertical: 12,
  },
});

export default SignUp;
