import React, { FC, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, Text, Image, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../navigation/types';
import { getSubmissions } from '../redux/actions/submissionAction';
import { requestQuestions } from '../redux/actions/questionsAction';
import { IState } from '../interfaces/actionInterface';
import { getActiveSubmissions, getQuestionTitles, getSubmissionAnswers } from '../redux/reducers/selector';

import SubmissionCard from '../components/SubmissionCard';
import Waiting from '../components/Waiting';
import { FlatList } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

type SubmissionProps = StackNavigationProp<RootStackParamList, 'Submission'>
type SubmissionRootProp = RouteProp<RootStackParamList, 'Submission'>
interface Props {
    navigation: SubmissionProps;
    route: SubmissionRootProp
}

const SubmissionPage: FC<Props> = ({ route, navigation }) => {
    const appKey = useSelector((state: IState) => state.auth.appKey);
    const loading = useSelector((state: IState) => state.submissions.loading);
    const questionData = useSelector(getQuestionTitles);
    const data = useSelector(getActiveSubmissions);
    const answers = useSelector(getSubmissionAnswers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubmissions(appKey, route.params.id));
        dispatch(requestQuestions(appKey, route.params.id));
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    const renderTitle = (item: any) => {
        if (item.index !== 0)
            return (
                <View style={styles.headers}>
                    <Image source={item.item.icon} style={{ width: 12, height: 12, tintColor : '#ccc' }} />
                    <Text style={styles.titleText} numberOfLines = {1}>{item.item.text}</Text>
                </View>
            )
        else
            return (
                <View></View>
            )
    }

    const renderListItem = (item: any) => {
        return (
            <View>
                <SubmissionCard item={item.item}>
                </SubmissionCard>
            </View >
        )
    }

    return (
        <ScrollView horizontal style={{ flex: 1, backgroundColor: '#434343', }}>
            {loading ? (
                <Waiting />
            ) : (
                <View style={styles.container}>
                    <View style={{ backgroundColor: '#333333' }}>
                        <FlatList
                            keyExtractor={item => item.order}
                            horizontal
                            data={questionData}
                            renderItem={renderTitle.bind(this)}
                        />
                    </View>
                    <FlatList
                        data={answers}
                        keyExtractor={item => item.id}
                        renderItem={renderListItem.bind(this)}
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headers: {
        height: height / 20,
        width: width / 3,
        flexDirection: 'row',
        borderRightWidth: 0.15,
        borderColor : '#ccc',
        marginLeft: 16,
        alignItems: 'center',
        paddingLeft : 8,
    },
    titleText: {
        fontSize: 12,
        marginHorizontal: 12,
        color: '#9c9c9c'
    },
})

export default SubmissionPage;
