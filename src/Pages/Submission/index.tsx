/* eslint-disable no-shadow */
import React, {FC, useEffect, useMemo, useRef} from 'react';
import {useSelector, connect} from 'react-redux';
import styled from 'styled-components/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

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
import {SubmissionPageProps} from '../../Interfaces/SubmissionPageProps';
import CardView from './CardView';
import SubmissionEditSheet from './SubmissionEditSheet';
import {Colors} from '../../constants/Colors';
import TitleModal from './TitleFilterModal';

interface ILogo {
  mainView: boolean;
}

const StyledScreenContainer = styled.SafeAreaView({
  flex: 1,
  backgroundColor: Colors.black,
});

const StyledBackButton = styled.TouchableOpacity({
  marginLeft: 8,
});

const StyledHeaderButtonsView = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const StyledHeaderButton = styled.TouchableOpacity({
  marginRight: 12,
});

const StyledTotalSubmissionText = styled.Text({
  color: Colors.grey,
  fontWeight: 400,
  fontSize: 13,
  marginVertical: 18,
  alignSelf: 'center',
});

const StyledLogoContainer = styled.View({
  width: 68,
  height: 34,
  backgroundColor: Colors.black,
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: 8,
  marginRight: 8,
});

const StyledLogoButton = styled.TouchableOpacity({
  justifyContent: 'center',
  marginHorizontal: 6,
});

const StyledLogoImage = styled.Image({
  width: 20,
  height: 20,
});

const StyledLogoLine = styled.View({
  height: 34,
  borderRightWidth: 1,
  marginRight: 12,
  borderColor: Colors.black,
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
  const color: string = route.params.color;
  const count: number = route.params.count;
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
      headerTitleAlign: 'left',
      headerStyle: {
        backgroundColor: `${color}`,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: () => (
        <StyledBackButton onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </StyledBackButton>
      ),
      headerRight: () => (
        <StyledHeaderButtonsView>
          <StyledLogoContainer>
            <StyledLogoButton onPress={() => setMainView(true)}>
              {mainView ? (
                <StyledLogoImage
                  source={require('../../img/colored-grid.png')}
                />
              ) : (
                <StyledLogoImage source={require('../../img/grid.png')} />
              )}
            </StyledLogoButton>
            <StyledLogoButton onPress={() => setMainView(false)}>
              {mainView ? (
                <StyledLogoImage source={require('../../img/card.png')} />
              ) : (
                <StyledLogoImage
                  source={require('../../img/colored-card.png')}
                />
              )}
            </StyledLogoButton>
          </StyledLogoContainer>
          <StyledLogoLine />
          <StyledHeaderButton onPress={() => setModalVisible(true)}>
            <IconFontAwesome name="filter" size={24} color="white" />
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
  }, [
    appKey,
    getSubmissions,
    requestQuestions,
    resetSelectedSubmission,
    route.params.id,
  ]);

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
      <StyledTotalSubmissionText>
        Total {count} submissions
      </StyledTotalSubmissionText>
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
          sheetRef={submissionEditSheetModal}
          selectSubmission={selectSubmission}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={() => submissionEditSheetModal.current?.present()}>
        <MaterialIcons name="add" size={38} color={Colors.black} />
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  actionButtonContainer: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
    bottom: height / 20,
    right: width / 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
