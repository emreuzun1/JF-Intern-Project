import React, {FC} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import style from 'styled-components/native';

import * as editors from '../../components/Submission/Editors';
import {Colors} from '../../constants/Colors';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';
import {SubmissionAnswerInterface} from '../../Interfaces/SubmissionAnswerInterface';

const StyledScreen = style.SafeAreaView({
  flex: 1,
  backgroundColor: Colors.black,
  paddingBottom: 24,
});

const StyledContainer = style.ScrollView({
  display: 'flex',
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
    <StyledScreen>
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
      </StyledContainer>
      {answer ? (
        <View style={styles.deleteButton}>
          <StyledSubmitButton
            color="white"
            title="Delete"
            onPress={() => deleteAlert()}
          />
        </View>
      ) : (
        <View style={styles.button}>
          <StyledSubmitButton
            color="white"
            title="Submit"
            onPress={() => submitPost(valuesMap)}
          />
        </View>
      )}
    </StyledScreen>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: Colors.lightRed,
    borderRadius: 4,
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  button: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: Colors.green,
    borderRadius: 4,
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});

export default SubmissionEditSheet;
