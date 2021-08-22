import React from 'react';
import {View, Dimensions} from 'react-native';
import styled from 'styled-components/native';

import * as fields from './Submission/Fields';
import {useSelector} from 'react-redux';
import {getOrderedAnswers} from '../redux/reducers/selector';
import {Colors} from '../constants/Colors';

const {width} = Dimensions.get('screen');

const StyledContainerButton = styled.TouchableOpacity({
  backgroundColor: Colors.darkerGrey,
  height: 75,
  marginTop: 12,
  borderRadius: 8,
});

const StyledHeaderText = styled.Text({
  fontSize: 14,
  color: Colors.lightGrey,
  marginTop: 8,
  marginLeft: 8,
});

const StyledLine = styled.View({
  width: '100%',
  borderBottomWidth: 0.5,
  borderColor: Colors.lightGrey,
  marginTop: 8,
});

const StyledAnswerContainer = styled.View({
  flexDirection: 'row',
  margin: 0,
});

const StyledTextContainer = styled.View({
  width: width / 2,
  height: '80%',
  borderRightWidth: 0.3,
  borderColor: Colors.lightGrey,
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
      <View>
        <StyledHeaderText>
          {answers[0].prettyFormat
            ? answers[0].prettyFormat
            : answers[0].answer}
        </StyledHeaderText>
        <StyledLine />
      </View>
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
