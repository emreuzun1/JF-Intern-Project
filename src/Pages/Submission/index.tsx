import React, {FC, useEffect, useMemo, useRef} from 'react';
import {ScrollView, LogBox, VirtualizedList} from 'react-native';
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

type SubmissionProps = StackNavigationProp<RootStackParamList, 'Submission'>;
type SubmissionRootProp = RouteProp<RootStackParamList, 'Submission'>;

interface Props {
  navigation: SubmissionProps;
  route: SubmissionRootProp;
  getSubmissions: (appkey: string, id: string) => void;
  requestQuestions: (appkey: string, id: string) => void;
  selectSubmission: (submission: any) => void;
  appKey: string;
  loading: boolean;
  selectedSubmission: any;
}

const ScrollViewWithSpinner = Loading(ScrollView);

const SubmissionPage: FC<Props> = props => {
  const questionData = useSelector(getOrderedQuestions);
  const submissions = useSelector(getActiveSubmissions);
  const {
    navigation,
    route,
    getSubmissions,
    requestQuestions,
    selectSubmission,
    selectedSubmission,
    appKey,
    loading,
  } = props;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    getSubmissions(appKey, route.params.id);
    requestQuestions(appKey, route.params.id);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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

  const handleSubmit = (qid: number, values: any, name?: boolean) => {
    console.log('qid:', qid, ' Name :', name, ' Values : ', values);
  };

  const snapPoints = useMemo(() => ['0%', '95%'], []);

  const handleOpen = (item: any) => {
    selectSubmission(item);
    bottomSheetModalRef.current?.present();
  };

  const handleSheetChanges = React.useCallback((index: number) => {
    if (index === -1) {
      console.log('Closed!');
    }
  }, []);

  return (
    <StyledScreenContainer>
      <ScrollView horizontal>
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
            onPress={handleSubmit}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage);
