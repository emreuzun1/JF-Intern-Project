import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import * as _ from 'lodash';

import {Name} from './Fields';
import {useSelector} from 'react-redux';
import {getOrderedAnswers} from '../redux/reducers/selector';
import { SubmissionAnswerInterface } from '../Interfaces/SubmissionAnswerInterface';

const {width} = Dimensions.get('screen');

interface ICard {
  item: any;
  navigation: any;
  onPress: any;
}

const Card: React.FC<ICard> = props => {
  const orderedAnswers = useSelector(getOrderedAnswers);
  const answers = orderedAnswers(props.item.id);

  return (
    <TouchableOpacity onPress={props.onPress.bind(this,answers)} style={styles.container}>
      <View>
        <Text style={styles.headerText}>{answers[0].prettyFormat}</Text>
        <View style={styles.line}></View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    height: 75,
    marginTop: 12,
    borderRadius: 8,
  },
  textContainer: {
    width: width / 3,
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
});

export default Card;
