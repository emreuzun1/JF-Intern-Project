import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
  },

  header: {
    marginLeft: 32,
    fontFamily: 'sf-pro-heavy',
    color: Colors.grey,
    fontSize: 20,
  },

  nameInputContainer: {
    flexDirection: 'row',
  },

  nameInsideContainer: {
    width: '40%',
    marginLeft: 24,
  },

  input: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 6,
    padding: 8,
    color: Colors.grey,
    marginTop: 4,
    marginLeft: 8,
  },

  inputContainer: {
    width: '50%',
    marginLeft: 24,
  },

  subtitles: {
    fontFamily: 'sf-regular',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 4,
    color: Colors.lightGrey,
  },

  errorText: {
    fontFamily: 'sf-regular',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 4,
    color: Colors.lightRed,
  },

  phoneInputContainer: {
    width: '100%',
    marginTop: 24,
  },
});
