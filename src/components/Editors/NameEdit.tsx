import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {Formik} from 'formik';
import {ISubmissionEdit} from '../../Interfaces/SubmissionEditInterface';

export function NameEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = answer.answer;

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: any) => onPress(question.qid, values, true)}>
        {({handleChange, handleBlur, values, handleSubmit}) => (
          <View style={styles.container}>
            <Text style={styles.header}>Name</Text>
            <View style={styles.nameInputContainer}>
              <View style={styles.insideContainer}>
                <TextInput
                  style={styles.input}
                  value={values.first}
                  onBlur={handleBlur('first')}
                  onChangeText={handleChange('first')}
                  onEndEditing={handleSubmit}
                />
                <Text style={styles.subtitles}>First Name</Text>
              </View>
              <View style={styles.insideContainer}>
                <TextInput
                  style={styles.input}
                  value={values.last}
                  onBlur={handleBlur('last')}
                  onChangeText={handleChange('last')}
                  onEndEditing={handleSubmit}
                />
                <Text style={styles.subtitles}>Last Name</Text>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
  },

  nameInputContainer: {
    flexDirection: 'row',
  },

  header: {
    marginLeft: 32,
    fontFamily: 'sf-regular',
    color: '#ccc',
    fontSize: 20,
  },

  insideContainer: {
    width: '40%',
    marginLeft: 24,
  },

  input: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 6,
    padding: 8,
    color: '#ccc',
    marginTop: 4,
    marginLeft: 8,
  },

  subtitles: {
    fontFamily: 'sf-display-thin',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 4,
    color: '#c0c0c0',
  },
});

export default NameEdit;
