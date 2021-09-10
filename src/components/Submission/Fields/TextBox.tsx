import React from 'react';
import style from 'styled-components/native';
import {Colors} from '../../../constants/Colors';
import {FieldProps} from '../../../Interfaces/FieldProps';

const StyledAnswerText = style.Text({
  marginHorizontal: 8,
  color: Colors.grey,
  fontWeight: 400,
  fontSize: 13,
});

export function TextBox({answer}: FieldProps) {
  return (
    <StyledAnswerText numberOfLines={1}>
      {answer.prettyFormat ? answer.prettyFormat : answer.answer}
    </StyledAnswerText>
  );
}
