import React, {FC, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useDispatch, useSelector, connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../Navigation/types';
import {getForm} from '../redux/actions/formAction';
import {getActiveForms} from '../redux/reducers/selector';
import {IState} from '../Interfaces/actionInterface';
import {AppDispatch, persistor} from '../redux/store';
import Icon from 'react-native-vector-icons/AntDesign';

import Waiting from '../components/Waiting';
import FormCard from '../components/FormCard';
import {requestLogout} from '../redux/actions';

type FormProps = StackNavigationProp<RootStackParamList, 'Form'>;
type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;
interface NavigationProps {
  navigation: FormProps;
  route: FormRouteProp;
}

interface DispatchProps {
  logOut: () => void;
}

type Props = NavigationProps & DispatchProps;

const mapDispatchToProps = (dispatch: any) => {
  return {
    logOut: () => {
      dispatch(requestLogout());
    },
  };
};

const FormPage: FC<Props> = (props: Props) => {
  const isLoaded = useSelector((state: IState) => state.form.loading);
  const appKey = useSelector((state: IState) => state.auth.appKey);
  const data = useSelector(getActiveForms);
  const {navigation} = props;
  const dispatch: AppDispatch = useDispatch();

  const logOut = async () => {
    await persistor.purge().then(() => {
      props.logOut();
      navigation.navigate('Login', {
        isLogged: false,
      });
    });
  };

  useEffect(() => {
    dispatch(getForm());
  }, [appKey]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logOut} style = {{marginRight : 12}}>
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

  const renderListItem = (itemData: any) => {
    return (
      <TouchableOpacity onPress={() => goSubmissionPage(itemData.item.id)}>
        <FormCard
          title={itemData.item.title}
          update_at={itemData.item.updated_at}
          count={itemData.item.count}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView horizontal style={styles.container}>
      {isLoaded ? (
        <Waiting />
      ) : (
        <FlatList data={data} renderItem={renderListItem.bind(this)} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#434343',
    padding: 24,
  },
});

export default connect(null,mapDispatchToProps)(FormPage);
