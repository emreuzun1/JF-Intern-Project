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
  const editorsMap = I.Map(editors);
  const Element = editorsMap.get('fullname', null);

  //const element = editorsMap.get(route.params.answer.type.split('_',2)[1],null);

  if (Element) {
    // @ts-ignore: Unreachable code error
    return <Element answer={route.params.answer[0]} />;
  }
  return <View></View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#434343',
  },
});

export default SubmissionEditPage;
