import React, { FC, useEffect, useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissions } from '../redux/actions/submission';
import { IState } from '../interfaces/actionInterface';
import Card from '../components/Card';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { RouteProp } from '@react-navigation/native';

type FormProps = StackNavigationProp<RootStackParamList, 'Submission'>
type FormRootProp = RouteProp<RootStackParamList, 'Submission'>

interface Props {
    navigation: FormProps;
    route: FormRootProp
}

const SubmissionPage: FC<Props> = ({ route, navigation }) => {
    const appKey = useSelector((state: IState) => state.auth.appKey);
    const loading = useSelector((state: IState) => state.formDetail.loading);
    const data = useSelector((state: IState) => state.formDetail.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubmissions(appKey, route.params.id));
    }, []);

    const renderListItem = (item: any) => {
        return (
            <Card item={item.item} />
        )
    }

    return (
        <ScrollView horizontal>
            <FlatList
                data={data}
                renderItem={renderListItem.bind(this)}
            />
        </ScrollView>
    )
}

export default SubmissionPage;
