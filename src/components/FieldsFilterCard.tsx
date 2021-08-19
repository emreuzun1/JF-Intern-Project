import React, {FC, useState} from 'react';
import {Switch, View} from 'react-native';
import style from 'styled-components/native';
import {useDispatch} from 'react-redux';

import {QuestionType} from '../Types/QuestionType';
import {filterQuestions} from '../redux/actions/questionsAction';
import {Colors} from '../constants/Colors';

const StyledFieldFilterContainer = style.View({
  width: '100%',
  height: 30,
  borderBottomWidth: 0.5,
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 4,
});

const StyledFieldFilterText = style.Text({
  fontSize: 15,
  fontFamily: 'sf-regular',
  marginLeft: 8,
});

interface IFieldsFilterProps {
  data: QuestionType;
  index: number;
}

const FieldsFilterCard: FC<IFieldsFilterProps> = ({data, index}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  if (index === 0) {
    return <View />;
  }

  const changeEnabled = () => {
    setIsEnabled(!isEnabled);
    dispatch(filterQuestions(data));
  };

  return (
    <StyledFieldFilterContainer>
      <StyledFieldFilterText>{data.text}</StyledFieldFilterText>
      <Switch
        trackColor={{false: Colors.jotformGrey, true: Colors.jotformOrange}}
        thumbColor={isEnabled ? Colors.jotformOrange : Colors.jotformGrey}
        value={isEnabled}
        onChange={() => changeEnabled()}
      />
    </StyledFieldFilterContainer>
  );
};

export default FieldsFilterCard;
