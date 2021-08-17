import React, {FC} from 'react';
import style from 'styled-components/native';

const StyledAnswerText = style.Text({
  marginHorizontal: 8,
  color: 'white',
  fontSize: 14,
  fontFamily: 'sf-regular',
});

const EmptyView = style.View({});

interface Props {
  answer: any;
}

const Name: FC<Props> = ({answer}) => {
  if (answer) {
    return (
      <StyledAnswerText numberOfLines={1}>
        {answer.prettyFormat ? answer.prettyFormat : answer.answer}
      </StyledAnswerText>
    );
  } else {
    return <EmptyView />;
  }
};

export default Name;
