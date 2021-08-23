import React, {FC} from 'react';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import style from 'styled-components/native';

import Loading from '../../../components/Loading';
import Titles from './Titles';
import Answer from './Answers';
import TitleModal from './TitleFilterModal';
import {SubmissionPageProps} from '../../../Interfaces/SubmissionPageProps';
import {QuestionInterface} from '../../../Interfaces/QuestionInterface';
import {SubmissionInterface} from '../../../Interfaces/SubmissionInterface';
import {ColorInterface} from '../../../Interfaces/ColorInterface';
import {Colors} from '../../../constants/Colors';

const StyledContainer = style.View({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
});

const ViewWithSpinner = Loading(View);

interface Props {
  props: SubmissionPageProps;
  visibleQuestions: QuestionInterface[];
  orderedQuestions: QuestionInterface[];
  submissions: SubmissionInterface[];
  color: ColorInterface;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  sheetRef: any;
  refreshing: boolean;
  selectSubmission: (id: string, answer: any) => void;
  onRefresh: () => void;
}

const MainView: FC<Props> = ({
  props: {navigation, loading},
  visibleQuestions,
  color,
  orderedQuestions,
  submissions,
  modalVisible,
  setModalVisible,
  sheetRef,
  refreshing,
  selectSubmission,
  onRefresh,
}) => {
  const emptyData = [] as any;
  const renderNullItem = () => null;

  const ListHeaderComponent = () => (
    <ViewWithSpinner isLoading={loading}>
      <Titles questionData={visibleQuestions} />
    </ViewWithSpinner>
  );

  const ListFooterComponent = () => (
    <Answer
      submissions={submissions}
      navigation={navigation}
      sheetModalRef={sheetRef}
      selectSubmission={selectSubmission}
    />
  );
  return (
    <StyledContainer>
      <TitleModal
        color={color}
        visibleQuestions={visibleQuestions}
        questions={orderedQuestions}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView horizontal>
        <FlatList
          data={emptyData}
          renderItem={renderNullItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          stickyHeaderIndices={[0]}
        />
      </ScrollView>
      <ActionButton
        buttonColor={Colors.lightBlue}
        onPress={() => sheetRef.current?.present()}
      />
    </StyledContainer>
  );
};

export default MainView;
