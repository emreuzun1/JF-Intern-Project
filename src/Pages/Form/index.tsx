import React, {FC, useEffect} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import {useSelector, connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../Navigation/types';
import {getForm} from '../../redux/actions/formAction';
import {getActiveForms} from '../../redux/reducers/selector';
import {IState} from '../../Interfaces/actionInterface';
import {persistor} from '../../redux/store';
import Icon from 'react-native-vector-icons/AntDesign';

import Loading from '../../components/Loading';
import FormCard from '../../components/FormCard';
import {requestLogout} from '../../redux/actions';
import {styles} from './style';

type FormProps = StackNavigationProp<RootStackParamList, 'Form'>;
type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;

const ScrollViewWithLoading = Loading(ScrollView);

interface Props {
  navigation: FormProps;
  route: FormRouteProp;
  requestLogout: () => void;
  getForm: () => void;
  loading: boolean;
}

const FormPage: FC<Props> = props => {
  const data = useSelector(getActiveForms);
  const {navigation, requestLogout, getForm, loading} = props;

  const logOut = async () => {
    await persistor.purge().then(() => {
      requestLogout();
      navigation.navigate('Login', {
        isLogged: false,
      });
    });
  };

  useEffect(() => {
    getForm();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logOut} style={{marginRight: 12}}>
          <Icon name="logout" size={24} color="#ccc" />
        </TouchableOpacity>
      ),
    });
  });

  const goSubmissionPage = (itemId: string) => {
    navigation.navigate('Submission', {
      id: itemId,
    });
  };

  const getItem = (data: any, index: number) => ({
    id: data[index].id,
    title: data[index].title,
    updated_at: data[index].updated_at,
    count: data[index].count,
  });

  return (
    <View style={styles.container}>
      <ScrollViewWithLoading isLoading={loading}>
        <VirtualizedList
          data={data}
          initialNumToRender={9}
          getItemCount={(data: any) => data.length}
          getItem={getItem}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <FormCard
              title={item.title}
              update_at={item.updated_at}
              count={item.count}
              onPress={() => goSubmissionPage(item.id)}
            />
          )}
        />
      </ScrollViewWithLoading>
    </View>
  );
};

const mapStateToProps = (state: IState) => {
  const {loading} = state.form;
  return {loading};
};

const mapDispatchToProps = {
  requestLogout,
  getForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
