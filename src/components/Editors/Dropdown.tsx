import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {SubmissionAnswerInterface} from '../../Interfaces/SubmissionAnswerInterface';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  answer: SubmissionAnswerInterface;
  question: any;
}

export function Dropdown({answer, question}: Props) {
  const initialValues: any = {choice: answer.answer};
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({});
