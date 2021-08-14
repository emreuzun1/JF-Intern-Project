import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../constants/Colors';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.jotformOrange,
  },

  button: {
    backgroundColor: Colors.jotformGrey,
    width: width / 2.6,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 24,
  },

  loginText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'sf-regular',
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
    marginTop: 12,
  },

  logoImg: {
    width: width / 1.2,
    resizeMode: 'contain',
    marginBottom: 12,
  },

  input: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 5,
    width: width / 1.6,
    marginVertical: 10,
    fontSize: 16,
  },

  signUp: {
    marginTop: 24,
  },
});
