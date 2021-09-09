import React, {FC} from 'react';
import styled from 'styled-components/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {ViewProps} from 'react-native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../constants/Colors';
import {setOrderType} from '../redux/actions';

interface Color extends ViewProps {
  color: string;
}

const StyledOrderView = styled.View({
  flex: 1,
  backgroundColor: Colors.black,
  paddingLeft: 24,
  paddingTop: 12,
});

const StyledHeaderContainer = styled.View({
  flexDirection: 'row',
});

const StyledHeaderText = styled.Text({
  fontSize: 20,
  color: 'white',
  marginLeft: 8,
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

const StyledOrderText = styled.Text<Color>(({color}) => ({
  color: color,
  fontSize: 20,
  marginLeft: 24,
}));

interface OrderSheetProps {
  closeSheet: () => void;
}

const OrderSheet: FC<OrderSheetProps> = ({closeSheet}) => {
  const dispatch = useDispatch();
  const setType = (type: string) => {
    closeSheet();
    dispatch(setOrderType(type));
  };

  return (
    <StyledOrderView>
      <StyledHeaderContainer>
        <MaterialCommunityIcons name="sort" size={24} color="white" />
        <StyledHeaderText>Sort by </StyledHeaderText>
      </StyledHeaderContainer>
      <StyledLine />
      <StyledOrderContainer onPress={() => setType('A to Z')}>
        <MaterialCommunityIcons
          name="sort-alphabetical-ascending"
          size={24}
          color={Colors.lightPurple}
        />
        <StyledOrderText color={Colors.lightPurple}>A to Z</StyledOrderText>
      </StyledOrderContainer>
      <StyledOrderContainer onPress={() => setType('Z to A')}>
        <MaterialCommunityIcons
          name="sort-alphabetical-descending"
          size={24}
          color={Colors.lightRed}
        />
        <StyledOrderText color={Colors.lightRed}>Z to A</StyledOrderText>
      </StyledOrderContainer>
      <StyledOrderContainer onPress={() => setType('Date Created')}>
        <AntIcon name="calendar" size={20} color={Colors.lightYellow} />
        <StyledOrderText color={Colors.lightYellow}>
          Date Created
        </StyledOrderText>
      </StyledOrderContainer>
    </StyledOrderView>
  );
};

export default OrderSheet;
