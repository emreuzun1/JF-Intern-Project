import React, {FC} from 'react';
import {Dimensions, ViewProps} from 'react-native';
import style from 'styled-components/native';
import Modal from 'react-native-modal';

import {FieldsFilterCard} from '../../components';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';
import {Colors} from '../../constants/Colors';

const {height} = Dimensions.get('screen');

interface Color extends ViewProps {
  color: string;
}

const StyledModalContainer = style.View({
  width: '100%',
  height: height / 2,
  backgroundColor: Colors.darkBlue,
  position: 'absolute',
  bottom: 0,
  borderRadius: 12,
});

const StyledModalHeader = style.View<Color>(({color}) => ({
  width: '100%',
  height: 50,
  backgroundColor: color,
  justifyContent: 'center',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
}));

const StyledModalHeaderText = style.Text({
  fontSize: 22,
  marginLeft: 16,
  color: 'white',
  fontWeight: 500,
});

interface ITitleModalProps {
  color: string;
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
      <StyledModalContainer>
        <StyledModalHeader color={color}>
          <StyledModalHeaderText>Fields</StyledModalHeaderText>
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
