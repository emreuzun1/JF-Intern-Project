import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../constants/Colors';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.jotformGrey,
  },
  headerBackground: {
    backgroundColor: Colors.darkerGrey,
    width: '100%',
  },
  container: {
    backgroundColor: Colors.darkerGrey,
    height: 75,
    marginTop: 12,
    borderRadius: 8,
  },
  textContainer: {
    width: width / 2,
    borderRightWidth: 0.3,
    borderColor: Colors.lightGrey,
    justifyContent: 'center',
    padding: 6,
  },
  headerText: {
    fontSize: 14,
    color: Colors.lightGrey,
    margin: 8,
    fontFamily: 'sf-display-thin',
  },
  line: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: Colors.lightGrey,
  },

  headers: {
    height: height / 20,
    width: width / 2,
    flexDirection: 'row',
    borderRightWidth: 0.15,
    borderColor: Colors.lightGrey,
    alignItems: 'center',
    padding: 8,
  },
  titleText: {
    fontSize: 12,
    marginHorizontal: 12,
    color: Colors.grey,
    fontFamily: 'sf-display-thin',
  },
});
