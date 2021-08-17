import React, {FC, useEffect, useMemo, useRef} from 'react';
import {
  ScrollView,
  LogBox,
  VirtualizedList,
  RefreshControl,
} from 'react-native';
import {useSelector, connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

import {RootStackParamList} from '../../Navigation/types';
import {
  getSubmissions,
  requestQuestions,
  selectSubmission,
  postSubmission,
} from '../../redux/actions';
import {IState} from '../../Interfaces/actionInterface';
import {
  getActiveSubmissions,
  getOrderedQuestions,
} from '../../redux/reducers/selector';

import {SubmissionCard, SubmissionTitle} from '../../components';
import Loading from '../../components/Loading';
import SubmissionEditSheet from '../SubmissionEditSheet';
import {Colors} from '../../constants/Colors';

const StyledScreenContainer = styled.View({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
});

const StyledHeaderBackground = styled.View({
  backgroundColor: Colors.darkerGrey,
  width: '100%',
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
}

const ScrollViewWithSpinner = Loading(ScrollView);

const SubmissionPage: FC<Props> = props => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const questionData = useSelector(getOrderedQuestions);
  const submissions = useSelector(getActiveSubmissions);
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
    selectedSubmission,
    appKey,
    loading,
  } = props;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    getSubmissions(appKey, route.params.id);
    requestQuestions(appKey, route.params.id);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${route.params.title}`,
    });
  });

  const getTitleItem = (data: any, index: number) => ({
    question: data[index],
    index: index,
  });

  const getSubmissionItem = (data: any, index: number) => ({
    item: data[index],
  });

  const snapPoints = useMemo(() => ['0%', '95%'], []);

  const handleOpen = (id: string, answer: any) => {
    selectSubmission(id, answer);
    bottomSheetModalRef.current?.present();
  };

  const onRefresh = React.useCallback(() => {
    getSubmissions(appKey, route.params.id);
    requestQuestions(appKey, route.params.id);
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const handleSheetChanges = React.useCallback((index: number) => {
    if (index === -1) {
      onRefresh();
    }
  }, []);

  return (
    <StyledScreenContainer>
      <ScrollView
        horizontal
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ScrollViewWithSpinner isLoading={loading}>
          <StyledHeaderBackground>
            <VirtualizedList
              keyExtractor={(item: any, index: any) => {
                return `${index}_${item.text}`;
              }}
              horizontal
              initialNumToRender={3}
              data={questionData}
              getItem={getTitleItem}
              getItemCount={data => data.length}
              renderItem={({item, index}) => (
                <SubmissionTitle question={item} index={index} />
              )}
            />
          </StyledHeaderBackground>
          <VirtualizedList
            data={submissions}
            initialNumToRender={7}
            getItem={getSubmissionItem}
            getItemCount={data => data.length}
            keyExtractor={item => item.item.id}
            renderItem={({item}) => (
              <SubmissionCard
                item={item}
                navigation={navigation}
                onPress={handleOpen.bind(item)}
              />
            )}
          />
        </ScrollViewWithSpinner>
      </ScrollView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <SubmissionEditSheet
            answer={selectedSubmission.submission}
            questions={questionData}
            onPress={(qid, values, name) =>
              postSubmission(appKey, selectedSubmission.id, qid, values, name)
            }
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
  postSubmission,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage);
