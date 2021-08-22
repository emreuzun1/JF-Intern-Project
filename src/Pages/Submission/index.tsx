import React, {FC, useEffect} from 'react';
import {useSelector, connect} from 'react-redux';
import styled from 'styled-components/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

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
import GridView from './GridView';

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

const SubmissionPage: FC<SubmissionPageProps> = props => {
  // eslint-disable-next-line no-shadow
  const {appKey, route, navigation, getSubmissions, requestQuestions} = props;
  const visibleQuestions: QuestionInterface[] =
    useSelector(getVisibleQuestions);
  const orderedQuestions: QuestionInterface[] =
    useSelector(getOrderedQuestions);
  const submissions: SubmissionInterface[] = useSelector(getActiveSubmissions);
  const color: ColorInterface = route.params.color;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [mainView, setMainView] = React.useState<boolean>(true);

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
              <IconAntDesign name="table" size={24} color={color.sub} />
            </StyledHeaderButton>
          ) : (
            <StyledHeaderButton onPress={() => setMainView(true)}>
              <Ionicons name="grid" size={24} color={color.sub} />
            </StyledHeaderButton>
          )}
          <StyledHeaderButton onPress={() => setModalVisible(true)}>
            <IconFontAwesome name="filter" size={24} color={color.sub} />
          </StyledHeaderButton>
        </StyledHeaderButtonsView>
      ),
    });
  });

  return (
    <StyledScreenContainer>
      {mainView ? (
        <MainView
          props={props}
          visibleQuestions={visibleQuestions}
          orderedQuestions={orderedQuestions}
          submissions={submissions}
          color={color}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : (
        <GridView
          props={props}
          visibleQuestions={visibleQuestions}
          orderedQuestions={orderedQuestions}
          submissions={submissions}
          color={color}
        />
      )}
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
