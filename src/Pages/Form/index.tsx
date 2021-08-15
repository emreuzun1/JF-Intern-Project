import React, {FC, useEffect} from 'react';
import {ScrollView, VirtualizedList, LogBox, Dimensions} from 'react-native';
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
import {Colors} from '../../constants/Colors';

type FormProps = StackNavigationProp<RootStackParamList, 'Form'>;
type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;

const ScrollViewWithLoading = withLoading(ScrollView);
const {width} = Dimensions.get('screen');

const StyledContainer = styled.View({
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
  marginRight: width / 10,
});
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
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const getItem = (data: any, index: number) => ({
    id: data[index].id,
    title: data[index].title,
    updated_at: data[index].updated_at,
    count: data[index].count,
  });

  return (
    <StyledContainer>
      <StyledTopContainer>
        <StyledLogOutButton onPress={logOut}>
          <Icon name="logout" size={24} color="#ccc" />
        </StyledLogOutButton>
      </StyledTopContainer>
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
              onPress={() =>
                navigation.navigate('Submission', {
                  id: item.id,
                  title: item.title,
                })
              }
            />
          )}
        />
      </ScrollViewWithLoading>
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
