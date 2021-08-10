import React, {FC} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {NameEdit} from './Editors';

const {height} = Dimensions.get('screen');

const Modal: FC = props => {
  

  return (
    <View style={styles.container}>
      <NameEdit text="Emre" />
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
