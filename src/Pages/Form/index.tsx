/* eslint-disable no-shadow */
import React, {FC, useEffect} from 'react';
import {View, VirtualizedList, Dimensions, FlatList} from 'react-native';
import {useSelector, connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import styled from 'styled-components/native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {RootStackParamList} from '../../Navigation/types';
import {getForm} from '../../redux/actions/formAction';
import {getActiveForms} from '../../redux/reducers/selector';
import {IState} from '../../Interfaces/actionInterface';
import {persistor} from '../../redux/store';

import {Loading} from '../../components';
import {FormCard} from '../../components';
import {
  requestLogout,
  resetQuestions,
  resetSubmissions,
} from '../../redux/actions';
import {Colors, getColor} from '../../constants/Colors';
import {FormInterface} from '../../Interfaces/FormsInterface';
import {ColorInterface} from '../../Interfaces/ColorInterface';

type FormProps = StackNavigationProp<RootStackParamList, 'Form'>;
type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;

const ViewWithSpinner = Loading(View);
const {width} = Dimensions.get('screen');

const StyledContainer = styled.SafeAreaView({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
  padding: 24,
});

const StyledLogOutContainer = styled.TouchableOpacity({
  marginRight: width / 20,
});

interface Props {
  navigation: FormProps;
  route: FormRouteProp;
  loading: boolean;
  getForm: () => void;
  requestLogout: () => void;
  resetQuestions: () => void;
  resetSubmissions: () => void;
}

const FormPage: FC<Props> = props => {
  const data: FormInterface[] = useSelector(getActiveForms);

  const {
    navigation,
    loading,
    requestLogout,
    getForm,
    resetQuestions,
    resetSubmissions,
  } = props;
  const emptyData = [] as any;
  const renderNullItem = () => null;
  const isFocused = useIsFocused();

  const logOut = async () => {
    await persistor.purge().then(() => {
      requestLogout();
      navigation.navigate('Login', {
        isLogged: false,
      });
    });
  };

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      resetQuestions();
      resetSubmissions();
      getForm();
    }
  }, [getForm, isFocused, resetQuestions, resetSubmissions]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'My Forms',
      headerTitleStyle: {
        color: Colors.lightGrey,
      },
      headerStyle: {
        backgroundColor: Colors.darkerGrey,
      },
      headerLeft: () => <View />,
      headerRight: () => (
        <StyledLogOutContainer onPress={logOut}>
          <IconAntDesign name="logout" size={24} color="#ccc" />
        </StyledLogOutContainer>
      ),
    });
  });

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
      getItemCount={(data: FormInterface[]) => data.length}
      getItem={getItem}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <FormCard
          color={getColor(index)}
          title={item.title}
          update_at={item.updated_at}
          count={item.count}
          onPress={(color: ColorInterface) =>
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
  resetQuestions,
  resetSubmissions,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
