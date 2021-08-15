import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {Formik} from 'formik';
import {ISubmissionEdit} from '../../Interfaces/SubmissionEditInterface';
import * as Yup from 'yup';
import {styles} from './styles';

const nameValidationSchema = Yup.object().shape({
  first: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export function NameEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = answer.answer;

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: any) => onPress(question.qid, values, true)}
        validationSchema={nameValidationSchema}>
        {({
          handleChange,
          handleBlur,
          values,
          handleSubmit,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <Text style={styles.header}>Name</Text>
            <View style={styles.nameInputContainer}>
              <View style={styles.nameInsideContainer}>
                <TextInput
                  style={styles.input}
                  value={values.first}
                  onBlur={handleBlur('first')}
                  onChangeText={handleChange('first')}
                  onEndEditing={handleSubmit}
                />
                <Text style={styles.subtitles}>First Name</Text>
                {errors.first && touched.first ? (
                  <Text style={styles.errorText}>{errors.first}</Text>
                ) : null}
              </View>
              <View style={styles.nameInsideContainer}>
                <TextInput
                  style={styles.input}
                  value={values.last}
                  onBlur={handleBlur('last')}
                  onChangeText={handleChange('last')}
                  onEndEditing={handleSubmit}
                />
                <Text style={styles.subtitles}>Last Name</Text>
                {errors.last && touched.last ? (
                  <Text style={styles.errorText}>{errors.last}</Text>
                ) : null}
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default NameEdit;
