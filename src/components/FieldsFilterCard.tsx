import React, {FC, useState} from 'react';
import {Switch, View} from 'react-native';
import style from 'styled-components/native';
import {useDispatch} from 'react-redux';

import {QuestionInterface} from '../Interfaces/QuestionInterface';
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
  question: QuestionInterface;
  visibleQuestions: QuestionInterface[];
  index: number;
}

const FieldsFilterCard: FC<IFieldsFilterProps> = ({
  question,
  index,
  visibleQuestions,
}) => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  React.useEffect(() => {
    visibleQuestions.map((q: QuestionInterface) => {
      if (q.qid === question.qid) {
        setIsEnabled(true);
      }
    });
  }, [question.qid, visibleQuestions]);

  if (index === 0) {
    return <View />;
  }

  const changeEnabled = () => {
    setIsEnabled(!isEnabled);
    dispatch(filterQuestions(question.qid, isEnabled));
  };

  return (
    <StyledFieldFilterContainer>
      <StyledFieldFilterText>{question.text}</StyledFieldFilterText>
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
