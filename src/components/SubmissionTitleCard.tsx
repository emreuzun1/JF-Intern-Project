import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from '../Pages/Submission/style';
interface Props {
  question: any;
}

const SubmissionText: React.FC<Props> = props => {
  if (props.question.index !== 0)
    return (
      <View style={styles.headers}>
        <Image
          source={props.question.item.icon}
          style={{width: 16, height: 16, tintColor: '#ccc'}}
        />
        <Text style={styles.titleText} numberOfLines={1}>
          {props.question.item.text}
        </Text>
      </View>
    );
  else return <View />;
};

export default SubmissionText;
