import React, { FC, useEffect } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../navigation/types';
import { getSubmissions } from '../redux/actions/submission';
import { IState } from '../interfaces/actionInterface';

import SubmissionCard from '../components/SubmissionCard';
import Waiting from '../components/Waiting';

type SubmissionProps = StackNavigationProp<RootStackParamList, 'Submission'>
type SubmissionRootProp = RouteProp<RootStackParamList, 'Submission'>

interface Props {
    navigation: SubmissionProps;
    route: SubmissionRootProp
}

const SubmissionPage: FC<Props> = ({ route, navigation }) => {
    const appKey = useSelector((state: IState) => state.auth.appKey);
    const loading = useSelector((state: IState) => state.submissions.loading);
    const data = useSelector((state: IState) => state.submissions.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubmissions(appKey, route.params.id));
    }, []);

    const renderListItem = (item: any) => {
        return (
            <SubmissionCard item={item.item} />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {
                loading ? <Waiting /> : (
                    < ScrollView horizontal >
                        <FlatList
                            data={data}
                            renderItem={renderListItem.bind(this)}
                        />
                    </ScrollView>
                )
            }
        </View>
    )
}

export default SubmissionPage;
