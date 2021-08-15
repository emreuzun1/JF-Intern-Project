import React, {FC} from 'react';
import {View} from 'react-native';
import I from 'immutable';

import * as editors from '../../components/Editors';
import {styles} from './style';

interface Props {
  answer: any;
  questions: any;
  onPress: (qid: number, values: any, name?: boolean) => void;
}

const SubmissionEditSheet: FC<Props> = ({answer, questions, onPress}) => {
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

export default SubmissionEditSheet;
