import React from 'react';
import {View, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '../constants/Colors';

const {width, height} = Dimensions.get('screen');

const StyledHeaders = styled.View({
  height: height / 20,
  width: width / 2,
  flexDirection: 'row',
  borderRightWidth: 0.15,
  borderColor: Colors.lightGrey,
  alignItems: 'center',
  padding: 8,
});

const StyledTitleText = styled.Text({
  fontSize: 14,
  marginHorizontal: 12,
  color: Colors.grey,
  fontFamily: 'sf-pro-bold',
});

interface Props {
  question: any;
  index: number;
}

const SubmissionText: React.FC<Props> = props => {
  const {question, index} = props.question;

  if (index !== 0)
    return (
      <StyledHeaders>
        <StyledTitleText numberOfLines={1}>{question.text}</StyledTitleText>
      </StyledHeaders>
    );
  else return <View />;
};

export default SubmissionText;
