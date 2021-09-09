import React from 'react';
import {Formik} from 'formik';
import {ISubmissionEdit} from '../../../Interfaces/SubmissionEditInterface';
import * as Yup from 'yup';
import style from 'styled-components/native';
import {Colors} from '../../../constants/Colors';

const StyledContainer = style.View({
  width: '100%',
  marginTop: 24,
  marginHorizontal: 15,
});

const StyledHeader = style.Text({
  color: Colors.grey,
  fontSize: 20,
  maxWidth: '80%',
});

const StyledInputContainer = style.View({
  width: '50%',
});

const StyledInput = style.TextInput({
  width: '100%',
  height: 46,
  backgroundColor: Colors.darkBlue,
  borderRadius: 6,
  padding: 8,
  color: 'white',
  fontSize: 15,
  marginTop: 4,
});

const StyledSubTitles = style.Text({
  fontSize: 13,
  marginTop: 4,
  color: Colors.grey,
});

const StyledErrorText = style.Text({
  fontSize: 13,
  marginTop: 4,
  color: Colors.lightRed,
});

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().max(255).email('Invalid email').required('Required!'),
});

export function EmailEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = {email: answer ? answer!.answer : ''};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.email)}
      validationSchema={emailValidationSchema}>
      {({handleChange, handleBlur, values, handleSubmit, errors, touched}) => (
        <StyledContainer>
          <StyledHeader>{question.text}</StyledHeader>
          <StyledInputContainer>
            <StyledInput
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              onEndEditing={handleSubmit}
              keyboardType="email-address"
            />
            <StyledSubTitles>{question.subLabel}</StyledSubTitles>
            {errors.email && touched.email ? (
              <StyledErrorText>{errors.email}</StyledErrorText>
            ) : null}
          </StyledInputContainer>
        </StyledContainer>
      )}
    </Formik>
  );
}
