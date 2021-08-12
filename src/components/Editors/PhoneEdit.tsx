import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Formik} from 'formik';
import {SubmissionAnswerInterface} from '../../Interfaces/SubmissionAnswerInterface';

interface Props {
  answer: SubmissionAnswerInterface;
  question: any;
}

export function PhoneEdit({answer}: Props) {
  const initialValues = {phone: answer.prettyFormat};

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({handleChange, handleBlur, values}) => (
        <View style={styles.phoneInputContainer}>
          <Text style={styles.nameHeader}>Phone</Text>
          <TextInput
            style={styles.input}
            value={values.phone}
            onChange={handleChange('phone')}
            onBlur={handleBlur('phone')}
          />
          <Text style={styles.subtitles}>Please enter a valid number.</Text>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  phoneInputContainer: {
    width: '100%',
    marginLeft: 32,
    marginTop: 24,
  },
  nameHeader: {
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
