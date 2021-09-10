import React from 'react';
import {View, Dimensions} from 'react-native';
import styled from 'styled-components/native';

import * as fields from './Submission/Fields';
import {useSelector} from 'react-redux';
import {getOrderedAnswers} from '../redux/reducers/selector';
import {Colors} from '../constants/Colors';

const {width} = Dimensions.get('screen');

const StyledContainerButton = styled.TouchableOpacity({
  backgroundColor: Colors.darkBlue,
  height: 93,
  marginTop: 12,
  marginHorizontal: 15,
  borderRadius: 12,
});

const StyledHeaderContainer = styled.View({
  width: '100%',
  height: 46,
  borderBottomWidth: 1,
  justifyContent: 'center',
});

const StyledHeaderText = styled.Text({
  fontSize: 16,
  color: Colors.lightGrey,
  marginTop: 8,
  fontWeight: 700,
  marginLeft: 14,
});

const StyledAnswerContainer = styled.View({
  flexDirection: 'row',
  margin: 0,
});

const StyledTextContainer = styled.View({
  width: width / 2,
  height: 48,
  borderRightWidth: 1,
  borderColor: Colors.black,
  justifyContent: 'center',
  padding: 6,
});

interface ICard {
  item: any;
  navigation: any;
  onPress: any;
}

const Card: React.FC<ICard> = props => {
  const orderedAnswers = useSelector(getOrderedAnswers);
  const answers = orderedAnswers(props.item.item.id);

  const fieldsMap = new Map();

  Object.keys(fields).map(key => {
    // @ts-ignore: Unreachable code error
    fieldsMap.set(key, fields[key]);
  });

  if (answers.length === 0) {
    return <View />;
  }

  return (
    <StyledContainerButton
      onPress={props.onPress.bind(this, props.item.item.id, answers)}>
      <StyledHeaderContainer>
        <StyledHeaderText>
          {answers[0].prettyFormat
            ? answers[0].prettyFormat
            : answers[0].answer}
        </StyledHeaderText>
      </StyledHeaderContainer>
      <StyledAnswerContainer>
        {answers.map((answer, index) => {
          if (index === 0) {
            return null;
          }
          const Element = fieldsMap.get(answer.type.split('_', 2)[1]);
          if (Element)
            return (
              <StyledTextContainer key={`${index}_${index + 1}`}>
                <Element answer={answer} />
              </StyledTextContainer>
            );
        })}
      </StyledAnswerContainer>
    </StyledContainerButton>
  );
};

export default Card;
