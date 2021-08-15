import React, {FC} from 'react';
import {Text, StyleSheet} from 'react-native';

interface Props {
  answer: any;
}

const Name: FC<Props> = props => {
  return (
    <Text style={styles.answerText} numberOfLines={1}>
      {props.answer.prettyFormat || props.answer.answer}
    </Text>
  );
};

const styles = StyleSheet.create({
  answerText: {
    marginHorizontal: 8,
    color: 'white',
    fontSize: 14,
    fontFamily: 'sf-regular',
  },
});

export default Name;
