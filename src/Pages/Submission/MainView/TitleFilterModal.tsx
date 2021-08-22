import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import style from 'styled-components/native';
import Modal from 'react-native-modal';

import FieldsFilterCard from '../../../components/FieldsFilterCard';
import {QuestionInterface} from '../../../Interfaces/QuestionInterface';
import {ColorInterface} from '../../../Interfaces/ColorInterface';

const {height} = Dimensions.get('screen');

const StyledModalContainer = style.View(({color}) => ({
  width: '100%',
  height: height / 2,
  backgroundColor: color,
  position: 'absolute',
  bottom: 0,
}));

const StyledModalHeader = style.View(({color}) => ({
  width: '100%',
  backgroundColor: color,
  height: 50,
  justifyContent: 'center',
}));

const StyledModalHeaderText = style.Text(({color}) => ({
  fontSize: 22,
  marginLeft: 12,
  color: color,
}));

interface ITitleModalProps {
  color: ColorInterface;
  modalVisible: boolean;
  visibleQuestions: QuestionInterface[];
  questions: QuestionInterface[];
  setModalVisible: (val: boolean) => void;
}

const TitleModal: FC<ITitleModalProps> = ({
  questions,
  modalVisible,
  setModalVisible,
  visibleQuestions,
  color,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      swipeDirection="down"
      onSwipeComplete={() => setModalVisible(false)}>
      <StyledModalContainer color={color.main}>
        <StyledModalHeader color={color.sub}>
          <StyledModalHeaderText color={color.main}>
            Fields
          </StyledModalHeaderText>
        </StyledModalHeader>
        {questions.map((question: QuestionInterface, index: number) => (
          <FieldsFilterCard
            color={color}
            question={question}
            index={index}
            key={`${index}_`}
            visibleQuestions={visibleQuestions}
          />
        ))}
      </StyledModalContainer>
    </Modal>
  );
};

export default TitleModal;
