import React, {FC, useEffect, useMemo, useRef} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useSelector, connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

import {RootStackParamList} from '../../Navigation/types';
import {
  requestQuestions,
  resetQuestions,
  getSubmissions,
  selectSubmission,
  editSubmission,
  postNewSubmission,
  deleteSubmission,
  resetSubmissions,
  resetSelectedSubmission,
} from '../../redux/actions';
import {IState} from '../../Interfaces/actionInterface';
import {
  getActiveSubmissions,
  getOrderedQuestions,
  getVisibleQuestions,
} from '../../redux/reducers/selector';

import Loading from '../../components/Loading';
import SubmissionEditSheet from './SubmissionEditSheet';
import {Colors} from '../../constants/Colors';
import {FlatList} from 'react-native';
import Titles from './Titles';
import Answer from './Answers';
import TitleModal from './TitleFilterModal';
import {SubmissionInterface} from '../../Interfaces/SubmissionInterface';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';

const StyledScreenContainer = styled.SafeAreaView({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
});

const StyledBackButton = styled.TouchableOpacity({
  marginLeft: 8,
});

const StyledHeaderButtonsView = styled.View({
  flexDirection: 'row',
});

const StyledHeaderButton = styled.TouchableOpacity({
  marginRight: 12,
});

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

type SubmissionProps = StackNavigationProp<RootStackParamList, 'Submission'>;
type SubmissionRootProp = RouteProp<RootStackParamList, 'Submission'>;

interface Props {
  navigation: SubmissionProps;
  route: SubmissionRootProp;
  appKey: string;
  loading: boolean;
  selectedSubmission: any;
  getSubmissions: (appkey: string, id: string) => void;
  requestQuestions: (appkey: string, id: string) => void;
  selectSubmission: (id: string, submission: any) => void;
  editSubmission: (
    apikey: string,
    id: string,
    qid: number,
    values: any,
    name?: boolean,
  ) => void;
  postNewSubmission: (appkey: string, id: string, data: any) => void;
  resetQuestions: () => void;
  resetSubmissions: () => void;
  resetSelectedSubmission: () => void;
  deleteSubmission: (apikey: string, submissionId: string) => void;
}

const ViewWithSpinner = Loading(View);

const SubmissionPage: FC<Props> = ({
  navigation,
  route,
  // eslint-disable-next-line no-shadow
  getSubmissions,
  // eslint-disable-next-line no-shadow
  requestQuestions,
  // eslint-disable-next-line no-shadow
  selectSubmission,
  // eslint-disable-next-line no-shadow
  editSubmission,
  // eslint-disable-next-line no-shadow
  postNewSubmission,
  // eslint-disable-next-line no-shadow
  resetQuestions,
  // eslint-disable-next-line no-shadow
  resetSubmissions,
  // eslint-disable-next-line no-shadow
  resetSelectedSubmission,
  // eslint-disable-next-line no-shadow
  deleteSubmission,
  selectedSubmission,
  appKey,
  loading,
}) => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const visibleQuestions: QuestionInterface[] =
    useSelector(getVisibleQuestions);
  const orderedQuestions: QuestionInterface[] =
    useSelector(getOrderedQuestions);
  const submissions: SubmissionInterface[] = useSelector(getActiveSubmissions);
  const emptyData = [] as any;
  const renderNullItem = () => null;
  const submissionEditSheetModal = useRef<BottomSheetModal>(null);

  useEffect(() => {
    getSubmissions(appKey, route.params.id);
    requestQuestions(appKey, route.params.id);
  }, [getSubmissions, requestQuestions, appKey, route.params.id]);

  const goBack = async () => {
    await resetQuestions();
    await resetSubmissions();
    wait(1000);
    navigation.goBack();
  };

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${route.params.title}`,
      headerStyle: {
        backgroundColor: Colors.jotformGrey,
      },
      headerTitleStyle: {
        color: Colors.lightGrey,
      },
      headerLeft: () => (
        <StyledBackButton onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.lightGrey} />
        </StyledBackButton>
      ),
      headerRight: () => (
        <StyledHeaderButtonsView>
          <StyledHeaderButton onPress={() => setModalVisible(true)}>
            <Icon name="filter" size={24} color={Colors.lightGrey} />
          </StyledHeaderButton>
        </StyledHeaderButtonsView>
      ),
    });
  });

  const snapPoints = useMemo(() => ['0%', '50%', '95%'], []);

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
    <StyledScreenContainer>
      <TitleModal
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
            questions={visibleQuestions}
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
    </StyledScreenContainer>
  );
};

const mapStateToProps = (state: IState) => {
  const {appKey, loading} = state.auth;
  const {selectedSubmission} = state.submissions;
  return {appKey, loading, selectedSubmission};
};

const mapDispatchToProps = {
  getSubmissions,
  requestQuestions,
  selectSubmission,
  editSubmission,
  postNewSubmission,
  resetQuestions,
  resetSubmissions,
  resetSelectedSubmission,
  deleteSubmission,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage);
