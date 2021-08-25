import React, {FC} from 'react';
import {ScrollView, ViewProps} from 'react-native';
import style from 'styled-components/native';
import Modal from 'react-native-modal';

import {FieldsFilterCard} from '../../components';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';
import {ColorInterface} from '../../Interfaces/ColorInterface';

interface Color extends ViewProps {
  color: ColorInterface;
}

const StyledModalContainer = style.ScrollView<Color>(({color}) => ({
  width: '100%',
  height: '50%',
  backgroundColor: color.main,
  position: 'absolute',
  bottom: 0,
}));

const StyledModalHeader = style.View<Color>(({color}) => ({
  width: '100%',
  backgroundColor: color.sub,
  height: 50,
  justifyContent: 'center',
}));

const StyledModalHeaderText = style.Text<Color>(({color}) => ({
  fontSize: 22,
  marginLeft: 12,
  color: color.main,
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
      <StyledModalContainer color={color}>
        <StyledModalHeader color={color}>
          <StyledModalHeaderText color={color}>Fields</StyledModalHeaderText>
        </StyledModalHeader>
        <ScrollView>
          {questions.map((question: QuestionInterface, index: number) => (
            <FieldsFilterCard
              color={color}
              question={question}
              index={index}
              key={`${index}_`}
              visibleQuestions={visibleQuestions}
            />
          ))}
        </ScrollView>
      </StyledModalContainer>
    </Modal>
  );
};

export default TitleModal;
