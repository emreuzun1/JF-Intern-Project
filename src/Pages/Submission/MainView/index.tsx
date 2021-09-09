import React, {FC} from 'react';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import style from 'styled-components/native';

import Loading from '../../../components/Loading';
import Titles from '../Titles';
import Answer from './Answers';
import {SubmissionPageProps} from '../../../Interfaces/SubmissionPageProps';
import {QuestionInterface} from '../../../Interfaces/QuestionInterface';
import {SubmissionInterface} from '../../../Interfaces/SubmissionInterface';
import {Colors} from '../../../constants/Colors';

const StyledContainer = style.View({
  flex: 1,
  backgroundColor: Colors.black,
});

const ViewWithSpinner = Loading(View);

interface Props {
  props: SubmissionPageProps;
  visibleQuestions: QuestionInterface[];
  orderedQuestions: QuestionInterface[];
  submissions: SubmissionInterface[];
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
  submissions,
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
    </StyledContainer>
  );
};

export default MainView;
