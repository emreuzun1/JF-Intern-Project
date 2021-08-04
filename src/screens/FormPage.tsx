import React, { FC, useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getForm } from '../redux/actions/form';
import { IState } from '../interfaces/actionInterface';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { RouteProp } from '@react-navigation/native';

type MainProps = StackNavigationProp<RootStackParamList, 'Form'>
type MainRouteProp = RouteProp<RootStackParamList, 'Form'>

interface Props {
  navigation: MainProps;
  route: MainRouteProp
}

const FormPage: FC<Props> = ({ route, navigation }) => {
  const isLoaded = useSelector((state: IState) => state.auth.loading);
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
        <Text style={{ fontSize: 48 }}>{itemData.item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView horizontal>
      {isLoaded ? <Text>Loading!</Text> : <View></View>}
      <FlatList
        keyExtractor={(item: any) => item.id}
        data={form}
        renderItem={renderListItem.bind(this)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormPage;
