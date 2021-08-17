import React from 'react';
import style from 'styled-components/native';
import {FieldProps} from '../../Interfaces/FieldProps';

const StyledAnswerText = style.Text({
  marginHorizontal: 8,
  color: 'white',
  fontSize: 14,
  fontFamily: 'sf-regular',
});

export function TextBox({answer}: FieldProps) {
  return (
    <StyledAnswerText numberOfLines={1}>
      {answer.prettyFormat ? answer.prettyFormat : answer.answer}
    </StyledAnswerText>
  );
}
