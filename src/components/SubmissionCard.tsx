import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Name} from './Fields';
import {useSelector} from 'react-redux';
import {getOrderedAnswers} from '../redux/reducers/selector';
import {styles} from '../Pages/Submission/style';
import {postSubmission} from '../redux/actions/submissionsAction';

interface ICard {
  item: any;
  navigation: any;
  onPress: any;
}

const Card: React.FC<ICard> = props => {
  const orderedAnswers = useSelector(getOrderedAnswers);
  const answers = orderedAnswers(props.item.item.id);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      postSubmission('85d3a1500fabf66c0c9199c4b6793298', '5042341785021116127'),
    );
  }, []);

  if (answers.length === 0) {
    return <View />;
  }

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
            <View style={styles.textContainer} key={`${index}_${answer.order}`}>
              <Name answer={answer} />
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
