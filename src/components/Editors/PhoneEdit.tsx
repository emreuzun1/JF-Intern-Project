import React from 'react';
import {Formik} from 'formik';
import {ISubmissionEdit} from '../../Interfaces/SubmissionEditInterface';
import * as Yup from 'yup';
import style from 'styled-components/native';
import {Colors} from '../../constants/Colors';

const StyledContainer = style.View({
  width: '100%',
  marginTop: 24,
});

const StyledHeader = style.Text({
  marginLeft: 32,
  fontFamily: 'sf-pro-heavy',
  color: Colors.grey,
  fontSize: 20,
});

const StyledInputContainer = style.View({
  width: '50%',
  marginLeft: 24,
});

const StyledInput = style.TextInput({
  width: '100%',
  borderWidth: 0.5,
  borderColor: 'white',
  borderRadius: 6,
  padding: 8,
  color: Colors.grey,
  marginTop: 4,
  marginLeft: 8,
});

const StyledSubTitles = style.Text({
  fontFamily: 'sf-regular',
  fontSize: 13,
  marginLeft: 10,
  marginTop: 4,
  color: Colors.lightGrey,
});

const StyledErrorText = style.Text({
  fontFamily: 'sf-regular',
  fontSize: 13,
  marginLeft: 10,
  marginTop: 4,
  color: Colors.lightRed,
});

const phoneValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .min(0, 'Too Short!')
    .max(255, 'Too Long')
    .required('Required'),
});

export function PhoneEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = {phone: answer.prettyFormat};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.phone)}
      validationSchema={phoneValidationSchema}>
      {({handleChange, handleBlur, values, handleSubmit, errors, touched}) => (
        <StyledContainer>
          <StyledHeader>Phone</StyledHeader>
          <StyledInputContainer>
            <StyledInput
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              onEndEditing={handleSubmit}
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
            />
            <StyledSubTitles>Please enter a valid number.</StyledSubTitles>
            {errors.phone && touched.phone ? (
              <StyledErrorText>{errors.phone}</StyledErrorText>
            ) : null}
          </StyledInputContainer>
        </StyledContainer>
      )}
    </Formik>
  );
}
