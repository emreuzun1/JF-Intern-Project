import React, {FC} from 'react';
import style from 'styled-components/native';

const StyledAnswerText = style.Text({
  marginHorizontal: 8,
  color: 'white',
  fontSize: 14,
  fontFamily: 'sf-regular',
});

interface Props {
  answer: any;
}

const Name: FC<Props> = props => {
  return (
    <StyledAnswerText numberOfLines={1}>
      {props.answer.prettyFormat || props.answer.answer}
    </StyledAnswerText>
  );
};

export default Name;
