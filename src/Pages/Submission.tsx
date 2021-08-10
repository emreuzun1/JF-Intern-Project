import React, {FC, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  LogBox,
  RefreshControl,
  FlatList,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../Navigation/types';
import {getSubmissions, requestQuestions} from '../redux/actions';
import {IState} from '../Interfaces/actionInterface';
import {
  getActiveSubmissions,
  getOrderedQuestions,
} from '../redux/reducers/selector';

import {SubmissionCard, SubmissionTitle, Waiting} from '../components';

type SubmissionProps = StackNavigationProp<RootStackParamList, 'Submission'>;
type SubmissionRootProp = RouteProp<RootStackParamList, 'Submission'>;
interface Props {
  navigation: SubmissionProps;
  route: SubmissionRootProp;
}

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const {height} = Dimensions.get('screen');

const SubmissionPage: FC<Props> = ({route, navigation}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const appKey = useSelector((state: IState) => state.auth.appKey);
  const loading = useSelector((state: IState) => state.submissions.loading);
  const questionData = useSelector(getOrderedQuestions);
  const submissions = useSelector(getActiveSubmissions);
  const dispatch = useDispatch();
  const sheetRef = React.useRef(null);

  useEffect(() => {
    dispatch(getSubmissions(appKey, route.params.id));
    dispatch(requestQuestions(appKey, route.params.id));
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(250).then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Waiting />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      style={styles.screen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.screen}>
        <View style={styles.headerBackground}>
          <FlatList
            keyExtractor={(item: any, index: any) => {
              return `${index}_${item.text}`;
            }}
            horizontal
            data={questionData}
            renderItem={(item: any) => <SubmissionTitle item={item} />}
          />
        </View>
        <FlatList
          data={submissions}
          refreshing={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SubmissionCard
              item={item}
              navigation={navigation}
              onPress={(answers: any) =>
                navigation.navigate('Edit', {
                  answer: answers,
                })
              }
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#434343',
  },
  headerBackground: {
    backgroundColor: '#333333',
    width: '100%',
  },
});

export default SubmissionPage;
