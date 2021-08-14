import React, {FC} from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import I from 'immutable';

import {RootStackParamList} from '../../Navigation/types';
import * as editors from '../../components/Editors';
import {styles} from './style';

type SubmissionEditProps = StackNavigationProp<RootStackParamList, 'Edit'>;
type SubmissionEditRootProp = RouteProp<RootStackParamList, 'Edit'>;

interface Props {
  answer: any;
  questions: any;
  onPress: (qid: number) => void;
}

const SubmissionEditPage: FC<Props> = ({answer, questions, onPress}) => {
  const editorsMap = I.Map(editors); // TODO WITHOUT IMMUTABLE

  return (
    <View style={styles.screen}>
      {questions.map((q: any, index: any) => {
        const Element = editorsMap.get(q.type.split('_', 2)[1], null);
        if (Element)
          return (
            <Element
              answer={answer[index]}
              question={q}
              onPress={onPress}
              key={`${q.id}_${index}`}
            />
          );
      })}
    </View>
  );
};

export default SubmissionEditPage;
