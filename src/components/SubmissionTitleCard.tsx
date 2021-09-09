import React from 'react';
import {View, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '../constants/Colors';
import {QuestionInterface} from '../Interfaces/QuestionInterface';
import {getImage} from '../img';

const {width, height} = Dimensions.get('screen');

const StyledHeaders = styled.View({
  height: height / 20,
  width: width / 2,
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: 4,
  paddingLeft: 12,
});

const StyledTitleText = styled.Text({
  fontSize: 14,
  marginHorizontal: 12,
  color: Colors.grey,
});

interface Props {
  question: QuestionInterface;
  index: number;
}

const SubmissionText: React.FC<Props> = ({question, index}) => {
  if (index !== 0)
    return (
      <StyledHeaders>
        {getImage(question.type)}
        <StyledTitleText numberOfLines={1}>{question.text}</StyledTitleText>
      </StyledHeaders>
    );
  else return <View />;
};

export default SubmissionText;
