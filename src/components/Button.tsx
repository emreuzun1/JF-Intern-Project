import React, {FC} from 'react';
import {Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('screen');

interface Props {
  title: string;
  onPress: () => void;
}

const App: FC<Props> = props => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#434343',
    width: width / 2.6,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop : 24
  },
  text: {
    color: '#fff',
  },
});

export default App;
