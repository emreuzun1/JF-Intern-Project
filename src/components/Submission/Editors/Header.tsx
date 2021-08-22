import React from 'react';
import {Dimensions} from 'react-native';
import style from 'styled-components/native';
import {Formik} from 'formik';

import {Colors} from '../../../constants/Colors';
import {ITitleEdit} from '../../../Interfaces/ITitleEdit';

const {width} = Dimensions.get('screen');

const StyledHeaderContainer = style.View({
  width: '100%',
  borderBottomWidth: 0.5,
  marginBottom: 24,
});
// @ts-ignore: Unreachable code error
const StyledHeaderTextInput = style.TextInput(({textSize}) => ({
  fontSize: textSize,
  color: Colors.lightGrey,
}));

export function Header({question, onEdit}: ITitleEdit) {
  const initialValue: any = {header: question.text};
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={value => onEdit(question.qid, value)}>
      {({handleChange, values, handleSubmit, errors, touched}) => (
        <StyledHeaderContainer>
          <StyledHeaderTextInput
            // @ts-ignore: Unreachable code error
            textSize={
              question.headerType === 'Large' ? 0.07 * width : 0.05 * width
            }
            numberOfLines={1}
            value={values.header}
            onChangeText={handleChange('header')}
            onEndEditing={handleSubmit}
          />
        </StyledHeaderContainer>
      )}
    </Formik>
  );
}
