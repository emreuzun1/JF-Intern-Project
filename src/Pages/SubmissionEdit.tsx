import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import I from 'immutable';

import {RootStackParamList} from '../Navigation/types';
import * as editors from '../components/Editors';

type SubmissionEditProps = StackNavigationProp<RootStackParamList, 'Edit'>;
type SubmissionEditRootProp = RouteProp<RootStackParamList, 'Edit'>;

interface Props {
  navigation: SubmissionEditProps;
  route: SubmissionEditRootProp;
}

const SubmissionEditPage: FC<Props> = ({route, navigation}) => {
  const {questions, answer} = route.params;
  const editorsMap = I.Map(editors);

  return (
    <View style={styles.screen}>
      {questions.map((q: any, index: any) => {
        const Element = editorsMap.get(q.type.split('_', 2)[1], null);
        if (Element) return <Element answer={answer[index]} question={q} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#434343',
  },
});

export default SubmissionEditPage;
