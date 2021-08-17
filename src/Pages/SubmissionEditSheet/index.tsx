import React, {FC} from 'react';
import style from 'styled-components/native';
import I from 'immutable';

import * as editors from '../../components/Editors';
import {Colors} from '../../constants/Colors';

const StyledContainer = style.ScrollView({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
});

interface Props {
  answer: any;
  questions: any;
  onPress: (qid: number, values: any, name?: boolean) => void;
}

const SubmissionEditSheet: FC<Props> = ({answer, questions, onPress}) => {
  const editorsMap = I.Map(editors); // TODO WITHOUT IMMUTABLE

  return (
    <StyledContainer>
      {questions.map((q: any, index: any) => {
        const Element = editorsMap.get(q.type.split('_', 2)[1], null);
        if (Element)
          return (
            <Element
              answer={answer[index]}
              question={q}
              onPress={onPress}
              key={`${q.qid}_${index}`}
            />
          );
      })}
    </StyledContainer>
  );
};

export default SubmissionEditSheet;
