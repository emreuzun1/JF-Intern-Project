import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {ISubmissionEdit} from '../../../Interfaces/SubmissionEditInterface';
import style from 'styled-components/native';
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

const StyledNameInputContainer = style.View({
  flexDirection: 'row',
  flexWrap: 'wrap',
  flex: 1,
});

const StyledNameInsideContainer = style.View({
  width: '40%',
  marginLeft: 24,
});

const StyledInput = style.TextInput({
  width: '100%',
  height: 40,
  borderWidth: 0.5,
  borderColor: 'white',
  borderRadius: 6,
  padding: 8,
  color: Colors.grey,
  marginTop: 4,
  marginLeft: 8,
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

export function NameEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = answer ? answer!.answer : {first: '', last: ''};
  const nameValidationSchema = Yup.object().shape({});

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values, true)}
      validationSchema={nameValidationSchema}>
      {({handleChange, handleBlur, values, handleSubmit, errors, touched}) => (
        <StyledContainer>
          <StyledHeader>{question.text}</StyledHeader>
          <StyledNameInputContainer>
            {Object.keys(initialValues).map(key => (
              <StyledNameInsideContainer key={key}>
                <StyledInput
                  value={values[key]}
                  onBlur={handleBlur(`${key}`)}
                  onChangeText={handleChange(`${key}`)}
                  onEndEditing={handleSubmit}
                />

                <StyledSubTitles>
                  {
                    // @ts-ignore: Unreachable code error
                    question.sublabels![key]
                  }
                </StyledSubTitles>
                {errors[key] && touched[key] ? (
                  <StyledErrorText>{errors[key]}</StyledErrorText>
                ) : null}
              </StyledNameInsideContainer>
            ))}
          </StyledNameInputContainer>
        </StyledContainer>
      )}
    </Formik>
  );
}

export default NameEdit;
