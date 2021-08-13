import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#434343',
  },
  headerBackground: {
    backgroundColor: '#333333',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#282828',
    height: 75,
    marginTop: 12,
    borderRadius: 8,
  },
  textContainer: {
    width: width / 2,
    borderRightWidth: 0.3,
    borderColor: '#ccc',
    justifyContent: 'center',
    padding: 6,
  },
  headerText: {
    fontSize: 14,
    color: '#ccc',
    margin: 8,
    fontFamily: 'sf-display-thin',
  },
  line: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },

  headers: {
    height: height / 20,
    width: width / 2,
    flexDirection: 'row',
    borderRightWidth: 0.15,
    borderColor: '#ccc',
    alignItems: 'center',
    padding: 8,
  },
  titleText: {
    fontSize: 12,
    marginHorizontal: 12,
    color: '#9c9c9c',
    fontFamily: 'sf-display-thin',
  },
});
