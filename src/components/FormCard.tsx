import React from 'react';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import styled from 'styled-components/native';

import {Colors} from '../constants/Colors';

const {width} = Dimensions.get('screen');

const StyledFormContainer = styled.TouchableOpacity({
  display: 'flex',
  width: width / 1.2,
  margin: 12,
  flexDirection: 'row',
});

const StyledImageContainer = styled.View({
  justifyContent: 'center',
});

// @ts-ignore: Unreachable code error
const StyledImage = styled.Image(({imageColor}) => ({
  width: 36,
  height: 36,
  marginRight: 6,
  backgroundColor: imageColor,
}));

const StyledTitle = styled.Text({
  fontSize: 18,
  color: Colors.lightGrey,
});

const StyledUpdateText = styled.Text({
  fontSize: 12,
  color: Colors.lightGrey,
  marginTop: 4,
});

const StyledLine = styled.View({
  width: width / 1.2,
  borderBottomWidth: 1,
  borderColor: Colors.lightGrey,
  marginTop: 8,
});

interface IFormCard {
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
  onPress,
}) => {
  return (
    <StyledFormContainer onPress={() => onPress(color)}>
      <StyledImageContainer>
        <StyledImage
          source={require('../img/form-icon,.jpg')}
          // @ts-ignore: Unreachable code error
          imageColor={color.main}
        />
      </StyledImageContainer>
      <View>
        <StyledTitle>{title}</StyledTitle>
        <StyledUpdateText>
          {count} Submissions. Last updated at : {update_at}
        </StyledUpdateText>
        <StyledLine />
      </View>
    </StyledFormContainer>
  );
};

export default FormCard;
