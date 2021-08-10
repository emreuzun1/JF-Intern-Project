import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Formik} from 'formik';

interface Props {
  answer: any;
}

export function NameEdit({answer}: Props) {

  const initialValues: any = {
    first: answer.answer.first,
    last: answer.answer.last,
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              value={values.first}
              onBlur={handleBlur('first')}
              onChangeText={handleChange('first')}
            />
            <TextInput
              style={styles.input}
              value={values.last}
              onBlur={handleBlur('last')}
              onChangeText={handleChange('last')}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 6,
    padding: 8,
    color: '#ccc',
  },
});

export default NameEdit;
