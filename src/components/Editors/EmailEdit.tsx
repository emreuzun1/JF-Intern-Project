import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Formik} from 'formik';
import {ISubmissionEdit} from '../../Interfaces/SubmissionEditInterface';

export function EmailEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = {email: answer.answer};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.email)}>
      {({handleChange, handleBlur, values, handleSubmit}) => (
        <View style={styles.container}>
          <Text style={styles.header}>Email</Text>
          <TextInput
            style={styles.input}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onEndEditing={handleSubmit}
          />
          <Text style={styles.subtitles}>example@exmple.com</Text>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: 32,
    marginTop: 24,
  },

  header: {
    fontFamily: 'sf-regular',
    color: '#ccc',
    fontSize: 20,
  },

  input: {
    width: '50%',
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: 'white',
    padding: 8,
    color: '#ccc',
    marginTop: 4,
  },

  subtitles: {
    fontFamily: 'sf-display-thin',
    fontSize: 13,
    marginTop: 4,
    color: '#c0c0c0',
  },
});
