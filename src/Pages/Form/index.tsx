import React, {FC, useEffect} from 'react';
import {View, VirtualizedList, Dimensions} from 'react-native';
import {useSelector, connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import styled from 'styled-components/native';

import {RootStackParamList} from '../../Navigation/types';
import {getForm} from '../../redux/actions/formAction';
import {getActiveForms} from '../../redux/reducers/selector';
import {IState} from '../../Interfaces/actionInterface';
import {persistor} from '../../redux/store';
import Icon from 'react-native-vector-icons/AntDesign';

import withLoading from '../../components/Loading';
import FormCard from '../../components/FormCard';
import {requestLogout} from '../../redux/actions';
import {Colors, getRandomColor} from '../../constants/Colors';
import {FlatList} from 'react-native-gesture-handler';
import {FormInterface} from '../../Interfaces/FormsInterface';

type FormProps = StackNavigationProp<RootStackParamList, 'Form'>;
type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;

const ViewWithSpinner = withLoading(View);
const {width} = Dimensions.get('screen');

const StyledContainer = styled.SafeAreaView({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
  padding: 24,
});

const StyledTopContainer = styled.View({
  width: width,
  height: 50,
  alignItems: 'flex-end',
  paddingHorizontal: 12,
});

const StyledLogOutButton = styled.TouchableOpacity({
  marginRight: width / 20,
});
interface Props {
  navigation: FormProps;
  route: FormRouteProp;
  loading: boolean;
  getForm: () => void;
  requestLogout: () => void;
}

const FormPage: FC<Props> = props => {
  const data: FormInterface[] = useSelector(getActiveForms);
  // eslint-disable-next-line no-shadow
  const {navigation, requestLogout, getForm, loading} = props;
  const emptyData = [] as any;
  const renderNullItem = () => null;

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
  }, [getForm]);

  // eslint-disable-next-line no-shadow
  const getItem = (data: any, index: number) => ({
    id: data[index].id,
    title: data[index].title,
    updated_at: data[index].updated_at,
    count: data[index].count,
  });

  const ListHeaderComponent = () => (
    <VirtualizedList
      data={data}
      initialNumToRender={9}
      // eslint-disable-next-line no-shadow
      getItemCount={(data: FormInterface[]) => data.length}
      getItem={getItem}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <FormCard
          color={getRandomColor()}
          title={item.title}
          update_at={item.updated_at}
          count={item.count}
          onPress={(color: string) =>
            navigation.navigate('Submission', {
              id: item.id,
              title: item.title,
              color: color,
            })
          }
        />
      )}
    />
  );

  return (
    <StyledContainer>
      <StyledTopContainer>
        <StyledLogOutButton onPress={logOut}>
          <Icon name="logout" size={24} color="#ccc" />
        </StyledLogOutButton>
      </StyledTopContainer>
      <ViewWithSpinner isLoading={loading}>
        <FlatList
          data={emptyData}
          renderItem={renderNullItem}
          ListHeaderComponent={ListHeaderComponent}
        />
      </ViewWithSpinner>
    </StyledContainer>
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
