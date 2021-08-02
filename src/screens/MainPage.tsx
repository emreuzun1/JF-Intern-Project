import axios from 'axios';
import React, { FC, useState, useEffect, useMemo } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getForm } from '../redux/actions/form';

const App: FC = props => {
  const [arr, setArr] = useState([] as any);
  const isLoaded = useSelector(state => state.auth.loading);
  const appKey = useSelector(state => state.auth.appKey);
  const dispatch = useDispatch();

  //TODO : Get forms' data from selector.
  const forms = useMemo(() => {
  }, [isLoaded])

  useEffect(() => {
    dispatch(getForm(appKey));
  }, [appKey]);


  const renderListItem = (itemData: any) => {
    return (
      <View>
        <Text>{itemData.item.title}</Text>
      </View>
    );
  };

  return (
    <View>
      {isLoaded ? <Text>Loading!</Text> : <View></View>}
      <Text>Main Page</Text>
      <FlatList
        keyExtractor={(item: any) => item.id}
        data={arr}
        renderItem={renderListItem.bind(this)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
