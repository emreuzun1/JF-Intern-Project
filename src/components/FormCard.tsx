import React from 'react';
import styled from 'styled-components/native';
import * as icons from '../constants/FormIcon';

import {Colors} from '../constants/Colors';

const iconsArray = ['blueform', 'orangeform', 'yellowform', 'greenform'];

const StyledFormContainer = styled.TouchableOpacity({
  backgroundColor: Colors.darkBlue,
  marginHorizontal: 15,
  marginTop: 15,
  height: 62,
  flexDirection: 'row',
  borderRadius: 12,
});

const StyledImageContainer = styled.View({
  justifyContent: 'center',
});

// @ts-ignore: Unreachable code error
const StyledImage = styled.Image({
  width: 26,
  height: 32,
  marginRight: 6,
  marginLeft: 15,
});

const StyledTitleContainer = styled.View({
  margin: 12,
});

const StyledTitle = styled.Text({
  fontSize: 16,
  fontWeight: 500,
  color: 'white',
});

const StyledUpdateText = styled.Text({
  fontSize: 12,
  color: Colors.lightGrey,
  marginTop: 4,
});

interface IFormCard {
  index: number;
  title: string;
  color: string;
  update_at: string;
  count: number | string;
  onPress: (color: string) => void;
}

const FormCard: React.FC<IFormCard> = ({
  title,
  color,
  update_at,
  count,
  index,
  onPress,
}) => {
  return (
    <StyledFormContainer onPress={() => onPress(color)}>
      <StyledImageContainer>
        <StyledImage source={icons[iconsArray[index % iconsArray.length]]} />
      </StyledImageContainer>
      <StyledTitleContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledUpdateText>
          {count} Submissions. Last updated at : {update_at.split(' ')[0]}
        </StyledUpdateText>
      </StyledTitleContainer>
    </StyledFormContainer>
  );
};

export default FormCard;
