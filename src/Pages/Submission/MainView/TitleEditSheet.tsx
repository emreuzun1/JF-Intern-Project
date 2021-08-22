import React, {FC} from 'react';
import style from 'styled-components/native';

import {Colors} from '../../../constants/Colors';
import {QuestionInterface} from '../../../Interfaces/QuestionInterface';
import * as editors from '../../../components/Form/Editors';

interface Props {
  titles: QuestionInterface[];
}

const StyledContainer = style.View({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
  padding: 24,
});

const TitleEditSheet: FC<Props> = ({titles}) => {
  const editorsMap = new Map();
  Object.keys(editors).map(key => {
    // @ts-ignore: Unreachable code error
    editorsMap.set(key, editors[key]);
  });
  return (
    <StyledContainer>
      {titles.map((q: QuestionInterface, index: number) => {
        const Element = editorsMap.get(q.type.split('_', 2)[1]);
        if (Element) {
          return (
            <Element
              key={`${q.qid}_${index}`}
              question={q}
              onEdit={() => console.log('Here')}
            />
          );
        }
      })}
    </StyledContainer>
  );
};

export default TitleEditSheet;
