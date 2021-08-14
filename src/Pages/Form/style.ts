import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.jotformGrey,
    padding: 24,
  },

  topContainer: {
    width: width,
    height: 50,
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },

  formContainer: {
    display: 'flex',
    width: width / 1.2,
    margin: 12,
    flexDirection: 'row',
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.lightGrey,
  },
  updateText: {
    fontSize: 12,
    color: Colors.lightGrey,
  },
  line: {
    width: width / 1.2,
    borderBottomWidth: 1,
    marginTop: 8,
    borderColor: Colors.lightGrey,
  },
  logOut: {
    marginRight: width / 10,
  },
});
