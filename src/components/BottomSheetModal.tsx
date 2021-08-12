import React, {FC} from 'react';
import {View, StyleSheet, Button, Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');

const Modal: FC = () => {
  return (
    <View style={styles.container}>
      <Button title="Change" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#434343',
    padding: 16,
    height: height,
  },
});

export default Modal;
