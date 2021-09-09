import React from 'react';
import style from 'styled-components/native';
import {FieldProps} from '../../../Interfaces/FieldProps';

const StyledAnswerText = style.Text({
  marginHorizontal: 8,
  color: 'white',
  fontWeight: 400,
  fontSize: 13,
});

export function Dropdown({answer}: FieldProps) {
  return (
    <StyledAnswerText numberOfLines={1}>
      {answer.prettyFormat ? answer.prettyFormat : answer.answer}
    </StyledAnswerText>
  );
}
