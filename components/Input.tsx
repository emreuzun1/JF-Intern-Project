import React, {FC} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

interface Props {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  value?: string;
  style?: any;
}

const Input: FC<Props> = props => {
  return (
    <TextInput
      style={{...styles.input, ...props.style}}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry || false}
      onChangeText={props.onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
  },
});

export default Input;
