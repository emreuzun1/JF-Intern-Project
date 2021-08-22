import React, {FC} from 'react';
import {Alert} from 'react-native';
import style from 'styled-components/native';

import * as editors from '../../components/Submission/Editors';
import {Colors} from '../../constants/Colors';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';
import {SubmissionAnswerInterface} from '../../Interfaces/SubmissionAnswerInterface';

const StyledContainer = style.ScrollView({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
});

const StyledSubmitButtonContainer = style.View({
  width: '100%',
  alignItems: 'center',
});
const StyledSubmitButton = style.Button({
  width: 100,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
});

interface Props {
  answer: any;
  questions: QuestionInterface[];
  editPost: (qid: number, values: any, name?: boolean) => void;
  submitPost: (values: any) => void;
  deletePost: () => void;
}

const SubmissionEditSheet: FC<Props> = ({
  answer,
  questions,
  editPost,
  submitPost,
  deletePost,
}) => {
  const newEditorsMap = new Map();
  Object.keys(editors).map(key => {
    // @ts-ignore: Unreachable code error
    newEditorsMap.set(key, editors[key]);
  });
  let valuesMap = new Map();

  const deleteAlert = () => {
    Alert.alert(
      'Are you sure?',
      'Do you really want to delete this submission?',
      [
        {
          text: 'YES',
          onPress: () => deletePost(),
          style: 'destructive',
        },
        {
          text: 'NO',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <StyledContainer>
      {questions.map((q: QuestionInterface, index: number) => {
        const Element = newEditorsMap.get(q.type.split('_', 2)[1]);

        if (Element) {
          return (
            <Element
              answer={answer ? answer[index] : null}
              question={q}
              onPress={(
                qid: number,
                values: SubmissionAnswerInterface,
                name?: boolean | undefined,
              ) => {
                answer
                  ? editPost(qid, values, name)
                  : valuesMap.set(qid, values);
              }}
              key={`${q.qid}_${index}`}
            />
          );
        }
      })}
      {answer ? (
        <StyledSubmitButtonContainer>
          <StyledSubmitButton
            color={Colors.lightRed}
            title="Delete Submission"
            onPress={deleteAlert}
          />
        </StyledSubmitButtonContainer>
      ) : (
        <StyledSubmitButtonContainer>
          <StyledSubmitButton
            color={Colors.jotformOrange}
            title="Submit"
            onPress={() => submitPost(valuesMap)}
          />
        </StyledSubmitButtonContainer>
      )}
    </StyledContainer>
  );
};

export default SubmissionEditSheet;
