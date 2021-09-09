import React, {FC, useState} from 'react';
import {Switch, View} from 'react-native';
import style from 'styled-components/native';
import {useDispatch} from 'react-redux';

import {QuestionInterface} from '../Interfaces/QuestionInterface';
import {filterQuestions} from '../redux/actions/questionsAction';
import {Colors} from '../constants/Colors';

interface IText {
  isEnabled: boolean;
}

const StyledFieldFilterContainer = style.View({
  width: '100%',
  height: 50,
  borderBottomWidth: 1,
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 4,
});

const StyledFieldFilterText = style.Text<IText>(({isEnabled}) => ({
  fontSize: 16,
  marginLeft: 14,
  maxWidth: '80%',
  color: isEnabled ? 'white' : Colors.grey,
}));

interface IFieldsFilterProps {
  question: QuestionInterface;
  visibleQuestions: QuestionInterface[];
  index: number;
  color: string;
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
      <StyledFieldFilterText isEnabled={isEnabled}>
        {question.text}
      </StyledFieldFilterText>
      <Switch
        trackColor={{false: Colors.black, true: Colors.green}}
        thumbColor={isEnabled ? 'white' : Colors.grey}
        value={isEnabled}
        onChange={() => changeEnabled()}
        ios_backgroundColor={Colors.black}
      />
    </StyledFieldFilterContainer>
  );
};

export default FieldsFilterCard;
