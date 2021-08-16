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

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().max(255).email('Invalid email').required('Required!'),
});

export function EmailEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = {email: answer.answer};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.email)}
      validationSchema={emailValidationSchema}>
      {({handleChange, handleBlur, values, handleSubmit, errors, touched}) => (
        <StyledContainer>
          <StyledHeader>Email</StyledHeader>
          <StyledInputContainer>
            <StyledInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              onEndEditing={handleSubmit}
              keyboardType="email-address"
            />
            <StyledSubTitles>example@example.com</StyledSubTitles>
            {errors.email && touched.email ? (
              <StyledErrorText>{errors.email}</StyledErrorText>
            ) : null}
          </StyledInputContainer>
        </StyledContainer>
      )}
    </Formik>
  );
}
