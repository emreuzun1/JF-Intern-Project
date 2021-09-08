/* eslint-disable no-shadow */
import React, {FC, useEffect, useMemo, useRef} from 'react';
import {useSelector, connect} from 'react-redux';
import styled from 'styled-components/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {
  requestQuestions,
  getSubmissions,
  selectSubmission,
  editSubmission,
  postNewSubmission,
  deleteSubmission,
  resetSelectedSubmission,
  resetQuestions,
  resetSubmissions,
} from '../../redux/actions';
import {IState} from '../../Interfaces/actionInterface';
import {
  getActiveSubmissions,
  getOrderedQuestions,
  getVisibleQuestions,
} from '../../redux/reducers/selector';

import MainView from './MainView';
import {SubmissionInterface} from '../../Interfaces/SubmissionInterface';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';
import {ColorInterface} from '../../Interfaces/ColorInterface';
import {SubmissionPageProps} from '../../Interfaces/SubmissionPageProps';
import CardView from './CardView';
import SubmissionEditSheet from './SubmissionEditSheet';
import {Colors} from '../../constants/Colors';
import ActionButton from 'react-native-action-button';
import TitleModal from './TitleFilterModal';

const StyledScreenContainer = styled.SafeAreaView({
  flex: 1,
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

const SubmissionPage: FC<SubmissionPageProps> = props => {
  const {
    appKey,
    route,
    navigation,
    selectedSubmission,
    getSubmissions,
    requestQuestions,
    selectSubmission,
    editSubmission,
    deleteSubmission,
    postNewSubmission,
    resetSelectedSubmission,
  } = props;
  const visibleQuestions: QuestionInterface[] =
    useSelector(getVisibleQuestions);
  const orderedQuestions: QuestionInterface[] =
    useSelector(getOrderedQuestions);
  const submissions: SubmissionInterface[] = useSelector(getActiveSubmissions);
  const color: ColorInterface = route.params.color;
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [mainView, setMainView] = React.useState<boolean>(true);
  const submissionEditSheetModal = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['0%', '50%', '95%'], []);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  useEffect(() => {
    getSubmissions(appKey, route.params.id);
    requestQuestions(appKey, route.params.id);
  }, [getSubmissions, requestQuestions, appKey, route.params.id]);

  const goBack = async () => {
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${route.params.title}`,
      headerStyle: {
        backgroundColor: `${color.main}`,
      },
      headerTitleStyle: {
        color: `${color.sub}`,
      },
      headerLeft: () => (
        <StyledBackButton onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color={color.sub} />
        </StyledBackButton>
      ),
      headerRight: () => (
        <StyledHeaderButtonsView>
          {mainView ? (
            <StyledHeaderButton onPress={() => setMainView(false)}>
              <MaterialCommunityIcons name="card" size={24} color={color.sub} />
            </StyledHeaderButton>
          ) : (
            <StyledHeaderButton onPress={() => setMainView(true)}>
              <IconAntDesign name="table" size={24} color={color.sub} />
            </StyledHeaderButton>
          )}
          <StyledHeaderButton onPress={() => setModalVisible(true)}>
            <IconFontAwesome name="filter" size={24} color={color.sub} />
          </StyledHeaderButton>
        </StyledHeaderButtonsView>
      ),
    });
  });

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

  return (
    <StyledScreenContainer>
      <TitleModal
        color={color}
        visibleQuestions={visibleQuestions}
        questions={orderedQuestions}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {mainView ? (
        <MainView
          props={props}
          visibleQuestions={visibleQuestions}
          orderedQuestions={orderedQuestions}
          submissions={submissions}
          color={color}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          sheetRef={submissionEditSheetModal}
          selectSubmission={selectSubmission}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <CardView
          props={props}
          visibleQuestions={visibleQuestions}
          orderedQuestions={orderedQuestions}
          submissions={submissions}
          color={color}
          sheetRef={submissionEditSheetModal}
          selectSubmission={selectSubmission}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
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
            editPost={(qid, values, name) => {
              editSubmission(appKey, selectedSubmission.id, qid, values, name);
            }}
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
  resetSelectedSubmission,
  deleteSubmission,
  resetQuestions,
  resetSubmissions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage);
