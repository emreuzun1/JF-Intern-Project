import React, { FC, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../navigation/types';
import { getForm } from '../redux/actions/form';
import { IState } from '../interfaces/actionInterface';

import Waiting from '../components/Waiting';
import FormCard from '../components/FormCard';

type MainProps = StackNavigationProp<RootStackParamList, 'Form'>
type MainRouteProp = RouteProp<RootStackParamList, 'Form'>

interface Props {
  navigation: MainProps;
  route: MainRouteProp
}

const FormPage: FC<Props> = ({ route, navigation }) => {
  const isLoaded = useSelector((state: IState) => state.form.loading);
  const form = useSelector((state: IState) => state.form.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForm());
  }, []);


  const goSubmissionPage = (itemId: string) => {
    navigation.navigate('Submission', {
      id: itemId
    });
  }

  const renderListItem = (itemData: any) => {
    return (
      <TouchableOpacity onPress={() => goSubmissionPage(itemData.item.id)}>
        <FormCard title={itemData.item.title} update_at={itemData.item.updated_at} count={itemData.item.count} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView horizontal style={styles.container}>
      {isLoaded ? <Waiting /> :
        <FlatList
          data={form}
          renderItem={renderListItem.bind(this)}
        />
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#434343',
    padding: 24
  },
});

export default FormPage;
