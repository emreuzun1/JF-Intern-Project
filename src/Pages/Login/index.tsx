import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import styled from 'styled-components/native';

import {RootStackParamList} from '../../Navigation/types';
import {requestLogin, resetForms} from '../../redux/actions';
import {Formik} from 'formik';
import {Colors} from '../../constants/Colors';

const logoImg = require('../../img/jotform-logo.png');
const {width} = Dimensions.get('screen');

type LoginProps = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginRouteProps = RouteProp<RootStackParamList, 'Login'>;

const StyledContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.jotformOrange,
});

const StyledTopContainer = styled.View({
  flex: 2,
  justifyContent: 'center',
});

const StyledLogoImage = styled.Image({
  width: width / 1.2,
  resizeMode: 'contain',
  marginBottom: 12,
});

const StyledBottomContainer = styled.View({
  flex: 3,
  backgroundColor: 'white',
  width: '100%',
  alignItems: 'center',
  borderTopLeftRadius: 36,
  borderTopRightRadius: 36,
  paddingTop: 24,
});

const StyledInputContainer = styled.View({
  alignItems: 'center',
  marginTop: 12,
});

const StyledTextInput = styled.TextInput({
  backgroundColor: Colors.lightGrey,
  borderRadius: 5,
  width: width / 1.6,
  height: 50,
  marginVertical: 10,
  fontSize: 16,
});

const StyledLoginButton = styled.TouchableOpacity({
  backgroundColor: Colors.jotformGrey,
  width: width / 2.6,
  padding: 12,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  marginTop: 24,
});

const StyledLoginText = styled.Text({
  color: 'white',
  fontSize: 18,
});

const StyledSignUpButton = styled.TouchableOpacity({
  marginTop: 24,
});

const StyledSignUpText = styled.Text({
  color: '#fa8900',
  fontWeight: 700,
});

interface Props {
  navigation: LoginProps;
  route: LoginRouteProps;
  requestLogin: (username: string, password: string) => void;
  resetForms: () => void;
}
interface IFormValues {
  username: string;
  password: string;
}

const Login = (props: Props) => {
  const initialValues: IFormValues = {username: '', password: ''};
  // eslint-disable-next-line no-shadow
  const {navigation, route, resetForms} = props;

  React.useEffect(() => {
    resetForms();
    if (route.params.isLogged) {
      navigation.navigate('Form');
    }
  }, [route.params.isLogged, navigation, resetForms]);

  return (
    <StyledContainer>
      <StyledTopContainer>
        <StyledLogoImage source={logoImg} />
      </StyledTopContainer>
      <StyledBottomContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={values =>
            props.requestLogin(values.username, values.password)
          }>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <StyledInputContainer>
              <StyledTextInput
                autoCapitalize="none"
                placeholder=" Username"
                value={values.username}
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
              />
              <StyledTextInput
                autoCapitalize="none"
                placeholder=" Password"
                value={values.password}
                secureTextEntry
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
              />
              <StyledLoginButton onPress={handleSubmit}>
                <StyledLoginText>Login</StyledLoginText>
              </StyledLoginButton>
            </StyledInputContainer>
          )}
        </Formik>
        <StyledSignUpButton onPress={() => navigation.navigate('SignUp')}>
          <Text>
            Don't you have an account?
            <StyledSignUpText> Sign up!</StyledSignUpText>
          </Text>
        </StyledSignUpButton>
      </StyledBottomContainer>
    </StyledContainer>
  );
};

const mapStateToProps = (state: any) => {
  const {appKey} = state.auth;
  return {appKey};
};

const mapDispatchToProps = {
  requestLogin,
  resetForms,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
