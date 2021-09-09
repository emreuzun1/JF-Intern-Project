import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import styled from 'styled-components/native';
import {ISubmissionEdit} from '../../../Interfaces/SubmissionEditInterface';
import {Colors} from '../../../constants/Colors';

const StyledView = styled.View({
  width: '100%',
  marginTop: 24,
  marginHorizontal: 15,
});

const StyledHeaderText = styled.Text({
  maxWidth: '80%',
  color: Colors.grey,
  fontSize: 20,
});

const StyledRadioContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const StyledRadioText = styled.Text({
  color: Colors.lightGrey,
});

export function SingleChoice({answer, question, onPress}: ISubmissionEdit) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(answer?.answer!);
  const radioOptions = question.options!.split('|');
  return (
    <StyledView>
      <StyledHeaderText>{question.text}</StyledHeaderText>
      <RadioButton.Group
        onValueChange={value => {
          onPress(question.qid, value);
          setSelectedAnswer(value);
        }}
        value={selectedAnswer}>
        {radioOptions?.map((key: string) => {
          return (
            <StyledRadioContainer key={key}>
              <StyledRadioText>{key}</StyledRadioText>
              <RadioButton value={key} />
            </StyledRadioContainer>
          );
        })}
      </RadioButton.Group>
    </StyledView>
  );
}
