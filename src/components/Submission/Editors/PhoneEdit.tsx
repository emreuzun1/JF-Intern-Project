import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputMask from 'react-native-text-input-mask';
import {StyleSheet} from 'react-native';

import style from 'styled-components/native';
import {ISubmissionEdit} from '../../../Interfaces/SubmissionEditInterface';
import {Colors} from '../../../constants/Colors';

const StyledContainer = style.View({
  width: '100%',
  marginTop: 24,
});

const StyledHeader = style.Text({
  marginLeft: 32,
  color: Colors.grey,
  fontSize: 20,
});

const StyledInputContainer = style.View({
  width: '50%',
  marginLeft: 24,
});

const StyledSubTitles = style.Text({
  fontSize: 13,
  marginLeft: 10,
  marginTop: 4,
  color: Colors.lightGrey,
});

const StyledErrorText = style.Text({
  fontSize: 13,
  marginLeft: 10,
  marginTop: 4,
  color: Colors.lightRed,
});

const phoneValidationSchema = Yup.object().shape({
  phone: Yup.string().min(14, 'Too Short!').required('Required'),
});

export function PhoneEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = {
    phone: answer ? answer!.answer : '',
  };
  console.log(answer);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.phone)}
      validationSchema={phoneValidationSchema}>
      {({handleChange, handleBlur, values, handleSubmit, errors, touched}) => (
        <StyledContainer>
          <StyledHeader>{question.text}</StyledHeader>
          <StyledInputContainer>
            <TextInputMask
              style={styles.textInputMask}
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              onEndEditing={handleSubmit}
              keyboardType="number-pad"
              mask={'([000]) [000]-[00][00]'}
            />
            <StyledSubTitles>
              {
                // @ts-ignore: Unreachable code error
                question.sublabels!.masked
              }
            </StyledSubTitles>
            {errors.phone && touched.phone ? (
              <StyledErrorText>{errors.phone}</StyledErrorText>
            ) : null}
          </StyledInputContainer>
        </StyledContainer>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  textInputMask: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 6,
    padding: 8,
    color: Colors.grey,
    marginTop: 4,
    marginLeft: 8,
  },
});
