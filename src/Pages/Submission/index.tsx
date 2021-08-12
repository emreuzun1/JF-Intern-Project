import React, {FC, useEffect} from 'react';
import {ScrollView, View, LogBox, FlatList} from 'react-native';
import {useSelector, connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../Navigation/types';
import {getSubmissions, requestQuestions} from '../../redux/actions';
import {IState} from '../../Interfaces/actionInterface';
import {SubmissionAnswerInterface} from '../../Interfaces/SubmissionAnswerInterface';
import {
  getActiveSubmissions,
  getOrderedQuestions,
} from '../../redux/reducers/selector';

import {SubmissionCard, SubmissionTitle} from '../../components';
import Loading from '../../components/Loading';
import {styles} from './style';

type SubmissionProps = StackNavigationProp<RootStackParamList, 'Submission'>;
type SubmissionRootProp = RouteProp<RootStackParamList, 'Submission'>;

interface Props {
  navigation: SubmissionProps;
  route: SubmissionRootProp;
  getSubmissions: (appkey: string, id: string) => void;
  requestQuestions: (appkey: string, id: string) => void;
  appKey: string;
  loading: boolean;
}

const ScrollViewWithSpinner = Loading(ScrollView);

const SubmissionPage: FC<Props> = props => {
  const questionData = useSelector(getOrderedQuestions);
  const submissions = useSelector(getActiveSubmissions);
  const {navigation, route, getSubmissions, requestQuestions, appKey, loading} =
    props;

  useEffect(() => {
    getSubmissions(appKey, route.params.id);
    requestQuestions(appKey, route.params.id);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <ScrollViewWithSpinner isLoading={loading}>
      <ScrollView horizontal style={styles.screen}>
        <View style={styles.screen}>
          <View style={styles.headerBackground}>
            <FlatList
              keyExtractor={(item: any, index: any) => {
                return `${index}_${item.text}`;
              }}
              horizontal
              data={questionData}
              renderItem={(item: any) => <SubmissionTitle question={item} />}
            />
          </View>
          <FlatList
            data={submissions}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <SubmissionCard
                item={item}
                navigation={navigation}
                onPress={(answers: SubmissionAnswerInterface) =>
                  navigation.navigate('Edit', {
                    answer: answers,
                    questions: questionData,
                  })
                }
              />
            )}
          />
        </View>
      </ScrollView>
    </ScrollViewWithSpinner>
  );
};

const mapStateToProps = (state: IState) => {
  const {appKey, loading} = state.auth;
  return {appKey, loading};
};

const mapDispatchToProps = {
  getSubmissions,
  requestQuestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage);
