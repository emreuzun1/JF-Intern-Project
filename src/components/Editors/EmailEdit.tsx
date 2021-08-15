import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Formik} from 'formik';
import {ISubmissionEdit} from '../../Interfaces/SubmissionEditInterface';
import * as Yup from 'yup';
import {styles} from './styles';

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required!'),
});

export function EmailEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = {email: answer.answer};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.email)}
      validationSchema={emailValidationSchema}>
      {({handleChange, handleBlur, values, handleSubmit, errors, touched}) => (
        <View style={styles.container}>
          <Text style={styles.header}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              onEndEditing={handleSubmit}
              keyboardType="email-address"
            />
            <Text style={styles.subtitles}>example@exmple.com</Text>
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
        </View>
      )}
    </Formik>
  );
}
