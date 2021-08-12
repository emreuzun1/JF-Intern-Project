import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import {Name} from './Fields';
import {useSelector} from 'react-redux';
import {getOrderedAnswers} from '../redux/reducers/selector';
import {styles} from '../Pages/Submission/style';

interface ICard {
  item: any;
  navigation: any;
  onPress: any;
}

const Card: React.FC<ICard> = props => {
  const orderedAnswers = useSelector(getOrderedAnswers);
  const answers = orderedAnswers(props.item.item.id);

  return (
    <TouchableOpacity
      onPress={props.onPress.bind(this, answers)}
      style={styles.container}>
      <View>
        <Text style={styles.headerText}>{answers[0].prettyFormat || null}</Text>
        <View style={styles.line} />
      </View>
      <View style={{flexDirection: 'row'}}>
        {answers.map((answer, index) => {
          if (index === 0) {
            return null;
          }
          return (
            <View style={styles.textContainer}>
              <Name answer={answer} key={`${index}_${answer.order}`} />
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
