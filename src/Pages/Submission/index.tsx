import React, {FC, useEffect} from 'react';
import {useSelector, connect} from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

import MainView from './MainView';
import {SubmissionInterface} from '../../Interfaces/SubmissionInterface';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';
import {ColorInterface} from '../../Interfaces/ColorInterface';
import {SubmissionPageProps} from '../../Interfaces/SubmissionPageProps';

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
  const {appKey, route, navigation} = props;
  const visibleQuestions: QuestionInterface[] =
    useSelector(getVisibleQuestions);
  const orderedQuestions: QuestionInterface[] =
    useSelector(getOrderedQuestions);
  const submissions: SubmissionInterface[] = useSelector(getActiveSubmissions);
  const color: ColorInterface = route.params.color;
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  useEffect(() => {
    getSubmissions(appKey, route.params.id);
    requestQuestions(appKey, route.params.id);
  }, [appKey, route.params.id]);

  const goBack = async () => {
    await resetQuestions();
    await resetSubmissions();
    wait(1000);
    props.navigation.goBack();
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
          <StyledHeaderButton onPress={() => setModalVisible(true)}>
            <Icon name="filter" size={24} color={color.sub} />
          </StyledHeaderButton>
        </StyledHeaderButtonsView>
      ),
    });
  });

  return (
    <StyledScreenContainer>
      <MainView
        props={props}
        visibleQuestions={visibleQuestions}
        orderedQuestions={orderedQuestions}
        submissions={submissions}
        color={color}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
