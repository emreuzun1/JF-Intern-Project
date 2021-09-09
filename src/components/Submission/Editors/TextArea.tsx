import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {ISubmissionEdit} from '../../../Interfaces/SubmissionEditInterface';
import style from 'styled-components/native';
import {Colors} from '../../../constants/Colors';

const StyledContainer = style.View({
  marginTop: 24,
  marginHorizontal: 15,
});

const StyledHeader = style.Text({
  color: Colors.grey,
  fontSize: 20,
});

const StyledInput = style.TextInput({
  width: '100%',
  height: 100,
  backgroundColor: Colors.darkBlue,
  borderRadius: 6,
  padding: 8,
  color: 'white',
  fontSize: 15,
  marginTop: 4,
  alignSelf: 'flex-start',
});

export function TextAreaEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = {textarea: answer ? answer!.answer : ''};

  const nameValidationSchema = Yup.object().shape({});

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.textarea)}
      validationSchema={nameValidationSchema}>
      {({handleChange, values, handleSubmit}) => (
        <StyledContainer>
          <StyledHeader>{question.text}</StyledHeader>
          <StyledInput
            underlineColorAndroid="transparent"
            multiline={true}
            value={values.textarea}
            onChangeText={handleChange('textarea')}
            onEndEditing={handleSubmit}
          />
        </StyledContainer>
      )}
    </Formik>
  );
}

export default TextAreaEdit;
