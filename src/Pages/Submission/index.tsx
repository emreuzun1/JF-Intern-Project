import React, {FC, useEffect, useMemo, useRef} from 'react';
import {RefreshControl, View} from 'react-native';
import {useSelector, connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

import {RootStackParamList} from '../../Navigation/types';
import {
  getSubmissions,
  requestQuestions,
  selectSubmission,
  postSubmission,
  resetQuestions,
  resetSubmissions,
} from '../../redux/actions';
import {IState} from '../../Interfaces/actionInterface';
import {
  getActiveSubmissions,
  getOrderedQuestions,
} from '../../redux/reducers/selector';

import Loading from '../../components/Loading';
import SubmissionEditSheet from '../SubmissionEditSheet';
import {Colors} from '../../constants/Colors';
import {FlatList} from 'react-native-gesture-handler';
import Titles from './Titles';
import Answer from './Answers';
import TitleModal from './TitleFilterModal';
import {SubmissionInterface} from '../../Interfaces/SubmissionInterface';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';

const StyledScreenContainer = styled.SafeAreaView({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
});

const BackButton = styled.TouchableOpacity({
  marginLeft: 8,
});

const FilterButton = styled.TouchableOpacity({
  marginRight: 8,
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
  postSubmission: (
    apikey: string,
    id: string,
    qid: number,
    values: any,
    name?: boolean,
  ) => void;
  resetQuestions: () => void;
  resetSubmissions: () => void;
}

const ViewWithSpinner = Loading(View);

const SubmissionPage: FC<Props> = props => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const questionData: QuestionInterface[] = useSelector(getOrderedQuestions);
  const submissions: SubmissionInterface[] = useSelector(getActiveSubmissions);
  const {
    navigation,
    route,
    // eslint-disable-next-line no-shadow
    getSubmissions,
    // eslint-disable-next-line no-shadow
    requestQuestions,
    // eslint-disable-next-line no-shadow
    selectSubmission,
    // eslint-disable-next-line no-shadow
    postSubmission,
    // eslint-disable-next-line no-shadow
    resetQuestions,
    // eslint-disable-next-line no-shadow
    resetSubmissions,
    selectedSubmission,
    appKey,
    loading,
  } = props;
  const emptyData = [] as any;
  const renderNullItem = () => null;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${route.params.title}`,
      headerStyle: {
        backgroundColor: Colors.jotformGrey,
      },
      headerTitleStyle: {
        fontFamily: 'sf-regular',
        color: Colors.lightGrey,
      },
      headerLeft: () => (
        <BackButton onPress={goBack}>
          <Icon name="arrow-back" size={24} color={Colors.lightGrey} />
        </BackButton>
      ),
      headerRight: () => (
        <FilterButton onPress={() => setModalVisible(true)}>
          <Icon name="filter" size={24} color={Colors.lightGrey} />
        </FilterButton>
      ),
    });
  });

  const snapPoints = useMemo(() => ['0%', '95%'], []);

  const onRefresh = React.useCallback(() => {
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
      <Titles questionData={questionData} />
      <Answer
        submissions={submissions}
        navigation={navigation}
        sheetModalRef={bottomSheetModalRef}
        selectSubmission={selectSubmission}
      />
    </ViewWithSpinner>
  );

  return (
    <StyledScreenContainer>
      <TitleModal
        questions={questionData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={emptyData}
        renderItem={renderNullItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={ListHeaderComponent}
      />
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <SubmissionEditSheet
            answer={selectedSubmission ? selectedSubmission.submission : null}
            questions={questionData}
            onPress={(qid, values, name) =>
              postSubmission(appKey, selectedSubmission.id, qid, values, name)
            }
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <ActionButton
        buttonColor={Colors.lightBlue}
        onPress={() => console.log('Action Button')}
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
  postSubmission,
  resetQuestions,
  resetSubmissions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage);
