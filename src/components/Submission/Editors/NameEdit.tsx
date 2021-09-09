import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {ISubmissionEdit} from '../../../Interfaces/SubmissionEditInterface';
import style from 'styled-components/native';
import {Colors} from '../../../constants/Colors';

const StyledContainer = style.View({
  width: '100%',
  marginTop: 24,
  marginHorizontal: 15,
});

const StyledHeader = style.Text({
  maxWidth: '80%',
  color: Colors.grey,
  fontSize: 20,
});

const StyledNameInputContainer = style.View({
  width: '90%',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

const StyledNameInsideContainer = style.View({
  width: '45%',
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
  marginLeft: 10,
  marginTop: 4,
  color: Colors.lightRed,
});

export function NameEdit({answer, question, onPress}: ISubmissionEdit) {
  const nameValidationSchema = Yup.object().shape({});

  let initialValues: any = {};
  if (question.prefix !== 'No') initialValues.prefix = '';
  initialValues.first = '';
  if (question.middle !== 'No') initialValues.middle = '';
  initialValues.last = '';
  if (question.suffix !== 'No') initialValues.suffix = '';
  if (answer) {
    if (answer!.answer) {
      Object.keys(answer!.answer).map((key: string) => {
        // @ts-ignore: Unreachable code error
        initialValues[key] = answer!.answer[key];
      });
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values, true)}
      validationSchema={nameValidationSchema}>
      {({handleChange, handleBlur, values, handleSubmit, errors, touched}) => (
        <StyledContainer>
          <StyledHeader>{question.text}</StyledHeader>
          <StyledNameInputContainer>
            {Object.keys(initialValues).map(key => {
              return (
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
              );
            })}
          </StyledNameInputContainer>
        </StyledContainer>
      )}
    </Formik>
  );
}

export default NameEdit;
