import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {SubmissionAnswerInterface} from '../../Interfaces/SubmissionAnswerInterface';

interface Props {
  answer: SubmissionAnswerInterface;
  question: any;
}

export function Dropdown({answer}: Props) {
  const initialValues: any = {choice: answer.answer};

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={() => {}} />
    </View>
  );
}
