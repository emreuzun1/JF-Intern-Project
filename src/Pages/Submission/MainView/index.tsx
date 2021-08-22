import React, {FC, useMemo, useRef} from 'react';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';

import Loading from '../../../components/Loading';
import Titles from './Titles';
import Answer from './Answers';
import TitleModal from './TitleFilterModal';
import {SubmissionPageProps} from '../../../Interfaces/SubmissionPageProps';
import {QuestionInterface} from '../../../Interfaces/QuestionInterface';
import {SubmissionInterface} from '../../../Interfaces/SubmissionInterface';
import {ColorInterface} from '../../../Interfaces/ColorInterface';
import ActionButton from 'react-native-action-button';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import SubmissionEditSheet from '../SubmissionEditSheet';
import {Colors} from '../../../constants/Colors';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ViewWithSpinner = Loading(View);

interface Props {
  props: SubmissionPageProps;
  visibleQuestions: QuestionInterface[];
  orderedQuestions: QuestionInterface[];
  submissions: SubmissionInterface[];
  color: ColorInterface;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const MainView: FC<Props> = ({
  props: {
    navigation,
    route,
    getSubmissions,
    requestQuestions,
    selectSubmission,
    editSubmission,
    postNewSubmission,
    resetQuestions,
    resetSelectedSubmission,
    deleteSubmission,
    selectedSubmission,
    appKey,
    loading,
  },
  visibleQuestions,
  color,
  orderedQuestions,
  submissions,
  modalVisible,
  setModalVisible,
}) => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const emptyData = [] as any;
  const renderNullItem = () => null;
  const submissionEditSheetModal = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['0%', '50%', '95%'], []);

  const onRefresh = React.useCallback(() => {
    submissionEditSheetModal.current?.close();
    resetQuestions();
    resetSelectedSubmission();
    getSubmissions(appKey, route.params.id);
    requestQuestions(appKey, route.params.id);
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSheetChanges = React.useCallback(
    (index: number) => {
      if (index === -1) {
        onRefresh();
      }
    },
    [onRefresh],
  );

  const ListHeaderComponent = () => (
    <ViewWithSpinner isLoading={loading}>
      <Titles questionData={visibleQuestions} />
    </ViewWithSpinner>
  );

  const ListFooterComponent = () => (
    <Answer
      submissions={submissions}
      navigation={navigation}
      sheetModalRef={submissionEditSheetModal}
      selectSubmission={selectSubmission}
    />
  );
  return (
    <View>
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
        onPress={() => submissionEditSheetModal.current?.present()}
      />
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={submissionEditSheetModal}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <SubmissionEditSheet
            answer={selectedSubmission ? selectedSubmission.submission : null}
            questions={orderedQuestions}
            editPost={(qid, values, name) =>
              editSubmission(appKey, selectedSubmission.id, qid, values, name)
            }
            submitPost={values => {
              postNewSubmission(appKey, route.params.id, values);
              onRefresh();
            }}
            deletePost={() => {
              deleteSubmission(appKey, selectedSubmission.id);
              onRefresh();
            }}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default MainView;
