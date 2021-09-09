import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, Dimensions, StyleSheet, Button, LogBox} from 'react-native';
import {connect} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Sae} from 'react-native-textinput-effects';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const StyledBottomContainer = styled.ScrollView({
  flex: 3,
  backgroundColor: Colors.black,
  width: '100%',
  borderTopLeftRadius: 36,
  borderTopRightRadius: 36,
  paddingTop: 24,
  paddingBottom: 24,
});

const StyledInputContainer = styled.View({
  alignItems: 'center',
  marginTop: 12,
});

const StyledButtonContainer = styled.View({
  marginTop: 24,
});

const StyledSignUpButton = styled.TouchableOpacity({
  marginTop: 24,
});

const StyledSignUpText = styled.Text({
  color: Colors.jotformOrange,
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
    LogBox.ignoreLogs([
      'RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks',
    ]);
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

      <Formik
        initialValues={initialValues}
        onSubmit={values =>
          props.requestLogin(values.username, values.password)
        }>
        {({handleChange, handleSubmit, values}) => (
          <StyledBottomContainer
            contentContainerStyle={styles.contentContainerStyle}>
            <StyledInputContainer>
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
                secureTextEntry
                onChangeText={handleChange('password')}
              />
            </StyledInputContainer>
            <StyledButtonContainer>
              <Button
                onPress={handleSubmit}
                title="Login"
                color={Colors.jotformOrange}
              />
            </StyledButtonContainer>
            <StyledSignUpButton onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>
                Don't you have an account?
                <StyledSignUpText> Sign up!</StyledSignUpText>
              </Text>
            </StyledSignUpButton>
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
  signUpText: {
    color: 'white',
    fontWeight: '600',
  },
  labelStyle: {
    color: 'white',
    fontWeight: '600',
  },
  inputContainer: {
    marginVertical: 12,
    borderRadius: 5,
    width: width / 1.6,
  },
  input: {
    fontSize: 16,
    color: 'white',
  },
});

const mapStateToProps = (state: any) => {
  const {appKey} = state.auth;
  return {appKey};
};

const mapDispatchToProps = {
  requestLogin,
  resetForms,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
