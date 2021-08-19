import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {ISubmissionEdit} from '../../Interfaces/SubmissionEditInterface';
import style from 'styled-components/native';
import {Colors} from '../../constants/Colors';

const StyledContainer = style.View({
  width: '100%',
  marginTop: 24,
  marginLeft: 32,
});

const StyledHeader = style.Text({
  fontFamily: 'sf-pro-heavy',
  color: Colors.grey,
  fontSize: 20,
});

const StyledInput = style.TextInput({
  width: '80%',
  height: 150,
  maxHeight: '70%',
  borderWidth: 0.5,
  borderColor: 'white',
  borderRadius: 6,
  padding: 8,
  color: Colors.grey,
  marginTop: 4,
});

export function TextBoxEdit({answer, question, onPress}: ISubmissionEdit) {
  const initialValues: any = {textbox: answer!.answer};

  const nameValidationSchema = Yup.object().shape({});

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => onPress(question.qid, values.textbox)}
      validationSchema={nameValidationSchema}>
      {({handleChange, values, handleSubmit}) => (
        <StyledContainer>
          <StyledHeader>{question.text}</StyledHeader>
          <StyledInput
            underlineColorAndroid="transparent"
            multiline={true}
            value={values.textbox}
            onChangeText={handleChange('textbox')}
            onEndEditing={handleSubmit}
          />
        </StyledContainer>
      )}
    </Formik>
  );
}

export default TextBoxEdit;
