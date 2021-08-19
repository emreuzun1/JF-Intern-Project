import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import style from 'styled-components/native';
import Modal from 'react-native-modal';

import FieldsFilterCard from '../../components/FieldsFilterCard';
import {Colors} from '../../constants/Colors';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';

const {height} = Dimensions.get('screen');

const StyledModalContainer = style.View({
  width: '100%',
  height: height / 2,
  backgroundColor: Colors.lightYellow,
  position: 'absolute',
  bottom: 0,
});

const StyledModalHeader = style.View({
  width: '100%',
  backgroundColor: Colors.jotformOrange,
  height: 50,
  justifyContent: 'center',
});

const StyledModalHeaderText = style.Text({
  fontSize: 22,
  fontFamily: 'sf-pro-regular',
  marginLeft: 12,
});

interface ITitleModalProps {
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
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      swipeDirection="down"
      onSwipeComplete={() => setModalVisible(false)}>
      <StyledModalContainer>
        <StyledModalHeader>
          <StyledModalHeaderText>Fields</StyledModalHeaderText>
        </StyledModalHeader>
        {questions.map((question: QuestionInterface, index: number) => (
          <FieldsFilterCard
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
