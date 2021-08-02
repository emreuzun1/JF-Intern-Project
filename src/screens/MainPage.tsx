import axios from 'axios';
import React, {FC, useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const App: FC = props => {
  const [selectedId, setSelectedId] = useState(null);
  const [arr, setArr] = useState([] as any);
  const [isLoaded, setIsLoaded] = useState(false);
  const appKey = useSelector(state => state.auth.appKey);

  console.log(appKey);

/*
  async function getForms() {
    await axios({
      method: 'GET',
      url: 'https://api.jotform.com/user/forms',
      params: {
        apikey: userApiKey,
      },
    })
      .then(response => setArr([...arr,...response.data.content]))
      .then(err => console.log(err));
  }

  useEffect(() => {
    getForms();
  }, [])
  console.log(arr);*/

  const renderListItem = (itemData: any) => {
    console.log(itemData);
    return (
      <View>
        <Text>{itemData.item.title}</Text>
      </View>
    );
  };

  return (
    <View>
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
