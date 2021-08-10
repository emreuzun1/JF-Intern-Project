import React, { FC, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../Navigation/types';
import { getForm } from '../redux/actions/formAction';
import { getActiveForms } from '../redux/reducers/selector';
import { IState } from '../Interfaces/actionInterface';

import Waiting from '../components/Waiting';
import FormCard from '../components/FormCard';

type FormProps = StackNavigationProp<RootStackParamList, 'Form'>
type FormRouteProp = RouteProp<RootStackParamList, 'Form'>

interface Props {
  navigation: FormProps;
  route: FormRouteProp
}

const FormPage: FC<Props> = ({ route, navigation }) => {
  const isLoaded = useSelector((state: IState) => state.form.loading);
  const appKey = useSelector((state: IState) => state.auth.appKey);
  const data = useSelector(getActiveForms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForm());
  }, [appKey]);

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
          data={data}
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
