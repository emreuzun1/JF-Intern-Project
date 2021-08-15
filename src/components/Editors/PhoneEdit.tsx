import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Formik} from 'formik';
import {ISubmissionEdit} from '../../Interfaces/SubmissionEditInterface';
import {styles} from './styles';
import * as Yup from 'yup';

const phoneValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .min(10, 'Invalid Phone')
    .max(11, 'Invalid Phone')
    .required('Required'),
});

export function PhoneEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues = {phone: answer.prettyFormat};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.phone)}
      validationSchema={phoneValidationSchema}>
      {({handleChange, handleBlur, values, handleSubmit, errors, touched}) => (
        <View style={styles.phoneInputContainer}>
          <Text style={styles.header}>Phone</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={values.phone}
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              onEndEditing={handleSubmit}
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
            />
            <Text style={styles.subtitles}>Please enter a valid number.</Text>
            {errors.phone && touched.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}
          </View>
        </View>
      )}
    </Formik>
  );
}
