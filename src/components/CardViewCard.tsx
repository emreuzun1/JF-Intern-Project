import React, {FC} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import * as fields from './Submission/Fields';
import {QuestionInterface} from '../Interfaces/QuestionInterface';
import {useSelector} from 'react-redux';
import {SubmissionInterface} from '../Interfaces/SubmissionInterface';
import {getOrderedAnswers} from '../redux/reducers/selector';
import {Colors} from '../constants/Colors';

const {height} = Dimensions.get('screen');

interface CardViewProps {
  submission: SubmissionInterface;
  questions: QuestionInterface[];
  sheetRef: any;
  selectSubmission: (id: string, answer: any) => void;
}

const CardViewCard: FC<CardViewProps> = ({
  submission,
  questions,
  sheetRef,
  selectSubmission,
}) => {
  const orderedAnswers = useSelector(getOrderedAnswers);
  const answers = orderedAnswers(submission.id);

  const handleOpen = React.useCallback(
    (id: string, answer: any) => {
      selectSubmission(id, answer);
      sheetRef.current?.present();
    },
    [selectSubmission, sheetRef],
  );

  const fieldsMap = new Map();

  Object.keys(fields).map(key => {
    // @ts-ignore: Unreachable code error
    fieldsMap.set(key, fields[key]);
  });

  if (answers.length === 0) {
    return <View />;
  }
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => handleOpen(submission.id, answers)}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {answers[0].prettyFormat || answers[0].answer}
          </Text>
        </View>
        {answers.map((answer, index) => {
          if (index === 0) {
            return null;
          }
          const Element = fieldsMap.get(answer.type.split('_', 2)[1]);
          if (Element)
            return (
              <View
                key={`${index}_${index + 1}`}
                style={styles.answerContainer}>
                <Text style={styles.titleText}>{questions[index].text}</Text>
                <Element answer={answer} />
              </View>
            );
        })}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: Colors.darkBlue,
    height: height / 4,
    margin: 20,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerContainer: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: Colors.lightGrey,
    padding: 8,
  },
  headerText: {
    fontSize: 18,
    color: Colors.lightGrey,
    marginTop: 4,
    fontWeight: '700',
  },
  titleText: {
    marginLeft: 8,
    marginBottom: 4,
    color: Colors.grey,
    fontWeight: '500',
  },

  answerContainer: {
    padding: 8,
    marginTop: 8,
  },
});

export default CardViewCard;
