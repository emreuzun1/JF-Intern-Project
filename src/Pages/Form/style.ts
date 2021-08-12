import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#434343',
    padding: 24,
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
    color: '#ccc',
  },
  updateText: {
    fontSize: 12,
    color: '#ccc',
  },
  line: {
    width: width / 1.2,
    borderBottomWidth: 1,
    marginTop: 8,
    borderColor: '#ccc',
  },
});
