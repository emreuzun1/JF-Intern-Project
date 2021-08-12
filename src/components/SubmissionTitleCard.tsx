import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Pages/Submission/style';
interface Props {
  question: any;
  index: number;
}

const SubmissionText: React.FC<Props> = props => {
  const {question, index} = props.question;
  if (index !== 0)
    return (
      <View style={styles.headers}>
        <Text style={styles.titleText} numberOfLines={1}>
          {question.text}
        </Text>
      </View>
    );
  else return <View />;
};

export default SubmissionText;
