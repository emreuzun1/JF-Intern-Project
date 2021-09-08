import React, {FC} from 'react';
import styled from 'styled-components/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {ViewProps} from 'react-native';
import {useDispatch} from 'react-redux';
import {Colors} from '../constants/Colors';
import {setOrderType} from '../redux/actions';

interface Color extends ViewProps {
  color: string;
}

const StyledOrderView = styled.View({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
  paddingLeft: 24,
  paddingTop: 12,
});

const StyledHeaderText = styled.Text({
  fontSize: 20,
  color: Colors.lightGrey,
});

const StyledLine = styled.View({
  borderBottomWidth: 1,
  width: '90%',
  borderColor: Colors.grey,
  marginTop: 12,
});

const StyledOrderContainer = styled.TouchableOpacity({
  flexDirection: 'row',
  marginTop: 24,
});

const StyledLogoContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 24,
});

const StyledLogoText = styled.Text<Color>(({color}) => ({
  color: color,
  fontSize: 14,
}));

const StyledOrderText = styled.Text<Color>(({color}) => ({
  color: color,
  fontSize: 20,
}));

const OrderSheet: FC = () => {
  const dispatch = useDispatch();
  const setType = (type: string) => {
    dispatch(setOrderType(type));
  };

  return (
    <StyledOrderView>
      <StyledHeaderText>Sort by </StyledHeaderText>
      <StyledLine />
      <StyledOrderContainer onPress={() => setType('A to Z')}>
        <StyledLogoContainer>
          <StyledLogoText color={Colors.lightPurple}>A</StyledLogoText>
          <AntIcon name="caretright" size={10} color={Colors.lightPurple} />
          <StyledLogoText color={Colors.lightPurple}>Z</StyledLogoText>
        </StyledLogoContainer>
        <StyledOrderText color={Colors.lightPurple}>A to Z</StyledOrderText>
      </StyledOrderContainer>
      <StyledOrderContainer onPress={() => setType('Z to A')}>
        <StyledLogoContainer>
          <StyledLogoText color={Colors.lightRed}>Z</StyledLogoText>
          <AntIcon name="caretright" size={10} color={Colors.lightRed} />
          <StyledLogoText color={Colors.lightRed}>A</StyledLogoText>
        </StyledLogoContainer>
        <StyledOrderText color={Colors.lightRed}>Z to A</StyledOrderText>
      </StyledOrderContainer>
      <StyledOrderContainer onPress={() => setType('Date Created')}>
        <StyledLogoContainer>
          <AntIcon name="calendar" size={20} color={Colors.lightYellow} />
        </StyledLogoContainer>
        <StyledOrderText color={Colors.lightYellow}>
          Date Created
        </StyledOrderText>
      </StyledOrderContainer>
    </StyledOrderView>
  );
};

export default OrderSheet;
