import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fa8900',
  },

  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  logoImg: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
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

  button: {
    backgroundColor: '#fa8900',
    width: width / 2.6,
    height: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 24,
    fontSize: 16,
  },

  registerText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'sf-regular',
  },

  input: {
    backgroundColor: '#e3e3e3e3',
    borderRadius: 5,
    width: width / 1.6,
    marginVertical: 10,
    fontSize: 16,
  },
});
